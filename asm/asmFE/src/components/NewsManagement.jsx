import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  InputGroup,
  Alert,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import NewsArticleService from "../services/NewsArticleService";
import CategoryService from "../services/CategoryService";
import TagService from "../services/TagService";

const NewsManagement = () => {
  const { user } = useAuth();
  const [newsArticles, setNewsArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [formData, setFormData] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    categoryId: "",
    newsStatus: true,
    tagIds: [],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [newsData, categoriesData, tagsData] = await Promise.all([
        NewsArticleService.getAllNewsArticles(),
        CategoryService.getActiveCategories(),
        TagService.getAllTags(),
      ]);
      setNewsArticles(newsData);
      setCategories(categoriesData);
      setTags(tagsData);
      setError("");
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadData();
      return;
    }
    try {
      const data = await NewsArticleService.searchAllNews(searchKeyword);
      setNewsArticles(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedNews(null);
    setFormData({
      newsTitle: "",
      headline: "",
      newsContent: "",
      newsSource: "",
      categoryId: "",
      newsStatus: true,
      tagIds: [],
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleEdit = (news) => {
    setSelectedNews(news);
    setFormData({
      newsTitle: news.newsTitle,
      headline: news.headline,
      newsContent: news.newsContent,
      newsSource: news.newsSource || "",
      categoryId: news.categoryId,
      newsStatus: news.newsStatus,
      tagIds: news.tagIds || [],
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (news) => {
    setNewsToDelete(news);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!newsToDelete) return;
    try {
      await NewsArticleService.deleteNewsArticle(newsToDelete.newsArticleId);
      setShowDeleteConfirm(false);
      setNewsToDelete(null);
      setToast({ show: true, message: "News article deleted successfully!", variant: "success" });
      loadData();
    } catch (err) {
      setShowDeleteConfirm(false);
      setToast({
        show: true,
        message: err.response?.data?.message || "Failed to delete news article",
        variant: "danger",
      });
    }
  };

  const handleTagChange = (tagId) => {
    const tagIdNum = parseInt(tagId);
    if (formData.tagIds.includes(tagIdNum)) {
      setFormData({
        ...formData,
        tagIds: formData.tagIds.filter((id) => id !== tagIdNum),
      });
    } else {
      setFormData({
        ...formData,
        tagIds: [...formData.tagIds, tagIdNum],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validate
    const errors = {};
    if (!formData.newsTitle.trim()) {
      errors.newsTitle = "Title is required";
    } else if (formData.newsTitle.length > 200) {
      errors.newsTitle = "Title must not exceed 200 characters";
    }
    if (!formData.headline.trim()) {
      errors.headline = "Headline is required";
    } else if (formData.headline.length > 500) {
      errors.headline = "Headline must not exceed 500 characters";
    }
    if (!formData.newsContent.trim()) {
      errors.newsContent = "Content is required";
    }
    if (!formData.categoryId) {
      errors.categoryId = "Category is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const submitData = {
        ...formData,
        createdById: selectedNews ? selectedNews.createdById : user.accountId,
      };

      if (selectedNews) {
        await NewsArticleService.updateNewsArticle(selectedNews.newsArticleId, submitData);
      } else {
        await NewsArticleService.createNewsArticle(submitData);
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      setFormErrors({ general: err.response?.data?.message || "Operation failed" });
    }
  };

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "30px",
      }}
    >
      <Container>
        <div className="mb-4">
          <h1 className="display-5 fw-bold text-dark mb-2">📰 News Article Management</h1>
          <p className="text-muted">Create and manage news content</p>
        </div>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")} className="shadow">
            {error}
          </Alert>
        )}

        <div className="d-flex gap-2 mb-4">
          <InputGroup style={{ maxWidth: "500px" }}>
            <Form.Control
              type="text"
              placeholder="🔍 Search news articles..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              style={{ borderRadius: "10px 0 0 10px", padding: "12px 20px" }}
            />
            <Button variant="primary" onClick={handleSearch} style={{ padding: "12px 24px" }}>
              Search
            </Button>
          </InputGroup>
          <Button
            variant="success"
            onClick={handleCreate}
            style={{ borderRadius: "10px", padding: "12px 24px", fontWeight: "500" }}
          >
            ➕ Create New Article
          </Button>
        </div>

        <div className="card shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <Table striped hover responsive className="mb-0">
            <thead style={{ background: "#4299e1", color: "white" }}>
              <tr>
                <th style={{ padding: "15px" }}>ID</th>
                <th style={{ padding: "15px" }}>Title</th>
                <th style={{ padding: "15px" }}>Category</th>
                <th style={{ padding: "15px" }}>Created By</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px" }}>Created Date</th>
                <th style={{ padding: "15px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsArticles.map((news) => (
                <tr key={news.newsArticleId}>
                  <td>{news.newsArticleId}</td>
                  <td>{news.newsTitle}</td>
                  <td>{news.categoryName}</td>
                  <td>{news.createdByName}</td>
                  <td>
                    <Badge bg={news.newsStatus ? "success" : "danger"}>{news.newsStatus ? "Active" : "Inactive"}</Badge>
                  </td>
                  <td>{new Date(news.createdDate).toLocaleDateString()}</td>
                  <td>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(news)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(news)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedNews ? "Edit News Article" : "Create News Article"}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {formErrors.general && <Alert variant="danger">{formErrors.general}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.newsTitle}
                  onChange={(e) => {
                    setFormData({ ...formData, newsTitle: e.target.value });
                    if (formErrors.newsTitle) setFormErrors({ ...formErrors, newsTitle: "" });
                  }}
                  isInvalid={!!formErrors.newsTitle}
                  maxLength="200"
                />
                <Form.Control.Feedback type="invalid">{formErrors.newsTitle}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Headline *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.headline}
                  onChange={(e) => {
                    setFormData({ ...formData, headline: e.target.value });
                    if (formErrors.headline) setFormErrors({ ...formErrors, headline: "" });
                  }}
                  isInvalid={!!formErrors.headline}
                  maxLength="500"
                />
                <Form.Control.Feedback type="invalid">{formErrors.headline}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={formData.newsContent}
                  onChange={(e) => {
                    setFormData({ ...formData, newsContent: e.target.value });
                    if (formErrors.newsContent) setFormErrors({ ...formErrors, newsContent: "" });
                  }}
                  isInvalid={!!formErrors.newsContent}
                />
                <Form.Control.Feedback type="invalid">{formErrors.newsContent}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Source</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.newsSource}
                  onChange={(e) => setFormData({ ...formData, newsSource: e.target.value })}
                  maxLength="100"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Select
                  value={formData.categoryId}
                  onChange={(e) => {
                    setFormData({ ...formData, categoryId: parseInt(e.target.value) });
                    if (formErrors.categoryId) setFormErrors({ ...formErrors, categoryId: "" });
                  }}
                  isInvalid={!!formErrors.categoryId}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{formErrors.categoryId}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  value={formData.newsStatus}
                  onChange={(e) => setFormData({ ...formData, newsStatus: e.target.value === "true" })}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <div
                  style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #dee2e6",
                    padding: "10px",
                    borderRadius: "4px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {tags.map((tag) => (
                    <Form.Check
                      key={tag.tagId}
                      type="checkbox"
                      id={`tag-${tag.tagId}`}
                      label={tag.tagName}
                      checked={formData.tagIds.includes(tag.tagId)}
                      onChange={() => handleTagChange(tag.tagId)}
                      className="mb-2"
                    />
                  ))}
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete news article <strong>{newsToDelete?.newsTitle}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toast Notification */}
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
          <Toast
            show={toast.show}
            onClose={() => setToast({ ...toast, show: false })}
            delay={3000}
            autohide
            bg={toast.variant}
          >
            <Toast.Header>
              <strong className="me-auto">{toast.variant === "success" ? "Success" : "Error"}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </div>
  );
};

export default NewsManagement;
