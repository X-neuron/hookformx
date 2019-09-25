var objProto = Object.prototype;
var toStr = objProto.toString;
var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;
var is = {};

is.Bool = function (v) {
  return toStr.call(v) === '[object Boolean]';
};

is.Date = function (v) {
  return toStr.call(v) === '[object Date]';
};

is.Number = function (v) {
  return toStr.call(v) === '[object Number]';
};

is.Array = function (v) {
  return toStr.call(v) === '[object Array]';
};

is.String = function (v) {
  return toStr.call(v) === '[object String]';
};

is.Object = function (v) {
  return toStr.call(v) === '[object Object]';
};

is.Regexp = function (v) {
  return toStr.call(v) === '[object RegExp]';
};

is.Base64 = function (v) {
  return is.string(v) && (!v.length || base64Regex.test(v));
};

is.Hex = function (v) {
  return is.string(v) && (!v.length || hexRegex.test(v));
};

is.Function = function (v) {
  var isAlert = typeof window !== 'undefined' && v === window.alert;

  if (isAlert) {
    return true;
  }

  var str = toStr.call(v);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

is.ReactEventObject = function (v) {
  return is.Function(v.isPropagationStopped);
};

export default is;