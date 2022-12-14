import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '@chakra-ui/react';
import css from './EditForm.module.css';

const formValidation = Yup.object({
  // title: Yup.string().trim().required('Required'),
  // date: Yup.date().required('Required'),
  // genre: Yup.string().trim().required('Required'),
  // actors: Yup.string().trim().required('Required'),
});

function EditForm({ movieObj, updateMovie, closeModal }) {
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      title: movieObj.title,
      date: movieObj.year,
      genre: movieObj.genre,
      actors: movieObj.actors,
    },
    validationSchema: formValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      updateMovie({ ...movieObj, ...values });
      closeModal();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <Input
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="Search movie title..."
          isInvalid={!!formik.touched.title && !!formik.errors.title}
          errorBorderColor="crimson"
        />
        <Input
          name="date"
          type="number"
          min="1900"
          max="2099"
          step="1"
          onChange={formik.handleChange}
          value={formik.values.date}
          isInvalid={!!formik.touched.date && !!formik.errors.date}
          errorBorderColor="crimson"
        />
        <Input
          name="genre"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.genre}
          placeholder="Genre of a movie..."
          isInvalid={!!formik.touched.genre && !!formik.errors.genre}
          errorBorderColor="crimson"
        />
        <Input
          name="actors"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.actors}
          placeholder="Actors of a movie..."
          isInvalid={!!formik.touched.actors && !!formik.errors.actors}
          errorBorderColor="crimson"
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  );
}

export default EditForm;
