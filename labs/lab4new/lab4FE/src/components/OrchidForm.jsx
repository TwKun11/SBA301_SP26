import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * Reusable Orchid Form Component
 * Used for both Add and Edit operations
 */
export default function OrchidForm({
  register,
  errors,
  categories,
  onSubmit,
  submitButtonText = "Save",
  isLoading = false,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="orchidName">
        <Form.Label>Orchid name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Orchid name"
          {...register("name", { required: "Orchid name is required" })}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="orchidDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Orchid description"
          {...register("orchidDescription", { required: "Description is required" })}
        />
        {errors.orchidDescription && <p className="text-danger">{errors.orchidDescription.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="categoryId">
        <Form.Label>Category</Form.Label>
        <Form.Select {...register("categoryId", { required: "Category is required" })}>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </Form.Select>
        {errors.categoryId && <p className="text-danger">{errors.categoryId.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="orchidURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://..."
          {...register("orchidUrl", {
            required: "Image URL is required",
            pattern: {
              value: /^https?:\/\/\S+$/i,
              message: "Image URL must be a valid URL",
            },
          })}
        />
        {errors.orchidUrl && <p className="text-danger">{errors.orchidUrl.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="switch" id="custom-switch-natural" label="Natural" {...register("isNatural")} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="switch" id="custom-switch-attractive" label="Attractive" {...register("isAttractive")} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : submitButtonText}
      </Button>
    </Form>
  );
}

OrchidForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  isLoading: PropTypes.bool,
};
