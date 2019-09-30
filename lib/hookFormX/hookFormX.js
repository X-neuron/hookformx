function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useState, useRef, useCallback } from 'react';
import is from './is';

var getRealValue = function getRealValue(v) {
  // if (is.ReactEventObject(v)) return v.currentTarget.value;
  if (is.Date(v)) return v;
  var target = v.target;
  return target.type === 'checkbox' ? target.checked : target.value;
};

var capitalize = function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
};

export function useFormx(defaultValues, validateSchema, submitCallback) {
  // we using useRef to store the formValues,when the values change, it does'nt infulence others for performance reason
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
    values: formValues.current,
    useInput: useInput,
    errors: errors,
    isValid: errors.hasError,
    handleSubmit: handleSubmit
  };
}

function useFormInput(name, validateStyle, defaultValues, validateSchema, values, handleError, isTouched, errors) {
  var _ref;

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

  validateStyle = capitalize(validateStyle);
  var isChecked = useRef('$');
  var defSchema = useRef({
    required: validateSchema.getFieldType(name).required,
    field: validateSchema.getFieldType(name)
  });
  var handleChange = useCallback(function (event) {
    is.ReactEventCheckBox(event) ? isChecked.current = 'ed' : '$';
    var CurValue = getRealValue(event);

    if (values.current[name] !== CurValue) {
      values.current[name] = CurValue;
      setValue(CurValue);

      if (validateStyle === 'Change') {
        var err = validateSchema.checkForField(name, CurValue, values.current);

        if (!is.equal(err, errors[name])) {
          setError(err);
          handleError(name, err);
        }
      }
    }
  }, [errors, handleError, name, validateSchema, validateStyle, values]);
  var handleBlur = useCallback(function (event) {
    var err;
    var CurValue = getRealValue(event);

    if (validateStyle === 'Blur') {
      err = validateSchema.checkForField(name, CurValue, values.current);
    }

    if (err && !is.equal(err, errors[name])) {
      setError(err);
      handleError(name, err);
    }
  }, [errors, handleError, name, validateSchema, validateStyle, values]);
  var handleFocus = useCallback(function () {
    !isTouched.current[name] && (isTouched.current[name] = true);
  }, [isTouched, name]);
  return _ref = {
    value: value
  }, _defineProperty(_ref, "check".concat(isChecked.current), value), _defineProperty(_ref, "required", defSchema.current.required), _defineProperty(_ref, "defaultValue", defaultValues[name]), _defineProperty(_ref, "onFocus", handleFocus), _defineProperty(_ref, "error", isTouched.current[name] && error.hasError), _defineProperty(_ref, "helperText", isTouched.current[name] ? error.errorMessage : ''), _defineProperty(_ref, "onChange", handleChange), _defineProperty(_ref, "onBlur", handleBlur), _ref;
}