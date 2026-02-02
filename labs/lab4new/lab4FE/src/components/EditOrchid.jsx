import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useOrchidEdit } from "../hooks/useOrchidEdit";
import { useCategories } from "../hooks/useCategories";
import { transformOrchidData } from "../utils/orchidUtils";
import OrchidForm from "./OrchidForm";

export default function EditOrchid() {
  const { id } = useParams();
  const { fetchOrchid, updateOrchid } = useOrchidEdit(id);
  const { categories, loading: categoriesLoading } = useCategories();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadOrchidData = async () => {
      const orchidData = await fetchOrchid();
      if (orchidData) {
        Object.keys(orchidData).forEach((key) => {
          setValue(key, orchidData[key]);
        });
      }
    };
    loadOrchidData();
  }, [fetchOrchid, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const orchidData = transformOrchidData(data);
    await updateOrchid(orchidData);
  });

  return (
    <Container className="py-4">
      <ToastContainer />
      <h4 className="mb-3">Edit the orchid: {id}</h4>
      {categoriesLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <OrchidForm
          register={register}
          errors={errors}
          categories={categories}
          onSubmit={onSubmit}
          submitButtonText="Update Orchid"
        />
      )}
    </Container>
  );
}
