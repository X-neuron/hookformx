import { useState, useRef, useCallback } from 'react';
import errorMessage from '../schema-typed/NumberType';

export function useFormx(defaultValues, validateSchema, submitCallback) {
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

  const useInput = (name, validateStyle) => useFormInput(name, validateStyle, defaultValues, validateSchema, formValues, handleError, isTouched, errors);

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
  validateStyle,
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
      if (validateStyle === 'change') {
        const err = validateSchema.checkForField(name, event.currentTarget.value, values.current);
        setError(err);
        handleError(name, err);
      }
    }
  }, [handleError, name, validateSchema, validateStyle, values]);

  const handleBlur = useCallback((event) => {
    let err;
    if (validateStyle === 'blur') {
      err = validateSchema.checkForField(name, event.currentTarget.value, values.current);
    }
    if (err && err.errorMessage !== errors[name].errorMessage) {
      setError(err);
      handleError(name, err);
    }
  }, [errors, handleError, name, validateSchema, validateStyle, values]);

  const handleFocus = useCallback(() => {
    !isTouched.current[name] && (isTouched.current[name] = true);
  }, [isTouched, name]);

  return {
    value,
    required: defSchema.current.required,
    defaultValue: defaultValues[name],
    onFocus: handleFocus,
    error: isTouched.current[name] && error.hasError,
    helperText: isTouched.current[name] ? error.errorMessage: '',
    onBlur: handleBlur,
    onChange: handleChange
  }
}

