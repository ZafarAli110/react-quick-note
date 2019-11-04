import { useState, useEffect } from 'react';
import { conditionally } from '../utils/helpers';

function useForm(initialState, validateForm, successCallback) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const noErrors = errorsObj => Object.keys(errorsObj).length === 0;
  const submitForm = conditionally({
    if: noErrors,
    then: () => {
      successCallback(values);
      setSubmitting(false);
    },
    else: () => setSubmitting(false)
  });

  //whenever the errors state changes,the callback fn in useEffect will be call
  useEffect(() => {
    isSubmitting && submitForm(errors);
  }, [errors,isSubmitting,submitForm]); //here args are passes as dependencies

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    values,
    errors,
    setErrors,
    isSubmitting
  };
}
export default useForm;
