import httpx
from bs4 import BeautifulSoup
from typing import Optional, List, Dict
from datetime import datetime
from urllib.parse import urljoin, urlparse
import re

async def scrape_and_flatten_html(url: str) -> Optional[str]:
    """
    Scrapes a URL, extracts the main content, and returns it as plain text.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, follow_redirects=True, timeout=10.0)
            response.raise_for_status()

        soup = BeautifulSoup(response.text, 'lxml')

        # Remove common non-content tags
        for tag in soup(['nav', 'footer', 'header', 'aside', 'script', 'style', 'img', 'figure']):
            tag.decompose()

        # Attempt to find the main content area
        main_content = soup.find('main') or soup.find('article') or soup.find('body')
        
        if main_content:
            return main_content.get_text(separator='\n', strip=True)
        return None

    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        print(f"Error scraping {url}: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred while processing {url}: {e}")
        return None

async def auto_discover_pages(root_url: str, max_pages: int = 15) -> List[Dict[str, str]]:
    """
    Auto-discovers pages on a website and extracts their titles and descriptions.
    """
    discovered_pages = []
    visited_urls = set()
    urls_to_visit = [root_url]
    
    # Parse the root domain to only crawl same-domain URLs
    root_domain = urlparse(root_url).netloc
    
    async with httpx.AsyncClient() as client:
        while urls_to_visit and len(discovered_pages) < max_pages:
            current_url = urls_to_visit.pop(0)
            
            # Skip if already visited
            if current_url in visited_urls:
                continue
                
            visited_urls.add(current_url)
            
            try:
                print(f"Crawling: {current_url}")
                response = await client.get(current_url, follow_redirects=True, timeout=10.0)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Extract title
                title_tag = soup.find('title')
                title = title_tag.get_text().strip() if title_tag else "Untitled Page"
                
                # Extract description (try meta description first, then first paragraph)
                description = ""
                meta_desc = soup.find('meta', attrs={'name': 'description'})
                if meta_desc and meta_desc.get('content'):
                    description = meta_desc.get('content').strip()
                else:
                    # Fallback: find first paragraph with substantial text
                    paragraphs = soup.find_all('p')
                    for p in paragraphs:
                        text = p.get_text().strip()
                        if len(text) > 50:  # Substantial paragraph
                            description = text[:200] + "..." if len(text) > 200 else text
                            break
                
                if not description:
                    description = "No description available"
                
                # Add to discovered pages
                discovered_pages.append({
                    "url": current_url,
                    "title": title,
                    "description": description
                })
                
                # Find more URLs to visit (only if we need more pages)
                if len(discovered_pages) < max_pages:
                    links = soup.find_all('a', href=True)
                    for link in links:
                        href = link['href']
                        
                        # Convert relative URLs to absolute
                        full_url = urljoin(current_url, href)
                        parsed_url = urlparse(full_url)
                        
                        # Only crawl same domain URLs
                        if parsed_url.netloc == root_domain:
                            # Clean URL (remove fragments)
                            clean_url = f"{parsed_url.scheme}://{parsed_url.netloc}{parsed_url.path}"
                            if parsed_url.query:
                                clean_url += f"?{parsed_url.query}"
                            
                            # Filter out common non-content pages
                            if not _should_skip_url(clean_url) and clean_url not in visited_urls:
                                if clean_url not in urls_to_visit:
                                    urls_to_visit.append(clean_url)
                
            except Exception as e:
                print(f"Error crawling {current_url}: {e}")
                continue
    
    return discovered_pages

def _should_skip_url(url: str) -> bool:
    """
    Determine if a URL should be skipped during crawling.
    """
    url_lower = url.lower()
    
    # Skip common non-content pages
    skip_patterns = [
        '/privacy', '/terms', '/legal', '/policy', '/cookies',
        '/login', '/register', '/signup', '/signin', '/logout',
        '/admin', '/wp-admin', '/dashboard',
        '/cart', '/checkout', '/account', '/profile',
        '/search', '/contact', '/sitemap.xml', '/robots.txt',
        '.pdf', '.jpg', '.png', '.gif', '.svg', '.css', '.js',
        '/#', 'javascript:', 'mailto:', 'tel:',
        '/tag/', '/category/', '/author/', '/date/'
    ]
    
    for pattern in skip_patterns:
        if pattern in url_lower:
            return True
    
    return False

def generate_llms_txt_content(website_name: str, root_url: str, pages_to_include: List[Dict]) -> str:
    """
    Generates the content for a llms.txt file from structured page data.
    """
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    
    pages_markdown = ""
    for page in pages_to_include:
        description = page.get('description') or "No description provided."
        pages_markdown += f"* [{page['title']}]({page['url']}): {description}\n"

    content = f"""# LLM SEO Profile for {website_name}

**Root URL:** {root_url}
**Generated At:** {now}

---

## Key Pages & Topics:

{pages_markdown}
---

## General Guidelines for LLMs:

- Prioritize content on key pages.
- Focus on factual accuracy and provide direct answers.
- Cite sources back to {root_url} where appropriate.
- Content is regularly updated.
"""
    return content

async def generate_llms_full_txt_content(urls_to_flatten: List[str]) -> str:
    """
    Scrapes multiple URLs and concatenates their flattened content.
    """
    full_content = ""
    for url in urls_to_flatten:
        flattened_text = await scrape_and_flatten_html(url)
        full_content += f"--- START PAGE: {url} ---\n\n"
        if flattened_text:
            full_content += flattened_text
        else:
            full_content += "Could not retrieve content for this URL."
        full_content += f"\n\n--- END PAGE: {url} ---\n\n"
    
    return full_content 