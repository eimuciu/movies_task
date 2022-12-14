import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '@chakra-ui/react';
import css from './SearchForm.module.css';
import { NumberInput, NumberInputField } from '@chakra-ui/react';

const formValidation = Yup.object({
  // title: Yup.string().trim().required('Required'),
  // year: Yup.date().required('Required'),
  // genre: Yup.string().trim().required('Required'),
  // actors: Yup.string().trim().required('Required'),
});

function SearchForm({ getSearchedMovies }) {
  const formik = useFormik({
    initialValues: { title: '', year: '', genre: '', actors: '' },
    validationSchema: formValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let isFormEmpty = true;
      for (const value of Object.keys(values)) {
        if (values[value]) {
          isFormEmpty = false;
          break;
        }
      }
      if (isFormEmpty) {
        alert('Fill in at least one field');
        return;
      }
      getSearchedMovies(values);
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
        <NumberInput name="year" min={1900} max={2023}>
          <NumberInputField
            onChange={formik.handleChange}
            value={formik.values.year}
            placeholder="Year of a movie..."
            isInvalid={!!formik.touched.year && !!formik.errors.year}
            errorBorderColor="crimson"
          />
        </NumberInput>
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

        <Button type="submit">Find</Button>
      </form>
    </>
  );
}

export default SearchForm;
