
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

is.equal = (v1, v2) => checkEquality(v1, v2, []);


function checkEquality(a, b, refs) {
  let var1;
  let var2;
  let var3 = Object.prototype.toString.call(a);
  let var4 = Object.prototype.toString.call(b);

  if (a === b) return true;
  if (a === null || b === null) return false;
  if (refs.indexOf(a) > -1 && refs.indexOf(b) > -1) return true;
  refs.push(a, b); // save results for self-referential checks
  if (var3 != var4) return false; // not the same type of objects

  switch (var3) {
    case '[object Symbol]':
      return a.valueOf() == b.valueOf();
    case '[object Date]':
    case '[object Number]':
      return +a == +b || (+a != +a && +b != +b); // convert Dates to ms, check for NaN
    case '[object RegExp]':
    case '[object Function]':
    case '[object String]':
    case '[object Boolean]':
      return `${a}` == `${b}`;
    case '[object Set]':
    case '[object Map]': {
      var1 = a.entries();
      var2 = b.entries();
      var3 = false;
      while (!var3) {
        var4 = var1.next();
        var3 = var4.done;
        if (!checkEquality(var4.value, var2.next().value, refs)) {
          return false;
        }
      }
      return true;
    }
    case '[object ArrayBuffer]':
      (a = new Uint8Array(a)), (b = new Uint8Array(b)); // fall through to be handled as an Array
    case '[object DataView]':
      (a = new Uint8Array(a.buffer)), (b = new Uint8Array(b.buffer)); // fall through to be handled as an Array
    case '[object Float32Array]':
    case '[object Float64Array]':
    case '[object Int8Array]':
    case '[object Int16Array]':
    case '[object Int32Array]':
    case '[object Uint8Array]':
    case '[object Uint16Array]':
    case '[object Uint32Array]':
    case '[object Uint8ClampedArray]':
    case '[object Arguments]':
    case '[object Array]':
      if (a.length !== b.length) return false;
      for (var1 = 0; var1 < a.length; var1++) {
        if (!checkEquality(a[var1], b[var1], refs)) return false;
      }
      return true;
    case '[object Object]':
      var3 = Object.getOwnPropertySymbols;
      var1 = var3 ? Object.keys(a).concat(var3(a)) : Object.keys(a);
      var2 = var3 ? Object.keys(b).concat(var3(b)) : Object.keys(b);

      return (
        var1.length === var2.length
        && checkEquality(
          Object.getPrototypeOf(a),
          Object.getPrototypeOf(b),
          refs
        )
        && var1.every(function (key) {
          return checkEquality(a[key], b[key], refs);
        })
      );
    default:
      return false;
  }
}

export default is;
