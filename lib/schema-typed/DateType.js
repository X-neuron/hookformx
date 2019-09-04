function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var DateType =
/*#__PURE__*/
function (_Type) {
  _inherits(DateType, _Type);

  _createClass(DateType, null, [{
    key: "from",
    value: function from(n) {
      return n;
    }
  }]);

  function DateType() {
    var _this;

    var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Please enter a valid date';

    _classCallCheck(this, DateType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateType).call(this, 'date'));

    _get(_getPrototypeOf(DateType.prototype), "pushRule", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), function (value) {
      return !/Invalid|NaN/.test(new Date(value));
    }, errorMessage);

    return _this;
  }

  _createClass(DateType, [{
    key: "range",
    value: function range(min, max, errorMessage) {
      _get(_getPrototypeOf(DateType.prototype), "pushRule", this).call(this, function (value) {
        return new Date(value) >= new Date(min) && new Date(value) <= new Date(max);
      }, errorMessage);

      return this;
    }
  }, {
    key: "min",
    value: function min(_min, errorMessage) {
      _get(_getPrototypeOf(DateType.prototype), "pushRule", this).call(this, function (value) {
        return new Date(value) >= new Date(_min);
      }, errorMessage);

      return this;
    }
  }, {
    key: "max",
    value: function max(_max, errorMessage) {
      _get(_getPrototypeOf(DateType.prototype), "pushRule", this).call(this, function (value) {
        return new Date(value) <= new Date(_max);
      }, errorMessage);

      return this;
    }
  }]);

  return DateType;
}(Type);

export default (function (errorMessage) {
  return new DateType(errorMessage);
});