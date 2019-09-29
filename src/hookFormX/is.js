
const objProto = Object.prototype;
const toStr = objProto.toString;
const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
const hexRegex = /^[A-Fa-f0-9]+$/;

const is = {};

is.Bool = (v) => toStr.call(v) === '[object Boolean]'

is.Date = (v) => toStr.call(v) === '[object Date]'

is.Number = (v) => toStr.call(v) === '[object Number]'

is.Array = (v) => toStr.call(v) === '[object Array]'

is.String = (v) => toStr.call(v) === '[object String]'

is.Object = (v) => toStr.call(v) === '[object Object]'

is.Regexp = (v) => toStr.call(v) === '[object RegExp]'

is.Base64 = (v) => is.string(v) && (!v.length || base64Regex.test(v))


is.Hex = (v) => is.string(v) && (!v.length || hexRegex.test(v))


is.Function = (v) => {
  const isAlert = typeof window !== 'undefined' && v === window.alert;
  if (isAlert) {
    return true;
  }
  const str = toStr.call(v);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
}

is.ReactEventObject = (v) => is.Function(v.isPropagationStopped);

is.ReactEventCheckBox = (v) => {
  if (is.ReactEventObject(v)) {
    const { target } = v;
    return target.type === 'checkbox'
  }
}

export default is;
