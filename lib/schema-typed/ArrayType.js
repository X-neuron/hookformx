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

var ArrayType =
/*#__PURE__*/
function (_Type) {
  _inherits(ArrayType, _Type);

  _createClass(ArrayType, null, [{
    key: "from",
    value: function from(n) {
      return n;
    }
  }]);

  function ArrayType() {
    var _this;

    var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Please enter a valid array';

    _classCallCheck(this, ArrayType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayType).call(this, 'array'));

    _get(_getPrototypeOf(ArrayType.prototype), "pushRule", _assertThisInitialized(_this)).call(_assertThisInitialized(_this), function (v) {
      return Array.isArray(v);
    }, errorMessage);

    return _this;
  }

  _createClass(ArrayType, [{
    key: "rangeLength",
    value: function rangeLength(minLength, maxLength, errorMessage) {
      _get(_getPrototypeOf(ArrayType.prototype), "pushRule", this).call(this, function (value) {
        return value.length >= minLength && value.length <= maxLength;
      }, errorMessage);

      return this;
    }
  }, {
    key: "minLength",
    value: function minLength(_minLength, errorMessage) {
      _get(_getPrototypeOf(ArrayType.prototype), "pushRule", this).call(this, function (value) {
        return value.length >= _minLength;
      }, errorMessage);

      return this;
    }
  }, {
    key: "maxLength",
    value: function maxLength(_maxLength, errorMessage) {
      _get(_getPrototypeOf(ArrayType.prototype), "pushRule", this).call(this, function (value) {
        return value.length <= _maxLength;
      }, errorMessage);

      return this;
    }
  }, {
    key: "unrepeatable",
    value: function unrepeatable(errorMessage) {
      _get(_getPrototypeOf(ArrayType.prototype), "pushRule", this).call(this, function (items) {
        var hash = {};
        /* eslint-disable */

        for (var i in items) {
          if (hash[items[i]]) {
            return false;
          }

          hash[items[i]] = true;
        }

        return true;
      }, errorMessage);

      return this;
    }
    /**
     * @example
     * ArrayType('这是一个数组').of(
     *      StringType().isOneOf(['数码','体育','游戏','旅途','其他'],
     *      '只能是选择中的值'
     * )
     */

  }, {
    key: "of",
    value: function of(type, errorMessage) {
      _get(_getPrototypeOf(ArrayType.prototype), "pushRule", this).call(this, function (items) {
        var valids = items.map(function (value) {
          return type.check(value);
        });
        var errors = valids.filter(function (item) {
          return item.hasError;
        }) || [];

        if (errors.length) {
          return errors[0];
        }

        return errors.length === 0;
      }, errorMessage);

      return this;
    }
  }]);

  return ArrayType;
}(Type);

export default (function (errorMessage) {
  return new ArrayType(errorMessage);
});