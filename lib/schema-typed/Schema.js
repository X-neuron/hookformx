function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import StringType from './StringType';
export var Schema =
/*#__PURE__*/
function () {
  function Schema(schema) {
    _classCallCheck(this, Schema);

    this.schema = schema;
  }

  _createClass(Schema, [{
    key: "getFieldType",
    value: function getFieldType(fieldName) {
      return this.schema[fieldName] || new StringType();
    }
  }, {
    key: "getKeys",
    value: function getKeys() {
      return Object.keys(this.schema);
    }
  }, {
    key: "checkForField",
    value: function checkForField(fieldName, fieldValue, data) {
      var fieldChecker = this.schema[fieldName];

      if (!fieldChecker) {
        // fieldValue can be anything if no schema defined
        return {
          hasError: false
        };
      }

      return fieldChecker.check(fieldValue, data);
    }
  }, {
    key: "check",
    value: function check(data) {
      var _this = this;

      var checkResult = {
        hasError: false
      };
      Object.keys(this.schema).forEach(function (key) {
        checkResult[key] = _this.checkForField(key, data[key], data);
        checkResult.hasError === false && (checkResult.hasError = checkResult[keys[i]].hasError);
      });
      return checkResult;
    }
  }, {
    key: "checkForFieldAsync",
    value: function checkForFieldAsync(fieldName, fieldValue, data) {
      var fieldChecker = this.schema[fieldName];

      if (!fieldChecker) {
        // fieldValue can be anything if no schema defined
        return Promise.resolve({
          hasError: false
        });
      }

      return fieldChecker.checkAsync(fieldValue, data);
    }
  }, {
    key: "checkAsync",
    value: function checkAsync(data) {
      var _this2 = this;

      var checkResult = {
        hasError: false
      };
      var promises = [];
      var keys = [];
      Object.keys(this.schema).forEach(function (key) {
        keys.push(key);
        promises.push(_this2.checkForFieldAsync(key, data[key], data));
      });
      return Promise.all(promises).then(function (values) {
        for (var _i = 0; _i < values.length; _i += 1) {
          checkResult[keys[_i]] = values[_i];
          checkResult.hasError === false && (checkResult.hasError = checkResult[keys[_i]].hasError);
        }

        return checkResult;
      });
    }
  }]);

  return Schema;
}();
export var SchemaModel = function SchemaModel(o) {
  return new Schema(o);
};

SchemaModel.combine = function () {
  for (var _len = arguments.length, models = new Array(_len), _key = 0; _key < _len; _key++) {
    models[_key] = arguments[_key];
  }

  return new Schema(models.map(function (model) {
    return model.schema;
  }).reduce(function (accumulator, currentValue) {
    return Object.assign(accumulator, currentValue);
  }, {}));
};