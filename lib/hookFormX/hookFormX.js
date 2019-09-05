function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useState, useRef, useCallback } from 'react';
export function useFormx(defaultValues, validateSchema, submitCallback) {
  // we using useRef to store the formValues,when the values change, it does'nt infulence others for performance reason
  // const [values, setValues] = useState(defaultValues);
  var formValues = useRef(defaultValues);

  var _useState = useState(validateSchema.check(formValues.current)),
      _useState2 = _slicedToArray(_useState, 2),
      errors = _useState2[0],
      setErrors = _useState2[1];

  var isTouched = useRef({});

  var handleSubmit = function handleSubmit(event) {
    if (event) event.preventDefault();
    submitCallback();
  };

  var handleError = useCallback(function (name, error) {
    var hasError = errors.hasError; // 初始化为errors的原始值。

    if (error.hasError) {
      hasError = true;
    } else if (errors.hasError) {
      hasError = false;
      validateSchema.getKeys().forEach(function (key) {
        if (key !== name) {
          errors[key].hasError === true && (hasError = true);
        } else {
          error.hasError === true && (hasError = true);
        }
      });
    }

    setErrors(_objectSpread({}, errors, _defineProperty({
      hasError: hasError
    }, name, error)));
  }, [errors, validateSchema]);

  var useInput = function useInput(name, validateStyle) {
    return useFormInput(name, validateStyle, defaultValues, validateSchema, formValues, handleError, isTouched, errors);
  };

  return {
    values: formValues,
    useInput: useInput,
    errors: errors,
    isValid: errors.hasError,
    handleSubmit: handleSubmit
  };
}

function useFormInput(name, validateStyle, defaultValues, validateSchema, values, handleError, isTouched, errors) {
  // we using useRef to store the formValues,when the values change, it does'nt infulence others
  var _useState3 = useState(defaultValues[name]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState({
    hasError: false,
    errorMessage: ''
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  var defSchema = useRef({
    required: validateSchema.getFieldType(name).required,
    field: validateSchema.getFieldType(name)
  });
  var handleChange = useCallback(function (event) {
    if (values.current[name] !== event.currentTarget.value) {
      values.current[name] = event.currentTarget.value;
      setValue(event.currentTarget.value);

      if (validateStyle === 'change') {
        var err = validateSchema.checkForField(name, event.currentTarget.value, values.current);
        setError(err);
        handleError(name, err);
      }
    }
  }, [handleError, name, validateSchema, validateStyle, values]);
  var handleBlur = useCallback(function (event) {
    var err;

    if (validateStyle === 'blur') {
      err = validateSchema.checkForField(name, event.currentTarget.value, values.current);
    }

    if (err.errorMessage !== errors[name].errorMessage) {
      setError(err);
      handleError(name, err);
    }
  }, [errors, handleError, name, validateSchema, validateStyle, values]);
  var handleFocus = useCallback(function () {
    !isTouched.current[name] && (isTouched.current[name] = true);
  }, [isTouched, name]);
  return {
    value: value,
    required: defSchema.current.required,
    defaultValue: defaultValues[name],
    onFocus: handleFocus,
    error: isTouched.current[name] && error.hasError,
    helperText: isTouched.current[name] ? error.errorMessage : '',
    onBlur: handleBlur,
    onChange: handleChange
  };
}