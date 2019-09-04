import { useState, useRef, useCallback } from 'react';

export function useFormX(defaultValues, validateSchema, submitCallback) {
  // we using useRef to store the formValues,when the values change, it does'nt infulence others for performance reason
  // const [values, setValues] = useState(defaultValues);
  const formValues = useRef(defaultValues);
  const [errors, setErrors] = useState(validateSchema.check(formValues.current));
  const isTouched = useRef({});
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    submitCallback();
  };

  const handleError = useCallback((name, error) => {
    let { hasError } = errors; // 初始化为errors的原始值。
    if (error.hasError) {
      hasError = true
    } else if (errors.hasError) {
      hasError = false;
      validateSchema.getKeys().forEach(function (key) {
        if (key !== name) { errors[key].hasError === true && (hasError = true) } else {
          error.hasError === true && (hasError = true)
        }
      });
    }
    setErrors({ ...errors, hasError, [name]:error });
  }, [errors, validateSchema]);

  const useInput = (name) => useFormInput(name, defaultValues, validateSchema, formValues, handleError, isTouched, errors);

  return {
    values: formValues,
    useInput,
    errors,
    isValid: errors.hasError,
    handleSubmit
  }
}

function useFormInput(
  name,
  defaultValues,
  validateSchema,
  values,
  handleError,
  isTouched,
  errors
) {
  // we using useRef to store the formValues,when the values change, it does'nt infulence others
  const [value, setValue] = useState(defaultValues[name]);
  const [error, setError] = useState({ hasError:false, errorMessage:'' });
  const defSchema = useRef({
    required: validateSchema.getFieldType(name).required,
    field:validateSchema.getFieldType(name)
  });

  const handleChange = useCallback((event) => {
    if (values.current[name] !== event.currentTarget.value) {
      values.current[name] = event.currentTarget.value;
      setValue(event.currentTarget.value);
      if (defSchema.current.field.validateOnChange) {
        const err = validateSchema.checkForField(name, event.currentTarget.value, values.current);
        setError(err);
        handleError(name, err);
      }
    }
  }, [handleError, name, validateSchema, values]);

  const handleBlur = useCallback((event) => {
    if (error.errorMessage !== errors[name].errorMessage) {
      setError(errors[name]);
    } else if (defSchema.current.field.validateOnBlur) {
      const err = validateSchema.checkForField(name, event.currentTarget.value, values.current);
      if (err.errorMessage !== errors[name].errorMessage) {
        setError(err);
        handleError(name, err);
      }
    }
  }, [error.errorMessage, errors, handleError, name, validateSchema, values]);

  const handleFocus = useCallback(() => {
    !isTouched.current[name] && (isTouched.current[name] = true);
  }, [isTouched, name]);


  return {
    value,
    required: defSchema.current.required,
    defaultValue: defaultValues[name],
    onFocus: handleFocus,
    error: isTouched.current[name] && error.hasError,
    helperText: error.errorMessage,
    onBlur: handleBlur,
    onChange: handleChange
  }
}

