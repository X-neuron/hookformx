function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isEmpty(value) {
  return typeof value === 'undefined' || value === null || value === '';
}

function checkRequired(value, trim) {
  // String trim
  if (trim && typeof value === 'string') {
    value = value.replace(/(^\s*)|(\s*$)/g, '');
  } // Array


  if (Array.isArray(value)) {
    return !!value.length;
  }

  return !isEmpty(value);
}

function createValidator(data) {
  return function (value, rules) {
    for (var i = 0; i < rules.length; i += 1) {
      var _rules$i = rules[i],
          onValid = _rules$i.onValid,
          errorMessage = _rules$i.errorMessage;
      var checkResult = onValid(value, data);

      if (checkResult === false) {
        return {
          hasError: true,
          errorMessage: errorMessage
        };
      }

      if (_typeof(checkResult) === 'object' && checkResult.hasError) {
        return checkResult;
      }
    }

    return null;
  };
}

function createValidatorAsync(data) {
  function check(errorMessage) {
    return function (checkResult) {
      if (checkResult === false) {
        return {
          hasError: true,
          errorMessage: errorMessage
        };
      }

      if (_typeof(checkResult) === 'object' && checkResult.hasError) {
        return checkResult;
      }

      return null;
    };
  }

  return function (value, rules) {
    var promises = rules.map(function (rule) {
      var onValid = rule.onValid,
          errorMessage = rule.errorMessage;
      return Promise.resolve(onValid(value, data)).then(check(errorMessage));
    });
    return Promise.all(promises).then(function (results) {
      return results.find(function (item) {
        return item && item.hasError;
      });
    });
  };
}

var Type =
/*#__PURE__*/
function () {
  function Type(name) {
    _classCallCheck(this, Type);

    this.name = name;
    this.required = false;
    this.requiredMessage = '';
    this.trim = false;
    this.rules = [];
    this.priorityRules = []; // Priority check rule

    this.validateOnBlur = false;
    this.validateOnChange = false;
  }

  _createClass(Type, [{
    key: "check",
    value: function check(value, data) {
      if (this.required && !checkRequired(value, this.trim)) {
        return {
          hasError: true,
          errorMessage: this.requiredMessage
        };
      }

      var validator = createValidator(data);
      var checkStatus = validator(value, this.priorityRules);

      if (checkStatus) {
        return checkStatus;
      }

      if (!this.required && isEmpty(value)) {
        return {
          hasError: false
        };
      }

      return validator(value, this.rules) || {
        hasError: false
      };
    }
  }, {
    key: "checkAsync",
    value: function checkAsync(value, data) {
      var _this = this;

      if (this.required && !checkRequired(value, this.trim)) {
        return Promise.resolve({
          hasError: true,
          errorMessage: this.requiredMessage
        });
      }

      var validator = createValidatorAsync(data);
      return new Promise(function (resolve) {
        return validator(value, _this.priorityRules).then(function (checkStatus) {
          if (checkStatus) {
            resolve(checkStatus);
          }
        }).then(function () {
          if (!_this.required && isEmpty(value)) {
            resolve({
              hasError: false
            });
          }
        }).then(function () {
          return validator(value, _this.rules);
        }).then(function (checkStatus) {
          if (checkStatus) {
            resolve(checkStatus);
          }

          resolve({
            hasError: false
          });
        });
      });
    }
  }, {
    key: "pushRule",
    value: function pushRule(onValid, errorMessage, priority) {
      errorMessage = errorMessage || this.rules[0].errorMessage;

      if (priority) {
        this.priorityRules.push({
          onValid: onValid,
          errorMessage: errorMessage
        });
      } else {
        this.rules.push({
          onValid: onValid,
          errorMessage: errorMessage
        });
      }
    }
  }, {
    key: "addRule",
    value: function addRule(onValid, errorMessage, priority) {
      this.pushRule(onValid, errorMessage, priority);
      return this;
    }
  }, {
    key: "isRequired",
    value: function isRequired(errorMessage) {
      var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.required = true;
      this.trim = trim;
      this.requiredMessage = errorMessage;
      return this;
    }
  }, {
    key: "checkOnChange",
    value: function checkOnChange() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.validateOnBlur = typeof bool === 'boolean' ? bool : false;
      return this;
    }
  }, {
    key: "checkOnBlur",
    value: function checkOnBlur() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.validateOnChange = typeof bool === 'boolean' ? bool : false;
      return this;
    }
  }]);

  return Type;
}();

export default Type;