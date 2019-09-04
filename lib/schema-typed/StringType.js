function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import Type from './Type';
/* eslint-disable */

var StringType =
/*#__PURE__*/
function (_Type) {
  _inherits(StringType, _Type);

  _createClass(StringType, null, [{
    key: "from",
    value: function from(s) {
      return "".concat(s);
    }
  }]);

  function StringType() {
    var _this;

    var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Please enter a valid string';

    _classCallCheck(this, StringType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StringType).call(this, 'string'));

    _get(_getPrototypeOf(StringType.prototype), "pushRule", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), function (v) {
      return typeof v === 'string';
    }, errorMessage);

    return _this;
  }

  _createClass(StringType, [{
    key: "containsLetter",
    value: function containsLetter(errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return /[a-zA-Z]/.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "containsUppercaseLetter",
    value: function containsUppercaseLetter(errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return /[A-Z]/.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "containsLowercaseLetter",
    value: function containsLowercaseLetter(errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return /[a-z]/.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "containsLetterOnly",
    value: function containsLetterOnly(errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return /^[a-zA-Z]+$/.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "containsNumber",
    value: function containsNumber(errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return /[0-9]/.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "isOneOf",
    value: function isOneOf(strArr, errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return ~strArr.indexOf(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "isEmail",
    value: function isEmail(errorMessage) {
      //http://emailregex.com/
      var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return regexp.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "isURL",
    value: function isURL(errorMessage) {
      var regexp = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i');

      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return regexp.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "isHex",
    value: function isHex(errorMessage) {
      var regexp = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;

      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (v) {
        return regexp.test(v);
      }, errorMessage);

      return this;
    }
  }, {
    key: "pattern",
    value: function pattern(regexp, errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (value) {
        return regexp.test(value);
      }, errorMessage);

      return this;
    }
  }, {
    key: "rangeLength",
    value: function rangeLength(minLength, maxLength, errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (value) {
        return value.length >= minLength && value.length <= maxLength;
      }, errorMessage);

      return this;
    }
  }, {
    key: "minLength",
    value: function minLength(_minLength, errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (value) {
        return _toConsumableArray(value).length >= _minLength;
      }, errorMessage);

      return this;
    }
  }, {
    key: "maxLength",
    value: function maxLength(_maxLength, errorMessage) {
      _get(_getPrototypeOf(StringType.prototype), "pushRule", this).call(this, function (value) {
        return _toConsumableArray(value).length <= _maxLength;
      }, errorMessage);

      return this;
    }
  }]);

  return StringType;
}(Type);

export default (function (errorMessage) {
  return new StringType(errorMessage);
});