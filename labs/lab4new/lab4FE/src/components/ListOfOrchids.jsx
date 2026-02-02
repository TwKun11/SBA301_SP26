import { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useOrchids } from "../hooks/useOrchids";
import { useCategories } from "../hooks/useCategories";
import { transformOrchidData, getOrchidId } from "../utils/orchidUtils";
import OrchidTableRow from "./OrchidTableRow";
import OrchidForm from "./OrchidForm";

export default function ListOfOrchids() {
  const [show, setShow] = useState(false);
  const { orchids, loading: orchidsLoading, addOrchid, deleteOrchid } = useOrchids();
  const { categories, loading: categoriesLoading } = useCategories();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const orchidData = transformOrchidData(data);
    const success = await addOrchid(orchidData);
    if (success) {
      reset();
      setShow(false);
    }
  });

  const handleDelete = async (id) => {
    await deleteOrchid(id);
  };

  return (
    <Container className="py-4">
      <ToastContainer />
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Orchid name</th>
            <th>Category</th>
            <th>Original</th>
            <th className="text-end">
              <Button onClick={handleShow} type="button" className="btn btn-primary">
                <i className="bi bi-node-plus" /> Add new orchid
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {orchidsLoading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading orchids...
              </td>
            </tr>
          ) : orchids.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No orchids found
              </td>
            </tr>
          ) : (
            orchids.map((orchid) => (
              <OrchidTableRow key={getOrchidId(orchid)} orchid={orchid} onDelete={handleDelete} />
            ))
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add new orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categoriesLoading ? (
            <p className="text-center">Loading categories...</p>
          ) : (
            <OrchidForm
              register={register}
              errors={errors}
              categories={categories}
              onSubmit={onSubmit}
              submitButtonText="Add Orchid"
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
