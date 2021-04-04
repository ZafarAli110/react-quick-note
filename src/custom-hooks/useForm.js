import { useState, useEffect } from 'react';
import { conditionally } from '../utils/helpers';

function useForm(initialState, validateForm, submitFormCallback) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  
  const noErrors = errorsObj => Object.keys(errorsObj).length === 0;
  const submitWhen = conditionally({
    if: noErrors,
    then: () => {
      submitFormCallback(values);
      setSubmitting(false);
    },
    else: () => setSubmitting(false)
  });

  useEffect(() => {
    isSubmitting && submitWhen(errors);
  }, [errors, isSubmitting, submitWhen]);

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

  return [
    handleSubmit,
    handleChange,
    values,
    errors,
    setErrors,
    isSubmitting
  ];
}

export default useForm;
