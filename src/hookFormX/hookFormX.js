import { useState, useRef, useCallback } from 'react';
import is from './is';

const getRealValue = (v) => {
  // if (is.ReactEventObject(v)) return v.currentTarget.value;
  if (is.Date(v)) return v;
  const { target } = v;
  return target.type === 'checkbox' ? target.checked : target.value
}

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);


export function useFormx(defaultValues, validateSchema, submitCallback) {
  // we using useRef to store the formValues,when the values change, it does'nt infulence others for performance reason
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
    values: formValues.current,
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
  validateStyle = capitalize(validateStyle);

  const isChecked = useRef('$');
  const defSchema = useRef({
    required: validateSchema.getFieldType(name).required,
    field:validateSchema.getFieldType(name)
  });

  const handleChange = useCallback((event) => {
    is.ReactEventCheckBox(event) ? isChecked.current = 'ed' : '$';
    const CurValue = getRealValue(event);
    if (values.current[name] !== CurValue) {
      values.current[name] = CurValue;
      setValue(CurValue);
      if (validateStyle === 'Change') {
        const err = validateSchema.checkForField(name, CurValue, values.current);
        if (!is.equal(err, errors[name])) {
          setError(err);
          handleError(name, err);
        }
      }
    }
  }, [errors, handleError, name, validateSchema, validateStyle, values]);

  const handleBlur = useCallback((event) => {
    let err;
    const CurValue = getRealValue(event);
    if (validateStyle === 'Blur') {
      err = validateSchema.checkForField(name, CurValue, values.current);
    }
    if (err && !is.equal(err, errors[name])) {
      setError(err);
      handleError(name, err);
    }
  }, [errors, handleError, name, validateSchema, validateStyle, values]);

  const handleFocus = useCallback(() => {
    !isTouched.current[name] && (isTouched.current[name] = true);
  }, [isTouched, name]);

  return {
    value,
    [`check${isChecked.current}`]: value,
    required: defSchema.current.required,
    defaultValue: defaultValues[name],
    onFocus: handleFocus,
    error: isTouched.current[name] && error.hasError,
    helperText: isTouched.current[name] ? error.errorMessage: '',
    // [`on${validateStyle}`]: validateStyle === 'Change' ? handleChange : handleBlur
    onChange:handleChange,
    onBlur:handleBlur
  }
}


