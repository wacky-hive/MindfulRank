import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Modal, Badge, ProgressBar, Table, Dropdown, Row, Col } from 'react-bootstrap';
import { 
  FaPlus, FaTrash, FaDownload, FaSync, FaEye, FaRobot, 
  FaGlobe, FaFileAlt, FaCheckCircle, FaSpinner, FaClock,
  FaExclamationTriangle, FaInfoCircle, FaMagic, FaSearch,
  FaEdit, FaTimes, FaCheck, FaSave, FaUndo, FaPlusCircle, FaTag, FaList,
  FaCogs, FaEyeSlash, FaFileCode, FaRocket, FaWeight, FaPlusSquare
} from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';

// Modern Generation Form Component
const GenerationForm = ({ websiteId, token, onGenerationStart, onCancel }) => {
    const [pages, setPages] = useState([{ url: '', title: '', description: '' }]);
    const [urlsToFlatten, setUrlsToFlatten] = useState(['']);
    const [isLoading, setIsLoading] = useState(false);
    const [generationProgress, setGenerationProgress] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [isDiscovering, setIsDiscovering] = useState(false);
    
    const handleAddPage = () => setPages([...pages, { url: '', title: '', description: '' }]);
    const handleAddUrl = () => setUrlsToFlatten([...urlsToFlatten, '']);

    const handlePageChange = (index, field, value) => {
        const newPages = [...pages];
        newPages[index][field] = value;
        setPages(newPages);
    };

    const handleUrlChange = (index, value) => {
        const newUrls = [...urlsToFlatten];
        newUrls[index] = value;
        setUrlsToFlatten(newUrls);
    };

    const handleAutoDiscover = async () => {
        setIsDiscovering(true);
        try {
            const response = await axiosInstance.post(`/llm-files/websites/${websiteId}/auto-discover`, {});
            
            const discoveredPages = response.data.pages;
            const planInfo = response.data.plan_info;
            
            if (discoveredPages && discoveredPages.length > 0) {
                // Set the discovered pages to the form
                setPages(discoveredPages);
                
                // Also set URLs for llms_full.txt (use first few URLs)
                const urls = discoveredPages.slice(0, 5).map(page => page.url);
                setUrlsToFlatten(urls);
                
                // Show success message with plan info
                const limitText = planInfo.limit === -1 ? 'unlimited' : planInfo.limit;
                const planName = planInfo.plan.charAt(0).toUpperCase() + planInfo.plan.slice(1);
                
                await Swal.fire({
                    icon: 'success',
                    title: 'Pages Discovered! 🎉',
                    html: `
                        <div style="text-align: left;">
                            <p><strong>Auto-discovered ${discoveredPages.length} pages!</strong></p>
                            <p><strong>Your Plan:</strong> ${planName}</p>
                            <p><strong>Page Limit:</strong> ${limitText} pages per website</p>
                            <p>You can edit or remove any pages before generating.</p>
                        </div>
                    `,
                    confirmButtonColor: '#198754'
                });
            } else {
                await Swal.fire({
                    icon: 'warning',
                    title: 'No Pages Found',
                    text: 'No pages could be discovered on this website.',
                    confirmButtonColor: '#ffc107'
                });
            }
        } catch (error) {
            console.error("Auto-discovery failed:", error);
            
            let errorMessage = 'Failed to auto-discover pages. Please try again or add pages manually.';
            
            // Handle subscription-related errors
            if (error.response?.status === 402) {
                errorMessage = 'Active subscription required. Please upgrade your plan to use auto-discovery.';
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            }
            
            await Swal.fire({
                icon: 'error',
                title: 'Discovery Failed',
                text: errorMessage,
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsDiscovering(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGenerationProgress('Preparing files...');
        
        const payload = {
            llms_txt_pages: pages.filter(p => p.url && p.title),
            llms_full_txt_urls: urlsToFlatten.filter(u => u).map(u => String(u))
        };
        

        try {
            setGenerationProgress('Sending request to server...');
            await axiosInstance.post(`/llm-files/websites/${websiteId}/generate`, payload);
            setGenerationProgress('Files generated successfully!');
            setTimeout(() => {
                onGenerationStart();
            }, 1000);
        } catch (error) {
            console.error('Error generating files:', error);
            
            await Swal.fire({
              title: 'Generation Failed',
              text: 'Failed to start generation. Please try again or contact support.',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const removePage = (index) => {
        if (pages.length > 1) {
            const newPages = pages.filter((_, i) => i !== index);
            setPages(newPages);
        }
    };

    const removeUrl = (index) => {
        if (urlsToFlatten.length > 1) {
            const newUrls = urlsToFlatten.filter((_, i) => i !== index);
            setUrlsToFlatten(newUrls);
        }
    };

    return (
        <Card className="mt-3 card-modern">
            <Card.Header style={{ 
                background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                color: 'white',
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
            }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                                                    <FaCogs className="react-icon icon-left" />
                        <h5 className="mb-0 fw-bold">Generate LLM Files</h5>
                    </div>
                    {isLoading && (
                        <div className="d-flex align-items-center px-3 py-2" style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                        }}>
                            {generationProgress.includes('successfully') ? (
                                <FaCheckCircle className="react-icon icon-left" style={{ color: 'var(--success-500)', fontSize: '0.9rem' }} />
                            ) : (
                                <span className="spinner-border spinner-border-sm me-2" style={{ color: 'var(--primary-500)' }}></span>
                            )}
                            <small className="fw-semibold" style={{ 
                                color: generationProgress.includes('successfully') ? 'var(--success-600)' : 'var(--primary-600)'
                            }}>
                                {generationProgress}
                            </small>
                        </div>
                    )}
                </div>
            </Card.Header>
            <Card.Body style={{ padding: '2rem' }}>
                <Form onSubmit={handleSubmit}>
                    {/* Pages Section */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0" style={{ color: 'var(--neutral-800)' }}>
                                <i className="fas fa-file-alt me-2" style={{ color: 'var(--primary-500)' }}></i>
                                Pages for llms.txt
                            </h6>
                            <Button 
                                type="button" 
                                variant="success" 
                                onClick={handleAutoDiscover}
                                disabled={isDiscovering || isLoading}
                                className="fw-semibold"
                                style={{ 
                                    borderRadius: 'var(--radius-md)',
                                    padding: '0.5rem 1rem'
                                }}
                            >
                                {isDiscovering ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Discovering...
                                    </>
                                ) : (
                                    <>
                                        <FaMagic className="react-icon icon-left" />
                                        Auto-Discover Pages
                                    </>
                                )}
                            </Button>
                        </div>
                        {pages.map((page, index) => (
                            <Card key={index} className="mb-3" style={{ border: '1px solid var(--neutral-200)' }}>
                                <Card.Body style={{ padding: '1.5rem' }}>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h6 className="text-muted mb-0">Page {index + 1}</h6>
                                        {pages.length > 1 && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removePage(index)}
                                                style={{ borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem' }}
                                            >
                                                <FaTimes className="react-icon" style={{ fontSize: '0.8rem' }} />
                                            </Button>
                                        )}
                                    </div>
                                    <Row className="g-3">
                                        <Col md={12}>
                                            <Form.Label className="fw-semibold text-muted">URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="https://example.com/page"
                                                value={page.url}
                                                onChange={e => handlePageChange(index, 'url', e.target.value)}
                                                required
                                                style={{
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '2px solid var(--neutral-200)',
                                                    padding: 'var(--spacing-sm) var(--spacing-md)'
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="fw-semibold text-muted">Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Page Title"
                                                value={page.title}
                                                onChange={e => handlePageChange(index, 'title', e.target.value)}
                                                required
                                                style={{
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '2px solid var(--neutral-200)',
                                                    padding: 'var(--spacing-sm) var(--spacing-md)'
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label className="fw-semibold text-muted">Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Brief description"
                                                value={page.description}
                                                onChange={e => handlePageChange(index, 'description', e.target.value)}
                                                style={{
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '2px solid var(--neutral-200)',
                                                    padding: 'var(--spacing-sm) var(--spacing-md)'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                        <Button 
                            type="button" 
                            variant="outline-primary" 
                            onClick={handleAddPage}
                            className="fw-semibold"
                            style={{ 
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            <FaPlus className="react-icon icon-left" />Add Page
                        </Button>
                    </div>
                    
                    {/* URLs Section */}
                    <div className="mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: 'var(--neutral-800)' }}>
                            <FaGlobe className="react-icon icon-left" />
                            URLs for llms_full.txt
                        </h6>
                        {urlsToFlatten.map((url, index) => (
                            <div key={index} className="mb-3 d-flex gap-2">
                                <Form.Control
                                    type="text"
                                    placeholder="https://example.com/content-to-flatten"
                                    value={url}
                                    onChange={e => handleUrlChange(index, e.target.value)}
                                    required
                                    style={{
                                        borderRadius: 'var(--radius-md)',
                                        border: '2px solid var(--neutral-200)',
                                        padding: 'var(--spacing-sm) var(--spacing-md)'
                                    }}
                                />
                                {urlsToFlatten.length > 1 && (
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeUrl(index)}
                                        style={{ borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem' }}
                                    >
                                        <FaTimes className="react-icon" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button 
                            type="button" 
                            variant="outline-primary" 
                            onClick={handleAddUrl}
                            className="fw-semibold"
                            style={{ 
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            <FaPlus className="react-icon icon-left" />Add URL
                        </Button>
                    </div>

                    {/* Preview Section */}
                    <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0" style={{ color: 'var(--neutral-800)' }}>
                                <FaEye className="react-icon icon-left" />
                                Content Preview
                            </h6>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => setShowPreview(!showPreview)}
                                className="fw-semibold"
                                style={{ 
                                    borderRadius: 'var(--radius-sm)',
                                    padding: '0.5rem 1rem'
                                }}
                            >
                                {showPreview ? (
                                    <>
                                        <FaEyeSlash className="react-icon icon-left-sm" />Hide Preview
                                    </>
                                ) : (
                                    <>
                                        <FaEye className="react-icon icon-left-sm" />Show Preview
                                    </>
                                )}
                            </Button>
                        </div>
                        
                        {showPreview && (
                            <div className="row g-3">
                                {/* LLMs.txt Preview */}
                                <div className="col-md-6">
                                    <div style={{
                                        background: 'var(--neutral-50)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--neutral-200)',
                                        padding: '1rem'
                                    }}>
                                        <h6 className="fw-bold mb-2 d-flex align-items-center" style={{ color: 'var(--neutral-700)' }}>
                                            <FaFileAlt className="react-icon icon-left" />
                                            llms.txt Preview
                                        </h6>
                                        <div style={{
                                            background: 'white',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: '0.75rem',
                                            fontFamily: 'monospace',
                                            fontSize: '0.8rem',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            border: '1px solid var(--neutral-200)'
                                        }}>
                                            {pages.filter(p => p.url && p.title).length > 0 ? (
                                                <div>
                                                    <div className="fw-bold">Key Pages & Topics:</div>
                                                    {pages.filter(p => p.url && p.title).map((page, index) => (
                                                        <div key={index} className="mt-1">
                                                            * [{page.title}]({page.url}): {page.description || "No description provided."}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-muted">Add pages above to see preview...</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* LLMs_full.txt Preview */}
                                <div className="col-md-6">
                                    <div style={{
                                        background: 'var(--neutral-50)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--neutral-200)',
                                        padding: '1rem'
                                    }}>
                                        <h6 className="fw-bold mb-2 d-flex align-items-center" style={{ color: 'var(--neutral-700)' }}>
                                            <FaFileCode className="react-icon icon-left" />
                                            llms_full.txt Preview
                                        </h6>
                                        <div style={{
                                            background: 'white',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: '0.75rem',
                                            fontFamily: 'monospace',
                                            fontSize: '0.8rem',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            border: '1px solid var(--neutral-200)'
                                        }}>
                                            {urlsToFlatten.filter(u => u).length > 0 ? (
                                                <div>
                                                    <div className="fw-bold">URLs to be scraped:</div>
                                                    {urlsToFlatten.filter(u => u).map((url, index) => (
                                                        <div key={index} className="mt-1 d-flex align-items-center">
                                                            <FaGlobe className="react-icon icon-left-sm" style={{ color: 'var(--primary-500)', fontSize: '0.7rem' }} />
                                                            <span className="text-break">{url}</span>
                                                        </div>
                                                    ))}
                                                    <div className="mt-2 text-muted" style={{ fontSize: '0.7rem' }}>
                                                        Full content will be extracted and flattened from these pages
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-muted">Add URLs above to see preview...</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-3 justify-content-end mt-4">
                        <Button 
                            type="button" 
                            variant="outline-secondary" 
                            onClick={onCancel}
                            disabled={isLoading}
                            className="fw-semibold"
                            style={{ borderRadius: 'var(--radius-md)', padding: '0.75rem 1.5rem' }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="fw-semibold"
                            style={{ 
                                borderRadius: 'var(--radius-md)', 
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                                border: 'none'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Generating...
                                </>
                            ) : (
                                <>
                                                                                        <FaRocket className="react-icon icon-left" />Start Generation
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

const WebsiteManager = ({ token, onStatsUpdate }) => {
  const [websites, setWebsites] = useState([]);
  const [newWebsiteName, setNewWebsiteName] = useState('');
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [llmFiles, setLlmFiles] = useState({});
  const [generatingWebsiteId, setGeneratingWebsiteId] = useState(null);
  const [deletingWebsiteId, setDeletingWebsiteId] = useState(null);
  const [deletingFileId, setDeletingFileId] = useState(null);

  const fetchWebsites = async () => {
    if (!token) return;
    try {
      const response = await axiosInstance.get('/websites/');
      setWebsites(response.data);
    } catch (error) {
      setMessage('Failed to fetch websites.');
      setMessageType('danger');
      console.error(error);
    }
  };

  const fetchLlmFiles = async (websiteId) => {
    try {
        const response = await axiosInstance.get(`/llm-files/websites/${websiteId}`);
        setLlmFiles(prev => ({...prev, [websiteId]: response.data}));
        
        // Update file sizes for existing files that don't have size info
        const filesWithoutSize = response.data.filter(file => 
          file.status === 'generated' && (!file.file_size || file.file_size === 0)
        );
        
        if (filesWithoutSize.length > 0) {
          try {
            await axiosInstance.post(`/llm-files/websites/${websiteId}/update-file-sizes`);
            // Refresh the files to get updated sizes
            const updatedResponse = await axiosInstance.get(`/llm-files/websites/${websiteId}`);
            setLlmFiles(prev => ({...prev, [websiteId]: updatedResponse.data}));
          } catch (updateError) {
            console.error('Error updating file sizes:', updateError);
          }
        }
    } catch (error) {
        console.error(`Failed to fetch LLM files for website ${websiteId}`, error);
    }
  };

  useEffect(() => {
    if (token) {
        fetchWebsites();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    if (!newWebsiteUrl || !newWebsiteName) {
      setMessage('Both URL and name are required.');
      setMessageType('danger');
      setIsLoading(false);
      return;
    }
    
    try {
      await axiosInstance.post('/websites/', {
        root_url: newWebsiteUrl,
        name: newWebsiteName,
      });
      setMessage('Website added successfully!');
      setMessageType('success');
      setNewWebsiteUrl('');
      setNewWebsiteName('');
      fetchWebsites(); // Refresh the list
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Error: ${error.response.data.detail}`);
      } else {
        setMessage('An unexpected error occurred.');
      }
      setMessageType('danger');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerationStart = () => {
    setMessage(`Generation started successfully! Refreshing file list in 10 seconds.`);
    setMessageType('success');
    setTimeout(() => {
      fetchLlmFiles(generatingWebsiteId);
      // Also refresh stats after files are generated
      if (onStatsUpdate) {
        onStatsUpdate();
      }
    }, 10000); // Poll after a delay
    setGeneratingWebsiteId(null); // Close the form
  }

  const handleDownload = async (fileId, fileName) => {
    try {
        const response = await axiosInstance.get(
            `/llm-files/${fileId}/download`,
            {
                responseType: 'blob', // This is crucial for file downloads
            }
        );
        // Create a new Blob object from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName || 'download.txt'); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the object URL
    } catch (error) {
        console.error("Failed to download file", error);
        await Swal.fire({
            title: 'Download Failed',
            text: 'Failed to download file. Please try again or contact support.',
            icon: 'error',
            confirmButtonColor: '#dc3545'
        });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { bg: 'success', icon: 'fa-check-circle' },
      'pending': { bg: 'warning', icon: 'fa-clock' },
      'error': { bg: 'danger', icon: 'fa-exclamation-triangle' },
      'generated': { bg: 'info', icon: 'fa-file-check' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'fa-question' };
    
    return (
      <Badge bg={config.bg} className="d-flex align-items-center gap-1">
        <i className={`fas ${config.icon}`} style={{ fontSize: '0.8rem' }}></i>
        {status}
      </Badge>
    );
  };

  const handleDeleteWebsite = async (websiteId, websiteName) => {
    const result = await Swal.fire({
      title: 'Delete Website?',
      html: `Are you sure you want to delete <strong>"${websiteName}"</strong>?<br><br>This action cannot be undone and will delete all associated files.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete Website',
      cancelButtonText: 'Cancel',
      focusCancel: true
    });

    if (!result.isConfirmed) {
      return;
    }
    
    setDeletingWebsiteId(websiteId);
    try {
      await axiosInstance.delete(`/websites/${websiteId}`);
      
      await Swal.fire({
        title: 'Website Deleted!',
        text: `"${websiteName}" has been successfully deleted.`,
        icon: 'success',
        confirmButtonColor: '#28a745'
      });
      
      fetchWebsites(); // Refresh the list
      
      // Refresh stats after deletion
      if (onStatsUpdate) {
        onStatsUpdate();
      }
    } catch (error) {
      console.error('Error deleting website:', error);
      await Swal.fire({
        title: 'Deletion Failed',
        text: 'Failed to delete website. Please try again.',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setDeletingWebsiteId(null);
    }
  };

  const handleDeleteFile = async (fileId, websiteId, fileName) => {
    const result = await Swal.fire({
      title: 'Delete File?',
      html: `Are you sure you want to delete <strong>"${fileName}"</strong>?<br><br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete File',
      cancelButtonText: 'Cancel',
      focusCancel: true
    });

    if (!result.isConfirmed) {
      return;
    }
    
    setDeletingFileId(fileId);
    try {
      await axiosInstance.delete(`/llm-files/${fileId}`);
      
      await Swal.fire({
        title: 'File Deleted!',
        text: `"${fileName}" has been successfully deleted.`,
        icon: 'success',
        confirmButtonColor: '#28a745'
      });
      
      // Refresh the files for this website
      fetchLlmFiles(websiteId);
      
      // Refresh stats after deletion
      if (onStatsUpdate) {
        onStatsUpdate();
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      await Swal.fire({
        title: 'Deletion Failed',
        text: 'Failed to delete file. Please try again.',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setDeletingFileId(null);
    }
  };

  const getFileIcon = (fileType) => {
    const icons = {
      'llms.txt': 'fa-file-alt',
      'llms_full.txt': 'fa-file-code',
      'default': 'fa-file'
    };
    return icons[fileType] || icons.default;
  };

  const getFileSize = (file) => {
    // Use real file size from backend if available
    if (file.file_size && file.file_size > 0) {
      const bytes = file.file_size;
      if (bytes < 1024) {
        return `${bytes} B`;
      } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
      } else {
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      }
    }
    
    // Fallback for files without size info
    return 'Calculating...';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Alert Messages */}
      {message && (
        <Alert 
          variant={messageType} 
          className="mb-4"
          style={{
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            background: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
            color: messageType === 'success' ? '#15803d' : '#dc2626'
          }}
          dismissible
          onClose={() => setMessage('')}
        >
          <i className={`fas ${messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
          {message}
        </Alert>
      )}

      {/* Add Website Section */}
      <Card className="mb-5 card-modern">
        <Card.Header style={{ 
          background: 'linear-gradient(135deg, var(--success) 0%, #10b981 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
        }}>
          <div className="d-flex align-items-center">
                                    <FaPlusCircle className="react-icon icon-left" />
            <h4 className="mb-0 fw-bold">Add New Website</h4>
          </div>
        </Card.Header>
        <Card.Body style={{ padding: '2rem' }}>
          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-700)' }}>
                                                <FaTag className="react-icon icon-left" style={{ color: 'var(--neutral-500)' }} />
                    Website Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={newWebsiteName}
                    onChange={(e) => setNewWebsiteName(e.target.value)}
                    placeholder="My Awesome Blog"
                    required
                    style={{
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--neutral-200)',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      fontSize: '1rem'
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold" style={{ color: 'var(--neutral-700)' }}>
                                                    <FaGlobe className="react-icon icon-left" style={{ color: 'var(--neutral-500)' }} />
                    Root URL
                  </Form.Label>
                  <Form.Control
                    type="url"
                    value={newWebsiteUrl}
                    onChange={(e) => setNewWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                    style={{
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid var(--neutral-200)',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      fontSize: '1rem'
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="fw-semibold px-4"
                style={{ 
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--success) 0%, #10b981 100%)',
                  border: 'none',
                  padding: '0.75rem 2rem'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Adding...
                  </>
                ) : (
                  <>
                                                <FaPlus className="react-icon icon-left" />Add Website
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Websites List */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h4 fw-bold mb-0" style={{ color: 'var(--neutral-900)' }}>
                                    <FaList className="react-icon icon-left" />
            Your Websites ({websites.length})
          </h3>
          {websites.length > 0 && (
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={fetchWebsites}
              className="fw-semibold"
              style={{ 
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 1rem'
              }}
            >
              <FaSync className="react-icon icon-left-sm" />
              Refresh All
            </Button>
          )}
        </div>
        
        {websites.length > 0 ? (
          <Row className="g-4">
            {websites.map((site) => (
              <Col lg={6} key={site.id}>
                <Card className="h-100 card-modern">
                  <Card.Header className="d-flex justify-content-between align-items-center" style={{ background: 'var(--neutral-50)' }}>
                    <div style={{ flex: 1 }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1 fw-bold" style={{ color: 'var(--neutral-900)' }}>{site.name}</h5>
                          <small className="text-muted d-flex align-items-center">
                                                                <FaGlobe className="react-icon icon-left-sm" />
                            <a href={site.root_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              {site.root_url}
                            </a>
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {getStatusBadge(site.status)}
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteWebsite(site.id, site.name)}
                            disabled={deletingWebsiteId === site.id}
                            style={{ 
                              borderRadius: 'var(--radius-sm)',
                              padding: '0.25rem 0.5rem',
                              border: 'none',
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: 'var(--error)'
                            }}
                            title="Delete website"
                          >
                            {deletingWebsiteId === site.id ? (
                              <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                                                                                  <FaTrash className="react-icon" style={{ fontSize: '0.8rem' }} />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body style={{ padding: '1.5rem' }}>
                    <div className="d-flex gap-2 mb-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => fetchLlmFiles(site.id)}
                        className="fw-semibold"
                        style={{ 
                          borderRadius: 'var(--radius-md)',
                          padding: '0.5rem 1rem'
                        }}
                      >
                        <FaSync className="react-icon icon-left-sm" />
                        Refresh Files
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setGeneratingWebsiteId(site.id)}
                        className="fw-semibold"
                        style={{ 
                          borderRadius: 'var(--radius-md)',
                          background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                          border: 'none',
                          padding: '0.5rem 1rem'
                        }}
                      >
                        <FaCogs className="react-icon icon-left-sm" />
                        Generate Files
                      </Button>
                    </div>

                    {generatingWebsiteId === site.id && (
                        <GenerationForm 
                          websiteId={site.id}
                          token={token}
                          onGenerationStart={handleGenerationStart}
                          onCancel={() => setGeneratingWebsiteId(null)}
                        />
                    )}

                    {llmFiles[site.id] && llmFiles[site.id].length > 0 && (
                        <div className="mt-3">
                            <h6 className="fw-bold mb-3 d-flex justify-content-between align-items-center" style={{ color: 'var(--neutral-800)' }}>
                              <span>
                                <i className="fas fa-file-alt me-2" style={{ color: 'var(--primary-500)' }}></i>
                                Generated Files ({llmFiles[site.id].length})
                              </span>
                              <small className="text-muted fw-normal">Download or delete files</small>
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                {llmFiles[site.id].map(file => (
                                    <div key={file.id} className="d-flex justify-content-between align-items-center p-3" style={{
                                      background: 'var(--neutral-50)',
                                      borderRadius: 'var(--radius-md)',
                                      border: '1px solid var(--neutral-200)',
                                      transition: 'all var(--transition-base)'
                                    }}
                                    onMouseEnter={(e) => {
                                      const target = e.currentTarget;
                                      target.style.background = 'var(--neutral-100)';
                                      target.style.borderColor = 'var(--primary-300)';
                                    }}
                                    onMouseLeave={(e) => {
                                      const target = e.currentTarget;
                                      target.style.background = 'var(--neutral-50)';
                                      target.style.borderColor = 'var(--neutral-200)';
                                    }}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                          <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                          }}>
                                            <i className={`fas ${getFileIcon(file.file_type)}`}></i>
                                          </div>
                                          <div>
                                            <div className="fw-semibold d-flex align-items-center gap-2" style={{ color: 'var(--neutral-900)' }}>
                                              {file.file_type}
                                              {getStatusBadge(file.status)}
                                            </div>
                                            <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                              <span>
                                                <FaWeight className="react-icon icon-left-sm" />
                                                {getFileSize(file)}
                                              </span>
                                              {file.created_at && (
                                                <span>
                                                  <FaClock className="react-icon icon-left-sm" />
                                                  {formatDate(file.created_at)}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                          <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDownload(file.id, file.file_type);
                                            }}
                                            style={{ 
                                              borderRadius: 'var(--radius-sm)',
                                              padding: '0.25rem 0.5rem',
                                              border: 'none',
                                              background: 'rgba(99, 102, 241, 0.1)',
                                              color: 'var(--primary-600)'
                                            }}
                                            title="Download file"
                                          >
                                                                                                <FaDownload className="react-icon" style={{ fontSize: '0.8rem' }} />
                                          </Button>
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteFile(file.id, site.id, file.file_type);
                                            }}
                                            disabled={deletingFileId === file.id}
                                            style={{ 
                                              borderRadius: 'var(--radius-sm)',
                                              padding: '0.25rem 0.5rem',
                                              border: 'none',
                                              background: 'rgba(239, 68, 68, 0.1)',
                                              color: 'var(--error)'
                                            }}
                                            title="Delete file"
                                          >
                                            {deletingFileId === file.id ? (
                                              <span className="spinner-border spinner-border-sm"></span>
                                            ) : (
                                              <FaTrash className="react-icon" style={{ fontSize: '0.8rem' }} />
                                            )}
                                          </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {llmFiles[site.id] && llmFiles[site.id].length === 0 && (
                      <div className="text-center py-4" style={{ color: 'var(--neutral-500)' }}>
                        <FaPlusSquare className="react-icon" style={{ fontSize: '2rem', opacity: '0.5', marginBottom: '0.5rem' }} />
                        <p className="mb-0">No files generated yet</p>
                        <small>Click "Generate Files" to create your first LLM files</small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center py-5 card-modern" style={{ border: '2px dashed var(--neutral-300)' }}>
            <Card.Body>
                                      <FaPlusCircle className="react-icon" style={{ fontSize: '3rem', color: 'var(--neutral-400)', marginBottom: '1rem' }} />
              <h5 className="fw-bold mb-2" style={{ color: 'var(--neutral-600)' }}>No websites added yet</h5>
              <p className="text-muted mb-3">Add your first website to start generating LLM-optimized files</p>
              <small className="text-muted">Fill out the form above to get started</small>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WebsiteManager; 
