
/*! mobile-text-selection 0.1.4*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TextSelection = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$e =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$b = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$a = fails$b;

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails$a(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var objectPropertyIsEnumerable = {};

	var nativePropertyIsEnumerable$1 = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !nativePropertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable$1;

	var createPropertyDescriptor$5 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$2 = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString$2.call(it).slice(8, -1);
	};

	var fails$9 = fails$b;
	var classof$7 = classofRaw$1;

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$9(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$7(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$3 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$2 = requireObjectCoercible$3;

	var toIndexedObject$7 = function (it) {
	  return IndexedObject$1(requireObjectCoercible$2(it));
	};

	var isObject$9 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$8 = isObject$9;

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive$4 = function (input, PREFERRED_STRING) {
	  if (!isObject$8(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$8(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$8(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$8(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has$a = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var global$d = global$e;
	var isObject$7 = isObject$9;

	var document$1 = global$d.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$7(document$1) && isObject$7(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$7 = descriptors;
	var fails$8 = fails$b;
	var createElement = documentCreateElement$1;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$7 && !fails$8(function () {
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$6 = descriptors;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$4 = createPropertyDescriptor$5;
	var toIndexedObject$6 = toIndexedObject$7;
	var toPrimitive$3 = toPrimitive$4;
	var has$9 = has$a;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$6(O);
	  P = toPrimitive$3(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return nativeGetOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (has$9(O, P)) return createPropertyDescriptor$4(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
	};

	var fails$7 = fails$b;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails$7(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var path$a = {};

	var aFunction$2 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var aFunction$1 = aFunction$2;

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty = {};

	var isObject$6 = isObject$9;

	var anObject$7 = function (it) {
	  if (!isObject$6(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var DESCRIPTORS$5 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$6 = anObject$7;
	var toPrimitive$2 = toPrimitive$4;

	var nativeDefineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$5 ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$6(O);
	  P = toPrimitive$2(P, true);
	  anObject$6(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return nativeDefineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$5;

	var createNonEnumerableProperty$8 = DESCRIPTORS$4 ? function (object, key, value) {
	  return definePropertyModule$3.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$c = global$e;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var isForced = isForced_1;
	var path$9 = path$a;
	var bind$2 = functionBindContext;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
	var has$8 = has$a;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$c : STATIC ? global$c[TARGET] : (global$c[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$9 : path$9[TARGET] || (path$9[TARGET] = {});
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has$8(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$2(sourceProperty, global$c);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind$2(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$7(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has$8(path$9, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$7(path$9, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      path$9[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty$7(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var classof$6 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray$b = Array.isArray || function isArray(arg) {
	  return classof$6(arg) == 'Array';
	};

	var $$d = _export;
	var isArray$a = isArray$b;

	// `Array.isArray` method
	// https://tc39.github.io/ecma262/#sec-array.isarray
	$$d({ target: 'Array', stat: true }, {
	  isArray: isArray$a
	});

	var path$8 = path$a;

	var isArray$9 = path$8.Array.isArray;

	var parent$d = isArray$9;

	var isArray$8 = parent$d;

	var isArray$7 = isArray$8;

	var _Array$isArray$1 = isArray$7;

	function _arrayWithHoles(arr) {
	  if (_Array$isArray$1(arr)) return arr;
	}

	var arrayWithHoles$1 = _arrayWithHoles;

	var iterators = {};

	var global$b = global$e;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;

	var setGlobal$1 = function (key, value) {
	  try {
	    createNonEnumerableProperty$6(global$b, key, value);
	  } catch (error) {
	    global$b[key] = value;
	  } return value;
	};

	var global$a = global$e;
	var setGlobal = setGlobal$1;

	var SHARED = '__core-js_shared__';
	var store$3 = global$a[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof store$2.inspectSource != 'function') {
	  store$2.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$1 = store$2.inspectSource;

	var global$9 = global$e;
	var inspectSource = inspectSource$1;

	var WeakMap$1 = global$9.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

	var shared$3 = {exports: {}};

	var store$1 = sharedStore;

	(shared$3.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.4',
	  mode: 'pure' ,
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});

	var id = 0;
	var postfix = Math.random();

	var uid$3 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var shared$2 = shared$3.exports;
	var uid$2 = uid$3;

	var keys = shared$2('keys');

	var sharedKey$4 = function (key) {
	  return keys[key] || (keys[key] = uid$2(key));
	};

	var hiddenKeys$5 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$8 = global$e;
	var isObject$5 = isObject$9;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
	var objectHas = has$a;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$4 = hiddenKeys$5;

	var WeakMap = global$8.WeakMap;
	var set, get, has$7;

	var enforce = function (it) {
	  return has$7(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP) {
	  var store = new WeakMap();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$7 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$3('state');
	  hiddenKeys$4[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty$5(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };
	  has$7 = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$7,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var requireObjectCoercible$1 = requireObjectCoercible$3;

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject$5 = function (argument) {
	  return Object(requireObjectCoercible$1(argument));
	};

	var fails$6 = fails$b;

	var correctPrototypeGetter = !fails$6(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var has$6 = has$a;
	var toObject$4 = toObject$5;
	var sharedKey$2 = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO$1 = sharedKey$2('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
	  O = toObject$4(O);
	  if (has$6(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var fails$5 = fails$b;

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var global$7 = global$e;
	var shared$1 = shared$3.exports;
	var has$5 = has$a;
	var uid$1 = uid$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$1('wks');
	var Symbol$1 = global$7.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$g = function (name) {
	  if (!has$5(WellKnownSymbolsStore$1, name)) {
	    if (NATIVE_SYMBOL$1 && has$5(Symbol$1, name)) WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    else WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore$1[name];
	};

	var getPrototypeOf$1 = objectGetPrototypeOf;
	var wellKnownSymbol$f = wellKnownSymbol$g;

	wellKnownSymbol$f('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype$2 == undefined) IteratorPrototype$2 = {};

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger$3 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var toInteger$2 = toInteger$3;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength$5 = function (argument) {
	  return argument > 0 ? min$1(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$1 = toInteger$3;

	var max$1 = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max$1(integer + length, 0) : min(integer, length);
	};

	var toIndexedObject$5 = toIndexedObject$7;
	var toLength$4 = toLength$5;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$5($this);
	    var length = toLength$4(O.length);
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var has$4 = has$a;
	var toIndexedObject$4 = toIndexedObject$7;
	var indexOf$4 = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$4(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$4(hiddenKeys$3, key) && has$4(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$4(O, key = names[i++])) {
	    ~indexOf$4(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys$2 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$5 = anObject$7;
	var objectKeys$1 = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = DESCRIPTORS$3 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$5(O);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var path$7 = path$a;
	var global$6 = global$e;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$3 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path$7[namespace]) || aFunction(global$6[namespace])
	    : path$7[namespace] && path$7[namespace][method] || global$6[namespace] && global$6[namespace][method];
	};

	var getBuiltIn$2 = getBuiltIn$3;

	var html$1 = getBuiltIn$2('document', 'documentElement');

	var anObject$4 = anObject$7;
	var defineProperties = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$2 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$1 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey$1('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
	  return NullProtoObject();
	};

	hiddenKeys$2[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$4(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : defineProperties(result, Properties);
	};

	var wellKnownSymbol$e = wellKnownSymbol$g;

	var TO_STRING_TAG$3 = wellKnownSymbol$e('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$d = wellKnownSymbol$g;

	var TO_STRING_TAG$2 = wellKnownSymbol$d('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$4 = classof$5;

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$4(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineProperty$7 = objectDefineProperty.f;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
	var has$3 = has$a;
	var toString$1 = objectToString;
	var wellKnownSymbol$c = wellKnownSymbol$g;

	var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');

	var setToStringTag$5 = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$3(target, TO_STRING_TAG$1)) {
	      defineProperty$7(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty$4(target, 'toString', toString$1);
	    }
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create = objectCreate;
	var createPropertyDescriptor$2 = createPropertyDescriptor$5;
	var setToStringTag$4 = setToStringTag$5;
	var Iterators$6 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor$2(1, next) });
	  setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators$6[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var isObject$4 = isObject$9;

	var aPossiblePrototype$1 = function (it) {
	  if (!isObject$4(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	var anObject$3 = anObject$7;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$3(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;

	var redefine$2 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$3(target, key, value);
	};

	var $$c = _export;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setToStringTag$3 = setToStringTag$5;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;
	var redefine$1 = redefine$2;
	var wellKnownSymbol$b = wellKnownSymbol$g;
	var Iterators$5 = iterators;
	var IteratorsCore = iteratorsCore;

	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol$b('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      Iterators$5[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty$2(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  Iterators$5[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$1(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$c({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var toIndexedObject$3 = toIndexedObject$7;
	var Iterators$4 = iterators;
	var InternalStateModule$2 = internalState;
	var defineIterator$1 = defineIterator$2;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$2(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$3(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	Iterators$4.Arguments = Iterators$4.Array;

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var DOMIterables$1 = domIterables;
	var global$5 = global$e;
	var classof$3 = classof$5;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
	var Iterators$3 = iterators;
	var wellKnownSymbol$a = wellKnownSymbol$g;

	var TO_STRING_TAG = wellKnownSymbol$a('toStringTag');

	for (var COLLECTION_NAME in DOMIterables$1) {
	  var Collection = global$5[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof$3(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  Iterators$3[COLLECTION_NAME] = Iterators$3.Array;
	}

	var toInteger = toInteger$3;
	var requireObjectCoercible = requireObjectCoercible$3;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt;
	var InternalStateModule$1 = internalState;
	var defineIterator = defineIterator$2;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$1 = InternalStateModule$1.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var classof$2 = classof$5;
	var Iterators$2 = iterators;
	var wellKnownSymbol$9 = wellKnownSymbol$g;

	var ITERATOR$3 = wellKnownSymbol$9('iterator');

	var getIteratorMethod$2 = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || Iterators$2[classof$2(it)];
	};

	var anObject$2 = anObject$7;
	var getIteratorMethod$1 = getIteratorMethod$2;

	var getIterator$2 = function (it) {
	  var iteratorMethod = getIteratorMethod$1(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject$2(iteratorMethod.call(it));
	};

	var getIterator$1 = getIterator$2;

	var getIterator_1 = getIterator$1;

	var getIterator = getIterator_1;

	var classof$1 = classof$5;
	var wellKnownSymbol$8 = wellKnownSymbol$g;
	var Iterators$1 = iterators;

	var ITERATOR$2 = wellKnownSymbol$8('iterator');

	var isIterable$2 = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$2] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || Iterators$1.hasOwnProperty(classof$1(O));
	};

	var isIterable$1 = isIterable$2;

	var isIterable_1 = isIterable$1;

	var isIterable = isIterable_1;

	var toPrimitive$1 = toPrimitive$4;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$5;

	var createProperty$3 = function (object, key, value) {
	  var propertyKey = toPrimitive$1(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var isObject$3 = isObject$9;
	var isArray$6 = isArray$b;
	var wellKnownSymbol$7 = wellKnownSymbol$g;

	var SPECIES$2 = wellKnownSymbol$7('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  var C;
	  if (isArray$6(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$6(C.prototype))) C = undefined;
	    else if (isObject$3(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var getBuiltIn$1 = getBuiltIn$3;

	var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

	var global$4 = global$e;
	var userAgent$1 = engineUserAgent;

	var process = global$4.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent$1) {
	  match = userAgent$1.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$1.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var fails$4 = fails$b;
	var wellKnownSymbol$6 = wellKnownSymbol$g;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$1 = wellKnownSymbol$6('species');

	var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$4(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$b = _export;
	var fails$3 = fails$b;
	var isArray$5 = isArray$b;
	var isObject$2 = isObject$9;
	var toObject$3 = toObject$5;
	var toLength$3 = toLength$5;
	var createProperty$2 = createProperty$3;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
	var wellKnownSymbol$5 = wellKnownSymbol$g;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$3(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$2(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$5(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$b({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject$3(this);
	    var A = arraySpeciesCreate$1(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength$3(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$2(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNamesExternal = {};

	var toIndexedObject$2 = toIndexedObject$7;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames$1(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames$1(toIndexedObject$2(it));
	};

	var objectGetOwnPropertySymbols = {};

	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$4 = wellKnownSymbol$g;

	wellKnownSymbolWrapped.f = wellKnownSymbol$4;

	var path$6 = path$a;
	var has$2 = has$a;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$6 = objectDefineProperty.f;

	var defineWellKnownSymbol$j = function (NAME) {
	  var Symbol = path$6.Symbol || (path$6.Symbol = {});
	  if (!has$2(Symbol, NAME)) defineProperty$6(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var bind$1 = functionBindContext;
	var IndexedObject = indexedObject;
	var toObject$2 = toObject$5;
	var toLength$2 = toLength$5;
	var arraySpeciesCreate = arraySpeciesCreate$2;

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$2($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind$1(callbackfn, that, 3);
	    var length = toLength$2(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6)
	};

	var $$a = _export;
	var global$3 = global$e;
	var getBuiltIn = getBuiltIn$3;
	var DESCRIPTORS$2 = descriptors;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var fails$2 = fails$b;
	var has$1 = has$a;
	var isArray$4 = isArray$b;
	var isObject$1 = isObject$9;
	var anObject$1 = anObject$7;
	var toObject$1 = toObject$5;
	var toIndexedObject$1 = toIndexedObject$7;
	var toPrimitive = toPrimitive$4;
	var createPropertyDescriptor = createPropertyDescriptor$5;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$2;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createNonEnumerableProperty = createNonEnumerableProperty$8;
	var redefine = redefine$2;
	var shared = shared$3.exports;
	var sharedKey = sharedKey$4;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol$3 = wellKnownSymbol$g;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$i = defineWellKnownSymbol$j;
	var setToStringTag$2 = setToStringTag$5;
	var InternalStateModule = internalState;
	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$3('toPrimitive');
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$3.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global$3.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$2 && fails$2(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$2) symbol.description = description;
	  return symbol;
	};

	var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$1(O);
	  var key = toPrimitive(P, true);
	  anObject$1(Attributes);
	  if (has$1(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$1(O);
	  var properties = toIndexedObject$1(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!DESCRIPTORS$2 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable.call(this, P);
	  if (this === ObjectPrototype && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has$1(AllSymbols, key) && !has$1(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (DESCRIPTORS$2 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap$1(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap$1(wellKnownSymbol$3(name), name);
	  };

	  if (DESCRIPTORS$2) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	  }
	}

	$$a({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$i(name);
	});

	$$a({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$a({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$2 }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$a({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$a({ target: 'Object', stat: true, forced: fails$2(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject$1(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$2(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$a({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$4(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$2($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineWellKnownSymbol$h = defineWellKnownSymbol$j;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol$h('asyncIterator');

	var defineWellKnownSymbol$g = defineWellKnownSymbol$j;

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol$g('hasInstance');

	var defineWellKnownSymbol$f = defineWellKnownSymbol$j;

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol$f('isConcatSpreadable');

	var defineWellKnownSymbol$e = defineWellKnownSymbol$j;

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$e('iterator');

	var defineWellKnownSymbol$d = defineWellKnownSymbol$j;

	// `Symbol.match` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.match
	defineWellKnownSymbol$d('match');

	var defineWellKnownSymbol$c = defineWellKnownSymbol$j;

	// `Symbol.matchAll` well-known symbol
	defineWellKnownSymbol$c('matchAll');

	var defineWellKnownSymbol$b = defineWellKnownSymbol$j;

	// `Symbol.replace` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.replace
	defineWellKnownSymbol$b('replace');

	var defineWellKnownSymbol$a = defineWellKnownSymbol$j;

	// `Symbol.search` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.search
	defineWellKnownSymbol$a('search');

	var defineWellKnownSymbol$9 = defineWellKnownSymbol$j;

	// `Symbol.species` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.species
	defineWellKnownSymbol$9('species');

	var defineWellKnownSymbol$8 = defineWellKnownSymbol$j;

	// `Symbol.split` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.split
	defineWellKnownSymbol$8('split');

	var defineWellKnownSymbol$7 = defineWellKnownSymbol$j;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol$7('toPrimitive');

	var defineWellKnownSymbol$6 = defineWellKnownSymbol$j;

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol$6('toStringTag');

	var defineWellKnownSymbol$5 = defineWellKnownSymbol$j;

	// `Symbol.unscopables` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol$5('unscopables');

	var setToStringTag$1 = setToStringTag$5;

	// Math[@@toStringTag] property
	// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
	setToStringTag$1(Math, 'Math', true);

	var global$2 = global$e;
	var setToStringTag = setToStringTag$5;

	// JSON[@@toStringTag] property
	// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
	setToStringTag(global$2.JSON, 'JSON', true);

	var path$5 = path$a;

	var symbol$2 = path$5.Symbol;

	var defineWellKnownSymbol$4 = defineWellKnownSymbol$j;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$4('asyncDispose');

	var defineWellKnownSymbol$3 = defineWellKnownSymbol$j;

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$3('dispose');

	var defineWellKnownSymbol$2 = defineWellKnownSymbol$j;

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol$2('observable');

	var defineWellKnownSymbol$1 = defineWellKnownSymbol$j;

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$1('patternMatch');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = defineWellKnownSymbol$j;

	defineWellKnownSymbol('replaceAll');

	var parent$c = symbol$2;




	// TODO: Remove from `core-js@4`


	var symbol$1 = parent$c;

	var symbol = symbol$1;

	var _getIterator = getIterator;

	var _isIterable$1 = isIterable;

	var _Symbol$1 = symbol;

	function _iterableToArrayLimit(arr, i) {
	  if (typeof _Symbol$1 === "undefined" || !_isIterable$1(Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	var iterableToArrayLimit$1 = _iterableToArrayLimit;

	var anObject = anObject$7;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var wellKnownSymbol$2 = wellKnownSymbol$g;
	var Iterators = iterators;

	var ITERATOR$1 = wellKnownSymbol$2('iterator');
	var ArrayPrototype$7 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype$7[ITERATOR$1] === it);
	};

	var bind = functionBindContext;
	var toObject = toObject$5;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var toLength$1 = toLength$5;
	var createProperty$1 = createProperty$3;
	var getIteratorMethod = getIteratorMethod$2;

	// `Array.from` method implementation
	// https://tc39.github.io/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty$1(result, index, value);
	    }
	  } else {
	    length = toLength$1(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$1(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var wellKnownSymbol$1 = wellKnownSymbol$g;

	var ITERATOR = wellKnownSymbol$1('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var $$9 = _export;
	var from$3 = arrayFrom;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from
	$$9({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from$3
	});

	var path$4 = path$a;

	var from$2 = path$4.Array.from;

	var parent$b = from$2;

	var from$1 = parent$b;

	var from = from$1;

	var DESCRIPTORS$1 = descriptors;
	var fails$1 = fails$b;
	var has = has$a;

	var defineProperty$5 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength$5 = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails$1(function () {
	    if (ACCESSORS && !DESCRIPTORS$1) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty$5(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $$8 = _export;
	var isObject = isObject$9;
	var isArray$3 = isArray$b;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var toLength = toLength$5;
	var toIndexedObject = toIndexedObject$7;
	var createProperty = createProperty$3;
	var wellKnownSymbol = wellKnownSymbol$g;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;
	var arrayMethodUsesToLength$4 = arrayMethodUsesToLength$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength$4('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$4 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$3(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray$3(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var path$3 = path$a;

	var entryVirtual$7 = function (CONSTRUCTOR) {
	  return path$3[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$6 = entryVirtual$7;

	var slice$6 = entryVirtual$6('Array').slice;

	var slice$5 = slice$6;

	var ArrayPrototype$6 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.slice) ? slice$5 : own;
	};

	var parent$a = slice_1;

	var slice$4 = parent$a;

	var slice$3 = slice$4;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray$2 = _arrayLikeToArray;

	var _Array$from$1 = from;

	var _sliceInstanceProperty = slice$3;

	var arrayLikeToArray$1 = arrayLikeToArray$2;

	function _unsupportedIterableToArray(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray$1(o, minLen);

	  var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return _Array$from$1(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray$1(o, minLen);
	}

	var unsupportedIterableToArray$2 = _unsupportedIterableToArray;

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableRest$1 = _nonIterableRest;

	var arrayWithHoles = arrayWithHoles$1;

	var iterableToArrayLimit = iterableToArrayLimit$1;

	var unsupportedIterableToArray$1 = unsupportedIterableToArray$2;

	var nonIterableRest = nonIterableRest$1;

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray$1(arr, i) || nonIterableRest();
	}

	var slicedToArray = _slicedToArray;

	var $$7 = _export;
	var global$1 = global$e;
	var userAgent = engineUserAgent;

	var slice$2 = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice$2.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	};

	// ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	$$7({ global: true, bind: true, forced: MSIE }, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global$1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global$1.setInterval)
	});

	var path$2 = path$a;

	var setTimeout$1 = path$2.setTimeout;

	var setTimeout = setTimeout$1;

	var fails = fails$b;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $$6 = _export;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;
	var arrayMethodUsesToLength$3 = arrayMethodUsesToLength$5;

	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('indexOf');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength$3('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	$$6({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$3 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$5 = entryVirtual$7;

	var indexOf$3 = entryVirtual$5('Array').indexOf;

	var indexOf$2 = indexOf$3;

	var ArrayPrototype$5 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.indexOf) ? indexOf$2 : own;
	};

	var parent$9 = indexOf_1;

	var indexOf$1 = parent$9;

	var indexOf = indexOf$1;

	var $$5 = _export;

	// `Date.now` method
	// https://tc39.github.io/ecma262/#sec-date.now
	$$5({ target: 'Date', stat: true }, {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	var path$1 = path$a;

	var now$2 = path$1.Date.now;

	var parent$8 = now$2;

	var now$1 = parent$8;

	var now = now$1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	var defineProperty$4 = {exports: {}};

	var $$4 = _export;
	var DESCRIPTORS = descriptors;
	var objectDefinePropertyModile = objectDefineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	$$4({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
	  defineProperty: objectDefinePropertyModile.f
	});

	var path = path$a;

	var Object$1 = path.Object;

	var defineProperty$3 = defineProperty$4.exports = function defineProperty(it, key, desc) {
	  return Object$1.defineProperty(it, key, desc);
	};

	if (Object$1.defineProperty.sham) defineProperty$3.sham = true;

	var parent$7 = defineProperty$4.exports;

	var defineProperty$2 = parent$7;

	var defineProperty$1 = defineProperty$2;

	var _Object$defineProperty$1 = defineProperty$1;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    _Object$defineProperty$1(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var _Object$defineProperty = defineProperty$1;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	var TextNode = /*#__PURE__*/function () {
	  function TextNode(node, offset) {
	    classCallCheck(this, TextNode);

	    this.node = node;
	    this.offset = offset;
	  }

	  createClass(TextNode, null, [{
	    key: "getSelectText",
	    value: function getSelectText(startNode, endNode, startIndex, endIndex) {
	      //  再看看这里怎么回事= =
	      var text = "";

	      if (startNode.childNodes.length && startNode.nodeName !== "SCRIPT" && startNode.nodeName !== "STYLE") {
	        var childNode = startNode.childNodes[0];
	        var textChild = this.getSelectText(childNode, endNode, 0, endIndex);
	        text += textChild;
	        return text;
	      }

	      if (startNode.nodeName === "#text") {
	        var textEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
	        text += startNode.textContent.substring(startIndex, textEndIndex);
	      }

	      if (startNode === endNode) {
	        return text;
	      }

	      var nextNode = startNode.nextSibling;

	      if (nextNode) {
	        var nextText = this.getSelectText(nextNode, endNode, 0, endIndex);
	        text += nextText;
	      } else {
	        var currentNode = startNode.parentNode;

	        while (currentNode && currentNode.nextSibling === null) {
	          currentNode = currentNode.parentNode;
	        }

	        if (currentNode) {
	          var siblingText = this.getSelectText(currentNode.nextSibling, endNode, 0, endIndex);
	          text += siblingText;
	        } else {
	          throw new Error("Invalid end node");
	        }
	      }

	      return text;
	    }
	  }]);

	  return TextNode;
	}();

	var _Array$isArray = isArray$7;

	var arrayLikeToArray = arrayLikeToArray$2;

	function _arrayWithoutHoles(arr) {
	  if (_Array$isArray(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles$1 = _arrayWithoutHoles;

	var _Array$from = from;

	var _isIterable = isIterable;

	var _Symbol = symbol;

	function _iterableToArray(iter) {
	  if (typeof _Symbol !== "undefined" && _isIterable(Object(iter))) return _Array$from(iter);
	}

	var iterableToArray$1 = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread$1 = _nonIterableSpread;

	var arrayWithoutHoles = arrayWithoutHoles$1;

	var iterableToArray = iterableToArray$1;

	var unsupportedIterableToArray = unsupportedIterableToArray$2;

	var nonIterableSpread = nonIterableSpread$1;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	var parent$6 = slice_1;

	var slice$1 = parent$6;

	var slice = slice$1;

	var $$3 = _export;
	var isArray$2 = isArray$b;

	var nativeReverse = [].reverse;
	var test = [1, 2];

	// `Array.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794
	$$3({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign
	    if (isArray$2(this)) this.length = this.length;
	    return nativeReverse.call(this);
	  }
	});

	var entryVirtual$4 = entryVirtual$7;

	var reverse$3 = entryVirtual$4('Array').reverse;

	var reverse$2 = reverse$3;

	var ArrayPrototype$4 = Array.prototype;

	var reverse_1 = function (it) {
	  var own = it.reverse;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.reverse) ? reverse$2 : own;
	};

	var parent$5 = reverse_1;

	var reverse$1 = parent$5;

	var reverse = reverse$1;

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;
	var arrayMethodUsesToLength$2 = arrayMethodUsesToLength$5;

	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength$2('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH$2) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	var $$2 = _export;
	var forEach$4 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	$$2({ target: 'Array', proto: true, forced: [].forEach != forEach$4 }, {
	  forEach: forEach$4
	});

	var entryVirtual$3 = entryVirtual$7;

	var forEach$3 = entryVirtual$3('Array').forEach;

	var parent$4 = forEach$3;

	var forEach$2 = parent$4;

	var forEach$1 = forEach$2;
	var classof = classof$5;
	var ArrayPrototype$3 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.forEach)
	    // eslint-disable-next-line no-prototype-builtins
	    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach = forEach_1;

	var $$1 = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
	var arrayMethodUsesToLength$1 = arrayMethodUsesToLength$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength$1('map');

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$2 = entryVirtual$7;

	var map$3 = entryVirtual$2('Array').map;

	var map$2 = map$3;

	var ArrayPrototype$2 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.map) ? map$2 : own;
	};

	var parent$3 = map_1;

	var map$1 = parent$3;

	var map = map$1;

	var parent$2 = isArray$9;

	var isArray$1 = parent$2;

	var isArray = isArray$1;

	var Rect = /*#__PURE__*/function () {
	  function Rect(_ref) {
	    var _this = this;

	    var container = _ref.container,
	        _ref$rectsColor = _ref.rectsColor,
	        rectsColor = _ref$rectsColor === void 0 ? "rgba(23,136,189,0.35)" : _ref$rectsColor;

	    classCallCheck(this, Rect);

	    defineProperty(this, "setRects", function (rects, offsetX, offsetY) {
	      _this.reset();

	      var rectArray;

	      if (isArray(rects)) {
	        rectArray = rects;
	      } else {
	        rectArray = [rects];
	      }

	      var elArray = document.createDocumentFragment();
	      _this.elements = map(rectArray).call(rectArray, function (rect) {
	        var rectEl = document.createElement("div");
	        rectEl.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-rect");
	        rectEl.style.pointerEvents = "none";
	        rectEl.style.width = "".concat(rect.width, "px");
	        rectEl.style.height = "".concat(rect.height, "px");
	        rectEl.style.backgroundColor = _this.rectsColor;
	        rectEl.style.position = "absolute";
	        rectEl.style.left = "".concat(rect.left - offsetX, "px");
	        rectEl.style.top = "".concat(rect.top - offsetY, "px");
	        elArray.appendChild(rectEl);
	        return rectEl;
	      });

	      _this.container.appendChild(elArray);
	    });

	    defineProperty(this, "reset", function () {
	      var _context, _context2, _context3;

	      forEach(_context = reverse(_context2 = slice(_context3 = _this.elements).call(_context3)).call(_context2)).call(_context, function (el) {
	        return _this.container.removeChild(el);
	      });

	      _this.elements = [];
	    });

	    this.container = container;
	    this.rectsColor = rectsColor;
	    this.elements = [];
	  }

	  createClass(Rect, [{
	    key: "getSelectRects",
	    value: function getSelectRects(startNode, endNode, startIndex, endIndex) {
	      //  再看看这里怎么回事= =
	      var rects = [];

	      if (startNode.childNodes.length && startNode.nodeName !== "SCRIPT" && startNode.nodeName !== "STYLE") {
	        var childNode = startNode.childNodes[0];
	        var rectsChild = this.getSelectRects(childNode, endNode, 0, endIndex);
	        rects.push.apply(rects, toConsumableArray(rectsChild));
	        return rects;
	      }

	      if (startNode.nodeName === "#text") {
	        var rectEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
	        var range = document.createRange();
	        range.setStart(startNode, startIndex);
	        range.setEnd(startNode, rectEndIndex);
	        rects.push.apply(rects, toConsumableArray(range.getClientRects()));
	      }

	      if (startNode === endNode) {
	        return rects;
	      }

	      var nextNode = startNode.nextSibling;

	      if (nextNode) {
	        var nextRects = this.getSelectRects(nextNode, endNode, 0, endIndex);
	        rects.push.apply(rects, toConsumableArray(nextRects));
	      } else {
	        var currentNode = startNode.parentNode;

	        if (currentNode === this.container) {
	          return [];
	        }

	        while (currentNode && (currentNode.nextSibling === null || currentNode === this.container)) {
	          currentNode = currentNode.parentNode;
	        }

	        if (currentNode && currentNode === this.container) {
	          return [];
	        } else if (currentNode) {
	          var siblingRects = this.getSelectRects(currentNode.nextSibling, endNode, 0, endIndex);
	          rects.push.apply(rects, toConsumableArray(siblingRects));
	        } else {
	          throw new Error("Invalid end node");
	        }
	      }

	      return rects;
	    }
	  }]);

	  return Rect;
	}();

	var entryVirtual$1 = entryVirtual$7;

	var concat$3 = entryVirtual$1('Array').concat;

	var concat$2 = concat$3;

	var ArrayPrototype$1 = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.concat) ? concat$2 : own;
	};

	var parent$1 = concat_1;

	var concat$1 = parent$1;

	var concat = concat$1;

	var Cursor = /*#__PURE__*/function () {
	  function Cursor(_ref) {
	    var _this = this;

	    var container = _ref.container,
	        cursorDom = _ref.cursorDom,
	        type = _ref.type,
	        _ref$color = _ref.color,
	        color = _ref$color === void 0 ? "#1788bd" : _ref$color;

	    classCallCheck(this, Cursor);

	    defineProperty(this, "createElement", function () {
	      var element = document.createElement("div");
	      element.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-cursor");
	      element.style.userSelect = "none";
	      element.style.webkitUserSelect = "none";
	      element.style.display = "none";
	      element.style.position = "absolute";
	      element.style.left = "0px";
	      element.style.top = "0px";
	      element.style.zIndex = 2;
	      element.style.width = "".concat(_this.size * 2, "px");

	      if (_this.type === "start") {
	        element.style.transform = "scaleX(-1)";
	      }

	      var pointWrapper;

	      if (_this.cursorDom && _this.cursorDom instanceof Element) {
	        pointWrapper = _this.cursorDom.cloneNode(true);
	      } else {
	        var _context;

	        pointWrapper = document.createElement("div");
	        pointWrapper.style.boxSizing = "border-box";
	        pointWrapper.style.width = "".concat(_this.size * 2, "px");
	        pointWrapper.style.height = "".concat(_this.size * 3, "px");
	        var topPoint = document.createElement("div");
	        topPoint.style.width = "0";
	        topPoint.style.height = "0";
	        topPoint.style.borderWidth = "".concat(_this.size / 2, "px");
	        topPoint.style.borderColor = concat(_context = "transparent transparent ".concat(_this.color, " ")).call(_context, _this.color);
	        topPoint.style.borderStyle = "solid";
	        var bottomPoint = document.createElement("div");
	        bottomPoint.style.width = "".concat(_this.size, "px");
	        bottomPoint.style.height = "".concat(_this.size, "px");
	        bottomPoint.style.backgroundColor = _this.color;
	        pointWrapper.appendChild(topPoint);
	        pointWrapper.appendChild(bottomPoint);
	      }

	      element.appendChild(pointWrapper);
	      return element;
	    });

	    defineProperty(this, "show", function () {
	      _this.element.style.display = "block";
	    });

	    defineProperty(this, "hide", function () {
	      _this.element.style.display = "none";
	    });

	    this.container = container;
	    this.element = null;
	    this.cursorDom = cursorDom;
	    this.type = type;
	    this._position = {
	      x: 0,
	      y: 0
	    };
	    this.height = 0;
	    this.size = 15;
	    this.color = color;
	    this.element = this.createElement();
	    container.appendChild(this.element);
	  }

	  createClass(Cursor, [{
	    key: "moveTo",
	    value: function moveTo(x, y) {
	      if (this.type === "start") {
	        this.element.style.left = "".concat(x - this.size * 2, "px");
	      } else {
	        this.element.style.left = "".concat(x, "px");
	      }

	      this.element.style.top = "".concat(y + this.height, "px");
	    }
	  }, {
	    key: "position",
	    set: function set(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;
	      this._position = {
	        x: x,
	        y: y
	      };
	      this.moveTo(x, y);
	    },
	    get: function get() {
	      return this._position;
	    }
	  }]);

	  return Cursor;
	}();

	var Magnifier = /*#__PURE__*/function () {
	  function Magnifier(_ref) {
	    var _this = this;

	    var container = _ref.container,
	        rectsColor = _ref.rectsColor,
	        backgroundColor = _ref.backgroundColor,
	        _ref$height = _ref.height,
	        height = _ref$height === void 0 ? 50 : _ref$height,
	        _ref$width = _ref.width,
	        width = _ref$width === void 0 ? 100 : _ref$width,
	        _ref$offset = _ref.offset,
	        offset = _ref$offset === void 0 ? 50 : _ref$offset;

	    classCallCheck(this, Magnifier);

	    defineProperty(this, "moveTo", function (x, y) {
	      var _context, _context2, _context3;

	      var cWidth = _this.container.getBoundingClientRect().width;

	      var cHeight = _this.container.getBoundingClientRect().height;

	      _this.slip.style.clipPath = concat(_context = concat(_context2 = concat(_context3 = "inset(\n        ".concat(y - _this.height / 2, "px\n        ")).call(_context3, cWidth - x - _this.width / 2, "px\n        ")).call(_context2, cHeight - y - _this.height / 2, "px\n        ")).call(_context, x - _this.width / 2, "px\n    )");
	      _this.clip.style.top = "".concat(y - _this.offset - _this.height / 2, "px");
	      _this.clip.style.left = "".concat(x - _this.width / 2, "px");
	    });

	    defineProperty(this, "show", function () {
	      _this.clip.style.display = "block";
	      _this.slip.style.display = "block";
	    });

	    defineProperty(this, "hide", function () {
	      _this.clip.style.display = "none";
	      _this.slip.style.display = "none";
	    });

	    defineProperty(this, "createSlip", function () {
	      var slip = _this.container.cloneNode(true);

	      slip.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-slip");
	      slip.style.pointerEvents = "none";
	      slip.style.position = "absolute";
	      slip.style.marginTop = 0;
	      slip.style.marginRight = 0;
	      slip.style.marginBottom = 0;
	      slip.style.marginLeft = 0;
	      slip.style.top = "".concat(-_this.offset, "px");
	      slip.style.left = 0;
	      slip.style.backgroundColor = _this.backgroundColor || "#fff";
	      slip.style.display = "none";
	      slip.style.zIndex = "3";
	      return slip;
	    });

	    defineProperty(this, "createClip", function () {
	      var clip = document.createElement("div");
	      clip.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-clip");
	      clip.style.pointerEvent = "none";
	      clip.style.userSelect = "none";
	      clip.style.webkitUserSelect = "none";
	      clip.style.position = "absolute";
	      clip.style.height = "".concat(_this.height, "px");
	      clip.style.width = "".concat(_this.width, "px");
	      clip.style.boxShadow = "0px 1px 2px 1px #666, inset 0px 0px 2px 2px #fff";
	      clip.style.borderRadius = "5px";
	      clip.style.display = "none";
	      clip.style.zIndex = "3";
	      return clip;
	    });

	    this.container = container;
	    this.height = height;
	    this.width = width;
	    this.offset = offset;
	    this.backgroundColor = backgroundColor;
	    this._position = {
	      x: 0,
	      y: 0
	    };
	    this.slip = this.createSlip();
	    this.clip = this.createClip();
	    this.rect = null;
	    container.appendChild(this.slip);
	    container.appendChild(this.clip);
	    this.rects = new Rect({
	      container: this.slip,
	      rectsColor: rectsColor
	    });
	  }

	  createClass(Magnifier, [{
	    key: "position",
	    set: function set(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;
	      this._position = {
	        x: x,
	        y: y
	      }; // 触摸的位置 也就是对应的字的位置

	      this.moveTo(x, y);
	    }
	  }]);

	  return Magnifier;
	}();

	var $ = _export;
	var $find = arrayIteration.find;
	var arrayMethodUsesToLength = arrayMethodUsesToLength$5;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual = entryVirtual$7;

	var find$3 = entryVirtual('Array').find;

	var find$2 = find$3;

	var ArrayPrototype = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.find) ? find$2 : own;
	};

	var parent = find_1;

	var find$1 = parent;

	var find = find$1;

	var Menu = /*#__PURE__*/function () {
	  function Menu(_ref) {
	    var _this = this;

	    var container = _ref.container,
	        _ref$backgroundColor = _ref.backgroundColor,
	        backgroundColor = _ref$backgroundColor === void 0 ? "#000000" : _ref$backgroundColor,
	        _ref$color = _ref.color,
	        color = _ref$color === void 0 ? "#ffffff" : _ref$color,
	        _ref$menu = _ref.menu,
	        menu = _ref$menu === void 0 ? [] : _ref$menu;

	    classCallCheck(this, Menu);

	    defineProperty(this, "moveTo", function (x_center, y_top) {
	      _this.show(); // 要先显示一下 否则getBoundingClientRect拿不到


	      var elementWidth = _this.element.getBoundingClientRect().width;

	      var elementHeight = _this.element.getBoundingClientRect().height;

	      _this.hide(); // 之后还是交给外面处理
	      // container相对位置


	      var containerScreenOffset = _this.container.getBoundingClientRect(); // element 左上角坐标, 相对于container


	      var x = x_center;
	      var y = y_top; // 屏幕宽度

	      var winWidth = document.documentElement.clientWidth || document.body.clientWidth; // 弹窗距离左右边界的距离哦
	      // 文档滚动的距离
	      // const scrollWidth =
	      //   document.body.scrollLeft || document.documentElement.scrollLeft;
	      // 判断x边界值，防止菜单栏溢出左右可视窗口

	      if (x_center + containerScreenOffset.left < elementWidth / 2 + _this.paddingLR) {
	        // 左边
	        x = _this.paddingLR - containerScreenOffset.left;
	      } else if (x_center + containerScreenOffset.left > winWidth - elementWidth / 2 - _this.paddingLR) {
	        // 右边
	        x = winWidth - elementWidth - containerScreenOffset.left - _this.paddingLR;
	      } else {
	        // 中间
	        x = x_center - elementWidth / 2;
	      } // 弹窗距离上下边界的距离哦


	      var containerFontSize = Number(window.getComputedStyle(_this.container).fontSize.replace("px", ""));
	      var elementTopOffset = containerFontSize * 1.5; // 文字与弹窗之间的距离
	      // 文档滚动的距离
	      // const scrollHeight =
	      //   document.body.scrollTop || document.documentElement.scrollTop;
	      // 判断y边界值，防止菜单栏溢出上下可视窗口

	      if (y_top + containerScreenOffset.top < elementTopOffset + elementHeight) {
	        // 上边
	        y = y_top + elementTopOffset * 2.5; // 怕挡住游标
	      } else {
	        //中间
	        y = y_top - elementHeight - elementTopOffset;
	      } // 显示弹窗


	      _this.element.style.top = "".concat(y, "px");
	      _this.element.style.left = "".concat(x, "px");
	    });

	    defineProperty(this, "show", function () {
	      _this.element.style.display = "block";
	    });

	    defineProperty(this, "hide", function () {
	      _this.element.style.display = "none";
	    });

	    defineProperty(this, "createElement", function () {
	      var _context;

	      var element = document.createElement("div");
	      element.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-menu");
	      element.style.userSelect = "none";
	      element.style.webkitUserSelect = "none";
	      element.style.display = "none";
	      element.style.position = "absolute";
	      element.style.left = "0px";
	      element.style.top = "0px";
	      element.style.zIndex = "3";
	      element.style.borderRadius = "4px";
	      element.style.overflow = "hidden";
	      element.style.boxShadow = "0px 1px 2px 1px #666"; // 屏幕宽度

	      var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
	      element.style.maxWidth = "".concat(winWidth - 2 * _this.paddingLR, "px");
	      var menuWrapper = document.createElement("div");
	      menuWrapper.style.overflow = "scroll";
	      var menuList = document.createElement("div");
	      menuList.style.display = "flex";
	      menuList.style.alignItems = "center";
	      menuList.style.width = "max-content";

	      map(_context = _this.menu).call(_context, function (item) {
	        var menuItem = document.createElement("div");
	        menuItem.style.display = "flex";
	        menuItem.style.flex = "1 0 auto";
	        menuItem.style.alignItems = "center";
	        menuItem.style.padding = "10px 15px";
	        menuItem.style.boxSizing = "border-box";
	        menuItem.style.boxSizing = "border-box";
	        menuItem.style.backgroundColor = _this.backgroundColor;

	        if (!item.key) {
	          throw new Error("菜单项需要参数key");
	        }

	        menuItem.dataset.key = item.key;

	        if (item.icon) {
	          var icon = document.createElement("div");
	          icon.style.display = "flex";
	          icon.style.alignItems = "center";
	          icon.style.justifyContent = "center";
	          icon.style.marginRight = "5px";
	          icon.style.maxWidth = "1.2em";
	          icon.style.maxHeight = "1.2em";
	          icon.appendChild(item.icon);
	          menuItem.appendChild(icon);
	          var iconImg = icon.querySelector("img");

	          if (iconImg) {
	            iconImg.style.width = "100%";
	            iconImg.style.height = "100%";
	          }
	        }

	        if (item.text) {
	          var text = document.createElement("span");
	          text.style.color = _this.color;
	          text.innerText = item.text;
	          menuItem.appendChild(text);
	        }

	        if (item.click) {
	          if (typeof item.click !== "function") {
	            throw Error("参数click类型错误");
	          }

	          menuItem.onclick = function () {
	            return item.click(item.key);
	          };
	        }

	        _this.menuItemElements.push(menuItem);

	        menuList.appendChild(menuItem);
	      });

	      menuWrapper.appendChild(menuList);
	      element.appendChild(menuWrapper);
	      return element;
	    });

	    this.container = container;
	    this.backgroundColor = backgroundColor;
	    this.color = color;
	    this.menu = menu;
	    this.paddingLR = 10;
	    this.element = null;
	    this.menuItemElements = [];
	    this._position = {
	      x: 0,
	      y: 0
	    };
	    this.element = this.createElement();
	    container.appendChild(this.element);
	  }

	  createClass(Menu, [{
	    key: "getSelectMenuKey",
	    value: function getSelectMenuKey(path) {
	      var _context2;

	      var selectMenuItem = find(_context2 = this.menuItemElements).call(_context2, function (item) {
	        return indexOf(path).call(path, item) > -1;
	      });

	      return selectMenuItem && selectMenuItem.dataset.key;
	    }
	  }, {
	    key: "clickMenuItem",
	    value: function clickMenuItem(key, params) {
	      var _context3;

	      var menuItem = find(_context3 = this.menu).call(_context3, function (item) {
	        return item.key === key;
	      });

	      menuItem.click && menuItem.click(params);
	    }
	  }, {
	    key: "position",
	    set: function set(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;
	      this._position = {
	        x: x,
	        y: y
	      };
	      this.moveTo(x, y);
	    }
	  }]);

	  return Menu;
	}();

	function getEventPath(evt) {
	  return evt.path || evt.composedPath && evt.composedPath() || "";
	}
	function isSameLine(relativeY, currentY, currentHeight) {
	  return currentY >= relativeY - currentHeight / 2 && currentY <= relativeY + currentHeight / 2;
	}
	function isAfterLine(relativeY, currentY, currentHeight) {
	  return currentY > relativeY + currentHeight / 2;
	}
	function isPreviousLine(relativeY, currentY, currentHeight) {
	  return currentY < relativeY - currentHeight / 2;
	}
	function getSingleRect(node, startIndex, endIndex) {
	  var range = document.createRange();
	  range.setStart(node, startIndex);
	  range.setEnd(node, endIndex);
	  var textRects = range.getClientRects();

	  if (textRects.length) {
	    return textRects[0];
	  } else {
	    return null;
	  }
	}
	function getNextRectByCurrentNode(node, container) {
	  var nextRect = null;
	  var nextTextNode = getNextTextNode(node, container);

	  if (nextTextNode) {
	    nextRect = getSingleRect(nextTextNode, 0, 1);
	  }

	  return nextRect;
	}

	function getNextTextNode(node, container) {
	  var nextTextNode = getNextTextNodeOrContainer(node, container);

	  if (nextTextNode && nextTextNode !== container) {
	    return nextTextNode;
	  }

	  return null;
	}

	function getNextTextNodeOrContainer(node, container) {
	  var nextTextNode = null;

	  if (node.classList && node.classList.contains("mobile-text-selection-tools")) {
	    return null;
	  }

	  if (node.childNodes.length) {
	    var firstChildNode = node.childNodes[0];

	    if (firstChildNode.nodeName === "#text" && !/^\s+$/.test(firstChildNode.textContent)) {
	      nextTextNode = firstChildNode;
	    } else {
	      nextTextNode = getNextTextNodeOrContainer(firstChildNode, container);
	    }
	  }

	  if (nextTextNode) return nextTextNode;
	  var nextNode = node.nextSibling;

	  while (!nextTextNode && nextNode) {
	    if (nextNode.nodeName === "#text" && !/^\s+$/.test(nextNode.textContent)) {
	      nextTextNode = nextNode;
	    } else {
	      nextTextNode = getNextTextNodeOrContainer(nextNode, container);
	    }

	    if (!nextTextNode) nextNode = nextNode.nextSibling;
	  }

	  if (nextTextNode) return nextTextNode;
	  var parentNode = node.parentNode;
	  var parentNextNode;

	  while (!parentNextNode && parentNode !== container) {
	    parentNextNode = parentNode.nextSibling;
	    parentNode = parentNode.parentNode;
	  }

	  while (!nextTextNode && parentNextNode) {
	    if (parentNextNode.nodeName === "#text" && !/^\s+$/.test(parentNextNode.textContent)) {
	      nextTextNode = parentNextNode;
	    } else {
	      nextTextNode = getNextTextNodeOrContainer(parentNextNode, container);
	      if (!nextTextNode) parentNextNode = parentNextNode.nextSibling;
	    }
	  }

	  if (nextTextNode) return nextTextNode;

	  if (parentNode === container) {
	    return container;
	  }

	  return nextTextNode;
	}

	var TextSelect = /*#__PURE__*/function () {
	  function TextSelect(_ref) {
	    var _this = this;

	    var container = _ref.container,
	        cursorDom = _ref.cursorDom,
	        cursorColor = _ref.cursorColor,
	        rectsColor = _ref.rectsColor,
	        magnifierHeight = _ref.magnifierHeight,
	        magnifierWidth = _ref.magnifierWidth,
	        magnifierOffset = _ref.magnifierOffset,
	        magnifierBackgroundColor = _ref.magnifierBackgroundColor,
	        _ref$longTapDuration = _ref.longTapDuration,
	        longTapDuration = _ref$longTapDuration === void 0 ? 600 : _ref$longTapDuration,
	        menu = _ref.menu,
	        menuBackgroundColor = _ref.menuBackgroundColor,
	        menuColor = _ref.menuColor,
	        _ref$tokenizer = _ref.tokenizer,
	        tokenizer = _ref$tokenizer === void 0 ? function () {} : _ref$tokenizer,
	        _ref$onFinish = _ref.onFinish,
	        onFinish = _ref$onFinish === void 0 ? function () {} : _ref$onFinish,
	        _ref$onStart = _ref.onStart,
	        onStart = _ref$onStart === void 0 ? function () {} : _ref$onStart,
	        _ref$onCancel = _ref.onCancel,
	        onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel;

	    classCallCheck(this, TextSelect);

	    defineProperty(this, "blur", function () {
	      // 失焦时候隐藏所有指针和底色
	      _this.cursor.start.hide();

	      _this.cursor.end.hide();

	      _this.rects.reset();

	      _this.selectStatus = "none";

	      _this.magnifier.hide();

	      _this.menu.hide();

	      _this.onCancel();
	    });

	    defineProperty(this, "init", function () {
	      // 初始化
	      _this.container.oncontextmenu = function (e) {
	        e.preventDefault();
	        return;
	      };

	      _this.container.style.userSelect = "none";
	      _this.container.style.webkitUserSelect = "none";
	      _this.container.style.webkitTouchCallout = "none";
	      _this.magnifier = new Magnifier({
	        container: _this.container,
	        rectsColor: _this.rectsColor,
	        backgroundColor: _this.magnifierBackgroundColor,
	        height: _this.magnifierHeight,
	        width: _this.magnifierWidth,
	        offset: _this.magnifierOffset
	      });

	      _this.container.addEventListener("touchstart", _this.handleTouchStart);

	      _this.container.addEventListener("touchmove", _this.handleTouchMove);

	      _this.container.addEventListener("touchend", _this.handleTouchEnd);

	      _this.container.style.position = "relative";
	      _this.cursor.start = new Cursor({
	        container: _this.container,
	        cursorDom: _this.cursorDom,
	        type: "start",
	        color: _this.cursorColor
	      });
	      _this.cursor.end = new Cursor({
	        container: _this.container,
	        cursorDom: _this.cursorDom,
	        type: "end",
	        color: _this.cursorColor
	      });
	      _this.rects = new Rect({
	        container: _this.container,
	        rectsColor: _this.rectsColor
	      });
	      _this.menu = new Menu({
	        container: _this.container,
	        menu: _this.menu,
	        backgroundColor: _this.menuBackgroundColor,
	        color: _this.menuColor
	      });
	    });

	    defineProperty(this, "destroy", function () {
	      _this.container.oncontextmenu = null;

	      _this.container.removeEventListener("touchstart", _this.handleTouchStart);

	      _this.container.removeEventListener("touchmove", _this.handleTouchMove);

	      _this.container.removeEventListener("touchend", _this.handleTouchEnd);

	      var tools = _this.container.getElementsByClassName("mobile-text-selection-tools");

	      for (var i = tools.length - 1; i >= 0; i--) {
	        tools[i].remove();
	      }

	      _this.container._textSelection = null;
	    });

	    defineProperty(this, "handleTouchStart", function (e) {
	      var _context, _context2, _context3;

	      var event = e; // 触摸位置

	      var touchPoint = e.changedTouches[0];
	      var mouseX = touchPoint.clientX;
	      var mouseY = touchPoint.clientY; // 触摸时间 用于结束时候的计算

	      _this.touchStartTime = now(); // 触摸位置 用于结束时候的计算

	      _this.touchStartPosition = {
	        x: mouseX,
	        y: mouseY
	      }; // 是否正在触摸menu

	      var touchMenu = indexOf(_context = getEventPath(event)).call(_context, _this.menu.element) > -1; // 是否正在触摸左右cursor

	      var touchStartCursor = indexOf(_context2 = getEventPath(event)).call(_context2, _this.cursor.start.element) > -1;
	      var touchEndCursor = indexOf(_context3 = getEventPath(event)).call(_context3, _this.cursor.end.element) > -1;

	      if (touchMenu) {
	        // 正在触摸menu menu中不管是不是长按
	        _this.touchingMenuKey = _this.menu.getSelectMenuKey(getEventPath(event));
	        event.stopPropagation();
	      } else {
	        _this.menu.hide(); // 没在触摸menu 则隐藏menu


	        if (touchStartCursor) {
	          // 记录正在移动的cursor 用于之后的cursor位置交换判断
	          _this.movingCursor = _this.cursor.start; // 状态设置成正在选择文字 用于禁止页面滚动

	          _this.selectStatus = "selecting";
	          event.stopPropagation();
	        } else if (touchEndCursor) {
	          _this.movingCursor = _this.cursor.end;
	          _this.selectStatus = "selecting";
	          event.stopPropagation();
	        } else {
	          // 不是的话就延时检查是不是长按事件
	          _this.longTapTimer = setTimeout(function () {
	            event.stopPropagation(); // 是长按选择事件
	            // 开始选择文字的回调

	            _this.onStart(); // 处理长按选择事件


	            if (event.target) {
	              _this.magnifier.show();

	              _this.handleLongTap(event.target, mouseX, mouseY);
	            }

	            _this.selectStatus = "selecting";
	          }, _this.longTapDuration);
	        }
	      }
	    });

	    defineProperty(this, "handleTouchMove", function (e) {
	      var event = e; // 如果正在选择文字 则禁止滚动

	      if (_this.selectStatus === "selecting") {
	        event.stopPropagation();
	        event.preventDefault();
	        var touchPoint = event.changedTouches[0]; // 限制移动范围

	        var mouseX = touchPoint.clientX;
	        var mouseY = touchPoint.clientY;

	        var containerBound = _this.container.getBoundingClientRect();

	        if (mouseY < containerBound.top) {
	          mouseY = containerBound.top;
	        }

	        if (mouseY > containerBound.bottom) {
	          mouseY = containerBound.bottom;
	        }

	        if (mouseX < containerBound.left) {
	          mouseX = containerBound.left;
	        }

	        if (mouseX > containerBound.right) {
	          mouseX = containerBound.right;
	        } // 如果正在移动cursor 延时检查是不是拖动选择事件


	        if (_this.movingCursor) {
	          // 是拖动选择事件
	          // 开始选择文字的回调
	          _this.onStart(); // 移动后的位置
	          // 隐藏正在移动的cursor 才能获取坐标位置的文本元素 不然e.target就是cursor拉


	          _this.movingCursor.hide(); // 获取目标 这里有一个问题就是我使用坐标的时候 一开始按住的是cursor的坐标 但是后来移动的时候 触摸的位置不再是cursor的坐标了 影响不大


	          var target = document.elementFromPoint(mouseX, mouseY); // 处理iframe情况

	          if (target && target instanceof HTMLIFrameElement) {
	            target = target.contentWindow.document.elementFromPoint(mouseX, mouseY);
	          }

	          _this.cursor.start.show();

	          _this.cursor.end.show(); // 处理拖动cursor事件


	          if (target) {
	            _this.magnifier.show();

	            _this.moveCursor(target, mouseX, mouseY);
	          }
	        } else if (_this.rects) {
	          var _target = document.elementFromPoint(mouseX, mouseY); // 处理iframe情况


	          if (_target && _target instanceof HTMLIFrameElement) {
	            _target = _target.contentWindow.document.elementFromPoint(mouseX, mouseY);
	          }

	          if (_target) {
	            _this.magnifier.show();

	            _this.handleLongTap(_target, mouseX, mouseY);
	          } // 长按以后的移动

	        }
	      } else if (_this.touchingMenuKey) {
	        var movedMenuKey = _this.menu.getSelectMenuKey(getEventPath(event));

	        if (!movedMenuKey || movedMenuKey !== _this.touchingMenuKey) {
	          //点击菜单时移出 则取消正在点击菜单按钮的记录 且此时不能禁止滚动 因为菜单本身可以横向滑动
	          _this.touchingMenuKey = null;
	        }
	      }

	      clearTimeout(_this.longTapTimer);
	      _this.longTapTimer = null;
	    });

	    defineProperty(this, "handleTouchEnd", function (e) {
	      var event = e; // 触摸结束 定时器都清空

	      clearTimeout(_this.longTapTimer);
	      _this.longTapTimer = null; // 状态清空

	      _this.movingCursor = null;

	      _this.magnifier.hide();

	      var touchPoint = event.changedTouches[0];

	      if (_this.touchingMenuKey) {
	        // 如果是点击菜单 则需要进行菜单的回调
	        var text = _this.getText();

	        _this.menu.clickMenuItem(_this.touchingMenuKey, {
	          text: text
	        });

	        _this.touchingMenuKey = null; // TODO: 之后考虑下需不需让用户自己隐藏菜单

	        _this.blur();
	      } else if (now() - _this.touchStartTime < _this.longTapDuration && touchPoint.clientX === _this.touchStartPosition.x && touchPoint.clientY === _this.touchStartPosition.y) {
	        // 当触碰结束时 如果不是移动事件的结束 也不是长按事件的结束 就当作普通点击处理
	        _this.blur();
	      } else {
	        // 如果是长按或者移动事件结束 判断有没有选区
	        // 有选取的话就弹窗 没选区就啥也不干 有时候有选区但是没选到字呢..
	        // 获取选择的文本
	        event.stopPropagation();

	        var _text = _this.getText();

	        if (_this.rects.elements.length && _text) {
	          // 选择完成后显示菜单
	          _this.menu.position = {
	            x: (_this.cursor.start.position.x + _this.cursor.end.position.x) / 2,
	            // 按选中文字的中间计算 即centerX
	            y: _this.cursor.start.position.y // 按选中文字最上边计算 即topY

	          };

	          _this.menu.show(); // 选择完成后的回调


	          _this.onFinish({
	            text: _text,
	            startX: _this.cursor.start.position.x,
	            // 第一个字的左上角 相对于container的坐标
	            startY: _this.cursor.start.position.y,
	            endX: _this.cursor.end.position.x,
	            // 最后一个字的右上角 相对于container的坐标
	            endY: _this.cursor.end.position.y
	          }); // 状态设置成已完成选择


	          _this.selectStatus = "finished";
	        }
	      }
	    });

	    defineProperty(this, "getText", function () {
	      // 获取选择的文标
	      // textNode 是在坐标移动时候计算的
	      if (!_this.textNode.start || !_this.textNode.end) return;
	      var text = TextNode.getSelectText(_this.textNode.start.node, _this.textNode.end.node, _this.textNode.start.offset, _this.textNode.end.offset);
	      return text;
	    });

	    defineProperty(this, "moveCursor", function (element, x, y) {
	      // 移动cursor事件 用于计算cursor的正确位置并显示
	      // 计算移动到的[文字]的坐标信息和并保存文字节点信息
	      if (!element || /^\s+$/.test(element)) return;

	      var _ref2 = _this.getMoveOrTapRectPosition(element, x, y) || {},
	          moveX = _ref2.x,
	          moveY = _ref2.y,
	          node = _ref2.node,
	          index = _ref2.index,
	          currentHeight = _ref2.height; // 计算cursor需不需要交换


	      var currentX = moveX - _this.screenRelativeOffset.x;
	      var currentY = moveY - _this.screenRelativeOffset.y; // 如果没找到node 或者坐标是无效值(比如element是另一个cursor..) 就不再执行了

	      if (!node || !currentX && !currentY) return;
	      var unmovingCursor = _this.movingCursor === _this.cursor.start ? _this.cursor.end : _this.cursor.start; // 如果左右cursor一个位置 就都隐藏掉拉

	      if (unmovingCursor.position.x === currentX && unmovingCursor.position.y === currentY) {
	        _this.cursor.start.hide();

	        _this.cursor.end.hide();

	        _this.rects.reset();

	        return;
	      }

	      if (_this.movingCursor === _this.cursor.start) {
	        //   正在移动start
	        var endPosition = _this.cursor.end.position;

	        if (isPreviousLine(endPosition.y, currentY, currentHeight) || isSameLine(endPosition.y, currentY, currentHeight) && currentX < endPosition.x) {
	          // 不需要交换
	          _this.textNode.start = new TextNode(node, index);
	        } else {
	          // 需要交换
	          _this.cursor.start.position = _this.cursor.end.position;
	          _this.movingCursor = _this.cursor.end;
	          _this.textNode.start = new TextNode(_this.textNode.end.node, _this.textNode.end.offset);
	          _this.textNode.end = new TextNode(node, index);
	          return;
	        }
	      } else {
	        //   正在移动end
	        var startPosition = _this.cursor.start.position;

	        if (isAfterLine(startPosition.y, currentY, currentHeight) || isSameLine(startPosition.y, currentY, currentHeight) && currentX > startPosition.x) {
	          // 不需要交换
	          _this.textNode.end = new TextNode(node, index);
	        } else {
	          // 需要交换
	          _this.cursor.end.position = _this.cursor.start.position;
	          _this.movingCursor = _this.cursor.start;
	          _this.textNode.end = new TextNode(_this.textNode.start.node, _this.textNode.start.offset);
	          _this.textNode.start = new TextNode(node, index);
	          return;
	        }
	      } // 设置新的坐标位置 在长按的时候就已经显示cursor拉 所以不需要再显示啦


	      _this.movingCursor.position = {
	        x: moveX - _this.screenRelativeOffset.x,
	        y: moveY - _this.screenRelativeOffset.y
	      };
	      _this.magnifier.position = {
	        x: moveX - _this.screenRelativeOffset.x,
	        y: moveY - _this.screenRelativeOffset.y
	      }; // 计算阴影

	      var rects = _this.rects.getSelectRects(_this.textNode.start.node, _this.textNode.end.node, _this.textNode.start.offset, _this.textNode.end.offset);

	      if (rects.length) {
	        // 显示阴影
	        _this.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y); // TODO 放大镜的rect


	        _this.magnifier.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y);
	      }
	    });

	    defineProperty(this, "handleLongTap", function (element, x, y) {
	      // 长按事件
	      _this.magnifier.position = {
	        x: x - _this.screenRelativeOffset.x,
	        y: y - _this.screenRelativeOffset.y
	      }; // 计算被长按的[文字]的坐标信息和并保存文字节点信息

	      var _ref3 = _this.getMoveOrTapRectPosition(element, x, y) || {},
	          node = _ref3.node,
	          rect = _ref3.rect,
	          index = _ref3.index,
	          height = _ref3.height; // 判断有选中位置 防止在空白处长按


	      if (!rect || rect && rect.length === 0) return;

	      var _ref4 = _this.tokenizer && _this.tokenizer(node, index) || [-1, 0],
	          _ref5 = slicedToArray(_ref4, 2),
	          cutIndex = _ref5[0],
	          cutLength = _ref5[1];

	      if (typeof cutIndex === "number" && typeof cutLength === "number" && cutIndex > -1 && cutLength > 1) {
	        // 有分词
	        _this.textNode.start = new TextNode(node, cutIndex);
	        _this.textNode.end = new TextNode(node, cutIndex + cutLength); // 计算阴影

	        var rects = _this.rects.getSelectRects(_this.textNode.start.node, _this.textNode.end.node, _this.textNode.start.offset, _this.textNode.end.offset);

	        if (rects.length) {
	          // 显示阴影
	          _this.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y); // 设置cursor位置


	          _this.cursor.start.height = height;
	          _this.cursor.end.height = height;
	          _this.cursor.start.position = {
	            x: rects[0].x - _this.screenRelativeOffset.x,
	            y: rects[0].y - _this.screenRelativeOffset.y
	          };
	          _this.cursor.end.position = {
	            x: rects[rects.length - 1].x + rects[rects.length - 1].width - _this.screenRelativeOffset.x,
	            y: rects[rects.length - 1].y - _this.screenRelativeOffset.y
	          }; // 显示cursor 后面移动的时候不需要再显示了

	          _this.cursor.start.show();

	          _this.cursor.end.show(); // 放大镜的rect


	          _this.magnifier.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y);
	        }
	      } else {
	        // 没有分词
	        _this.textNode.start = new TextNode(node, index); // index 表示第几个字 (是下标+1的正数)

	        _this.textNode.end = new TextNode(node, index + 1); // 长按就一个字 不需要再计算阴影位置了 直接显示阴影

	        _this.rects.setRects(rect, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y); // 设置cursor位置


	        _this.cursor.start.height = height;
	        _this.cursor.end.height = height;
	        _this.cursor.start.position = {
	          x: rect.x - _this.screenRelativeOffset.x,
	          y: rect.y - _this.screenRelativeOffset.y
	        };
	        _this.cursor.end.position = {
	          x: rect.x + rect.width - _this.screenRelativeOffset.x,
	          y: rect.y - _this.screenRelativeOffset.y
	        }; // 显示cursor 后面移动的时候不需要再显示了

	        _this.cursor.start.show();

	        _this.cursor.end.show(); // TODO 放大镜的rect


	        _this.magnifier.rects.setRects(rect, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y);
	      }
	    });

	    defineProperty(this, "getMoveOrTapRectPosition", function (element, x, y) {
	      // 计算移动或长按位置的[文字]坐标和节点信息
	      if (!_this.container.contains(element)) {
	        // 如果移动到container外面就不计算了
	        return null;
	      }

	      if (element.nodeName === "#comment" || element.classList.contains("mobile-text-selection-tools")) {
	        return null;
	      }

	      if (!element || element && !element.childNodes) return null; // 计算行高 用于判断y坐标

	      var lineHeight = Number(window.getComputedStyle(element).lineHeight.replace("px", ""));

	      for (var i = 0; i < element.childNodes.length; i++) {
	        var node = element.childNodes[i]; // 如果是文本节点

	        if (node.nodeName === "#text") {
	          var content = node.textContent;
	          window.getSelection().removeAllRanges(); // 遍历节点文本内容

	          for (var j = 0; j < content.length; j++) {
	            // content[j] 是一个字
	            // 用range对象计算这个字的位置信息
	            var rect = getSingleRect(node, j, j + 1);
	            if (!rect) continue;
	            lineHeight = lineHeight || rect.height;
	            var margin = lineHeight / 2;

	            if (rect.left < x && // rect.right > x &&
	            rect.top - margin < y && rect.bottom + margin > y) {
	              var nextRect = null;

	              if (j === content.length - 1) {
	                // 是当前标签最后一个字 检查下一个标签的第一个字
	                nextRect = getNextRectByCurrentNode(node, _this.container);
	              } else {
	                // 当前标签后面还有字
	                nextRect = getSingleRect(node, j + 1, j + 2);
	              }

	              if (rect.right > x) {
	                return {
	                  x: rect.left,
	                  y: rect.top,
	                  node: node,
	                  index: j,
	                  height: rect.height,
	                  width: rect.width,
	                  rect: rect
	                };
	              }

	              var isLineEnd = !nextRect || nextRect && nextRect.right < rect.left;

	              if (isLineEnd) {
	                return {
	                  x: rect.right,
	                  y: rect.top,
	                  node: node,
	                  index: j + 1,
	                  height: rect.height,
	                  width: rect.width,
	                  rect: rect
	                };
	              }
	            }
	          }
	        } else if (node.nodeName === "#comment" || node.classList.contains("mobile-text-selection-tools")) {
	          // 如果是contianer里的selection相关组件 也不计算
	          continue;
	        } else {
	          var result = _this.getMoveOrTapRectPosition(node, x, y);

	          if (result) return result;
	        }
	      }

	      return null;
	    });

	    if (!container) throw Error("TextSelection 容器不能为空");

	    if (tokenizer && typeof tokenizer !== "function") {
	      throw Error("参数tokenizer类型错误");
	    }

	    if (onFinish && typeof onFinish !== "function") {
	      throw Error("参数onFinish类型错误");
	    }

	    if (onStart && typeof onStart !== "function") {
	      throw Error("参数onStart类型错误");
	    }

	    if (onCancel && typeof onCancel !== "function") {
	      throw Error("参数onCancel类型错误");
	    }

	    if (container._textSelection) {
	      container._textSelection.destroy();
	    }

	    this.container = container;
	    this.longTapTimer = null;
	    this.longTapDuration = longTapDuration;
	    this.touchStartPosition = {
	      x: 0,
	      y: 0
	    };
	    this.touchStartTime = null;
	    this.touchMoveDuration = 0;
	    this.cursorColor = cursorColor;
	    this.cursorDom = cursorDom;
	    this.cursor = {
	      start: null,
	      end: null
	    };
	    this.textNode = {
	      start: null,
	      end: null
	    };
	    this.movingCursor = null;
	    this.touchingMenuKey = null;
	    this.mask = null;
	    this.selectStatus = "none"; // selecting finished
	    // 分词

	    this.tokenizer = tokenizer; // 回调

	    this.onFinish = onFinish;
	    this.onStart = onStart;
	    this.onCancel = onCancel; // 选中标记

	    this.rects = null;
	    this.rectsColor = rectsColor; // 放大镜

	    this.magnifier = null;
	    this.magnifierHeight = magnifierHeight;
	    this.magnifierWidth = magnifierWidth;
	    this.magnifierOffset = magnifierOffset;
	    this.magnifierBackgroundColor = magnifierBackgroundColor; // 操作菜单

	    this.menu = menu;
	    this.menuBackgroundColor = menuBackgroundColor;
	    this.menuColor = menuColor;
	    container._textSelection = this;
	  }

	  createClass(TextSelect, [{
	    key: "screenRelativeOffset",
	    get: function get() {
	      // 获取container距离顶部的举例 因为页面可以滚动嘛 用于所有的y坐标计算
	      var _this$container$getBo = this.container.getBoundingClientRect(),
	          top = _this$container$getBo.top,
	          left = _this$container$getBo.left;

	      return {
	        x: left,
	        y: top
	      };
	    }
	  }]);

	  return TextSelect;
	}();

	return TextSelect;

}));
