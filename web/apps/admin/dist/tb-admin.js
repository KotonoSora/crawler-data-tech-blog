//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var ee = x.prototype = new b();
	ee.constructor = x, _(ee, y.prototype), ee.isPureReactComponent = !0;
	var te = Array.isArray;
	function S() {}
	var C = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ne = Object.prototype.hasOwnProperty;
	function w(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function T(e, t) {
		return w(e.type, t, e.props);
	}
	function re(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ie(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ae = /\/+/g;
	function oe(e, t) {
		return typeof e == "object" && e && e.key != null ? ie("" + e.key) : t.toString(36);
	}
	function se(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(S, S) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ce(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ce(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + oe(e, 0) : a, te(o) ? (i = "", c != null && (i = c.replace(ae, "$&/") + "/"), ce(o, r, i, "", function(e) {
			return e;
		})) : o != null && (re(o) && (o = T(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ae, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (te(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += ce(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += ce(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ce(se(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function le(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ce(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function E(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var ue = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function de(e) {
		var t = C.T, n = {};
		n.types = t === null ? null : t.types, C.T = n;
		try {
			var r = e(), i = C.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(S, ue);
		} catch (e) {
			ue(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), C.T = t;
		}
	}
	function fe(e) {
		var t = C.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else de(fe.bind(null, e));
	}
	var pe = {
		map: le,
		forEach: function(e, t, n) {
			le(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return le(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return le(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!re(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = pe, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return C.H.useMemoCache(e);
		}
	}, e.addTransitionType = fe, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ne.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return w(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ne.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return w(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = re, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: E
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = de, e.unstable_useCacheRefresh = function() {
		return C.H.useCacheRefresh();
	}, e.use = function(e) {
		return C.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return C.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return C.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return C.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return C.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return C.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return C.H.useEffectEvent(e);
	}, e.useId = function() {
		return C.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return C.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return C.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return C.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return C.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return C.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return C.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return C.H.useRef(e);
	}, e.useState = function(e) {
		return C.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return C.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return C.H.useTransition();
	}, e.version = "19.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function n(e, t) {
			Object.defineProperty(a.prototype, e, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
			} });
		}
		function r(e) {
			return typeof e != "object" || !e ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function i(e, t) {
			e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
			var n = e + "." + t;
			k[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), k[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = Te, this.updater = n || Ce;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = Te, this.updater = n || Ce;
		}
		function c() {}
		function l(e) {
			return "" + e;
		}
		function u(e) {
			try {
				l(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, r = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", r), l(e);
			}
		}
		function d(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Oe ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case fe: return "Fragment";
				case D: return "Profiler";
				case pe: return "StrictMode";
				case _e: return "Suspense";
				case ve: return "SuspenseList";
				case xe: return "Activity";
				case Se: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case de: return "Portal";
				case he: return e.displayName || "Context";
				case me: return (e._context.displayName || "Context") + ".Consumer";
				case ge:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ye: return t = e.displayName || null, t === null ? d(e.type) || "Memo" : t;
				case be:
					t = e._payload, e = e._init;
					try {
						return d(e(t));
					} catch {}
			}
			return null;
		}
		function f(e) {
			if (e === fe) return "<>";
			if (typeof e == "object" && e && e.$$typeof === be) return "<...>";
			try {
				var t = d(e);
				return t ? "<" + t + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function p() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (ke.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				j || (j = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return Me[e] || (Me[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function v(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: ue,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: _
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function y(e, t) {
			return t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask), e._store && (t._store.validated = e._store.validated), t;
		}
		function b(e) {
			x(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === be && (e._payload.status === "fulfilled" ? x(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function x(e) {
			return typeof e == "object" && !!e && e.$$typeof === ue;
		}
		function ee(e) {
			var t = {
				"=": "=0",
				":": "=2"
			};
			return "$" + e.replace(/[=:]/g, function(e) {
				return t[e];
			});
		}
		function te(e, t) {
			return typeof e == "object" && e && e.key != null ? (u(e.key), ee("" + e.key)) : t.toString(36);
		}
		function S(e) {
			switch (e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
				default: switch (typeof e.status == "string" ? e.then(c, c) : (e.status = "pending", e.then(function(t) {
					e.status === "pending" && (e.status = "fulfilled", e.value = t);
				}, function(t) {
					e.status === "pending" && (e.status = "rejected", e.reason = t);
				})), e.status) {
					case "fulfilled": return e.value;
					case "rejected": throw e.reason;
				}
			}
			throw e;
		}
		function C(e, t, n, i, a) {
			var o = typeof e;
			(o === "undefined" || o === "boolean") && (e = null);
			var s = !1;
			if (e === null) s = !0;
			else switch (o) {
				case "bigint":
				case "string":
				case "number":
					s = !0;
					break;
				case "object": switch (e.$$typeof) {
					case ue:
					case de:
						s = !0;
						break;
					case be: return s = e._init, C(s(e._payload), t, n, i, a);
				}
			}
			if (s) {
				s = e, a = a(s);
				var c = i === "" ? "." + te(s, 0) : i;
				return De(a) ? (n = "", c != null && (n = c.replace(Ie, "$&/") + "/"), C(a, t, n, "", function(e) {
					return e;
				})) : a != null && (x(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(Ie, "$&/") + "/") + c), i !== "" && s != null && x(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", De(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + te(i, l), s += C(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (Fe || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Fe = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + te(i, l++), s += C(i, t, n, o, a);
			else if (o === "object") {
				if (typeof e.then == "function") return C(S(e), t, n, i, a);
				throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
			}
			return s;
		}
		function ne(e, t, n) {
			if (e == null) return e;
			var r = [], i = 0;
			return C(e, r, "", "", function(e) {
				return t.call(n, e, i++);
			}), r;
		}
		function w(e) {
			if (e._status === -1) {
				var t = null, n = null, r = e._ioInfo;
				r != null && (r.start = r.end = performance.now(), r.value = new Promise(function(e, r) {
					t = e, n = r;
				})), r = e._result;
				var i = r();
				if (i.then(function(n) {
					if (e._status === 0 || e._status === -1) {
						e._status = 1, e._result = n;
						var r = e._ioInfo;
						if (r != null) {
							r.end = performance.now();
							var a = n?.default;
							t(a), r.value.status = "fulfilled", r.value.value = a;
						}
						i.status === void 0 && (i.status = "fulfilled", i.value = n);
					}
				}, function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 2, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now(), r.value.then(c, c), n(t), r.value.status = "rejected", r.value.reason = t), i.status === void 0 && (i.status = "rejected", i.reason = t);
					}
				}), r = e._ioInfo, r != null) {
					var a = i.displayName;
					typeof a == "string" && (r.name = a);
				}
				e._status === -1 && (e._status = 0, e._result = i);
			}
			if (e._status === 1) return r = e._result, r === void 0 && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", r), "default" in r || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", r), r.default;
			throw e._result;
		}
		function T() {
			var e = A.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function re() {
			A.asyncTransitions--;
		}
		function ie(e) {
			var t = A.T, n = {};
			n.types = t === null ? null : t.types, n._updatedFibers = /* @__PURE__ */ new Set(), A.T = n;
			try {
				var r = e(), i = A.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (A.asyncTransitions++, r.then(re, re), r.then(c, Le));
			} catch (e) {
				Le(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), A.T = t;
			}
		}
		function ae(e) {
			var t = A.T;
			if (t !== null) {
				var n = t.types;
				n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
			} else A.asyncTransitions === 0 && console.error("addTransitionType can only be called inside a `startTransition()` callback. It must be associated with a specific Transition."), ie(ae.bind(null, e));
		}
		function oe(e) {
			if (ze === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				ze = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				ze = function(e) {
					!1 === Re && (Re = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return ze(e);
		}
		function se(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function ce(e, t) {
			t !== Be - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Be = t;
		}
		function le(e, t, n) {
			var r = A.actQueue;
			if (r !== null) {
				if (r.length !== 0) try {
					E(r), oe(function() {
						return le(e, t, n);
					});
					return;
				} catch (e) {
					A.thrownErrors.push(e);
				}
				else A.actQueue = null;
			}
			0 < A.thrownErrors.length ? (r = se(A.thrownErrors), A.thrownErrors.length = 0, n(r)) : t(e);
		}
		function E(e) {
			if (!He) {
				He = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							A.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (A.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), A.thrownErrors.push(n);
				} finally {
					He = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var ue = Symbol.for("react.transitional.element"), de = Symbol.for("react.portal"), fe = Symbol.for("react.fragment"), pe = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), me = Symbol.for("react.consumer"), he = Symbol.for("react.context"), ge = Symbol.for("react.forward_ref"), _e = Symbol.for("react.suspense"), ve = Symbol.for("react.suspense_list"), ye = Symbol.for("react.memo"), be = Symbol.for("react.lazy"), xe = Symbol.for("react.activity"), Se = Symbol.for("react.view_transition"), O = Symbol.iterator, k = {}, Ce = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(e) {
				i(e, "forceUpdate");
			},
			enqueueReplaceState: function(e) {
				i(e, "replaceState");
			},
			enqueueSetState: function(e) {
				i(e, "setState");
			}
		}, we = Object.assign, Te = {};
		Object.freeze(Te), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var Ee = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (We in Ee) Ee.hasOwnProperty(We) && n(We, Ee[We]);
		o.prototype = a.prototype, Ee = s.prototype = new o(), Ee.constructor = s, we(Ee, a.prototype), Ee.isPureReactComponent = !0;
		var De = Array.isArray, Oe = Symbol.for("react.client.reference"), A = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, ke = Object.prototype.hasOwnProperty, Ae = console.createTask ? console.createTask : function() {
			return null;
		};
		Ee = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var j, je, Me = {}, Ne = Ee.react_stack_bottom_frame.bind(Ee, m)(), Pe = Ae(f(m)), Fe = !1, Ie = /\/+/g, Le = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, Re = !1, ze = null, Be = 0, Ve = !1, He = !1, Ue = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : oe;
		Ee = Object.freeze({
			__proto__: null,
			c: function(e) {
				return T().useMemoCache(e);
			}
		});
		var We = {
			map: ne,
			forEach: function(e, t, n) {
				ne(e, function() {
					t.apply(this, arguments);
				}, n);
			},
			count: function(e) {
				var t = 0;
				return ne(e, function() {
					t++;
				}), t;
			},
			toArray: function(e) {
				return ne(e, function(e) {
					return e;
				}) || [];
			},
			only: function(e) {
				if (!x(e)) throw Error("React.Children.only expected to receive a single React element child.");
				return e;
			}
		};
		e.Activity = xe, e.Children = We, e.Component = a, e.Fragment = fe, e.Profiler = D, e.PureComponent = s, e.StrictMode = pe, e.Suspense = _e, e.ViewTransition = Se, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, e.__COMPILER_RUNTIME = Ee, e.act = function(e) {
			var t = A.actQueue, n = Be;
			Be++;
			var r = A.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				A.thrownErrors.push(e);
			}
			if (0 < A.thrownErrors.length) throw ce(t, n), e = se(A.thrownErrors), A.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return Ue(function() {
					i || Ve || (Ve = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (ce(t, n), n === 0) {
							try {
								E(r), oe(function() {
									return le(i, e, a);
								});
							} catch (e) {
								A.thrownErrors.push(e);
							}
							if (0 < A.thrownErrors.length) {
								var o = se(A.thrownErrors);
								A.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						ce(t, n), 0 < A.thrownErrors.length && (e = se(A.thrownErrors), A.thrownErrors.length = 0), a(e);
					});
				} };
			}
			var s = a;
			if (ce(t, n), n === 0 && (E(r), r.length !== 0 && Ue(function() {
				i || Ve || (Ve = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), A.actQueue = null), 0 < A.thrownErrors.length) throw e = se(A.thrownErrors), A.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (A.actQueue = r, oe(function() {
					return le(s, e, t);
				})) : e(s);
			} };
		}, e.addTransitionType = ae, e.cache = function(e) {
			return function() {
				return e.apply(null, arguments);
			};
		}, e.cacheSignal = function() {
			return null;
		}, e.captureOwnerStack = function() {
			var e = A.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = we({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (ke.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !ke.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
			}
			var s = arguments.length - 2;
			if (s === 1) r.children = n;
			else if (1 < s) {
				o = Array(s);
				for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
				r.children = o;
			}
			for (r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2; i < arguments.length; i++) b(arguments[i]);
			return r;
		}, e.createContext = function(e) {
			return e = {
				$$typeof: he,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			}, e.Provider = e, e.Consumer = {
				$$typeof: me,
				_context: e
			}, e._currentRenderer = null, e._currentRenderer2 = null, e;
		}, e.createElement = function(e, t, n) {
			for (var r = 2; r < arguments.length; r++) b(arguments[r]);
			var i;
			r = {};
			var a = null;
			if (t != null) for (i in je || !("__self" in t) || "key" in t || (je = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), a = "" + t.key), t) ke.call(t, i) && i !== "key" && i !== "__self" && i !== "__source" && (r[i] = t[i]);
			var o = arguments.length - 2;
			if (o === 1) r.children = n;
			else if (1 < o) {
				for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
				Object.freeze && Object.freeze(s), r.children = s;
			}
			if (e && e.defaultProps) for (i in o = e.defaultProps, o) r[i] === void 0 && (r[i] = o[i]);
			return a && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), (i = 1e4 > A.recentlyCreatedOwnerStacks++) ? (s = Error.stackTraceLimit, Error.stackTraceLimit = 10, o = Error("react-stack-top-frame"), Error.stackTraceLimit = s) : o = Ne, v(e, a, r, p(), o, i ? Ae(f(e)) : Pe);
		}, e.createRef = function() {
			var e = { current: null };
			return Object.seal(e), e;
		}, e.forwardRef = function(e) {
			e != null && e.$$typeof === ye ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e == "function" ? e.length !== 0 && e.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.") : console.error("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e), e != null && e.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var t = {
				$$typeof: ge,
				render: e
			}, n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.isValidElement = x, e.lazy = function(e) {
			e = {
				_status: -1,
				_result: e
			};
			var t = {
				$$typeof: be,
				_payload: e,
				_init: w
			}, n = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			return e._ioInfo = n, t._debugInfo = [{ awaited: n }], t;
		}, e.memo = function(e, t) {
			e ?? console.error("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e), t = {
				$$typeof: ye,
				type: e,
				compare: t === void 0 ? null : t
			};
			var n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.startTransition = ie, e.unstable_useCacheRefresh = function() {
			return T().useCacheRefresh();
		}, e.use = function(e) {
			return T().use(e);
		}, e.useActionState = function(e, t, n) {
			return T().useActionState(e, t, n);
		}, e.useCallback = function(e, t) {
			return T().useCallback(e, t);
		}, e.useContext = function(e) {
			var t = T();
			return e.$$typeof === me && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"), t.useContext(e);
		}, e.useDebugValue = function(e, t) {
			return T().useDebugValue(e, t);
		}, e.useDeferredValue = function(e, t) {
			return T().useDeferredValue(e, t);
		}, e.useEffect = function(e, t) {
			return e ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"), T().useEffect(e, t);
		}, e.useEffectEvent = function(e) {
			return T().useEffectEvent(e);
		}, e.useId = function() {
			return T().useId();
		}, e.useImperativeHandle = function(e, t, n) {
			return T().useImperativeHandle(e, t, n);
		}, e.useInsertionEffect = function(e, t) {
			return e ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"), T().useInsertionEffect(e, t);
		}, e.useLayoutEffect = function(e, t) {
			return e ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"), T().useLayoutEffect(e, t);
		}, e.useMemo = function(e, t) {
			return T().useMemo(e, t);
		}, e.useOptimistic = function(e, t) {
			return T().useOptimistic(e, t);
		}, e.useReducer = function(e, t, n) {
			return T().useReducer(e, t, n);
		}, e.useRef = function(e) {
			return T().useRef(e);
		}, e.useState = function(e) {
			return T().useState(e);
		}, e.useSyncExternalStore = function(e, t, n) {
			return T().useSyncExternalStore(e, t, n);
		}, e.useTransition = function() {
			return T().useTransition();
		}, e.version = "19.3.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? l() : u();
})), f = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, ee || (ee = !0, T());
			else {
				var t = n(l);
				t !== null && ae(x, t.startTime - e);
			}
		}
	}
	var ee = !1, te = -1, S = 5, C = -1;
	function ne() {
		return g ? !0 : !(e.unstable_now() - C < S);
	}
	function w() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			C = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(te), te = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ne());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ae(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? T() : ee = !1;
			}
		}
	}
	var T;
	if (typeof y == "function") T = function() {
		y(w);
	};
	else if (typeof MessageChannel < "u") {
		var re = new MessageChannel(), ie = re.port2;
		re.port1.onmessage = w, T = function() {
			ie.postMessage(null);
		};
	} else T = function() {
		_(w, 0);
	};
	function ae(t, n) {
		te = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, ae(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, T()))), r;
	}, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), p = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (x = !1, C) {
				var t = e.unstable_now();
				T = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, te(ne), ne = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
						n = void 0;
					}
				} finally {
					n ? re() : C = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) {
				if (r(p) !== null) y = !0, C || (C = !0, re());
				else {
					var t = r(m);
					t !== null && l(s, t.startTime - e);
				}
			}
		}
		function c() {
			return x ? !0 : !(e.unstable_now() - T < w);
		}
		function l(t, n) {
			ne = ee(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, x = !1, ee = typeof setTimeout == "function" ? setTimeout : null, te = typeof clearTimeout == "function" ? clearTimeout : null, S = typeof setImmediate < "u" ? setImmediate : null, C = !1, ne = -1, w = 5, T = -1;
		if (typeof S == "function") var re = function() {
			S(t);
		};
		else if (typeof MessageChannel < "u") {
			var ie = new MessageChannel(), ae = ie.port2;
			ie.port1.onmessage = t, re = function() {
				ae.postMessage(null);
			};
		} else re = function() {
			ee(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			x = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (te(ne), ne = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, C || (C = !0, re()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), m = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? f() : p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = d();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), g = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function r(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			if (i == null) i = null;
			else if (i === p) i = p;
			else {
				try {
					n(i);
					var a = !1;
				} catch {
					a = !0;
				}
				a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), i = "" + i;
			}
			return {
				$$typeof: u,
				key: i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function i(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function a(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function o(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function s() {
			var e = m.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var c = d(), l = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, u = Symbol.for("react.portal"), f = Symbol.for("react.recoverable"), p = Symbol.for("react.optimistic_key"), m = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, e.browser = function(e) {
			return {
				$$typeof: f,
				_reason: e
			};
		}, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return r(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = m.T, n = l.p;
			try {
				if (m.T = null, l.p = 2, e) return e();
			} finally {
				m.T = t, l.p = n, l.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", o(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", a(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, l.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t));
			}
			typeof e == "string" && l.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", o(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", o(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = i(n, t.crossOrigin), s = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? l.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c
				}) : n === "script" && l.d.X(e, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + o(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = o(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = i(t.as, t.crossOrigin), l.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
			})) : t ?? l.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + a(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = i(n, t.crossOrigin);
				l.d.L(e, n, {
					crossOrigin: r,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					type: typeof t.type == "string" ? t.type : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
					referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
					imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
					imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
					media: typeof t.media == "string" ? t.media : void 0
				});
			}
		}, e.preloadModule = function(e, t) {
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = i(t.as, t.crossOrigin), l.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
			})) : l.d.m(e));
		}, e.requestFormReset = function(e) {
			l.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return s().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return s().useHostTransitionStatus();
		}, e.version = "19.3.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), _ = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = h()) : t.exports = g();
})), v = /* @__PURE__ */ o(((e) => {
	var t = m(), n = d(), r = _();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function p(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && p(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function h(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function g(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = h(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var x = null, ee = null;
	function te(e, t, n) {
		return e === n || e === t && (x = e, !0);
	}
	function S(e, t, n) {
		return e === n ? (ee = e, !1) : e === t && (ee !== null && (x = e), !0);
	}
	function C(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function ne(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var w = Object.assign, T = Symbol.for("react.element"), re = Symbol.for("react.transitional.element"), ie = Symbol.for("react.portal"), ae = Symbol.for("react.fragment"), oe = Symbol.for("react.strict_mode"), se = Symbol.for("react.profiler"), ce = Symbol.for("react.consumer"), le = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), ue = Symbol.for("react.suspense"), de = Symbol.for("react.suspense_list"), fe = Symbol.for("react.memo"), pe = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), me = Symbol.for("react.legacy_hidden"), he = Symbol.for("react.memo_cache_sentinel"), ge = Symbol.for("react.view_transition"), _e = Symbol.for("react.recoverable"), ve = Symbol.iterator;
	function ye(e) {
		return typeof e != "object" || !e ? null : (e = ve && e[ve] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var be = Symbol.for("react.client.reference");
	function xe(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === be ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case ae: return "Fragment";
			case se: return "Profiler";
			case oe: return "StrictMode";
			case ue: return "Suspense";
			case de: return "SuspenseList";
			case D: return "Activity";
			case ge: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case ie: return "Portal";
			case le: return e.displayName || "Context";
			case ce: return (e._context.displayName || "Context") + ".Consumer";
			case E:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case fe: return t = e.displayName || null, t === null ? xe(e.type) || "Memo" : t;
			case pe:
				t = e._payload, e = e._init;
				try {
					return xe(e(t));
				} catch {}
		}
		return null;
	}
	var Se = Array.isArray, O = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ce = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, we = [], Te = -1;
	function Ee(e) {
		return { current: e };
	}
	function De(e) {
		0 > Te || (e.current = we[Te], we[Te] = null, Te--);
	}
	function Oe(e, t) {
		Te++, we[Te] = e.current, e.current = t;
	}
	var A = Ee(null), ke = Ee(null), Ae = Ee(null), j = Ee(null);
	function je(e, t) {
		switch (Oe(Ae, t), Oe(ke, e), Oe(A, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? xp(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = xp(t), e = Sp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		De(A), Oe(A, e);
	}
	function Me() {
		De(A), De(ke), De(Ae);
	}
	function Ne(e) {
		var t = e.memoizedState;
		t !== null && (gh._currentValue = t.memoizedState, Oe(j, e)), t = A.current;
		var n = Sp(t, e.type);
		t !== n && (Oe(ke, e), Oe(A, n));
	}
	function Pe(e) {
		ke.current === e && (De(A), De(ke)), j.current === e && (De(j), gh._currentValue = Ce);
	}
	var Fe, Ie;
	function Le(e) {
		if (Fe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Fe = t && t[1] || "", Ie = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Fe + e + Ie;
	}
	var Re = !1;
	function ze(e, t) {
		if (!e || Re) return "";
		Re = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Re = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Le(n) : "";
	}
	function Be(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Le(e.type);
			case 16: return Le("Lazy");
			case 13: return e.child !== t && t !== null ? Le("Suspense Fallback") : Le("Suspense");
			case 19: return Le("SuspenseList");
			case 0:
			case 15: return ze(e.type, !1);
			case 11: return ze(e.type.render, !1);
			case 1: return ze(e.type, !0);
			case 31: return Le("Activity");
			case 30: return Le("ViewTransition");
			default: return "";
		}
	}
	function Ve(e) {
		try {
			var t = "", n = null;
			do
				t += Be(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var He = Object.prototype.hasOwnProperty, Ue = t.unstable_scheduleCallback, We = t.unstable_cancelCallback, Ge = t.unstable_shouldYield, Ke = t.unstable_requestPaint, qe = t.unstable_now, Je = t.unstable_getCurrentPriorityLevel, Ye = t.unstable_ImmediatePriority, Xe = t.unstable_UserBlockingPriority, Ze = t.unstable_NormalPriority, Qe = t.unstable_LowPriority, $e = t.unstable_IdlePriority, et = t.log, tt = t.unstable_setDisableYieldValue, nt = null, rt = null;
	function it(e) {
		if (typeof et == "function" && tt(e), rt && typeof rt.setStrictMode == "function") try {
			rt.setStrictMode(nt, e);
		} catch {}
	}
	var at = Math.clz32 ? Math.clz32 : ct, ot = Math.log, st = Math.LN2;
	function ct(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ot(e) / st | 0) | 0;
	}
	var lt = 256, ut = 262144, dt = 4194304;
	function ft(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function pt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = ft(n))) : i = ft(o) : i = ft(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = ft(n))) : i = ft(o)) : i = ft(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function mt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function ht(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - at(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function gt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function _t() {
		var e = dt;
		return dt <<= 1, !(dt & 62914560) && (dt = 4194304), e;
	}
	function vt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function yt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function bt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - at(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && xt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function xt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - at(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function St(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - at(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ct(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : wt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function wt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function Tt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function M() {
		var e = k.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Mh(e.type)) : e;
	}
	function Et(e, t) {
		var n = k.p;
		try {
			return k.p = e, t();
		} finally {
			k.p = n;
		}
	}
	var Dt = Math.random().toString(36).slice(2), Ot = "__reactFiber$" + Dt, kt = "__reactProps$" + Dt, At = "__reactContainer$" + Dt, jt = "__reactEvents$" + Dt, Mt = "__reactListeners$" + Dt, Nt = "__reactHandles$" + Dt, Pt = "__reactResources$" + Dt, Ft = "__reactMarker$" + Dt, It = "__reactLoad$" + Dt;
	function N(e) {
		delete e[Ot], delete e[kt], delete e[Mt], delete e[Nt];
	}
	function Lt(e) {
		var t;
		if (t = e[Ot]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[At] || n[Ot]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sm(e); e !== null;) {
					if (n = e[Ot]) return n;
					e = Sm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Rt(e) {
		if (e = e[Ot] || e[At]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function zt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Bt(e) {
		var t = e[Pt];
		return t ||= e[Pt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Vt(e) {
		e[Ft] = !0;
	}
	function Ht(e) {
		e[It] = void 0;
	}
	var Ut = /* @__PURE__ */ new Set(), P = {};
	function Wt(e, t) {
		Gt(e, t), Gt(e + "Capture", t);
	}
	function Gt(e, t) {
		for (P[e] = t, e = 0; e < t.length; e++) Ut.add(t[e]);
	}
	var Kt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), qt = {}, Jt = {};
	function Yt(e) {
		return He.call(Jt, e) ? !0 : He.call(qt, e) ? !1 : Kt.test(e) ? Jt[e] = !0 : (qt[e] = !0, !1);
	}
	var Xt = !1;
	function Zt() {
		var e = Xt;
		return Xt = !1, e;
	}
	function Qt(e, t, n) {
		if (Yt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function $t(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function en(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function tn(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function nn(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function rn(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function an(e) {
		if (!e._valueTracker) {
			var t = nn(e) ? "checked" : "value";
			e._valueTracker = rn(e, t, "" + e[t]);
		}
	}
	function on(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = nn(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var sn = /[\n"\\]/g;
	function cn(e) {
		return e.replace(sn, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function ln(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + tn(t)) : e.value !== "" + tn(t) && (e.value = "" + tn(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : dn(e, tn(n)) : o === "number" && e.value == t ? dn(e, tn(e.value)) : dn(e, tn(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + tn(s) : e.removeAttribute("name");
	}
	function un(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				an(e);
				return;
			}
			n = n == null ? "" : "" + tn(n), t = t == null ? n : "" + tn(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), an(e);
	}
	function dn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function F(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + tn(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function fn(e, t, n) {
		t != null && (t = "" + tn(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + tn(n);
	}
	function pn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (Se(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = tn(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), an(e);
	}
	function mn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var hn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function gn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || hn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function _n(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", Xt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (gn(e, a, r), Xt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && gn(e, o, t[o]);
	}
	function vn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var yn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), bn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function xn(e) {
		return bn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Sn() {}
	var Cn = null;
	function wn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Tn = null, En = null;
	function Dn(e) {
		var t = Rt(e);
		if (t && (e = t.stateNode)) {
			var n = e[kt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (ln(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + cn("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[kt] || null;
								if (!a) throw Error(i(90));
								ln(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && on(r);
					}
					break a;
				case "textarea":
					fn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && F(e, !!n.multiple, t, !1);
			}
		}
	}
	var On = !1;
	function kn(e, t, n) {
		if (On) return e(t, n);
		On = !0;
		try {
			return e(t);
		} finally {
			if (On = !1, (Tn !== null || En !== null) && (qd(), Tn && (t = Tn, e = En, En = Tn = null, Dn(t), e))) for (t = 0; t < e.length; t++) Dn(e[t]);
		}
	}
	function An(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[kt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var jn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Mn = !1;
	if (jn) try {
		var Nn = {};
		Object.defineProperty(Nn, "passive", { get: function() {
			Mn = !0;
		} }), window.addEventListener("test", Nn, Nn), window.removeEventListener("test", Nn, Nn);
	} catch {
		Mn = !1;
	}
	var Pn = null, Fn = null, In = null;
	function Ln() {
		if (In) return In;
		var e, t = Fn, n = t.length, r, i = "value" in Pn ? Pn.value : Pn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return In = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Rn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function zn() {
		return !0;
	}
	function Bn() {
		return !1;
	}
	function Vn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? zn : Bn, this.isPropagationStopped = Bn, this;
		}
		return w(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = zn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = zn);
			},
			persist: function() {},
			isPersistent: zn
		}), t;
	}
	var Hn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Un = Vn(Hn), Wn = w({}, Hn, {
		view: 0,
		detail: 0
	}), Gn = Vn(Wn), Kn, qn, Jn, Yn = w({}, Wn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: or,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Jn && (Jn && e.type === "mousemove" ? (Kn = e.screenX - Jn.screenX, qn = e.screenY - Jn.screenY) : qn = Kn = 0, Jn = e), Kn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : qn;
		}
	}), Xn = Vn(Yn), Zn = Vn(w({}, Yn, { dataTransfer: 0 })), Qn = Vn(w({}, Wn, { relatedTarget: 0 })), $n = Vn(w({}, Hn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), er = Vn(w({}, Hn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), tr = Vn(w({}, Hn, { data: 0 })), nr = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, rr = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, ir = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function ar(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = ir[e]) ? !!t[e] : !1;
	}
	function or() {
		return ar;
	}
	var sr = Vn(w({}, Wn, {
		key: function(e) {
			if (e.key) {
				var t = nr[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Rn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rr[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: or,
		charCode: function(e) {
			return e.type === "keypress" ? Rn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Rn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), cr = Vn(w({}, Yn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), lr = Vn(w({}, Hn, { submitter: 0 })), ur = Vn(w({}, Wn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: or
	})), dr = Vn(w({}, Hn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), fr = Vn(w({}, Yn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), pr = Vn(w({}, Hn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), mr = [
		9,
		13,
		27,
		32
	], hr = jn && "CompositionEvent" in window, gr = null;
	jn && "documentMode" in document && (gr = document.documentMode);
	var _r = jn && "TextEvent" in window && !gr, vr = jn && (!hr || gr && 8 < gr && 11 >= gr), yr = " ", br = !1;
	function xr(e, t) {
		switch (e) {
			case "keyup": return mr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Sr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Cr = !1;
	function wr(e, t) {
		switch (e) {
			case "compositionend": return Sr(t);
			case "keypress": return t.which === 32 ? (br = !0, yr) : null;
			case "textInput": return e = t.data, e === yr && br ? null : e;
			default: return null;
		}
	}
	function Tr(e, t) {
		if (Cr) return e === "compositionend" || !hr && xr(e, t) ? (e = Ln(), In = Fn = Pn = null, Cr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return vr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Er = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Dr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Er[e.type] : t === "textarea";
	}
	function Or(e, t, n, r) {
		Tn ? En ? En.push(r) : En = [r] : Tn = r, t = ip(t, "onChange"), 0 < t.length && (n = new Un("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var kr = null, Ar = null;
	function jr(e) {
		Xf(e, 0);
	}
	function Mr(e) {
		if (on(zt(e))) return e;
	}
	function Nr(e, t) {
		if (e === "change") return t;
	}
	var Pr = !1;
	if (jn) {
		var Fr;
		if (jn) {
			var Ir = "oninput" in document;
			if (!Ir) {
				var Lr = document.createElement("div");
				Lr.setAttribute("oninput", "return;"), Ir = typeof Lr.oninput == "function";
			}
			Fr = Ir;
		} else Fr = !1;
		Pr = Fr && (!document.documentMode || 9 < document.documentMode);
	}
	function Rr() {
		kr && (kr.detachEvent("onpropertychange", zr), Ar = kr = null);
	}
	function zr(e) {
		if (e.propertyName === "value" && Mr(Ar)) {
			var t = [];
			Or(t, Ar, e, wn(e)), kn(jr, t);
		}
	}
	function Br(e, t, n) {
		e === "focusin" ? (Rr(), kr = t, Ar = n, kr.attachEvent("onpropertychange", zr)) : e === "focusout" && Rr();
	}
	function Vr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Mr(Ar);
	}
	function Hr(e, t) {
		if (e === "click") return Mr(t);
	}
	function Ur(e, t) {
		if (e === "input" || e === "change") return Mr(t);
	}
	function Wr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Gr = typeof Object.is == "function" ? Object.is : Wr;
	function Kr(e, t) {
		if (Gr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!He.call(t, i) || !Gr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function qr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Jr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Yr(e, t) {
		var n = Jr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Jr(n);
		}
	}
	function Xr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Xr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Zr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = qr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = qr(e.document);
		}
		return t;
	}
	function Qr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var $r = jn && "documentMode" in document && 11 >= document.documentMode, ei = null, ti = null, ni = null, ri = !1;
	function ii(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		ri || ei == null || ei !== qr(r) || (r = ei, "selectionStart" in r && Qr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ni && Kr(ni, r) || (ni = r, r = ip(ti, "onSelect"), 0 < r.length && (t = new Un("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = ei)));
	}
	function ai(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var oi = {
		animationend: ai("Animation", "AnimationEnd"),
		animationiteration: ai("Animation", "AnimationIteration"),
		animationstart: ai("Animation", "AnimationStart"),
		transitionrun: ai("Transition", "TransitionRun"),
		transitionstart: ai("Transition", "TransitionStart"),
		transitioncancel: ai("Transition", "TransitionCancel"),
		transitionend: ai("Transition", "TransitionEnd")
	}, si = {}, ci = {};
	jn && (ci = document.createElement("div").style, "AnimationEvent" in window || (delete oi.animationend.animation, delete oi.animationiteration.animation, delete oi.animationstart.animation), "TransitionEvent" in window || delete oi.transitionend.transition);
	function li(e) {
		if (si[e]) return si[e];
		if (!oi[e]) return e;
		var t = oi[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in ci) return si[e] = t[n];
		return e;
	}
	var ui = li("animationend"), di = li("animationiteration"), fi = li("animationstart"), pi = li("transitionrun"), mi = li("transitionstart"), hi = li("transitioncancel"), gi = li("transitionend"), _i = /* @__PURE__ */ new Map(), vi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	vi.push("scrollEnd");
	function yi(e, t) {
		_i.set(e, t), Wt(t, [e]);
	}
	var bi = 0;
	function xi(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = Od.identifierPrefix;
		var n = bi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function Si(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Id;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function Ci(e, t) {
		return e = Si(e), t = Si(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var wi = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Ti = [], Ei = 0, Di = 0;
	function Oi() {
		for (var e = Ei, t = Di = Ei = 0; t < e;) {
			var n = Ti[t];
			Ti[t++] = null;
			var r = Ti[t];
			Ti[t++] = null;
			var i = Ti[t];
			Ti[t++] = null;
			var a = Ti[t];
			if (Ti[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Mi(n, i, a);
		}
	}
	function ki(e, t, n, r) {
		Ti[Ei++] = e, Ti[Ei++] = t, Ti[Ei++] = n, Ti[Ei++] = r, Di |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Ai(e, t, n, r) {
		return ki(e, t, n, r), Ni(e);
	}
	function ji(e, t) {
		return ki(e, null, null, t), Ni(e);
	}
	function Mi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - at(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Ni(e) {
		if (50 < Ld) throw Ld = 0, Rd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Pi = {};
	function Fi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Ii(e, t, n, r) {
		return new Fi(e, t, n, r);
	}
	function Li(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ri(e, t) {
		var n = e.alternate;
		return n === null ? (n = Ii(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function zi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Bi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Li(r) && (s = 1);
		else if (typeof r == "string") s = nh(e, n, A.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case D: return e = Ii(31, n, t, a), e.elementType = D, e.lanes = o, e;
			case ae: return Vi(n.children, a, o, t);
			case oe:
				s = 8, a |= 24;
				break;
			case se: return e = Ii(12, n, t, a | 2), e.elementType = se, e.lanes = o, e;
			case ue: return e = Ii(13, n, t, a), e.elementType = ue, e.lanes = o, e;
			case de: return e = Ii(19, n, t, a), e.elementType = de, e.lanes = o, e;
			case me:
			case ge: return e = a | 32, e = Ii(30, n, t, e), e.elementType = ge, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case le:
						s = 10;
						break a;
					case ce:
						s = 9;
						break a;
					case E:
						s = 11;
						break a;
					case fe:
						s = 14;
						break a;
					case pe:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Ii(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Vi(e, t, n, r) {
		return e = Ii(7, e, r, t), e.lanes = n, e;
	}
	function Hi(e, t, n) {
		return e = Ii(6, e, null, t), e.lanes = n, e;
	}
	function Ui(e) {
		var t = Ii(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Wi(e, t, n) {
		return t = Ii(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Gi = /* @__PURE__ */ new WeakMap();
	function Ki(e, t) {
		if (typeof e == "object" && e) {
			var n = Gi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ve(t)
			}, Gi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ve(t)
		};
	}
	var qi = [], Ji = 0, Yi = null, Xi = 0, Zi = [], Qi = 0, $i = null, ea = 1, ta = "";
	function na(e, t) {
		qi[Ji++] = Xi, qi[Ji++] = Yi, Yi = e, Xi = t;
	}
	function ra(e, t, n) {
		Zi[Qi++] = ea, Zi[Qi++] = ta, Zi[Qi++] = $i, $i = e;
		var r = ea;
		e = ta;
		var i = 32 - at(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - at(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ea = 1 << 32 - at(t) + i | n << i | r, ta = a + e;
		} else ea = 1 << a | n << i | r, ta = e;
	}
	function ia(e) {
		e.return !== null && (na(e, 1), ra(e, 1, 0));
	}
	function aa(e) {
		for (; e === Yi;) Yi = qi[--Ji], qi[Ji] = null, Xi = qi[--Ji], qi[Ji] = null;
		for (; e === $i;) $i = Zi[--Qi], Zi[Qi] = null, ta = Zi[--Qi], Zi[Qi] = null, ea = Zi[--Qi], Zi[Qi] = null;
	}
	function oa(e, t) {
		Zi[Qi++] = ea, Zi[Qi++] = ta, Zi[Qi++] = $i, ea = t.id, ta = t.overflow, $i = e;
	}
	var sa = null, ca = null, I = !1, la = null, ua = !1, da = Error(i(519));
	function fa(e) {
		throw va(Ki(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), da;
	}
	function pa(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Ot] = e, t[kt] = r, n) {
			case "dialog":
				Zf("cancel", t), Zf("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Zf("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Jf.length; n++) Zf(Jf[n], t);
				break;
			case "source":
				Zf("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Zf("error", t), Zf("load", t);
				break;
			case "details":
				Zf("toggle", t);
				break;
			case "input":
				Zf("invalid", t), un(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Zf("invalid", t);
				break;
			case "textarea": Zf("invalid", t), pn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || up(t.textContent, n) ? (r.popover != null && (Zf("beforetoggle", t), Zf("toggle", t)), r.onScroll != null && Zf("scroll", t), r.onScrollEnd != null && Zf("scrollend", t), r.onClick != null && (t.onclick = Sn), t = !0) : t = !1, t || fa(e, !0);
	}
	function ma(e) {
		for (sa = e.return; sa;) switch (sa.tag) {
			case 5:
			case 31:
			case 13:
				ua = !1;
				return;
			case 27:
			case 3:
				ua = !0;
				return;
			default: sa = sa.return;
		}
	}
	function ha(e) {
		if (e !== sa) return !1;
		if (!I) return ma(e), I = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || wp(e.type, e.memoizedProps)), n = !n), n && ca && fa(e), ma(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ca = U(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ca = U(e);
		} else t === 27 ? (t = ca, Np(e.type) ? (e = xm, xm = null, ca = e) : ca = t) : ca = sa ? bm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ga() {
		ca = sa = null, I = !1;
	}
	function _a() {
		var e = la;
		return e !== null && (bd === null ? bd = e : bd.push.apply(bd, e), la = null), e;
	}
	function va(e) {
		la === null ? la = [e] : la.push(e);
	}
	var ya = Ee(null), ba = null, xa = null;
	function Sa(e, t, n) {
		Oe(ya, t._currentValue), t._currentValue = n;
	}
	function Ca(e) {
		e._currentValue = ya.current, De(ya);
	}
	function wa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ta(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), wa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), wa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), wa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Ea(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Gr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === j.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [gh] : e.push(gh));
			}
			a = a.return;
		}
		return e !== null && Ta(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function Da(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Gr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Oa(e) {
		ba = e, xa = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ka(e) {
		return ja(ba, e);
	}
	function Aa(e, t) {
		return ba === null && Oa(e), ja(e, t);
	}
	function ja(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, xa === null) {
			if (e === null) throw Error(i(308));
			xa = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else xa = xa.next = t;
		return n;
	}
	var Ma = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Na = t.unstable_scheduleCallback, Pa = t.unstable_NormalPriority, L = {
		$$typeof: le,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function R() {
		return {
			controller: new Ma(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Fa(e) {
		e.refCount--, e.refCount === 0 && Na(Pa, function() {
			e.controller.abort();
		});
	}
	function Ia(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var La = null;
	function Ra(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var za = null, Ba = 0, Va = 0, Ha = null;
	function Ua(e, t) {
		if (za === null) {
			var n = za = [];
			Ba = 0, Va = Uf(), Ha = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Ba++, t.then(Wa, Wa), t;
	}
	function Wa() {
		if (--Ba === 0 && (La = null, za !== null)) {
			Ha !== null && (Ha.status = "fulfilled");
			var e = za;
			za = null, Va = 0, Ha = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ga(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ka = O.S;
	O.S = function(e, t) {
		if (Cd = qe(), typeof t == "object" && t && typeof t.then == "function" && Ua(e, t), La !== null) for (var n = kf; n !== null;) Ia(n, La), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = kf; r !== null;) Ia(r, n), r = r.next;
			if (Va !== 0) {
				r = La, r === null && (r = La = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ka !== null && Ka(e, t);
	};
	var qa = Ee(null);
	function Ja() {
		var e = qa.current;
		return e === null ? od.pooledCache : e;
	}
	function Ya(e, t) {
		t === null ? Oe(qa, qa.current) : Oe(qa, t.pool);
	}
	function Xa() {
		var e = Ja();
		return e === null ? null : {
			parent: L._currentValue,
			pool: e
		};
	}
	var Za = Error(i(460)), Qa = Error(i(474)), $a = Error(i(542)), eo = { then: function() {} };
	function to(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function no(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Sn, Sn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, oo(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(Sn, Sn);
				else {
					if (e = od, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, oo(e), e;
				}
				throw io = t, Za;
		}
	}
	function ro(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (io = e, Za) : e;
		}
	}
	var io = null;
	function ao() {
		if (io === null) throw Error(i(459));
		var e = io;
		return io = null, e;
	}
	function oo(e) {
		if (e === Za || e === $a) throw Error(i(483));
	}
	var so = null, co = 0;
	function lo(e) {
		var t = co;
		return co += 1, so === null && (so = []), no(so, e, t);
	}
	function uo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function fo(e, t) {
		throw t.$$typeof === T ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function po(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ri(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Hi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === ae ? (e = d(e, t, n.props.children, r, n.key), uo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === pe && ro(i) === t.type) ? (t = a(t, n.props), uo(t, n), t.return = e, t) : (t = Bi(n.type, n.key, n.props, null, e.mode, r), uo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Wi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Vi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Hi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case re: return n = Bi(t.type, t.key, t.props, null, e.mode, n), uo(n, t), n.return = e, n;
					case ie: return t = Wi(t, e.mode, n), t.return = e, t;
					case pe: return t = ro(t), f(e, t, n);
				}
				if (Se(t) || ye(t)) return t = Vi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, lo(t), n);
				if (t.$$typeof === le) return f(e, Aa(e, t), n);
				fo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case re: return n.key === i ? l(e, t, n, r) : null;
					case ie: return n.key === i ? u(e, t, n, r) : null;
					case pe: return n = ro(n), p(e, t, n, r);
				}
				if (Se(n) || ye(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, lo(n), r);
				if (n.$$typeof === le) return p(e, t, Aa(e, n), r);
				fo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case re: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case ie: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case pe: return r = ro(r), m(e, t, n, r, i);
				}
				if (Se(r) || ye(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, lo(r), i);
				if (r.$$typeof === le) return m(e, t, n, Aa(t, r), i);
				fo(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), I && na(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return I && na(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), I && na(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), I && na(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return I && na(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), I && na(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === ae && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case re:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === ae) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), uo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === pe && ro(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), uo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === ae ? (c = Vi(o.props.children, e.mode, c, o.key), uo(c, o), c.return = e, e = c) : (c = Bi(o.type, o.key, o.props, null, e.mode, c), uo(c, o), c.return = e, e = c);
						}
						return s(e);
					case ie:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Wi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case pe: return o = ro(o), _(e, r, o, c);
				}
				if (Se(o)) return h(e, r, o, c);
				if (ye(o)) {
					if (l = ye(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, lo(o), c);
				if (o.$$typeof === le) return _(e, r, Aa(e, o), c);
				fo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Hi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				co = 0;
				var i = _(e, t, n, r);
				return so = null, i;
			} catch (t) {
				if (t === Za || t === $a) throw t;
				var a = Ii(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var mo = po(!0), ho = po(!1), go = !1;
	function _o(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function vo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function yo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function bo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, ad & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Ni(e), Mi(e, null, n), t;
		}
		return ki(e, r, t, n), Ni(e);
	}
	function xo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, St(e, n);
		}
	}
	function So(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Co = !1;
	function wo() {
		if (Co) {
			var e = Ha;
			if (e !== null) throw e;
		}
	}
	function To(e, t, n, r) {
		Co = !1;
		var i = e.updateQueue;
		go = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (V & f) === f : (r & f) === f) {
					f !== 0 && f === Va && (Co = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = w({}, d, f);
								break a;
							case 2: go = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), md |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Eo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Do(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Eo(n[e], t);
	}
	var Oo = Ee(null), ko = Ee(0);
	function Ao(e, t) {
		e = fd, Oe(ko, e), Oe(Oo, t), fd = e | t.baseLanes;
	}
	function jo() {
		Oe(ko, fd), Oe(Oo, Oo.current);
	}
	function Mo() {
		fd = ko.current, De(Oo), De(ko);
	}
	var No = Ee(null), Po = null;
	function Fo(e) {
		var t = e.alternate;
		Oe(Bo, Bo.current & 1), Oe(No, e), Po === null && (t === null || Oo.current !== null || t.memoizedState !== null) && (Po = e);
	}
	function Io(e) {
		Oe(Bo, Bo.current), Oe(No, e), Po === null && (Po = e);
	}
	function Lo(e) {
		e.tag === 22 ? (Oe(Bo, Bo.current), Oe(No, e), Po === null && (Po = e)) : Ro();
	}
	function Ro() {
		Oe(Bo, Bo.current), Oe(No, No.current);
	}
	function zo(e) {
		De(No), Po === e && (Po = null), De(Bo);
	}
	var Bo = Ee(0);
	function Vo(e, t) {
		Oe(No, No.current), Oe(Bo, t);
	}
	function Ho(e) {
		De(Bo), De(No), Po === e && (Po = null);
	}
	function Uo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || _m(n) || vm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Wo = 0, z = null, Go = null, Ko = null, qo = !1, Jo = !1, Yo = !1, Xo = 0, Zo = 0, Qo = null, $o = 0;
	function es() {
		throw Error(i(321));
	}
	function ts(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Gr(e[n], t[n])) return !1;
		return !0;
	}
	function ns(e, t, n, r, i, a) {
		return Wo = a, z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? yc : bc, Yo = !1, a = n(r, i), Yo = !1, Jo && (a = is(t, n, r, i)), rs(e), a;
	}
	function rs(e) {
		O.H = vc;
		var t = Go !== null && Go.next !== null;
		if (Wo = 0, Ko = Go = z = null, qo = !1, Zo = 0, Qo = null, t) throw Error(i(300));
		e === null || Lc || (e = e.dependencies, e !== null && Da(e) && (Lc = !0));
	}
	function is(e, t, n, r) {
		z = e;
		var a = 0;
		do {
			if (Jo && (Qo = null), Zo = 0, Jo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Ko = Go = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			O.H = xc, o = t(n, r);
		} while (Jo);
		return o;
	}
	function as() {
		var e = O.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? fs(t) : t, e = e.useState()[0], (Go === null ? null : Go.memoizedState) !== e && (z.flags |= 1024), t;
	}
	function os() {
		var e = Xo !== 0;
		return Xo = 0, e;
	}
	function ss(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function cs(e) {
		if (qo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			qo = !1;
		}
		Wo = 0, Ko = Go = z = null, Jo = !1, Zo = Xo = 0, Qo = null;
	}
	function ls() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Ko === null ? z.memoizedState = Ko = e : Ko = Ko.next = e, Ko;
	}
	function us() {
		if (Go === null) {
			var e = z.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Go.next;
		var t = Ko === null ? z.memoizedState : Ko.next;
		if (t !== null) Ko = t, Go = e;
		else {
			if (e === null) throw z.alternate === null ? Error(i(467)) : Error(i(310));
			Go = e, e = {
				memoizedState: Go.memoizedState,
				baseState: Go.baseState,
				baseQueue: Go.baseQueue,
				queue: Go.queue,
				next: null
			}, Ko === null ? z.memoizedState = Ko = e : Ko = Ko.next = e;
		}
		return Ko;
	}
	function ds() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function fs(e) {
		var t = Zo;
		return Zo += 1, Qo === null && (Qo = []), e = no(Qo, e, t), t = z, (Ko === null ? t.memoizedState : Ko.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? yc : bc), e;
	}
	function ps(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return fs(e);
			if (e.$$typeof === _e) return;
			if (e.$$typeof === le) return ka(e);
		}
		throw Error(i(438, String(e)));
	}
	function ms(e) {
		var t = null, n = z.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = z.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ds(), z.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = he;
		return t.index++, n;
	}
	function hs(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function gs(e) {
		return _s(us(), Go, e);
	}
	function _s(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Wo & f) === f : (V & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Va && (d = !0);
					else if ((Wo & p) === p) {
						u = u.next, p === Va && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, z.lanes |= p, md |= p;
					f = u.action, Yo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, z.lanes |= f, md |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Gr(o, e.memoizedState) && (Lc = !0, d && (n = Ha, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function vs(e) {
		var t = us(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Gr(o, t.memoizedState) || (Lc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ys(e, t, n) {
		var r = z, a = us(), o = I;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Gr((Go || a).memoizedState, n);
		if (s && (a.memoizedState = n, Lc = !0), a = a.queue, Ws(Ss.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Ko !== null && !!(Ko.memoizedState.tag & 1), zs(e ? 9 : 8, { destroy: void 0 }, xs.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, od === null) throw Error(i(349));
			o || Wo & 127 || bs(r, t, n);
		}
		return n;
	}
	function bs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = z.updateQueue, t === null ? (t = ds(), z.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function xs(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Cs(t) && ws(e);
	}
	function Ss(e, t, n) {
		return n(function() {
			Cs(t) && ws(e);
		});
	}
	function Cs(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Gr(e, n);
		} catch {
			return !0;
		}
	}
	function ws(e) {
		var t = ji(e, 2);
		t !== null && Hd(t, e, 2);
	}
	function Ts(e) {
		var t = ls();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Yo) {
				it(!0);
				try {
					n();
				} finally {
					it(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: hs,
			lastRenderedState: e
		}, t;
	}
	function Es(e, t, n, r) {
		return e.baseState = n, _s(e, Go, typeof r == "function" ? r : hs);
	}
	function Ds(e, t, n, r, a) {
		if (hc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			O.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Os(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Os(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = O.T, o = {};
			o.types = a === null ? null : a.types, O.T = o;
			try {
				var s = n(i, r), c = O.S;
				c !== null && c(o, s), ks(e, t, s);
			} catch (n) {
				js(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), O.T = a;
			}
		} else try {
			a = n(i, r), ks(e, t, a);
		} catch (n) {
			js(e, t, n);
		}
	}
	function ks(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			As(e, t, n);
		}, function(n) {
			return js(e, t, n);
		}) : As(e, t, n);
	}
	function As(e, t, n) {
		t.status = "fulfilled", t.value = n, Ms(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Os(e, n)));
	}
	function js(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ms(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ms(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ns(e, t) {
		return t;
	}
	function Ps(e, t) {
		if (I) {
			var n = od.formState;
			if (n !== null) {
				a: {
					var r = z;
					if (I) {
						if (ca) {
							b: {
								for (var i = ca, a = ua; i.nodeType !== 8;) if (!a || (i = bm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								ca = bm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						fa(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = ls(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ns,
			lastRenderedState: t
		}, n.queue = r, n = fc.bind(null, z, r), r.dispatch = n, r = Ts(!1), a = mc.bind(null, z, !1, r.queue), r = ls(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Ds.bind(null, z, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Fs(e) {
		return Is(us(), Go, e);
	}
	function Is(e, t, n) {
		if (t = _s(e, t, Ns)[0], e = gs(hs)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = fs(t);
		} catch (e) {
			throw e === Za ? $a : e;
		}
		else r = t;
		t = us();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (z.flags |= 2048, zs(9, { destroy: void 0 }, Ls.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ls(e, t) {
		e.action = t;
	}
	function Rs(e) {
		var t = us(), n = Go;
		if (n !== null) return Is(t, n, e);
		us(), t = t.memoizedState, n = us();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function zs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = z.updateQueue, t === null && (t = ds(), z.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Bs() {
		return us().memoizedState;
	}
	function Vs(e, t, n, r) {
		var i = ls();
		z.flags |= e, i.memoizedState = zs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Hs(e, t, n, r) {
		var i = us();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Go !== null && r !== null && ts(r, Go.memoizedState.deps) ? i.memoizedState = zs(t, a, n, r) : (z.flags |= e, i.memoizedState = zs(1 | t, a, n, r));
	}
	function Us(e, t) {
		Vs(8390656, 8, e, t);
	}
	function Ws(e, t) {
		Hs(2048, 8, e, t);
	}
	function Gs(e) {
		z.flags |= 4;
		var t = z.updateQueue;
		if (t === null) t = ds(), z.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Ks(e) {
		var t = us().memoizedState;
		return Gs({
			ref: t,
			nextImpl: e
		}), function() {
			if (ad & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function qs(e, t) {
		return Hs(4, 2, e, t);
	}
	function Js(e, t) {
		return Hs(4, 4, e, t);
	}
	function Ys(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Xs(e, t, n) {
		n = n == null ? null : n.concat([e]), Hs(4, 4, Ys.bind(null, t, e), n);
	}
	function Zs() {}
	function Qs(e, t) {
		var n = us();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && ts(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function $s(e, t) {
		var n = us();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && ts(t, r[1])) return r[0];
		if (r = e(), Yo) {
			it(!0);
			try {
				e();
			} finally {
				it(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ec(e, t, n) {
		return n === void 0 || Wo & 1073741824 && !(V & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Bd(), z.lanes |= e, md |= e, n);
	}
	function tc(e, t, n, r) {
		return Gr(n, t) ? n : Oo.current === null ? !(Wo & 106) || Wo & 1073741824 && !(V & 261930) ? (Lc = !0, e.memoizedState = n) : (e = Bd(), z.lanes |= e, md |= e, t) : (e = ec(e, n, r), Gr(e, t) || (Lc = !0), e);
	}
	function nc(e, t, n, r, i) {
		var a = k.p;
		k.p = a !== 0 && 8 > a ? a : 8;
		var o = O.T, s = {};
		s.types = o === null ? null : o.types, O.T = s, mc(e, !1, t, n);
		try {
			var c = i(), l = O.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? pc(e, t, Ga(c, r), zd(e)) : pc(e, t, r, zd(e));
		} catch (n) {
			pc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, zd());
		} finally {
			k.p = a, o !== null && s.types !== null && (o.types = s.types), O.T = o;
		}
	}
	function rc() {}
	function ic(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ac(e).queue;
		nc(e, a, t, Ce, n === null ? rc : function() {
			return oc(e), n(r);
		});
	}
	function ac(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: Ce,
			baseState: Ce,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: hs,
				lastRenderedState: Ce
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: hs,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function oc(e) {
		var t = ac(e);
		t.next === null && (t = e.alternate.memoizedState), pc(e, t.next.queue, {}, zd());
	}
	function sc() {
		return ka(gh);
	}
	function cc() {
		return us().memoizedState;
	}
	function lc() {
		return us().memoizedState;
	}
	function uc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = zd();
					e = yo(n);
					var r = bo(t, e, n);
					r !== null && (Hd(r, t, n), xo(r, t, n)), t = { cache: R() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function dc(e, t, n) {
		var r = zd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, hc(e) ? gc(t, n) : (n = Ai(e, t, n, r), n !== null && (Hd(n, e, r), _c(n, t, r)));
	}
	function fc(e, t, n) {
		pc(e, t, n, zd());
	}
	function pc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (hc(e)) gc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Gr(s, o)) return ki(e, t, i, 0), od === null && Oi(), !1;
			} catch {}
			if (n = Ai(e, t, i, r), n !== null) return Hd(n, e, r), _c(n, t, r), !0;
		}
		return !1;
	}
	function mc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Uf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, hc(e)) {
			if (t) throw Error(i(479));
		} else t = Ai(e, n, r, 2), t !== null && Hd(t, e, 2);
	}
	function hc(e) {
		var t = e.alternate;
		return e === z || t !== null && t === z;
	}
	function gc(e, t) {
		Jo = qo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function _c(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, St(e, n);
		}
	}
	var vc = {
		readContext: ka,
		use: ps,
		useCallback: es,
		useContext: es,
		useEffect: es,
		useImperativeHandle: es,
		useLayoutEffect: es,
		useInsertionEffect: es,
		useMemo: es,
		useReducer: es,
		useRef: es,
		useState: es,
		useDebugValue: es,
		useDeferredValue: es,
		useTransition: es,
		useSyncExternalStore: es,
		useId: es,
		useHostTransitionStatus: es,
		useFormState: es,
		useActionState: es,
		useOptimistic: es,
		useMemoCache: es,
		useCacheRefresh: es,
		useEffectEvent: es
	}, yc = {
		readContext: ka,
		use: ps,
		useCallback: function(e, t) {
			return ls().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ka,
		useEffect: Us,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Vs(4194308, 4, Ys.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Vs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Vs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = ls();
			t = t === void 0 ? null : t;
			var r = e();
			if (Yo) {
				it(!0);
				try {
					e();
				} finally {
					it(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = ls();
			if (n !== void 0) {
				var i = n(t);
				if (Yo) {
					it(!0);
					try {
						n(t);
					} finally {
						it(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = dc.bind(null, z, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = ls();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ts(e);
			var t = e.queue, n = fc.bind(null, z, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Zs,
		useDeferredValue: function(e, t) {
			return ec(ls(), e, t);
		},
		useTransition: function() {
			var e = Ts(!1);
			return e = nc.bind(null, z, e.queue, !0, !1), ls().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = z, a = ls();
			if (I) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), od === null) throw Error(i(349));
				V & 127 || bs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Us(Ss.bind(null, r, o, e), [e]), r.flags |= 2048, zs(9, { destroy: void 0 }, xs.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = ls(), t = od.identifierPrefix;
			if (I) {
				var n = ta, r = ea;
				n = (r & ~(1 << 32 - at(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Xo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = $o++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: sc,
		useFormState: Ps,
		useActionState: Ps,
		useOptimistic: function(e) {
			var t = ls();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = mc.bind(null, z, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ms,
		useCacheRefresh: function() {
			return ls().memoizedState = uc.bind(null, z);
		},
		useEffectEvent: function(e) {
			var t = ls(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (ad & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, bc = {
		readContext: ka,
		use: ps,
		useCallback: Qs,
		useContext: ka,
		useEffect: Ws,
		useImperativeHandle: Xs,
		useInsertionEffect: qs,
		useLayoutEffect: Js,
		useMemo: $s,
		useReducer: gs,
		useRef: Bs,
		useState: function() {
			return gs(hs);
		},
		useDebugValue: Zs,
		useDeferredValue: function(e, t) {
			return tc(us(), Go.memoizedState, e, t);
		},
		useTransition: function() {
			var e = gs(hs)[0], t = us().memoizedState;
			return [typeof e == "boolean" ? e : fs(e), t];
		},
		useSyncExternalStore: ys,
		useId: cc,
		useHostTransitionStatus: sc,
		useFormState: Fs,
		useActionState: Fs,
		useOptimistic: function(e, t) {
			return Es(us(), Go, e, t);
		},
		useMemoCache: ms,
		useCacheRefresh: lc,
		useEffectEvent: Ks
	}, xc = {
		readContext: ka,
		use: ps,
		useCallback: Qs,
		useContext: ka,
		useEffect: Ws,
		useImperativeHandle: Xs,
		useInsertionEffect: qs,
		useLayoutEffect: Js,
		useMemo: $s,
		useReducer: vs,
		useRef: Bs,
		useState: function() {
			return vs(hs);
		},
		useDebugValue: Zs,
		useDeferredValue: function(e, t) {
			var n = us();
			return Go === null ? ec(n, e, t) : tc(n, Go.memoizedState, e, t);
		},
		useTransition: function() {
			var e = vs(hs)[0], t = us().memoizedState;
			return [typeof e == "boolean" ? e : fs(e), t];
		},
		useSyncExternalStore: ys,
		useId: cc,
		useHostTransitionStatus: sc,
		useFormState: Rs,
		useActionState: Rs,
		useOptimistic: function(e, t) {
			var n = us();
			return Go === null ? (n.baseState = e, [e, n.queue.dispatch]) : Es(n, Go, e, t);
		},
		useMemoCache: ms,
		useCacheRefresh: lc,
		useEffectEvent: Ks
	};
	function Sc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : w({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Cc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = zd(), i = yo(r);
			i.payload = t, n != null && (i.callback = n), t = bo(e, i, r), t !== null && (Hd(t, e, r), xo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = zd(), i = yo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = bo(e, i, r), t !== null && (Hd(t, e, r), xo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = zd(), r = yo(n);
			r.tag = 2, t != null && (r.callback = t), t = bo(e, r, n), t !== null && (Hd(t, e, n), xo(t, e, n));
		}
	};
	function wc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Kr(n, r) || !Kr(i, a) : !0;
	}
	function Tc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Cc.enqueueReplaceState(t, t.state, null);
	}
	function Ec(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = w({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Dc(e) {
		wi(e);
	}
	function Oc(e) {
		console.error(e);
	}
	function kc(e) {
		wi(e);
	}
	function Ac(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function jc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Mc(e, t, n) {
		return n = yo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Ac(e, t);
		}, n;
	}
	function Nc(e) {
		return e = yo(e), e.tag = 3, e;
	}
	function Pc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				jc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			jc(t, n, r), typeof i != "function" && (Ed === null ? Ed = /* @__PURE__ */ new Set([this]) : Ed.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Fc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ea(t, n, a, !0), n = No.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Po === null ? ef() : n.alternate === null && pd === 0 && (pd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === eo ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Cf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === eo ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Cf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Cf(e, r, a), ef(), !1;
		}
		if (I) return t = No.current, t === null ? (r !== da && (t = Error(i(423), { cause: r }), va(Ki(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ki(r, n), a = Mc(e.stateNode, r, a), So(e, a), pd !== 4 && (pd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== da && (e = Error(i(422), { cause: r }), va(Ki(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ki(o, n), yd === null ? yd = [o] : yd.push(o), pd !== 4 && (pd = 2), t === null) return !0;
		r = Ki(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Mc(n.stateNode, r, e), So(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (Ed === null || !Ed.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Nc(a), Pc(a, e, n, r), So(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ic = Error(i(461)), Lc = !1;
	function Rc(e, t, n, r) {
		t.child = e === null ? ho(t, null, n, r) : mo(t, e.child, n, r);
	}
	function zc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Oa(t), r = ns(e, t, n, o, a, i), s = os(), e !== null && !Lc ? (ss(e, t, i), pl(e, t, i)) : (I && s && ia(t), t.flags |= 1, Rc(e, t, r, i), t.child);
	}
	function Bc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Li(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Vc(e, t, a, r, i)) : (e = Bi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !ml(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Kr : n, n(o, r) && e.ref === t.ref) return pl(e, t, i);
		}
		return t.flags |= 1, e = Ri(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Vc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Kr(a, r) && e.ref === t.ref) {
				if (Lc = !1, t.pendingProps = r = a, ml(e, i)) e.flags & 131072 && (Lc = !0);
				else return t.lanes = e.lanes, pl(e, t, i);
			}
		}
		return Yc(e, t, n, r, i);
	}
	function Hc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Wc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ya(t, a === null ? null : a.cachePool), a === null ? jo() : Ao(t, a), Lo(t);
			else return r = t.lanes = 536870912, Wc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ya(t, null), jo(), Ro()) : (Ya(t, a.cachePool), Ao(t, a), Ro(), t.memoizedState = null);
		return Rc(e, t, i, n), t.child;
	}
	function Uc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Wc(e, t, n, r, i) {
		var a = Ja();
		return a = a === null ? null : {
			parent: L._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ya(t, null), jo(), Lo(t), e !== null && Ea(e, t, r, !0), t.childLanes = i, null;
	}
	function Gc(e, t) {
		return t = il({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Kc(e, t, n) {
		return mo(t, e.child, null, n), e = Gc(t, t.pendingProps), e.flags |= 2, zo(t), t.memoizedState = null, e;
	}
	function qc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (I) {
				if (r.mode === "hidden") return e = Gc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Uc(null, e);
				if (Io(t), (e = ca) ? (e = gm(e, ua), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: $i === null ? null : {
						id: ea,
						overflow: ta
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ui(e), n.return = t, t.child = n, sa = t, ca = null)) : e = null, e === null) throw fa(t);
				return t.lanes = 536870912, null;
			}
			return Gc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Io(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Kc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Lc || Ea(e, t, n, !1), a = (n & e.childLanes) !== 0, Lc || a) {
				if (Oo.current === null) {
					if (r = od, r !== null && (s = Ct(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ji(e, s), Hd(r, e, s), Ic;
					ef();
				}
				t = Kc(e, t, n);
			} else e = o.treeContext, ca = bm(s.nextSibling), sa = t, I = !0, la = null, ua = !1, e !== null && oa(t, e), t = Gc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ri(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Jc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Yc(e, t, n, r, i) {
		return Oa(t), n = ns(e, t, n, r, void 0, i), r = os(), e !== null && !Lc ? (ss(e, t, i), pl(e, t, i)) : (I && r && ia(t), t.flags |= 1, Rc(e, t, n, i), t.child);
	}
	function Xc(e, t, n, r, i, a) {
		return Oa(t), t.updateQueue = null, n = is(t, r, n, i), rs(e), r = os(), e !== null && !Lc ? (ss(e, t, a), pl(e, t, a)) : (I && r && ia(t), t.flags |= 1, Rc(e, t, n, a), t.child);
	}
	function Zc(e, t, n, r, i) {
		if (Oa(t), t.stateNode === null) {
			var a = Pi, o = n.contextType;
			typeof o == "object" && o && (a = ka(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Cc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, _o(t), o = n.contextType, a.context = typeof o == "object" && o ? ka(o) : Pi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Sc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Cc.enqueueReplaceState(a, a.state, null), To(t, r, a, i), wo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ec(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Pi, typeof u == "object" && u && (o = ka(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Tc(t, a, r, o), go = !1;
			var f = t.memoizedState;
			a.state = f, To(t, r, a, i), wo(), l = t.memoizedState, s || f !== l || go ? (typeof d == "function" && (Sc(t, n, d, r), l = t.memoizedState), (c = go || wc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, vo(e, t), o = t.memoizedProps, u = Ec(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Pi, typeof l == "object" && l && (c = ka(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Tc(t, a, r, c), go = !1, f = t.memoizedState, a.state = f, To(t, r, a, i), wo();
			var p = t.memoizedState;
			o !== d || f !== p || go || e !== null && e.dependencies !== null && Da(e.dependencies) ? (typeof s == "function" && (Sc(t, n, s, r), p = t.memoizedState), (u = go || wc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Da(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Jc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = mo(t, e.child, null, i), t.child = mo(t, null, n, i)) : Rc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = pl(e, t, i), e;
	}
	function Qc(e, t, n, r) {
		return ga(), t.flags |= 256, Rc(e, t, n, r), t.child;
	}
	var $c = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function el(e) {
		return {
			baseLanes: e,
			cachePool: Xa()
		};
	}
	function tl(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= _d), e;
	}
	function nl(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Bo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (I) {
				if (i ? Fo(t) : Ro(), (e = ca) ? (e = gm(e, ua), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: $i === null ? null : {
						id: ea,
						overflow: ta
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ui(e), n.return = t, t.child = n, sa = t, ca = null)) : e = null, e === null) throw fa(t);
				return t.lanes = vm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Ro(), i = t.mode, a = il({
				mode: "hidden",
				children: a
			}, i), r = Vi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = el(n), r.childLanes = tl(e, o, n), t.memoizedState = $c, Uc(null, r)) : (Fo(t), rl(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return ol(e, t, a, o, r, c, s, n);
		}
		return i ? (Ro(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ri(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Vi(i, a, n, null), i.flags |= 2) : i = Ri(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Uc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = el(n) : (a = i.cachePool, a === null ? a = Xa() : (s = L._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = tl(e, o, n), t.memoizedState = $c, Uc(e.child, r)) : (Fo(t), n = e.child, e = n.sibling, n = Ri(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function rl(e, t) {
		return t = il({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function il(e, t) {
		return e = Ii(22, e, null, t), e.lanes = 0, e;
	}
	function al(e, t, n) {
		return mo(t, e.child, null, n), e = rl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function ol(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Fo(t), t.flags &= -257, al(e, t, c)) : t.memoizedState === null ? (Ro(), o = a.fallback, s = t.mode, a = il({
			mode: "visible",
			children: a.children
		}, s), o = Vi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, mo(t, e.child, null, c), a = t.child, a.memoizedState = el(c), a.childLanes = tl(e, r, c), t.memoizedState = $c, Uc(null, a)) : (Ro(), t.child = e.child, t.flags |= 128, null);
		if (Fo(t), vm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, va({
				value: a,
				source: null,
				stack: null
			})), al(e, t, c);
		}
		if (Lc || Ea(e, t, c, !1), r = (c & e.childLanes) !== 0, Lc || r) {
			if (Oo.current !== null) return al(e, t, c);
			if (r = od, r !== null && (a = Ct(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, ji(e, a), Hd(r, e, a), Ic;
			return _m(o) || ef(), al(e, t, c);
		}
		return _m(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, ca = bm(o.nextSibling), sa = t, I = !0, la = null, ua = !1, e !== null && oa(t, e), t = rl(t, a.children), t.flags |= 134221824, t);
	}
	function sl(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), wa(e.return, t, n);
	}
	function cl(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Uo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function ll(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function ul(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function dl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Bo.current;
		if (t.flags & 128) return Vo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Vo(t, o), i === "backwards" && e !== null ? (ul(e), Rc(e, t, r, n), ul(e)) : Rc(e, t, r, n), r = I ? Xi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && sl(e, n, t);
			else if (e.tag === 19) sl(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = cl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, ul(t)), ll(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Uo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				ll(t, !0, n, null, a, r);
				break;
			case "together":
				ll(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = cl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ll(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function fl(e, t, n) {
		var r = t.pendingProps;
		return Sa(t, t.type, r.value), Rc(e, t, r.children, n), t.child;
	}
	function pl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), md |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Ea(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ri(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ri(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function ml(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Da(e)));
	}
	function hl(e, t, n) {
		switch (t.tag) {
			case 3:
				je(t, t.stateNode.containerInfo), Sa(t, L, e.memoizedState.cache), ga();
				break;
			case 27:
			case 5:
				Ne(t);
				break;
			case 4:
				je(t, t.stateNode.containerInfo);
				break;
			case 10:
				Sa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Io(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Fo(t), t.flags |= 128, null;
					r = Ea(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? nl(e, t, n) : (Fo(t), e = pl(e, t, n), e === null ? null : e.sibling);
				}
				Fo(t);
				break;
			case 19:
				if (t.flags & 128) return dl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (Ea(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return dl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Vo(t, Bo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Hc(e, t, n, t.pendingProps);
			case 24: Sa(t, L, e.memoizedState.cache);
		}
		return pl(e, t, n);
	}
	function gl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Lc = !0;
			else {
				if (!ml(e, n) && !(t.flags & 128)) return Lc = !1, hl(e, t, n);
				Lc = !!(e.flags & 131072);
			}
		} else Lc = !1, I && t.flags & 1048576 && ra(t, Xi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ro(t.elementType), t.type = e, typeof e == "function") Li(e) ? (r = Ec(e, r), t.tag = 1, t = Zc(null, t, e, r, n)) : (t.tag = 0, t = Yc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === E) {
								t.tag = 11, t = zc(null, t, e, r, n);
								break a;
							}
							if (a === fe) {
								t.tag = 14, t = Bc(null, t, e, r, n);
								break a;
							}
							if (a === le) {
								t.tag = 10, t.type = e, t = fl(null, t, n);
								break a;
							}
						}
						throw t = xe(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Yc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ec(r, t.pendingProps), Zc(e, t, r, a, n);
			case 3:
				a: {
					if (je(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, vo(e, t), To(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Sa(t, L, r), r !== o.cache && Ta(t, [L], n, !0), wo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Qc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Ki(Error(i(424)), t), va(a), t = Qc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (ca = bm(e.firstChild), sa = t, I = !0, la = null, ua = !0, n = ho(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ga(), r === a) {
							t = pl(e, t, n);
							break a;
						}
						Rc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Jc(e, t), e === null ? (n = W(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : I || (t.stateNode = Cp(t.type, t.pendingProps, Ae.current, t)) : t.memoizedState = W(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Ne(t), e === null && I && (r = t.stateNode = Tm(t.type, t.pendingProps, Ae.current), sa = t, ua = !0, a = ca, Np(t.type) ? (xm = a, ca = bm(r.firstChild)) : ca = a), Rc(e, t, t.pendingProps.children, n), Jc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && I && ((a = r = ca) && (r = mm(r, t.type, t.pendingProps, ua), r === null ? a = !1 : (t.stateNode = r, sa = t, ca = bm(r.firstChild), ua = !1, a = !0)), a || fa(t)), Ne(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, wp(a, o) ? r = null : s !== null && wp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ns(e, t, as, null, null, n), gh._currentValue = a), Jc(e, t), Rc(e, t, r, n), t.child;
			case 6: return e === null && I && ((e = n = ca) && (n = hm(n, t.pendingProps, ua), n === null ? e = !1 : (t.stateNode = n, sa = t, ca = null, e = !0)), e || fa(t)), null;
			case 13: return nl(e, t, n);
			case 4: return je(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mo(t, null, r, n) : Rc(e, t, r, n), t.child;
			case 11: return zc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Jc(e, t), Rc(e, t, r, n), t.child;
			case 8: return Rc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Rc(e, t, t.pendingProps.children, n), t.child;
			case 10: return fl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Oa(t), a = ka(a), r = r(a), t.flags |= 1, Rc(e, t, r, n), t.child;
			case 14: return Bc(e, t, t.type, t.pendingProps, n);
			case 15: return Vc(e, t, t.type, t.pendingProps, n);
			case 19: return dl(e, t, n);
			case 31: return qc(e, t, n);
			case 22: return Hc(e, t, n, t.pendingProps);
			case 24: return Oa(t), r = ka(L), e === null ? (a = Ja(), a === null && (a = od, o = R(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, _o(t), Sa(t, L, a)) : ((e.lanes & n) !== 0 && (vo(e, t), To(t, null, null, n), wo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Sa(t, L, r), r !== a.cache && Ta(t, [L], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Sa(t, L, r))), Rc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : I && ia(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Jc(e, t), Rc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function _l(e) {
		e.flags |= 4;
	}
	function vl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? rh(t, r) : rh(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Zd()) e.flags |= 8192;
				else throw io = eo, Qa;
			}
		} else e.flags &= -16777217;
	}
	function yl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !ih(t)) {
			if (Zd()) e.flags |= 8192;
			else throw io = eo, Qa;
		}
	}
	function bl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : _t(), e.lanes |= t, vd |= t);
	}
	function xl(e, t) {
		if (!I) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function B(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Sl(e, t, n) {
		var r = t.pendingProps;
		switch (aa(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return B(t), null;
			case 1: return B(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ca(L), Me(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ha(t) ? _l(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, _a())), B(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (_l(t), o === null ? (B(t), vl(t, a, null, r, n)) : (B(t), yl(t, o))) : o ? o === e.memoizedState ? (B(t), t.flags &= -16777217) : (_l(t), B(t), yl(t, o)) : (e = e.memoizedProps, e !== r && _l(t), B(t), vl(t, a, e, r, n)), null;
			case 27:
				if (Pe(t), n = Ae.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && _l(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return B(t), t.subtreeFlags &= -33554433, null;
					}
					e = A.current, ha(t) ? pa(t, e) : (e = Tm(a, r, n), t.stateNode = e, _l(t));
				}
				return B(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Pe(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && _l(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return B(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = A.current, ha(t)) pa(t, o);
					else {
						var s = bp(Ae.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Ot] = t, o[kt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (pp(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && _l(t);
					}
				}
				return B(t), t.subtreeFlags &= -33554433, vl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && _l(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Ae.current, ha(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = sa, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ot] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || up(e.nodeValue, n)), e || fa(t, !0);
					} else e = bp(e).createTextNode(r), e[Ot] = t, t.stateNode = e;
				}
				return B(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ha(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ot] = t;
						} else ga(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						B(t), e = !1;
					} else n = _a(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (zo(t), t) : (zo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return B(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ha(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ot] = t;
						} else ga(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						B(t), a = !1;
					} else a = _a(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (zo(t), t) : (zo(t), null);
				}
				return zo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), bl(t, t.updateQueue), B(t), null);
			case 4: return Me(), e === null && ep(t.stateNode.containerInfo), t.flags |= 67108864, B(t), null;
			case 10: return Ca(t.type), B(t), null;
			case 19:
				if (Ho(t), r = t.memoizedState, r === null) return B(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) xl(r, !1);
					else {
						if (pd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Uo(e), o !== null) {
								for (t.flags |= 128, xl(r, !1), e = o.updateQueue, t.updateQueue = e, bl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) zi(n, e), n = n.sibling;
								return Vo(t, Bo.current & 1 | 2), I && na(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && qe() > wd && (t.flags |= 128, a = !0, xl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Uo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, bl(t, e), xl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !I) return B(t), null;
						} else 2 * qe() - r.renderingStartTime > wd && n !== 536870912 && (t.flags |= 128, a = !0, xl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = qe(), e.sibling = null, o = Bo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || I ? Vo(t, o) : (n = o, Oe(No, t), Oe(Bo, n), Po === null && (Po = t)), I && na(t, r.treeForkCount), e;
				}
				return B(t), null;
			case 22:
			case 23: return zo(t), Mo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (B(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : B(t), n = t.updateQueue, n !== null && bl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && De(qa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ca(L), B(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, B(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function Cl(e, t) {
		switch (aa(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ca(L), Me(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Pe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (zo(t), t.alternate === null) throw Error(i(340));
					ga();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (zo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ga();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Ho(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return Me(), null;
			case 10: return Ca(t.type), null;
			case 22:
			case 23: return zo(t), Mo(), e !== null && De(qa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ca(L), null;
			case 25: return null;
			default: return null;
		}
	}
	function wl(e, t) {
		switch (aa(t), t.tag) {
			case 3:
				Ca(L), Me();
				break;
			case 26:
			case 27:
			case 5:
				Pe(t);
				break;
			case 4:
				Me();
				break;
			case 31:
				t.memoizedState !== null && zo(t);
				break;
			case 13:
				zo(t);
				break;
			case 19:
				Ho(t);
				break;
			case 10:
				Ca(t.type);
				break;
			case 22:
			case 23:
				zo(t), Mo(), e !== null && De(qa);
				break;
			case 24: Ca(L);
		}
	}
	function Tl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Sf(t, t.return, e);
		}
	}
	function El(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Sf(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Sf(t, t.return, e);
		}
	}
	function Dl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Do(t, n);
			} catch (t) {
				Sf(e, e.return, t);
			}
		}
	}
	function Ol(e, t, n) {
		n.props = Ec(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Sf(e, t, n);
		}
	}
	function kl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = xi(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Gp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Kp(e);
							p(e.child, !1, lm, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Sf(e, t, n);
		}
	}
	function Al(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Sf(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Sf(e, t, n);
			}
			else n.current = null;
		}
	}
	function jl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) dm(e.stateNode, t[n]);
	}
	function Ml(e) {
		for (var t = e.return; t !== null && (Fl(t) && dm(e.stateNode, t.stateNode), !Pl(t));) t = t.return;
	}
	function Nl(e) {
		for (var t = e.return; t !== null && (Fl(t) && fm(e.stateNode, t.stateNode), !Pl(t));) t = t.return;
	}
	function Pl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Fl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Il(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Sf(e, e.return, t);
		}
	}
	function Ll(e, t, n) {
		try {
			var r = e.stateNode;
			hp(r, e.type, n, t), r[kt] = t;
		} catch (t) {
			Sf(e, e.return, t);
		}
	}
	function Rl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Np(e.type) || e.tag === 4;
	}
	function zl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Rl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Np(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Bl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Sn)), jl(e, r), Xt = !0;
		else if (i !== 4 && (i === 27 && (jl(e, r), r = null, Np(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Bl(e, t, n, r), e = e.sibling; e !== null;) Bl(e, t, n, r), e = e.sibling;
	}
	function Vl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), jl(e, r), Xt = !0;
		else if (i !== 4 && (i === 27 && (jl(e, r), r = null, Np(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Vl(e, t, n, r), e = e.sibling; e !== null;) Vl(e, t, n, r), e = e.sibling;
	}
	function Hl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			pp(t, r, n), t[Ot] = e, t[kt] = n;
		} catch (t) {
			Sf(e, e.return, t);
		}
	}
	var Ul = !1, Wl = null;
	function Gl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Ul = !0);
	}
	var Kl = null;
	function ql() {
		var e = Kl;
		return Kl = null, e;
	}
	var Jl = 0;
	function Yl(e, t, n, r, i) {
		return Jl = 0, Xl(e.child, t, n, r, i);
	}
	function Xl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = zp(o);
					r.push(s), s.view && (a = !0);
				} else a || zp(o).view && (a = !0);
				Ul = !0, Ip(o, Jl === 0 ? t : t + "_" + Jl, n), Jl++;
			} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Xl(e.child, t, n, r, i) && (a = !0));
			e = e.sibling;
		}
		return a;
	}
	function Zl(e, t) {
		for (; e !== null;) e.tag === 5 ? Lp(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Zl(e.child, t)), e = e.sibling;
	}
	function Ql(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Ql(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = Ci(t.default, t.share), t !== "none" && (Yl(e, n, t, null, !1) || Zl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function $l(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = xi(r, n), a = Ci(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Ql(e) : Yl(e, i, a, null, !1) ? (Ql(e), n.paired || t || Vd(e, r.onEnter)) : Zl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) $l(e, t), e = e.sibling;
		else Ql(e);
	}
	function eu(e) {
		if (Wl !== null && Wl.size !== 0) {
			var t = Wl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = Ci(n.default, n.share);
								if (a !== "none" && (Yl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Vd(e, n.onShare)) : Zl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					eu(e);
				}
				e = e.sibling;
			}
		}
	}
	function tu(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = xi(t, e.stateNode), r = Wl === null ? void 0 : Wl.get(n), i = Ci(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Yl(e, n, i, null, !1) ? r === void 0 ? Vd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Wl.delete(n), Vd(e, t.onShare)) : Zl(e.child, !1)), Wl !== null && eu(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) tu(e), e = e.sibling;
		else Wl !== null && eu(e);
	}
	function nu(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = xi(t, e.stateNode);
				t = Ci(t.default, t.update), e.flags &= -5, t !== "none" && Yl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && nu(e);
			e = e.sibling;
		}
	}
	function ru(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Zl(e.child, !1));
				}
				ru(e);
			}
			e = e.sibling;
		}
	}
	function iu(e) {
		if (e.tag === 30) e.stateNode.paired = null, Zl(e.child, !1), ru(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) iu(e), e = e.sibling;
		else ru(e);
	}
	function au(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Zl(e.child, !1) : e.subtreeFlags & 33554432 && au(e), e = e.sibling;
	}
	function ou(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Jl < a.length) {
					var l = a[Jl], u = zp(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Ip(c, Jl === 0 ? n : n + "_" + Jl, i), s && e.flags & 4 || (Kl === null && (Kl = []), Kl.push(c, Jl === 0 ? r : r + "_" + Jl, t.memoizedProps)), Jl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : ou(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function su(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = xi(n, r), a = Ci(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(Bp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Jl = 0, i = ou(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Vd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && su(e, t);
			e = e.sibling;
		}
	}
	var cu = !1, lu = !1, uu = !1, du = !1, fu = typeof WeakSet == "function" ? WeakSet : Set, pu = null, mu = !1, hu = !1, gu = !1, _u = !1;
	function vu(e, t, n) {
		if (e = e.containerInfo, vp = Th, e = Zr(e), Qr(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (yp = {
			focusedElem: e,
			selectionRange: r
		}, Th = !1, n = (n & 335544064) === n, pu = t, t = n ? 9270 : 1024; pu !== null;) {
			if (e = pu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && tu(r[a]);
			if (e.alternate === null && e.flags & 2) n && Gl(e), yu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && tu(r), yu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Gl(e), yu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, pu = r) : (n && nu(e), yu(n));
			}
		}
		Wl = null;
	}
	function yu(e) {
		for (; pu !== null;) {
			var t = pu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = Ec(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							Sf(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) pm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								pm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = xi(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = Ci(a.default, a.update), a !== "none" && Yl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, pu = r;
				break;
			}
			pu = t.return;
		}
	}
	function bu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Bu(e, n), r & 4 && Tl(5, n);
				break;
			case 1:
				if (Bu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Sf(n, n.return, e);
					}
					else {
						var i = Ec(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Sf(n, n.return, e);
						}
					}
				}
				r & 64 && Dl(n), r & 512 && kl(n, n.return);
				break;
			case 3:
				if (Bu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Do(e, t);
					} catch (e) {
						Sf(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Hl(n);
			case 26:
			case 5:
				Bu(e, n), t === null && r & 4 && Il(n), r & 512 && kl(n, n.return);
				break;
			case 12:
				Bu(e, n);
				break;
			case 31:
				Bu(e, n), r & 4 && ku(e, n);
				break;
			case 13:
				Bu(e, n), r & 4 && Au(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ef.bind(null, n), ym(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || cu, !r) {
					var a = t !== null && t.memoizedState !== null || lu;
					t = cu, i = lu, cu = r, (lu = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Hu(e, n, r)) : Bu(e, n), cu = t, lu = i;
				}
				break;
			case 30:
				Bu(e, n), r & 512 && kl(n, n.return);
				break;
			case 7: r & 512 && kl(n, n.return);
			default: Bu(e, n);
		}
	}
	function xu(e, t) {
		for (e = e.child; e !== null;) Su(e, t), e = e.sibling;
	}
	function Su(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					Sf(e, e.return, t);
				}
				Cu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Xt = !0;
				} catch (t) {
					Sf(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? Fp(s, !0) : Fp(e.stateNode, !1);
				} catch (t) {
					Sf(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && xu(e, t);
				break;
			default: xu(e, t);
		}
	}
	function Cu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						Su(n, r);
						break a;
					case 22:
						n.memoizedState === null && Cu(n, r);
						break a;
					default: Cu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function wu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, wu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && N(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var Tu = null, Eu = !1;
	function Du(e, t, n) {
		for (n = n.child; n !== null;) Ou(e, t, n), n = n.sibling;
	}
	function Ou(e, t, n) {
		if (rt && typeof rt.onCommitFiberUnmount == "function") try {
			rt.onCommitFiberUnmount(nt, n);
		} catch {}
		switch (n.tag) {
			case 26:
				lu || Al(n, t), Du(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !lu && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				lu || Al(n, t), Nl(n);
				var r = Tu, i = Eu;
				Np(n.type) && (Tu = n.stateNode, Eu = !1), Du(e, t, n), Em(n.stateNode, n.type, n.memoizedProps), Tu = r, Eu = i;
				break;
			case 5: lu || Al(n, t), Nl(n);
			case 6:
				if (n.tag === 6 && Nl(n), r = Tu, i = Eu, Tu = null, Du(e, t, n), Tu = r, Eu = i, Tu !== null) {
					if (Eu) try {
						(Tu.nodeType === 9 ? Tu.body : Tu.nodeName === "HTML" ? Tu.ownerDocument.body : Tu).removeChild(n.stateNode), Xt = !0;
					} catch (e) {
						Sf(n, t, e);
					}
					else try {
						Tu.removeChild(n.stateNode), Xt = !0;
					} catch (e) {
						Sf(n, t, e);
					}
				}
				break;
			case 18:
				Tu !== null && (Eu ? (e = Tu, Pp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Zh(e)) : Pp(Tu, n.stateNode));
				break;
			case 4:
				r = Tu, i = Eu, Tu = n.stateNode.containerInfo, Eu = !0, Du(e, t, n), Tu = r, Eu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				El(2, n, t), lu || El(4, n, t), Du(e, t, n);
				break;
			case 1:
				lu || (Al(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Ol(n, t, r)), Du(e, t, n);
				break;
			case 21:
				Du(e, t, n);
				break;
			case 22:
				lu = (r = lu) || n.memoizedState !== null, Du(e, t, n), lu = r;
				break;
			case 30:
				Al(n, t), Du(e, t, n);
				break;
			case 7:
				lu || Al(n, t), Du(e, t, n);
				break;
			default: Du(e, t, n);
		}
	}
	function ku(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Zh(e);
			} catch (e) {
				Sf(t, t.return, e);
			}
		}
	}
	function Au(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Zh(e);
		} catch (e) {
			Sf(t, t.return, e);
		}
	}
	function ju(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new fu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new fu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Mu(e, t) {
		var n = ju(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Df.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Nu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Np(l.type)) {
							Tu = l.stateNode, Eu = !1;
							break a;
						}
						break;
					case 5:
						Tu = l.stateNode, Eu = !1;
						break a;
					case 3:
					case 4:
						Tu = l.stateNode.containerInfo, Eu = !0;
						break a;
				}
				l = l.return;
			}
			if (Tu === null) throw Error(i(160));
			Ou(s, c, o), Tu = null, Eu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Fu(t, e, n), t = t.sibling;
	}
	var Pu = null;
	function Fu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Nu(t, e, n), Iu(e), a & 4 && (El(3, e, e.return), Tl(3, e), El(5, e, e.return));
				break;
			case 1:
				Nu(t, e, n), Iu(e), a & 512 && (lu || r === null || Al(r, r.return)), a & 64 && cu && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Pu, Nu(t, e, n), Iu(e), a & 512 && (lu || r === null || Al(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (cu) e.stateNode = Cp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Ft] || r[Ot] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), pp(r, t, n), r[Ot] = e, Vt(r), t = r;
												break a;
											case "link":
												if (o = eh("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), pp(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = eh("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), pp(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[Ot] = e, Vt(r), t = r;
									}
									e.stateNode = t;
								}
							} else cu || th(o, e.type, e.stateNode);
						} else e.stateNode = Ym(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Ll(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || lu || t.parentNode.removeChild(t)) : a.count--, n === null ? cu || th(o, e.type, e.stateNode) : Ym(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Nu(t, e, n), Iu(e), a & 512 && (lu || r === null || Al(r, r.return)), r !== null && a & 4 && Ll(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = uu, uu = !1, Nu(t, e, n), uu = o, Iu(e), a & 512 && (lu || r === null || Al(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						mn(t, ""), Xt = !0;
					} catch (t) {
						Sf(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Ll(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (du = !0);
				break;
			case 6:
				if (Nu(t, e, n), Iu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Xt = !0;
					} catch (t) {
						Sf(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Xt = !1, $m = null, o = Pu, Pu = Am(t.containerInfo), Nu(t, e, n), Pu = o, Iu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Zh(t.containerInfo);
				} catch (t) {
					Sf(e, e.return, t);
				}
				du && (du = !1, Lu(e)), Xt = !1;
				break;
			case 4:
				a = uu, uu = cu, r = Zt(), o = Pu, Pu = Am(e.stateNode.containerInfo), Nu(t, e, n), Iu(e), Pu = o, Xt && hu && (gu = !0), Xt = r, uu = a;
				break;
			case 12:
				Nu(t, e, n), Iu(e);
				break;
			case 31:
				Nu(t, e, n), Iu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Mu(e, t)));
				break;
			case 13:
				Nu(t, e, n), Iu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (Sd = qe()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Mu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = cu, l = lu, u = uu;
				cu = c || o, uu = u || o, lu = l || s, Nu(t, e, n), lu = l, uu = u, cu = c, Iu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || cu || lu || (t = s || lu, n = cu, r = lu, cu = o || cu, lu = t, Vu(e, 2), cu = n, lu = r), !o && uu || xu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Mu(e, n))));
				break;
			case 19:
				Nu(t, e, n), Iu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Mu(e, t)));
				break;
			case 30:
				a & 512 && (lu || r === null || Al(r, r.return)), a = Zt(), o = hu, s = (n & 335544064) === n, c = e.memoizedProps, hu = s && Ci(c.default, c.update) !== "none", Nu(t, e, n), Iu(e), s && r !== null && Xt && (e.flags |= 4), hu = o, Xt = a;
				break;
			case 21: break;
			case 7: a & 512 && (lu || r === null || Al(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Nu(t, e, n), Iu(e);
		}
	}
	function Iu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Rl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Fl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Pl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Vl(e, zl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (mn(l, ""), n.flags &= -33), Vl(e, zl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Bl(e, zl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Sf(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Lu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Lu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Th = !0, t.reset(), Th = !1), e = e.sibling;
		}
	}
	function Ru(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) zu(t, e), t = t.sibling;
		else su(t, !1);
	}
	function zu(e, t) {
		var n = e.alternate;
		if (n === null) $l(e, !1);
		else switch (e.tag) {
			case 3:
				if (_u = mu = !1, ql(), Ru(t, e), !mu && !gu) {
					if (e = Kl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Lp(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), _u = !0;
				}
				Kl = null;
				break;
			case 5:
				Ru(t, e);
				break;
			case 4:
				r = mu, mu = !1, Ru(t, e), mu && (gu = !0), mu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Ru(t, e) : $l(e, !1));
				break;
			case 30:
				r = mu, i = ql(), mu = !1, Ru(t, e), mu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = xi(a, o), o = xi(n.memoizedProps, o);
				var s = Ci(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Jl = 0, t = ou(e, n, t, o, s, a, !0), Jl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Vd(e, e.memoizedProps.onUpdate), Kl = i) : i !== null && (i.push.apply(i, Kl), Kl = i), mu = e.flags & 32 ? !0 : r;
				break;
			default: Ru(t, e);
		}
	}
	function Bu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) bu(e, t.alternate, t), t = t.sibling;
	}
	function Vu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					El(4, n, n.return), Vu(n, r);
					break;
				case 1:
					Al(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && Ol(n, n.return, i), Vu(n, r);
					break;
				case 27: r & 2 && Em(n.stateNode, n.type, n.memoizedProps);
				case 5:
					Al(n, n.return), n.tag !== 5 && n.tag !== 27 || Nl(n), Vu(n, r);
					break;
				case 6:
					Nl(n);
					break;
				case 26:
					Al(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || lu || i.parentNode.removeChild(i), Vu(n, r);
					break;
				case 22:
					n.memoizedState === null && Vu(n, r);
					break;
				case 30:
					Al(n, n.return), Vu(n, r);
					break;
				case 7: Al(n, n.return);
				default: Vu(n, r);
			}
			e = e.sibling;
		}
	}
	function Hu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Hu(i, a, n), Tl(4, a);
					break;
				case 1:
					if (Hu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Sf(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) Eo(l[i], c);
						} catch (e) {
							Sf(r, r.return, e);
						}
					}
					s && o & 64 && Dl(a), kl(a, a.return);
					break;
				case 27: n & 2 && Hl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Ml(a), Hu(i, a, n), s && r === null && o & 4 && Il(a), kl(a, a.return);
					break;
				case 6:
					Ml(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || cu || th(Am(c.ownerDocument), a.type, c), Hu(i, a, n), s && r === null && o & 4 && Il(a), kl(a, a.return);
					break;
				case 12:
					Hu(i, a, n);
					break;
				case 31:
					Hu(i, a, n), s && o & 4 && ku(i, a);
					break;
				case 13:
					Hu(i, a, n), s && o & 4 && Au(i, a);
					break;
				case 22:
					a.memoizedState === null && Hu(i, a, n), kl(a, a.return);
					break;
				case 30:
					Hu(i, a, n), kl(a, a.return);
					break;
				case 7: kl(a, a.return);
				default: Hu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Uu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Fa(n));
	}
	function Wu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Fa(e));
	}
	function Gu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Ku(e, t, n, r), t = t.sibling;
		else i && au(t);
	}
	function Ku(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && iu(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Gu(e, t, n, r), a & 2048 && Tl(9, t);
				break;
			case 1:
				Gu(e, t, n, r);
				break;
			case 3:
				Gu(e, t, n, r), i && _u && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Fa(a)));
				break;
			case 12:
				if (a & 2048) {
					Gu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						Sf(t, t.return, e);
					}
				} else Gu(e, t, n, r);
				break;
			case 31:
				Gu(e, t, n, r);
				break;
			case 13:
				Gu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && iu(t), o._visibility & 2 ? Gu(e, t, n, r) : (o._visibility |= 2, qu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && iu(s), o._visibility & 2 ? Gu(e, t, n, r) : Ju(e, t)), a & 2048 && Uu(s, t);
				break;
			case 24:
				Gu(e, t, n, r), a & 2048 && Wu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Zl(a.child, !0), Zl(t.child, !0))), Gu(e, t, n, r);
				break;
			default: Gu(e, t, n, r);
		}
	}
	function qu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					qu(a, o, s, c, i), Tl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, qu(a, o, s, c, i)) : u._visibility & 2 ? qu(a, o, s, c, i) : Ju(a, o), i && l & 2048 && Uu(o.alternate, o);
					break;
				case 24:
					qu(a, o, s, c, i), i && l & 2048 && Wu(o.alternate, o);
					break;
				default: qu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ju(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ju(n, r), i & 2048 && Uu(r.alternate, r);
					break;
				case 24:
					Ju(n, r), i & 2048 && Wu(r.alternate, r);
					break;
				default: Ju(n, r);
			}
			t = t.sibling;
		}
	}
	var Yu = 8192;
	function Xu(e, t, n) {
		if (e.subtreeFlags & Yu) for (e = e.child; e !== null;) Zu(e, t, n), e = e.sibling;
	}
	function Zu(e, t, n) {
		switch (e.tag) {
			case 26:
				Xu(e, t, n), e.flags & Yu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && oh(n, e)) : sh(n, Pu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Xu(e, t, n), e.flags & Yu && (e = e.stateNode, (t & 335544128) === t && oh(n, e));
				break;
			case 3:
			case 4:
				var r = Pu;
				Pu = Am(e.stateNode.containerInfo), Xu(e, t, n), Pu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Yu, Yu = 16777216, Xu(e, t, n), Yu = r) : Xu(e, t, n));
				break;
			case 30:
				if ((e.flags & Yu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Wl === null && (Wl = /* @__PURE__ */ new Map()), Wl.set(r, i);
				}
				Xu(e, t, n);
				break;
			default: Xu(e, t, n);
		}
	}
	function Qu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function $u(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				pu = r, nd(r, e);
			}
			Qu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) ed(e), e = e.sibling;
	}
	function ed(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				$u(e), e.flags & 2048 && El(9, e, e.return);
				break;
			case 3:
				$u(e);
				break;
			case 12:
				$u(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, td(e)) : $u(e);
				break;
			default: $u(e);
		}
	}
	function td(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				pu = r, nd(r, e);
			}
			Qu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					El(8, t, t.return), td(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, td(t));
					break;
				default: td(t);
			}
			e = e.sibling;
		}
	}
	function nd(e, t) {
		for (; pu !== null;) {
			var n = pu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					El(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Fa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, pu = r;
			else a: for (n = e; pu !== null;) {
				r = pu;
				var i = r.sibling, a = r.return;
				if (wu(r), r === n) {
					pu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, pu = i;
					break a;
				}
				pu = a;
			}
		}
	}
	var rd = {
		getCacheForType: function(e) {
			var t = ka(L), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ka(L).controller.signal;
		}
	}, id = typeof WeakMap == "function" ? WeakMap : Map, ad = 0, od = null, sd = null, V = 0, cd = 0, H = null, ld = !1, ud = !1, dd = !1, fd = 0, pd = 0, md = 0, hd = 0, gd = 0, _d = 0, vd = 0, yd = null, bd = null, xd = !1, Sd = 0, Cd = 0, wd = Infinity, Td = null, Ed = null, Dd = 0, Od = null, kd = null, Ad = 0, jd = 0, Md = null, Nd = null, Pd = null, Fd = null, Id = null, Ld = 0, Rd = null;
	function zd() {
		return ad & 2 && V !== 0 ? V & -V : O.T === null ? M() : Uf();
	}
	function Bd() {
		if (_d === 0) {
			if (!(V & 536870912) || I) {
				var e = ut;
				ut <<= 1, !(ut & 3932160) && (ut = 262144), _d = e;
			} else _d = 536870912;
		}
		return e = No.current, e !== null && (e.flags |= 32), _d;
	}
	function Vd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Gp(xi(e.memoizedProps, n))), Fd === null && (Fd = []), Fd.push(t.bind(null, r));
		}
	}
	function Hd(e, t, n) {
		(e === od && (cd === 2 || cd === 9) || e.cancelPendingCommit !== null) && (Yd(e, 0), Kd(e, V, _d, !1)), yt(e, n), (!(ad & 2) || e !== od) && (e === od && (!(ad & 2) && (hd |= n), pd === 4 && Kd(e, V, _d, !1)), Ff(e));
	}
	function Ud(e, t, n) {
		if (ad & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || mt(e, t), a = r ? rf(e, t) : tf(e, t, !0), o = r;
		do {
			if (a === 0) {
				ud && !r && Kd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Gd(n)) a = tf(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = yd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Yd(c, s).flags |= 256), s = tf(c, s, !1), s !== 2 && s !== 6) {
								if (dd && !l) {
									c.errorRecoveryDisabledLanes |= o, hd |= o, a = 4;
									break a;
								}
								o = bd, bd = a, o !== null && (bd === null ? bd = o : bd.push.apply(bd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Yd(e, 0), Kd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Kd(r, t, _d, !ld);
							break a;
						case 2:
							bd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Sd + 300 - qe(), 10 < a)) {
						if (Kd(r, t, _d, !ld), pt(r, 0, !0) !== 0) break a;
						Ad = t, r.timeoutHandle = Dp(Wd.bind(null, r, n, bd, Td, xd, t, _d, hd, vd, ld, o, "Throttled", -0, 0), a);
						break a;
					}
					Wd(r, n, bd, Td, xd, t, _d, hd, vd, ld, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Ff(e);
	}
	function Wd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: Sn
		}, Wl = null, Zu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = dh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? Sd - qe() : (a & 4194048) === a ? Cd - qe() : 0, m = lh(d, m), m !== null) ? (Ad = a, e.cancelPendingCommit = m(df.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Kd(e, a, o, !l)) : df(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Gd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Gr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Kd(e, t, n, r) {
		t = ht(e, t), t &= ~gd, t &= ~hd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - at(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && xt(e, n, t);
	}
	function qd() {
		return ad & 6 ? !0 : (If(0, !1), !1);
	}
	function Jd() {
		if (sd !== null) {
			if (cd === 0) var e = sd.return;
			else e = sd, xa = ba = null, cs(e), so = null, co = 0, e = sd;
			for (; e !== null;) wl(e.alternate, e), e = e.return;
			sd = null;
		}
	}
	function Yd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, Op(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Ad = 0, Jd(), od = e, sd = n = Ri(e.current, null), V = t, cd = 0, H = null, ld = !1, ud = mt(e, t), dd = !1, vd = _d = gd = hd = md = pd = 0, bd = yd = null, xd = !1, fd = ht(e, t), Oi(), n;
	}
	function Xd(e, t) {
		z = null, O.H = vc, t === Za || t === $a ? (t = ao(), cd = 3) : t === Qa ? (t = ao(), cd = 4) : cd = t === Ic ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, H = t, sd === null && (pd = 1, Ac(e, Ki(t, e.current)));
	}
	function Zd() {
		var e = No.current;
		return e === null ? !0 : (V & 4194048) === V ? Po === null : (V & 62914560) === V || V & 536870912 ? e === Po : !1;
	}
	function Qd() {
		var e = O.H;
		return O.H = vc, e === null ? vc : e;
	}
	function $d() {
		var e = O.A;
		return O.A = rd, e;
	}
	function ef() {
		pd = 4, ld || (V & 4194048) !== V && No.current !== null || (ud = !0), !(md & 134217727) && !(hd & 134217727) || od === null || Kd(od, V, _d, !1);
	}
	function tf(e, t, n) {
		var r = ad;
		ad |= 2;
		var i = Qd(), a = $d();
		(od !== e || V !== t) && (Td = null, Yd(e, t)), t = !1;
		var o = pd;
		a: do
			try {
				if (cd !== 0 && sd !== null) {
					var s = sd, c = H;
					switch (cd) {
						case 8:
							Jd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							No.current === null && (t = !0);
							var l = cd;
							if (cd = 0, H = null, cf(e, s, c, l), n && ud) {
								o = 0;
								break a;
							}
							break;
						default: l = cd, cd = 0, H = null, cf(e, s, c, l);
					}
				}
				nf(), o = pd;
				break;
			} catch (t) {
				Xd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, xa = ba = null, ad = r, O.H = i, O.A = a, sd === null && (od = null, V = 0, Oi()), o;
	}
	function nf() {
		for (; sd !== null;) of(sd);
	}
	function rf(e, t) {
		var n = ad;
		ad |= 2;
		var r = Qd(), a = $d();
		od !== e || V !== t ? (Td = null, wd = qe() + 500, Yd(e, t)) : ud = mt(e, t);
		a: do
			try {
				if (cd !== 0 && sd !== null) {
					t = sd;
					var o = H;
					b: switch (cd) {
						case 1:
							cd = 0, H = null, cf(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (to(o)) {
								cd = 0, H = null, sf(t);
								break;
							}
							t = function() {
								cd !== 2 && cd !== 9 || od !== e || (cd = 7), Ff(e);
							}, o.then(t, t);
							break a;
						case 3:
							cd = 7;
							break a;
						case 4:
							cd = 5;
							break a;
						case 7:
							to(o) ? (cd = 0, H = null, sf(t)) : (cd = 0, H = null, cf(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (sd.tag) {
								case 26: s = sd.memoizedState;
								case 5:
								case 27:
									var c = sd;
									if (s ? ih(s) : c.stateNode.complete) {
										cd = 0, H = null;
										var l = c.sibling;
										if (l !== null) sd = l;
										else {
											var u = c.return;
											u === null ? sd = null : (sd = u, lf(u));
										}
										break b;
									}
							}
							cd = 0, H = null, cf(e, t, o, 5);
							break;
						case 6:
							cd = 0, H = null, cf(e, t, o, 6);
							break;
						case 8:
							Jd(), pd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				af();
				break;
			} catch (t) {
				Xd(e, t);
			}
		while (1);
		return xa = ba = null, O.H = r, O.A = a, ad = n, sd === null ? (od = null, V = 0, Oi(), pd) : 0;
	}
	function af() {
		for (; sd !== null && !Ge();) of(sd);
	}
	function of(e) {
		var t = gl(e.alternate, e, fd);
		e.memoizedProps = e.pendingProps, t === null ? lf(e) : sd = t;
	}
	function sf(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Xc(n, t, t.pendingProps, t.type, void 0, V);
				break;
			case 11:
				t = Xc(n, t, t.pendingProps, t.type.render, t.ref, V);
				break;
			case 5:
				cs(t);
				var r = t;
				r === sa && (I ? (ma(r), r.tag === 5 && r.stateNode != null && (ca = r.stateNode)) : (ma(r), I = !0));
			default: wl(n, t), t = sd = zi(t, fd), t = gl(n, t, fd);
		}
		e.memoizedProps = e.pendingProps, t === null ? lf(e) : sd = t;
	}
	function cf(e, t, n, r) {
		xa = ba = null, cs(t), so = null, co = 0;
		var i = t.return;
		try {
			if (Fc(e, i, t, n, V)) {
				pd = 1, Ac(e, Ki(n, e.current)), sd = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw sd = i, t;
			pd = 1, Ac(e, Ki(n, e.current)), sd = null;
			return;
		}
		t.flags & 32768 ? (I || r === 1 ? e = !0 : ud || V & 536870912 ? e = !1 : (ld = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = No.current, r !== null && r.tag === 13 && (r.flags |= 16384))), uf(t, e)) : lf(t);
	}
	function lf(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				uf(t, ld);
				return;
			}
			e = t.return;
			var n = Sl(t.alternate, t, fd);
			if (n !== null) {
				sd = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				sd = t;
				return;
			}
			sd = t = e;
		} while (t !== null);
		pd === 0 && (pd = 5);
	}
	function uf(e, t) {
		do {
			var n = Cl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, sd = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				sd = e;
				return;
			}
			sd = e = n;
		} while (e !== null);
		pd = 6, sd = null;
	}
	function df(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			yf();
		while (Dd !== 0);
		if (ad & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === od && (sd = od = null, V = 0), kd = t, Od = e, Ad = n, Md = a, Nd = r, ff(e, t, n, s, c, l, f);
		}
	}
	function ff(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (jd = s, s |= Di, bt(e, n, s, r, i, a), Fd = null, (n & 335544064) === n ? (Id = Ra(e), r = 10262) : (Id = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Of(Ze, function() {
			return bf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Ul = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = O.T, O.T = null, i = k.p, k.p = 2, a = ad, ad |= 4;
			try {
				vu(e, t, n);
			} finally {
				ad = a, k.p = i, O.T = r;
			}
		}
		Dd = 1, Ul ? Pd = Up(o, e.containerInfo, Id, hf, gf, mf, _f, bf, pf, null, null) : (hf(), gf(), _f());
	}
	function pf(e) {
		if (Dd !== 0) {
			var t = Od.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function mf() {
		Dd === 3 && (Dd = 0, zu(kd, Od), Dd = 4);
	}
	function hf() {
		if (Dd === 1) {
			Dd = 0;
			var e = Od, t = kd, n = Ad, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = O.T, O.T = null;
				var i = k.p;
				k.p = 2;
				var a = ad;
				ad |= 4;
				try {
					hu = gu = !1, Fu(t, e, n), n = yp;
					var o = Zr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Xr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Qr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Yr(s, h), v = Yr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					Th = !!vp, yp = vp = null;
				} finally {
					ad = a, k.p = i, O.T = r;
				}
			}
			e.current = t, Dd = 2;
		}
	}
	function gf() {
		if (Dd === 2) {
			Dd = 0;
			var e = Od, t = kd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = ad;
				ad |= 4;
				try {
					bu(e, t.alternate, t);
				} finally {
					ad = i, k.p = r, O.T = n;
				}
			}
			Dd = 3;
		}
	}
	function _f() {
		if (Dd === 4 || Dd === 3) {
			Dd = 0;
			var e = Pd;
			Pd = null, Ke();
			var t = Od, n = kd, r = Ad, i = Nd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? Dd = 5 : (Dd = 0, kd = Od = null, vf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (Ed = null), Tt(r), n = n.stateNode, rt && typeof rt.onCommitFiberRoot == "function") try {
				rt.onCommitFiberRoot(nt, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = O.T, a = k.p, k.p = 2, O.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					O.T = n, k.p = a;
				}
			}
			if (i = Fd, o = Id, Id = null, i !== null && (Fd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Ad & 3 && yf(), Ff(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Rd ? Ld++ : (Ld = 0, Rd = t) : (Ld = 0, Rd = null), If(0, !1);
		}
	}
	function vf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Fa(t)));
	}
	function yf() {
		return Pd !== null && (Pd.skipTransition(), Pd = null), hf(), gf(), _f(), bf();
	}
	function bf() {
		if (Dd !== 5) return !1;
		var e = Od, t = jd;
		jd = 0;
		var n = Tt(Ad), r = O.T, a = k.p;
		try {
			k.p = 32 > n ? 32 : n, O.T = null, n = Md, Md = null;
			var o = Od, s = Ad;
			if (Dd = 0, kd = Od = null, Ad = 0, ad & 6) throw Error(i(331));
			var c = ad;
			if (ad |= 4, ed(o.current), Ku(o, o.current, s, n), ad = c, If(0, !1), rt && typeof rt.onPostCommitFiberRoot == "function") try {
				rt.onPostCommitFiberRoot(nt, o);
			} catch {}
			return !0;
		} finally {
			k.p = a, O.T = r, vf(e, t);
		}
	}
	function xf(e, t, n) {
		t = Ki(n, t), t = Mc(e.stateNode, t, 2), e = bo(e, t, 2), e !== null && (yt(e, 2), Ff(e));
	}
	function Sf(e, t, n) {
		if (e.tag === 3) xf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				xf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ed === null || !Ed.has(r))) {
					e = Ki(n, e), n = Nc(2), r = bo(t, n, 2), r !== null && (Pc(n, r, t, e), yt(r, 2), Ff(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Cf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new id();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (dd = !0, i.add(n), e = wf.bind(null, e, t, n), t.then(e, e));
	}
	function wf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, od === e && (V & n) === n && (pd === 4 || pd === 3 && (V & 62914560) === V && 300 > qe() - Sd ? ad & 2 ? gd |= n : Yd(e, 0) : gd |= n, vd === V && (vd = 0)), Ff(e);
	}
	function Tf(e, t) {
		t === 0 && (t = _t()), e = ji(e, t), e !== null && (yt(e, t), Ff(e));
	}
	function Ef(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Tf(e, n);
	}
	function Df(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Tf(e, n);
	}
	function Of(e, t) {
		return Ue(e, t);
	}
	var kf = null, Af = null, jf = !1, Mf = !1, Nf = !1, Pf = 0;
	function Ff(e) {
		e !== Af && e.next === null && (Af === null ? kf = Af = e : Af = Af.next = e), Mf = !0, jf || (jf = !0, Hf());
	}
	function If(e, t) {
		if (!Nf && Mf) {
			Nf = !0;
			do
				for (var n = !1, r = kf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - at(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Vf(r, a));
						} else a = V, a = pt(r, r === od ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || mt(r, a) || (n = !0, Vf(r, a));
					}
					r = r.next;
				}
			while (n);
			Nf = !1;
		}
	}
	function Lf() {
		Rf();
	}
	function Rf() {
		Mf = jf = !1;
		var e = 0;
		Pf !== 0 && Ep() && (e = Pf);
		for (var t = qe(), n = null, r = kf; r !== null;) {
			var i = r.next, a = zf(r, t);
			a === 0 ? (r.next = null, n === null ? kf = i : n.next = i, i === null && (Af = n)) : (n = r, (e !== 0 || a & 3) && (Mf = !0)), r = i;
		}
		Dd !== 0 && Dd !== 5 || If(e, !1), Pf !== 0 && (Pf = 0);
	}
	function zf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - at(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = gt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = od, n = V, n = pt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (cd === 2 || cd === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && We(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || mt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && We(r), Tt(n)) {
				case 2:
				case 8:
					n = Xe;
					break;
				case 32:
					n = Ze;
					break;
				case 268435456:
					n = $e;
					break;
				default: n = Ze;
			}
			return r = Bf.bind(null, e), n = Ue(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && We(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Bf(e, t) {
		if (Dd !== 0 && Dd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (yf() && e.callbackNode !== n) return null;
		var r = V;
		return r = pt(e, e === od ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Ud(e, r, t), zf(e, qe()), e.callbackNode != null && e.callbackNode === n ? Bf.bind(null, e) : null);
	}
	function Vf(e, t) {
		if (yf()) return null;
		Ud(e, t, !0);
	}
	function Hf() {
		jp(function() {
			ad & 6 ? Ue(Ye, Lf) : Rf();
		});
	}
	function Uf() {
		if (Pf === 0) {
			var e = Va;
			e === 0 && (e = lt, lt <<= 1, !(lt & 261888) && (lt = 256)), Pf = e;
		}
		return Pf;
	}
	function Wf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : xn(e);
	}
	function Gf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Wf((i[kt] || null).action), o = r.submitter;
			o && (t = (t = o[kt] || null) ? Wf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Un("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Pf !== 0) {
								var e = new FormData(i, o);
								ic(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), ic(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Kf = 0; Kf < vi.length; Kf++) {
		var qf = vi[Kf];
		yi(qf.toLowerCase(), "on" + (qf[0].toUpperCase() + qf.slice(1)));
	}
	yi(ui, "onAnimationEnd"), yi(di, "onAnimationIteration"), yi(fi, "onAnimationStart"), yi("dblclick", "onDoubleClick"), yi("focusin", "onFocus"), yi("focusout", "onBlur"), yi(pi, "onTransitionRun"), yi(mi, "onTransitionStart"), yi(hi, "onTransitionCancel"), yi(gi, "onTransitionEnd"), Gt("onMouseEnter", ["mouseout", "mouseover"]), Gt("onMouseLeave", ["mouseout", "mouseover"]), Gt("onPointerEnter", ["pointerout", "pointerover"]), Gt("onPointerLeave", ["pointerout", "pointerover"]), Wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Wt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Jf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Yf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jf));
	function Xf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						wi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						wi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Zf(e, t) {
		var n = t[jt];
		n === void 0 && (n = t[jt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (tp(t, e, 2, !1), n.add(r));
	}
	function Qf(e, t, n) {
		var r = 0;
		t && (r |= 4), tp(n, e, r, t);
	}
	var $f = "_reactListening" + Math.random().toString(36).slice(2);
	function ep(e) {
		if (!e[$f]) {
			e[$f] = !0, Ut.forEach(function(t) {
				t !== "selectionchange" && (Yf.has(t) || Qf(t, !1, e), Qf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[$f] || (t[$f] = !0, Qf("selectionchange", !1, t));
		}
	}
	function tp(e, t, n, r) {
		switch (Mh(t)) {
			case 2:
				var i = Eh;
				break;
			case 8:
				i = Dh;
				break;
			default: i = Oh;
		}
		n = i.bind(null, t, n, e), i = void 0, !Mn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function np(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Lt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		kn(function() {
			var r = a, i = wn(n), s = [];
			a: {
				var c = _i.get(e);
				if (c !== void 0) {
					var l = Un, u = e;
					switch (e) {
						case "keypress": if (Rn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = sr;
							break;
						case "focusin":
							u = "focus", l = Qn;
							break;
						case "focusout":
							u = "blur", l = Qn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Qn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Xn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Zn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = ur;
							break;
						case ui:
						case di:
						case fi:
							l = $n;
							break;
						case gi:
							l = dr;
							break;
						case "scroll":
						case "scrollend":
							l = Gn;
							break;
						case "wheel":
							l = fr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = er;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = cr;
							break;
						case "submit":
							l = lr;
							break;
						case "toggle":
						case "beforetoggle": l = pr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = An(m, p), g != null && d.push(rp(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== Cn && (u = n.relatedTarget || n.fromElement) && (Lt(u) || u[At])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Lt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Xn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = cr, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : zt(c), h = l == null ? u : zt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Lt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? ne(c, l, ap) : null, c !== null && op(s, u, c, d, !1), l !== null && f !== null && op(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? zt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Nr;
					else if (Dr(c)) {
						if (Pr) _ = Ur;
						else {
							_ = Vr;
							var v = Br;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && vn(r.elementType) && (_ = Nr) : _ = Hr;
					if (_ &&= _(e, r)) {
						Or(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? zt(r) : window, e) {
					case "focusin":
						(Dr(v) || v.contentEditable === "true") && (ei = v, ti = r, ni = null);
						break;
					case "focusout":
						ni = ti = ei = null;
						break;
					case "mousedown":
						ri = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						ri = !1, ii(s, n, i);
						break;
					case "selectionchange": if ($r) break;
					case "keydown":
					case "keyup": ii(s, n, i);
				}
				var y;
				if (hr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else Cr ? xr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (vr && n.locale !== "ko" && (Cr || b !== "onCompositionStart" ? b === "onCompositionEnd" && Cr && (y = Ln()) : (Pn = i, Fn = "value" in Pn ? Pn.value : Pn.textContent, Cr = !0)), v = ip(r, b), 0 < v.length && (b = new tr(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = Sr(n), y !== null && (b.data = y)))), (y = _r ? wr(e, n) : Tr(e, n)) && (b = ip(r, "onBeforeInput"), 0 < b.length && (v = new tr("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Gf(s, e, r, n, i);
			}
			Xf(s, t);
		});
	}
	function rp(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function ip(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = An(e, n), i != null && r.unshift(rp(e, i, a)), i = An(e, t), i != null && r.push(rp(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function ap(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function op(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = An(n, a), l != null && o.unshift(rp(n, l, c))) : i || (l = An(n, a), l != null && o.push(rp(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var sp = /\r\n?/g, cp = /\u0000|\uFFFD/g;
	function lp(e) {
		return (typeof e == "string" ? e : "" + e).replace(sp, "\n").replace(cp, "");
	}
	function up(e, t) {
		return t = lp(t), lp(e) === t;
	}
	function dp(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || mn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && mn(e, "" + r);
				else return;
				break;
			case "className":
				$t(e, "class", r);
				break;
			case "tabIndex":
				$t(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				$t(e, n, r);
				break;
			case "style":
				_n(e, r, o);
				return;
			case "data": if (t !== "object") {
				$t(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = xn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && dp(e, t, "name", a.name, a, null), dp(e, t, "formEncType", a.formEncType, a, null), dp(e, t, "formMethod", a.formMethod, a, null), dp(e, t, "formTarget", a.formTarget, a, null)) : (dp(e, t, "encType", a.encType, a, null), dp(e, t, "method", a.method, a, null), dp(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = xn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Sn);
				return;
			case "onScroll":
				r != null && Zf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Zf("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = xn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Zf("beforetoggle", e), Zf("toggle", e), Qt(e, "popover", r);
				break;
			case "xlinkActuate":
				en(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				en(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				en(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				en(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				en(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				en(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				en(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				en(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				en(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Qt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = yn.get(n) || n, Qt(e, n, r);
			else return;
		}
		Xt = !0;
	}
	function fp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				_n(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") mn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") mn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && Zf("scroll", e);
				return;
			case "onScrollEnd":
				r != null && Zf("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = Sn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!P.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[kt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					Xt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Qt(e, n, r);
				}
				return;
		}
		Xt = !0;
	}
	function pp(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Zf("error", e), Zf("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: dp(e, t, o, s, n, null);
					}
				}
				a && dp(e, t, "srcSet", n.srcSet, n, null), r && dp(e, t, "src", n.src, n, null);
				return;
			case "input":
				Zf("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: dp(e, t, r, d, n, null);
					}
				}
				un(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Zf("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: dp(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && F(e, !!r, n, !0) : F(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Zf("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: dp(e, t, s, c, n, null);
				}
				pn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: dp(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Zf("beforetoggle", e), Zf("toggle", e), Zf("cancel", e), Zf("close", e);
				break;
			case "iframe":
			case "object":
				Zf("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Jf.length; r++) Zf(Jf[r], e);
				break;
			case "image":
				Zf("error", e), Zf("load", e);
				break;
			case "details":
				Zf("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Zf("error", e), Zf("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: dp(e, t, u, r, n, null);
				}
				return;
			default: if (vn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && fp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && dp(e, t, c, r, n, null));
	}
	var mp = {};
	function hp(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || dp(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (Xt = !0), o = m;
							break;
						case "name":
							m !== f && (Xt = !0), a = m;
							break;
						case "checked":
							m !== f && (Xt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (Xt = !0), d = m;
							break;
						case "value":
							m !== f && (Xt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (Xt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && dp(e, t, p, m, r, f);
					}
				}
				ln(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || dp(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Xt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Xt = !0), c = o;
						break;
					case "multiple": o !== l && (Xt = !0), s = o;
					default: o !== l && dp(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? F(e, !!n, n ? [] : "", !1) : F(e, !!n, t, !0)) : F(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: dp(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (Xt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (Xt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && dp(e, t, s, a, r, o);
				}
				fn(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: dp(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (Xt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: dp(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && dp(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: dp(e, t, u, p, r, m);
				}
				return;
			default: if (vn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && fp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || fp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && dp(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || dp(e, t, f, p, r, m);
	}
	function gp(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function _p() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && gp(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && gp(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var vp = null, yp = null;
	function bp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function xp(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Sp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Cp(e, t, n, r) {
		return n = bp(n).createElement(e), n[Ot] = r, n[kt] = t, pp(n, e, t), Vt(n), n;
	}
	function wp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Tp = null;
	function Ep() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Tp && (Tp = e, !0) : (Tp = null, !1);
	}
	var Dp = typeof setTimeout == "function" ? setTimeout : void 0, Op = typeof clearTimeout == "function" ? clearTimeout : void 0, kp = typeof Promise == "function" ? Promise : void 0, Ap = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Dp, jp = typeof queueMicrotask == "function" ? queueMicrotask : kp === void 0 ? Dp : function(e) {
		return kp.resolve(null).then(e).catch(Mp);
	};
	function Mp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Np(e) {
		return e === "head";
	}
	function Pp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Zh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") Dm(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, Dm(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Ft] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && Dm(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Zh(t);
	}
	function Fp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Ip(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Lp(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Rp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function zp(e) {
		return Rp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function Bp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Rp(t, n, e);
	}
	function Vp(e) {
		return e.documentElement.clientHeight;
	}
	function Hp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Up(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Vp(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += ah(f), u > ch) {
									s.length = o;
									break;
								}
								f = new Promise(Hp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Wp(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Wp.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : w({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Wp.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Wp.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Gp(e) {
		return {
			name: e,
			group: new Wp("group", e),
			imagePair: new Wp("image-pair", e),
			old: new Wp("old", e),
			new: new Wp("new", e)
		};
	}
	function Kp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Kp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Zp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Yp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), p(this._fragmentFiber.child, !1, qp, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function qp(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Kp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Zp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Yp(i.optionsOrUseCapture), p(this._fragmentFiber.child, !1, Jp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Jp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Yp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function Xp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Zp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = Xp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && Xp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Kp.prototype.dispatchEvent = function(e) {
		var t = h(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Yp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Yp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Kp.prototype.focus = function(e) {
		p(this._fragmentFiber.child, !0, Qp, e, void 0, void 0);
	};
	function Qp(e, t) {
		return e.tag !== 6 && (e = b(e), Cm(e, t));
	}
	Kp.prototype.focusLast = function(e) {
		var t = [];
		p(this._fragmentFiber.child, !0, $p, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Qp(t[n], e); n--);
	};
	function $p(e, t) {
		return t.push(e), !1;
	}
	Kp.prototype.blur = function() {
		var e = h(this._fragmentFiber);
		e !== null && (e = b(e), e = bp(e).activeElement, e !== null && p(this._fragmentFiber.child, !1, em, e, void 0, void 0));
	};
	function em(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Kp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), p(this._fragmentFiber.child, !1, tm, e, void 0, void 0);
	};
	function tm(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Kp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), p(this._fragmentFiber.child, !1, nm, e, void 0, void 0);
			for (var n = t = 0; n < rm.length; n++) {
				var r = rm[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : rm[t++] = r;
			}
			rm.length = t;
		}
	};
	function nm(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var rm = [], im = !1;
	function am(e, t, n) {
		rm.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), im || (im = !0, wm(function() {
			im = !1;
			var e = rm;
			rm = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Kp.prototype.getClientRects = function() {
		var e = [];
		return p(this._fragmentFiber.child, !1, om, e, void 0, void 0), e;
	};
	function om(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Kp.prototype.getRootNode = function(e) {
		var t = h(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Kp.prototype.compareDocumentPosition = function(e) {
		var t = h(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		p(this._fragmentFiber.child, !1, $p, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, g(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = g(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || sm(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function sm(e, t, n, r, i) {
		var a = Lt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = h(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = ne(n, a, C), t === null ? t = !1 : (p(t, !0, te, a, n), a = x, x = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = ne(r, a, C), t === null ? t = !1 : (p(t, !0, S, a, r), a = x, ee = x = null, t = a !== null)), t) : !1;
	}
	function cm(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Kp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		p(this._fragmentFiber.child, !1, $p, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || h(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), cm(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), cm(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function lm(e, t) {
		return e = b(e), um(e, t), !1;
	}
	function um(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function dm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Yp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < rm.length; i++) {
				var a = rm[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (rm[r++] = a);
			}
			rm.length = r, n.observe(e);
		}), um(e, t));
	}
	function fm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Yp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? am(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function pm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					pm(n), N(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function mm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Ft]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = bm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function hm(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = bm(e.nextSibling), e === null)) return null;
		return e;
	}
	function gm(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = bm(e.nextSibling), e === null)) return null;
		return e;
	}
	function _m(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function vm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function ym(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function bm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var xm = null;
	function U(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return bm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Sm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function Cm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function wm(e) {
		Ap(function() {
			Ap(function(t) {
				return e(t);
			});
		});
	}
	function Tm(e, t, n) {
		switch (t = bp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function Em(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && dp(e, t, r, null, mp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Sn && (e.onclick = null), N(e);
	}
	function Dm(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		N(e);
	}
	var Om = /* @__PURE__ */ new Map(), km = /* @__PURE__ */ new Set();
	function Am(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var jm = k.d;
	k.d = {
		f: Mm,
		r: Nm,
		D: Im,
		C: Lm,
		L: Rm,
		m: zm,
		X: Vm,
		S: Bm,
		M: Hm
	};
	function Mm() {
		var e = jm.f(), t = qd();
		return e || t;
	}
	function Nm(e) {
		var t = Rt(e);
		t !== null && t.tag === 5 && t.type === "form" ? oc(t) : jm.r(e);
	}
	var Pm = typeof document > "u" ? null : document;
	function Fm(e, t, n) {
		var r = Pm;
		if (r && typeof t == "string" && t) {
			var i = cn(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), km.has(i) || (km.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), pp(t, "link", e), Vt(t), r.head.appendChild(t)));
		}
	}
	function Im(e) {
		jm.D(e), Fm("dns-prefetch", e, null);
	}
	function Lm(e, t) {
		jm.C(e, t), Fm("preconnect", e, t);
	}
	function Rm(e, t, n) {
		jm.L(e, t, n);
		var r = Pm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + cn(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + cn(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + cn(n.imageSizes) + "\"]")) : i += "[href=\"" + cn(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Um(e);
					break;
				case "script": a = qm(e);
			}
			if (!(Om.has(a) || (e = w({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Om.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Wm(a)) || t === "script" && r.querySelector(Jm(a))))) {
				var o = r.createElement("link");
				pp(o, "link", e), t === "style" && (o[It] = !0, o.onload = o.onerror = function() {
					Ht(o);
				}), Vt(o), r.head.appendChild(o);
			}
		}
	}
	function zm(e, t) {
		jm.m(e, t);
		var n = Pm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + cn(r) + "\"][href=\"" + cn(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = qm(e);
			}
			if (!Om.has(a) && (e = w({
				rel: "modulepreload",
				href: e
			}, t), Om.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Jm(a))) return;
				}
				r = n.createElement("link"), pp(r, "link", e), Vt(r), n.head.appendChild(r);
			}
		}
	}
	function Bm(e, t, n) {
		jm.S(e, t, n);
		var r = Pm;
		if (r && e) {
			var i = Bt(r).hoistableStyles, a = Um(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Wm(a))) s.loading = 5;
				else {
					e = w({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Om.get(a)) && Zm(e, n);
					var c = o = r.createElement("link");
					Vt(c), pp(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Xm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Vm(e, t) {
		jm.X(e, t);
		var n = Pm;
		if (n && e) {
			var r = Bt(n).hoistableScripts, i = qm(e), a = r.get(i);
			a || (a = n.querySelector(Jm(i)), a || (e = w({
				src: e,
				async: !0
			}, t), (t = Om.get(i)) && Qm(e, t), a = n.createElement("script"), Vt(a), pp(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Hm(e, t) {
		jm.M(e, t);
		var n = Pm;
		if (n && e) {
			var r = Bt(n).hoistableScripts, i = qm(e), a = r.get(i);
			a || (a = n.querySelector(Jm(i)), a || (e = w({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Om.get(i)) && Qm(e, t), a = n.createElement("script"), Vt(a), pp(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function W(e, t, n, r) {
		var a = (a = Ae.current) ? Am(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Um(n.href), t = Bt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Um(n.href);
					var o = Bt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Wm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = Om.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Om.set(e, o)), Km(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = qm(n), t = Bt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Um(e) {
		return "href=\"" + cn(e) + "\"";
	}
	function Wm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Gm(e) {
		return w({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Km(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[It]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[It] = !0, t.onload = t.onerror = Ht.bind(null, t), pp(t, "link", n), Vt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function qm(e) {
		return "[src=\"" + cn(e) + "\"]";
	}
	function Jm(e) {
		return "script[async]" + e;
	}
	function Ym(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + cn(n.href) + "\"]");
				if (r) return t.instance = r, Vt(r), r;
				var a = w({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Vt(r), pp(r, "style", a), Xm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Um(n.href);
				var o = e.querySelector(Wm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Vt(o), o;
				r = Gm(n), (a = Om.get(a)) && Zm(r, a), o = (e.ownerDocument || e).createElement("link"), Vt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), pp(o, "link", r), t.state.loading |= 4, Xm(o, n.precedence, e), t.instance = o;
			case "script": return o = qm(n.src), (a = e.querySelector(Jm(o))) ? (t.instance = a, Vt(a), a) : (r = n, (a = Om.get(o)) && (r = w({}, n), Qm(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Vt(a), pp(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Xm(r, n.precedence, e));
		return t.instance;
	}
	function Xm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Zm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Qm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var $m = null;
	function eh(e, t, n) {
		if ($m === null) {
			var r = /* @__PURE__ */ new Map(), i = $m = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = $m, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Ft] || a[Ot] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function th(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function nh(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function rh(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function ih(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function ah(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function oh(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += ah(t), e.suspenseyImages.push(t)), e = fh.bind(e), t.decode().then(e, e));
	}
	function sh(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Um(r.href), a = t.querySelector(Wm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = dh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Vt(a);
					return;
				}
				a = t.ownerDocument || t, r = Gm(r), (i = Om.get(i)) && Zm(r, i), a = a.createElement("link"), Vt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), pp(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = dh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var ch = 0;
	function lh(e, t) {
		return e.stylesheets && e.count === 0 && mh(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && mh(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && ch === 0 && (ch = 62500 * _p());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && mh(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > ch ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function uh(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) mh(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function dh() {
		this.count--, uh(this);
	}
	function fh() {
		this.imgCount--, uh(this);
	}
	var ph = null;
	function mh(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ph = /* @__PURE__ */ new Map(), t.forEach(hh, e), ph = null, dh.call(e));
	}
	function hh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ph.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ph.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = dh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var gh = {
		$$typeof: le,
		Provider: null,
		Consumer: null,
		_currentValue: Ce,
		_currentValue2: Ce,
		_threadCount: 0
	};
	function _h(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = vt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = vt(0), this.hiddenUpdates = vt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function vh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new _h(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Ii(3, null, null, t), e.current = a, a.stateNode = e, t = R(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, _o(a), e;
	}
	function yh(e) {
		return e ? (e = Pi, e) : Pi;
	}
	function bh(e, t, n, r, i, a) {
		i = yh(i), r.context === null ? r.context = i : r.pendingContext = i, r = yo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = bo(e, r, t), n !== null && (Hd(n, e, t), xo(n, e, t));
	}
	function xh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function Sh(e, t) {
		xh(e, t), (e = e.alternate) && xh(e, t);
	}
	function Ch(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ji(e, 67108864);
			t !== null && Hd(t, e, 67108864), Sh(e, 67108864);
		}
	}
	function wh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = zd();
			t = wt(t);
			var n = ji(e, t);
			n !== null && Hd(n, e, t), Sh(e, t);
		}
	}
	var Th = !0;
	function Eh(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 2, Oh(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function Dh(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 8, Oh(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function Oh(e, t, n, r) {
		if (Th) {
			var i = kh(r);
			if (i === null) np(e, t, r, Ah, n), Vh(e, r);
			else if (Uh(i, e, t, n, r)) r.stopPropagation();
			else if (Vh(e, r), t & 4 && -1 < Bh.indexOf(e)) {
				for (; i !== null;) {
					var a = Rt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = ft(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - at(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Ff(a), !(ad & 6) && (wd = qe() + 500, If(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ji(a, 2), s !== null && Hd(s, a, 2), qd(), Sh(a, 2);
					}
					if (a = kh(r), a === null && np(e, t, r, Ah, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else np(e, t, r, null, n);
		}
	}
	function kh(e) {
		return e = wn(e), jh(e);
	}
	var Ah = null;
	function jh(e) {
		if (Ah = null, e = Lt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return Ah = e, null;
	}
	function Mh(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Je()) {
				case Ye: return 2;
				case Xe: return 8;
				case Ze:
				case Qe: return 32;
				case $e: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Nh = !1, Ph = null, Fh = null, Ih = null, Lh = /* @__PURE__ */ new Map(), Rh = /* @__PURE__ */ new Map(), zh = [], Bh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Vh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Ph = null;
				break;
			case "dragenter":
			case "dragleave":
				Fh = null;
				break;
			case "mouseover":
			case "mouseout":
				Ih = null;
				break;
			case "pointerover":
			case "pointerout":
				Lh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Rh.delete(t.pointerId);
		}
	}
	function Hh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Rt(t), t !== null && Ch(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Uh(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Ph = Hh(Ph, e, t, n, r, i), !0;
			case "dragenter": return Fh = Hh(Fh, e, t, n, r, i), !0;
			case "mouseover": return Ih = Hh(Ih, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Lh.set(a, Hh(Lh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Rh.set(a, Hh(Rh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Wh(e) {
		var t = Lt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Et(e.priority, function() {
							wh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Et(e.priority, function() {
							wh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Gh(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = kh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Cn = r, n.target.dispatchEvent(r), Cn = null;
			} else return t = Rt(n), t !== null && Ch(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Kh(e, t, n) {
		Gh(e) && n.delete(t);
	}
	function qh() {
		Nh = !1, Ph !== null && Gh(Ph) && (Ph = null), Fh !== null && Gh(Fh) && (Fh = null), Ih !== null && Gh(Ih) && (Ih = null), Lh.forEach(Kh), Rh.forEach(Kh);
	}
	function Jh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Nh || (Nh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, qh)));
	}
	var Yh = null;
	function Xh(e) {
		Yh !== e && (Yh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Yh === e && (Yh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (jh(r || n) === null) continue;
					break;
				}
				var a = Rt(n);
				a !== null && (e.splice(t, 3), t -= 3, ic(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Zh(e) {
		function t(t) {
			return Jh(t, e);
		}
		Ph !== null && Jh(Ph, e), Fh !== null && Jh(Fh, e), Ih !== null && Jh(Ih, e), Lh.forEach(t), Rh.forEach(t);
		for (var n = 0; n < zh.length; n++) {
			var r = zh[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < zh.length && (n = zh[0], n.blockedOn === null);) Wh(n), n.blockedOn === null && zh.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[kt] || null;
			if (typeof a == "function") o || Xh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[kt] || null) s = o.formAction;
					else if (jh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Xh(n);
			}
		}
	}
	function Qh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function $h(e) {
		this._internalRoot = e;
	}
	eg.prototype.render = $h.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		bh(n, zd(), e, t, null, null);
	}, eg.prototype.unmount = $h.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			bh(e.current, 2, null, e, null, null), qd(), t[At] = null;
		}
	};
	function eg(e) {
		this._internalRoot = e;
	}
	eg.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = M();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < zh.length && t !== 0 && t < zh[n].priority; n++);
			zh.splice(n, 0, e), n === 0 && Wh(e);
		}
	};
	var tg = n.version;
	if (tg !== "19.3.1") throw Error(i(527, tg, "19.3.1"));
	k.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var ng = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: O,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var rg = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!rg.isDisabled && rg.supportsFiber) try {
			nt = rg.inject(ng), rt = rg;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Dc, s = Oc, c = kc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = vh(e, 1, !1, null, null, n, r, null, o, s, c, Qh), e[At] = t.current, ep(e), new $h(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = Dc, c = Oc, l = kc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = vh(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Qh), t.context = yh(null), n = t.current, r = zd(), r = wt(r), o = yo(r), o.callback = null, bo(n, o, r), n = r, t.current.lanes = n, yt(t, n), Ff(t), e[At] = t.current, ep(e), new eg(t);
	}, e.version = "19.3.1";
})), y = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Hm(e) ? e.slice() : U({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function r(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return i(e, t, n, 0);
			}
		}
		function i(e, t, n, r) {
			var a = t[r], o = Hm(e) ? e.slice() : U({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[a], Hm(o) ? o.splice(a, 1) : delete o[a]) : o[a] = i(e[a], t, n, r + 1), o;
		}
		function a(e, t, n) {
			var r = t[n], i = Hm(e) ? e.slice() : U({}, e);
			return n + 1 === t.length ? (Hm(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = a(e[r], t, n + 1), i);
		}
		function o() {
			return !1;
		}
		function s() {
			return null;
		}
		function c() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function l() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function u() {}
		function f() {}
		function p(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function h(e, t, n, r) {
			return new Mr(e, t, n, r);
		}
		function g(e, t) {
			e.context === Iv && (Gp(e.current, 2, t, e, null, null), ru());
		}
		function v(e, t) {
			if (Lv !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Pu(), jr(e.current, t, n), ru();
			}
		}
		function y(e) {
			Lv = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function x(e) {
			for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
			for (; t.return;) t = t.return;
			return t.tag === 3 ? e : null;
		}
		function ee(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function S(e) {
			if (x(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function C(e) {
			var t = e.alternate;
			if (!t) {
				if (t = x(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return S(i), e;
						if (a === r) return S(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function ne(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = ne(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function w(e, t, n, r, i) {
			T(e.child, !1, t, n, r, i);
		}
		function T(e, t, n, r, i, a) {
			for (; e !== null;) {
				if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && T(e.child, t, n, r, i, a)) return !0;
				e = e.sibling;
			}
			return !1;
		}
		function re(e) {
			for (e = e.return; e !== null;) {
				if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
				e = e.return;
			}
			return null;
		}
		function ie(e) {
			var t = !1;
			for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
			return t;
		}
		function ae(e) {
			var t = [null, null], n = re(e);
			return n === null || oe(t, e, n.child, { foundSelf: !1 }), t;
		}
		function oe(e, t, n, r) {
			for (; n !== null;) {
				if (n === t) r.foundSelf = !0;
				else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
					if (r.foundSelf) return e[1] = n, !0;
					e[0] = n;
				} else if ((n.tag !== 22 || n.memoizedState === null) && oe(e, t, n.child, r)) return !0;
				n = n.sibling;
			}
			return !1;
		}
		function se(e) {
			switch (e.tag) {
				case 5:
				case 27:
				case 6: return e.stateNode;
				case 3: return e.stateNode.containerInfo;
				default: throw Error("Expected to find a host node. This is a bug in React.");
			}
		}
		function ce(e, t, n) {
			return e === n || e === t && (bm = e, !0);
		}
		function le(e, t, n) {
			return e === n ? (xm = e, !1) : e === t && (xm !== null && (bm = e), !0);
		}
		function E(e) {
			if (e === null) return null;
			do
				e = e === null ? null : e.return;
			while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
			return e || null;
		}
		function ue(e, t, n) {
			for (var r = 0, i = e; i; i = n(i)) r++;
			i = 0;
			for (var a = t; a; a = n(a)) i++;
			for (; 0 < r - i;) e = n(e), r--;
			for (; 0 < i - r;) t = n(t), i--;
			for (; r--;) {
				if (e === t || t !== null && e === t.alternate) return e;
				e = n(e), t = n(t);
			}
			return null;
		}
		function de(e) {
			return typeof e != "object" || !e ? null : (e = Bm && e[Bm] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function fe(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Vm ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Tm: return "Fragment";
				case Dm: return "Profiler";
				case Em: return "StrictMode";
				case jm: return "Suspense";
				case Mm: return "SuspenseList";
				case Fm: return "Activity";
				case Rm: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case wm: return "Portal";
				case km: return e.displayName || "Context";
				case Om: return (e._context.displayName || "Context") + ".Consumer";
				case Am:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Nm: return t = e.displayName || null, t === null ? fe(e.type) || "Memo" : t;
				case Pm:
					t = e._payload, e = e._init;
					try {
						return fe(e(t));
					} catch {}
			}
			return null;
		}
		function pe(e) {
			return typeof e.tag == "number" ? D(e) : typeof e.name == "string" ? e.name : null;
		}
		function D(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return fe(t);
				case 8: return t === Em ? "StrictMode" : "Mode";
				case 22:
					if (e.return !== null) return D(e.return);
					break;
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 30: return "ViewTransition";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return D(e.return);
			}
			return null;
		}
		function me(e) {
			return { current: e };
		}
		function he(e, t) {
			0 > qm ? console.error("Unexpected pop.") : (t !== Km[qm] && console.error("Unexpected Fiber popped."), e.current = Gm[qm], Gm[qm] = null, Km[qm] = null, qm--);
		}
		function ge(e, t, n) {
			qm++, Gm[qm] = e.current, Km[qm] = n, e.current = t;
		}
		function _e(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function ve(e, t) {
			ge(Xm, t, e), ge(Ym, e, e), ge(Jm, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Ud(t) : _T;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Ud(t), t = Wd(t, n);
				else switch (n) {
					case "svg":
						t = vT;
						break;
					case "math":
						t = yT;
						break;
					default: t = _T;
				}
			}
			n = n.toLowerCase(), n = Qt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, he(Jm, e), ge(Jm, n, e);
		}
		function ye(e) {
			he(Jm, e), he(Ym, e), he(Xm, e);
		}
		function be() {
			return _e(Jm.current);
		}
		function xe(e) {
			var t = e.memoizedState;
			t !== null && ($T._currentValue = t.memoizedState, ge(Zm, e, e)), t = _e(Jm.current);
			var n = e.type, r = Wd(t.context, n);
			n = Qt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (ge(Ym, e, e), ge(Jm, r, e));
		}
		function Se(e) {
			Ym.current === e && (he(Jm, e), he(Ym, e)), Zm.current === e && (he(Zm, e), $T._currentValue = QT);
		}
		function O() {}
		function k() {
			if (Qm === 0) {
				$m = console.log, eh = console.info, th = console.warn, nh = console.error, rh = console.group, ih = console.groupCollapsed, ah = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: O,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			Qm++;
		}
		function Ce() {
			if (Qm--, Qm === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: U({}, e, { value: $m }),
					info: U({}, e, { value: eh }),
					warn: U({}, e, { value: th }),
					error: U({}, e, { value: nh }),
					group: U({}, e, { value: rh }),
					groupCollapsed: U({}, e, { value: ih }),
					groupEnd: U({}, e, { value: ah })
				});
			}
			0 > Qm && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function we(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function Te(e) {
			if (oh === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				oh = t && t[1] || "", sh = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + oh + e + sh;
		}
		function Ee(e, t) {
			if (!e || ch) return "";
			var n = lh.get(e);
			if (n !== void 0) return n;
			ch = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = W.H, W.H = null, k();
			try {
				var i = { DetermineComponentFrameRoot: function() {
					try {
						if (t) {
							var n = function() {
								throw Error();
							};
							if (Object.defineProperty(n.prototype, "props", { set: function() {
								throw Error();
							} }), typeof Reflect == "object" && Reflect.construct) {
								try {
									Reflect.construct(n, []);
								} catch (e) {
									var r = e;
								}
								Reflect.construct(e, [], n);
							} else {
								try {
									n.call();
								} catch (e) {
									r = e;
								}
								n = !1;
								try {
									var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
									Object.defineProperty(e.prototype, "props", {
										configurable: !0,
										set: function() {
											throw Error();
										}
									}), n = !0, new e();
								} finally {
									n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
								}
							}
						} else {
							try {
								throw Error();
							} catch (e) {
								r = e;
							}
							(n = e()) && typeof n.catch == "function" && n.catch(function() {});
						}
					} catch (e) {
						if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
					}
					return [null, null];
				} };
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && lh.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				ch = !1, W.H = r, Ce(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? Te(l) : "", typeof e == "function" && lh.set(e, l), l;
		}
		function De(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return Te(e.type);
				case 16: return Te("Lazy");
				case 13: return e.child !== t && t !== null ? Te("Suspense Fallback") : Te("Suspense");
				case 19: return Te("SuspenseList");
				case 0:
				case 15: return Ee(e.type, !1);
				case 11: return Ee(e.type.render, !1);
				case 1: return Ee(e.type, !0);
				case 31: return Te("Activity");
				case 30: return Te("ViewTransition");
				default: return "";
			}
		}
		function Oe(e) {
			try {
				var t = "", n = null;
				do {
					t += De(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = we(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = Te(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function A(e) {
			return (e = e ? e.displayName || e.name : "") ? Te(e) : "";
		}
		function ke() {
			if (uh === null) return null;
			var e = uh._debugOwner;
			return e == null ? null : pe(e);
		}
		function Ae() {
			if (uh === null) return "";
			var e = uh;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += Te(e.type);
						break;
					case 13:
						t += Te("Suspense");
						break;
					case 19:
						t += Te("SuspenseList");
						break;
					case 31:
						t += Te("Activity");
						break;
					case 30:
						t += Te("ViewTransition");
						break;
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += A(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += A(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = we(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + we(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function j(e, t, n, r, i, a, o) {
			var s = uh;
			je(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				je(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function je(e) {
			W.getCurrentStack = e === null ? null : Ae, dh = !1, uh = e;
		}
		function Me(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Ne(e) {
			try {
				return Pe(e), !1;
			} catch {
				return !0;
			}
		}
		function Pe(e) {
			return "" + e;
		}
		function Fe(e, t) {
			if (Ne(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Me(e)), Pe(e);
		}
		function Ie(e, t) {
			if (Ne(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Me(e)), Pe(e);
		}
		function Le(e) {
			if (Ne(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Me(e)), Pe(e);
		}
		function Re(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				Eh = t.inject(e), Dh = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function ze(e) {
			if (typeof wh == "function" && Th(e), Dh && typeof Dh.setStrictMode == "function") try {
				Dh.setStrictMode(Eh, e);
			} catch (e) {
				Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function Be(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (jh(e) / Mh | 0) | 0;
		}
		function Ve(e) {
			var t = e & 42;
			if (t !== 0) return t;
			switch (e & -e) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64: return 64;
				case 128: return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072: return e & -e;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return e & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return e & 62914560;
				case 67108864: return 67108864;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 0;
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function He(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ve(n))) : i = Ve(o) : i = Ve(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ve(n))) : i = Ve(o)) : i = Ve(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Ue(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function We(e, t) {
			t & 8 && (t |= t & 32);
			var n = e.entangledLanes;
			if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
				var r = 31 - Ah(n), i = 1 << r;
				t |= e[r], n &= ~i;
			}
			return t;
		}
		function Ge(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64: return t + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return t + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Ke() {
			var e = Fh;
			return Fh <<= 1, !(Fh & 62914560) && (Fh = 4194304), e;
		}
		function qe(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Je(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Ye(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Ah(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && Xe(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function Xe(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Ah(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Ze(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Ah(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Qe(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : $e(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function $e(e) {
			switch (e) {
				case 2:
					e = 1;
					break;
				case 8:
					e = 4;
					break;
				case 32:
					e = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					e = 128;
					break;
				case 268435456:
					e = 134217728;
					break;
				default: e = 0;
			}
			return e;
		}
		function et(e, t, n) {
			if (kh) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Ah(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function tt(e, t) {
			if (kh) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Ah(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function nt(e) {
			return e &= -e, Ih !== 0 && Ih < e ? Lh !== 0 && Lh < e ? e & 134217727 ? Rh : zh : Lh : Ih;
		}
		function rt() {
			var e = Um.p;
			return e === 0 ? (e = window.event, e === void 0 ? Rh : nm(e.type)) : e;
		}
		function it(e, t) {
			var n = Um.p;
			try {
				return Um.p = e, t();
			} finally {
				Um.p = n;
			}
		}
		function at(e) {
			delete e[Vh], delete e[Hh], delete e[Gh], delete e[Kh];
		}
		function ot(e) {
			var t;
			if (t = e[Vh]) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Uh] || n[Vh]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ip(e); e !== null;) {
						if (n = e[Vh]) return n;
						e = ip(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function st(e) {
			if (e = e[Vh] || e[Uh]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function ct(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function lt(e) {
			var t = e[qh];
			return t ||= e[qh] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function ut(e) {
			e[Jh] = !0;
		}
		function dt(e) {
			e[Yh] = void 0;
		}
		function ft(e, t) {
			pt(e, t), pt(e + "Capture", t);
		}
		function pt(e, t) {
			Zh[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Zh[e] = t;
			var n = e.toLowerCase();
			for (Qh[n] = e, e === "onDoubleClick" && (Qh.ondblclick = e), e = 0; e < t.length; e++) Xh.add(t[e]);
		}
		function mt(e, t) {
			$h[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function ht(e) {
			return fh.call(ng, e) ? !0 : fh.call(tg, e) ? !1 : eg.test(e) ? ng[e] = !0 : (tg[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function gt() {
			var e = rg;
			return rg = !1, e;
		}
		function _t(e, t, n) {
			if (ht(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = t.toLowerCase() === "nonce" ? e.nonce : e.getAttribute(t), e === "" && !0 === n || (Fe(n, t), e === "" + n ? n : e);
			}
		}
		function vt(e, t, n) {
			if (ht(t)) {
				if (n === null) e.removeAttribute(t);
				else {
					switch (typeof n) {
						case "undefined":
						case "function":
						case "symbol":
							e.removeAttribute(t);
							return;
						case "boolean":
							var r = t.toLowerCase().slice(0, 5);
							if (r !== "data-" && r !== "aria-") {
								e.removeAttribute(t);
								return;
							}
					}
					Fe(n, t), e.setAttribute(t, n);
				}
			}
		}
		function yt(e, t, n) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(t);
						return;
				}
				Fe(n, t), e.setAttribute(t, n);
			}
		}
		function bt(e, t, n, r) {
			if (r === null) e.removeAttribute(n);
			else {
				switch (typeof r) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(n);
						return;
				}
				Fe(r, n), e.setAttributeNS(t, n, r);
			}
		}
		function xt(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Le(e), e;
				default: return "";
			}
		}
		function St(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function Ct(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Le(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Le(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function wt(e) {
			if (!e._valueTracker) {
				var t = St(e) ? "checked" : "value";
				e._valueTracker = Ct(e, t, "" + e[t]);
			}
		}
		function Tt(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = St(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
		}
		function M(e) {
			return e.replace(ig, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function Et(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || og || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", ke() || "A component", t.type), og = !0), t.value === void 0 || t.defaultValue === void 0 || ag || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", ke() || "A component", t.type), ag = !0);
		}
		function Dt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (Fe(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + xt(t)) : e.value !== "" + xt(t) && (e.value = "" + xt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : kt(e, xt(n)) : o === "number" && e.value == t ? kt(e, xt(e.value)) : kt(e, xt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (Fe(s, "name"), e.name = "" + xt(s)) : e.removeAttribute("name");
		}
		function Ot(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (Fe(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					wt(e);
					return;
				}
				n = n == null ? "" : "" + xt(n), t = t == null ? n : "" + xt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (Fe(o, "name"), e.name = o), wt(e);
		}
		function kt(e, t) {
			e.defaultValue !== "" + t && (e.defaultValue = "" + t);
		}
		function At(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? vm.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || cg || (cg = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || lg || (lg = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || sg || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), sg = !0);
		}
		function jt() {
			var e = ke();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function Mt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + xt(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function Nt(e, t) {
			for (e = 0; e < dg.length; e++) {
				var n = dg[e];
				if (t[n] != null) {
					var r = Hm(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, jt()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, jt());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || ug || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), ug = !0);
		}
		function Pt(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || fg || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", ke() || "A component"), fg = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function Ft(e, t, n) {
			t != null && (t = "" + xt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + xt(n);
		}
		function It(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (Hm(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = xt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), wt(e);
		}
		function N(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? N(e.children[0], t) : e;
		}
		function Lt(e) {
			return "  " + "  ".repeat(e);
		}
		function Rt(e) {
			return "+ " + "  ".repeat(e);
		}
		function zt(e) {
			return "- " + "  ".repeat(e);
		}
		function Bt(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function Vt(e, t) {
			return pg.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Ht(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return Rt(n) + Vt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), Rt(n) + Vt(e, r) + "\n" + zt(n) + Vt(t, r) + "\n";
			}
			return Lt(n) + Vt(e, r) + "\n";
		}
		function Ut(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function P(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Hm(e)) return "[...]";
					if (e.$$typeof === Cm) return (t = fe(e.type)) ? "<" + t + ">" : "<...>";
					var n = Ut(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = P(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function Wt(e, t) {
			return typeof e != "string" || pg.test(e) ? "{" + P(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Gt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Wt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Kt(e, t, n) {
			var r = "", i = U({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = P(e[a], o);
				t.hasOwnProperty(a) ? (o = P(t[a], o), r += Rt(n) + a + ": " + s + "\n", r += zt(n) + a + ": " + o + "\n") : r += Rt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = P(i[c], 120 - 2 * n - c.length - 2), r += zt(n) + c + ": " + e + "\n");
			return r;
		}
		function qt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Gt(e, t, Lt(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Wt(l, s);
						s = Wt(c, s), typeof l == "object" && l && typeof c == "object" && c && Ut(l) === "Object" && Ut(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Lt(r + 1) + o + "={{\n" + Kt(l, c, r + 2) + Lt(r + 1) + "}}\n" : (i += Rt(r + 1) + o + "=" + u + "\n", i += zt(r + 1) + o + "=" + s + "\n");
					} else i += Lt(r + 1) + o + "=" + Wt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += zt(r + 1) + e + "=" + Wt(n[e], t) + "\n";
					}
				}), i = i === "" ? Lt(r) + "<" + e + ">\n" : Lt(r) + "<" + e + "\n" + i + Lt(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Ht(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Ht("" + t, null, r + 1) : i + Ht("" + t, void 0, r + 1)), i;
		}
		function Jt(e, t) {
			var n = Bt(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Jt(e, t), e = e.sibling;
				return n;
			}
			return Lt(t) + "<" + n + ">\n";
		}
		function Yt(e, t) {
			var n = N(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Lt(t) + "...\n" + Yt(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Lt(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Ht(i, e.serverProps, t), t++;
			else if (a = Bt(e.fiber), a !== null) {
				if (e.serverProps === void 0) {
					r = t;
					var o = 120 - 2 * r - a.length - 2, s = "";
					for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
						var c = Wt(i[l], 15);
						if (o -= l.length + c.length + 2, 0 > o) {
							s += " ...";
							break;
						}
						s += " " + l + "=" + c;
					}
					r = Lt(r) + "<" + a + s + ">\n", t++;
				} else e.serverProps === null ? (r = Gt(a, i, Rt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = qt(a, i, e.serverProps, t), t++);
			}
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += Yt(o, t), a++) : l += Jt(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Lt(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (zt(t) + Vt(a, 120 - 2 * t) + "\n") : l + Gt(a.type, a.props, zt(t));
			return n + r + l;
		}
		function Xt(e) {
			try {
				return "\n\n" + Yt(e, 0);
			} catch {
				return "";
			}
		}
		function Zt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Xt(i).replaceAll(/^[+-]/gm, ">");
		}
		function Qt(e, t) {
			var n = U({}, e || vg), r = { tag: t };
			return hg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), gg.indexOf(t) !== -1 && (n.pTagInButtonScope = null), mg.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function $t(e, t, n) {
			switch (t) {
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return _g.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "input": return t !== "select";
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function en(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function tn(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function nn(e, t) {
			t ||= vg;
			var n = t.current;
			if (t = (n = $t(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : en(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, yg[t]) return !1;
			yg[t] = !0;
			var i = (t = uh) ? tn(t.return, r) : null, a = t !== null && i !== null ? Zt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || j(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function rn(e, t, n) {
			if (n || $t("#text", t, !1)) return !0;
			if (n = "#text|" + t, yg[n]) return !1;
			yg[n] = !0;
			var r = (n = uh) ? tn(n, t) : null;
			return n = n !== null && r !== null ? Zt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function an(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function on(e) {
			return e.replace(Tg, function(e, t) {
				return t.toUpperCase();
			});
		}
		function sn(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Dg.hasOwnProperty(t) && Dg[t] || (Dg[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, on(t.replace(wg, "ms-")))) : Cg.test(t) ? Dg.hasOwnProperty(t) && Dg[t] || (Dg[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Eg.test(n) || Og.hasOwnProperty(n) && Og[n] || (Og[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Eg, ""))), typeof n == "number" && (isNaN(n) ? kg || (kg = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Ag || (Ag = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || jg.has(t) ? t === "float" ? e.cssFloat = n : (Ie(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function cn(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = bg[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = bg[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = bg[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "", rg = !0);
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && (sn(e, f, l), rg = !0);
			} else for (r in t) t.hasOwnProperty(r) && sn(e, r, t[r]);
		}
		function ln(e) {
			if (e.indexOf("-") === -1) return !1;
			switch (e) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph": return !1;
				default: return !0;
			}
		}
		function un(e) {
			return Pg.get(e) || e;
		}
		function dn(e, t) {
			if (fh.call(Lg, t) && Lg[t]) return !0;
			if (zg.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = Ig.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Lg[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Lg[t] = !0;
			}
			if (Rg.test(t)) {
				if (e = t.toLowerCase(), e = Ig.hasOwnProperty(e) ? e : null, e == null) return Lg[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Lg[t] = !0);
			}
			return !0;
		}
		function F(e, t) {
			var n = [], r;
			for (r in t) dn(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function fn(e, t, n, r) {
			if (fh.call(Vg, t) && Vg[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Vg[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Vg[t] = !0;
				if (Hg.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Vg[t] = !0;
			} else if (Hg.test(t)) return Ug.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Vg[t] = !0;
			if (Wg.test(t) || Gg.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vg[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vg[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Vg[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Vg[t] = !0;
			if (Fg.hasOwnProperty(i)) {
				if (i = Fg[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Vg[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Vg[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "credentialless":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" || (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Vg[t] = !0);
				}
				case "function":
				case "symbol": return Vg[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
						case "allowFullScreen":
						case "async":
						case "autoPlay":
						case "controls":
						case "credentialless":
						case "default":
						case "defer":
						case "disabled":
						case "disablePictureInPicture":
						case "disableRemotePlayback":
						case "formNoValidate":
						case "hidden":
						case "loop":
						case "noModule":
						case "noValidate":
						case "open":
						case "playsInline":
						case "readOnly":
						case "required":
						case "reversed":
						case "scoped":
						case "seamless":
						case "itemScope":
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Vg[t] = !0;
				}
			}
			return !0;
		}
		function pn(e, t, n) {
			var r = [], i;
			for (i in t) fn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function mn(e) {
			return Kg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function hn() {}
		function gn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function _n(e) {
			var t = st(e);
			if (t && (e = t.stateNode)) {
				var n = e[Hh] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (Dt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (Fe(t, "name"), n = n.querySelectorAll("input[name=\"" + M("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Hh] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									Dt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Tt(r);
						}
						break a;
					case "textarea":
						Ft(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && Mt(e, !!n.multiple, t, !1);
				}
			}
		}
		function vn(e, t, n) {
			if (Xg) return e(t, n);
			Xg = !0;
			try {
				return e(t);
			} finally {
				if (Xg = !1, (Jg !== null || Yg !== null) && (ru(), Jg && (t = Jg, e = Yg, Yg = Jg = null, _n(t), e))) for (t = 0; t < e.length; t++) _n(e[t]);
			}
		}
		function yn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Hh] || null;
			if (r === null) return null;
			n = r[t];
			a: switch (t) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
					break a;
				default: e = !1;
			}
			if (e) return null;
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function bn() {
			if (n_) return n_;
			var e, t = t_, n = t.length, r, i = "value" in e_ ? e_.value : e_.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return n_ = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function xn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function Sn() {
			return !0;
		}
		function Cn() {
			return !1;
		}
		function wn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Sn : Cn, this.isPropagationStopped = Cn, this;
			}
			return U(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Sn);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Sn);
				},
				persist: function() {},
				isPersistent: Sn
			}), t;
		}
		function Tn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = b_[e]) ? !!t[e] : !1;
		}
		function En() {
			return Tn;
		}
		function Dn(e, t) {
			switch (e) {
				case "keyup": return O_.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== k_;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function On(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function kn(e, t) {
			switch (e) {
				case "compositionend": return On(t);
				case "keypress": return t.which === P_ ? (I_ = !0, F_) : null;
				case "textInput": return e = t.data, e === F_ && I_ ? null : e;
				default: return null;
			}
		}
		function An(e, t) {
			if (L_) return e === "compositionend" || !A_ && Dn(e, t) ? (e = bn(), n_ = t_ = e_ = null, L_ = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return N_ && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function jn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!R_[e.type] : t === "textarea";
		}
		function Mn(e) {
			if (!Zg) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function Nn(e, t, n, r) {
			Jg ? Yg ? Yg.push(r) : Yg = [r] : Jg = r, t = md(t, "onChange"), 0 < t.length && (n = new i_("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function Pn(e) {
			cd(e, 0);
		}
		function Fn(e) {
			if (Tt(ct(e))) return e;
		}
		function In(e, t) {
			if (e === "change") return t;
		}
		function Ln() {
			z_ && (z_.detachEvent("onpropertychange", Rn), B_ = z_ = null);
		}
		function Rn(e) {
			if (e.propertyName === "value" && Fn(B_)) {
				var t = [];
				Nn(t, B_, e, gn(e)), vn(Pn, t);
			}
		}
		function zn(e, t, n) {
			e === "focusin" ? (Ln(), z_ = t, B_ = n, z_.attachEvent("onpropertychange", Rn)) : e === "focusout" && Ln();
		}
		function Bn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return Fn(B_);
		}
		function Vn(e, t) {
			if (e === "click") return Fn(t);
		}
		function Hn(e, t) {
			if (e === "input" || e === "change") return Fn(t);
		}
		function Un(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Wn(e, t) {
			if (H_(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!fh.call(t, i) || !H_(e[i], t[i])) return !1;
			}
			return !0;
		}
		function Gn(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function Kn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function qn(e, t) {
			var n = Kn(e);
			e = 0;
			for (var r; n;) {
				if (n.nodeType === 3) {
					if (r = e + n.textContent.length, e <= t && r >= t) return {
						node: n,
						offset: t - e
					};
					e = r;
				}
				a: {
					for (; n;) {
						if (n.nextSibling) {
							n = n.nextSibling;
							break a;
						}
						n = n.parentNode;
					}
					n = void 0;
				}
				n = Kn(n);
			}
		}
		function Jn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Jn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function Yn(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = Gn(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = Gn(e.document);
			}
			return t;
		}
		function Xn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Zn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			q_ || W_ == null || W_ !== Gn(r) || (r = W_, "selectionStart" in r && Xn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), K_ && Wn(K_, r) || (K_ = r, r = md(G_, "onSelect"), 0 < r.length && (t = new i_("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = W_)));
		}
		function Qn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function $n(e) {
			if (Y_[e]) return Y_[e];
			if (!J_[e]) return e;
			var t = J_[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in X_) return Y_[e] = t[n];
			return e;
		}
		function er(e, t) {
			iv.set(e, t), ft(t, [e]);
		}
		function tr(e, t) {
			if (e.name != null && e.name !== "auto") return e.name;
			if (t.autoName !== null) return t.autoName;
			e = iw.identifierPrefix;
			var n = ov++;
			return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
		}
		function nr(e) {
			if (e == null || typeof e == "string") return e;
			var t = null, n = pw;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e[n[r]];
				if (i != null) {
					if (i === "none") return "none";
					t = t == null ? i : t + (" " + i);
				}
			}
			return t ?? e.default;
		}
		function rr(e, t) {
			return e = nr(e), t = nr(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
		}
		function ir(e) {
			for (var t = pv, n = 0; n < e.length && n < _v; n++) {
				var r = e[n];
				if (typeof r == "object" && r) {
					if (Hm(r) && r.length === 2 && typeof r[0] == "string") {
						if (t !== pv && t !== gv) return mv;
						t = gv;
					} else return mv;
				} else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== pv && t !== hv || typeof r == "bigint") return mv;
					t = hv;
				}
			}
			return t;
		}
		function ar(e, t, n, r) {
			if (!ArrayBuffer.isView(e)) {
				var i = 0, a;
				for (a in e) if (fh.call(e, a) && a[0] !== "_" && (i++, sr(a, e[a], t, n, r), i >= _v)) {
					t.push([r + "\xA0\xA0".repeat(n) + "Only " + _v + " properties are shown. React will not log more properties of this object.", ""]);
					break;
				}
			}
		}
		function or(e) {
			return "$$typeof" in e && fh.call(e, "$$typeof") ? e.$$typeof : void 0;
		}
		function sr(e, t, n, r, i) {
			switch (typeof t) {
				case "object":
					if (t === null) {
						t = "null";
						break;
					}
					if (or(t) === Cm) {
						var a = fe(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && sr("key", o, n, r + 1, i), e = !1, o = 0, t) if (o++, l === "children" ? t.children != null && (!Hm(t.children) || 0 < t.children.length) && (e = !0) : fh.call(t, l) && l[0] !== "_" && sr(l, t[l], n, r + 1, i), o >= _v) break;
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), ArrayBuffer.isView(t)) {
						t = t.length, t = typeof t == "number" ? a + "(" + t + ")" : a;
						break;
					}
					if (a === "Array") {
						if (l = t.length > _v, o = ir(t), o === hv || o === pv) {
							t = JSON.stringify(l ? t.slice(0, _v).concat("…") : t);
							break;
						}
						if (o === gv) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length && e < _v; e++) a = t[e], sr(a[0], a[1], n, r + 1, i);
							l && sr(_v.toString(), "…", n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, sr(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, sr(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && ar(t, n, r + 1, i);
					return;
				case "function":
					t = t.name, t = t === "" || typeof t != "string" ? "() => {}" : t + "() {}";
					break;
				case "string":
					t = t === fv ? "…" : JSON.stringify(1024 <= t.length ? t.slice(0, 1023) + "…" : t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function cr(e, t, n, r) {
			var i = !0, a = 0;
			for (s in e) {
				if (a > _v) {
					n.push(["Previous object has more than " + _v + " properties. React will not attempt to diff objects with too many properties.", ""]), i = !1;
					break;
				}
				s in t || (n.push([vv + "\xA0\xA0".repeat(r) + s, "…"]), i = !1), a++;
			}
			for (var o in a = 0, t) {
				if (a > _v) {
					n.push(["Next object has more than " + _v + " properties. React will not attempt to diff objects with too many properties.", ""]), i = !1;
					break;
				}
				if (o in e) {
					var s = e[o], c = t[o];
					if (s !== c) {
						if (r === 0 && o === "children") {
							i = "\xA0\xA0".repeat(r) + o, n.push([vv + i, "…"], [yv + i, "…"]), i = !1;
							continue;
						}
						if (!(3 <= r)) {
							if (typeof s == "object" && typeof c == "object" && s !== null && c !== null && or(s) === or(c)) {
								if (or(c) === Cm) {
									if (s.type === c.type && s.key === c.key) {
										s = fe(c.type) || "…", i = "\xA0\xA0".repeat(r) + o, s = "<" + s + " … />", n.push([vv + i, s], [yv + i, s]), i = !1;
										continue;
									}
								} else {
									var l = Object.prototype.toString.call(s), u = Object.prototype.toString.call(c);
									if (l === u && (u === "[object Object]" || u === "[object Array]")) {
										l = [bv + "\xA0\xA0".repeat(r) + o, u === "[object Array]" ? "Array" : ""], n.push(l), u = n.length, cr(s, c, n, r + 1) ? u === n.length && (l[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
										continue;
									}
								}
							} else if (typeof s == "function" && typeof c == "function" && s.name === c.name && s.length === c.length && (l = Function.prototype.toString.call(s), u = Function.prototype.toString.call(c), l === u)) {
								s = c.name === "" ? "() => {}" : c.name + "() {}", n.push([bv + "\xA0\xA0".repeat(r) + o, s + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						sr(o, s, n, r, vv), sr(o, c, n, r, yv), i = !1;
					}
				} else n.push([yv + "\xA0\xA0".repeat(r) + o, "…"]), i = !1;
				a++;
			}
			return i;
		}
		function lr(e) {
			wv = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function ur(e, t, n, r) {
			xv && (Dv.start = t, Dv.end = n, Ev.color = "warning", Ev.tooltipText = r, Ev.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, Dv)) : performance.measure(r, Dv), performance.clearMeasures(r));
		}
		function dr(e, t, n) {
			ur(e, t, n, "Reconnect");
		}
		function fr(e, t, n, r, i) {
			var a = D(e);
			if (a !== null && xv) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				s = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				r = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Ov], l = cr(o.memoizedProps, l, c, 0), 1 < c.length ? (l && !Tv && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Tv = !0, c[0] = Av, Ev.color = "warning", Ev.tooltipText = kv) : (Ev.color = s, Ev.tooltipText = a), Ev.properties = c, Dv.start = t, Dv.end = n, e = "​" + a, r == null ? performance.measure(e, Dv) : r.run(performance.measure.bind(performance, e, Dv)), performance.clearMeasures(e)) : r == null ? console.timeStamp(a, t, n, Sv, void 0, s) : r.run(console.timeStamp.bind(console, a, t, n, Sv, void 0, s))) : r == null ? console.timeStamp(a, t, n, Sv, void 0, s) : r.run(console.timeStamp.bind(console, a, t, n, Sv, void 0, s));
			}
		}
		function pr(e, t, n, r) {
			if (xv) {
				var i = D(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && sr("key", e.key, o, 0, ""), e.memoizedProps !== null && ar(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: Sv,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, i = "​" + i, a ? a.run(performance.measure.bind(performance, i, e)) : performance.measure(i, e), performance.clearMeasures(i);
				}
			}
		}
		function mr(e, t, n, r, i) {
			if (i !== null) {
				if (xv) {
					var a = D(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && sr("key", e.key, r, 0, ""), e.memoizedProps !== null && ar(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: Sv,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, e = e._debugTask, n = "​" + a, e ? e.run(performance.measure.bind(performance, n, t)) : performance.measure(n, t), performance.clearMeasures(n);
					}
				}
			} else a = D(e), a !== null && xv && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, Sv, void 0, i)) : console.timeStamp(a, t, n, Sv, void 0, i));
		}
		function hr(e, t, n, r) {
			!xv || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, wv, Cv, n)) : console.timeStamp("Prewarm", e, t, wv, Cv, n));
		}
		function gr(e, t, n, r) {
			!xv || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, wv, Cv, n)) : console.timeStamp("Suspended", e, t, wv, Cv, n));
		}
		function _r(e, t, n, r) {
			!xv || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, wv, Cv, "error")) : console.timeStamp("Errored", e, t, wv, Cv, "error"));
		}
		function vr(e, t, n, r) {
			!xv || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, wv, Cv, "secondary-light")) : console.timeStamp(n, e, t, wv, Cv, "secondary-light"));
		}
		function yr(e, t, n, r, i) {
			if (xv && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: wv,
						trackGroup: Cv,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e), performance.clearMeasures("Errored");
			}
		}
		function br(e, t, n, r, i) {
			n === null ? !xv || t <= e || (i ? i.run(console.timeStamp.bind(console, r ? "Commit Interrupted View Transition" : "Commit", e, t, wv, Cv, r ? "error" : "secondary-dark")) : console.timeStamp(r ? "Commit Interrupted View Transition" : "Commit", e, t, wv, Cv, r ? "error" : "secondary-dark")) : yr(e, t, n, !1, i);
		}
		function xr(e, t, n) {
			!xv || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, wv, Cv, "secondary-dark")) : console.timeStamp("Animating", e, t, wv, Cv, "secondary-dark"));
		}
		function Sr() {
			for (var e = Pv, t = Fv = Pv = 0; t < e;) {
				var n = Nv[t];
				Nv[t++] = null;
				var r = Nv[t];
				Nv[t++] = null;
				var i = Nv[t];
				Nv[t++] = null;
				var a = Nv[t];
				if (Nv[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && Er(n, i, a);
			}
		}
		function Cr(e, t, n, r) {
			Nv[Pv++] = e, Nv[Pv++] = t, Nv[Pv++] = n, Nv[Pv++] = r, Fv |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function wr(e, t, n, r) {
			return Cr(e, t, n, r), Dr(e);
		}
		function Tr(e, t) {
			return Cr(e, null, null, t), Dr(e);
		}
		function Er(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & jv || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ah(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function Dr(e) {
			if (vw > _w) throw Cw = vw = 0, ww = yw = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Cw > Sw && (Cw = 0, ww = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Ku(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Ku(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function Or(e) {
			if (Lv === null) return e;
			var t = Lv(e);
			return t === void 0 ? e : t.current;
		}
		function kr(e, t) {
			if (Lv === null) return !1;
			var n = Lv, r = e.elementType;
			t = t.type;
			var i = !1, a = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (i = !0);
					break;
				case 0:
					(typeof t == "function" || a === Pm) && (i = !0);
					break;
				case 11:
					(a === Am || a === Pm) && (i = !0);
					break;
				case 14:
				case 15:
					(a === Nm || a === Pm) && (i = !0);
					break;
				default: return !1;
			}
			return !!(i && (e = n(r), e !== void 0 && e === n(t)));
		}
		function Ar(e) {
			Lv !== null && typeof WeakSet == "function" && (Rv === null && (Rv = /* @__PURE__ */ new WeakSet()), Rv.add(e));
		}
		function jr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag, c = r.type, l = r.elementType, u = null;
				switch (r = null, s) {
					case 0:
					case 1:
						u = c;
						break;
					case 15:
						u = c, r = l;
						break;
					case 14:
						r = l;
						break;
					case 11: u = c.render, r = l;
				}
				if (Lv === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var d = Lv;
				if (c = l = !1, u !== null && (u = d(u), u !== void 0 && (n.has(u) ? c = !0 : t.has(u) && (s === 1 ? c = !0 : l = !0))), c || r === null || (s = d(r), s !== void 0 && n.has(s) ? c = !0 : typeof r == "object" && r.$$typeof === Pm && (s = r._payload, s._status === 1 && (s = d(s._result.default), s !== void 0 && n.has(s) && (c = !0)))), Rv !== null && (Rv.has(e) || i !== null && Rv.has(i)) && (c = !0), c && (e._debugNeedsRemount = !0), (c || l) && (i = Tr(e, 2), i !== null && Ql(i, e, 2)), a === null || c || jr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function Mr(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Uv || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function Nr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Pr(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = h(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
				case 14:
				case 1:
				case 11: n.type = Or(e.type);
			}
			return n;
		}
		function Fr(e, t) {
			e.flags &= 1206910978;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Ir(e, t, n, r, i, a) {
			var o = 0, s = Or(e);
			if (typeof s == "function") Nr(s) && (o = 1);
			else if (typeof s == "string") o = be(), o = Ap(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (s) {
				case Fm: return t = h(31, n, t, i), t.elementType = Fm, t.lanes = a, t;
				case Tm: return Rr(n.children, i, a, t);
				case Em:
					o = 8, i |= Bv, i |= Vv;
					break;
				case Dm: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = h(12, e, t, r | K), t.elementType = Dm, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case jm: return t = h(13, n, t, i), t.elementType = jm, t.lanes = a, t;
				case Mm: return t = h(19, n, t, i), t.elementType = Mm, t.lanes = a, t;
				case Im:
				case Rm: return e = i | Hv, t = h(30, n, t, e), t.elementType = Rm, t.lanes = a, t.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}, t;
				default:
					if (typeof s == "object" && s) switch (s.$$typeof) {
						case km:
							o = 10;
							break a;
						case Om:
							o = 9;
							break a;
						case Am:
							o = 11;
							break a;
						case Nm:
							o = 14;
							break a;
						case Pm:
							o = 16, s = null;
							break a;
					}
					n = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (n += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? s = "null" : Hm(e) ? s = "array" : e !== void 0 && e.$$typeof === Cm ? (s = "<" + (fe(e.type) || "Unknown") + " />", n = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, (o = r ? pe(r) : null) && (n += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (s + "." + n)), s = null;
			}
			return t = h(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function Lr(e, t, n) {
			return t = Ir(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Rr(e, t, n, r) {
			return e = h(7, e, r, t), e.lanes = n, e;
		}
		function zr(e, t, n) {
			return e = h(6, e, null, t), e.lanes = n, e;
		}
		function Br(e) {
			var t = h(18, null, null, G);
			return t.stateNode = e, t;
		}
		function Vr(e, t, n) {
			return t = h(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Hr(e, t) {
			if (typeof e == "object" && e) {
				var n = Wv.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: Oe(t)
				}, Wv.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: Oe(t)
			};
		}
		function Ur(e, t) {
			Yr(), Gv[Kv++] = Jv, Gv[Kv++] = qv, qv = e, Jv = t;
		}
		function Wr(e, t, n) {
			Yr(), Yv[Xv++] = Qv, Yv[Xv++] = $v, Yv[Xv++] = Zv, Zv = e;
			var r = Qv;
			e = $v;
			var i = 32 - Ah(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Ah(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Qv = 1 << 32 - Ah(t) + i | n << i | r, $v = a + e;
			} else Qv = 1 << a | n << i | r, $v = e;
		}
		function Gr(e) {
			Yr(), e.return !== null && (Ur(e, 1), Wr(e, 1, 0));
		}
		function Kr(e) {
			for (; e === qv;) qv = Gv[--Kv], Gv[Kv] = null, Jv = Gv[--Kv], Gv[Kv] = null;
			for (; e === Zv;) Zv = Yv[--Xv], Yv[Xv] = null, $v = Yv[--Xv], Yv[Xv] = null, Qv = Yv[--Xv], Yv[Xv] = null;
		}
		function qr() {
			return Yr(), Zv === null ? null : {
				id: Qv,
				overflow: $v
			};
		}
		function Jr(e, t) {
			Yr(), Yv[Xv++] = Qv, Yv[Xv++] = $v, Yv[Xv++] = Zv, Qv = t.id, $v = t.overflow, Zv = e;
		}
		function Yr() {
			q || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Xr(e, t) {
			if (e.return === null) {
				if (ry === null) ry = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (ry.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					ry.distanceFromLeaf > t && (ry.distanceFromLeaf = t);
				}
				return ry;
			}
			var n = Xr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Zr() {
			q && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Qr(e, t) {
			ny || (e = Xr(e, 0), e.serverProps = null, t !== null && (t = tp(t), e.serverTail.push(t)));
		}
		function $r(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = ry;
			throw r !== null && (ry = null, n = Xt(r)), ai(Hr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), oy;
		}
		function ei(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Vh] = e, t[Hh] = r, _d(n, r), n) {
				case "dialog":
					H("cancel", t), H("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					H("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < zw.length; n++) H(zw[n], t);
					break;
				case "source":
					H("error", t);
					break;
				case "img":
				case "image":
				case "link":
					H("error", t), H("load", t);
					break;
				case "details":
					H("toggle", t);
					break;
				case "input":
					mt("input", r), H("invalid", t), Et(t, r), Ot(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					At(t, r);
					break;
				case "select":
					mt("select", r), H("invalid", t), Nt(t, r);
					break;
				case "textarea": mt("textarea", r), H("invalid", t), Pt(t, r), It(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Td(t.textContent, n) ? (r.popover != null && (H("beforetoggle", t), H("toggle", t)), r.onScroll != null && H("scroll", t), r.onScrollEnd != null && H("scrollend", t), r.onClick != null && (t.onclick = hn), t = !0) : t = !1, t || $r(e, !0);
		}
		function ti(e) {
			for (ey = e.return; ey;) switch (ey.tag) {
				case 5:
				case 31:
				case 13:
					ay = !1;
					return;
				case 27:
				case 3:
					ay = !0;
					return;
				default: ey = ey.return;
			}
		}
		function ni(e) {
			if (e !== ey) return !1;
			if (!q) return ti(e), q = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || qd(e.type, e.memoizedProps)), n = !n), n && ty) {
				for (n = ty; n;) {
					var r = Xr(e, 0), i = tp(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? rp(n) : ep(n.nextSibling);
				}
				$r(e);
			}
			if (ti(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				ty = rp(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				ty = rp(e);
			} else t === 27 ? (t = ty, af(e.type) ? (e = FT, FT = null, ty = e) : ty = t) : ty = ey ? ep(e.stateNode.nextSibling) : null;
			return !0;
		}
		function ri() {
			ty = ey = null, ny = q = !1;
		}
		function ii() {
			var e = iy;
			return e !== null && (LC === null ? LC = e : LC.push.apply(LC, e), iy = null), e;
		}
		function ai(e) {
			iy === null ? iy = [e] : iy.push(e);
		}
		function oi() {
			var e = ry;
			if (e !== null) {
				ry = null;
				for (var t = Xt(e); 0 < e.children.length;) e = e.children[0];
				j(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function si() {
			dy = uy = null, fy = !1;
		}
		function ci(e, t, n) {
			ge(sy, t._currentValue, e), t._currentValue = n, ge(cy, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== ly && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = ly;
		}
		function li(e, t) {
			e._currentValue = sy.current;
			var n = cy.current;
			he(cy, t), e._currentRenderer = n, he(sy, t);
		}
		function ui(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function di(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ui(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ui(o, n, e), o = null;
				} else i.tag === 13 && i.memoizedState !== null && i.memoizedState.dehydrated === null ? (i.lanes |= n, o = i.alternate, o !== null && (o.lanes |= n), ui(i.return, n, e), o = i.child, o = o === null ? null : o.sibling) : o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function fi(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						H_(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === Zm.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [$T] : e.push($T));
				}
				i = i.return;
			}
			return e !== null && di(t, e, n, r), t.flags |= 262144, e !== null;
		}
		function pi(e) {
			for (e = e.firstContext; e !== null;) {
				if (!H_(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function mi(e) {
			uy = e, dy = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function hi(e) {
			return fy && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), _i(uy, e);
		}
		function gi(e, t) {
			return uy === null && mi(e), _i(e, t);
		}
		function _i(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, dy === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				dy = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else dy = dy.next = t;
			return n;
		}
		function vi() {
			return {
				controller: new py(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function yi(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function bi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && my(hy, function() {
				e.controller.abort();
			});
		}
		function xi(e, t) {
			if (e.pendingLanes & 4194048) {
				var n = e.transitionTypes;
				for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
					var r = t[e];
					n.indexOf(r) === -1 && n.push(r);
				}
			}
		}
		function Si(e) {
			var t = e.transitionTypes;
			return e.transitionTypes = null, t;
		}
		function Ci(e, t, n) {
			e & 127 ? 0 > My && (My = vy(), Ny = yy(t), Fy = t, n != null && (Iy = D(n)), (fC & (rC | iC)) !== nC && (Ay = !0, Py = by), e = Xd(), t = Yd(), e !== zy || t !== Ry ? zy = -1.1 : t !== null && (Py = by), Ly = e, Ry = t) : e & 4194048 && 0 > Uy && (Uy = vy(), Gy = yy(t), Ky = t, n != null && (qy = D(n)), 0 > Hy) && (e = Xd(), t = Yd(), (e !== Xy || t !== Yy) && (Xy = -1.1), Jy = e, Yy = t);
		}
		function wi(e) {
			if (0 > My) {
				My = vy(), Ny = e._debugTask == null ? null : e._debugTask, (fC & (rC | iC)) !== nC && (Py = by);
				var t = Xd(), n = Yd();
				t !== zy || n !== Ry ? zy = -1.1 : n !== null && (Py = by), Ly = t, Ry = n;
			}
			0 > Uy && (Uy = vy(), Gy = e._debugTask == null ? null : e._debugTask, 0 > Hy) && (e = Xd(), t = Yd(), (e !== Xy || t !== Yy) && (Xy = -1.1), Jy = e, Yy = t);
		}
		function Ti() {
			var e = Dy;
			return Dy = 0, e;
		}
		function Ei(e) {
			var t = Dy;
			return Dy = e, t;
		}
		function Di(e) {
			var t = Dy;
			return Dy += e, t;
		}
		function Oi() {
			Y = J = -1.1;
		}
		function ki() {
			var e = J;
			return J = -1.1, e;
		}
		function Ai(e) {
			0 <= e && (J = e);
		}
		function ji() {
			var e = Oy;
			return Oy = -0, e;
		}
		function Mi(e) {
			0 <= e && (Oy = e);
		}
		function Ni() {
			var e = ky;
			return ky = null, e;
		}
		function Pi() {
			var e = Ay;
			return Ay = !1, e;
		}
		function Fi(e) {
			Ey = vy(), 0 > e.actualStartTime && (e.actualStartTime = Ey);
		}
		function Ii(e) {
			if (0 <= Ey) {
				var t = vy() - Ey;
				e.actualDuration += t, e.selfBaseDuration = t, Ey = -1;
			}
		}
		function Li(e) {
			if (0 <= Ey) {
				var t = vy() - Ey;
				e.actualDuration += t, Ey = -1;
			}
		}
		function Ri() {
			if (0 <= Ey) {
				var e = vy(), t = e - Ey;
				Ey = -1, Dy += t, Oy += t, Y = e;
			}
		}
		function zi(e) {
			ky === null && (ky = []), ky.push(e), Ty === null && (Ty = []), Ty.push(e);
		}
		function Bi() {
			Ey = vy(), 0 > J && (J = Ey);
		}
		function Vi(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Hi(e, t) {
			if (ob === null) {
				var n = ob = [];
				sb = 0, cb = ad(), lb = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return sb++, t.then(Ui, Ui), t;
		}
		function Ui() {
			if (--sb === 0 && (-1 < Uy || (Hy = -1.1), _y = null, ob !== null)) {
				lb !== null && (lb.status = "fulfilled");
				var e = ob;
				ob = null, cb = 0, lb = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Wi(e, t) {
			var n = [], r = {
				status: "pending",
				value: null,
				reason: null,
				then: function(e) {
					n.push(e);
				}
			};
			return e.then(function() {
				r.status = "fulfilled", r.value = t;
				for (var e = 0; e < n.length; e++) (0, n[e])(t);
			}, function(e) {
				for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
			}), r;
		}
		function Gi() {
			var e = db.current;
			return e === null ? pC.pooledCache : e;
		}
		function Ki(e, t) {
			t === null ? ge(db, db.current, e) : ge(db, t.pool, e);
		}
		function qi() {
			var e = Gi();
			return e === null ? null : {
				parent: gy._currentValue,
				pool: e
			};
		}
		function Ji() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Yi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Xi(e, t, n, r) {
			W.actQueue !== null && (W.didUsePromise = !0);
			var i = e.thenables;
			if (n = i[n], n === void 0 ? i.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(hn, hn), t = n), t._debugInfo === void 0) {
				e = performance.now(), i = t.displayName;
				var a = {
					name: typeof i == "string" ? i : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: a }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					a.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw r = t.reason, $i(r), r === void 0 && !("reason" in t) ? Error("A rejected Promise was passed to React without a `reason` property. React threw a generic error from where the Promise was used to assist in identifying the problematic Promise. Make sure that instrumented Promises correctly set the `reason` property when setting `status` to `'rejected'`.") : r;
				default:
					if (typeof t.status == "string") t.then(hn, hn);
					else {
						if (e = pC, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
						e = t, e.status = "pending", e.then(function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "fulfilled", n.value = e;
							}
						}, function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "rejected", n.reason = e;
							}
						});
					}
					switch (t.status) {
						case "fulfilled": return t.value;
						case "rejected": throw r = t.reason, $i(r), r;
					}
					throw Jb = t, Yb = !0, qb || r === null || r.alternate !== null || (Gb = r, Kb = Error("This library called use() to suspend in a previous render but did not call use() when it finished. This indicates an incorrect use of use(). Learn more: https://react.dev/warnings/conditional-use-of-use")), Vb;
			}
		}
		function Zi(e) {
			try {
				return Bb(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Jb = e, Yb = !0, Vb) : e;
			}
		}
		function Qi() {
			if (Jb === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Jb;
			return Jb = null, Yb = !1, e;
		}
		function $i(e) {
			if (e === Vb || e === Ub) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function ea(e, t) {
			return e === t ? !0 : e.tag !== t.tag || e.type !== t.type || e.key !== t.key || e.index !== t.index || e.tag === 3 && e.stateNode !== t.stateNode || e.return === null || t.return === null ? !1 : ea(e.return, t.return);
		}
		function ta(e) {
			var t = Qb;
			return e != null && (Qb = t === null ? e : t.concat(e)), t;
		}
		function na() {
			var e = Qb;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function ra(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key" && a !== "ref") {
					t === null && (t = Lr(e, n.mode, 0), t._debugInfo = Qb, t.return = n), j(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key`, `ref`, and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function ia(e) {
			var t = Zb;
			return Zb += 1, Xb === null && (Xb = Ji()), Xi(Xb, e, t, null);
		}
		function aa(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function oa(e, t) {
			throw t.$$typeof === Sm ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function sa(e, t) {
			var n = na();
			n === null ? oa(e, t) : n.run(oa.bind(null, e, t));
		}
		function ca(e, t) {
			var n = D(e) || "Component";
			nx[n] || (nx[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function I(e, t) {
			var n = na();
			n === null ? ca(e, t) : n.run(ca.bind(null, e, t));
		}
		function la(e, t) {
			var n = D(e) || "Component";
			rx[n] || (rx[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function ua(e, t) {
			var n = na();
			n === null ? la(e, t) : n.run(la.bind(null, e, t));
		}
		function da(e) {
			function t(t, n) {
				if (e) {
					var r = t.deletions;
					r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
				}
			}
			function n(n, r) {
				if (!e) return null;
				for (; r !== null;) t(n, r), r = r.sibling;
				return null;
			}
			function r(e) {
				for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
				return t;
			}
			function i(e, t) {
				return e = Pr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 134217730), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = zr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Qb, t) : (t = i(t, n), t.return = e, t._debugInfo = Qb, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Tm ? (t = u(e, t, n.props.children, r, n.key), aa(t, n), ra(n, t, e), t) : t !== null && (t.elementType === a || kr(t, n) || typeof a == "object" && a && a.$$typeof === Pm && Zi(a) === t.type) ? (t = i(t, n.props), aa(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Qb, t) : (t = Lr(n, e.mode, r), aa(t, n), t.return = e, t._debugInfo = Qb, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Vr(n, e.mode, r), t.return = e, t._debugInfo = Qb, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Qb, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Rr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Qb, t) : (t = i(t, n), t.return = e, t._debugInfo = Qb, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = zr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Qb, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Cm: return n = Lr(t, e.mode, n), aa(n, t), n.return = e, e = ta(t._debugInfo), n._debugInfo = Qb, Qb = e, n;
						case wm: return t = Vr(t, e.mode, n), t.return = e, t._debugInfo = Qb, t;
						case Pm:
							var r = ta(t._debugInfo);
							return t = Zi(t), e = d(e, t, n), Qb = r, e;
					}
					if (Hm(t) || de(t)) return n = Rr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = ta(t._debugInfo), n._debugInfo = Qb, Qb = e, n;
					if (typeof t.then == "function") return r = ta(t._debugInfo), e = d(e, ia(t), n), Qb = r, e;
					if (t.$$typeof === km) return d(e, gi(e, t), n);
					sa(e, t);
				}
				return typeof t == "function" && I(e, t), typeof t == "symbol" && ua(e, t), null;
			}
			function p(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Cm: return n.key === i ? (i = ta(n._debugInfo), e = c(e, t, n, r), Qb = i, e) : null;
						case wm: return n.key === i ? l(e, t, n, r) : null;
						case Pm: return i = ta(n._debugInfo), n = Zi(n), e = p(e, t, n, r), Qb = i, e;
					}
					if (Hm(n) || de(n)) return i === null ? (i = ta(n._debugInfo), e = u(e, t, n, r, null), Qb = i, e) : null;
					if (typeof n.then == "function") return i = ta(n._debugInfo), e = p(e, t, ia(n), r), Qb = i, e;
					if (n.$$typeof === km) return p(e, t, gi(e, n), r);
					sa(e, n);
				}
				return typeof n == "function" && I(e, n), typeof n == "symbol" && ua(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Cm: return n = e.get(r.key === null ? n : r.key) || null, e = ta(r._debugInfo), t = c(t, n, r, i), Qb = e, t;
						case wm: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Pm:
							var a = ta(r._debugInfo);
							return r = Zi(r), t = m(e, t, n, r, i), Qb = a, t;
					}
					if (Hm(r) || de(r)) return n = e.get(n) || null, e = ta(r._debugInfo), t = u(t, n, r, i, null), Qb = e, t;
					if (typeof r.then == "function") return a = ta(r._debugInfo), t = m(e, t, n, ia(r), i), Qb = a, t;
					if (r.$$typeof === km) return m(e, t, n, gi(t, r), i);
					sa(t, r);
				}
				return typeof r == "function" && I(t, r), typeof r == "symbol" && ua(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Cm:
					case wm:
						f(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						j(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Pm: n = Zi(n), g(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, f = null, h = o, _ = o = 0, v = null; h !== null && _ < s.length; _++) {
					h.index > _ ? (v = h, h = null) : v = h.sibling;
					var y = p(i, h, s[_], c);
					if (y === null) {
						h === null && (h = v);
						break;
					}
					l = g(i, y, s[_], l), e && h && y.alternate === null && t(i, h), o = a(y, o, _), f === null ? u = y : f.sibling = y, f = y, h = v;
				}
				if (_ === s.length) return n(i, h), q && Ur(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), f === null ? u = h : f.sibling = h, f = h);
					return q && Ur(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && (y = v.alternate, y !== null && h.delete(y.key === null ? _ : y.key)), o = a(v, o, _), f === null ? u = v : f.sibling = v, f = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), q && Ur(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, f = o, h = o = 0, _ = null, v = null, y = s.next(); f !== null && !y.done; h++, y = s.next()) {
					f.index > h ? (_ = f, f = null) : _ = f.sibling;
					var b = p(i, f, y.value, c);
					if (b === null) {
						f === null && (f = _);
						break;
					}
					v = g(i, b, y.value, v), e && f && b.alternate === null && t(i, f), o = a(b, o, h), u === null ? l = b : u.sibling = b, u = b, f = _;
				}
				if (y.done) return n(i, f), q && Ur(i, h), l;
				if (f === null) {
					for (; !y.done; h++, y = s.next()) f = d(i, y.value, c), f !== null && (v = g(i, f, y.value, v), o = a(f, o, h), u === null ? l = f : u.sibling = f, u = f);
					return q && Ur(i, h), l;
				}
				for (f = r(f); !y.done; h++, y = s.next()) _ = m(f, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && (y = _.alternate, y !== null && f.delete(y.key === null ? h : y.key)), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && f.forEach(function(e) {
					return t(i, e);
				}), q && Ur(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Tm && a.key === null && a.props.ref === void 0 && (ra(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Cm:
							var c = ta(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Tm) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), aa(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Qb, ra(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || kr(r, a) || typeof l == "object" && l && l.$$typeof === Pm && Zi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), aa(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Qb, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								a.type === Tm ? (s = Rr(a.props.children, e.mode, s, a.key), aa(s, a), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Qb, ra(a, s, e), e = s) : (s = Lr(a, e.mode, s), aa(s, a), s.return = e, s._debugInfo = Qb, e = s);
							}
							return e = o(e), Qb = c, e;
						case wm:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) {
										if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
											n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								s = Vr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Pm: return c = ta(a._debugInfo), a = Zi(a), e = y(e, r, a, s), Qb = c, e;
					}
					if (Hm(a)) return _(e, r, a, s);
					if (de(a)) {
						if (c = a, a = de(c), typeof a != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						return l = a.call(c), l === c ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(l) !== "[object Generator]") && (ex || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), ex = !0) : c.entries !== a || $b || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), $b = !0), v(e, r, l, s);
					}
					if (typeof a.then == "function") return c = ta(a._debugInfo), e = y(e, r, ia(a), s), Qb = c, e;
					if (a.$$typeof === km) return y(e, r, gi(e, a), s);
					sa(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = zr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Qb, e = s), o(e)) : (typeof a == "function" && I(e, a), typeof a == "symbol" && ua(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Qb;
				Qb = null;
				try {
					Zb = 0;
					var a = y(e, t, n, r);
					return Xb = null, a;
				} catch (t) {
					if (t === Vb || t === Ub) throw t;
					var o = h(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Qb;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Qb = i;
				}
			};
		}
		function fa(e, t) {
			var n = Hm(e);
			return e = !n && typeof de(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function pa(e) {
			e.updateQueue = {
				baseState: e.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					lanes: 0,
					hiddenCallbacks: null
				},
				callbacks: null
			};
		}
		function ma(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function ha(e) {
			return {
				lane: e,
				tag: ox,
				payload: null,
				callback: null,
				next: null
			};
		}
		function ga(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, fx === r && !dx) {
				var i = D(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), dx = !0;
			}
			return (fC & rC) === nC ? (Cr(e, r, t, n), Dr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Dr(e), Er(e, null, n), t);
		}
		function _a(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ze(e, n);
			}
		}
		function va(e, t) {
			var n = e.updateQueue, r = e.alternate;
			if (r !== null && (r = r.updateQueue, n === r)) {
				var i = null, a = null;
				if (n = n.firstBaseUpdate, n !== null) {
					do {
						var o = {
							lane: n.lane,
							tag: n.tag,
							payload: n.payload,
							callback: null,
							next: null
						};
						a === null ? i = a = o : a = a.next = o, n = n.next;
					} while (n !== null);
					a === null ? i = a = t : a = a.next = t;
				} else i = a = t;
				n = {
					baseState: r.baseState,
					firstBaseUpdate: i,
					lastBaseUpdate: a,
					shared: r.shared,
					callbacks: r.callbacks
				}, e.updateQueue = n;
			} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
		}
		function ya() {
			if (px) {
				var e = lb;
				if (e !== null) throw e;
			}
		}
		function ba(e, t, n, r) {
			px = !1;
			var i = e.updateQueue;
			ux = !1, fx = i.shared;
			var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
			if (s !== null) {
				i.shared.pending = null;
				var c = s, l = c.next;
				c.next = null, o === null ? a = l : o.next = l, o = c;
				var u = e.alternate;
				u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
			}
			if (a !== null) {
				var d = i.baseState;
				o = 0, u = l = c = null, s = a;
				do {
					var f = s.lane & -536870913, p = f !== s.lane;
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === cb && (px = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case sx:
									if (m = m.payload, typeof m == "function") {
										fy = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Bv) {
											ze(!0);
											try {
												m.call(g, d, h);
											} finally {
												ze(!1);
											}
										}
										fy = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case lx: f.flags = f.flags & -65537 | 128;
								case ox:
									if (_ = m.payload, typeof _ == "function") {
										if (fy = !0, m = _.call(g, d, h), f.mode & Bv) {
											ze(!0);
											try {
												_.call(g, d, h);
											} finally {
												ze(!1);
											}
										}
										fy = !1;
									} else m = _;
									if (m == null) break a;
									d = U({}, d, m);
									break a;
								case cx: ux = !0;
							}
						}
						f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
					} else p = {
						lane: f,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
					if (s = s.next, s === null) {
						if (s = i.shared.pending, s === null) break;
						p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
					}
				} while (1);
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), jC |= o, e.lanes = o, e.memoizedState = d;
			}
			fx = null;
		}
		function xa(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function Sa(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) xa(n[e], t);
		}
		function Ca(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) xa(n[e], t);
		}
		function wa(e, t) {
			var n = kC;
			ge(hx, n, e), ge(mx, t, e), kC = n | t.baseLanes;
		}
		function Ta(e) {
			ge(hx, kC, e), ge(mx, mx.current, e);
		}
		function Ea(e) {
			kC = hx.current, he(mx, e), he(hx, e);
		}
		function Da(e) {
			var t = e.alternate;
			ge(bx, bx.current & vx, e), ge(gx, e, e), _x === null && (t === null || mx.current !== null || t.memoizedState !== null) && (_x = e);
		}
		function Oa(e) {
			ge(bx, bx.current, e), ge(gx, e, e), _x === null && (_x = e);
		}
		function ka(e) {
			e.tag === 22 ? (ge(bx, bx.current, e), ge(gx, e, e), _x === null && (_x = e)) : Aa(e);
		}
		function Aa(e) {
			ge(bx, bx.current, e), ge(gx, gx.current, e);
		}
		function ja(e) {
			he(gx, e), _x === e && (_x = null), he(bx, e);
		}
		function Ma(e, t) {
			ge(gx, gx.current, e), ge(bx, t, e);
		}
		function Na(e) {
			he(bx, e), he(gx, e), _x === e && (_x = null);
		}
		function Pa(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || Zf(n) || Qf(n))) return t;
				} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
					if (t.flags & 128) return t;
				} else if (t.child !== null) {
					t.child.return = t, t = t.child;
					continue;
				}
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return null;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
			return null;
		}
		function L() {
			var e = Z;
			Hx === null ? Hx = [e] : Hx.push(e);
		}
		function R() {
			var e = Z;
			if (Hx !== null && (Ux++, Hx[Ux] !== e)) {
				var t = D(X);
				if (!Dx.has(t) && (Dx.add(t), Hx !== null)) {
					for (var n = "", r = 0; r <= Ux; r++) {
						var i = Hx[r], a = r === Ux ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function Fa(e) {
			e == null || Hm(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function Ia() {
			var e = D(X);
			Ax.has(e) || (Ax.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function La() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function Ra(e, t) {
			if (Wx) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!H_(e[n], t[n])) return !1;
			return !0;
		}
		function za(e, t, n, r, i, a) {
			jx = a, X = t, Hx = e === null ? null : e._debugHookTypes, Ux = -1, Wx = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = D(X), kx.has(a) || (kx.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, W.H = e !== null && e.memoizedState !== null ? Jx : Hx === null ? Kx : qx, Ix = a = (t.mode & Bv) !== G;
			var o = wb(n, r, i);
			if (Ix = !1, Fx && (o = Va(t, n, r, i)), a) {
				ze(!0);
				try {
					o = Va(t, n, r, i);
				} finally {
					ze(!1);
				}
			}
			return Ba(e, t), o;
		}
		function Ba(e, t) {
			t._debugHookTypes = Hx, t.dependencies === null ? zx !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: zx
			}) : t.dependencies._debugThenableState = zx;
			var n = zx;
			if (Gb !== null && ea(Gb, t) && (n !== null || Kb === null || qb || (qb = !0, console.error(Kb)), Kb = Gb = null), W.H = Gx, n = Mx !== null && Mx.next !== null, jx = 0, Hx = Z = Nx = Mx = X = null, Ux = -1, e !== null && (e.flags & 1206910976) != (t.flags & 1206910976) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Px = !1, Rx = 0, zx = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || mS || (e = e.dependencies, e !== null && pi(e) && (mS = !0)), Yb ? (Yb = !1, e = !0) : e = !1, e && (t = D(t) || "Unknown", Ox.has(t) || kx.has(t) || (Ox.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Va(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Fx && (zx = null), Rx = 0, Fx = !1, i >= Vx) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Wx = !1, Nx = Mx = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Ux = -1, W.H = Yx, a = wb(t, n, r);
			} while (Fx);
			return a;
		}
		function Ha() {
			var e = W.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Ya(t) : t, e = e.useState()[0], (Mx === null ? null : Mx.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Ua() {
			var e = Lx !== 0;
			return Lx = 0, e;
		}
		function Wa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Vv) === G ? t.flags & -2053 : t.flags & -805308421, e.lanes &= ~n;
		}
		function Ga(e) {
			if (Px) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Px = !1;
			}
			jx = 0, Hx = Nx = Mx = X = null, Ux = -1, Z = null, Fx = !1, Rx = Lx = 0, zx = null;
		}
		function Ka() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Nx === null ? X.memoizedState = Nx = e : Nx = Nx.next = e, Nx;
		}
		function qa() {
			if (Mx === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = Mx.next;
			var t = Nx === null ? X.memoizedState : Nx.next;
			if (t !== null) Nx = t, Mx = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				Mx = e, e = {
					memoizedState: Mx.memoizedState,
					baseState: Mx.baseState,
					baseQueue: Mx.baseQueue,
					queue: Mx.queue,
					next: null
				}, Nx === null ? X.memoizedState = Nx = e : Nx = Nx.next = e;
			}
			return Nx;
		}
		function Ja() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Ya(e) {
			var t = Rx;
			return Rx += 1, zx === null && (zx = Ji()), e = Xi(zx, e, t, X), t = X, (Nx === null ? t.memoizedState : Nx.next) === null && (t = t.alternate, W.H = t !== null && t.memoizedState !== null ? Jx : Kx), e;
		}
		function Xa(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Ya(e);
				if (e.$$typeof === zm) return;
				if (e.$$typeof === km) return hi(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Za(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
				r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
					data: r.data.map(function(e) {
						return e.slice();
					}),
					index: 0
				})));
			}
			if (t ??= {
				data: [],
				index: 0
			}, n === null && (n = Ja(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Wx) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Lm;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Qa(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function $a(e, t, n) {
			var r = Ka();
			if (n !== void 0) {
				var i = n(t);
				if (Ix) {
					ze(!0);
					try {
						n(t);
					} finally {
						ze(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ss.bind(null, X, e), [r.memoizedState, e];
		}
		function eo(e) {
			return to(qa(), Mx, e);
		}
		function to(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (jx & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === cb && (u = !0);
						else if ((jx & f) === f) {
							l = l.next, f === cb && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, jC |= f;
						d = l.action, Ix && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, jC |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !H_(a, e.memoizedState) && (mS = !0, u && (n = lb, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function no(e) {
			var t = qa(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				H_(a, t.memoizedState) || (mS = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function ro(e, t, n) {
			var r = X, i = Ka();
			if (q) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				Ex || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), Ex = !0);
			} else {
				if (a = t(), Ex || (n = t(), H_(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Ex = !0)), pC === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || ao(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, No(so.bind(null, r, n, e), [e]), r.flags |= 2048, ko(Sx | Tx, { destroy: void 0 }, oo.bind(null, r, n, a, t), null), a;
		}
		function io(e, t, n) {
			var r = X, i = qa(), a = q;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !Ex) {
				var o = t();
				H_(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Ex = !0);
			}
			if ((o = !H_((Mx || i).memoizedState, n)) && (i.memoizedState = n, mS = !0), i = i.queue, Mo(2048, Tx, so.bind(null, r, i, e), [e]), e = i.getSnapshot !== t || o || Nx !== null && (Nx.memoizedState.tag & Sx) !== xx, ko(e ? Sx | Tx : Tx, { destroy: void 0 }, oo.bind(null, r, i, n, t), null), e) {
				if (r.flags |= 2048, pC === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || jx & 127 || ao(r, t, n);
			}
			return n;
		}
		function ao(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = Ja(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function oo(e, t, n, r) {
			t.value = n, t.getSnapshot = r, co(t) && lo(e);
		}
		function so(e, t, n) {
			return n(function() {
				co(t) && (Ci(2, "updateSyncExternalStore()", e), lo(e));
			});
		}
		function co(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !H_(e, n);
			} catch {
				return !0;
			}
		}
		function lo(e) {
			var t = Tr(e, 2);
			t !== null && Ql(t, e, 2);
		}
		function uo(e) {
			var t = Ka();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Ix) {
					ze(!0);
					try {
						n();
					} finally {
						ze(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Qa,
				lastRenderedState: e
			}, t;
		}
		function fo(e) {
			e = uo(e);
			var t = e.queue, n = cs.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function po(e) {
			var t = Ka();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = us.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function mo(e, t) {
			return ho(qa(), Mx, e, t);
		}
		function ho(e, t, n, r) {
			return e.baseState = n, to(e, Mx, typeof r == "function" ? r : Qa);
		}
		function go(e, t) {
			var n = qa();
			return Mx === null ? (n.baseState = e, [e, n.queue.dispatch]) : ho(n, Mx, e, t);
		}
		function _o(e, t, n, r, i) {
			if (ds(e)) throw Error("Cannot update action state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				W.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, vo(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function vo(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = W.T, o = {};
				o.types = a === null ? null : a.types, o._updatedFibers = /* @__PURE__ */ new Set(), W.T = o;
				try {
					var s = n(i, r), c = W.S;
					c !== null && c(o, s), yo(e, t, s);
				} catch (n) {
					xo(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), W.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), yo(e, t, o);
			} catch (n) {
				xo(e, t, n);
			}
		}
		function yo(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (W.asyncTransitions++, n.then(Yo, Yo), n.then(function(n) {
				bo(e, t, n);
			}, function(n) {
				return xo(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : bo(e, t, n);
		}
		function bo(e, t, n) {
			t.status = "fulfilled", t.value = n, So(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, vo(e, n)));
		}
		function xo(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, So(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function So(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function Co(e, t) {
			return t;
		}
		function wo(e, t) {
			if (q) {
				var n = pC.formState;
				if (n !== null) {
					a: {
						var r = X;
						if (q) {
							if (ty) {
								b: {
									for (var i = ty, a = ay; i.nodeType !== 8;) if (!a || (i = ep(i.nextSibling), i === null)) {
										i = null;
										break b;
									}
									a = i.data, i = a === pT || a === mT ? i : null;
								}
								if (i) {
									ty = ep(i.nextSibling), r = i.data === pT;
									break a;
								}
							}
							$r(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Ka(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Co,
				lastRenderedState: t
			}, n.queue = r, n = cs.bind(null, X, r), r.dispatch = n, r = uo(!1), a = us.bind(null, X, !1, r.queue), r = Ka(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = _o.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function To(e) {
			return Eo(qa(), Mx, e);
		}
		function Eo(e, t, n) {
			if (t = to(e, t, Co)[0], e = eo(Qa)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Ya(t);
			} catch (e) {
				throw e === Vb ? Ub : e;
			}
			else r = t;
			t = qa();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, ko(Sx | Tx, { destroy: void 0 }, Do.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function Do(e, t) {
			e.action = t;
		}
		function Oo(e) {
			var t = qa(), n = Mx;
			if (n !== null) return Eo(t, n, e);
			qa(), t = t.memoizedState, n = qa();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function ko(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = Ja(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function Ao(e) {
			var t = Ka();
			return e = { current: e }, t.memoizedState = e;
		}
		function jo(e, t, n, r) {
			var i = Ka();
			X.flags |= e, i.memoizedState = ko(Sx | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function Mo(e, t, n, r) {
			var i = qa();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			Mx !== null && r !== null && Ra(r, Mx.memoizedState.deps) ? i.memoizedState = ko(t, a, n, r) : (X.flags |= e, i.memoizedState = ko(Sx | t, a, n, r));
		}
		function No(e, t) {
			(X.mode & Vv) === G ? jo(8390656, Tx, e, t) : jo(545261568, Tx, e, t);
		}
		function Po(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = Ja(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function Fo(e) {
			var t = Ka(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((fC & rC) !== nC) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function Io(e) {
			var t = qa().memoizedState;
			return Po({
				ref: t,
				nextImpl: e
			}), function() {
				if ((fC & rC) !== nC) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function Lo(e, t) {
			var n = 4194308;
			return (X.mode & Vv) !== G && (n |= 268435456), jo(n, wx, e, t);
		}
		function Ro(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function zo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Vv) !== G && (r |= 268435456), jo(r, wx, Ro.bind(null, t, e), n);
		}
		function Bo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), Mo(4, wx, Ro.bind(null, t, e), n);
		}
		function Vo(e, t) {
			return Ka().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Ho(e, t) {
			var n = qa();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && Ra(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Uo(e, t) {
			var n = Ka();
			t = t === void 0 ? null : t;
			var r = e();
			if (Ix) {
				ze(!0);
				try {
					e();
				} finally {
					ze(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Wo(e, t) {
			var n = qa();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && Ra(t, r[1])) return r[0];
			if (r = e(), Ix) {
				ze(!0);
				try {
					e();
				} finally {
					ze(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function z(e, t) {
			return qo(Ka(), e, t);
		}
		function Go(e, t) {
			return Jo(qa(), Mx.memoizedState, e, t);
		}
		function Ko(e, t) {
			var n = qa();
			return Mx === null ? qo(n, e, t) : Jo(n, Mx.memoizedState, e, t);
		}
		function qo(e, t, n) {
			return n === void 0 || jx & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Xl(), X.lanes |= e, jC |= e, n);
		}
		function Jo(e, t, n, r) {
			return H_(n, t) ? n : mx.current === null ? !(jx & 106) || jx & 1073741824 && !($ & 261930) ? (mS = !0, e.memoizedState = n) : (e = Xl(), X.lanes |= e, jC |= e, t) : (e = qo(e, n, r), H_(e, t) || (mS = !0), e);
		}
		function Yo() {
			W.asyncTransitions--;
		}
		function Xo(e, t, n, r, i) {
			var a = Um.p;
			Um.p = a !== 0 && a < Lh ? a : Lh;
			var o = W.T, s = {};
			s.types = o === null ? null : o.types, s._updatedFibers = /* @__PURE__ */ new Set(), W.T = s, us(e, !1, t, n);
			try {
				var c = i(), l = W.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					W.asyncTransitions++, c.then(Yo, Yo);
					var u = Wi(c, r);
					ls(e, t, u, Yl(e));
				} else ls(e, t, r, Yl(e));
			} catch (n) {
				ls(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, Yl(e));
			} finally {
				Um.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), W.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function Zo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Qo(e).queue;
			wi(e), Xo(e, i, t, QT, n === null ? u : function() {
				return $o(e), n(r);
			});
		}
		function Qo(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: QT,
				baseState: QT,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Qa,
					lastRenderedState: QT
				},
				next: null
			};
			var n = {};
			return t.next = {
				memoizedState: n,
				baseState: n,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Qa,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function $o(e) {
			W.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Qo(e);
			t.next === null && (t = e.alternate.memoizedState), ls(e, t.next.queue, {}, Yl(e));
		}
		function es() {
			var e = uo(!1);
			return e = Xo.bind(null, X, e.queue, !0, !1), Ka().memoizedState = e, [!1, e];
		}
		function ts() {
			var e = eo(Qa)[0], t = qa().memoizedState;
			return [typeof e == "boolean" ? e : Ya(e), t];
		}
		function ns() {
			var e = no(Qa)[0], t = qa().memoizedState;
			return [typeof e == "boolean" ? e : Ya(e), t];
		}
		function rs() {
			return hi($T);
		}
		function is() {
			var e = Ka(), t = pC.identifierPrefix;
			if (q) {
				var n = $v, r = Qv;
				n = (r & ~(1 << 32 - Ah(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Lx++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Bx++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function as() {
			return Ka().memoizedState = os.bind(null, X);
		}
		function os(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = Yl(n), i = ha(r), a = ga(n, i, r);
						a !== null && (Ci(r, "refresh()", e), Ql(a, n, r), _a(a, n, r)), e = vi(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function ss(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Yl(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			ds(e) ? fs(t, i) : (i = wr(e, t, i, r), i !== null && (Ci(r, "dispatch()", e), Ql(i, e, r), ps(i, t, r)));
		}
		function cs(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Yl(e), ls(e, t, n, r) && Ci(r, "setState()", e);
		}
		function ls(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (ds(e)) fs(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = W.H;
					W.H = Zx;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, H_(c, s)) return Cr(e, t, i, 0), pC === null && Sr(), !1;
					} catch {} finally {
						W.H = o;
					}
				}
				if (n = wr(e, t, i, r), n !== null) return Ql(n, e, r), ps(n, t, r), !0;
			}
			return !1;
		}
		function us(e, t, n, r) {
			if (W.T === null && cb === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: ad(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, ds(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = wr(e, n, r, 2), t !== null && (Ci(2, "setOptimistic()", e), Ql(t, e, 2));
		}
		function ds(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function fs(e, t) {
			Fx = Px = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function ps(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ze(e, n);
			}
		}
		function ms(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				lS.has(t) || (lS.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function hs(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Bv) {
				ze(!0);
				try {
					a = n(r, i);
				} finally {
					ze(!1);
				}
			}
			a === void 0 && (t = fe(t) || "Component", aS.has(t) || (aS.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : U({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function gs(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Bv) {
					ze(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						ze(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", fe(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Wn(n, r) || !Wn(i, a) : !0;
		}
		function _s(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = D(e) || "Component", eS.has(e) || (eS.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), uS.enqueueReplaceState(t, t.state, null));
		}
		function vs(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = U({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function ys(e) {
			dv(e), console.warn("%s\n\n%s\n", dS ? "An error occurred in the <" + dS + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function bs(e) {
			var t = dS ? "The above error occurred in the <" + dS + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((fS || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, eE + " " + e[0], tE, rE + r + rE, nE) : e.splice(0, 0, eE, tE, rE + r + rE, nE), e.unshift(console), r = iE.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function xs(e) {
			dv(e);
		}
		function Ss(e, t) {
			try {
				dS = t.source ? D(t.source) : null, fS = null;
				var n = t.value;
				if (W.actQueue !== null) W.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function Cs(e, t, n) {
			try {
				dS = n.source ? D(n.source) : null, fS = D(t);
				var r = e.onCaughtError;
				r(n.value, {
					componentStack: n.stack,
					errorBoundary: t.tag === 1 ? t.stateNode : null
				});
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function ws(e, t, n) {
			return n = ha(n), n.tag = lx, n.payload = { element: null }, n.callback = function() {
				j(t.source, Ss, e, t);
			}, n;
		}
		function Ts(e) {
			return e = ha(e), e.tag = lx, e;
		}
		function Es(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					Ar(n), j(r.source, Cs, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				Ar(n), j(r.source, Cs, t, n, r), typeof i != "function" && (KC === null ? KC = /* @__PURE__ */ new Set([this]) : KC.add(this)), Mb(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", D(n) || "Unknown");
			});
		}
		function Ds(e, t, n, r, i) {
			if (n.flags |= 32768, kh && qu(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && fi(t, n, i, !0), q && (ny = !0), n = gx.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13:
						case 19: return _x === null ? fu() : n.alternate === null && AC === aC && (AC = cC), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Wb ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Ru(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Wb ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Ru(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Ru(e, r, i), fu(), !1;
			}
			if (q) return ny = !0, t = gx.current, t === null ? (r !== oy && ai(Hr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Hr(r, n), i = ws(e.stateNode, r, i), va(e, i), AC !== lC && (AC = sC)) : (t.tag === 19 && console.error("SuspenseList should never catch while hydrating. This is a bug in React."), !(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== oy && ai(Hr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Hr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (IC === null ? IC = [a] : IC.push(a), AC !== lC && (AC = sC), t === null) return !0;
			r = Hr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ws(n.stateNode, r, e), va(n, e), !1;
					case 1:
						if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (KC === null || !KC.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = Ts(i), Es(i, e, n, r), va(n, i), !1;
						break;
					case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function Os(e, t, n, r) {
			t.child = e === null ? ax(t, null, n, r) : ix(t, e.child, n, r);
		}
		function ks(e, t, n, r, i) {
			n = n.render;
			var a = Or(n);
			if (a !== n && (n = a, e !== null && (mS = !0)), a = t.ref, "ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return mi(t), r = za(e, t, n, o, a, i), s = Ua(), e !== null && !mS ? (Wa(e, t, i), rc(e, t, i)) : (q && s && Gr(t), t.flags |= 1, Os(e, t, r, i), t.child);
		}
		function As(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Nr(a) && a.defaultProps === void 0 && n.compare === null ? (n = Or(a), t.tag = 15, t.type = n, Us(t, a), js(e, t, n, r, i)) : (e = Ir(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !ic(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Wn : n, n(o, r) && e.ref === t.ref) return rc(e, t, i);
			}
			return t.flags |= 1, e = Pr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function js(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Wn(a, r) && e.ref === t.ref && t.type === e.type) {
					if (mS = !1, t.pendingProps = r = a, ic(e, i)) e.flags & 131072 && (mS = !0);
					else return t.lanes = e.lanes, rc(e, t, i);
				}
			}
			return zs(e, t, n, r, i);
		}
		function Ms(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: jv,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return Ps(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && Ki(t, a === null ? null : a.cachePool), a === null ? Ta(t) : wa(t, a), ka(t);
				else return r = t.lanes = 536870912, Ps(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && Ki(t, null), Ta(t), Aa(t)) : (Ki(t, a.cachePool), wa(t, a), Aa(t), t.memoizedState = null);
			return Os(e, t, i, n), t.child;
		}
		function Ns(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: jv,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function Ps(e, t, n, r, i) {
			var a = Gi();
			return a = a === null ? null : {
				parent: gy._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && Ki(t, null), Ta(t), ka(t), e !== null && fi(e, t, r, !0), t.childLanes = i, null;
		}
		function Fs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = Js({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function Is(e, t, n) {
			return ix(t, e.child, null, n), e = Fs(t, t.pendingProps), e.flags |= 2, ja(t), t.memoizedState = null, e;
		}
		function Ls(e, t, n) {
			var r = t.pendingProps, i = !!(t.flags & 128);
			if (t.flags &= -129, e === null) {
				if (q) {
					if (r.mode === "hidden") return e = Fs(t, r), t.lanes = 536870912, e.memoizedState = {
						baseLanes: 0,
						cachePool: null
					}, Ns(null, e);
					if (Oa(t), (e = ty) ? (n = Xf(e, ay), n = n !== null && n.data === rT ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: qr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Br(n), r.return = t, t.child = r, ey = t, ty = null)) : n = null, n === null) throw Qr(t, e), $r(t);
					return t.lanes = 536870912, null;
				}
				return Fs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (Oa(t), i) {
					if (t.flags & 256) t.flags &= -257, t = Is(e, t, n);
					else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
					else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				} else if (Zr(), n & 536870912 && du(t), mS || fi(e, t, n, !1), i = (n & e.childLanes) !== 0, mS || i) {
					if (mx.current === null) {
						if (r = pC, r !== null && (o = Qe(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, Tr(e, o), Ql(r, e, o), pS;
						fu();
					}
					t = Is(e, t, n);
				} else e = a.treeContext, ty = ep(o.nextSibling), ey = t, q = !0, iy = null, ny = !1, ry = null, ay = !1, e !== null && Jr(t, e), t = Fs(t, r), t.flags |= 134221824;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && du(t), e = Pr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function Rs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function zs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = fe(n) || "Unknown";
				hS[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), hS[a] = !0);
			}
			return t.mode & Bv && fb.recordLegacyContextWarning(t, null), e === null && (Us(t, t.type), n.contextTypes && (a = fe(n) || "Unknown", _S[a] || (_S[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), mi(t), n = za(e, t, n, r, void 0, i), r = Ua(), e !== null && !mS ? (Wa(e, t, i), rc(e, t, i)) : (q && r && Gr(t), t.flags |= 1, Os(e, t, n, i), t.child);
		}
		function Bs(e, t, n, r, i, a) {
			return mi(t), Ux = -1, Wx = e !== null && e.type !== t.type, t.updateQueue = null, n = Va(t, r, n, i), Ba(e, t), r = Ua(), e !== null && !mS ? (Wa(e, t, a), rc(e, t, a)) : (q && r && Gr(t), t.flags |= 1, Os(e, t, n, a), t.child);
		}
		function Vs(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = pC, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = Ts(c), Es(c, o, t, Hr(a, t)), va(t, c);
			}
			if (mi(t), t.stateNode === null) {
				if (o = Iv, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== km) && !cS.has(n) && (cS.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Om ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", fe(n) || "Component", c)), typeof a == "object" && a && (o = hi(a)), a = new n(r, o), t.mode & Bv) {
					ze(!0);
					try {
						a = new n(r, o);
					} finally {
						ze(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = uS, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = $x, typeof n.getDerivedStateFromProps == "function" && o === null && (o = fe(n) || "Component", tS.has(o) || (tS.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var l = c = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? c = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (c = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? l = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (l = "UNSAFE_componentWillUpdate"), o !== null || c !== null || l !== null) {
						a = fe(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						rS.has(a) || (rS.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, c === null ? "" : "\n  " + c, l === null ? "" : "\n  " + l));
					}
				}
				a = t.stateNode, o = fe(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !sS.has(n) && (sS.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !oS.has(n) && (oS.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", fe(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || nS.has(n) || (nS.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", fe(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || Hm(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, pa(t), o = n.contextType, a.context = typeof o == "object" && o ? hi(o) : Iv, a.state === r && (o = fe(n) || "Component", iS.has(o) || (iS.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Bv && fb.recordLegacyContextWarning(t, a), fb.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (hs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", D(t) || "Component"), uS.enqueueReplaceState(a, a.state, null)), ba(t, r, a, i), ya(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = vs(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Iv, typeof l == "object" && l && (o = hi(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && _s(t, a, r, o), ux = !1;
				var p = t.memoizedState;
				a.state = p, ba(t, r, a, i), ya(), f = t.memoizedState, d || p !== f || ux ? (typeof u == "function" && (hs(t, n, u, r), f = t.memoizedState), (c = ux || gs(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456), a = !1);
			} else {
				a = t.stateNode, ma(e, t), o = t.memoizedProps, l = vs(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Iv, typeof f == "object" && f && (c = hi(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && _s(t, a, r, c), ux = !1, p = t.memoizedState, a.state = p, ba(t, r, a, i), ya();
				var m = t.memoizedState;
				o !== u || p !== m || ux || e !== null && e.dependencies !== null && pi(e.dependencies) ? (typeof d == "function" && (hs(t, n, d, r), m = t.memoizedState), (l = ux || gs(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && pi(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, Rs(e, t), o = !!(t.flags & 128), c || o) {
				if (c = t.stateNode, je(t), o && typeof n.getDerivedStateFromError != "function") n = null, Ey = -1;
				else if (n = Eb(c), t.mode & Bv) {
					ze(!0);
					try {
						Eb(c);
					} finally {
						ze(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = ix(t, e.child, null, i), t.child = ix(t, null, n, i)) : Os(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = rc(e, t, i);
			return i = t.stateNode, a && i.props !== r && (yS || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", D(t) || "a component"), yS = !0), e;
		}
		function Hs(e, t, n, r) {
			return ri(), t.flags |= 256, Os(e, t, n, r), t.child;
		}
		function Us(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = fe(t) || "Unknown", vS[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), vS[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = fe(t) || "Unknown", gS[t] || (console.error("%s: Function components do not support contextType.", t), gS[t] = !0));
		}
		function Ws(e) {
			return {
				baseLanes: e,
				cachePool: qi()
			};
		}
		function Gs(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= PC), e;
		}
		function Ks(e, t, n) {
			var r = t.pendingProps;
			o(t) && (t.flags |= 128);
			var i = !1, a = !!(t.flags & 128), s;
			if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (bx.current & yx) !== 0), s && (i = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
				if (q) {
					if (i ? Da(t) : Aa(t), (e = ty) ? (n = Xf(e, ay), n = n !== null && n.data !== rT ? n : null, n !== null && (s = {
						dehydrated: n,
						treeContext: qr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = s, s = Br(n), s.return = t, t.child = s, ey = t, ty = null)) : n = null, n === null) throw Qr(t, e), $r(t);
					return t.lanes = Qf(n) ? 32 : 536870912, null;
				}
				return a = r.children, r = r.fallback, i ? (Aa(t), i = t.mode, a = Js({
					mode: "hidden",
					children: a
				}, i), r = Rr(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Ws(n), r.childLanes = Gs(e, s, n), t.memoizedState = CS, Ns(null, r)) : (Da(t), qs(t, a));
			}
			var c = e.memoizedState;
			if (c !== null) {
				var l = c.dehydrated;
				if (l !== null) return Xs(e, t, a, s, r, l, c, n);
			}
			return i ? (Aa(t), i = r.fallback, a = t.mode, c = e.child, l = c.sibling, r = Pr(c, {
				mode: "hidden",
				children: r.children
			}), r.subtreeFlags = c.subtreeFlags & 1206910976, l === null ? (i = Rr(i, a, n, null), i.flags |= 2) : i = Pr(l, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Ns(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Ws(n) : (a = i.cachePool, a === null ? a = qi() : (c = gy._currentValue, a = a.parent === c ? a : {
				parent: c,
				pool: c
			}), i = {
				baseLanes: i.baseLanes | n,
				cachePool: a
			}), r.memoizedState = i, r.childLanes = Gs(e, s, n), t.memoizedState = CS, Ns(e.child, r)) : (c !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && du(t), Da(t), n = e.child, e = n.sibling, n = Pr(n, {
				mode: "visible",
				children: r.children
			}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function qs(e, t) {
			return t = Js({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function Js(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function Ys(e, t, n) {
			return ix(t, e.child, null, n), e = qs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function Xs(e, t, n, r, i, a, o, s) {
			if (n) {
				if (t.flags & 256) return Da(t), t.flags &= -257, Ys(e, t, s);
				if (t.memoizedState !== null) return Aa(t), t.child = e.child, t.flags |= 128, null;
				Aa(t);
				var c = i.fallback, l = t.mode, u = Js({
					mode: "visible",
					children: i.children
				}, l);
				return c = Rr(c, l, s, null), c.flags |= 2, u.return = t, c.return = t, u.sibling = c, t.child = u, ix(t, e.child, null, s), c = t.child, c.memoizedState = Ws(s), c.childLanes = Gs(e, r, s), t.memoizedState = CS, Ns(null, c);
			}
			if (Da(t), Zr(), s & 536870912 && du(t), Qf(a)) {
				if (r = a.nextSibling && a.nextSibling.dataset, r) {
					c = r.dgst;
					var d = r.msg;
					l = r.stck, u = r.cstck;
				}
				return a = d, o = c, i = l, r = u, c = o, l = a, u = i, i = r, c !== Sb && (r = Error(l || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), r.stack = u || "", r.digest = c, c = i === void 0 ? null : i, l = {
					value: r,
					source: null,
					stack: c
				}, typeof c == "string" && Wv.set(r, l), ai(l)), Ys(e, t, s);
			}
			if (mS || fi(e, t, s, !1), r = (s & e.childLanes) !== 0, mS || r) {
				if (mx.current !== null) return Ys(e, t, s);
				if (r = pC, r !== null && (c = Qe(r, s), c !== 0 && c !== o.retryLane)) throw o.retryLane = c, Tr(e, c), Ql(r, e, c), pS;
				return Zf(a) || fu(), Ys(e, t, s);
			}
			return Zf(a) ? (t.flags |= 192, t.child = e.child, null) : (e = o.treeContext, ty = ep(a.nextSibling), ey = t, q = !0, iy = null, ny = !1, ry = null, ay = !1, e !== null && Jr(t, e), t = qs(t, i.children), t.flags |= 134221824, t);
		}
		function Zs(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), ui(e.return, t, n);
		}
		function Qs(e) {
			for (var t = null; e !== null;) {
				var n = e.alternate;
				n !== null && Pa(n) === null && (t = e), e = e.sibling;
			}
			return t;
		}
		function $s(e, t, n, r, i, a) {
			var o = e.memoizedState;
			o === null ? e.memoizedState = {
				isBackwards: t,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: n,
				tailMode: i,
				treeForkCount: a
			} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
		}
		function ec(e) {
			var t = e.child;
			for (e.child = null; t !== null;) {
				var n = t.sibling;
				t.sibling = e.child, e.child = t, t = n;
			}
		}
		function tc(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = bx.current;
			if (t.flags & 128) return Ma(t, s), null;
			if ((r = (s & yx) !== 0) ? (s = s & vx | yx, t.flags |= 128) : s &= vx, Ma(t, s), s = i ?? "null", i != null && i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !bS[s]) {
				if (bS[s] = !0, typeof i == "string") switch (i.toLowerCase()) {
					case "together":
					case "forwards":
					case "backwards":
					case "independent":
						console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
						break;
					case "forward":
					case "backward":
						console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
						break;
					default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
				}
				else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			s = a ?? "null", xS[s] || a == null || (a !== "visible" && a !== "collapsed" && a !== "hidden" ? (xS[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i != null && i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (xS[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" (default) or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i == null || i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) {
				if (Hm(o)) {
					for (s = 0; s < o.length; s++) if (!fa(o[s], s)) break a;
				} else if (s = de(o), typeof s == "function") {
					if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
						if (!fa(c.value, l)) break a;
						l++;
					}
				} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			}
			if (i === "backwards" && e !== null ? (ec(e), Os(e, t, o, n), ec(e)) : Os(e, t, o, n), q ? (Yr(), o = Jv) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Zs(e, n, t);
				else if (e.tag === 19) Zs(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			switch (i) {
				case "backwards":
					n = Qs(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, ec(t)), $s(t, !0, i, null, a, o);
					break;
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && Pa(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					$s(t, !0, n, null, a, o);
					break;
				case "together":
					$s(t, !1, null, null, void 0, o);
					break;
				case "independent":
					t.memoizedState = null;
					break;
				default: n = Qs(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), $s(t, !1, i, n, a, o);
			}
			return t.child;
		}
		function nc(e, t, n) {
			var r = t.type, i = t.pendingProps, a = i.value;
			return "value" in i || wS || (wS = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), ci(t, r, a), Os(e, t, i.children, n), t.child;
		}
		function rc(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), Ey = -1, jC |= t.lanes, (n & t.childLanes) === 0) {
				if (e !== null) {
					if (fi(e, t, n, !1), (n & t.childLanes) === 0) return null;
				} else return null;
			}
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Pr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Pr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function ic(e, t) {
			return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && pi(e)));
		}
		function ac(e, t, n) {
			switch (t.tag) {
				case 3:
					ve(t, t.stateNode.containerInfo), ci(t, gy, e.memoizedState.cache), ri();
					break;
				case 27:
				case 5:
					xe(t);
					break;
				case 4:
					ve(t, t.stateNode.containerInfo);
					break;
				case 10:
					ci(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, Oa(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) {
						if (r.dehydrated !== null) return Da(t), t.flags |= 128, null;
						r = fi(e, t, n, !1);
						var i = t.child.childLanes;
						return r || (n & i) !== 0 ? Ks(e, t, n) : (Da(t), e = rc(e, t, n), e === null ? null : e.sibling);
					}
					Da(t);
					break;
				case 19:
					if (t.flags & 128) return tc(e, t, n);
					if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (fi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return tc(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ma(t, bx.current), r) break;
					return null;
				case 22: return t.lanes = 0, Ms(e, t, n, t.pendingProps);
				case 24: ci(t, gy, e.memoizedState.cache);
			}
			return rc(e, t, n);
		}
		function oc(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Ir(Or(t.elementType), t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 134217730, n;
			}
			if (e !== null) {
				if (e.memoizedProps !== t.pendingProps || t.type !== e.type) mS = !0;
				else {
					if (!ic(e, n) && !(t.flags & 128)) return mS = !1, ac(e, t, n);
					mS = !!(e.flags & 131072);
				}
			} else mS = !1, (r = q) && (Yr(), r = !!(t.flags & 1048576)), r && (r = t.index, Yr(), Wr(t, Jv, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Zi(t.elementType), e = Or(e), t.type = e, typeof e == "function") Nr(e) ? (r = vs(e, r), t.tag = 1, t = Vs(null, t, e, r, n)) : (t.tag = 0, Us(t, e), t = zs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Am) {
								t.tag = 11, t = ks(null, t, e, r, n);
								break a;
							}
							if (i === Nm) {
								t.tag = 14, t = As(null, t, e, r, n);
								break a;
							}
							if (i === km) {
								t.tag = 10, t.type = e, t = nc(null, t, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Pm && (t = " Did you wrap a component in React.lazy() more than once?"), n = fe(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return zs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = vs(r, t.pendingProps), Vs(e, t, r, i, n);
				case 3:
					a: {
						if (ve(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, ma(e, t), ba(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, ci(t, gy, r), r !== a.cache && di(t, [gy], n, !0), ya(), r = o.element, a.isDehydrated) {
							if (a = {
								element: r,
								isDehydrated: !1,
								cache: o.cache
							}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
								t = Hs(e, t, r, n);
								break a;
							}
							if (r !== i) {
								i = Hr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), ai(i), t = Hs(e, t, r, n);
								break a;
							}
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (ty = ep(e.firstChild), ey = t, q = !0, iy = null, ny = !1, ry = null, ay = !0, n = ax(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
						} else {
							if (ri(), r === i) {
								t = rc(e, t, n);
								break a;
							}
							Os(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return Rs(e, t), e === null ? (n = gp(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : q || (t.stateNode = Gd(t.type, t.pendingProps, _e(Xm.current), t)) : t.memoizedState = gp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return xe(t), e === null && q && (r = _e(Xm.current), i = be(), r = t.stateNode = up(t.type, t.pendingProps, r, i, !1), ny || (i = Rd(r, t.type, t.pendingProps, i), i !== null && (Xr(t, 0).serverProps = i)), ey = t, ay = !0, i = ty, af(t.type) ? (FT = i, ty = ep(r.firstChild)) : ty = i), Os(e, t, t.pendingProps.children, n), Rs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && q && (a = be(), r = nn(t.type, a.ancestorInfo), i = ty, (o = !i) || (o = Jf(i, t.type, t.pendingProps, ay), o === null ? a = !1 : (t.stateNode = o, ny || (a = Rd(o, t.type, t.pendingProps, a), a !== null && (Xr(t, 0).serverProps = a)), ey = t, ty = ep(o.firstChild), ay = !1, a = !0), o = !a), o && (r && Qr(t, i), $r(t))), xe(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, qd(i, a) ? r = null : o !== null && qd(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = za(e, t, Ha, null, null, n), $T._currentValue = i), Rs(e, t), Os(e, t, r, n), t.child;
				case 6: return e === null && q && (n = t.pendingProps, e = be(), r = e.ancestorInfo.current, n = r == null || rn(n, r.tag, e.ancestorInfo.implicitRootScope), e = ty, (r = !e) || (r = Yf(e, t.pendingProps, ay), r === null ? r = !1 : (t.stateNode = r, ey = t, ty = null, r = !0), r = !r), r && (n && Qr(t, e), $r(t))), null;
				case 13: return Ks(e, t, n);
				case 4: return ve(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ix(t, null, r, n) : Os(e, t, r, n), t.child;
				case 11: return ks(e, t, t.type, t.pendingProps, n);
				case 7: return r = t.pendingProps, Rs(e, t), Os(e, t, r, n), t.child;
				case 8: return Os(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, Os(e, t, t.pendingProps.children, n), t.child;
				case 10: return nc(e, t, n);
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), mi(t), i = hi(i), r = wb(r, i, void 0), t.flags |= 1, Os(e, t, r, n), t.child;
				case 14: return As(e, t, t.type, t.pendingProps, n);
				case 15: return js(e, t, t.type, t.pendingProps, n);
				case 19: return tc(e, t, n);
				case 31: return Ls(e, t, n);
				case 22: return Ms(e, t, n, t.pendingProps);
				case 24: return mi(t), r = hi(gy), e === null ? (i = Gi(), i === null && (i = pC, a = vi(), i.pooledCache = a, yi(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, pa(t), ci(t, gy, i)) : ((e.lanes & n) !== 0 && (ma(e, t), ba(t, null, null, n), ya()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ci(t, gy, r), r !== i.cache && di(t, [gy], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ci(t, gy, r))), Os(e, t, t.pendingProps.children, n), t.child;
				case 30: return t.stateNode === null && (t.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : q && Gr(t), r.className !== void 0 && (i = typeof r.className == "string" ? JSON.stringify(r.className) : "{...}", SS[i] || (SS[i] = !0, console.error("<ViewTransition> doesn't accept a \"className\" prop. It has been renamed to \"default\".\n-   <ViewTransition className=%s>\n+   <ViewTransition default=%s>", i, i))), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Rs(e, t), Os(e, t, r.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function sc(e) {
			e.flags |= 4;
		}
		function cc(e, t, n, r, i) {
			var a;
			if ((a = (e.mode & Hv) !== G) && (a = n === null ? jp(t, r) : jp(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
				if (e.flags |= 16777216, (i & 335544128) === i) {
					if (e.stateNode.complete) e.flags |= 8192;
					else if (cu()) e.flags |= 8192;
					else throw Jb = Wb, Hb;
				}
			} else e.flags &= -16777217;
		}
		function lc(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & BT) !== IT) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Mp(t)) {
				if (cu()) e.flags |= 8192;
				else throw Jb = Wb, Hb;
			}
		}
		function uc(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ke(), e.lanes |= t, FC |= t);
		}
		function dc(e, t) {
			if (!q) switch (e.tailMode) {
				case "visible": break;
				case "collapsed":
					for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
					r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
					break;
				default:
					for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
					n === null ? e.tail = null : n.sibling = null;
			}
		}
		function fc(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) {
				if ((e.mode & K) !== G) {
					for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 1206910976, r |= a.flags & 1206910976, i += a.treeBaseDuration, a = a.sibling;
					e.treeBaseDuration = i;
				} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
			} else if ((e.mode & K) !== G) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function pc(e, t, n) {
			var r = t.pendingProps;
			switch (Kr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return fc(t), null;
				case 1: return fc(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), li(gy, t), ye(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ni(t) ? (oi(), sc(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ii())), fc(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (sc(t), a === null ? (fc(t), cc(t, i, null, r, n)) : (fc(t), lc(t, a))) : a ? a === e.memoizedState ? (fc(t), t.flags &= -16777217) : (sc(t), fc(t), lc(t, a)) : (e = e.memoizedProps, e !== r && sc(t), fc(t), cc(t, i, e, r, n)), null;
				case 27:
					if (Se(t), n = _e(Xm.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && sc(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return fc(t), t.subtreeFlags &= -33554433, null;
						}
						e = be(), ni(t) ? ei(t, e) : (e = up(i, r, n, e, !0), t.stateNode = e, sc(t));
					}
					return fc(t), t.subtreeFlags &= -33554433, null;
				case 5:
					if (Se(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && sc(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return fc(t), t.subtreeFlags &= -33554433, null;
						}
						var o = be();
						if (ni(t)) ei(t, o);
						else {
							switch (a = _e(Xm.current), nn(i, o.ancestorInfo), o = o.context, a = Hd(a), o) {
								case vT:
									a = a.createElementNS(Ng, i);
									break;
								case yT:
									a = a.createElementNS(Mg, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Ng, i);
										break;
									case "math":
										a = a.createElementNS(Mg, i);
										break;
									case "script":
										a = a.createElement("div"), ST || Kd(r) || (console.error("Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client. Consider using template tag instead (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)."), ST = !0), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || fh.call(CT, i) || (CT[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Vh] = t, a[Hh] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (Od(a, i, r), i) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break a;
								case "img":
									r = !0;
									break a;
								default: r = !1;
							}
							r && sc(t);
						}
					}
					return fc(t), t.subtreeFlags &= -33554433, cc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && sc(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = _e(Xm.current), n = be(), ni(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !ny, r = null, a = ey, a !== null) switch (a.tag) {
								case 3:
									i && (i = np(e, n, r), i !== null && (Xr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = np(e, n, r), i !== null && (Xr(t, 0).serverProps = i));
							}
							e[Vh] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Td(e.nodeValue, n)), e || $r(t, !0);
						} else i = n.ancestorInfo.current, i != null && rn(r, i.tag, n.ancestorInfo.implicitRootScope), e = Hd(e).createTextNode(r), e[Vh] = t, t.stateNode = e;
					}
					return fc(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = ni(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Vh] = t, fc(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else oi(), ri(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, fc(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = ii(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ja(t), t) : (ja(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return fc(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = ni(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Vh] = t, fc(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else oi(), ri(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, fc(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = ii(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ja(t), t) : (ja(t), null);
					}
					return ja(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && Vi(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), uc(t, t.updateQueue), fc(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return ye(t), e === null && ud(t.stateNode.containerInfo), t.flags |= 67108864, fc(t), null;
				case 10: return li(t.type, t), fc(t), null;
				case 19:
					if (Na(t), r = t.memoizedState, r === null) return fc(t), null;
					if (i = !!(t.flags & 128), a = r.rendering, a === null) {
						if (i) dc(r, !1);
						else {
							if (AC !== aC || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
								if (a = Pa(e), a !== null) {
									for (t.flags |= 128, dc(r, !1), e = a.updateQueue, t.updateQueue = e, uc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Fr(n, e), n = n.sibling;
									return Ma(t, bx.current & vx | yx), q && Ur(t, r.treeForkCount), t.child;
								}
								e = e.sibling;
							}
							r.tail !== null && _h() > HC && (t.flags |= 128, i = !0, dc(r, !1), t.lanes = 4194304);
						}
					} else {
						if (!i) {
							if (e = Pa(a), e !== null) {
								if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, uc(t, e), dc(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !a.alternate && !q) return fc(t), null;
							} else 2 * _h() - r.renderingStartTime > HC && n !== 536870912 && (t.flags |= 128, i = !0, dc(r, !1), t.lanes = 4194304);
						}
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					if (r.tail !== null) {
						e = r.tail;
						a: {
							for (n = e; n !== null;) {
								if (n.alternate !== null) {
									n = !1;
									break a;
								}
								n = n.sibling;
							}
							n = !0;
						}
						return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = _h(), e.sibling = null, a = bx.current, a = i ? a & vx | yx : a & vx, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || q ? Ma(t, a) : (n = a, ge(gx, t, t), ge(bx, n, t), _x === null && (_x = t)), q && Ur(t, r.treeForkCount), e;
					}
					return fc(t), null;
				case 22:
				case 23: return ja(t), Ea(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (fc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : fc(t), n = t.updateQueue, n !== null && uc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && he(db, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), li(gy, t), fc(t), null;
				case 25: return null;
				case 30: return t.flags |= 33554432, fc(t), null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function mc(e, t) {
			switch (Kr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Vi(t), t) : null;
				case 3: return li(gy, t), ye(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return Se(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ja(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						ri();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Vi(t), t) : null;
				case 13:
					if (ja(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						ri();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Vi(t), t) : null;
				case 19: return Na(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
				case 4: return ye(t), null;
				case 10: return li(t.type, t), null;
				case 22:
				case 23: return ja(t), Ea(t), e !== null && he(db, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Vi(t), t) : null;
				case 24: return li(gy, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function hc(e, t) {
			switch (Kr(t), t.tag) {
				case 3:
					li(gy, t), ye(t);
					break;
				case 26:
				case 27:
				case 5:
					Se(t);
					break;
				case 4:
					ye(t);
					break;
				case 31:
					t.memoizedState !== null && ja(t);
					break;
				case 13:
					ja(t);
					break;
				case 19:
					Na(t);
					break;
				case 10:
					li(t.type, t);
					break;
				case 22:
				case 23:
					ja(t), Ea(t), e !== null && he(db, t);
					break;
				case 24: li(gy, t);
			}
		}
		function gc(e) {
			return (e.mode & K) !== G;
		}
		function _c(e, t) {
			gc(e) ? (Bi(), yc(t, e), Ri()) : yc(t, e);
		}
		function vc(e, t, n) {
			gc(e) ? (Bi(), bc(n, e, t), Ri()) : bc(n, e, t);
		}
		function yc(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & Cx) !== xx && (Tw = !0), r = j(t, Ib, n), (e & Cx) !== xx && (Tw = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & wx) === 0 ? (n.tag & Cx) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, j(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Lu(t, t.return, e);
			}
		}
		function bc(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & Cx) !== xx && (Tw = !0), i = t, j(i, Rb, i, n, s), (e & Cx) !== xx && (Tw = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Lu(t, t.return, e);
			}
		}
		function xc(e, t) {
			gc(e) ? (Bi(), yc(t, e), Ri()) : yc(t, e);
		}
		function Sc(e, t, n) {
			gc(e) ? (Bi(), bc(n, e, t), Ri()) : bc(n, e, t);
		}
		function Cc(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || yS || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(e) || "instance"));
				try {
					j(e, Ca, t, n);
				} catch (t) {
					Lu(e, e.return, t);
				}
			}
		}
		function wc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function Tc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || yS || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(e) || "instance"));
			try {
				var i = vs(e.type, n), a = j(e, wc, t, i, r);
				n = TS, a !== void 0 || n.has(e.type) || (n.add(e.type), j(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", D(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Lu(e, e.return, t);
			}
		}
		function Ec(e, t, n) {
			n.props = vs(e.type, e.memoizedProps), n.state = e.memoizedState, gc(e) ? (Bi(), j(e, Pb, e, t, n), Ri()) : j(e, Pb, e, t, n);
		}
		function Dc(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						var r = tr(e.memoizedProps, n);
						(n.ref === null || n.ref.name !== r) && (n.ref = Df(r)), n = n.ref;
						break;
					case 7:
						e.stateNode === null && (n = new Of(e), w(e, Uf, n), e.stateNode = n), n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") {
					if (gc(e)) try {
						Bi(), e.refCleanup = t(n);
					} finally {
						Ri();
					}
					else e.refCleanup = t(n);
				} else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", D(e)), t.current = n;
			}
		}
		function Oc(e, t) {
			try {
				j(e, Dc, e);
			} catch (n) {
				Lu(e, t, n);
			}
		}
		function kc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) {
				if (typeof r == "function") try {
					if (gc(e)) try {
						Bi(), j(e, r);
					} finally {
						Ri(e);
					}
					else j(e, r);
				} catch (n) {
					Lu(e, t, n);
				} finally {
					e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
				}
				else if (typeof n == "function") try {
					if (gc(e)) try {
						Bi(), j(e, n, null);
					} finally {
						Ri(e);
					}
					else j(e, n, null);
				} catch (n) {
					Lu(e, t, n);
				}
				else n.current = null;
			}
		}
		function Ac(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", ib && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function jc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", ib && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function Mc(e, t) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) Gf(e.stateNode, t[n]);
		}
		function Nc(e) {
			for (var t = e.return; t !== null && (Ic(t) && Gf(e.stateNode, t.stateNode), !Fc(t));) t = t.return;
		}
		function Pc(e) {
			for (var t = e.return; t !== null && (Ic(t) && Kf(e.stateNode, t.stateNode), !Fc(t));) t = t.return;
		}
		function Fc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 27;
		}
		function Ic(e) {
			return e && e.tag === 7 && e.stateNode !== null;
		}
		function Lc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				j(e, Qd, r, t, n, e);
			} catch (t) {
				Lu(e, e.return, t);
			}
		}
		function Rc(e, t, n) {
			try {
				j(e, ef, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Lu(e, e.return, t);
			}
		}
		function zc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && af(e.type) || e.tag === 4;
		}
		function Bc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || zc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && af(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function Vc(e, t, n, r) {
			var i = e.tag;
			if (i === 5 || i === 6) i = e.stateNode, t ? (rf(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t)) : (rf(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), i = n._reactRootContainer, i != null || t.onclick !== null || (t.onclick = hn)), Mc(e, r), rg = !0;
			else if (i !== 4 && (i === 27 && (Mc(e, r), r = null, af(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Vc(e, t, n, r), e = e.sibling; e !== null;) Vc(e, t, n, r), e = e.sibling;
		}
		function Hc(e, t, n, r) {
			var i = e.tag;
			if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Mc(e, r), rg = !0;
			else if (i !== 4 && (i === 27 && (Mc(e, r), r = null, af(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Hc(e, t, n, r), e = e.sibling; e !== null;) Hc(e, t, n, r), e = e.sibling;
		}
		function Uc(e) {
			for (var t, n = e.return; n !== null;) {
				if (zc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			n = null;
			for (var r = e.return; r !== null;) {
				if (Ic(r)) {
					var i = r.stateNode;
					n === null ? n = [i] : n.push(i);
				}
				if (Fc(r)) break;
				r = r.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, r = Bc(e), Hc(e, r, t, n);
					break;
				case 5:
					r = t.stateNode, t.flags & 32 && (tf(r), t.flags &= -33), t = Bc(e), Hc(e, t, r, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, r = Bc(e), Vc(e, r, t, n);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function Wc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				j(e, dp, e.type, n, t, e);
			} catch (t) {
				Lu(e, e.return, t);
			}
		}
		function Gc(e) {
			(e.tag === 30 || e.subtreeFlags & 33554432) && (ES = !0);
		}
		function Kc() {
			var e = OS;
			return OS = null, e;
		}
		function qc(e, t, n, r, i) {
			return kS = 0, (t = Jc(e.child, t, n, r, i)) && e._debugTask != null && tb === null && (tb = e._debugTask), t;
		}
		function Jc(e, t, n, r, i) {
			for (var a = !1; e !== null;) {
				if (e.tag === 5) {
					var o = e.stateNode;
					if (r !== null) {
						var s = bf(o);
						r.push(s), s.view && (a = !0);
					} else a || bf(o).view && (a = !0);
					ES = !0, _f(o, kS === 0 ? t : t + "_" + kS, n), kS++;
				} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Jc(e.child, t, n, r, i) && (a = !0));
				e = e.sibling;
			}
			return a;
		}
		function Yc(e, t) {
			for (; e !== null;) e.tag === 5 ? vf(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Yc(e.child, t)), e = e.sibling;
		}
		function Xc(e) {
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if ((e.tag !== 22 || e.memoizedState === null) && (Xc(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
					var t = e.memoizedProps;
					if (t.name == null || t.name === "auto") throw Error("Found a pair with an auto name. This is a bug in React.");
					var n = t.name;
					t = rr(t.default, t.share), t !== "none" && (qc(e, n, t, null, !1) || Yc(e.child, !1));
				}
				e = e.sibling;
			}
		}
		function Zc(e, t) {
			if (e.tag === 30) {
				var n = e.stateNode, r = e.memoizedProps, i = tr(r, n), a = rr(r.default, n.paired ? r.share : r.enter);
				a === "none" ? Xc(e) : qc(e, i, a, null, !1) ? (Xc(e), n.paired || t || Zl(e, r.onEnter)) : Yc(e.child, !1);
			} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Zc(e, t), e = e.sibling;
			else Xc(e);
		}
		function Qc(e) {
			if (DS !== null && DS.size !== 0) {
				var t = DS;
				if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
					if (e.tag !== 22 || e.memoizedState === null) {
						if (e.tag === 30 && e.flags & 18874368) {
							var n = e.memoizedProps, r = n.name;
							if (r != null && r !== "auto") {
								var i = t.get(r);
								if (i !== void 0) {
									var a = rr(n.default, n.share);
									if (a !== "none" && (qc(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Zl(e, n.onShare)) : Yc(e.child, !1)), t.delete(r), t.size === 0) break;
								}
							}
						}
						Qc(e);
					}
					e = e.sibling;
				}
			}
		}
		function $c(e) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = tr(t, e.stateNode), r = DS === null ? void 0 : DS.get(n), i = rr(t.default, r === void 0 ? t.exit : t.share);
				i !== "none" && (qc(e, n, i, null, !1) ? r === void 0 ? Zl(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, DS.delete(n), Zl(e, t.onShare)) : Yc(e.child, !1)), DS !== null && Qc(e);
			} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) $c(e), e = e.sibling;
			else DS !== null && Qc(e);
		}
		function el(e) {
			for (e = e.child; e !== null;) {
				if (e.tag === 30) {
					var t = e.memoizedProps, n = tr(t, e.stateNode);
					t = rr(t.default, t.update), e.flags &= -5, t !== "none" && qc(e, n, t, e.memoizedState = [], !1);
				} else e.subtreeFlags & 33554432 && el(e);
				e = e.sibling;
			}
		}
		function tl(e) {
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var t = e.stateNode;
						t.paired !== null && (t.paired = null, Yc(e.child, !1));
					}
					tl(e);
				}
				e = e.sibling;
			}
		}
		function nl(e) {
			if (e.tag === 30) e.stateNode.paired = null, Yc(e.child, !1), tl(e);
			else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) nl(e), e = e.sibling;
			else tl(e);
		}
		function rl(e) {
			for (e = e.child; e !== null;) e.tag === 30 ? Yc(e.child, !1) : e.subtreeFlags & 33554432 && rl(e), e = e.sibling;
		}
		function il(e, t, n, r, i, a, o) {
			for (var s = !1; t !== null;) {
				if (t.tag === 5) {
					var c = t.stateNode;
					if (a !== null && kS < a.length) {
						var l = a[kS], u = bf(c);
						(l.view || u.view) && (s = !0);
						var d;
						if (d = !(e.flags & 4)) {
							if (u.clip) d = !0;
							else {
								d = l.rect;
								var f = u.rect;
								d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
							}
						}
						d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
					} else e.flags |= 32;
					e.flags & 4 && _f(c, kS === 0 ? n : n + "_" + kS, i), s && e.flags & 4 || (OS === null && (OS = []), OS.push(c, kS === 0 ? r : r + "_" + kS, t.memoizedProps)), kS++;
				} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : il(e, t.child, n, r, i, a, o) && (s = !0));
				t = t.sibling;
			}
			return s;
		}
		function al(e, t) {
			for (e = e.child; e !== null;) {
				if (e.tag === 30) {
					var n = e.memoizedProps, r = e.stateNode, i = tr(n, r), a = rr(n.default, n.update);
					if (t) {
						r = r.clones;
						var o = r === null ? null : r.map(xf);
					} else o = e.memoizedState, e.memoizedState = null;
					r = e;
					var s = e.child, c = i;
					kS = 0, a = il(r, s, c, i, a, o, !1), e.flags & 4 && a && (t || Zl(e, n.onUpdate));
				} else e.subtreeFlags & 33554432 && al(e, t);
				e = e.sibling;
			}
		}
		function ol(e) {
			var t = e.memoizedProps.name;
			if (t != null && t !== "auto") {
				var n = AS.get(t);
				if (n !== void 0) {
					if (n !== e && n !== e.alternate && !jS[t]) {
						jS[t] = !0;
						var r = JSON.stringify(t);
						j(e, function() {
							console.error("There are two <ViewTransition name=%s> components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name.", r);
						}), j(n, function() {
							console.error("The existing <ViewTransition name=%s> duplicate has this stack trace.", r);
						});
					}
				} else AS.set(t, e);
			}
		}
		function sl(e) {
			var t = e.memoizedProps.name;
			if (t != null && t !== "auto") {
				var n = AS.get(t);
				n === void 0 || n !== e && n !== e.alternate || AS.delete(t);
			}
		}
		function cl(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && !(t.flags & 256);
		}
		function ll(e, t, n) {
			if (e = e.containerInfo, bT = gE, e = Yn(e), Xn(e)) {
				if ("selectionStart" in e) var r = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					r = (r = e.ownerDocument) && r.defaultView || window;
					var i = r.getSelection && r.getSelection();
					if (i && i.rangeCount !== 0) {
						r = i.anchorNode;
						var a = i.anchorOffset, o = i.focusNode;
						i = i.focusOffset;
						try {
							r.nodeType, o.nodeType;
						} catch {
							r = null;
							break a;
						}
						var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
						b: for (;;) {
							for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
							for (;;) {
								if (f === e) break b;
								if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
								f = p, p = f.parentNode;
							}
							f = m;
						}
						r = c === -1 || l === -1 ? null : {
							start: c,
							end: l
						};
					} else r = null;
				}
				r ||= {
					start: 0,
					end: 0
				};
			} else r = null;
			for (xT = {
				focusedElem: e,
				selectionRange: r
			}, gE = !1, n = (n & 335544064) === n, BS = t, t = n ? 9270 : 1024; BS !== null;) {
				if (e = BS, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && $c(r[a]);
				if (e.alternate === null && e.flags & 2) n && Gc(e), ul(n);
				else {
					if (e.tag === 22) {
						if (r = e.alternate, e.memoizedState !== null) {
							r !== null && r.memoizedState === null && n && $c(r), ul(n);
							continue;
						}
						if (r !== null && r.memoizedState !== null) {
							n && Gc(e), ul(n);
							continue;
						}
					}
					r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, BS = r) : (n && el(e), ul(n));
				}
			}
			DS = null;
		}
		function ul(e) {
			for (; BS !== null;) {
				var t = BS, n = t, r = e, i = n.alternate, a = n.flags;
				switch (n.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						a & 1024 && i !== null && Tc(n, i);
						break;
					case 3:
						if (a & 1024) {
							if (r = n.stateNode.containerInfo, n = r.nodeType, n === 9) qf(r);
							else if (n === 1) switch (r.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									qf(r);
									break;
								default: r.textContent = "";
							}
						}
						break;
					case 5:
					case 26:
					case 27:
					case 6:
					case 4:
					case 17: break;
					case 30:
						r && i !== null && (r = i, i = n, n = tr(r.memoizedProps, r.stateNode), i = i.memoizedProps, i = rr(i.default, i.update), i !== "none" && qc(r, n, i, r.memoizedState = [], !0));
						break;
					default: if (a & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (r = t.sibling, r !== null) {
					r.return = t.return, BS = r;
					break;
				}
				BS = t.return;
			}
		}
		function dl(e, t, n) {
			var r = ki(), i = ji(), a = Ni(), o = Pi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Dl(e, n), s & 4 && _c(n, wx | Sx);
					break;
				case 1:
					if (Dl(e, n), s & 4) {
						if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || yS || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(n) || "instance")), gc(n) ? (Bi(), j(n, Ob, n, e), Ri()) : j(n, Ob, n, e);
						else {
							var c = vs(n.type, t.memoizedProps);
							t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || yS || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(n) || "instance")), gc(n) ? (Bi(), j(n, Ab, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Ri()) : j(n, Ab, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
						}
					}
					s & 64 && Cc(n), s & 512 && Oc(n, n.return);
					break;
				case 3:
					if (t = Ti(), Dl(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							j(n, Ca, s, c);
						} catch (e) {
							Lu(n, n.return, e);
						}
					}
					e.effectDuration += Ei(t);
					break;
				case 27: t === null && s & 4 && Wc(n);
				case 26:
				case 5:
					if (Dl(e, n), t === null) {
						if (s & 4) Lc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								j(n, $d, c, e, t, n);
							} catch (e) {
								Lu(n, n.return, e);
							}
						}
					}
					s & 512 && Oc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = Ti(), Dl(e, n), e = n.stateNode, e.effectDuration += Di(s);
						try {
							j(n, Ac, n, t, Cy, e.effectDuration);
						} catch (e) {
							Lu(n, n.return, e);
						}
					} else Dl(e, n);
					break;
				case 31:
					Dl(e, n), s & 4 && vl(e, n);
					break;
				case 13:
					Dl(e, n), s & 4 && yl(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Vu.bind(null, n), $f(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || FS, !s) {
						var l = t !== null && t.memoizedState !== null || IS;
						t = FS, c = IS, FS = s, (IS = l) && !c ? (s = PS, n.subtreeFlags & 8772 && (s |= NS), jl(e, n, s), (n.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(n, J, Y)) : Dl(e, n), FS = t, IS = c;
					}
					break;
				case 30:
					s & 18874368 && ol(n), Dl(e, n), s & 512 && Oc(n, n.return);
					break;
				case 7: s & 512 && Oc(n, n.return);
				default: Dl(e, n);
			}
			(n.mode & K) !== G && 0 <= J && 0 <= Y && ((Ay || .05 < Oy) && mr(n, J, Y, Oy, ky), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < Y - J && (cl(n.return.alternate, n.return) || ur(n, J, Y, "Mount"))), Ai(r), Mi(i), ky = a, Ay = o;
		}
		function fl(e, t) {
			for (e = e.child; e !== null;) pl(e, t), e = e.sibling;
		}
		function pl(e, t) {
			switch (e.tag) {
				case 5:
				case 26:
					try {
						var n = e.stateNode;
						t ? j(e, df, n) : j(e, mf, e.stateNode, e.memoizedProps);
					} catch (t) {
						Lu(e, e.return, t);
					}
					ml(e, t);
					break;
				case 6:
					try {
						var r = e.stateNode;
						t ? j(e, ff, r) : j(e, hf, r, e.memoizedProps), rg = !0;
					} catch (t) {
						Lu(e, e.return, t);
					}
					break;
				case 18:
					try {
						var i = e.stateNode;
						t ? j(e, uf, i) : j(e, pf, e.stateNode);
					} catch (t) {
						Lu(e, e.return, t);
					}
					break;
				case 22:
				case 23:
					e.memoizedState === null && fl(e, t);
					break;
				default: fl(e, t);
			}
		}
		function ml(e, t) {
			if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
				a: {
					var n = e, r = t;
					switch (n.tag) {
						case 4:
							pl(n, r);
							break a;
						case 22:
							n.memoizedState === null && ml(n, r);
							break a;
						default: ml(n, r);
					}
				}
				e = e.sibling;
			}
		}
		function hl(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, hl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && at(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function gl(e, t, n) {
			for (n = n.child; n !== null;) _l(e, t, n), n = n.sibling;
		}
		function _l(e, t, n) {
			if (Dh && typeof Dh.onCommitFiberUnmount == "function") try {
				Dh.onCommitFiberUnmount(Eh, n);
			} catch (e) {
				Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = ki(), i = ji(), a = Ni(), o = Pi();
			switch (n.tag) {
				case 26:
					IS || kc(n, t), gl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !IS && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					IS || kc(n, t), Pc(n);
					var s = qS, c = JS;
					af(n.type) && (qS = n.stateNode, JS = !1), gl(e, t, n), j(n, fp, n.stateNode, n.type, n.memoizedProps), qS = s, JS = c;
					break;
				case 5: IS || kc(n, t), Pc(n);
				case 6:
					if (n.tag === 6 && Pc(n), s = qS, c = JS, qS = null, gl(e, t, n), qS = s, JS = c, qS !== null) {
						if (JS) try {
							j(n, sf, qS, n.stateNode), rg = !0;
						} catch (e) {
							Lu(n, t, e);
						}
						else try {
							j(n, of, qS, n.stateNode), rg = !0;
						} catch (e) {
							Lu(n, t, e);
						}
					}
					break;
				case 18:
					qS !== null && (JS ? (e = qS, cf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), fm(e)) : cf(qS, n.stateNode));
					break;
				case 4:
					s = qS, c = JS, qS = n.stateNode.containerInfo, JS = !0, gl(e, t, n), qS = s, JS = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					bc(Cx, n, t), IS || vc(n, t, wx), gl(e, t, n);
					break;
				case 1:
					IS || (kc(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && Ec(n, t, s)), gl(e, t, n);
					break;
				case 21:
					gl(e, t, n);
					break;
				case 22:
					IS = (s = IS) || n.memoizedState !== null, gl(e, t, n), IS = s;
					break;
				case 30:
					n.flags & 18874368 && sl(n), kc(n, t), gl(e, t, n);
					break;
				case 7:
					IS || kc(n, t), gl(e, t, n);
					break;
				default: gl(e, t, n);
			}
			(n.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(n, J, Y, Oy, ky), Ai(r), Mi(i), ky = a, Ay = o;
		}
		function vl(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					j(t, op, e);
				} catch (e) {
					Lu(t, t.return, e);
				}
			}
		}
		function yl(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				j(t, sp, e);
			} catch (e) {
				Lu(t, t.return, e);
			}
		}
		function bl(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new zS()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new zS()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function xl(e, t) {
			var n = bl(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), kh) {
						if (VS !== null && HS !== null) qu(HS, VS);
						else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					}
					var r = Hu.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function B(e, t, n) {
			var r = t.deletions;
			if (r !== null) for (var i = 0; i < r.length; i++) {
				var a = e, o = t, s = r[i], c = ki(), l = o;
				a: for (; l !== null;) {
					switch (l.tag) {
						case 27:
							if (af(l.type)) {
								qS = l.stateNode, JS = !1;
								break a;
							}
							break;
						case 5:
							qS = l.stateNode, JS = !1;
							break a;
						case 3:
						case 4:
							qS = l.stateNode.containerInfo, JS = !0;
							break a;
					}
					l = l.return;
				}
				if (qS === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				_l(a, o, s), qS = null, JS = !1, (s.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && ur(s, J, Y, "Unmount"), Ai(c), a = s, o = a.alternate, o !== null && (o.return = null), a.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Sl(t, e, n), t = t.sibling;
		}
		function Sl(e, t, n) {
			var r = ki(), i = ji(), a = Ni(), o = Pi(), s = e.alternate, c = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					if (c & 4 && (s = e.updateQueue, s = s === null ? null : s.events, s !== null)) for (var l = 0; l < s.length; l++) {
						var u = s[l];
						u.ref.impl = u.nextImpl;
					}
					B(t, e, n), Cl(e), c & 4 && (bc(Cx | Sx, e, e.return), yc(Cx | Sx, e), vc(e, e.return, wx | Sx));
					break;
				case 1:
					B(t, e, n), Cl(e), c & 512 && (IS || s === null || kc(s, s.return)), c & 64 && FS && (t = e.updateQueue, t !== null && (n = t.callbacks, n !== null && (c = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = c === null ? n : c.concat(n))));
					break;
				case 26:
					if (l = YS, B(t, e, n), Cl(e), c & 512 && (IS || s === null || kc(s, s.return)), c & 4) {
						if (c = s === null ? null : s.memoizedState, n = e.memoizedState, s === null) {
							if (n === null) {
								if (e.stateNode === null) {
									if (FS) e.stateNode = Gd(e.type, e.memoizedProps, t.containerInfo, e);
									else {
										a: {
											t = e.type, n = e.memoizedProps, c = l.ownerDocument || l;
											b: switch (t) {
												case "title":
													s = c.getElementsByTagName("title")[0], (!s || s[Jh] || s[Vh] || s.namespaceURI === Ng || s.hasAttribute("itemprop")) && (s = c.createElement(t), c.head.insertBefore(s, c.querySelector("head > title"))), Od(s, t, n), s[Vh] = e, ut(s), t = s;
													break a;
												case "link":
													if (l = Op("link", "href", c).get(t + (n.href || ""))) {
														for (u = 0; u < l.length; u++) if (s = l[u], s.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && s.getAttribute("rel") === (n.rel == null ? null : n.rel) && s.getAttribute("title") === (n.title == null ? null : n.title) && s.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
															l.splice(u, 1);
															break b;
														}
													}
													s = c.createElement(t), Od(s, t, n), c.head.appendChild(s);
													break;
												case "meta":
													if (l = Op("meta", "content", c).get(t + (n.content || ""))) {
														for (u = 0; u < l.length; u++) if (s = l[u], Fe(n.content, "content"), s.getAttribute("content") === (n.content == null ? null : "" + n.content) && s.getAttribute("name") === (n.name == null ? null : n.name) && s.getAttribute("property") === (n.property == null ? null : n.property) && s.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && s.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
															l.splice(u, 1);
															break b;
														}
													}
													s = c.createElement(t), Od(s, t, n), c.head.appendChild(s);
													break;
												default: throw Error("getNodesForType encountered a type it did not expect: \"" + t + "\". This is a bug in React.");
											}
											s[Vh] = e, ut(s), t = s;
										}
										e.stateNode = t;
									}
								} else FS || kp(l, e.type, e.stateNode);
							} else e.stateNode = wp(l, n, e.memoizedProps);
						} else c === n ? n === null && e.stateNode !== null && Rc(e, e.memoizedProps, s.memoizedProps) : (c === null ? (t = s.stateNode, t === null || IS || t.parentNode.removeChild(t)) : c.count--, n === null ? FS || kp(l, e.type, e.stateNode) : wp(l, n, e.memoizedProps));
					}
					break;
				case 27:
					B(t, e, n), Cl(e), c & 512 && (IS || s === null || kc(s, s.return)), s !== null && c & 4 && Rc(e, e.memoizedProps, s.memoizedProps);
					break;
				case 5:
					if (l = LS, LS = !1, B(t, e, n), LS = l, Cl(e), c & 512 && (IS || s === null || kc(s, s.return)), e.flags & 32) {
						t = e.stateNode;
						try {
							j(e, tf, t), rg = !0;
						} catch (t) {
							Lu(e, e.return, t);
						}
					}
					c & 4 && e.stateNode != null && (t = e.memoizedProps, Rc(e, t, s === null ? t : s.memoizedProps)), c & 1024 && (RS = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (B(t, e, n), Cl(e), c & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						t = e.memoizedProps, n = s === null ? t : s.memoizedProps, c = e.stateNode;
						try {
							j(e, nf, c, n, t), rg = !0;
						} catch (t) {
							Lu(e, e.return, t);
						}
					}
					break;
				case 3:
					if (l = Ti(), rg = !1, GT = null, u = YS, YS = mp(t.containerInfo), B(t, e, n), YS = u, Cl(e), c & 4 && s !== null && s.memoizedState.isDehydrated) try {
						j(e, ap, t.containerInfo);
					} catch (t) {
						Lu(e, e.return, t);
					}
					RS && (RS = !1, wl(e)), t.effectDuration += Ei(l), rg = !1;
					break;
				case 4:
					c = LS, LS = FS, s = gt(), l = YS, YS = mp(e.stateNode.containerInfo), B(t, e, n), Cl(e), YS = l, rg && WS && (GS = !0), rg = s, LS = c;
					break;
				case 12:
					c = Ti(), B(t, e, n), Cl(e), e.stateNode.effectDuration += Di(c);
					break;
				case 31:
					B(t, e, n), Cl(e), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, xl(e, t)));
					break;
				case 13:
					B(t, e, n), Cl(e), e.child.flags & 8192 && e.memoizedState !== null != (s !== null && s.memoizedState !== null) && (zC = _h()), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, xl(e, t)));
					break;
				case 22:
					l = e.memoizedState !== null, u = s !== null && s.memoizedState !== null;
					var d = FS, f = IS, p = LS;
					FS = d || l, LS = p || l, IS = f || u, B(t, e, n), IS = f, LS = p, FS = d, u && !l && !d && !f && (e.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(e, J, Y), Cl(e), c & 8192 && (t = e.stateNode, t._visibility = l ? t._visibility & ~jv : t._visibility | jv, !l || s === null || u || FS || IS || (t = PS, n = u || IS, s = FS, u = IS, FS = l || FS, IS = n, kl(e, t), (e.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && ur(e, J, Y, "Disconnect"), FS = s, IS = u), !l && LS || fl(e, l)), c & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, xl(e, n))));
					break;
				case 19:
					B(t, e, n), Cl(e), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, xl(e, t)));
					break;
				case 30:
					c & 512 && (IS || s === null || kc(s, s.return)), c = gt(), l = WS, u = (n & 335544064) === n, d = e.memoizedProps, WS = u && rr(d.default, d.update) !== "none", B(t, e, n), Cl(e), u && s !== null && rg && (e.flags |= 4), WS = l, rg = c;
					break;
				case 21: break;
				case 7: c & 512 && (IS || s === null || kc(s, s.return)), s && s.stateNode !== null && (s.stateNode._fragmentFiber = e);
				default: B(t, e, n), Cl(e);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && ((Ay || .05 < Oy) && mr(e, J, Y, Oy, ky), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < Y - J && (cl(e.return.alternate, e.return) || ur(e, J, Y, "Mount"))), Ai(r), Mi(i), ky = a, Ay = o;
		}
		function Cl(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					j(e, Uc, e);
				} catch (t) {
					Lu(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function wl(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				wl(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gE = !0, t.reset(), gE = !1), e = e.sibling;
			}
		}
		function Tl(e, t) {
			if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) El(t, e), t = t.sibling;
			else al(t, !1);
		}
		function El(e, t) {
			var n = e.alternate;
			if (n === null) Zc(e, !1);
			else switch (e.tag) {
				case 3:
					if (KS = US = !1, Kc(), Tl(t, e), !US && !GS) {
						if (e = OS, e !== null) for (var r = 0; r < e.length; r += 3) {
							n = e[r];
							var i = e[r + 1];
							vf(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
								opacity: [0, 0],
								pointerEvents: ["none", "none"]
							}, {
								duration: 0,
								fill: "forwards",
								pseudoElement: "::view-transition-group(" + i + ")"
							});
						}
						e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(root)"
						}), e.animate({
							width: [0, 0],
							height: [0, 0]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition"
						})), KS = !0;
					}
					OS = null;
					break;
				case 5:
					Tl(t, e);
					break;
				case 4:
					r = US, US = !1, Tl(t, e), US && (GS = !0), US = r;
					break;
				case 22:
					e.memoizedState === null && (n.memoizedState === null ? Tl(t, e) : Zc(e, !1));
					break;
				case 30:
					r = US, i = Kc(), US = !1, Tl(t, e), US && (e.flags |= 4);
					var a = e.memoizedProps, o = e.stateNode;
					t = tr(a, o), o = tr(n.memoizedProps, o);
					var s = rr(a.default, a.update);
					s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, kS = 0, t = il(e, n, t, o, s, a, !0), kS !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Zl(e, e.memoizedProps.onUpdate), OS = i) : i !== null && (i.push.apply(i, OS), OS = i), US = e.flags & 32 ? !0 : r;
					break;
				default: Tl(t, e);
			}
		}
		function Dl(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) dl(e, t.alternate, t), t = t.sibling;
		}
		function Ol(e, t) {
			var n = ki(), r = ji(), i = Ni(), a = Pi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					vc(e, e.return, wx), kl(e, t);
					break;
				case 1:
					kc(e, e.return);
					var o = e.stateNode;
					typeof o.componentWillUnmount == "function" && Ec(e, e.return, o), kl(e, t);
					break;
				case 27: (t & PS) !== MS && j(e, fp, e.stateNode, e.type, e.memoizedProps);
				case 5:
					kc(e, e.return), e.tag !== 5 && e.tag !== 27 || Pc(e), kl(e, t);
					break;
				case 6:
					Pc(e);
					break;
				case 26:
					kc(e, e.return), o = e.stateNode, e.memoizedState !== null || o === null || IS || o.parentNode.removeChild(o), kl(e, t);
					break;
				case 22:
					e.memoizedState === null && kl(e, t);
					break;
				case 30:
					e.flags & 18874368 && sl(e), kc(e, e.return), kl(e, t);
					break;
				case 7: kc(e, e.return);
				default: kl(e, t);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(e, J, Y, Oy, ky), Ai(n), Mi(r), ky = i, Ay = a;
		}
		function kl(e, t) {
			for (e = e.child; e !== null;) Ol(e, t), e = e.sibling;
		}
		function Al(e, t, n, r) {
			var i = ki(), a = ji(), o = Ni(), s = Pi(), c = n.flags, l = (r & NS) !== MS;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					jl(e, n, r), _c(n, wx);
					break;
				case 1:
					if (jl(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && j(n, Ob, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							j(n, Sa, t, e);
						} catch (e) {
							Lu(n, n.return, e);
						}
					}
					l && c & 64 && Cc(n), Oc(n, n.return);
					break;
				case 27: (r & PS) !== MS && Wc(n);
				case 5:
					n.tag !== 5 && n.tag !== 27 || Nc(n), jl(e, n, r), l && t === null && c & 4 && Lc(n), Oc(n, n.return);
					break;
				case 6:
					Nc(n);
					break;
				case 26:
					var u = n.stateNode;
					n.memoizedState !== null || u === null || FS || kp(mp(u.ownerDocument), n.type, u), jl(e, n, r), l && t === null && c & 4 && Lc(n), Oc(n, n.return);
					break;
				case 12:
					if (l && c & 4) {
						c = Ti(), jl(e, n, r), l = n.stateNode, l.effectDuration += Di(c);
						try {
							j(n, Ac, n, t, Cy, l.effectDuration);
						} catch (e) {
							Lu(n, n.return, e);
						}
					} else jl(e, n, r);
					break;
				case 31:
					jl(e, n, r), l && c & 4 && vl(e, n);
					break;
				case 13:
					jl(e, n, r), l && c & 4 && yl(e, n);
					break;
				case 22:
					n.memoizedState === null && jl(e, n, r), Oc(n, n.return);
					break;
				case 30:
					jl(e, n, r), c & 18874368 && ol(n), Oc(n, n.return);
					break;
				case 7: Oc(n, n.return);
				default: jl(e, n, r);
			}
			(n.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(n, J, Y, Oy, ky), Ai(i), Mi(a), ky = o, Ay = s;
		}
		function jl(e, t, n) {
			for (n = t.subtreeFlags & 8772 ? n : n & ~NS, t = t.child; t !== null;) Al(e, t.alternate, t, n), t = t.sibling;
		}
		function Ml(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && yi(e), n != null && bi(n));
		}
		function Nl(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (yi(t), e != null && bi(e));
		}
		function Pl(e, t, n, r, i) {
			var a = (n & 335544064) === n;
			if (t.subtreeFlags & (a ? 10262 : 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) a = t.sibling, Fl(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			else a && rl(t);
		}
		function Fl(e, t, n, r, i) {
			var a = ki(), o = ji(), s = Ni(), c = Pi(), l = Tv, u = (n & 335544064) === n;
			u && t.alternate === null && t.return !== null && t.return.alternate !== null && nl(t);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && fr(t, t.actualStartTime, i, XS, n), Pl(e, t, n, r, i), d & 2048 && xc(t, Tx | Sx);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? pr(t, t.actualStartTime, i, []) : t.flags & 1 && fr(t, t.actualStartTime, i, XS, n)), Pl(e, t, n, r, i);
					break;
				case 3:
					var f = Ti(), p = XS;
					XS = t.alternate !== null && t.alternate.memoizedState.isDehydrated && !(t.flags & 256), Pl(e, t, n, r, i), XS = p, u && KS && (n = e.containerInfo, n = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, n.style.viewTransitionName === "root" && (n.style.viewTransitionName = ""), n = n.ownerDocument.documentElement, n !== null && n.style.viewTransitionName === "none" && (n.style.viewTransitionName = "")), d & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (yi(r), n != null && bi(n))), e.passiveEffectDuration += Ei(f);
					break;
				case 12:
					if (d & 2048) {
						d = Ti(), Pl(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += Di(d);
						try {
							j(t, jc, t, t.alternate, Cy, e.passiveEffectDuration);
						} catch (e) {
							Lu(t, t.return, e);
						}
					} else Pl(e, t, n, r, i);
					break;
				case 31:
					d = XS, f = t.alternate === null ? null : t.alternate.memoizedState, u = t.memoizedState, f !== null && u === null ? (u = t.deletions, u !== null && 0 < u.length && u[0].tag === 18 ? (XS = !1, f = f.hydrationErrors, f !== null && pr(t, t.actualStartTime, i, f)) : XS = !0) : XS = !1, Pl(e, t, n, r, i), XS = d;
					break;
				case 13:
					d = XS, f = t.alternate === null ? null : t.alternate.memoizedState, u = t.memoizedState, f === null || f.dehydrated === null || u !== null && u.dehydrated !== null ? XS = !1 : (u = t.deletions, u !== null && 0 < u.length && u[0].tag === 18 ? (XS = !1, f = f.hydrationErrors, f !== null && pr(t, t.actualStartTime, i, f)) : XS = !0), Pl(e, t, n, r, i), XS = d;
					break;
				case 23: break;
				case 22:
					p = t.stateNode, f = t.alternate, t.memoizedState === null ? (u && f !== null && f.memoizedState !== null && nl(t), p._visibility & Mv ? Pl(e, t, n, r, i) : (p._visibility |= Mv, Il(e, t, n, r, !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || XS || (e = t.actualStartTime, 0 <= e && .05 < i - e && dr(t, e, i), 0 <= J && 0 <= Y && .05 < Y - J && dr(t, J, Y)))) : (u && f !== null && f.memoizedState === null && nl(f), p._visibility & Mv ? Pl(e, t, n, r, i) : Rl(e, t, n, r, i)), d & 2048 && Ml(f, t);
					break;
				case 24:
					Pl(e, t, n, r, i), d & 2048 && Nl(t.alternate, t);
					break;
				case 30:
					u && (d = t.alternate, d !== null && (Yc(d.child, !0), Yc(t.child, !0))), Pl(e, t, n, r, i);
					break;
				default: Pl(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !XS && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && ur(t, n, i, "Mount")), 0 <= J && 0 <= Y && ((Ay || .05 < Oy) && mr(t, J, Y, Oy, ky), e && .05 < Y - J && ur(t, J, Y, "Mount"))), Ai(a), Mi(o), ky = s, Ay = c, Tv = l;
		}
		function Il(e, t, n, r, i, a) {
			for (i &&= !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Ll(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Ll(e, t, n, r, i, a) {
			var o = ki(), s = ji(), c = Ni(), l = Pi(), u = Tv;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && fr(t, t.actualStartTime, a, XS, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Il(e, t, n, r, i, a), xc(t, Tx);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= Mv, Il(e, t, n, r, i, a)) : f._visibility & Mv ? Il(e, t, n, r, i, a) : Rl(e, t, n, r, a), i && d & 2048 && Ml(t.alternate, t);
					break;
				case 24:
					Il(e, t, n, r, i, a), i && d & 2048 && Nl(t.alternate, t);
					break;
				default: Il(e, t, n, r, i, a);
			}
			(t.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(t, J, Y, Oy, ky), Ai(o), Mi(s), ky = c, Ay = l, Tv = u;
		}
		function Rl(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Tv;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && fr(a, a.actualStartTime, l, XS, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Rl(o, a, s, c, l), d & 2048 && Ml(a.alternate, a);
						break;
					case 24:
						Rl(o, a, s, c, l), d & 2048 && Nl(a.alternate, a);
						break;
					default: Rl(o, a, s, c, l);
				}
				Tv = u, a = t;
			}
		}
		function zl(e, t, n) {
			if (e.subtreeFlags & ZS) for (e = e.child; e !== null;) Bl(e, t, n), e = e.sibling;
		}
		function Bl(e, t, n) {
			switch (e.tag) {
				case 26:
					zl(e, t, n), e.flags & ZS && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Pp(n, e)) : Fp(n, YS, e.memoizedState, e.memoizedProps));
					break;
				case 5:
					zl(e, t, n), e.flags & ZS && (e = e.stateNode, (t & 335544128) === t && Pp(n, e));
					break;
				case 3:
				case 4:
					var r = YS;
					YS = mp(e.stateNode.containerInfo), zl(e, t, n), YS = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = ZS, ZS = 16777216, zl(e, t, n), ZS = r) : zl(e, t, n));
					break;
				case 30:
					if ((e.flags & ZS) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
						var i = e.stateNode;
						i.paired = null, DS === null && (DS = /* @__PURE__ */ new Map()), DS.set(r, i);
					}
					zl(e, t, n);
					break;
				default: zl(e, t, n);
			}
		}
		function Vl(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Hl(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = ki();
					BS = r, Kl(r, e), (r.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && ur(r, J, Y, "Unmount"), Ai(i);
				}
				Vl(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Ul(e), e = e.sibling;
		}
		function Ul(e) {
			var t = ki(), n = ji(), r = Ni(), i = Pi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Hl(e), e.flags & 2048 && Sc(e, e.return, Tx | Sx);
					break;
				case 3:
					var a = Ti();
					Hl(e), e.stateNode.passiveEffectDuration += Ei(a);
					break;
				case 12:
					a = Ti(), Hl(e), e.stateNode.passiveEffectDuration += Di(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & Mv && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~Mv, Wl(e), (e.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && ur(e, J, Y, "Disconnect")) : Hl(e);
					break;
				default: Hl(e);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(e, J, Y, Oy, ky), Ai(t), Mi(n), Ay = i, ky = r;
		}
		function Wl(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = ki();
					BS = r, Kl(r, e), (r.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && ur(r, J, Y, "Unmount"), Ai(i);
				}
				Vl(e);
			}
			for (e = e.child; e !== null;) Gl(e), e = e.sibling;
		}
		function Gl(e) {
			var t = ki(), n = ji(), r = Ni(), i = Pi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Sc(e, e.return, Tx), Wl(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & Mv && (a._visibility &= ~Mv, Wl(e));
					break;
				default: Wl(e);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(e, J, Y, Oy, ky), Ai(t), Mi(n), Ay = i, ky = r;
		}
		function Kl(e, t) {
			for (; BS !== null;) {
				var n = BS, r = n, i = t, a = ki(), o = ji(), s = Ni(), c = Pi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Sc(r, i, Tx);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && yi(i));
						break;
					case 24: bi(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && mr(r, J, Y, Oy, ky), Ai(a), Mi(o), Ay = c, ky = s, r = n.child, r !== null) r.return = n, BS = r;
				else a: for (n = e; BS !== null;) {
					if (r = BS, a = r.sibling, o = r.return, hl(r), r === n) {
						BS = null;
						break a;
					}
					if (a !== null) {
						a.return = o, BS = a;
						break a;
					}
					BS = o;
				}
			}
		}
		function ql() {
			eC.forEach(function(e) {
				return e();
			});
		}
		function Jl() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || W.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function Yl(e) {
			if ((fC & rC) !== nC && $ !== 0) return $ & -$;
			var t = W.T;
			return t === null ? (e = rt(), e === Ih && (Gb = null), e) : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), Gb !== null && rt() === Ih && (Gb = null), ad());
		}
		function Xl() {
			if (PC === 0) {
				if (!($ & 536870912) || q) {
					var e = Ph;
					Ph <<= 1, !(Ph & 3932160) && (Ph = 262144), PC = e;
				} else PC = 536870912;
			}
			return e = gx.current, e !== null && (e.flags |= 32), PC;
		}
		function Zl(e, t) {
			if (t != null) {
				var n = e.stateNode, r = n.ref;
				r === null && (r = n.ref = Df(tr(e.memoizedProps, n))), fw === null && (fw = []), fw.push(t.bind(null, r));
			}
		}
		function Ql(e, t, n) {
			if (Tw && console.error("useInsertionEffect must not schedule updates."), bw && (xw = !0), (e === pC && (wC === gC || wC === CC) || e.cancelPendingCommit !== null) && (ou(e, 0), nu(e, $, PC, !1)), Je(e, n), (fC & rC) !== nC && e === pC) {
				if (dh) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && D(Q) || "Unknown", kw.has(e) || (kw.add(e), t = D(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: Ow ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else kh && et(e, t, n), Yu(t), e === pC && ((fC & rC) === nC && (MC |= n), AC === lC && nu(e, $, PC, !1)), Xu(e);
		}
		function $l(e, t, n) {
			if ((fC & (rC | iC)) !== nC) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = _h();
				switch (nb) {
					case _C:
					case gC:
						var a = rb;
						xv && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, Sv, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, Sv, void 0, "primary-light"));
						break;
					case CC:
						a = rb, xv && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, Sv, void 0, "primary-light")) : console.timeStamp("Action", a, i, Sv, void 0, "primary-light"));
						break;
					default: xv && (r = i - rb, 3 > r || console.timeStamp("Blocked", rb, i, Sv, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Ue(e, t)) ? hu(e, t) : pu(e, t, !0);
			var o = n;
			do {
				if (a === aC) {
					DC && !n && nu(e, t, 0, !1), t = wC, rb = vy(), nb = t;
					break;
				}
				if (r = _h(), i = e.current.alternate, o && !tu(i)) lr(t), i = Sy, a = r, !xv || a <= i || (GC ? GC.run(console.timeStamp.bind(console, "Teared Render", i, a, wv, Cv, "error")) : console.timeStamp("Teared Render", i, a, wv, Cv, "error")), au(t, r), a = pu(e, t, !1), o = !1;
				else {
					if (a === sC) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							lr(t), _r(Sy, r, t, GC), au(t, r), t = s;
							a: {
								r = e, a = o, o = IC;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (ou(r, s).flags |= 256), s = pu(r, s, !1), s !== sC && s !== uC) {
									if (OC && !c) {
										r.errorRecoveryDisabledLanes |= a, MC |= a, a = lC;
										break a;
									}
									r = LC, LC = o, r !== null && (LC === null ? LC = r : LC.push.apply(LC, r));
								}
								a = s;
							}
							if (o = !1, a !== sC) continue;
							r = _h();
						}
					}
					if (a === oC) {
						lr(t), _r(Sy, r, t, GC), au(t, r), ou(e, 0), nu(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case aC:
							case oC: throw Error("Root did not complete. This is a bug in React.");
							case lC: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
							case uC:
								lr(t), hr(Sy, r, t, GC), au(t, r), i = t, i & 127 ? By = r : i & 4194048 && (Zy = r), nu(n, t, PC, !EC);
								break a;
							case sC:
								LC = null;
								break;
							case cC:
							case dC: break;
							default: throw Error("Unknown root exit status.");
						}
						if (W.actQueue !== null) Cu(n, i, t, LC, WC, RC, PC, MC, FC, EC, a, null, null, Sy, r);
						else {
							if ((t & 62914560) === t && (o = zC + VC - _h(), 10 < o)) {
								if (nu(n, t, PC, !EC), He(n, 0, !0) !== 0) break a;
								ow = t, n.timeoutHandle = ET(eu.bind(null, n, i, LC, WC, RC, t, PC, MC, FC, EC, a, "Throttled", Sy, r), o);
								break a;
							}
							eu(n, i, LC, WC, RC, t, PC, MC, FC, EC, a, null, Sy, r);
						}
					}
					break;
				}
			} while (1);
			Xu(e);
		}
		function eu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = OT;
			var m = t.subtreeFlags, h = (a & 335544064) === a, g = null;
			(h || m & 8192 || (m & 16785408) == 16785408) && (g = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: hn
			}, DS = null, Bl(t, a, g), h && (m = g, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = Rp.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? zC - _h() : (a & 4194048) === a ? BC - _h() : 0, m = Ip(g, m), m !== null) ? (ow = a, e.cancelPendingCommit = m(Cu.bind(null, e, t, a, n, r, i, o, s, c, l, u, g, g.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < g.count ? 0 < g.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : g.imgCount === 1 ? "Suspended on an Image" : 0 < g.imgCount ? "Suspended on Images" : null, f, p)), nu(e, a, o, !l)) : Cu(e, t, a, n, r, i, o, s, c, l, u, g, d, f, p);
		}
		function tu(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!H_(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
				if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
				else {
					if (t === e) break;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) return !0;
						t = t.return;
					}
					t.sibling.return = t.return, t = t.sibling;
				}
			}
			return !0;
		}
		function nu(e, t, n, r) {
			t = We(e, t), t &= ~NC, t &= ~MC, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Ah(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && Xe(e, n, t);
		}
		function ru() {
			return (fC & (rC | iC)) !== nC || (Zu(0, !1), !1);
		}
		function iu() {
			if (Q !== null) {
				if (wC === mC) var e = Q.return;
				else e = Q, si(), Ga(e), Xb = null, Zb = 0, e = Q;
				for (; e !== null;) hc(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function au(e, t) {
			e & 127 && (jy = t), e & 4194048 && (Vy = t), e & 62914560 && (Qy = t), e & 2080374784 && ($y = t);
		}
		function ou(e, t) {
			xv && (console.timeStamp("Blocking Track", .003, .003, "Blocking", Cv, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", Cv, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", Cv, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", Cv, "primary-light"));
			var n = Sy;
			if (Sy = vy(), $ !== 0 && 0 < n) {
				if (lr($), AC === cC || AC === lC) hr(n, Sy, t, GC);
				else {
					var r = Sy, i = GC;
					if (xv && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, wv, Cv, a)) : console.timeStamp(o, n, r, wv, Cv, a);
					}
				}
				au($, Sy);
			}
			if (n = GC, GC = null, t & 127) {
				GC = Ny, i = 0 <= My && My < jy ? jy : My, r = 0 <= Ly && Ly < jy ? jy : Ly, a = 0 <= r ? r : 0 <= i ? i : Sy, 0 <= By ? (lr(2), gr(By, a, t, n)) : eb & 127 && (lr(2), xr(jy, a, tb)), n = i;
				var s = r, c = Ry, l = 0 < zy, u = Py === by, d = Py === xy;
				if (i = Sy, r = Ny, a = Fy, o = Iy, xv) {
					if (wv = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, wv, Cv, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, wv, Cv, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: wv,
							trackGroup: Cv,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n), performance.clearMeasures(u));
				}
				My = -1.1, Py = 0, Iy = Fy = null, By = -1.1, zy = Ly, Ly = -1.1, jy = vy();
			}
			return t & 4194048 && (GC = Gy, i = 0 <= Hy && Hy < Vy ? Vy : Hy, n = 0 <= Uy && Uy < Vy ? Vy : Uy, r = 0 <= Jy && Jy < Vy ? Vy : Jy, a = 0 <= r ? r : 0 <= n ? n : Sy, 0 <= Zy ? (lr(256), gr(Zy, a, t, GC)) : eb & 4194048 && (lr(256), xr(Vy, a, tb)), d = r, s = Yy, c = 0 < Xy, l = Wy === xy, a = Sy, r = Gy, o = Ky, u = qy, xv && (wv = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, wv, Cv, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, wv, Cv, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, wv, Cv, "primary-dark")) : console.timeStamp("Action", i, n, wv, Cv, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: wv,
					trackGroup: Cv,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n), performance.clearMeasures(i))), Uy = Hy = -1.1, Wy = 0, Zy = -1.1, Xy = Jy, Jy = -1.1, Vy = vy()), t & 62914560 && eb & 62914560 && (lr(4194304), xr(Qy, Sy, tb)), t & 2080374784 && eb & 2080374784 && (lr(268435456), xr($y, Sy, tb)), n = e.timeoutHandle, n !== OT && (e.timeoutHandle = OT, DT(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), ow = 0, iu(), pC = e, Q = n = Pr(e.current, null), $ = t, wC = mC, TC = null, EC = !1, DC = Ue(e, t), OC = !1, AC = aC, FC = PC = NC = MC = jC = 0, LC = IC = null, RC = !1, kC = We(e, t), Sr(), e = lv(), 1e3 < e - sv && (W.recentlyCreatedOwnerStacks = 0, sv = e), fb.discardPendingWarnings(), n;
		}
		function su(e, t) {
			X = null, W.H = Gx, W.getCurrentStack = null, dh = !1, uh = null, t === Vb || t === Ub ? (t = Qi(), wC = _C) : t === Hb ? (t = Qi(), wC = vC) : wC = t === pS ? SC : typeof t == "object" && t && typeof t.then == "function" ? bC : hC, TC = t;
			var n = Q;
			n === null ? (AC = oC, Ss(e, Hr(t, e.current))) : n.mode & K && Ii(n);
		}
		function cu() {
			var e = gx.current;
			return e === null ? !0 : ($ & 4194048) === $ ? _x === null : ($ & 62914560) === $ || $ & 536870912 ? e === _x : !1;
		}
		function lu() {
			var e = W.H;
			return W.H = Gx, e === null ? Gx : e;
		}
		function uu() {
			var e = W.A;
			return W.A = QS, e;
		}
		function du(e) {
			GC === null && (GC = e._debugTask == null ? null : e._debugTask);
		}
		function fu() {
			AC = lC, EC || ($ & 4194048) !== $ && gx.current !== null || (DC = !0), !(jC & 134217727) && !(MC & 134217727) || pC === null || nu(pC, $, PC, !1);
		}
		function pu(e, t, n) {
			var r = fC;
			fC |= rC;
			var i = lu(), a = uu();
			if (pC !== e || $ !== t) {
				if (kh) {
					var o = e.memoizedUpdaters;
					0 < o.size && (qu(e, $), o.clear()), tt(e, t);
				}
				WC = null, ou(e, t);
			}
			t = !1, o = AC;
			a: do
				try {
					if (wC !== mC && Q !== null) {
						var s = Q, c = TC;
						switch (wC) {
							case SC:
								iu(), o = uC;
								break a;
							case _C:
							case gC:
							case CC:
							case bC:
								gx.current === null && (t = !0);
								var l = wC;
								if (wC = mC, TC = null, bu(e, s, c, l), n && DC) {
									o = aC;
									break a;
								}
								break;
							default: l = wC, wC = mC, TC = null, bu(e, s, c, l);
						}
					}
					mu(), o = AC;
					break;
				} catch (t) {
					su(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, si(), fC = r, W.H = i, W.A = a, Q === null && (pC = null, $ = 0, Sr()), o;
		}
		function mu() {
			for (; Q !== null;) _u(Q);
		}
		function hu(e, t) {
			var n = fC;
			fC |= rC;
			var r = lu(), i = uu();
			if (pC !== e || $ !== t) {
				if (kh) {
					var a = e.memoizedUpdaters;
					0 < a.size && (qu(e, $), a.clear()), tt(e, t);
				}
				WC = null, HC = _h() + UC, ou(e, t);
			} else DC = Ue(e, t);
			a: do
				try {
					if (wC !== mC && Q !== null) b: switch (t = Q, a = TC, wC) {
						case hC:
							wC = mC, TC = null, bu(e, t, a, hC);
							break;
						case gC:
						case CC:
							if (Yi(a)) {
								wC = mC, TC = null, vu(t);
								break;
							}
							t = function() {
								wC !== gC && wC !== CC || pC !== e || (wC = xC), Xu(e);
							}, a.then(t, t);
							break a;
						case _C:
							wC = xC;
							break a;
						case vC:
							wC = yC;
							break a;
						case xC:
							Yi(a) ? (wC = mC, TC = null, vu(t)) : (wC = mC, TC = null, bu(e, t, a, xC));
							break;
						case yC:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Mp(o) : s.stateNode.complete) {
										wC = mC, TC = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, xu(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							wC = mC, TC = null, bu(e, t, a, yC);
							break;
						case bC:
							wC = mC, TC = null, bu(e, t, a, bC);
							break;
						case SC:
							iu(), AC = uC;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					W.actQueue === null ? gu() : mu();
					break;
				} catch (t) {
					su(e, t);
				}
			while (1);
			return si(), W.H = r, W.A = i, fC = n, Q === null ? (pC = null, $ = 0, Sr(), AC) : aC;
		}
		function gu() {
			for (; Q !== null && !hh();) _u(Q);
		}
		function _u(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = j(e, oc, t, e, kC) : (Fi(e), t = j(e, oc, t, e, kC), Ii(e)), e.memoizedProps = e.pendingProps, t === null ? xu(e) : Q = t;
		}
		function vu(e) {
			var t = j(e, yu, e);
			e.memoizedProps = e.pendingProps, t === null ? xu(e) : Q = t;
		}
		function yu(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && Fi(e), e.tag) {
				case 15:
				case 0:
					t = Bs(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = Bs(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5:
					Ga(e);
					var r = e;
					r === ey && (q ? (ti(r), r.tag === 5 && r.stateNode != null && (ty = r.stateNode)) : (ti(r), q = !0));
				default: hc(t, e), e = Q = Fr(e, kC), t = oc(t, e, kC);
			}
			return n && Ii(e), t;
		}
		function bu(e, t, n, r) {
			si(), Ga(t), Xb = null, Zb = 0;
			var i = t.return;
			try {
				if (Ds(e, i, t, n, $)) {
					AC = oC, Ss(e, Hr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				AC = oC, Ss(e, Hr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (q || r === hC ? e = !0 : DC || $ & 536870912 ? e = !1 : (EC = e = !0, (r === gC || r === CC || r === _C || r === bC) && (r = gx.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Su(t, e)) : xu(t);
		}
		function xu(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					Su(t, EC);
					return;
				}
				var n = t.alternate;
				if (e = t.return, Fi(t), n = j(t, pc, n, t, kC), (t.mode & K) !== G && Li(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			AC === aC && (AC = dC);
		}
		function Su(e, t) {
			do {
				var n = mc(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & K) !== G) {
					Li(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			AC = uC, Q = null;
		}
		function Cu(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
			e.cancelPendingCommit = null;
			do
				Pu();
			while (rw !== ZC);
			if (fb.flushLegacyContextWarning(), fb.flushPendingUnsafeLifecycleWarnings(), (fC & (rC | iC)) !== nC) throw Error("Should not already be working.");
			if (lr(n), u === sC) _r(p, m, n, GC);
			else if (r !== null) {
				if (l = t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && !!(t.flags & 256), a = GC, xv && !(m <= p)) {
					u = [];
					for (var h = 0; h < r.length; h++) {
						var g = r[h].value;
						u.push(["Recoverable Error", typeof g == "object" && g && typeof g.message == "string" ? String(g.message) : String(g)]);
					}
					p = {
						start: p,
						end: m,
						detail: { devtools: {
							color: "primary-dark",
							track: wv,
							trackGroup: Cv,
							tooltipText: l ? "Hydration Failed" : "Recovered after Error",
							properties: u
						} }
					}, a ? a.run(performance.measure.bind(performance, "Recovered", p)) : performance.measure("Recovered", p), performance.clearMeasures("Recovered");
				}
			} else a = GC, !xv || m <= p || (l = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", u = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", a ? a.run(console.timeStamp.bind(console, u, p, m, wv, Cv, l)) : console.timeStamp(u, p, m, wv, Cv, l));
			if (t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				e === pC && (Q = pC = null, $ = 0), aw = t, iw = e, ow = n, lw = i, uw = r, cw = m, mw = f, hw = qC, gw = null, wu(e, t, n, o, s, c, d, f, m);
			}
		}
		function wu(e, t, n, r, i, a, o, s, c) {
			var l = t.lanes | t.childLanes;
			if (sw = l, l |= Fv, Ye(e, n, l, r, i, a), fw = null, (n & 335544064) === n ? (pw = Si(e), r = 10262) : (pw = null, r = 10256), t.actualDuration !== 0 || (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Ju(xh, function() {
				return TT = window.event, hw === qC && (hw = YC), Fu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), Ty = null, Cy = vy(), s !== null && vr(c, Cy, s, GC), ES = !1, s = !!(t.flags & 13878), t.subtreeFlags & 13878 || s) {
				s = W.T, W.T = null, c = Um.p, Um.p = Ih, r = fC, fC |= iC;
				try {
					ll(e, t, n);
				} finally {
					fC = r, Um.p = c, W.T = s;
				}
			}
			rw = QC, ES ? (eb |= n, tb = null, dw = Tf(o, e.containerInfo, pw, ku, Au, Ou, ju, Fu, Tu, Eu, Du.bind(null, n))) : (ku(), Au(), ju());
		}
		function Tu(e) {
			if (rw !== ZC) {
				var t = iw.onRecoverableError;
				t(e, Mu(null));
			}
		}
		function Eu(e) {
			wy = vy(), br(mw === null ? cw : Cy, wy, Ty, hw === JC, GC), mw = gw = e;
		}
		function Du(e) {
			if ((eb & e) !== 0) {
				var t = tb;
				eb &= ~e, tb = null, e & 4194048 && !($ & 4194048) && !(ow & 4194048) && (lr(256), xr(Vy, _h(), t)), e & 62914560 && !($ & 62914560) && !(ow & 62914560) && (lr(4194304), xr(Qy, _h(), t)), e & 2080374784 && !($ & 2080374784) && !(ow & 2080374784) && (lr(268435456), xr($y, _h(), t));
			}
		}
		function Ou() {
			rw === ew && (rw = ZC, El(aw, iw), rw = tw);
		}
		function ku() {
			if (rw === QC) {
				rw = ZC;
				var e = iw, t = aw, n = ow, r = !!(t.flags & 13878);
				if (t.subtreeFlags & 13878 || r) {
					r = W.T, W.T = null;
					var i = Um.p;
					Um.p = Ih;
					var a = fC;
					fC |= iC;
					try {
						VS = n, HS = e, WS = GS = !1, Oi(), Sl(t, e, n), HS = VS = null, n = xT;
						var o = Yn(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Jn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Xn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = qn(s, h), v = qn(s, g);
										if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
											var y = d.createRange();
											y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
										}
									}
								}
							}
							for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
								element: p,
								left: p.scrollLeft,
								top: p.scrollTop
							});
							for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
								var b = d[s];
								b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
							}
						}
						gE = !!bT, xT = bT = null;
					} finally {
						fC = a, Um.p = i, W.T = r;
					}
				}
				e.current = t, rw = $C;
			}
		}
		function Au() {
			if (rw === $C) {
				rw = ZC;
				var e = gw;
				if (e !== null) {
					Cy = vy();
					var t = wy, n = Cy;
					!xv || n <= t || (tb ? tb.run(console.timeStamp.bind(console, e, t, n, wv, Cv, "secondary-light")) : console.timeStamp(e, t, n, wv, Cv, "secondary-light"));
				}
				e = iw, t = aw, n = ow;
				var r = !!(t.flags & 8772);
				if (t.subtreeFlags & 8772 || r) {
					r = W.T, W.T = null;
					var i = Um.p;
					Um.p = Ih;
					var a = fC;
					fC |= iC;
					try {
						VS = n, HS = e, Oi(), dl(e, t.alternate, t), HS = VS = null;
					} finally {
						fC = a, Um.p = i, W.T = r;
					}
				}
				e = cw, t = mw, wy = vy(), br(t === null ? e : Cy, wy, Ty, hw === JC, GC), rw = ew;
			}
		}
		function ju() {
			if (rw === tw || rw === ew) {
				if (rw === tw) {
					var e = wy;
					wy = vy();
					var t = wy, n = hw === JC;
					!xv || t <= e || (tb ? tb.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, wv, Cv, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, wv, Cv, n ? " error" : "secondary-light")), hw !== JC && (hw = XC);
				}
				rw = ZC, e = dw, dw = null, gh(), t = iw;
				var r = aw;
				n = ow;
				var i = uw, a = (n & 335544064) === n ? 10262 : 10256;
				(a = r.actualDuration !== 0 || (r.subtreeFlags & a) !== 0 || (r.flags & a) !== 0) ? rw = nw : (rw = ZC, aw = iw = null, Nu(t, t.pendingLanes), Cw = 0, ww = null);
				var o = t.pendingLanes;
				if (o === 0 && (KC = null), a || Gu(t), o = nt(n), r = r.stateNode, Dh && typeof Dh.onCommitFiberRoot == "function") try {
					var s = (r.current.flags & 128) == 128;
					switch (o) {
						case Ih:
							var c = yh;
							break;
						case Lh:
							c = bh;
							break;
						case Rh:
							c = xh;
							break;
						case zh:
							c = Ch;
							break;
						default: c = xh;
					}
					Dh.onCommitFiberRoot(Eh, r, c, s);
				} catch (e) {
					Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (kh && t.memoizedUpdaters.clear(), ql(), i !== null) {
					s = W.T, c = Um.p, Um.p = Ih, W.T = null;
					try {
						var l = t.onRecoverableError;
						for (r = 0; r < i.length; r++) {
							var u = i[r], d = Mu(u.stack);
							j(u.source, l, u.value, d);
						}
					} finally {
						W.T = s, Um.p = c;
					}
				}
				if (l = fw, u = pw, pw = null, l !== null && (fw = null, u === null && (u = []), e !== null)) for (d = 0; d < l.length; d++) i = (0, l[d])(u), i !== void 0 && e.finished.finally(i);
				ow & 3 && Pu(), Xu(t), o = t.pendingLanes, n & 261930 && o & 42 ? (ab = !0, t === yw ? vw++ : (vw = 0, yw = t)) : (vw = 0, yw = null), a || au(n, wy), Zu(0, !1);
			}
		}
		function Mu(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Nu(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, bi(t)));
		}
		function Pu() {
			return dw !== null && (dw.skipTransition(), Ew || (Ew = !0, console.warn("A flushSync update cancelled a View Transition because it was called while the View Transition was still preparing. To preserve the synchronous semantics, React had to skip the View Transition. If you can, try to avoid flushSync() in a scenario that's likely to interfere.")), dw = null, hw = JC), ku(), Au(), ju(), Fu();
		}
		function Fu() {
			if (rw !== nw) return !1;
			var e = iw, t = sw;
			sw = 0;
			var n = nt(ow), r = Rh === 0 || Rh > n ? Rh : n;
			n = W.T;
			var i = Um.p;
			try {
				Um.p = r, W.T = null;
				var a = lw;
				lw = null, r = iw;
				var o = ow;
				if (rw = ZC, aw = iw = null, ow = 0, (fC & (rC | iC)) !== nC) throw Error("Cannot flush passive effects while already rendering.");
				lr(o), bw = !0, xw = !1;
				var s = 0;
				if (Ty = null, s = _h(), hw === XC) xr(wy, s, tb);
				else {
					var c = wy, l = s, u = hw === YC;
					!xv || l <= c || (GC ? GC.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, wv, Cv, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, wv, Cv, "secondary-light"));
				}
				c = fC, fC |= iC;
				var d = r.current;
				Oi(), Ul(d);
				var f = r.current;
				d = cw, Oi(), Fl(r, f, o, a, d), Gu(r), fC = c;
				var p = _h();
				if (f = s, d = GC, Ty === null ? !xv || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, wv, Cv, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, wv, Cv, "secondary-dark")) : yr(f, p, Ty, !0, d), au(o, p), Zu(0, !1), xw ? r === ww ? Cw++ : (Cw = 0, ww = r) : Cw = 0, xw = bw = !1, Dh && typeof Dh.onPostCommitFiberRoot == "function") try {
					Dh.onPostCommitFiberRoot(Eh, r);
				} catch (e) {
					Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Um.p = i, W.T = n, Nu(e, t);
			}
		}
		function Iu(e, t, n) {
			t = Hr(n, t), zi(t), t = ws(e.stateNode, t, 2), e = ga(e, t, 2), e !== null && (Je(e, 2), Xu(e));
		}
		function Lu(e, t, n) {
			if (Tw = !1, e.tag === 3) Iu(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Iu(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (KC === null || !KC.has(r))) {
							e = Hr(n, e), zi(e), n = Ts(2), r = ga(t, n, 2), r !== null && (Es(n, r, t, e), Je(r, 2), Xu(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Ru(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new tC();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (OC = !0, i.add(n), r = zu.bind(null, e, t, n), kh && qu(e, n), t.then(r, r));
		}
		function zu(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > My && (jy = My = vy(), Ny = yy("Promise Resolved"), Py = xy) : n & 4194048 && 0 > Uy && (Vy = Uy = vy(), Gy = yy("Promise Resolved"), Wy = xy), Jl() && W.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), pC === e && ($ & n) === n && ((AC === lC || AC === cC && ($ & 62914560) === $ && _h() - zC < VC) && (fC & rC) === nC ? ou(e, 0) : NC |= n, FC === $ && (FC = 0)), Xu(e);
		}
		function Bu(e, t) {
			t === 0 && (t = Ke()), e = Tr(e, t), e !== null && (Je(e, t), Xu(e));
		}
		function Vu(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Bu(e, n);
		}
		function Hu(e, t) {
			var n = 0;
			switch (e.tag) {
				case 31:
				case 13:
					var r = e.stateNode, i = e.memoizedState;
					i !== null && (n = i.retryLane);
					break;
				case 19:
					r = e.stateNode;
					break;
				case 22:
					r = e.stateNode._retryCache;
					break;
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), Bu(e, n);
		}
		function Uu(e, t, n) {
			if (t.subtreeFlags & 134225920) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Em;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 134225920 ? j(i, Wu, r, i) : i.subtreeFlags & 134217728 && j(i, Uu, r, i, a)) : i.flags & 134217728 ? a && j(i, Wu, r, i) : Uu(r, i, a), t = t.sibling;
			}
		}
		function Wu(e, t) {
			ze(!0);
			try {
				Ol(t, MS), Gl(t), Al(e, t.alternate, t, MS), Ll(e, t, 0, null, !1, 0);
			} finally {
				ze(!1);
			}
		}
		function Gu(e) {
			var t = !0;
			e.current.mode & (Bv | Vv) || (t = !1), Uu(e, e.current, t);
		}
		function Ku(e) {
			if ((fC & rC) === nC) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = D(e) || "ReactComponent", Dw !== null) {
						if (Dw.has(t)) return;
						Dw.add(t);
					} else Dw = /* @__PURE__ */ new Set([t]);
					j(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function qu(e, t) {
			kh && e.memoizedUpdaters.forEach(function(n) {
				et(e, n, t);
			});
		}
		function Ju(e, t) {
			var n = W.actQueue;
			return n === null ? ph(e, t) : (n.push(t), Aw);
		}
		function Yu(e) {
			Jl() && W.actQueue === null && j(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", D(e));
			});
		}
		function Xu(e) {
			e !== Mw && e.next === null && (Mw === null ? jw = Mw = e : Mw = Mw.next = e), Fw = !0, W.actQueue === null ? Nw || (Nw = !0, id()) : Pw || (Pw = !0, id());
		}
		function Zu(e, t) {
			if (!Iw && Fw) {
				Iw = !0;
				do
					for (var n = !1, r = jw; r !== null;) {
						if (!t) {
							if (e !== 0) {
								var i = r.pendingLanes;
								if (i === 0) var a = 0;
								else {
									var o = r.suspendedLanes, s = r.pingedLanes;
									a = (1 << 31 - Ah(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
								}
								a !== 0 && (n = !0, nd(r, a));
							} else a = $, a = He(r, r === pC ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== OT), !(a & 3) || Ue(r, a) || (n = !0, nd(r, a));
						}
						r = r.next;
					}
				while (n);
				Iw = !1;
			}
		}
		function Qu() {
			TT = window.event, $u();
		}
		function $u() {
			Fw = Pw = Nw = !1;
			var e = 0;
			Lw !== 0 && Jd() && (e = Lw);
			for (var t = _h(), n = null, r = jw; r !== null;) {
				var i = r.next, a = ed(r, t);
				a === 0 ? (r.next = null, n === null ? jw = i : n.next = i, i === null && (Mw = n)) : (n = r, (e !== 0 || a & 3) && (Fw = !0)), r = i;
			}
			rw !== ZC && rw !== nw || Zu(e, !1), Lw !== 0 && (Lw = 0);
		}
		function ed(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Ah(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ge(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = pC, n = $, n = He(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== OT), r = e.callbackNode, n === 0 || e === t && (wC === gC || wC === CC) || e.cancelPendingCommit !== null) return r !== null && rd(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Ue(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || W.actQueue !== null && r !== Rw) rd(r);
				else return t;
				switch (nt(n)) {
					case Ih:
					case Lh:
						n = bh;
						break;
					case Rh:
						n = xh;
						break;
					case zh:
						n = Ch;
						break;
					default: n = xh;
				}
				return r = td.bind(null, e), W.actQueue === null ? n = ph(n, r) : (W.actQueue.push(r), n = Rw), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && rd(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function td(e, t) {
			if (ab = ib = !1, TT = window.event, rw !== ZC && rw !== nw) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (hw === qC && (hw = YC), Pu() && e.callbackNode !== n) return null;
			var r = $;
			return r = He(e, e === pC ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== OT), r === 0 ? null : ($l(e, r, t), ed(e, _h()), e.callbackNode != null && e.callbackNode === n ? td.bind(null, e) : null);
		}
		function nd(e, t) {
			if (Pu()) return null;
			ib = ab, ab = !1, $l(e, t, !0);
		}
		function rd(e) {
			e !== Rw && e !== null && mh(e);
		}
		function id() {
			W.actQueue !== null && W.actQueue.push(function() {
				return $u(), null;
			}), jT(function() {
				(fC & (rC | iC)) === nC ? $u() : ph(yh, Qu);
			});
		}
		function ad() {
			if (Lw === 0) {
				var e = cb;
				e === 0 && (e = Nh, Nh <<= 1, !(Nh & 261888) && (Nh = 256)), Lw = e;
			}
			return Lw;
		}
		function od(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Fe(e, "action"), mn(e));
		}
		function sd(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = od((i[Hh] || null).action), o = r.submitter;
				o && (t = (t = o[Hh] || null) ? od(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new i_("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (Lw !== 0) {
									var e = new FormData(i, o), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), Zo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), Zo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function V(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				dv(e);
			}
			e.currentTarget = null;
		}
		function cd(e, t) {
			t = !!(t & 4);
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? V(a, s, l) : j(c, V, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? V(a, s, l) : j(c, V, a, s, l), i = c;
					}
				}
			}
		}
		function H(e, t) {
			Bw.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Wh];
			n === void 0 && (n = t[Wh] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (dd(t, e, 2, !1), n.add(r));
		}
		function ld(e, t, n) {
			Bw.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), dd(n, e, r, t);
		}
		function ud(e) {
			if (!e[Vw]) {
				e[Vw] = !0, Xh.forEach(function(t) {
					t !== "selectionchange" && (Bw.has(t) || ld(t, !1, e), ld(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[Vw] || (t[Vw] = !0, ld("selectionchange", !1, t));
			}
		}
		function dd(e, t, n, r) {
			switch (nm(t)) {
				case Ih:
					var i = Zp;
					break;
				case Lh:
					i = Qp;
					break;
				default: i = $p;
			}
			n = i.bind(null, t, n, e), i = void 0, !Qg || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function fd(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = ot(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			vn(function() {
				var r = a, i = gn(n), o = [];
				a: {
					var s = iv.get(e);
					if (s !== void 0) {
						var c = i_, l = e;
						switch (e) {
							case "keypress": if (xn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = x_;
								break;
							case "focusin":
								l = "focus", c = p_;
								break;
							case "focusout":
								l = "blur", c = p_;
								break;
							case "beforeblur":
							case "afterblur":
								c = p_;
								break;
							case "click": if (n.button === 2) break a;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								c = d_;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = f_;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = w_;
								break;
							case Z_:
							case Q_:
							case $_:
								c = m_;
								break;
							case rv:
								c = T_;
								break;
							case "scroll":
							case "scrollend":
								c = o_;
								break;
							case "wheel":
								c = E_;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = h_;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = S_;
								break;
							case "submit":
								c = C_;
								break;
							case "toggle":
							case "beforetoggle": c = D_;
						}
						var u = !!(t & 4), d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = yn(p, f), h != null && u.push(pd(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (c = e === "mouseover" || e === "pointerover", s = e === "mouseout" || e === "pointerout", c && n !== qg && (l = n.relatedTarget || n.fromElement) && (ot(l) || l[Uh])) break a;
						(s || c) && (l = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, s ? (c = n.relatedTarget || n.toElement, s = r, c = c ? ot(c) : null, c !== null && (d = x(c), u = c.tag, c !== d || u !== 5 && u !== 27 && u !== 6) && (c = null)) : (s = null, c = r), s !== c && (u = d_, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = S_, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = s == null ? l : ct(s), m = c == null ? l : ct(c), l = new u(h, p + "leave", s, n, i), l.target = d, l.relatedTarget = m, h = null, ot(i) === r && (u = new u(f, p + "enter", c, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, u = s && c ? ue(s, c, hd) : null, s !== null && gd(o, l, s, u, !1), c !== null && d !== null && gd(o, d, c, u, !0)));
					}
					a: {
						if (s = r ? ct(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = In;
						else if (jn(s)) {
							if (V_) g = Hn;
							else {
								g = Bn;
								var _ = zn;
							}
						} else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && ln(r.elementType) && (g = In) : g = Vn;
						if (g &&= g(e, r)) {
							Nn(o, g, n, i);
							break a;
						}
						_ && _(e, s, r);
					}
					switch (_ = r ? ct(r) : window, e) {
						case "focusin":
							(jn(_) || _.contentEditable === "true") && (W_ = _, G_ = r, K_ = null);
							break;
						case "focusout":
							K_ = G_ = W_ = null;
							break;
						case "mousedown":
							q_ = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							q_ = !1, Zn(o, n, i);
							break;
						case "selectionchange": if (U_) break;
						case "keydown":
						case "keyup": Zn(o, n, i);
					}
					var v;
					if (A_) b: {
						switch (e) {
							case "compositionstart":
								var y = "onCompositionStart";
								break b;
							case "compositionend":
								y = "onCompositionEnd";
								break b;
							case "compositionupdate":
								y = "onCompositionUpdate";
								break b;
						}
						y = void 0;
					}
					else L_ ? Dn(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === k_ && (y = "onCompositionStart");
					y && (N_ && n.locale !== "ko" && (L_ || y !== "onCompositionStart" ? y === "onCompositionEnd" && L_ && (v = bn()) : (e_ = i, t_ = "value" in e_ ? e_.value : e_.textContent, L_ = !0)), _ = md(r, y), 0 < _.length && (y = new g_(y, e, null, n, i), o.push({
						event: y,
						listeners: _
					}), v ? y.data = v : (v = On(n), v !== null && (y.data = v)))), (v = M_ ? kn(e, n) : An(e, n)) && (y = md(r, "onBeforeInput"), 0 < y.length && (_ = new __("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: _,
						listeners: y
					}), _.data = v)), sd(o, e, r, n, i);
				}
				cd(o, t);
			});
		}
		function pd(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function md(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = yn(e, n), i != null && r.unshift(pd(e, i, a)), i = yn(e, t), i != null && r.push(pd(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function hd(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function gd(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = yn(n, a), l != null && o.unshift(pd(n, l, c))) : i || (l = yn(n, a), l != null && o.push(pd(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function _d(e, t) {
			F(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Bg || (Bg = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: Zh,
				possibleRegistrationNames: Qh
			};
			ln(e) || typeof t.is == "string" || pn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function vd(e, t, n, r) {
			t !== n && (n = wd(n), wd(t) !== n && (r[e] = t));
		}
		function yd(e) {
			return !!(e.getAttribute("vt-share") || e.getAttribute("vt-exit") || e.getAttribute("vt-enter") || e.getAttribute("vt-update"));
		}
		function bd(e) {
			if (!yd(e)) return !1;
			var t = e.getAttribute("vt-name");
			return e = e.style["view-transition-name"], t ? t === e : e.startsWith("_T_");
		}
		function xd(e, t, n) {
			t.forEach(function(t) {
				t === "style" ? e.getAttribute(t) !== "" && (t = e.style, (t.length === 1 && t[0] === "view-transition-name" || t.length === 2 && t[0] === "view-transition-class" && t[1] === "view-transition-name") && bd(e) || (n.style = jd(e))) : n[Ad(t)] = e.getAttribute(t);
			});
		}
		function Sd(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function Cd(e, t) {
			return e = e.namespaceURI === Mg || e.namespaceURI === Ng ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function wd(e) {
			return Ne(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Me(e)), Pe(e)), (typeof e == "string" ? e : "" + e).replace(Xw, "\n").replace(Zw, "");
		}
		function Td(e, t) {
			return t = wd(t), wd(e) === t;
		}
		function Ed(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					if (typeof r == "string") rn(r, t, !1), t === "body" || t === "textarea" && r === "" || an(e, r);
					else if (typeof r == "number" || typeof r == "bigint") rn("" + r, t, !1), t !== "body" && an(e, "" + r);
					else return;
					break;
				case "className":
					yt(e, "class", r);
					break;
				case "tabIndex":
					yt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					yt(e, n, r);
					break;
				case "style":
					cn(e, r, a);
					return;
				case "data": if (t !== "object") {
					yt(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					Fe(r, n), r = mn(r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || qw || (qw = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || Kw || (Kw = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || Ww ? t !== "button" || i.type == null || i.type === "submit" || Ww ? typeof r == "function" && (i.name == null || Gw || (Gw = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || qw || (qw = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || Kw || (Kw = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (Ww = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (Ww = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					}
					if (typeof a == "function" && (n === "formAction" ? (t !== "input" && Ed(e, t, "name", i.name, i, null), Ed(e, t, "formEncType", i.formEncType, i, null), Ed(e, t, "formMethod", i.formMethod, i, null), Ed(e, t, "formTarget", i.formTarget, i, null)) : (Ed(e, t, "encType", i.encType, i, null), Ed(e, t, "method", i.method, i, null), Ed(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					Fe(r, n), r = mn(r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && Sd(n, r), e.onclick = hn);
					return;
				case "onScroll":
					r != null && (typeof r != "function" && Sd(n, r), H("scroll", e));
					return;
				case "onScrollEnd":
					r != null && (typeof r != "function" && Sd(n, r), H("scrollend", e));
					return;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							a?.__html !== n && (e.innerHTML = n);
						}
					}
					break;
				case "multiple":
					e.multiple = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "muted":
					e.muted = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": break;
				case "autoFocus": break;
				case "xlinkHref":
					if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
						e.removeAttribute("xlink:href");
						break;
					}
					Fe(r, n), n = mn(r), e.setAttributeNS(Qw, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (Fe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || Yw[n] || (Yw[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "credentialless":
				case "default":
				case "defer":
				case "disabled":
				case "disablePictureInPicture":
				case "disableRemotePlayback":
				case "formNoValidate":
				case "hidden":
				case "loop":
				case "noModule":
				case "noValidate":
				case "open":
				case "playsInline":
				case "readOnly":
				case "required":
				case "reversed":
				case "scoped":
				case "seamless":
				case "itemScope":
					r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
					break;
				case "capture":
				case "download":
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (Fe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (Fe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (Fe(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					H("beforetoggle", e), H("toggle", e), vt(e, "popover", r);
					break;
				case "xlinkActuate":
					bt(e, Qw, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					bt(e, Qw, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					bt(e, Qw, "xlink:role", r);
					break;
				case "xlinkShow":
					bt(e, Qw, "xlink:show", r);
					break;
				case "xlinkTitle":
					bt(e, Qw, "xlink:title", r);
					break;
				case "xlinkType":
					bt(e, Qw, "xlink:type", r);
					break;
				case "xmlBase":
					bt(e, $w, "xml:base", r);
					break;
				case "xmlLang":
					bt(e, $w, "xml:lang", r);
					break;
				case "xmlSpace":
					bt(e, $w, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), vt(e, "is", r);
					break;
				case "innerText":
				case "textContent": return;
				case "popoverTarget": Jw || typeof r != "object" || !r || (Jw = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = un(n), vt(e, n, r);
				else {
					Zh.hasOwnProperty(n) && r != null && typeof r != "function" && Sd(n, r);
					return;
				}
			}
			rg = !0;
		}
		function Dd(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					cn(e, r, a);
					return;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							a?.__html !== n && (e.innerHTML = n);
						}
					}
					break;
				case "children":
					if (typeof r == "string") an(e, r);
					else if (typeof r == "number" || typeof r == "bigint") an(e, "" + r);
					else return;
					break;
				case "onScroll":
					r != null && (typeof r != "function" && Sd(n, r), H("scroll", e));
					return;
				case "onScrollEnd":
					r != null && (typeof r != "function" && Sd(n, r), H("scrollend", e));
					return;
				case "onClick":
					r != null && (typeof r != "function" && Sd(n, r), e.onclick = hn);
					return;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": return;
				case "innerText":
				case "textContent": return;
				default:
					if (Zh.hasOwnProperty(n)) r != null && typeof r != "function" && Sd(n, r);
					else a: {
						if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), a = n.slice(2, i ? n.length - 7 : void 0), t = e[Hh] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(a, t, i), typeof r == "function")) {
							typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(a, r, i);
							break a;
						}
						rg = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : vt(e, n, r);
					}
					return;
			}
			rg = !0;
		}
		function Od(e, t, n) {
			switch (_d(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					H("error", e), H("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: Ed(e, t, a, o, n, null);
						}
					}
					i && Ed(e, t, "srcSet", n.srcSet, n, null), r && Ed(e, t, "src", n.src, n, null);
					return;
				case "input":
					mt("input", n), H("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: Ed(e, t, r, u, n, null);
						}
					}
					Et(e, n), Ot(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in mt("select", n), H("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Ed(e, t, i, s, n, null);
					}
					Nt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && Mt(e, !!r, n, !0) : Mt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in mt("textarea", n), H("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: Ed(e, t, o, s, n, null);
					}
					Pt(e, n), It(e, r, i, a);
					return;
				case "option":
					for (c in At(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: Ed(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					H("beforetoggle", e), H("toggle", e), H("cancel", e), H("close", e);
					break;
				case "iframe":
				case "object":
					H("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < zw.length; r++) H(zw[r], e);
					break;
				case "image":
					H("error", e), H("load", e);
					break;
				case "details":
					H("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": H("error", e), H("load", e);
				case "area":
				case "base":
				case "br":
				case "col":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "track":
				case "wbr":
				case "menuitem":
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: Ed(e, t, l, r, n, null);
					}
					return;
				default: if (ln(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Dd(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && Ed(e, t, s, r, n, null));
		}
		function kd(e, t, n, r) {
			switch (_d(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || Ed(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								p !== d && (rg = !0), a = p;
								break;
							case "name":
								p !== d && (rg = !0), i = p;
								break;
							case "checked":
								p !== d && (rg = !0), l = p;
								break;
							case "defaultChecked":
								p !== d && (rg = !0), u = p;
								break;
							case "value":
								p !== d && (rg = !0), o = p;
								break;
							case "defaultValue":
								p !== d && (rg = !0), s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && Ed(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || Uw || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), Uw = !0), !t || r || Hw || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), Hw = !0), Dt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || Ed(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							a !== c && (rg = !0), f = a;
							break;
						case "defaultValue":
							a !== c && (rg = !0), s = a;
							break;
						case "multiple": a !== c && (rg = !0), o = a;
						default: a !== c && Ed(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? Mt(e, !!t, t ? [] : "", !1) : Mt(e, !!t, r, !0)) : Mt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: Ed(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							i !== a && (rg = !0), f = i;
							break;
						case "defaultValue":
							i !== a && (rg = !0), p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && Ed(e, t, o, i, r, a);
					}
					Ft(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: Ed(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							f !== p && (rg = !0), e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: Ed(e, t, c, f, r, p);
					}
					return;
				case "img":
				case "link":
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr":
				case "menuitem":
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && Ed(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: Ed(e, t, l, f, r, p);
					}
					return;
				default: if (ln(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Dd(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Dd(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && Ed(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || Ed(e, t, d, f, r, p);
		}
		function Ad(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function jd(e) {
			for (var t = {}, n = e.style, r = 0; r < n.length; r++) {
				var i = n[r];
				i === "view-transition-name" && bd(e) || (t[i] = n.getPropertyValue(i));
			}
			return t;
		}
		function Md(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Ie(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || jg.has(a) ? (Ie(o, a), r += i + a.replace(xg, "-$1").toLowerCase().replace(Sg, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(xg, "-$1").toLowerCase().replace(Sg, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = wd(r), t = wd(t), t === r || t[t.length - 1] === ";" && yd(e) || (n.style = jd(e)));
			}
		}
		function Nd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (Fe(r, t), e === "" + r) return;
			}
			vd(t, e, r, a);
		}
		function Pd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			vd(t, e, r, a);
		}
		function Fd(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (Fe(r, n), e === "" + r) return;
			}
			vd(t, e, r, a);
		}
		function Id(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (Fe(r, t), e === "" + r)) return;
			}
			vd(t, e, r, a);
		}
		function Ld(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (Fe(r, t), n = mn("" + r), e === n) return;
			}
			vd(t, e, r, a);
		}
		function Rd(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				case "vt-name":
				case "vt-update":
				case "vt-enter":
				case "vt-exit":
				case "vt-share":
				case "vt-parent-enter":
				case "vt-parent-exit": break;
				default: a.add(o[s].name);
			}
			if (ln(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (Zh.hasOwnProperty(c)) typeof l != "function" && Sd(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || vd("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = Cd(e, l), vd(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Md(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = _t(e, "class", l), vd("className", o, l, i);
								continue;
							default: r.context === _T && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = _t(e, c, l), vd(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (Zh.hasOwnProperty(l)) typeof c != "function" && Sd(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || vd("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = Cd(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Nd(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Nd(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Md(e, c, i);
						continue;
					case "multiple":
						a.delete(l), vd(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), vd(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), vd(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), vd(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Ld(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						}
						if (o === tT) {
							a.delete(l.toLowerCase()), vd(l, "function", c, i);
							continue;
						}
						Ld(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Ld(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Fd(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Fd(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Fd(e, l, l, c, a, i);
						continue;
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "credentialless":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
						Pd(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (Fe(c, o), s === "" + c) break a;
							}
							vd(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (Fe(c, o), s === "" + c)) break a;
							}
							vd(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Id(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Id(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Nd(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Nd(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Nd(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Nd(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Nd(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Nd(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Nd(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Nd(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Nd(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Nd(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || Yw[l] || (Yw[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), Pd(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = un(l), o = !1, r.context === _T && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Fg.hasOwnProperty(u) && Fg[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, ht(d)) {
							if (u.hasAttribute(d)) u = d.toLowerCase() === "nonce" ? u.nonce : u.getAttribute(d), Fe(s, d), s = u === "" + s ? s : u;
							else {
								switch (typeof s) {
									case "function":
									case "symbol": break a;
									case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
								}
								s = s === void 0 ? void 0 : null;
							}
						} else s = void 0;
						o || vd(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && xd(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function zd(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Bd(e) {
			switch (e) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link": return !0;
				default: return !1;
			}
		}
		function Vd() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Bd(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Bd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Hd(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Ud(e) {
			switch (e) {
				case Ng: return vT;
				case Mg: return yT;
				default: return _T;
			}
		}
		function Wd(e, t) {
			if (e === _T) switch (t) {
				case "svg": return vT;
				case "math": return yT;
				default: return _T;
			}
			return e === vT && t === "foreignObject" ? _T : e;
		}
		function Gd(e, t, n, r) {
			return n = Hd(n).createElement(e), n[Vh] = r, n[Hh] = t, Od(n, e, t), ut(n), n;
		}
		function Kd(e) {
			if (e = e.type, typeof e != "string" || e === "" || (e = e.toLowerCase(), e === "module" || e === "importmap" || e === "speculationrules")) return !1;
			switch (e) {
				case "application/ecmascript":
				case "application/javascript":
				case "application/x-ecmascript":
				case "application/x-javascript":
				case "text/ecmascript":
				case "text/javascript":
				case "text/javascript1.0":
				case "text/javascript1.1":
				case "text/javascript1.2":
				case "text/javascript1.3":
				case "text/javascript1.4":
				case "text/javascript1.5":
				case "text/jscript":
				case "text/livescript":
				case "text/x-ecmascript":
				case "text/x-javascript": return !1;
			}
			return !0;
		}
		function qd(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Jd() {
			var e = window.event;
			return e && e.type === "popstate" ? e !== wT && (wT = e, !0) : (wT = null, !1);
		}
		function Yd() {
			var e = window.event;
			return e && e !== TT ? e.type : null;
		}
		function Xd() {
			var e = window.event;
			return e && e !== TT ? e.timeStamp : -1.1;
		}
		function Zd(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function Qd(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function $d() {}
		function ef(e, t, n, r) {
			kd(e, t, n, r), e[Hh] = r;
		}
		function tf(e) {
			an(e, "");
		}
		function nf(e, t, n) {
			e.nodeValue = n;
		}
		function rf(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Hh] || null;
				if (t !== null) {
					var n = st(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, j(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, j(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function af(e) {
			return e === "head";
		}
		function of(e, t) {
			e.removeChild(t);
		}
		function sf(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function cf(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) {
					if (n = i.data, n === oT || n === iT) {
						if (r === 0) {
							e.removeChild(i), fm(t);
							return;
						}
						r--;
					} else if (n === aT || n === sT || n === cT || n === lT || n === rT) r++;
					else if (n === uT) pp(e.ownerDocument.documentElement);
					else if (n === fT) {
						n = e.ownerDocument.head, pp(n);
						for (var a = n.firstChild; a;) {
							var o = a.nextSibling, s = a.nodeName;
							a[Jh] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
						}
					} else n === dT && pp(e.ownerDocument.body);
				}
				n = i;
			} while (n);
			fm(t);
		}
		function lf(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
					if (n = r.data, n === oT) {
						if (e === 0) break;
						e--;
					} else n !== aT && n !== sT && n !== cT && n !== lT || e++;
				}
				n = r;
			} while (n);
		}
		function uf(e) {
			lf(e, !0);
		}
		function df(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function ff(e) {
			e.nodeValue = "";
		}
		function pf(e) {
			lf(e, !1);
		}
		function mf(e, t) {
			t = t[gT], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function hf(e, t) {
			e.nodeValue = t;
		}
		function gf(e) {
			for (var t = e.firstChild; t != null;) {
				if (t.nodeType === 1 && getComputedStyle(t).display === "block") {
					j(st(t) || st(e), function(e, t) {
						console.error("You're about to start a <ViewTransition> around a display: inline element <%s>, which itself has a display: block element <%s> inside it. This might trigger a bug in Safari which causes the View Transition to be skipped with a duplicate name error.\nhttps://bugs.webkit.org/show_bug.cgi?id=290923", e.toLocaleLowerCase(), t.toLocaleLowerCase());
					}, e.tagName, t.tagName);
					break;
				}
				if (t.firstChild != null) t = t.firstChild;
				else {
					if (t === e) break;
					for (; t.nextSibling == null && t.parentNode != null && t.parentNode !== e;) t = t.parentNode;
					t = t.nextSibling;
				}
			}
		}
		function _f(e, t, n) {
			if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
				if (t = e.getClientRects(), t.length === 1) var r = 1;
				else for (var i = r = 0; i < t.length; i++) {
					var a = t[i];
					0 < a.width && 0 < a.height && r++;
				}
				r === 1 ? (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom) : gf(e);
			}
		}
		function vf(e, t) {
			e = e.style, t = t[gT];
			var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
			e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
		}
		function yf(e, t, n) {
			return n = n.ownerDocument.defaultView, {
				rect: e,
				abs: t.position === "absolute" || t.position === "fixed",
				clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
				view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
			};
		}
		function bf(e) {
			return yf(e.getBoundingClientRect(), getComputedStyle(e), e);
		}
		function xf(e) {
			var t = e.getBoundingClientRect();
			t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
			var n = getComputedStyle(e);
			return yf(t, n, e);
		}
		function Sf(e, t) {
			if (typeof e == "object" && e) switch (e.name) {
				case "TimeoutError": return Error("A ViewTransition timed out because a Navigation stalled. This can happen if a Navigation is blocked on React itself. Such as if it's resolved inside useEffect. This can be solved by moving the resolution to useLayoutEffect.", { cause: e });
				case "AbortError": return t ? null : Error("A ViewTransition was aborted early. This might be because you have other View Transition libraries on the page and only one can run at a time. To avoid this, use only React's built-in <ViewTransition> to coordinate.", { cause: e });
				case "InvalidStateError": if (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") return null;
			}
			return e;
		}
		function Cf(e) {
			return e.documentElement.clientHeight;
		}
		function wf(e) {
			this.addEventListener("load", e), this.addEventListener("error", e);
		}
		function Tf(e, t, n, r, i, a, o, s, c, l, u) {
			var d = t.nodeType === 9 ? t : t.ownerDocument;
			try {
				var f = d.startViewTransition({
					update: function() {
						var t = d.defaultView, n = t.navigation && t.navigation.transition, o = d.fonts.status;
						r();
						var s = [];
						if (o === "loaded" && (Cf(d), d.fonts.status === "loading" && s.push(d.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, f = 0; f < c.length; f++) {
							var p = c[f];
							if (!p.complete) {
								var m = p.getBoundingClientRect();
								if (0 < m.bottom && 0 < m.right && m.top < t.innerHeight && m.left < t.innerWidth) {
									if (u += Np(p), u > YT) {
										s.length = o;
										break;
									}
									p = new Promise(wf.bind(p)), s.push(p);
								}
							}
						}
						if (0 < s.length) return l(0 < o ? s.length > o ? "Waiting on Fonts and Images" : "Waiting on Fonts" : "Waiting on Images"), t = Promise.race([Promise.all(s), new Promise(function(e) {
							return setTimeout(e, MT);
						})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
						if (i(), n) return n.finished.then(a, a);
						a();
					},
					types: n
				});
				d.__reactViewTransition = f;
				var p = [];
				return f.ready.then(function() {
					for (var e = d.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
						var n = e[t], r = n.effect, i = r.pseudoElement;
						if (i != null && i.startsWith("::view-transition")) {
							p.push(n), n = r.getKeyframes();
							for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
								var l = n[c], u = l.width;
								if (i === void 0) i = u;
								else if (i !== u) {
									s = !1;
									break;
								}
								if (u = l.height, a === void 0) a = u;
								else if (a !== u) {
									s = !1;
									break;
								}
								delete l.width, delete l.height, l.transform === "none" && delete l.transform;
							}
							s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
						}
					}
					o();
				}, function(e) {
					d.__reactViewTransition === f && (d.__reactViewTransition = null);
					try {
						e = Sf(e, !1), e !== null && c(e);
					} finally {
						r(), i(), o(), u();
					}
				}), f.finished.finally(function() {
					for (var e = 0; e < p.length; e++) p[e].cancel();
					d.__reactViewTransition === f && (d.__reactViewTransition = null), u(), s();
				}), f;
			} catch {
				return r(), i(), u(), o(), null;
			}
		}
		function Ef(e, t) {
			this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
		}
		function Df(e) {
			return {
				name: e,
				group: new Ef("group", e),
				imagePair: new Ef("image-pair", e),
				old: new Ef("old", e),
				new: new Ef("new", e)
			};
		}
		function Of(e) {
			this._fragmentFiber = e, this._observers = this._eventListeners = null;
		}
		function kf(e, t, n, r) {
			return se(e).addEventListener(t, n, r), !1;
		}
		function Af(e, t, n, r) {
			return se(e).removeEventListener(t, n, r), !1;
		}
		function jf(e) {
			return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
				capture: e.capture,
				passive: e.passive
			} : e;
		}
		function Mf(e) {
			return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
		}
		function Nf(e, t, n, r) {
			if (e.length === 0) return -1;
			r = Mf(r);
			for (var i = 0; i < e.length; i++) {
				var a = e[i];
				if (a.type === t && a.listener === n && Mf(a.optionsOrUseCapture) === r) return i;
			}
			return -1;
		}
		function Pf(e, t) {
			return e.tag !== 6 && (e = se(e), cp(e, t));
		}
		function Ff(e, t) {
			return t.push(e), !1;
		}
		function If(e, t) {
			return e.tag !== 6 && (e = se(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
		}
		function Lf(e, t) {
			return e.tag === 6 || (e = se(e), t.observe(e)), !1;
		}
		function Rf(e, t) {
			return e.tag === 6 || (e = se(e), t.unobserve(e)), !1;
		}
		function zf(e, t, n) {
			NT.push({
				fragmentInstance: e,
				observer: t,
				instance: n
			}), PT || (PT = !0, lp(function() {
				PT = !1;
				var e = NT;
				NT = [];
				for (var t = 0; t < e.length; t++) {
					var n = e[t];
					n.observer.unobserve(n.instance);
				}
			}));
		}
		function Bf(e, t) {
			if (e.tag === 6) {
				e = e.stateNode;
				var n = e.ownerDocument.createRange();
				n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
			} else e = se(e), t.push.apply(t, e.getClientRects());
			return !1;
		}
		function Vf(e, t, n, r, i) {
			var a = ot(i);
			if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
				if (n = !!a) a: {
					for (; a !== null;) {
						if (a.tag === 7 && (a === t || a.alternate === t)) {
							n = !0;
							break a;
						}
						a = a.return;
					}
					n = !1;
				}
				return n;
			}
			if (e & Node.DOCUMENT_POSITION_CONTAINS) {
				if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
				a: {
					for (a = t, t = re(t); a !== null;) {
						if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
							a = !0;
							break a;
						}
						a = a.return;
					}
					a = !1;
				}
				return a;
			}
			return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = ue(n, a, E), t === null ? t = !1 : (T(t, !0, ce, a, n), a = bm, bm = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = ue(r, a, E), t === null ? t = !1 : (T(t, !0, le, a, r), a = bm, xm = bm = null, t = a !== null)), t) : !1;
		}
		function Hf(e, t) {
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
		}
		function Uf(e, t) {
			return e = se(e), Wf(e, t), !1;
		}
		function Wf(e, t) {
			e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
		}
		function Gf(e, t) {
			var n = t._eventListeners;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.addEventListener(i.type, i.attachedListener, jf(i.optionsOrUseCapture));
			}
			e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
				for (var r = 0, i = 0; i < NT.length; i++) {
					var a = NT[i];
					(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (NT[r++] = a);
				}
				NT.length = r, n.observe(e);
			}), Wf(e, t));
		}
		function Kf(e, t) {
			var n = t._eventListeners;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.removeEventListener(i.type, i.attachedListener, jf(i.optionsOrUseCapture));
			}
			e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
				typeof n.rootMargin == "string" ? zf(t, n, e) : n.unobserve(e);
			}), e.reactFragments != null && e.reactFragments.delete(t));
		}
		function qf(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						qf(n), at(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function Jf(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) {
					if (t === "input" && e.type === "hidden") {
						Fe(i.name, "name");
						var a = i.name == null ? null : "" + i.name;
						if (i.type === "hidden" && e.getAttribute("name") === a) return e;
					} else return e;
				} else if (!e[Jh]) switch (t) {
					case "meta":
						if (!e.hasAttribute("itemprop")) break;
						return e;
					case "link":
						if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
						return e;
					case "style":
						if (e.hasAttribute("data-precedence")) break;
						return e;
					case "script":
						if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
						return e;
					default: return e;
				}
				if (e = ep(e.nextSibling), e === null) break;
			}
			return null;
		}
		function Yf(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = ep(e.nextSibling), e === null)) return null;
			return e;
		}
		function Xf(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = ep(e.nextSibling), e === null)) return null;
			return e;
		}
		function Zf(e) {
			return e.data === sT || e.data === cT;
		}
		function Qf(e) {
			return e.data === lT || e.data === sT && e.ownerDocument.readyState !== hT;
		}
		function $f(e, t) {
			var n = e.ownerDocument;
			if (e.data === cT) e._reactRetry = t;
			else if (e.data !== sT || n.readyState !== hT) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function ep(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === aT || t === lT || t === sT || t === cT || t === rT || t === pT || t === mT) break;
					if (t === oT || t === iT) return null;
				}
			}
			return e;
		}
		function tp(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Ad(a.name)] = a.name.toLowerCase() === "style" ? jd(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === rT ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function np(e, t, n) {
			return n === null || !0 !== n[nT] ? (e.nodeValue === t ? e = null : (t = wd(t), e = wd(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function rp(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === oT || n === iT) {
						if (t === 0) return ep(e.nextSibling);
						t--;
					} else n !== aT && n !== lT && n !== sT && n !== cT && n !== rT || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function ip(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === aT || n === lT || n === sT || n === cT || n === rT) {
						if (t === 0) return e;
						t--;
					} else n !== oT && n !== iT || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function ap(e) {
			fm(e);
		}
		function op(e) {
			fm(e);
		}
		function sp(e) {
			fm(e);
		}
		function cp(e, t) {
			function n() {
				r = !0;
			}
			if (e.ownerDocument.activeElement === e) return !0;
			var r = !1;
			try {
				e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
			} finally {
				e.ownerDocument.removeEventListener("focus", n, !0);
			}
			return r;
		}
		function lp(e) {
			AT(function() {
				AT(function(t) {
					return e(t);
				});
			});
		}
		function up(e, t, n, r, i) {
			switch (i && nn(e, r.ancestorInfo), t = Hd(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function dp(e, t, n, r) {
			if (!n[Uh] && st(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Od(n, e, t), n[Vh] = r, n[Hh] = t;
		}
		function fp(e, t, n) {
			for (var r in n) {
				var i = n[r];
				n.hasOwnProperty(r) && i != null && Ed(e, t, r, null, eT, i);
			}
			n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === hn && (e.onclick = null), at(e);
		}
		function pp(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			at(e);
		}
		function mp(e) {
			if (typeof e.getRootNode == "function") {
				var t = e.getRootNode();
				if (t.nodeType === 9 || t.nodeType === 11) return t;
			}
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function hp(e, t, n) {
			var r = WT;
			if (r && typeof t == "string" && t) {
				var i = M(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), HT.has(i) || (HT.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Od(t, "link", e), ut(t), r.head.appendChild(t)));
			}
		}
		function gp(e, t, n, r) {
			var i = (i = Xm.current) ? mp(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = vp(n.href), t = lt(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = vp(n.href);
						var a = lt(i).hoistableStyles, o = a.get(e);
						if (o || (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: IT,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(yp(e))) ? a._p || (o.instance = a, o.state.loading = LT | BT) : (a = VT.get(e), a || (a = {
							rel: "preload",
							as: "style",
							href: n.href,
							crossOrigin: n.crossOrigin,
							integrity: n.integrity,
							media: n.media,
							hrefLang: n.hrefLang,
							referrerPolicy: n.referrerPolicy
						}, VT.set(e, a)), xp(i, e, a, o.state))), t && r === null) throw n = "\n\n  - " + _p(t) + "\n  + " + _p(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + _p(t) + "\n  + " + _p(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Sp(n), t = lt(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function _p(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : fh.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : fh.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : fh.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function vp(e) {
			return "href=\"" + M(e) + "\"";
		}
		function yp(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function bp(e) {
			return U({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function xp(e, t, n, r) {
			if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
				if (!0 !== t[Yh]) {
					r.loading = LT;
					return;
				}
			} else t = e.createElement("link"), t[Yh] = !0, t.onload = t.onerror = dt.bind(null, t), Od(t, "link", n), ut(t), e.head.appendChild(t);
			r.preload = t, t.addEventListener("load", function() {
				return r.loading |= LT;
			}), t.addEventListener("error", function() {
				return r.loading |= RT;
			});
		}
		function Sp(e) {
			return "[src=\"" + M(e) + "\"]";
		}
		function Cp(e) {
			return "script[async]" + e;
		}
		function wp(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + M(n.href) + "\"]");
					if (r) return t.instance = r, ut(r), r;
					var i = U({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), ut(r), Od(r, "style", i), Tp(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = vp(n.href);
					var a = e.querySelector(yp(i));
					if (a) return t.state.loading |= BT, t.instance = a, ut(a), a;
					r = bp(n), (i = VT.get(i)) && Ep(r, i), a = (e.ownerDocument || e).createElement("link"), ut(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Od(a, "link", r), t.state.loading |= BT, Tp(a, n.precedence, e), t.instance = a;
				case "script": return a = Sp(n.src), (i = e.querySelector(Cp(a))) ? (t.instance = i, ut(i), i) : (r = n, (i = VT.get(a)) && (r = U({}, n), Dp(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), ut(i), Od(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & BT) === IT && (r = t.instance, t.state.loading |= BT, Tp(r, n.precedence, e));
			return t.instance;
		}
		function Tp(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Ep(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Dp(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Op(e, t, n) {
			if (GT === null) {
				var r = /* @__PURE__ */ new Map(), i = GT = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = GT, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[Jh] || a[Vh] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Ng) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function kp(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Ap(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === vT || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = zd(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function jp(e, t) {
			return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
		}
		function Mp(e) {
			return e.type !== "stylesheet" || (e.state.loading & zT) !== IT;
		}
		function Np(e) {
			return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
		}
		function Pp(e, t) {
			typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Np(t), e.suspenseyImages.push(t)), e = zp.bind(e), t.decode().then(e, e));
		}
		function Fp(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & BT) === IT) {
				if (n.instance === null) {
					var i = vp(r.href), a = t.querySelector(yp(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Rp.bind(e), t.then(e, e)), n.state.loading |= BT, n.instance = a, ut(a);
						return;
					}
					a = t.ownerDocument || t, r = bp(r), (i = VT.get(i)) && Ep(r, i), a = a.createElement("link"), ut(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Od(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & zT) === IT && (e.count++, n = Rp.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Ip(e, t) {
			return e.stylesheets && e.count === 0 && Bp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Bp(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, KT + t);
				0 < e.imgBytes && YT === 0 && (YT = 125 * Vd() * JT);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Bp(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > YT ? 50 : qT) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Lp(e) {
			if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
				if (e.stylesheets) Bp(e, e.stylesheets);
				else if (e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}
		}
		function Rp() {
			this.count--, Lp(this);
		}
		function zp() {
			this.imgCount--, Lp(this);
		}
		function Bp(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, ZT = /* @__PURE__ */ new Map(), t.forEach(Vp, e), ZT = null, Rp.call(e));
		}
		function Vp(e, t) {
			if (!(t.state.loading & BT)) {
				var n = ZT.get(e);
				if (n) var r = n.get(XT);
				else {
					n = /* @__PURE__ */ new Map(), ZT.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(XT, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(XT, i), n.set(o, i), this.count++, r = Rp.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= BT;
			}
		}
		function Hp(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = OT, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qe(0), this.hiddenUpdates = qe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Up(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Hp(e, t, n, o, c, l, u, d, s), t = zv, !0 === a && (t |= Bv | Vv), t |= K, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = vi(), yi(t), e.pooledCache = t, yi(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, pa(a), e;
		}
		function Wp(e) {
			return e ? (e = Iv, e) : Iv;
		}
		function Gp(e, t, n, r, i, a) {
			if (Dh && typeof Dh.onScheduleFiberRoot == "function") try {
				Dh.onScheduleFiberRoot(Eh, r, n);
			} catch (e) {
				Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = Wp(i), r.context === null ? r.context = i : r.pendingContext = i, dh && uh !== null && !aE && (aE = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", D(uh) || "Unknown")), r = ha(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = ga(e, r, t), n !== null && (Ci(t, "root.render()", null), Ql(n, e, t), _a(n, e, t));
		}
		function Kp(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function qp(e, t) {
			Kp(e, t), (e = e.alternate) && Kp(e, t);
		}
		function Jp(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = Tr(e, 67108864);
				t !== null && Ql(t, e, 67108864), qp(e, 67108864);
			}
		}
		function Yp(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = Yl(e);
				t = $e(t);
				var n = Tr(e, t);
				n !== null && Ql(n, e, t), qp(e, t);
			}
		}
		function Xp() {
			return uh;
		}
		function Zp(e, t, n, r) {
			var i = W.T;
			W.T = null;
			var a = Um.p;
			try {
				Um.p = Ih, $p(e, t, n, r);
			} finally {
				Um.p = a, W.T = i;
			}
		}
		function Qp(e, t, n, r) {
			var i = W.T;
			W.T = null;
			var a = Um.p;
			try {
				Um.p = Lh, $p(e, t, n, r);
			} finally {
				Um.p = a, W.T = i;
			}
		}
		function $p(e, t, n, r) {
			if (gE) {
				var i = em(r);
				if (i === null) fd(e, t, r, _E, n), rm(e, r);
				else if (am(i, e, t, n, r)) r.stopPropagation();
				else if (rm(e, r), t & 4 && -1 < TE.indexOf(e)) {
					for (; i !== null;) {
						var a = st(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Ve(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Ah(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										Xu(a), (fC & (rC | iC)) === nC && (HC = _h() + UC, Zu(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = Tr(a, 2), s !== null && Ql(s, a, 2), ru(), qp(a, 2);
						}
						if (a = em(r), a === null && fd(e, t, r, _E, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else fd(e, t, r, null, n);
			}
		}
		function em(e) {
			return e = gn(e), tm(e);
		}
		function tm(e) {
			if (_E = null, e = ot(e), e !== null) {
				var t = x(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = te(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return _E = e, null;
		}
		function nm(e) {
			switch (e) {
				case "beforetoggle":
				case "cancel":
				case "click":
				case "close":
				case "contextmenu":
				case "copy":
				case "cut":
				case "auxclick":
				case "dblclick":
				case "dragend":
				case "dragstart":
				case "drop":
				case "focusin":
				case "focusout":
				case "input":
				case "invalid":
				case "keydown":
				case "keypress":
				case "keyup":
				case "mousedown":
				case "mouseup":
				case "paste":
				case "pause":
				case "play":
				case "pointercancel":
				case "pointerdown":
				case "pointerup":
				case "ratechange":
				case "reset":
				case "seeked":
				case "submit":
				case "toggle":
				case "touchcancel":
				case "touchend":
				case "touchstart":
				case "volumechange":
				case "change":
				case "selectionchange":
				case "textInput":
				case "compositionstart":
				case "compositionend":
				case "compositionupdate":
				case "beforeblur":
				case "afterblur":
				case "beforeinput":
				case "blur":
				case "fullscreenchange":
				case "fullscreenerror":
				case "focus":
				case "hashchange":
				case "popstate":
				case "select":
				case "selectstart": return Ih;
				case "drag":
				case "dragenter":
				case "dragexit":
				case "dragleave":
				case "dragover":
				case "mousemove":
				case "mouseout":
				case "mouseover":
				case "pointermove":
				case "pointerout":
				case "pointerover":
				case "resize":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave": return Lh;
				case "message": switch (vh()) {
					case yh: return Ih;
					case bh: return Lh;
					case xh:
					case Sh: return Rh;
					case Ch: return zh;
					default: return Rh;
				}
				default: return Rh;
			}
		}
		function rm(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					yE = null;
					break;
				case "dragenter":
				case "dragleave":
					bE = null;
					break;
				case "mouseover":
				case "mouseout":
					xE = null;
					break;
				case "pointerover":
				case "pointerout":
					SE.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": CE.delete(t.pointerId);
			}
		}
		function im(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = st(t), t !== null && Jp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function am(e, t, n, r, i) {
			switch (t) {
				case "focusin": return yE = im(yE, e, t, n, r, i), !0;
				case "dragenter": return bE = im(bE, e, t, n, r, i), !0;
				case "mouseover": return xE = im(xE, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return SE.set(a, im(SE.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, CE.set(a, im(CE.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function om(e) {
			var t = ot(e.target);
			if (t !== null) {
				var n = x(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, it(e.priority, function() {
								Yp(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, it(e.priority, function() {
								Yp(n);
							});
							return;
						}
					} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
						e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
						return;
					}
				}
			}
			e.blockedOn = null;
		}
		function sm(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = em(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					qg !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), qg = i, n.target.dispatchEvent(r), qg === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), qg = null;
				} else return t = st(n), t !== null && Jp(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function cm(e, t, n) {
			sm(e) && n.delete(t);
		}
		function lm() {
			vE = !1, yE !== null && sm(yE) && (yE = null), bE !== null && sm(bE) && (bE = null), xE !== null && sm(xE) && (xE = null), SE.forEach(cm), CE.forEach(cm);
		}
		function um(e, t) {
			e.blockedOn === t && (e.blockedOn = null, vE || (vE = !0, _m.unstable_scheduleCallback(_m.unstable_NormalPriority, lm)));
		}
		function dm(e) {
			EE !== e && (EE = e, _m.unstable_scheduleCallback(_m.unstable_NormalPriority, function() {
				EE === e && (EE = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (tm(r || n) === null) continue;
						break;
					}
					var a = st(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), Zo(a, n, r, i));
				}
			}));
		}
		function fm(e) {
			function t(t) {
				return um(t, e);
			}
			yE !== null && um(yE, e), bE !== null && um(bE, e), xE !== null && um(xE, e), SE.forEach(t), CE.forEach(t);
			for (var n = 0; n < wE.length; n++) {
				var r = wE[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < wE.length && (n = wE[0], n.blockedOn === null);) om(n), n.blockedOn === null && wE.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Hh] || null;
				if (typeof a == "function") o || dm(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Hh] || null) s = o.formAction;
						else if (tm(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), dm(n);
				}
			}
		}
		function pm() {
			function e(e) {
				e.canIntercept && e.info === "react-transition" && e.intercept({
					handler: function() {
						return new Promise(function(e) {
							return i = e;
						});
					},
					focusReset: "manual",
					scroll: "manual"
				});
			}
			function t() {
				i !== null && (i(), i = null), r || setTimeout(n, 20);
			}
			function n() {
				if (!r && !navigation.transition) {
					var e = navigation.currentEntry;
					e && e.url != null && navigation.navigate(e.url, {
						state: e.getState(),
						info: "react-transition",
						history: "replace"
					});
				}
			}
			if (typeof navigation == "object") {
				var r = !1, i = null;
				return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
					r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
				};
			}
		}
		function mm(e) {
			this._internalRoot = e;
		}
		function hm(e) {
			this._internalRoot = e;
		}
		function gm(e) {
			e[Uh] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var _m = m(), vm = d(), ym = _(), bm = null, xm = null, U = Object.assign, Sm = Symbol.for("react.element"), Cm = Symbol.for("react.transitional.element"), wm = Symbol.for("react.portal"), Tm = Symbol.for("react.fragment"), Em = Symbol.for("react.strict_mode"), Dm = Symbol.for("react.profiler"), Om = Symbol.for("react.consumer"), km = Symbol.for("react.context"), Am = Symbol.for("react.forward_ref"), jm = Symbol.for("react.suspense"), Mm = Symbol.for("react.suspense_list"), Nm = Symbol.for("react.memo"), Pm = Symbol.for("react.lazy"), Fm = Symbol.for("react.activity"), Im = Symbol.for("react.legacy_hidden"), Lm = Symbol.for("react.memo_cache_sentinel"), Rm = Symbol.for("react.view_transition"), zm = Symbol.for("react.recoverable"), Bm = Symbol.iterator, Vm = Symbol.for("react.client.reference"), Hm = Array.isArray, W = vm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Um = ym.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Wm = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Gm = [], Km = [], qm = -1, Jm = me(null), Ym = me(null), Xm = me(null), Zm = me(null), Qm = 0, $m, eh, th, nh, rh, ih, ah;
		O.__reactDisabledLog = !0;
		var oh, sh, ch = !1, lh = new (typeof WeakMap == "function" ? WeakMap : Map)(), uh = null, dh = !1, fh = Object.prototype.hasOwnProperty, ph = _m.unstable_scheduleCallback, mh = _m.unstable_cancelCallback, hh = _m.unstable_shouldYield, gh = _m.unstable_requestPaint, _h = _m.unstable_now, vh = _m.unstable_getCurrentPriorityLevel, yh = _m.unstable_ImmediatePriority, bh = _m.unstable_UserBlockingPriority, xh = _m.unstable_NormalPriority, Sh = _m.unstable_LowPriority, Ch = _m.unstable_IdlePriority, wh = _m.log, Th = _m.unstable_setDisableYieldValue, Eh = null, Dh = null, Oh = !1, kh = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Ah = Math.clz32 ? Math.clz32 : Be, jh = Math.log, Mh = Math.LN2, Nh = 256, Ph = 262144, Fh = 4194304, Ih = 2, Lh = 8, Rh = 32, zh = 268435456, Bh = Math.random().toString(36).slice(2), Vh = "__reactFiber$" + Bh, Hh = "__reactProps$" + Bh, Uh = "__reactContainer$" + Bh, Wh = "__reactEvents$" + Bh, Gh = "__reactListeners$" + Bh, Kh = "__reactHandles$" + Bh, qh = "__reactResources$" + Bh, Jh = "__reactMarker$" + Bh, Yh = "__reactLoad$" + Bh, Xh = /* @__PURE__ */ new Set(), Zh = {}, Qh = {}, $h = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, eg = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), tg = {}, ng = {}, rg = !1, ig = /[\n"\\]/g, ag = !1, og = !1, sg = !1, cg = !1, lg = !1, ug = !1, dg = ["value", "defaultValue"], fg = !1, pg = /["'&<>\n\t]|^\s|\s$/, mg = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), hg = "applet caption html table td th marquee object select template foreignObject desc title".split(" "), gg = hg.concat(["button"]), _g = "dd dt li option optgroup p rp rt".split(" "), vg = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, yg = {}, bg = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlock: "borderBlockEndColor borderBlockEndStyle borderBlockEndWidth borderBlockStartColor borderBlockStartStyle borderBlockStartWidth".split(" "),
			borderBlockColor: ["borderBlockEndColor", "borderBlockStartColor"],
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBlockStyle: ["borderBlockEndStyle", "borderBlockStartStyle"],
			borderBlockWidth: ["borderBlockEndWidth", "borderBlockStartWidth"],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInline: "borderInlineEndColor borderInlineEndStyle borderInlineEndWidth borderInlineStartColor borderInlineStartStyle borderInlineStartWidth".split(" "),
			borderInlineColor: ["borderInlineEndColor", "borderInlineStartColor"],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderInlineStyle: ["borderInlineEndStyle", "borderInlineStartStyle"],
			borderInlineWidth: ["borderInlineEndWidth", "borderInlineStartWidth"],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			colorAdjust: ["printColorAdjust"],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			containIntrinsicSize: ["containIntrinsicHeight", "containIntrinsicWidth"],
			container: ["containerName", "containerType"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontSynthesis: [
				"fontSynthesisPosition",
				"fontSynthesisSmallCaps",
				"fontSynthesisStyle",
				"fontSynthesisWeight"
			],
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			inset: [
				"bottom",
				"left",
				"right",
				"top"
			],
			insetBlock: ["insetBlockEnd", "insetBlockStart"],
			insetInline: ["insetInlineEnd", "insetInlineStart"],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marginBlock: ["marginBlockEnd", "marginBlockStart"],
			marginInline: ["marginInlineEnd", "marginInlineStart"],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			offset: [
				"offsetAnchor",
				"offsetDistance",
				"offsetPath",
				"offsetPosition",
				"offsetRotate"
			],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			overscrollBehavior: ["overscrollBehaviorX", "overscrollBehaviorY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			paddingBlock: ["paddingBlockEnd", "paddingBlockStart"],
			paddingInline: ["paddingInlineEnd", "paddingInlineStart"],
			pageBreakAfter: ["breakAfter"],
			pageBreakBefore: ["breakBefore"],
			pageBreakInside: ["breakInside"],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			scrollMargin: [
				"scrollMarginBottom",
				"scrollMarginLeft",
				"scrollMarginRight",
				"scrollMarginTop"
			],
			scrollMarginBlock: ["scrollMarginBlockEnd", "scrollMarginBlockStart"],
			scrollMarginInline: ["scrollMarginInlineEnd", "scrollMarginInlineStart"],
			scrollPadding: [
				"scrollPaddingBottom",
				"scrollPaddingLeft",
				"scrollPaddingRight",
				"scrollPaddingTop"
			],
			scrollPaddingBlock: ["scrollPaddingBlockEnd", "scrollPaddingBlockStart"],
			scrollPaddingInline: ["scrollPaddingInlineEnd", "scrollPaddingInlineStart"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle",
				"textDecorationThickness"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			textWrap: ["textWrapMode", "textWrapStyle"],
			transition: [
				"transitionBehavior",
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			verticalAlign: [
				"alignmentBaseline",
				"baselineShift",
				"baselineSource"
			],
			whiteSpace: ["textWrapMode", "whiteSpaceCollapse"],
			wordWrap: ["overflowWrap"]
		}, xg = /([A-Z])/g, Sg = /^ms-/, Cg = /^(?:webkit|moz|o)[A-Z]/, wg = /^-ms-/, Tg = /-(.)/g, Eg = /;\s*$/, Dg = {}, Og = {}, kg = !1, Ag = !1, jg = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Mg = "http://www.w3.org/1998/Math/MathML", Ng = "http://www.w3.org/2000/svg", Pg = /* @__PURE__ */ new Map([
			["acceptCharset", "accept-charset"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
			["crossOrigin", "crossorigin"],
			["accentHeight", "accent-height"],
			["alignmentBaseline", "alignment-baseline"],
			["arabicForm", "arabic-form"],
			["baselineShift", "baseline-shift"],
			["capHeight", "cap-height"],
			["clipPath", "clip-path"],
			["clipRule", "clip-rule"],
			["colorInterpolation", "color-interpolation"],
			["colorInterpolationFilters", "color-interpolation-filters"],
			["colorProfile", "color-profile"],
			["colorRendering", "color-rendering"],
			["dominantBaseline", "dominant-baseline"],
			["enableBackground", "enable-background"],
			["fillOpacity", "fill-opacity"],
			["fillRule", "fill-rule"],
			["floodColor", "flood-color"],
			["floodOpacity", "flood-opacity"],
			["fontFamily", "font-family"],
			["fontSize", "font-size"],
			["fontSizeAdjust", "font-size-adjust"],
			["fontStretch", "font-stretch"],
			["fontStyle", "font-style"],
			["fontVariant", "font-variant"],
			["fontWeight", "font-weight"],
			["glyphName", "glyph-name"],
			["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
			["glyphOrientationVertical", "glyph-orientation-vertical"],
			["horizAdvX", "horiz-adv-x"],
			["horizOriginX", "horiz-origin-x"],
			["imageRendering", "image-rendering"],
			["letterSpacing", "letter-spacing"],
			["lightingColor", "lighting-color"],
			["markerEnd", "marker-end"],
			["markerMid", "marker-mid"],
			["markerStart", "marker-start"],
			["maskType", "mask-type"],
			["overlinePosition", "overline-position"],
			["overlineThickness", "overline-thickness"],
			["paintOrder", "paint-order"],
			["panose-1", "panose-1"],
			["pointerEvents", "pointer-events"],
			["renderingIntent", "rendering-intent"],
			["shapeRendering", "shape-rendering"],
			["stopColor", "stop-color"],
			["stopOpacity", "stop-opacity"],
			["strikethroughPosition", "strikethrough-position"],
			["strikethroughThickness", "strikethrough-thickness"],
			["strokeDasharray", "stroke-dasharray"],
			["strokeDashoffset", "stroke-dashoffset"],
			["strokeLinecap", "stroke-linecap"],
			["strokeLinejoin", "stroke-linejoin"],
			["strokeMiterlimit", "stroke-miterlimit"],
			["strokeOpacity", "stroke-opacity"],
			["strokeWidth", "stroke-width"],
			["textAnchor", "text-anchor"],
			["textDecoration", "text-decoration"],
			["textRendering", "text-rendering"],
			["transformOrigin", "transform-origin"],
			["underlinePosition", "underline-position"],
			["underlineThickness", "underline-thickness"],
			["unicodeBidi", "unicode-bidi"],
			["unicodeRange", "unicode-range"],
			["unitsPerEm", "units-per-em"],
			["vAlphabetic", "v-alphabetic"],
			["vHanging", "v-hanging"],
			["vIdeographic", "v-ideographic"],
			["vMathematical", "v-mathematical"],
			["vectorEffect", "vector-effect"],
			["vertAdvY", "vert-adv-y"],
			["vertOriginX", "vert-origin-x"],
			["vertOriginY", "vert-origin-y"],
			["wordSpacing", "word-spacing"],
			["writingMode", "writing-mode"],
			["xmlnsXlink", "xmlns:xlink"],
			["xHeight", "x-height"]
		]), Fg = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			credentialless: "credentialless",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			masktype: "maskType",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, Ig = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Lg = {}, Rg = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), zg = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Bg = !1, Vg = {}, Hg = /^on./, Ug = /^on[^A-Z]/, Wg = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Gg = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Kg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, qg = null, Jg = null, Yg = null, Xg = !1, Zg = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Qg = !1;
		if (Zg) try {
			var $g = {};
			Object.defineProperty($g, "passive", { get: function() {
				Qg = !0;
			} }), window.addEventListener("test", $g, $g), window.removeEventListener("test", $g, $g);
		} catch {
			Qg = !1;
		}
		var e_ = null, t_ = null, n_ = null, r_ = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, i_ = wn(r_), a_ = U({}, r_, {
			view: 0,
			detail: 0
		}), o_ = wn(a_), s_, c_, l_, u_ = U({}, a_, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: En,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== l_ && (l_ && e.type === "mousemove" ? (s_ = e.screenX - l_.screenX, c_ = e.screenY - l_.screenY) : c_ = s_ = 0, l_ = e), s_);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : c_;
			}
		}), d_ = wn(u_), f_ = wn(U({}, u_, { dataTransfer: 0 })), p_ = wn(U({}, a_, { relatedTarget: 0 })), m_ = wn(U({}, r_, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), h_ = wn(U({}, r_, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), g_ = wn(U({}, r_, { data: 0 })), __ = g_, v_ = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		}, y_ = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta"
		}, b_ = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, x_ = wn(U({}, a_, {
			key: function(e) {
				if (e.key) {
					var t = v_[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = xn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? y_[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: En,
			charCode: function(e) {
				return e.type === "keypress" ? xn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? xn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), S_ = wn(U({}, u_, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0
		})), C_ = wn(U({}, r_, { submitter: 0 })), w_ = wn(U({}, a_, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: En
		})), T_ = wn(U({}, r_, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), E_ = wn(U({}, u_, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), D_ = wn(U({}, r_, {
			newState: 0,
			oldState: 0,
			source: 0
		})), O_ = [
			9,
			13,
			27,
			32
		], k_ = 229, A_ = Zg && "CompositionEvent" in window, j_ = null;
		Zg && "documentMode" in document && (j_ = document.documentMode);
		var M_ = Zg && "TextEvent" in window && !j_, N_ = Zg && (!A_ || j_ && 8 < j_ && 11 >= j_), P_ = 32, F_ = String.fromCharCode(P_), I_ = !1, L_ = !1, R_ = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0
		}, z_ = null, B_ = null, V_ = !1;
		Zg && (V_ = Mn("input") && (!document.documentMode || 9 < document.documentMode));
		var H_ = typeof Object.is == "function" ? Object.is : Un, U_ = Zg && "documentMode" in document && 11 >= document.documentMode, W_ = null, G_ = null, K_ = null, q_ = !1, J_ = {
			animationend: Qn("Animation", "AnimationEnd"),
			animationiteration: Qn("Animation", "AnimationIteration"),
			animationstart: Qn("Animation", "AnimationStart"),
			transitionrun: Qn("Transition", "TransitionRun"),
			transitionstart: Qn("Transition", "TransitionStart"),
			transitioncancel: Qn("Transition", "TransitionCancel"),
			transitionend: Qn("Transition", "TransitionEnd")
		}, Y_ = {}, X_ = {};
		Zg && (X_ = document.createElement("div").style, "AnimationEvent" in window || (delete J_.animationend.animation, delete J_.animationiteration.animation, delete J_.animationstart.animation), "TransitionEvent" in window || delete J_.transitionend.transition);
		var Z_ = $n("animationend"), Q_ = $n("animationiteration"), $_ = $n("animationstart"), ev = $n("transitionrun"), tv = $n("transitionstart"), nv = $n("transitioncancel"), rv = $n("transitionend"), iv = /* @__PURE__ */ new Map(), av = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		av.push("scrollEnd");
		var ov = 0, sv = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var cv = performance, lv = function() {
			return cv.now();
		};
		else {
			var uv = Date;
			lv = function() {
				return uv.now();
			};
		}
		var dv = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, fv = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", pv = 0, mv = 1, hv = 2, gv = 3, _v = 100, vv = "-\xA0", yv = "+\xA0", bv = " \xA0", xv = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Sv = "Components ⚛", Cv = "Scheduler ⚛", wv = "Blocking", Tv = !1, Ev = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: Sv
		}, Dv = {
			start: -0,
			end: -0,
			detail: { devtools: Ev }
		}, Ov = ["Changed Props", ""], kv = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Av = ["Changed Props", kv], jv = 1, Mv = 2, Nv = [], Pv = 0, Fv = 0, Iv = {};
		Object.freeze(Iv);
		var Lv = null, Rv = null, G = 0, zv = 1, K = 2, Bv = 8, Vv = 16, Hv = 32, Uv = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Uv = !0;
		}
		var Wv = /* @__PURE__ */ new WeakMap(), Gv = [], Kv = 0, qv = null, Jv = 0, Yv = [], Xv = 0, Zv = null, Qv = 1, $v = "", ey = null, ty = null, q = !1, ny = !1, ry = null, iy = null, ay = !1, oy = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), sy = me(null), cy = me(null), ly = {}, uy = null, dy = null, fy = !1, py = typeof AbortController < "u" ? AbortController : function() {
			var e = [], t = this.signal = {
				aborted: !1,
				addEventListener: function(t, n) {
					e.push(n);
				}
			};
			this.abort = function() {
				t.aborted = !0, e.forEach(function(e) {
					return e();
				});
			};
		}, my = _m.unstable_scheduleCallback, hy = _m.unstable_NormalPriority, gy = {
			$$typeof: km,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, _y = null, vy = _m.unstable_now, yy = console.createTask ? console.createTask : function() {
			return null;
		}, by = 1, xy = 2, Sy = -0, Cy = -0, wy = -0, Ty = null, Ey = -1.1, Dy = -0, Oy = -0, J = -1.1, Y = -1.1, ky = null, Ay = !1, jy = -0, My = -1.1, Ny = null, Py = 0, Fy = null, Iy = null, Ly = -1.1, Ry = null, zy = -1.1, By = -1.1, Vy = -0, Hy = -1.1, Uy = -1.1, Wy = 0, Gy = null, Ky = null, qy = null, Jy = -1.1, Yy = null, Xy = -1.1, Zy = -1.1, Qy = -0, $y = -0, eb = 0, tb = null, nb = 0, rb = -1.1, ib = !1, ab = !1, ob = null, sb = 0, cb = 0, lb = null, ub = W.S;
		W.S = function(e, t) {
			if (BC = _h(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > Hy && 0 > Uy) {
					Hy = vy();
					var n = Xd(), r = Yd();
					(n !== Xy || r !== Yy) && (Xy = -1.1), Jy = n, Yy = r;
				}
				Hi(e, t);
			}
			if (_y !== null) for (n = jw; n !== null;) xi(n, _y), n = n.next;
			if (n = e.types, n !== null) {
				for (r = jw; r !== null;) xi(r, n), r = r.next;
				if (cb !== 0) {
					r = _y, r === null && (r = _y = []);
					for (var i = 0; i < n.length; i++) {
						var a = n[i];
						r.indexOf(a) === -1 && r.push(a);
					}
				}
			}
			ub !== null && ub(e, t);
		};
		var db = me(null), fb = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, pb = [], mb = [], hb = [], gb = [], _b = [], vb = [], yb = /* @__PURE__ */ new Set();
		fb.recordUnsafeLifecycleWarnings = function(e, t) {
			yb.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && pb.push(e), e.mode & Bv && typeof t.UNSAFE_componentWillMount == "function" && mb.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && hb.push(e), e.mode & Bv && typeof t.UNSAFE_componentWillReceiveProps == "function" && gb.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && _b.push(e), e.mode & Bv && typeof t.UNSAFE_componentWillUpdate == "function" && vb.push(e));
		}, fb.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < pb.length && (pb.forEach(function(t) {
				e.add(D(t) || "Component"), yb.add(t.type);
			}), pb = []);
			var t = /* @__PURE__ */ new Set();
			0 < mb.length && (mb.forEach(function(e) {
				t.add(D(e) || "Component"), yb.add(e.type);
			}), mb = []);
			var n = /* @__PURE__ */ new Set();
			0 < hb.length && (hb.forEach(function(e) {
				n.add(D(e) || "Component"), yb.add(e.type);
			}), hb = []);
			var r = /* @__PURE__ */ new Set();
			0 < gb.length && (gb.forEach(function(e) {
				r.add(D(e) || "Component"), yb.add(e.type);
			}), gb = []);
			var i = /* @__PURE__ */ new Set();
			0 < _b.length && (_b.forEach(function(e) {
				i.add(D(e) || "Component"), yb.add(e.type);
			}), _b = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < vb.length && (vb.forEach(function(e) {
				a.add(D(e) || "Component"), yb.add(e.type);
			}), vb = []), 0 < t.size) {
				var o = p(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = p(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = p(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = p(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = p(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = p(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var bb = /* @__PURE__ */ new Map(), xb = /* @__PURE__ */ new Set();
		fb.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Bv && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !xb.has(e.type) && (r = bb.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], bb.set(n, r)), r.push(e));
		}, fb.flushLegacyContextWarning = function() {
			bb.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(D(e) || "Component"), xb.add(e.type);
					});
					var r = p(n);
					j(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, fb.discardPendingWarnings = function() {
			pb = [], mb = [], hb = [], gb = [], _b = [], vb = [], bb = /* @__PURE__ */ new Map();
		};
		var Sb = "", Cb = { react_stack_bottom_frame: function(e, t, n) {
			var r = dh;
			dh = !0;
			try {
				return e(t, n);
			} finally {
				dh = r;
			}
		} }, wb = Cb.react_stack_bottom_frame.bind(Cb), Tb = { react_stack_bottom_frame: function(e) {
			var t = dh;
			dh = !0;
			try {
				return e.render();
			} finally {
				dh = t;
			}
		} }, Eb = Tb.react_stack_bottom_frame.bind(Tb), Db = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Lu(e, e.return, t);
			}
		} }, Ob = Db.react_stack_bottom_frame.bind(Db), kb = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Lu(e, e.return, t);
			}
		} }, Ab = kb.react_stack_bottom_frame.bind(kb), jb = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Mb = jb.react_stack_bottom_frame.bind(jb), Nb = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Lu(e, t, n);
			}
		} }, Pb = Nb.react_stack_bottom_frame.bind(Nb), Fb = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Ib = Fb.react_stack_bottom_frame.bind(Fb), Lb = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Lu(e, t, n);
			}
		} }, Rb = Lb.react_stack_bottom_frame.bind(Lb), zb = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Bb = zb.react_stack_bottom_frame.bind(zb), Vb = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), Hb = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), Ub = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Wb = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Gb = null, Kb = null, qb = !1, Jb = null, Yb = !1, Xb = null, Zb = 0, Qb = null, $b, ex = $b = !1, tx = {}, nx = {}, rx = {};
		f = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = D(e), i = r || "null";
				if (!tx[i]) {
					tx[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = D(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = D(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), j(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var ix = da(!0), ax = da(!1), ox = 0, sx = 1, cx = 2, lx = 3, ux = !1, dx = !1, fx = null, px = !1, mx = me(null), hx = me(0), gx = me(null), _x = null, vx = 1, yx = 2, bx = me(0), xx = 0, Sx = 1, Cx = 2, wx = 4, Tx = 8, Ex, Dx = /* @__PURE__ */ new Set(), Ox = /* @__PURE__ */ new Set(), kx = /* @__PURE__ */ new Set(), Ax = /* @__PURE__ */ new Set(), jx = 0, X = null, Mx = null, Nx = null, Px = !1, Fx = !1, Ix = !1, Lx = 0, Rx = 0, zx = null, Bx = 0, Vx = 25, Z = null, Hx = null, Ux = -1, Wx = !1, Gx = {
			readContext: hi,
			use: Xa,
			useCallback: La,
			useContext: La,
			useEffect: La,
			useImperativeHandle: La,
			useLayoutEffect: La,
			useInsertionEffect: La,
			useMemo: La,
			useReducer: La,
			useRef: La,
			useState: La,
			useDebugValue: La,
			useDeferredValue: La,
			useTransition: La,
			useSyncExternalStore: La,
			useId: La,
			useHostTransitionStatus: La,
			useFormState: La,
			useActionState: La,
			useOptimistic: La,
			useMemoCache: La,
			useCacheRefresh: La,
			useEffectEvent: La
		}, Kx = null, qx = null, Jx = null, Yx = null, Xx = null, Zx = null, Qx = null;
		Kx = {
			readContext: function(e) {
				return hi(e);
			},
			use: Xa,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), Fa(t), Vo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), hi(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", L(), Fa(t), No(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), Fa(n), zo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", L(), Fa(t), jo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), Fa(t), Lo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L(), Fa(t);
				var n = W.H;
				W.H = Xx;
				try {
					return Uo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = W.H;
				W.H = Xx;
				try {
					return $a(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", L(), Ao(e);
			},
			useState: function(e) {
				Z = "useState", L();
				var t = W.H;
				W.H = Xx;
				try {
					return fo(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), z(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), es();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), ro(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), is();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", L(), Ia(), wo(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", L(), wo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", L(), po(e);
			},
			useHostTransitionStatus: rs,
			useMemoCache: Za,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), as();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), Fo(e);
			}
		}, qx = {
			readContext: function(e) {
				return hi(e);
			},
			use: Xa,
			useCallback: function(e, t) {
				return Z = "useCallback", R(), Vo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", R(), hi(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", R(), No(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", R(), zo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", R(), jo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", R(), Lo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", R();
				var n = W.H;
				W.H = Xx;
				try {
					return Uo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", R();
				var r = W.H;
				W.H = Xx;
				try {
					return $a(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", R(), Ao(e);
			},
			useState: function(e) {
				Z = "useState", R();
				var t = W.H;
				W.H = Xx;
				try {
					return fo(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", R();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", R(), z(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", R(), es();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", R(), ro(e, t, n);
			},
			useId: function() {
				return Z = "useId", R(), is();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", R(), wo(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", R(), Ia(), wo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", R(), po(e);
			},
			useHostTransitionStatus: rs,
			useMemoCache: Za,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", R(), as();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", R(), Fo(e);
			}
		}, Jx = {
			readContext: function(e) {
				return hi(e);
			},
			use: Xa,
			useCallback: function(e, t) {
				return Z = "useCallback", R(), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", R(), hi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", R(), Mo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", R(), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", R(), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", R(), Mo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", R();
				var n = W.H;
				W.H = Zx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", R();
				var r = W.H;
				W.H = Zx;
				try {
					return eo(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", R(), qa().memoizedState;
			},
			useState: function() {
				Z = "useState", R();
				var e = W.H;
				W.H = Zx;
				try {
					return eo(Qa);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", R();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", R(), Go(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", R(), ts();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", R(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", R(), qa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", R(), Ia(), To(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", R(), To(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", R(), mo(e, t);
			},
			useHostTransitionStatus: rs,
			useMemoCache: Za,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", R(), qa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", R(), Io(e);
			}
		}, Yx = {
			readContext: function(e) {
				return hi(e);
			},
			use: Xa,
			useCallback: function(e, t) {
				return Z = "useCallback", R(), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", R(), hi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", R(), Mo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", R(), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", R(), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", R(), Mo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", R();
				var n = W.H;
				W.H = Qx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", R();
				var r = W.H;
				W.H = Qx;
				try {
					return no(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", R(), qa().memoizedState;
			},
			useState: function() {
				Z = "useState", R();
				var e = W.H;
				W.H = Qx;
				try {
					return no(Qa);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", R();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", R(), Ko(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", R(), ns();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", R(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", R(), qa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", R(), Ia(), Oo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", R(), Oo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", R(), go(e, t);
			},
			useHostTransitionStatus: rs,
			useMemoCache: Za,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", R(), qa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", R(), Io(e);
			}
		}, Xx = {
			readContext: function(e) {
				return l(), hi(e);
			},
			use: function(e) {
				return c(), Xa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), L(), Vo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), L(), hi(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", c(), L(), No(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), L(), zo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", c(), L(), jo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), L(), Lo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), L();
				var n = W.H;
				W.H = Xx;
				try {
					return Uo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), L();
				var r = W.H;
				W.H = Xx;
				try {
					return $a(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", c(), L(), Ao(e);
			},
			useState: function(e) {
				Z = "useState", c(), L();
				var t = W.H;
				W.H = Xx;
				try {
					return fo(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), L(), z(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), L(), es();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), L(), ro(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), L(), is();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", c(), L(), wo(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", c(), L(), wo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", c(), L(), po(e);
			},
			useMemoCache: function(e) {
				return c(), Za(e);
			},
			useHostTransitionStatus: rs,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), as();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), L(), Fo(e);
			}
		}, Zx = {
			readContext: function(e) {
				return l(), hi(e);
			},
			use: function(e) {
				return c(), Xa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), R(), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), R(), hi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), R(), Mo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), R(), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), R(), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), R(), Mo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), R();
				var n = W.H;
				W.H = Zx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), R();
				var r = W.H;
				W.H = Zx;
				try {
					return eo(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), R(), qa().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), R();
				var e = W.H;
				W.H = Zx;
				try {
					return eo(Qa);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), R();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), R(), Go(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), R(), ts();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), R(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), R(), qa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), R(), To(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), R(), To(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), R(), mo(e, t);
			},
			useMemoCache: function(e) {
				return c(), Za(e);
			},
			useHostTransitionStatus: rs,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", R(), qa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), R(), Io(e);
			}
		}, Qx = {
			readContext: function(e) {
				return l(), hi(e);
			},
			use: function(e) {
				return c(), Xa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), R(), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), R(), hi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), R(), Mo(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), R(), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), R(), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), R(), Mo(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), R();
				var n = W.H;
				W.H = Zx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), R();
				var r = W.H;
				W.H = Zx;
				try {
					return no(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), R(), qa().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), R();
				var e = W.H;
				W.H = Zx;
				try {
					return no(Qa);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), R();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), R(), Ko(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), R(), ns();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), R(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), R(), qa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), R(), Oo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), R(), Oo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), R(), go(e, t);
			},
			useMemoCache: function(e) {
				return c(), Za(e);
			},
			useHostTransitionStatus: rs,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", R(), qa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), R(), Io(e);
			}
		};
		var $x = {}, eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), sS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), lS = /* @__PURE__ */ new Set();
		Object.freeze($x);
		var uS = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = Yl(e), i = ha(r);
				i.payload = t, n != null && (ms(n), i.callback = n), t = ga(e, i, r), t !== null && (Ci(r, "this.setState()", e), Ql(t, e, r), _a(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = Yl(e), i = ha(r);
				i.tag = sx, i.payload = t, n != null && (ms(n), i.callback = n), t = ga(e, i, r), t !== null && (Ci(r, "this.replaceState()", e), Ql(t, e, r), _a(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = Yl(e), r = ha(n);
				r.tag = cx, t != null && (ms(t), r.callback = t), t = ga(e, r, n), t !== null && (Ci(n, "this.forceUpdate()", e), Ql(t, e, n), _a(t, e, n));
			}
		}, dS = null, fS = null, pS = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), mS = !1, hS = {}, gS = {}, _S = {}, vS = {}, yS = !1, bS = {}, xS = {}, SS = {}, CS = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, wS = !1, TS = null;
		TS = /* @__PURE__ */ new Set();
		var ES = !1, DS = null, OS = null, kS = 0, AS = /* @__PURE__ */ new Map(), jS = {}, MS = 0, NS = 1, PS = 2, FS = !1, IS = !1, LS = !1, RS = !1, zS = typeof WeakSet == "function" ? WeakSet : Set, BS = null, VS = null, HS = null, US = !1, WS = !1, GS = !1, KS = !1, qS = null, JS = !1, YS = null, XS = !1, ZS = 8192, QS = {
			getCacheForType: function(e) {
				var t = hi(gy), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return hi(gy).controller.signal;
			},
			getOwner: function() {
				return uh;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var $S = Symbol.for;
			$S("selector.component"), $S("selector.has_pseudo_class"), $S("selector.role"), $S("selector.test_id"), $S("selector.text");
		}
		var eC = [], tC = typeof WeakMap == "function" ? WeakMap : Map, nC = 0, rC = 2, iC = 4, aC = 0, oC = 1, sC = 2, cC = 3, lC = 4, uC = 6, dC = 5, fC = nC, pC = null, Q = null, $ = 0, mC = 0, hC = 1, gC = 2, _C = 3, vC = 4, yC = 5, bC = 6, xC = 7, SC = 8, CC = 9, wC = mC, TC = null, EC = !1, DC = !1, OC = !1, kC = 0, AC = aC, jC = 0, MC = 0, NC = 0, PC = 0, FC = 0, IC = null, LC = null, RC = !1, zC = 0, BC = 0, VC = 300, HC = Infinity, UC = 500, WC = null, GC = null, KC = null, qC = 0, JC = 1, YC = 2, XC = 3, ZC = 0, QC = 1, $C = 2, ew = 3, tw = 4, nw = 5, rw = 0, iw = null, aw = null, ow = 0, sw = 0, cw = -0, lw = null, uw = null, dw = null, fw = null, pw = null, mw = null, hw = qC, gw = null, _w = 50, vw = 0, yw = null, bw = !1, xw = !1, Sw = 50, Cw = 0, ww = null, Tw = !1, Ew = !1, Dw = null, Ow = !1, kw = /* @__PURE__ */ new Set(), Aw = {}, jw = null, Mw = null, Nw = !1, Pw = !1, Fw = !1, Iw = !1, Lw = 0, Rw = {};
		(function() {
			for (var e = 0; e < av.length; e++) {
				var t = av[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), er(n, "on" + t);
			}
			er(Z_, "onAnimationEnd"), er(Q_, "onAnimationIteration"), er($_, "onAnimationStart"), er("dblclick", "onDoubleClick"), er("focusin", "onFocus"), er("focusout", "onBlur"), er(ev, "onTransitionRun"), er(tv, "onTransitionStart"), er(nv, "onTransitionCancel"), er(rv, "onTransitionEnd");
		})(), pt("onMouseEnter", ["mouseout", "mouseover"]), pt("onMouseLeave", ["mouseout", "mouseover"]), pt("onPointerEnter", ["pointerout", "pointerover"]), pt("onPointerLeave", ["pointerout", "pointerover"]), ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ft("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var zw = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zw)), Vw = "_reactListening" + Math.random().toString(36).slice(2), Hw = !1, Uw = !1, Ww = !1, Gw = !1, Kw = !1, qw = !1, Jw = !1, Yw = {}, Xw = /\r\n?/g, Zw = /\u0000|\uFFFD/g, Qw = "http://www.w3.org/1999/xlink", $w = "http://www.w3.org/XML/1998/namespace", eT = {}, tT = "javascript:throw new Error('React form unexpectedly submitted.')", nT = "suppressHydrationWarning", rT = "&", iT = "/&", aT = "$", oT = "/$", sT = "$?", cT = "$~", lT = "$!", uT = "html", dT = "body", fT = "head", pT = "F!", mT = "F", hT = "loading", gT = "style", _T = 0, vT = 1, yT = 2, bT = null, xT = null, ST = !1, CT = {
			dialog: !0,
			webview: !0
		}, wT = null, TT = void 0, ET = typeof setTimeout == "function" ? setTimeout : void 0, DT = typeof clearTimeout == "function" ? clearTimeout : void 0, OT = -1, kT = typeof Promise == "function" ? Promise : void 0, AT = typeof requestAnimationFrame == "function" ? requestAnimationFrame : ET, jT = typeof queueMicrotask == "function" ? queueMicrotask : kT === void 0 ? ET : function(e) {
			return kT.resolve(null).then(e).catch(Zd);
		}, MT = 500;
		Ef.prototype.animate = function(e, t) {
			return t = typeof t == "number" ? { duration: t } : U({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
		}, Ef.prototype.getAnimations = function() {
			for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
				var a = n[i].effect;
				a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
			}
			return r;
		}, Ef.prototype.getComputedStyle = function() {
			return getComputedStyle(this._scope, this._selector);
		}, Of.prototype.addEventListener = function(e, t, n) {
			var r = null, i = null;
			if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
				this._eventListeners === null && (this._eventListeners = []);
				var a = this._eventListeners;
				if (Nf(a, e, t, n) === -1) {
					var o = this, s = t;
					n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
						o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
					}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = jf(n), a.push({
						type: e,
						listener: t,
						optionsOrUseCapture: n,
						attachedListener: s,
						cleanup: i
					}), w(this._fragmentFiber, kf, e, s, r);
				}
				this._eventListeners = a;
			}
		}, Of.prototype.removeEventListener = function(e, t, n) {
			var r = this._eventListeners;
			if (r !== null && (t = Nf(r, e, t, n), t !== -1)) {
				var i = r[t];
				n = i.attachedListener;
				var a = i.cleanup;
				i = jf(i.optionsOrUseCapture), w(this._fragmentFiber, Af, e, n, i), r.splice(t, 1), a !== null && a();
			}
		}, Of.prototype.dispatchEvent = function(e) {
			var t = re(this._fragmentFiber);
			if (t === null) return !0;
			t = se(t);
			var n = this._eventListeners;
			if (n !== null && 0 < n.length || !e.bubbles) {
				var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
				if (n) for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.addEventListener(a.type, a.attachedListener, jf(a.optionsOrUseCapture));
				}
				if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, jf(a.optionsOrUseCapture));
				return t.removeChild(r), e;
			}
			return t.dispatchEvent(e);
		}, Of.prototype.focus = function(e) {
			T(this._fragmentFiber.child, !0, Pf, e, void 0, void 0);
		}, Of.prototype.focusLast = function(e) {
			var t = [];
			T(this._fragmentFiber.child, !0, Ff, t, void 0, void 0);
			for (var n = t.length - 1; 0 <= n && !Pf(t[n], e); n--);
		}, Of.prototype.blur = function() {
			var e = re(this._fragmentFiber);
			e !== null && (e = se(e), e = Hd(e).activeElement, e !== null && w(this._fragmentFiber, If, e));
		}, Of.prototype.observeUsing = function(e) {
			var t = !1, n = !1;
			w(this._fragmentFiber, function(e) {
				if (e.tag === 6) t = !0;
				else return n = !0;
				return !1;
			}), t && !n && console.error("observeUsing() was called on a FragmentInstance with only text children. Observers do not work on text nodes."), this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), w(this._fragmentFiber, Lf, e);
		}, Of.prototype.unobserveUsing = function(e) {
			var t = this._observers;
			if (t !== null && t.has(e)) {
				t.delete(e), w(this._fragmentFiber, Rf, e);
				for (var n = t = 0; n < NT.length; n++) {
					var r = NT[n];
					r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : NT[t++] = r;
				}
				NT.length = t;
			} else console.error("You are calling unobserveUsing() with an observer that is not being observed with this fragment instance. First attach the observer with observeUsing()");
		};
		var NT = [], PT = !1;
		Of.prototype.getClientRects = function() {
			var e = [];
			return w(this._fragmentFiber, Bf, e), e;
		}, Of.prototype.getRootNode = function(e) {
			var t = re(this._fragmentFiber);
			return t === null ? this : se(t).getRootNode(e);
		}, Of.prototype.compareDocumentPosition = function(e) {
			var t = re(this._fragmentFiber);
			if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
			var n = [];
			w(this._fragmentFiber, Ff, n);
			var r = se(t);
			if (n.length === 0) {
				if (t = r, ie(this._fragmentFiber)) {
					a: {
						for (n = this._fragmentFiber.return; n !== null;) {
							if (n.tag === 4) {
								n = n.stateNode.containerInfo;
								break a;
							}
							if (n.tag === 3 || n.tag === 5 || n.tag === 27) break;
							n = n.return;
						}
						n = null;
					}
					n != null && (t = n);
				}
				n = this._fragmentFiber;
				var i = r = t.compareDocumentPosition(e);
				return t === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = ae(n)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = se(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
			}
			t = se(n[0]), i = se(n[n.length - 1]);
			var a = ie(this._fragmentFiber) ? t.parentElement : r;
			if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
			r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
			var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
			return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Vf(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}, Of.prototype.scrollIntoView = function(e) {
			if (typeof e == "object") throw Error("FragmentInstance.scrollIntoView() does not support scrollIntoViewOptions. Use the alignToTop boolean instead.");
			var t = [];
			w(this._fragmentFiber, Ff, t);
			var n = !1 !== e;
			if (t.length === 0) {
				var r = ae(this._fragmentFiber);
				if (r = n ? r[1] || r[0] || re(this._fragmentFiber) : r[0] || r[1], r === null) return;
				if (r.tag === 6) {
					e = se(r), Hf(e, n);
					return;
				}
				if (r = se(r), r.nodeType !== 9) {
					if (r.nodeType === 11) {
						n = "host" in r ? r.host : null, n === null ? console.warn("You are attempting to scroll a FragmentInstance that is only mounted inside a detached DocumentFragment. No scroll was performed.") : n.scrollIntoView(e);
						return;
					}
					r.scrollIntoView(e);
				}
			}
			for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
				var i = t[r];
				i.tag === 6 ? (i = se(i), Hf(i, n)) : se(i).scrollIntoView(e), r += n ? -1 : 1;
			}
		};
		var FT = null, IT = 0, LT = 1, RT = 2, zT = 3, BT = 4, VT = /* @__PURE__ */ new Map(), HT = /* @__PURE__ */ new Set(), UT = Um.d;
		Um.d = {
			f: function() {
				var e = UT.f(), t = ru();
				return e || t;
			},
			r: function(e) {
				var t = st(e);
				t !== null && t.tag === 5 && t.type === "form" ? $o(t) : UT.r(e);
			},
			D: function(e) {
				UT.D(e), hp("dns-prefetch", e, null);
			},
			C: function(e, t) {
				UT.C(e, t), hp("preconnect", e, t);
			},
			L: function(e, t, n) {
				UT.L(e, t, n);
				var r = WT;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + M(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + M(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + M(n.imageSizes) + "\"]")) : i += "[href=\"" + M(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = vp(e);
							break;
						case "script": a = Sp(e);
					}
					if (!(VT.has(a) || (e = U({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), VT.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(yp(a)) || t === "script" && r.querySelector(Cp(a))))) {
						var o = r.createElement("link");
						Od(o, "link", e), t === "style" && (o[Yh] = !0, o.onload = o.onerror = function() {
							dt(o);
						}), ut(o), r.head.appendChild(o);
					}
				}
			},
			m: function(e, t) {
				UT.m(e, t);
				var n = WT;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + M(r) + "\"][href=\"" + M(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Sp(e);
					}
					if (!VT.has(a) && (e = U({
						rel: "modulepreload",
						href: e
					}, t), VT.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Cp(a))) return;
						}
						r = n.createElement("link"), Od(r, "link", e), ut(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				UT.X(e, t);
				var n = WT;
				if (n && e) {
					var r = lt(n).hoistableScripts, i = Sp(e), a = r.get(i);
					a || (a = n.querySelector(Cp(i)), a || (e = U({
						src: e,
						async: !0
					}, t), (t = VT.get(i)) && Dp(e, t), a = n.createElement("script"), ut(a), Od(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				UT.S(e, t, n);
				var r = WT;
				if (r && e) {
					var i = lt(r).hoistableStyles, a = vp(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: IT,
							preload: null
						};
						if (o = r.querySelector(yp(a))) s.loading = LT | BT;
						else {
							e = U({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = VT.get(a)) && Ep(e, n);
							var c = o = r.createElement("link");
							ut(c), Od(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= LT;
							}), c.addEventListener("error", function() {
								s.loading |= RT;
							}), s.loading |= BT, Tp(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				UT.M(e, t);
				var n = WT;
				if (n && e) {
					var r = lt(n).hoistableScripts, i = Sp(e), a = r.get(i);
					a || (a = n.querySelector(Cp(i)), a || (e = U({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = VT.get(i)) && Dp(e, t), a = n.createElement("script"), ut(a), Od(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var WT = typeof document > "u" ? null : document, GT = null, KT = 6e4, qT = 800, JT = 500, YT = 0, XT = null, ZT = null, QT = Wm, $T = {
			$$typeof: km,
			Provider: null,
			Consumer: null,
			_currentValue: QT,
			_currentValue2: QT,
			_threadCount: 0
		}, eE = "%c%s%c", tE = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", nE = "", rE = " ", iE = Function.prototype.bind, aE = !1, oE = null, sE = null, cE = null, lE = null, uE = null, dE = null, fE = null, pE = null, mE = null, hE = null;
		oE = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = U({}, e.memoizedProps), i = Tr(e, 2), i !== null && Ql(i, e, 2));
		}, sE = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = U({}, e.memoizedProps), r = Tr(e, 2), r !== null && Ql(r, e, 2));
		}, cE = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = U({}, e.memoizedProps), i = Tr(e, 2), i !== null && Ql(i, e, 2));
		}, lE = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Tr(e, 2), t !== null && Ql(t, e, 2);
		}, uE = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Tr(e, 2), t !== null && Ql(t, e, 2);
		}, dE = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Tr(e, 2), t !== null && Ql(t, e, 2);
		}, fE = function(e) {
			var t = Tr(e, 2);
			t !== null && Ql(t, e, 2);
		}, pE = function(e) {
			var t = Ke(), n = Tr(e, t);
			n !== null && Ql(n, e, t);
		}, mE = function(e) {
			s = e;
		}, hE = function(e) {
			o = e;
		};
		var gE = !0, _E = null, vE = !1, yE = null, bE = null, xE = null, SE = /* @__PURE__ */ new Map(), CE = /* @__PURE__ */ new Map(), wE = [], TE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), EE = null;
		if (hm.prototype.render = mm.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			Gp(r, Yl(r), n, t, null, null);
		}, hm.prototype.unmount = mm.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(fC & (rC | iC)) !== nC && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Gp(e.current, 2, null, e, null, null), ru(), t[Uh] = null;
			}
		}, hm.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = rt();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < wE.length && t !== 0 && t < wE[n].priority; n++);
				wE.splice(n, 0, e), n === 0 && om(e);
			}
		}, (function() {
			var e = vm.version;
			if (e !== "19.3.1") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.3.1\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), Um.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = C(t), e = e === null ? null : ne(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.3.1",
				rendererPackageName: "react-dom",
				currentDispatcherRef: W,
				reconcilerVersion: "19.3.1"
			};
			return e.overrideHookState = oE, e.overrideHookStateDeletePath = sE, e.overrideHookStateRenamePath = cE, e.overrideProps = lE, e.overridePropsDeletePath = uE, e.overridePropsRenamePath = dE, e.scheduleUpdate = fE, e.scheduleRetry = pE, e.setErrorHandler = mE, e.setSuspenseHandler = hE, e.scheduleRefresh = v, e.scheduleRoot = g, e.setRefreshHandler = y, e.getCurrentFiber = Xp, Re(e);
		})() && Zg && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var DE = window.location.protocol;
			/^(https?|file):$/.test(DE) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (DE === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			gm(e);
			var n = !1, r = "", i = ys, a = bs, o = xs;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Cm && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Up(e, 1, !1, null, null, n, r, null, i, a, o, pm), e[Uh] = t.current, ud(e), new mm(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			gm(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = ys, o = bs, s = xs, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Up(e, 1, !0, t, n ?? null, r, i, c, a, o, s, pm), t.context = Wp(null), n = t.current, r = Yl(n), r = $e(r), i = ha(r), i.callback = null, ga(n, i, r), Ci(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Je(t, n), Xu(t), e[Uh] = t.current, ud(e), new hm(t);
		}, e.version = "19.3.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), b = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = v()) : t.exports = y();
})), x = /* @__PURE__ */ c(d(), 1), ee = b(), te = "tb:navigate";
function S(e, t, n = !1) {
	e.dispatchEvent(new CustomEvent(te, {
		detail: {
			to: t,
			replace: n
		},
		bubbles: !0,
		composed: !0
	}));
}
function C(e, t, n = []) {
	if (customElements.get(e)) return;
	class r extends HTMLElement {
		static get observedAttributes() {
			return n;
		}
		root;
		connectedCallback() {
			this.root ||= (0, ee.createRoot)(this), this.renderApp();
		}
		disconnectedCallback() {
			this.root?.unmount(), this.root = void 0;
		}
		attributeChangedCallback() {
			this.renderApp();
		}
		renderApp() {
			if (!this.root) return;
			let e = {};
			for (let t of this.getAttributeNames()) e[t] = this.getAttribute(t) ?? "";
			this.root.render((0, x.createElement)(t, {
				attrs: e,
				navigate: (e, t) => S(this, e, t?.replace ?? !1)
			}));
		}
	}
	customElements.define(e, r);
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var ne = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function w(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: ne(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var T = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, re = (e) => {
	let t = T(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, ie = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), ae = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function oe(e) {
	return e != null;
}
function se(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? ae.width, a = e.size ?? e.height ?? ae.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? ie(...c) : ie("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? ae["stroke-width"]) * Number(e.size ?? e.width ?? ae.width) / Number(t.size ?? t.width ?? ae.width) : t.strokeWidth ?? ae["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(ae).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && oe(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && oe(t.width) && { [r("width")]: t.width },
			..."height" in t && oe(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function ce(e, t = {}) {
	return se(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var le = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, E = (0, x.createContext)({}), ue = () => (0, x.useContext)(E), de = (0, x.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = ue() ?? {}, y = !!c || le(d), [b, ee, te = []] = ce(u, {
		color: e ?? _,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: ie(v, s),
		hasA11yProp: y,
		attributes: d
	});
	return (0, x.createElement)(b, {
		ref: f,
		...ee
	}, [...te.map(([e, t]) => (0, x.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function fe(e, t = [], n = []) {
	let r = typeof e == "string" ? w(e, t, n) : e, i = (0, x.forwardRef)(({ className: e, ...t }, n) => (0, x.createElement)(de, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = re(r.name)), i;
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/arrow-left.mjs
var pe = {
	name: "arrow-left",
	size: 24,
	node: [["path", {
		d: "m12 19-7-7 7-7",
		key: "1l729n"
	}], ["path", {
		d: "M19 12H5",
		key: "x3x0zl"
	}]]
};
pe.node;
var D = fe(pe), me = {
	name: "ban",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M4.929 4.929 19.07 19.071",
		key: "196cmz"
	}]]
};
me.node;
var he = fe(me), ge = {
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
};
ge.node;
var _e = fe(ge), ve = {
	name: "rotate-cw",
	size: 24,
	node: [["path", {
		d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
		key: "1p45f6"
	}], ["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}]]
};
ve.node;
var ye = fe(ve), be = {
	name: "triangle-alert",
	size: 24,
	node: [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["alert-triangle"]
};
be.node;
var xe = fe(be), Se = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
Se.node;
var O = fe(Se), k = class extends Error {
	code;
	action;
	status;
	detail;
	constructor(e, t, n, r) {
		super(e), this.code = e, this.action = t, this.status = n, this.detail = r, this.name = "UiError";
	}
}, Ce = {
	"CFG-SOURCE-NOT-FOUND": {
		summary: "Unknown source.",
		action: "Go back to the sources list."
	},
	"CFG-INVALID-REQUEST": {
		summary: "Invalid request.",
		action: "Check the input and retry."
	},
	"JOB-DUPLICATE-ACTIVE": {
		summary: "A job for this source is already running.",
		action: "Open the active job."
	},
	"JOB-NOT-FOUND": {
		summary: "Job not found.",
		action: "Refresh the jobs list."
	},
	"JOB-INVALID-STATE": {
		summary: "Action not allowed in the current state.",
		action: "Refresh the page."
	},
	"JOB-CANCEL-REFUSED": {
		summary: "Too late to cancel — the job is finishing.",
		action: "Wait for completion."
	},
	"ART-NOT-FOUND": {
		summary: "Article is not archived (yet).",
		action: "Check its status in the list."
	},
	"OPS-DEPENDENCY-DOWN": {
		summary: "A service dependency is down.",
		action: "Check service health."
	}
};
function we(e) {
	return Ce[e] ?? {
		summary: e,
		action: "Inspect service logs."
	};
}
var Te = 1e4;
function Ee(e) {
	if (typeof e.type == "string") return e.type.startsWith("urn:tech-blog:error:") ? e.type.slice(20) : void 0;
}
async function De(e, t) {
	let n = new AbortController(), r = setTimeout(() => n.abort(), Te);
	try {
		let r = await fetch(e, {
			...t,
			signal: n.signal,
			headers: {
				"Content-Type": "application/json",
				...t?.headers ?? {}
			}
		});
		if (!r.ok) {
			let e = "UNKNOWN", t;
			try {
				let n = await r.json();
				e = Ee(n) ?? "UNKNOWN", typeof n.detail == "string" && (t = n.detail);
			} catch {}
			let { summary: n, action: i } = we(e), a = new k(e, i, r.status, t);
			throw a.message = n, a;
		}
		return await r.json();
	} finally {
		clearTimeout(r);
	}
}
function Oe(e) {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) r !== void 0 && r !== "" && t.set(n, String(r));
	let n = t.toString();
	return n === "" ? "" : `?${n}`;
}
var A = (e) => De(e), ke = (e, t) => De(e, {
	method: "POST",
	body: t === void 0 ? void 0 : JSON.stringify(t)
}), Ae = (e, t) => De(e, {
	method: "PATCH",
	body: JSON.stringify(t)
}), j = {
	sources: () => A("/api/v1/sources"),
	source: (e) => A(`/api/v1/sources/${encodeURIComponent(e)}`),
	setSourceEnabled: (e, t) => Ae(`/api/v1/sources/${encodeURIComponent(e)}`, { enabled: t }),
	articles: (e) => A(`/api/v1/articles${Oe(e)}`),
	article: (e) => A(`/api/v1/articles/${encodeURIComponent(e)}`),
	articleContentUrl: (e) => `/api/v1/articles/${encodeURIComponent(e)}/content`,
	jobs: (e) => A(`/api/v1/jobs${Oe(e)}`),
	job: (e) => A(`/api/v1/jobs/${encodeURIComponent(e)}`),
	createCrawlJob: (e) => ke("/api/v1/crawl-jobs", e),
	cancelJob: (e) => ke(`/api/v1/crawl-jobs/${encodeURIComponent(e)}/cancel`),
	retryArticle: (e) => ke(`/api/v1/articles/${encodeURIComponent(e)}/retry`),
	opsSummary: () => A("/api/v1/ops/summary")
};
//#endregion
//#region ../../packages/shared/src/hooks.ts
function je(e, t, n) {
	let [r, i] = (0, x.useState)({
		data: null,
		error: null,
		loading: !0
	}), [a, o] = (0, x.useState)(0);
	return (0, x.useEffect)(() => {
		let t = !1;
		return i((e) => ({
			...e,
			loading: !0,
			error: null
		})), e().then((e) => {
			t || i({
				data: e,
				error: null,
				loading: !1
			});
		}).catch((e) => {
			t || i({
				data: null,
				error: e instanceof Error ? e : Error(String(e)),
				loading: !1
			});
		}), () => {
			t = !0;
		};
	}, [...t, a]), (0, x.useEffect)(() => {
		if (!n) return;
		let e = setInterval(() => o((e) => e + 1), n);
		return () => clearInterval(e);
	}, [n]), {
		...r,
		reload: () => o((e) => e + 1)
	};
}
//#endregion
//#region ../../node_modules/clsx/dist/clsx.mjs
function Me(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Me(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Ne() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Me(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../node_modules/class-variance-authority/dist/index.mjs
var Pe = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Fe = Ne, Ie = (e, t) => (n) => {
	if (t?.variants == null) return Fe(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Pe(t) || Pe(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Fe(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Le = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Re = (e, t) => ({
	classGroupId: e,
	validator: t
}), ze = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Be = "-", Ve = [], He = "arbitrary..", Ue = (e) => {
	let t = Ke(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Ge(e);
			let n = e.split(Be);
			return We(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Le(i, t) : t : i || Ve;
			}
			return n[e] || Ve;
		}
	};
}, We = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = We(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Be) : e.slice(t).join(Be), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Ge = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? He + r : void 0;
})(), Ke = (e) => {
	let { theme: t, classGroups: n } = e;
	return qe(n, t);
}, qe = (e, t) => {
	let n = ze();
	for (let r in e) {
		let i = e[r];
		Je(i, n, r, t);
	}
	return n;
}, Je = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Ye(i, t, n, r);
	}
}, Ye = (e, t, n, r) => {
	typeof e == "string" ? Xe(e, t, n) : typeof e == "function" ? Ze(e, t, n, r) : Qe(e, t, n, r);
}, Xe = (e, t, n) => {
	let r = e === "" ? t : $e(t, e);
	r.classGroupId = n;
}, Ze = (e, t, n, r) => {
	et(e) ? Je(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(Re(n, e)));
}, Qe = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Je(o, $e(t, a), n, r);
	}
}, $e = (e, t) => {
	let n = e, r = t.split(Be), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = ze(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, et = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, tt = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, nt = "!", rt = ":", it = [], at = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), ot = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === rt) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(nt) ? (c = s.slice(0, -1), l = !0) : s.startsWith(nt) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return at(t, l, c, u);
	};
	if (t) {
		let e = t + rt, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : at(it, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, st = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, ct = (e) => ({
	cache: tt(e.cacheSize),
	parseClassName: ot(e),
	sortModifiers: st(e),
	postfixLookupClassGroupIds: lt(e),
	...Ue(e)
}), lt = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, ut = /\s+/, dt = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(ut), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h || (g = r(p), !g)) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + nt : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, ft = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = pt(n)) && (i && (i += " "), i += r);
	return i;
}, pt = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = pt(e[r])) && (n && (n += " "), n += t);
	return n;
}, mt = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = ct(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = dt(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(ft(...e));
}, ht = [], gt = (e) => {
	let t = (t) => t[e] || ht;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, _t = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, vt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, yt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, bt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, xt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, St = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Ct = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, wt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Tt = (e) => yt.test(e), M = (e) => !!e && !Number.isNaN(Number(e)), Et = (e) => !!e && Number.isInteger(Number(e)), Dt = (e) => e.endsWith("%") && M(e.slice(0, -1)), Ot = (e) => bt.test(e), kt = () => !0, At = (e) => xt.test(e) && !St.test(e), jt = () => !1, Mt = (e) => Ct.test(e), Nt = (e) => wt.test(e), Pt = (e) => !N(e) && !P(e), Ft = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), It = (e) => Zt(e, tn, jt), N = (e) => _t.test(e), Lt = (e) => Zt(e, nn, At), Rt = (e) => Zt(e, rn, M), zt = (e) => Zt(e, on, kt), Bt = (e) => Zt(e, an, jt), Vt = (e) => Zt(e, $t, jt), Ht = (e) => Zt(e, en, Nt), Ut = (e) => Zt(e, sn, Mt), P = (e) => vt.test(e), Wt = (e) => Qt(e, nn), Gt = (e) => Qt(e, an), Kt = (e) => Qt(e, $t), qt = (e) => Qt(e, tn), Jt = (e) => Qt(e, en), Yt = (e) => Qt(e, sn, !0), Xt = (e) => Qt(e, on, !0), Zt = (e, t, n) => {
	let r = _t.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Qt = (e, t, n = !1) => {
	let r = vt.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, $t = (e) => e === "position" || e === "percentage", en = (e) => e === "image" || e === "url", tn = (e) => e === "length" || e === "size" || e === "bg-size", nn = (e) => e === "length", rn = (e) => e === "number", an = (e) => e === "family-name", on = (e) => e === "number" || e === "weight", sn = (e) => e === "shadow", cn = /*#__PURE__*/ mt(() => {
	let e = gt("color"), t = gt("font"), n = gt("text"), r = gt("font-weight"), i = gt("tracking"), a = gt("leading"), o = gt("breakpoint"), s = gt("container"), c = gt("spacing"), l = gt("radius"), u = gt("shadow"), d = gt("inset-shadow"), f = gt("text-shadow"), p = gt("drop-shadow"), m = gt("blur"), h = gt("perspective"), g = gt("aspect"), _ = gt("ease"), v = gt("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		P,
		N
	], ee = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], te = () => [
		"auto",
		"contain",
		"none"
	], S = () => [
		P,
		N,
		c
	], C = () => [
		Tt,
		"full",
		"auto",
		...S()
	], ne = () => [
		Et,
		"none",
		"subgrid",
		P,
		N
	], w = () => [
		"auto",
		{ span: [
			"full",
			Et,
			P,
			N
		] },
		Et,
		P,
		N
	], T = () => [
		Et,
		"auto",
		P,
		N
	], re = () => [
		"auto",
		"min",
		"max",
		"fr",
		P,
		N
	], ie = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], ae = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], oe = () => ["auto", ...S()], se = () => [
		Tt,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...S()
	], ce = () => [
		s,
		Tt,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...S()
	], le = () => [
		Tt,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...S()
	], E = () => [
		e,
		P,
		N
	], ue = () => [
		...b(),
		Kt,
		Vt,
		{ position: [P, N] }
	], de = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], fe = () => [
		"auto",
		"cover",
		"contain",
		qt,
		It,
		{ size: [P, N] }
	], pe = () => [
		Dt,
		Wt,
		Lt
	], D = () => [
		"",
		"none",
		"full",
		l,
		P,
		N
	], me = () => [
		"",
		M,
		Wt,
		Lt
	], he = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ge = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], _e = () => [
		M,
		Dt,
		Kt,
		Vt
	], ve = () => [
		"",
		"none",
		m,
		P,
		N
	], ye = () => [
		"none",
		M,
		P,
		N
	], be = () => [
		"none",
		M,
		P,
		N
	], xe = () => [
		M,
		P,
		N
	], Se = () => [
		Tt,
		"full",
		...S()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Ot],
			breakpoint: [Ot],
			color: [kt],
			container: [Ot],
			"drop-shadow": [Ot],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Pt],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Ot],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Ot],
			shadow: [Ot],
			spacing: ["px", M],
			text: [Ot],
			"text-shadow": [Ot],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Tt,
				N,
				P,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				P,
				N
			] }],
			"container-named": [Ft],
			columns: [{ columns: [
				M,
				"auto",
				N,
				P,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: ee() }],
			"overflow-x": [{ "overflow-x": ee() }],
			"overflow-y": [{ "overflow-y": ee() }],
			overscroll: [{ overscroll: te() }],
			"overscroll-x": [{ "overscroll-x": te() }],
			"overscroll-y": [{ "overscroll-y": te() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: C() }],
			"inset-x": [{ "inset-x": C() }],
			"inset-y": [{ "inset-y": C() }],
			start: [{
				"inset-s": C(),
				start: C()
			}],
			end: [{
				"inset-e": C(),
				end: C()
			}],
			"inset-bs": [{ "inset-bs": C() }],
			"inset-be": [{ "inset-be": C() }],
			top: [{ top: C() }],
			right: [{ right: C() }],
			bottom: [{ bottom: C() }],
			left: [{ left: C() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Et,
				"auto",
				P,
				N
			] }],
			basis: [{ basis: [
				Tt,
				"full",
				"auto",
				s,
				...S()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				M,
				Tt,
				"auto",
				"initial",
				"none",
				N
			] }],
			grow: [{ grow: [
				"",
				M,
				P,
				N
			] }],
			shrink: [{ shrink: [
				"",
				M,
				P,
				N
			] }],
			order: [{ order: [
				Et,
				"first",
				"last",
				"none",
				P,
				N
			] }],
			"grid-cols": [{ "grid-cols": ne() }],
			"col-start-end": [{ col: w() }],
			"col-start": [{ "col-start": T() }],
			"col-end": [{ "col-end": T() }],
			"grid-rows": [{ "grid-rows": ne() }],
			"row-start-end": [{ row: w() }],
			"row-start": [{ "row-start": T() }],
			"row-end": [{ "row-end": T() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": re() }],
			"auto-rows": [{ "auto-rows": re() }],
			gap: [{ gap: S() }],
			"gap-x": [{ "gap-x": S() }],
			"gap-y": [{ "gap-y": S() }],
			"justify-content": [{ justify: [...ie(), "normal"] }],
			"justify-items": [{ "justify-items": [...ae(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...ae()] }],
			"align-content": [{ content: ["normal", ...ie()] }],
			"align-items": [{ items: [...ae(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...ae(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": ie() }],
			"place-items": [{ "place-items": [...ae(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...ae()] }],
			p: [{ p: S() }],
			px: [{ px: S() }],
			py: [{ py: S() }],
			ps: [{ ps: S() }],
			pe: [{ pe: S() }],
			pbs: [{ pbs: S() }],
			pbe: [{ pbe: S() }],
			pt: [{ pt: S() }],
			pr: [{ pr: S() }],
			pb: [{ pb: S() }],
			pl: [{ pl: S() }],
			m: [{ m: oe() }],
			mx: [{ mx: oe() }],
			my: [{ my: oe() }],
			ms: [{ ms: oe() }],
			me: [{ me: oe() }],
			mbs: [{ mbs: oe() }],
			mbe: [{ mbe: oe() }],
			mt: [{ mt: oe() }],
			mr: [{ mr: oe() }],
			mb: [{ mb: oe() }],
			ml: [{ ml: oe() }],
			"space-x": [{ "space-x": S() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": S() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: se() }],
			"inline-size": [{ inline: ["auto", ...ce()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...ce()] }],
			"max-inline-size": [{ "max-inline": ["none", ...ce()] }],
			"block-size": [{ block: ["auto", ...le()] }],
			"min-block-size": [{ "min-block": ["auto", ...le()] }],
			"max-block-size": [{ "max-block": ["none", ...le()] }],
			w: [{ w: [
				s,
				"screen",
				...se()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...se()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...se()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...se()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...se()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...se()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Wt,
				Lt
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Xt,
				zt
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				Dt,
				N
			] }],
			"font-family": [{ font: [
				Gt,
				Bt,
				t
			] }],
			"font-features": [{ "font-features": [N] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				P,
				N
			] }],
			"line-clamp": [{ "line-clamp": [
				M,
				"none",
				P,
				Rt
			] }],
			leading: [{ leading: [
				"none",
				a,
				...S()
			] }],
			"list-image": [{ "list-image": [
				"none",
				P,
				N
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				P,
				N
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: E() }],
			"text-color": [{ text: E() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...he(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				M,
				"from-font",
				"auto",
				P,
				Lt
			] }],
			"text-decoration-color": [{ decoration: E() }],
			"underline-offset": [{ "underline-offset": [
				M,
				"auto",
				P,
				N
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: S() }],
			"tab-size": [{ tab: [
				Et,
				P,
				N
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				P,
				N
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				P,
				N
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ue() }],
			"bg-repeat": [{ bg: de() }],
			"bg-size": [{ bg: fe() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Et,
						P,
						N
					],
					radial: [
						"",
						P,
						N
					],
					conic: [
						"",
						Et,
						P,
						N
					]
				},
				Jt,
				Ht
			] }],
			"bg-color": [{ bg: E() }],
			"gradient-from-pos": [{ from: pe() }],
			"gradient-via-pos": [{ via: pe() }],
			"gradient-to-pos": [{ to: pe() }],
			"gradient-from": [{ from: E() }],
			"gradient-via": [{ via: E() }],
			"gradient-to": [{ to: E() }],
			rounded: [{ rounded: D() }],
			"rounded-s": [{ "rounded-s": D() }],
			"rounded-e": [{ "rounded-e": D() }],
			"rounded-t": [{ "rounded-t": D() }],
			"rounded-r": [{ "rounded-r": D() }],
			"rounded-b": [{ "rounded-b": D() }],
			"rounded-l": [{ "rounded-l": D() }],
			"rounded-ss": [{ "rounded-ss": D() }],
			"rounded-se": [{ "rounded-se": D() }],
			"rounded-ee": [{ "rounded-ee": D() }],
			"rounded-es": [{ "rounded-es": D() }],
			"rounded-tl": [{ "rounded-tl": D() }],
			"rounded-tr": [{ "rounded-tr": D() }],
			"rounded-br": [{ "rounded-br": D() }],
			"rounded-bl": [{ "rounded-bl": D() }],
			"border-w": [{ border: me() }],
			"border-w-x": [{ "border-x": me() }],
			"border-w-y": [{ "border-y": me() }],
			"border-w-s": [{ "border-s": me() }],
			"border-w-e": [{ "border-e": me() }],
			"border-w-bs": [{ "border-bs": me() }],
			"border-w-be": [{ "border-be": me() }],
			"border-w-t": [{ "border-t": me() }],
			"border-w-r": [{ "border-r": me() }],
			"border-w-b": [{ "border-b": me() }],
			"border-w-l": [{ "border-l": me() }],
			"divide-x": [{ "divide-x": me() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": me() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...he(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...he(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: E() }],
			"border-color-x": [{ "border-x": E() }],
			"border-color-y": [{ "border-y": E() }],
			"border-color-s": [{ "border-s": E() }],
			"border-color-e": [{ "border-e": E() }],
			"border-color-bs": [{ "border-bs": E() }],
			"border-color-be": [{ "border-be": E() }],
			"border-color-t": [{ "border-t": E() }],
			"border-color-r": [{ "border-r": E() }],
			"border-color-b": [{ "border-b": E() }],
			"border-color-l": [{ "border-l": E() }],
			"divide-color": [{ divide: E() }],
			"outline-style": [{ outline: [
				...he(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				M,
				P,
				N
			] }],
			"outline-w": [{ outline: [
				"",
				M,
				Wt,
				Lt
			] }],
			"outline-color": [{ outline: E() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Yt,
				Ut
			] }],
			"shadow-color": [{ shadow: E() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Yt,
				Ut
			] }],
			"inset-shadow-color": [{ "inset-shadow": E() }],
			"ring-w": [{ ring: me() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: E() }],
			"ring-offset-w": [{ "ring-offset": [M, Lt] }],
			"ring-offset-color": [{ "ring-offset": E() }],
			"inset-ring-w": [{ "inset-ring": me() }],
			"inset-ring-color": [{ "inset-ring": E() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Yt,
				Ut
			] }],
			"text-shadow-color": [{ "text-shadow": E() }],
			opacity: [{ opacity: [
				M,
				P,
				N
			] }],
			"mix-blend": [{ "mix-blend": [
				...ge(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ge() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [M] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": _e() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": _e() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": E() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": E() }],
			"mask-image-t-from-pos": [{ "mask-t-from": _e() }],
			"mask-image-t-to-pos": [{ "mask-t-to": _e() }],
			"mask-image-t-from-color": [{ "mask-t-from": E() }],
			"mask-image-t-to-color": [{ "mask-t-to": E() }],
			"mask-image-r-from-pos": [{ "mask-r-from": _e() }],
			"mask-image-r-to-pos": [{ "mask-r-to": _e() }],
			"mask-image-r-from-color": [{ "mask-r-from": E() }],
			"mask-image-r-to-color": [{ "mask-r-to": E() }],
			"mask-image-b-from-pos": [{ "mask-b-from": _e() }],
			"mask-image-b-to-pos": [{ "mask-b-to": _e() }],
			"mask-image-b-from-color": [{ "mask-b-from": E() }],
			"mask-image-b-to-color": [{ "mask-b-to": E() }],
			"mask-image-l-from-pos": [{ "mask-l-from": _e() }],
			"mask-image-l-to-pos": [{ "mask-l-to": _e() }],
			"mask-image-l-from-color": [{ "mask-l-from": E() }],
			"mask-image-l-to-color": [{ "mask-l-to": E() }],
			"mask-image-x-from-pos": [{ "mask-x-from": _e() }],
			"mask-image-x-to-pos": [{ "mask-x-to": _e() }],
			"mask-image-x-from-color": [{ "mask-x-from": E() }],
			"mask-image-x-to-color": [{ "mask-x-to": E() }],
			"mask-image-y-from-pos": [{ "mask-y-from": _e() }],
			"mask-image-y-to-pos": [{ "mask-y-to": _e() }],
			"mask-image-y-from-color": [{ "mask-y-from": E() }],
			"mask-image-y-to-color": [{ "mask-y-to": E() }],
			"mask-image-radial": [{ "mask-radial": [P, N] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": _e() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": _e() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": E() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": E() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [M] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": _e() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": _e() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": E() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": E() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ue() }],
			"mask-repeat": [{ mask: de() }],
			"mask-size": [{ mask: fe() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				P,
				N
			] }],
			filter: [{ filter: [
				"",
				"none",
				P,
				N
			] }],
			blur: [{ blur: ve() }],
			brightness: [{ brightness: [
				M,
				P,
				N
			] }],
			contrast: [{ contrast: [
				M,
				P,
				N
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Yt,
				Ut
			] }],
			"drop-shadow-color": [{ "drop-shadow": E() }],
			grayscale: [{ grayscale: [
				"",
				M,
				P,
				N
			] }],
			"hue-rotate": [{ "hue-rotate": [
				M,
				P,
				N
			] }],
			invert: [{ invert: [
				"",
				M,
				P,
				N
			] }],
			saturate: [{ saturate: [
				M,
				P,
				N
			] }],
			sepia: [{ sepia: [
				"",
				M,
				P,
				N
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				P,
				N
			] }],
			"backdrop-blur": [{ "backdrop-blur": ve() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				M,
				P,
				N
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				M,
				P,
				N
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				M,
				P,
				N
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				M,
				P,
				N
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				M,
				P,
				N
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				M,
				P,
				N
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				M,
				P,
				N
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				M,
				P,
				N
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": S() }],
			"border-spacing-x": [{ "border-spacing-x": S() }],
			"border-spacing-y": [{ "border-spacing-y": S() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				P,
				N
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				M,
				"initial",
				P,
				N
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				P,
				N
			] }],
			delay: [{ delay: [
				M,
				P,
				N
			] }],
			animate: [{ animate: [
				"none",
				v,
				P,
				N
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				P,
				N
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ye() }],
			"rotate-x": [{ "rotate-x": ye() }],
			"rotate-y": [{ "rotate-y": ye() }],
			"rotate-z": [{ "rotate-z": ye() }],
			scale: [{ scale: be() }],
			"scale-x": [{ "scale-x": be() }],
			"scale-y": [{ "scale-y": be() }],
			"scale-z": [{ "scale-z": be() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: xe() }],
			"skew-x": [{ "skew-x": xe() }],
			"skew-y": [{ "skew-y": xe() }],
			transform: [{ transform: [
				P,
				N,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: Se() }],
			"translate-x": [{ "translate-x": Se() }],
			"translate-y": [{ "translate-y": Se() }],
			"translate-z": [{ "translate-z": Se() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Et,
				P,
				N
			] }],
			accent: [{ accent: E() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: E() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				P,
				N
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": E() }],
			"scrollbar-track-color": [{ "scrollbar-track": E() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": S() }],
			"scroll-mx": [{ "scroll-mx": S() }],
			"scroll-my": [{ "scroll-my": S() }],
			"scroll-ms": [{ "scroll-ms": S() }],
			"scroll-me": [{ "scroll-me": S() }],
			"scroll-mbs": [{ "scroll-mbs": S() }],
			"scroll-mbe": [{ "scroll-mbe": S() }],
			"scroll-mt": [{ "scroll-mt": S() }],
			"scroll-mr": [{ "scroll-mr": S() }],
			"scroll-mb": [{ "scroll-mb": S() }],
			"scroll-ml": [{ "scroll-ml": S() }],
			"scroll-p": [{ "scroll-p": S() }],
			"scroll-px": [{ "scroll-px": S() }],
			"scroll-py": [{ "scroll-py": S() }],
			"scroll-ps": [{ "scroll-ps": S() }],
			"scroll-pe": [{ "scroll-pe": S() }],
			"scroll-pbs": [{ "scroll-pbs": S() }],
			"scroll-pbe": [{ "scroll-pbe": S() }],
			"scroll-pt": [{ "scroll-pt": S() }],
			"scroll-pr": [{ "scroll-pr": S() }],
			"scroll-pb": [{ "scroll-pb": S() }],
			"scroll-pl": [{ "scroll-pl": S() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				P,
				N
			] }],
			fill: [{ fill: ["none", ...E()] }],
			"stroke-w": [{ stroke: [
				M,
				Wt,
				Lt,
				Rt
			] }],
			stroke: [{ stroke: ["none", ...E()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region ../../packages/ui/src/lib/utils.ts
function ln(...e) {
	return cn(Ne(e));
}
//#endregion
//#region ../../node_modules/react/cjs/react-jsx-runtime.production.js
var un = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), dn = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === ie ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case S: return "Suspense";
				case C: return "SuspenseList";
				case T: return "Activity";
				case re: return "ViewTransition";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case ee: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case te:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ne: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case w:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === w) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = ae.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (oe.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				le || (le = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function l() {
			var e = t(this.type);
			return E[e] || (E[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function u(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: l
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, d) {
			var f = n.children;
			if (f !== void 0) {
				if (o) {
					if (se(f)) {
						for (o = 0; o < f.length; o++) p(f[o]);
						Object.freeze && Object.freeze(f);
					} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				} else p(f);
			}
			if (oe.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", fe[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), fe[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), u(e, f, i, a(), l, d);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === w && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = d(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), T = Symbol.for("react.activity"), re = Symbol.for("react.view_transition"), ie = Symbol.for("react.client.reference"), ae = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = Object.prototype.hasOwnProperty, se = Array.isArray, ce = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var le, E = {}, ue = h.react_stack_bottom_frame.bind(h, o)(), de = ce(i(o)), fe = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > ae.recentlyCreatedOwnerStacks++;
			if (r) {
				var a = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var o = Error("react-stack-top-frame");
				Error.stackTraceLimit = a;
			} else o = ue;
			return f(e, t, n, !1, o, r ? ce(i(e)) : de);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > ae.recentlyCreatedOwnerStacks++;
			if (r) {
				var a = Error.stackTraceLimit;
				Error.stackTraceLimit = 10;
				var o = Error("react-stack-top-frame");
				Error.stackTraceLimit = a;
			} else o = ue;
			return f(e, t, n, !0, o, r ? ce(i(e)) : de);
		};
	})();
})), F = (/* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? un() : dn();
})))(), fn = Ie("relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
	} },
	defaultVariants: { variant: "default" }
});
function pn({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: ln(fn({ variant: t }), e),
		...n
	});
}
function mn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "alert-title",
		className: ln("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
		...t
	});
}
function hn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "alert-description",
		className: ln("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", e),
		...t
	});
}
//#endregion
//#region ../../node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var gn = Object.defineProperty, _n = (e, t) => gn(e, "name", {
	value: t,
	configurable: !0
});
function vn(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
_n(vn, "setRef");
function yn(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = vn(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : vn(e[t], null);
			}
		};
	};
}
_n(yn, "composeRefs");
function bn(...e) {
	return x.useCallback(yn(...e), e);
}
_n(bn, "useComposedRefs");
//#endregion
//#region ../../node_modules/@radix-ui/react-slot/dist/index.mjs
var xn = Object.defineProperty, Sn = (e, t) => xn(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function Cn(e) {
	let t = x.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		r = Pn(r), x.Children.forEach(r, (e) => {
			if (An(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				for (; Mn(n) && typeof Rn == "function";) n = Rn(n._payload);
				a = Dn(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = x.cloneElement(a, void 0, s) : !o && x.Children.count(r) === 1 && x.isValidElement(r) && (a = r);
		let c = a ? kn(a) : void 0, l = bn(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? Ln(e) : In(e));
			return r;
		}
		let u = On(i, a.props ?? {});
		return a.type !== x.Fragment && (u.ref = n ? l : c), x.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
Sn(Cn, "createSlot");
var wn = /* @__PURE__ */ Cn("Slot"), Tn = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function En(e) {
	let t = /* @__PURE__ */ Sn((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = Tn, t;
}
Sn(En, "createSlottable");
var Dn = /* @__PURE__ */ Sn((e, t) => "child" in e.props ? x.isValidElement(t) ? x.cloneElement(t, void 0, e.props.children(t.props.children)) : null : x.isValidElement(t) ? t : null, "getSlottableElementFromSlottable");
function On(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" ? n[r] = [i, a].filter(Boolean).join(" ") : r === "aria-describedby" && (n[r] = Fn(a, i));
	}
	return {
		...e,
		...n
	};
}
Sn(On, "mergeProps");
function kn(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Sn(kn, "getElementRef");
function An(e) {
	return x.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Tn;
}
Sn(An, "isSlottable");
var jn = Symbol.for("react.lazy");
function Mn(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === jn && "_payload" in e && Nn(e._payload);
}
Sn(Mn, "isLazyComponent");
function Nn(e) {
	return typeof e == "object" && !!e && "then" in e;
}
Sn(Nn, "isPromiseLike");
function Pn(e) {
	let t = e;
	for (; Mn(t) && typeof Rn == "function";) t = Rn(t._payload);
	return t;
}
Sn(Pn, "useUnwrappedLazy");
function Fn(...e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) if (typeof n == "string") for (let e of String(n).trim().split(/\s+/)) e && t.add(e);
	return t.size > 0 ? Array.from(t).join(" ") : void 0;
}
Sn(Fn, "concatAriaDescribedby");
var In = /* @__PURE__ */ Sn((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Ln = /* @__PURE__ */ Sn((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Rn = x.use, zn = Ie("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		destructive: "border-transparent bg-destructive text-destructive-foreground",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Bn({ className: e, variant: t, asChild: n = !1, ...r }) {
	return /* @__PURE__ */ (0, F.jsx)(n ? wn : "span", {
		"data-slot": "badge",
		className: ln(zn({ variant: t }), e),
		...r
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/button.tsx
var Vn = Ie("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3",
			lg: "h-10 rounded-md px-6",
			icon: "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Hn({ className: e, variant: t, size: n, asChild: r = !1, ...i }) {
	return /* @__PURE__ */ (0, F.jsx)(r ? wn : "button", {
		"data-slot": "button",
		className: ln(Vn({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/card.tsx
function Un({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "card",
		className: ln("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", e),
		...t
	});
}
function Wn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "card-header",
		className: ln("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]", e),
		...t
	});
}
function Gn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "card-title",
		className: ln("leading-none font-semibold", e),
		...t
	});
}
function Kn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "card-description",
		className: ln("text-muted-foreground text-sm", e),
		...t
	});
}
function qn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "card-content",
		className: ln("px-6", e),
		...t
	});
}
//#endregion
//#region ../../node_modules/@radix-ui/primitive/dist/index.mjs
var Jn = Object.defineProperty, Yn = (e, t) => Jn(e, "name", {
	value: t,
	configurable: !0
}), Xn = !!(typeof window < "u" && window.document && window.document.createElement);
function Zn(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ Yn(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
Yn(Zn, "composeEventHandlers");
function Qn(e) {
	if (!Xn) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
Yn(Qn, "getOwnerWindow");
function $n(e) {
	if (!Xn) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
Yn($n, "getOwnerDocument");
function er(e, t = !1) {
	let { activeElement: n } = $n(e);
	if (!n?.nodeName) return null;
	if (tr(n) && n.contentDocument) return er(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = $n(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
Yn(er, "getActiveElement");
function tr(e) {
	return e.tagName === "IFRAME";
}
Yn(tr, "isFrame");
//#endregion
//#region ../../node_modules/@radix-ui/react-context/dist/index.mjs
var nr = Object.defineProperty, rr = (e, t) => nr(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	let n = x.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ rr((e) => {
		let { children: t, ...r } = e, i = x.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ (0, F.jsx)(n.Provider, {
			value: i,
			children: t
		});
	}, "Provider");
	r.displayName = e + "Provider";
	function i(r, i = {}) {
		let { optional: a = !1 } = i, o = x.useContext(n);
		if (o) return o;
		if (t !== void 0) return t;
		if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return rr(i, "useContext"), [r, i];
}
rr(ir, "createContext");
// @__NO_SIDE_EFFECTS__
function ar(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = x.createContext(r);
		i.displayName = t + "Context";
		let a = n.length;
		n = [...n, r];
		let o = /* @__PURE__ */ rr((t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = x.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, F.jsx)(s.Provider, {
				value: c,
				children: r
			});
		}, "Provider");
		o.displayName = t + "Provider";
		function s(n, o, s = {}) {
			let { optional: c = !1 } = s, l = o?.[e]?.[a] || i, u = x.useContext(l);
			if (u) return u;
			if (r !== void 0) return r;
			if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return rr(s, "useContext"), [o, s];
	}
	rr(r, "createContext");
	let i = /* @__PURE__ */ rr(() => {
		let t = n.map((e) => x.createContext(e));
		return /* @__PURE__ */ rr(function(n) {
			let r = n?.[e] || t;
			return x.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, or(i, ...t)];
}
rr(ar, "createContextScope");
function or(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ rr(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ rr(function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return x.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		}, "useComposedScopes");
	}, "createScope");
	return n.scopeName = t.scopeName, n;
}
rr(or, "composeContextScopes");
//#endregion
//#region ../../node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var sr = globalThis?.document ? x.useLayoutEffect : () => {}, cr = Object.defineProperty, lr = (e, t) => cr(e, "name", {
	value: t,
	configurable: !0
}), ur = x.useId || (() => void 0), dr = 0;
function fr(e) {
	let [t, n] = x.useState(ur());
	return sr(() => {
		e || n((e) => e ?? String(dr++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
lr(fr, "useId");
//#endregion
//#region ../../node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
var pr = Object.defineProperty, mr = (e, t) => pr(e, "name", {
	value: t,
	configurable: !0
}), hr = x.useEffectEvent, gr = x.useInsertionEffect;
function _r(e) {
	if (typeof hr == "function") return hr(e);
	let t = x.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof gr == "function" ? gr(() => {
		t.current = e;
	}) : sr(() => {
		t.current = e;
	}), x.useMemo(() => ((...e) => t.current?.(...e)), []);
}
mr(_r, "useEffectEvent");
//#endregion
//#region ../../node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var vr = Object.defineProperty, yr = (e, t) => vr(e, "name", {
	value: t,
	configurable: !0
}), br = x.useInsertionEffect || sr;
function xr({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ yr(() => {}, "onChange"), caller: r }) {
	let [i, a, o] = Sr({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0;
	return [s ? e : i, x.useCallback((t) => {
		if (s) {
			let n = Cr(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
yr(xr, "useControllableState");
function Sr({ defaultProp: e, onChange: t }) {
	let [n, r] = x.useState(e), i = x.useRef(n), a = x.useRef(t);
	return br(() => {
		a.current = t;
	}, [t]), x.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
yr(Sr, "useUncontrolledState");
function Cr(e) {
	return typeof e == "function";
}
yr(Cr, "isFunction");
var wr = Symbol("RADIX:SYNC_STATE");
function Tr(e, t, n, r) {
	let { prop: i, defaultProp: a, onChange: o, caller: s } = t, c = i !== void 0, l = _r(o), u = [{
		...n,
		state: a
	}];
	r && u.push(r);
	let [d, f] = x.useReducer((t, n) => {
		if (n.type === wr) return {
			...t,
			state: n.state
		};
		let r = e(t, n);
		return c && !Object.is(r.state, t.state) && l(r.state), r;
	}, ...u), p = d.state, m = x.useRef(p);
	x.useEffect(() => {
		m.current !== p && (m.current = p, c || l(p));
	}, [
		p,
		m,
		c
	]);
	let h = x.useMemo(() => i === void 0 ? d : {
		...d,
		state: i
	}, [d, i]);
	return x.useEffect(() => {
		c && !Object.is(i, d.state) && f({
			type: wr,
			state: i
		});
	}, [
		i,
		d.state,
		c
	]), [h, f];
}
yr(Tr, "useControllableStateReducer");
//#endregion
//#region ../../node_modules/@radix-ui/react-primitive/dist/index.mjs
var Er = /* @__PURE__ */ c(_(), 1), Dr = Object.defineProperty, Or = (e, t) => Dr(e, "name", {
	value: t,
	configurable: !0
}), kr = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ Cn(`Primitive.${t}`), r = x.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, F.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function Ar(e, t) {
	e && Er.flushSync(() => e.dispatchEvent(t));
}
Or(Ar, "dispatchDiscreteCustomEvent");
//#endregion
//#region ../../node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var jr = Object.defineProperty, Mr = (e, t) => jr(e, "name", {
	value: t,
	configurable: !0
}), Nr = x.useInsertionEffect;
function Pr(e) {
	let t = x.useRef(e);
	return typeof Nr == "function" ? Nr(() => {
		t.current = e;
	}) : sr(() => {
		t.current = e;
	}), x.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Mr(Pr, "useCallbackRef");
//#endregion
//#region ../../node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Fr = Object.defineProperty, Ir = (e, t) => Fr(e, "name", {
	value: t,
	configurable: !0
}), Lr = "dismissableLayer.update", Rr = "dismissableLayer.pointerDownOutside", zr = "dismissableLayer.focusOutside", Br, Vr = x.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), Hr = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ir(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = e, u = x.useContext(Vr), [d, f] = x.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = x.useState({}), h = bn(t, f), g = Array.from(u.layers), [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = _ ? g.indexOf(_) : -1, y = d ? g.indexOf(d) : -1, b = u.layersWithOutsidePointerEventsDisabled.size > 0, ee = y >= v, te = x.useRef(!1), S = Gr((e) => {
		a?.(e), s?.(e), e.defaultPrevented || c?.();
	}, {
		ownerDocument: p,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: te,
		dismissableSurfaces: u.dismissableSurfaces,
		shouldHandlePointerDownOutside: x.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...u.branches].some((t) => t.contains(e));
			return ee && !t;
		}, [u.branches, ee])
	}), C = Kr((e) => {
		if (r && te.current) return;
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), ne = d ? y === g.length - 1 : !1, w = Pr((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	});
	return x.useEffect(() => {
		if (ne) return p.addEventListener("keydown", w, { capture: !0 }), () => p.removeEventListener("keydown", w, { capture: !0 });
	}, [
		p,
		ne,
		w
	]), x.useEffect(() => {
		if (d) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Br = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), qr(), () => {
			n && (u.layersWithOutsidePointerEventsDisabled.delete(d), u.layersWithOutsidePointerEventsDisabled.size === 0 && (p.body.style.pointerEvents = Br));
		};
	}, [
		d,
		p,
		n,
		u
	]), x.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), qr());
	}, [d, u]), x.useEffect(() => {
		let e = /* @__PURE__ */ Ir(() => m({}), "handleUpdate");
		return document.addEventListener(Lr, e), () => document.removeEventListener(Lr, e);
	}, []), /* @__PURE__ */ (0, F.jsx)(kr.div, {
		...l,
		ref: h,
		style: {
			pointerEvents: b ? ee ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: Zn(e.onFocusCapture, C.onFocusCapture),
		onBlurCapture: Zn(e.onBlurCapture, C.onBlurCapture),
		onPointerDownCapture: Zn(e.onPointerDownCapture, S.onPointerDownCapture)
	});
}, "DismissableLayer"));
function Ur() {
	let e = x.useContext(Vr), [t, n] = x.useState(null);
	return x.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
Ir(Ur, "useDismissableLayerSurface");
var Wr = /* @__PURE__ */ Ir(() => !0, "IS_TRUE");
function Gr(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: a, shouldHandlePointerDownOutside: o = Wr } = t, s = Pr(e), c = x.useRef(!1), l = x.useRef(!1), u = x.useRef(/* @__PURE__ */ new Map()), d = x.useRef(() => {});
	return x.useEffect(() => {
		function e() {
			l.current = !1, i.current = !1, u.current.clear();
		}
		Ir(e, "resetOutsideInteraction");
		function t() {
			return Array.from(u.current.values()).some(Boolean);
		}
		Ir(t, "isOutsideInteractionIntercepted");
		function f(e) {
			if (!l.current) return;
			let t = e.target;
			t instanceof Node && [...a].some((e) => e.contains(t)) || u.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				l.current && d.current();
			}, 0);
		}
		Ir(f, "handleInteractionCapture");
		function p(e) {
			l.current && u.current.set(e.type, !1);
		}
		Ir(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ Ir((a) => {
			if (a.target && !c.current) {
				let f = function() {
					n.removeEventListener("click", d.current);
					let r = t();
					e(), r || Jr(Rr, s, p, { discrete: !0 });
				};
				if (Ir(f, "handleAndDispatchPointerDownOutsideEvent"), !o(a.target)) {
					n.removeEventListener("click", d.current), e(), c.current = !1;
					return;
				}
				let p = { originalEvent: a };
				l.current = !0, i.current = r && a.button === 0, u.current.clear(), !r || a.button !== 0 ? f() : (n.removeEventListener("click", d.current), d.current = f, n.addEventListener("click", d.current, { once: !0 }));
			} else n.removeEventListener("click", d.current), e();
			c.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) n.addEventListener(e, f, !0), n.addEventListener(e, p);
		let g = window.setTimeout(() => {
			n.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), n.removeEventListener("pointerdown", m), n.removeEventListener("click", d.current);
			for (let e of h) n.removeEventListener(e, f, !0), n.removeEventListener(e, p);
		};
	}, [
		n,
		s,
		r,
		i,
		a,
		o
	]), { onPointerDownCapture: /* @__PURE__ */ Ir(() => c.current = !0, "onPointerDownCapture") };
}
Ir(Gr, "usePointerDownOutside");
function Kr(e, t = globalThis?.document) {
	let n = Pr(e), r = x.useRef(!1);
	return x.useEffect(() => {
		let e = /* @__PURE__ */ Ir((e) => {
			e.target && !r.current && Jr(zr, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ Ir(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ Ir(() => r.current = !1, "onBlurCapture")
	};
}
Ir(Kr, "useFocusOutside");
function qr() {
	let e = new CustomEvent(Lr);
	document.dispatchEvent(e);
}
Ir(qr, "dispatchUpdate");
function Jr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? Ar(i, a) : i.dispatchEvent(a);
}
Ir(Jr, "handleAndDispatchCustomEvent");
//#endregion
//#region ../../node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Yr = Object.defineProperty, Xr = (e, t) => Yr(e, "name", {
	value: t,
	configurable: !0
}), Zr = "focusScope.autoFocusOnMount", Qr = "focusScope.autoFocusOnUnmount", $r = {
	bubbles: !1,
	cancelable: !0
}, ei = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Xr(function(e, t) {
	let { loop: n = !1, trapped: r = !1, branches: i, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = e, [c, l] = x.useState(null), u = Pr(a), d = Pr(o), f = x.useRef(null), p = bn(t, l), m = x.useRef(i);
	x.useEffect(() => {
		m.current = i;
	});
	let h = x.useCallback((e) => e ? c?.contains(e) ? !0 : !!m.current?.some((t) => t.contains(e)) : !1, [c]), g = x.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	x.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (g.paused || !c) return;
				let t = e.target;
				h(t) ? f.current = t : di(f.current, { select: !0 });
			}, t = function(e) {
				if (g.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (h(t) || di(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && di(c);
			};
			Xr(e, "handleFocusIn"), Xr(t, "handleFocusOut"), Xr(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return c && r.observe(c, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		c,
		g.paused,
		h
	]), x.useEffect(() => {
		if (c) {
			fi.add(g);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(Zr, $r);
				c.addEventListener(Zr, u), c.dispatchEvent(t), t.defaultPrevented || (ai(hi(si(c)), { select: !0 }), document.activeElement === e && di(c));
			}
			return () => {
				c.removeEventListener(Zr, u);
				let t = c.ownerDocument, n = CustomEvent;
				setTimeout(() => {
					let r = new n(Qr, $r);
					c.addEventListener(Qr, d), c.dispatchEvent(r), r.defaultPrevented || di(e ?? t.body, { select: !0 }), c.removeEventListener(Qr, d), fi.remove(g);
				}, 0);
			};
		}
	}, [
		c,
		u,
		d,
		g
	]);
	let _ = x.useCallback((e) => {
		if (!n && !r || g.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = oi(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && di(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && di(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		g.paused
	]);
	return /* @__PURE__ */ (0, F.jsx)(kr.div, {
		tabIndex: -1,
		...s,
		ref: p,
		onKeyDown: _
	});
}, "FocusScope")), ti = x.createContext(null);
function ni({ registry: e, children: t }) {
	return e ? /* @__PURE__ */ (0, F.jsx)(ti.Provider, {
		value: e,
		children: t
	}) : t;
}
Xr(ni, "FocusScopeBranchProvider");
function ri() {
	let [e, t] = x.useState([]);
	return {
		nodes: e,
		registry: x.useMemo(() => ({
			add: /* @__PURE__ */ Xr((e) => t((t) => t.includes(e) ? t : [...t, e]), "add"),
			remove: /* @__PURE__ */ Xr((e) => t((t) => t.filter((t) => t !== e)), "remove")
		}), [])
	};
}
Xr(ri, "useFocusScopeBranchRegistry");
function ii(e) {
	let t = x.useContext(ti);
	x.useEffect(() => {
		if (e && t) return t.add(e), () => t.remove(e);
	}, [e, t]);
}
Xr(ii, "useFocusScopeBranch");
function ai(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (di(r, { select: t }), document.activeElement !== n) return;
}
Xr(ai, "focusFirst");
function oi(e) {
	let t = si(e);
	return [ci(t, e), ci(t.reverse(), e)];
}
Xr(oi, "getTabbableEdges");
function si(e) {
	let t = [], n = e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ Xr((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
Xr(si, "getTabbableCandidates");
function ci(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : li(r, { upTo: t }))) return r;
}
Xr(ci, "findVisible");
function li(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
Xr(li, "isHidden");
function ui(e) {
	return e.tagName === "INPUT" && typeof e.select == "function";
}
Xr(ui, "isSelectableInput");
function di(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = (e.ownerDocument ?? document).activeElement;
		e.focus({ preventScroll: !0 }), e !== n && ui(e) && t && e.select();
	}
}
Xr(di, "focus");
var fi = pi();
function pi() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = mi(e, t), e.unshift(t);
		},
		remove(t) {
			e = mi(e, t), e[0]?.resume();
		}
	};
}
Xr(pi, "createFocusScopesStack");
function mi(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
Xr(mi, "arrayRemove");
function hi(e) {
	return e.filter((e) => e.tagName !== "A");
}
Xr(hi, "removeLinks");
//#endregion
//#region ../../node_modules/@radix-ui/react-portal/dist/index.mjs
var gi = Object.defineProperty, _i = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ ((e, t) => gi(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { container: n, ...r } = e, [i, a] = x.useState(!1);
	sr(() => a(!0), []);
	let o = n || i && globalThis?.document?.body;
	return o ? Er.createPortal(/* @__PURE__ */ (0, F.jsx)(kr.div, {
		...r,
		ref: t
	}), o) : null;
}, "Portal")), vi = Object.defineProperty, yi = (e, t) => vi(e, "name", {
	value: t,
	configurable: !0
});
function bi(e, t) {
	return x.useReducer((e, n) => t[e][n] ?? e, e);
}
yi(bi, "useStateMachine");
var xi = /* @__PURE__ */ yi((e) => {
	let { present: t, children: n } = e, r = Si(t), i = typeof n == "function" ? n({ present: r.isPresent }) : x.Children.only(n), a = wi(r.ref, Ei(i));
	return typeof n == "function" || r.isPresent ? x.cloneElement(i, { ref: a }) : null;
}, "Presence");
function Si(e) {
	let [t, n] = x.useState(), r = x.useRef(null), i = x.useRef(e), a = x.useRef("none"), o = x.useRef(void 0), [s, c] = bi(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return x.useEffect(() => {
		s === "mounted" ? (a.current = o.current ?? Ti(r.current), o.current = void 0) : a.current = "none";
	}, [s]), sr(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, s = Ti(t);
			e ? (o.current = s, c("MOUNT")) : s === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== s ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, c]), sr(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = /* @__PURE__ */ yi((a) => {
				let o = Ti(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (c("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ yi((e) => {
				e.target === t && (a.current = Ti(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		}
		c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: x.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, o.current = Ti(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
yi(Si, "usePresence");
function Ci(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
yi(Ci, "setRef");
function wi(...e) {
	let t = x.useRef(e);
	return t.current = e, x.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = Ci(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : Ci(n[e], null);
			}
		};
	}, []);
}
yi(wi, "useStableComposedRefs");
function Ti(e) {
	return e?.animationName || "none";
}
yi(Ti, "getAnimationName");
function Ei(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
yi(Ei, "getElementRef");
//#endregion
//#region ../../node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Di = Object.defineProperty, Oi = (e, t) => Di(e, "name", {
	value: t,
	configurable: !0
}), ki = 0, Ai = null;
function ji(e) {
	return Mi(), e.children;
}
Oi(ji, "FocusGuards");
function Mi() {
	x.useEffect(() => {
		Ai ||= {
			start: Ni(),
			end: Ni()
		};
		let { start: e, end: t } = Ai;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), ki++, () => {
			ki === 1 && (Ai?.start.remove(), Ai?.end.remove(), Ai = null), ki = Math.max(0, ki - 1);
		};
	}, []);
}
Oi(Mi, "useFocusGuards");
function Ni() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Oi(Ni, "createFocusGuard");
//#endregion
//#region ../../node_modules/tslib/tslib.es6.mjs
var Pi = function() {
	return Pi = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Pi.apply(this, arguments);
};
function Fi(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Ii(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region ../../node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Li = "right-scroll-bar-position", Ri = "width-before-scroll-bar", zi = "with-scroll-bars-hidden", Bi = "--removed-body-scroll-bar-size";
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/assignRef.js
function Vi(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/useRef.js
function Hi(e, t) {
	var n = (0, x.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region ../../node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Ui = typeof window < "u" ? x.useLayoutEffect : x.useEffect, Wi = /* @__PURE__ */ new WeakMap();
function Gi(e, t) {
	var n = Hi(t || null, function(t) {
		return e.forEach(function(e) {
			return Vi(e, t);
		});
	});
	return Ui(function() {
		var t = Wi.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Vi(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Vi(e, a);
			});
		}
		Wi.set(n, e);
	}, [e]), n;
}
//#endregion
//#region ../../node_modules/use-sidecar/dist/es2015/medium.js
function Ki(e) {
	return e;
}
function qi(e, t) {
	t === void 0 && (t = Ki);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Ji(e) {
	e === void 0 && (e = {});
	var t = qi(null);
	return t.options = Pi({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region ../../node_modules/use-sidecar/dist/es2015/exports.js
var Yi = function(e) {
	var t = e.sideCar, n = Fi(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return x.createElement(r, Pi({}, n));
};
Yi.isSideCarExport = !0;
function Xi(e, t) {
	return e.useMedium(t), Yi;
}
//#endregion
//#region ../../node_modules/react-remove-scroll/dist/es2015/medium.js
var Zi = Ji(), Qi = function() {}, $i = x.forwardRef(function(e, t) {
	var n = x.useRef(null), r = x.useState({
		onScrollCapture: Qi,
		onWheelCapture: Qi,
		onTouchMoveCapture: Qi
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, m = e.noIsolation, h = e.inert, g = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, y = e.gapMode, b = Fi(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), ee = f, te = Gi([n, t]), S = Pi(Pi({}, b), i);
	return x.createElement(x.Fragment, null, u && x.createElement(ee, {
		sideCar: Zi,
		removeScrollBar: l,
		shards: d,
		noRelative: p,
		noIsolation: m,
		inert: h,
		setCallbacks: a,
		allowPinchZoom: !!g,
		lockRef: n,
		gapMode: y
	}), o ? x.cloneElement(x.Children.only(s), Pi(Pi({}, S), { ref: te })) : x.createElement(v, Pi({}, S, {
		className: c,
		ref: te
	}), s));
});
$i.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, $i.classNames = {
	fullWidth: Ri,
	zeroRight: Li
};
//#endregion
//#region ../../node_modules/get-nonce/dist/es2015/index.js
var ea = function() {
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region ../../node_modules/react-style-singleton/dist/es2015/singleton.js
function ta() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = ea();
	return t && e.setAttribute("nonce", t), e;
}
function na(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ra(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var ia = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = ta()) && (na(t, n), ra(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, aa = function() {
	var e = ia();
	return function(t, n) {
		x.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, oa = function() {
	var e = aa();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, sa = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, ca = function(e) {
	return parseInt(e || "", 10) || 0;
}, I = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		ca(n),
		ca(r),
		ca(i)
	];
}, la = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return sa;
	var t = I(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, ua = oa(), da = "data-scroll-locked", fa = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${zi} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${da}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${Li} {
    right: ${s}px ${r};
  }
  
  .${Ri} {
    margin-right: ${s}px ${r};
  }
  
  .${Li} .${Li} {
    right: 0 ${r};
  }
  
  .${Ri} .${Ri} {
    margin-right: 0 ${r};
  }
  
  body[${da}] {
    ${Bi}: ${s}px;
  }
`;
}, pa = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, ma = function() {
	x.useEffect(function() {
		return document.body.setAttribute(da, (pa() + 1).toString()), function() {
			var e = pa() - 1;
			e <= 0 ? document.body.removeAttribute(da) : document.body.setAttribute(da, e.toString());
		};
	}, []);
}, ha = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	ma();
	var a = x.useMemo(function() {
		return la(i);
	}, [i]);
	return x.createElement(ua, { styles: fa(a, !t, i, n ? "" : "!important") });
}, ga = !1;
if (typeof window < "u") try {
	var _a = Object.defineProperty({}, "passive", { get: function() {
		return ga = !0, !0;
	} });
	window.addEventListener("test", _a, _a), window.removeEventListener("test", _a, _a);
} catch {
	ga = !1;
}
var va = ga ? { passive: !1 } : !1, ya = function(e) {
	return e.tagName === "TEXTAREA";
}, ba = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ya(e) && n[t] === "visible");
}, xa = function(e) {
	return ba(e, "overflowY");
}, Sa = function(e) {
	return ba(e, "overflowX");
}, Ca = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), Ea(e, r)) {
			var i = Da(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, wa = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Ta = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, Ea = function(e, t) {
	return e === "v" ? xa(t) : Sa(t);
}, Da = function(e, t) {
	return e === "v" ? wa(t) : Ta(t);
}, Oa = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, ka = function(e, t, n, r, i) {
	var a = Oa(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Da(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && Ea(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Aa = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ja = function(e) {
	return [e.deltaX, e.deltaY];
}, Ma = function(e) {
	return e && "current" in e ? e.current : e;
}, Na = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, Pa = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, L = 0, R = [];
function Fa(e) {
	var t = x.useRef([]), n = x.useRef([0, 0]), r = x.useRef(), i = x.useState(L++)[0], a = x.useState(oa)[0], o = x.useRef(e);
	x.useEffect(function() {
		o.current = e;
	}, [e]), x.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = Ii([e.lockRef.current], (e.shards || []).map(Ma), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = x.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = Aa(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Ca(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Ca(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return ka(h, t, e, h === "h" ? s : c, !0);
	}, []), c = x.useCallback(function(e) {
		var n = e;
		if (R.length && R[R.length - 1] === a) {
			var r = "deltaY" in n ? ja(n) : Aa(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && Na(e.delta, r);
			})[0];
			if (i && i.should) n.cancelable && n.preventDefault();
			else if (!i) {
				var c = (o.current.shards || []).map(Ma).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = x.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: Ia(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), u = x.useCallback(function(e) {
		n.current = Aa(e), r.current = void 0;
	}, []), d = x.useCallback(function(t) {
		l(t.type, ja(t), t.target, s(t, e.lockRef.current));
	}, []), f = x.useCallback(function(t) {
		l(t.type, Aa(t), t.target, s(t, e.lockRef.current));
	}, []);
	x.useEffect(function() {
		return R.push(a), e.setCallbacks({
			onScrollCapture: d,
			onWheelCapture: d,
			onTouchMoveCapture: f
		}), document.addEventListener("wheel", c, va), document.addEventListener("touchmove", c, va), document.addEventListener("touchstart", u, va), function() {
			R = R.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, va), document.removeEventListener("touchmove", c, va), document.removeEventListener("touchstart", u, va);
		};
	}, []);
	var p = e.removeScrollBar, m = e.inert;
	return x.createElement(x.Fragment, null, m ? x.createElement(a, { styles: Pa(i) }) : null, p ? x.createElement(ha, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function Ia(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region ../../node_modules/react-remove-scroll/dist/es2015/sidecar.js
var La = Xi(Zi, Fa), Ra = x.forwardRef(function(e, t) {
	return x.createElement($i, Pi({}, e, {
		ref: t,
		sideCar: La
	}));
});
Ra.classNames = $i.classNames;
//#endregion
//#region ../../node_modules/aria-hidden/dist/es2015/index.js
var za = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, Ba = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap(), Ha = {}, Ua = 0, Wa = function(e) {
	return e && (e.host || Wa(e.parentNode));
}, Ga = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = Wa(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Ka = function(e, t, n, r) {
	var i = Ga(t, Array.isArray(e) ? e : [e]);
	Ha[n] || (Ha[n] = /* @__PURE__ */ new WeakMap());
	var a = Ha[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		e && !s.has(e) && (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		e && !c.has(e) && Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (Ba.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				Ba.set(e, c), a.set(e, l), o.push(e), c === 1 && i && Va.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), Ua++, function() {
		o.forEach(function(e) {
			var t = Ba.get(e) - 1, i = a.get(e) - 1;
			Ba.set(e, t), a.set(e, i), t || (Va.has(e) || e.removeAttribute(r), Va.delete(e)), i || e.removeAttribute(n);
		}), Ua--, Ua || (Ba = /* @__PURE__ */ new WeakMap(), Ba = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap(), Ha = {});
	};
}, qa = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || za(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Ka(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, Ja = Object.defineProperty, Ya = (e, t) => Ja(e, "name", {
	value: t,
	configurable: !0
}), Xa = "Dialog", [Za, Qa] = /* @__PURE__ */ ar(Xa), [$a, eo] = Za(Xa), to = /* @__PURE__ */ Ya((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, s = x.useRef(null), c = x.useRef(null), { nodes: l, registry: u } = ri(), [d, f] = xr({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: Xa
	}), [p, m] = x.useState(0), [h, g] = x.useState(0);
	return /* @__PURE__ */ (0, F.jsx)($a, {
		scope: t,
		triggerRef: s,
		contentRef: c,
		contentId: fr(),
		titleId: fr(),
		descriptionId: fr(),
		titlePresent: p > 0,
		descriptionPresent: h > 0,
		setTitleCount: m,
		setDescriptionCount: g,
		open: d,
		onOpenChange: f,
		onOpenToggle: x.useCallback(() => f((e) => !e), [f]),
		modal: o,
		branchNodes: l,
		branchRegistry: u,
		children: n
	});
}, "Dialog"), no = "DialogPortal", [ro, io] = Za(no, { forceMount: void 0 }), ao = /* @__PURE__ */ Ya((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = eo(no, t);
	return /* @__PURE__ */ (0, F.jsx)(ro, {
		scope: t,
		forceMount: n,
		children: x.Children.map(r, (e) => /* @__PURE__ */ (0, F.jsx)(xi, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, F.jsx)(_i, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), oo = "DialogOverlay", so = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let n = io(oo, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = eo(oo, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ (0, F.jsx)(xi, {
		present: r || a.open,
		children: /* @__PURE__ */ (0, F.jsx)(lo, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), co = /* @__PURE__ */ Cn("DialogOverlay.RemoveScroll"), lo = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = eo(oo, n), a = bn(t, Ur());
	return /* @__PURE__ */ (0, F.jsx)(Ra, {
		as: co,
		allowPinchZoom: !0,
		shards: x.useMemo(() => [i.contentRef, ...i.branchNodes.map((e) => ({ current: e }))], [i.contentRef, i.branchNodes]),
		children: /* @__PURE__ */ (0, F.jsx)(kr.div, {
			"data-state": xo(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), uo = "DialogContent", fo = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let n = io(uo, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = eo(uo, e.__scopeDialog);
	return /* @__PURE__ */ (0, F.jsx)(xi, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, F.jsx)(po, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, F.jsx)(mo, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), po = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let n = eo(uo, e.__scopeDialog), r = x.useRef(null), i = bn(t, n.contentRef, r);
	return x.useEffect(() => {
		let e = r.current;
		if (e) return qa(e);
	}, []), /* @__PURE__ */ (0, F.jsx)(ho, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: Zn(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: Zn(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: Zn(e.onFocusOutside, (e) => e.preventDefault())
	});
}, "DialogContentModal")), mo = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let n = eo(uo, e.__scopeDialog), r = x.useRef(!1), i = x.useRef(!1);
	return /* @__PURE__ */ (0, F.jsx)(ho, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "DialogContentNonModal")), ho = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, "aria-describedby": o, children: s, ...c } = e, l = eo(uo, n);
	return Mi(), /* @__PURE__ */ (0, F.jsx)(ni, {
		registry: l.branchRegistry,
		children: /* @__PURE__ */ (0, F.jsx)(ei, {
			asChild: !0,
			loop: !0,
			trapped: r,
			branches: l.branchNodes,
			onMountAutoFocus: i,
			onUnmountAutoFocus: a,
			children: /* @__PURE__ */ (0, F.jsx)(Hr, {
				role: "dialog",
				id: l.contentId,
				"aria-labelledby": l.titlePresent ? l.titleId : void 0,
				"aria-describedby": l.descriptionPresent ? bo(o, l.descriptionId) : o,
				"data-state": xo(l.open),
				...c,
				ref: t,
				deferPointerDownOutside: !0,
				onDismiss: () => l.onOpenChange(!1),
				children: s
			})
		})
	});
}, "DialogContentImpl")), go = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = eo("DialogTitle", n), { setTitleCount: a } = i;
	return sr(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, F.jsx)(kr.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), _o = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = eo("DialogDescription", n), { setDescriptionCount: a } = i;
	return sr(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, F.jsx)(kr.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), vo = "DialogClose", yo = /* @__PURE__ */ x.forwardRef(/* @__PURE__ */ Ya(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = eo(vo, n);
	return /* @__PURE__ */ (0, F.jsx)(kr.button, {
		type: "button",
		...r,
		ref: t,
		onClick: Zn(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function bo(...e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) if (typeof n == "string") for (let e of String(n).trim().split(/\s+/)) e && t.add(e);
	return t.size > 0 ? Array.from(t).join(" ") : void 0;
}
Ya(bo, "concatAriaDescribedby");
function xo(e) {
	return e ? "open" : "closed";
}
Ya(xo, "getState");
//#endregion
//#region ../../packages/ui/src/components/ui/dialog.tsx
function So({ ...e }) {
	return /* @__PURE__ */ (0, F.jsx)(to, {
		"data-slot": "dialog",
		...e
	});
}
function Co({ ...e }) {
	return /* @__PURE__ */ (0, F.jsx)(ao, {
		"data-slot": "dialog-portal",
		...e
	});
}
function wo({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)(so, {
		"data-slot": "dialog-overlay",
		className: ln("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", e),
		...t
	});
}
function To({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, F.jsxs)(Co, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, F.jsx)(wo, {}), /* @__PURE__ */ (0, F.jsxs)(fo, {
			"data-slot": "dialog-content",
			className: ln("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", e),
			...r,
			children: [t, n && /* @__PURE__ */ (0, F.jsxs)(yo, {
				"data-slot": "dialog-close",
				className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, F.jsx)(O, {}), /* @__PURE__ */ (0, F.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function Eo({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "dialog-header",
		className: ln("flex flex-col gap-2 text-center sm:text-left", e),
		...t
	});
}
function Do({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "dialog-footer",
		className: ln("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
		...t
	});
}
function Oo({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)(go, {
		"data-slot": "dialog-title",
		className: ln("text-lg leading-none font-semibold", e),
		...t
	});
}
function ko({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)(_o, {
		"data-slot": "dialog-description",
		className: ln("text-muted-foreground text-sm", e),
		...t
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/skeleton.tsx
function Ao({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "skeleton",
		className: ln("bg-accent animate-pulse rounded-md", e),
		...t
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/table.tsx
function jo({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, F.jsx)("table", {
			"data-slot": "table",
			className: ln("w-full caption-bottom text-sm", e),
			...t
		})
	});
}
function Mo({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("thead", {
		"data-slot": "table-header",
		className: ln("[&_tr]:border-b", e),
		...t
	});
}
function No({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("tbody", {
		"data-slot": "table-body",
		className: ln("[&_tr:last-child]:border-0", e),
		...t
	});
}
function Po({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("tr", {
		"data-slot": "table-row",
		className: ln("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", e),
		...t
	});
}
function Fo({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("th", {
		"data-slot": "table-head",
		className: ln("text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function Io({ className: e, ...t }) {
	return /* @__PURE__ */ (0, F.jsx)("td", {
		"data-slot": "table-cell",
		className: ln("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
//#endregion
//#region src/app.tsx
function Lo({ attrs: e, navigate: t }) {
	return (e.view ?? "jobs") === "job" ? /* @__PURE__ */ (0, F.jsx)(zo, {
		jobId: e["job-id"] ?? "",
		navigate: t
	}) : /* @__PURE__ */ (0, F.jsx)(Ro, { navigate: t });
}
function Ro({ navigate: e }) {
	let [t, n] = (0, x.useState)(0), [r, i] = (0, x.useState)(null), [a, o] = (0, x.useState)(!1), [s, c] = (0, x.useState)(null), [l, u] = (0, x.useState)(null), d = je(() => j.jobs({
		page: t,
		size: 25
	}), [t], 1e4), f = je(() => j.opsSummary(), [], 3e4), p = async () => {
		o(!0), i(null);
		try {
			let e = await j.createCrawlJob({
				all: !0,
				jobType: "incremental"
			});
			i(`Requested ${e.items.length} incremental job(s) for enabled sources.`), d.reload();
		} catch (e) {
			i(e instanceof k ? `${e.message} ${e.action}` : "Request failed.");
		} finally {
			o(!1);
		}
	}, m = async () => {
		if (l) {
			c(l.id), i(null);
			try {
				await j.cancelJob(l.id), i(`Cancellation requested for job ${qo(l.id)}.`), u(null), d.reload();
			} catch (e) {
				i(e instanceof k ? `${e.message} ${e.action}` : "Request failed.");
			} finally {
				c(null);
			}
		}
	}, h = d.data ? Math.max(1, Math.ceil(d.data.total / Math.max(1, d.data.size))) : 1;
	return /* @__PURE__ */ (0, F.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, F.jsx)(Ho, {
				title: "Jobs",
				description: "Crawl runs appear here — polls every 10 s while this module is open.",
				actions: /* @__PURE__ */ (0, F.jsxs)(F.Fragment, { children: [/* @__PURE__ */ (0, F.jsxs)(Hn, {
					variant: "outline",
					size: "sm",
					disabled: a,
					onClick: p,
					children: [/* @__PURE__ */ (0, F.jsx)(_e, {}), " Crawl all enabled"]
				}), /* @__PURE__ */ (0, F.jsxs)(Hn, {
					variant: "outline",
					size: "sm",
					onClick: () => d.reload(),
					children: [/* @__PURE__ */ (0, F.jsx)(ye, {}), " Reload"]
				})] })
			}),
			/* @__PURE__ */ (0, F.jsx)(Uo, { text: r }),
			d.error ? /* @__PURE__ */ (0, F.jsx)(Wo, { error: d.error }) : null,
			d.loading && !d.data ? /* @__PURE__ */ (0, F.jsx)(Go, {}) : null,
			d.data ? /* @__PURE__ */ (0, F.jsxs)(F.Fragment, { children: [/* @__PURE__ */ (0, F.jsx)(Bo, {
				items: d.data.items,
				busyId: s,
				navigate: e,
				onCancel: u
			}), /* @__PURE__ */ (0, F.jsxs)("div", {
				className: "text-muted-foreground flex items-center justify-between gap-2 text-sm",
				children: [/* @__PURE__ */ (0, F.jsxs)("span", { children: [
					"Page ",
					d.data.page + 1,
					" of ",
					h,
					" — ",
					d.data.total,
					" jobs"
				] }), /* @__PURE__ */ (0, F.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, F.jsx)(Hn, {
						variant: "outline",
						size: "sm",
						disabled: t <= 0,
						onClick: () => n((e) => e - 1),
						children: "Previous"
					}), /* @__PURE__ */ (0, F.jsx)(Hn, {
						variant: "outline",
						size: "sm",
						disabled: t + 1 >= h,
						onClick: () => n((e) => e + 1),
						children: "Next"
					})]
				})]
			})] }) : null,
			/* @__PURE__ */ (0, F.jsx)(Vo, {
				ops: f.data,
				error: f.error
			}),
			/* @__PURE__ */ (0, F.jsx)(So, {
				open: l !== null,
				onOpenChange: (e) => e ? null : u(null),
				children: /* @__PURE__ */ (0, F.jsxs)(To, { children: [/* @__PURE__ */ (0, F.jsxs)(Eo, { children: [/* @__PURE__ */ (0, F.jsx)(Oo, { children: "Cancel this job?" }), /* @__PURE__ */ (0, F.jsxs)(ko, { children: [
					"Job ",
					l ? qo(l.id) : "",
					" on ",
					l?.sourceKey,
					" stops after the current fetch. Archiving already done is kept."
				] })] }), /* @__PURE__ */ (0, F.jsxs)(Do, { children: [/* @__PURE__ */ (0, F.jsx)(Hn, {
					variant: "outline",
					onClick: () => u(null),
					children: "Keep running"
				}), /* @__PURE__ */ (0, F.jsxs)(Hn, {
					variant: "destructive",
					disabled: s !== null,
					onClick: m,
					children: [/* @__PURE__ */ (0, F.jsx)(he, {}), " Cancel job"]
				})] })] })
			})
		]
	});
}
function zo({ jobId: e, navigate: t }) {
	let [n, r] = (0, x.useState)(null), [i, a] = (0, x.useState)(!1), o = je(() => j.job(e), [e], 1e4);
	if (e === "") return /* @__PURE__ */ (0, F.jsxs)(pn, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, F.jsx)(xe, {}),
			/* @__PURE__ */ (0, F.jsx)(mn, { children: "Missing job id" }),
			/* @__PURE__ */ (0, F.jsx)(hn, { children: "The shell routed here without a job-id attribute." })
		]
	});
	let s = o.data !== null && (o.data.status === "queued" || o.data.status === "running");
	return /* @__PURE__ */ (0, F.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, F.jsx)(Ho, {
				title: o.data ? `Job ${qo(o.data.id)}` : "Job",
				description: "Polls every 10 s — counters update as the crawler reports batches.",
				actions: /* @__PURE__ */ (0, F.jsxs)(F.Fragment, { children: [
					/* @__PURE__ */ (0, F.jsxs)(Hn, {
						variant: "ghost",
						size: "sm",
						onClick: () => t("/jobs"),
						children: [/* @__PURE__ */ (0, F.jsx)(D, {}), " Jobs"]
					}),
					/* @__PURE__ */ (0, F.jsxs)(Hn, {
						variant: "outline",
						size: "sm",
						onClick: () => o.reload(),
						children: [/* @__PURE__ */ (0, F.jsx)(ye, {}), " Reload"]
					}),
					/* @__PURE__ */ (0, F.jsxs)(Hn, {
						variant: "destructive",
						size: "sm",
						disabled: i || !s,
						onClick: async () => {
							a(!0), r(null);
							try {
								await j.cancelJob(e), r("Cancellation requested."), o.reload();
							} catch (e) {
								r(e instanceof k ? `${e.message} ${e.action}` : "Request failed.");
							} finally {
								a(!1);
							}
						},
						children: [/* @__PURE__ */ (0, F.jsx)(he, {}), " Cancel"]
					})
				] })
			}),
			/* @__PURE__ */ (0, F.jsx)(Uo, { text: n }),
			o.error ? /* @__PURE__ */ (0, F.jsx)(Wo, { error: o.error }) : null,
			o.loading && !o.data ? /* @__PURE__ */ (0, F.jsx)(Go, {}) : null,
			o.data ? /* @__PURE__ */ (0, F.jsxs)(Un, { children: [/* @__PURE__ */ (0, F.jsxs)(Wn, { children: [/* @__PURE__ */ (0, F.jsxs)(Gn, {
				className: "flex items-center gap-2",
				children: [
					o.data.sourceKey,
					" · ",
					o.data.jobType,
					/* @__PURE__ */ (0, F.jsx)(Bn, {
						variant: Ko(o.data.status),
						children: o.data.status
					})
				]
			}), /* @__PURE__ */ (0, F.jsxs)(Kn, { children: ["Requested ", Jo(o.data.requestedAt)] })] }), /* @__PURE__ */ (0, F.jsxs)(qn, {
				className: "grid gap-x-6 gap-y-3 text-sm sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Started",
						value: Jo(o.data.startedAt)
					}),
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Finished",
						value: Jo(o.data.finishedAt)
					}),
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Job id",
						value: o.data.id,
						mono: !0
					}),
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Discovered",
						value: String(o.data.discoveredCount)
					}),
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Archived",
						value: String(o.data.archivedCount)
					}),
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Skipped",
						value: String(o.data.skippedCount)
					}),
					/* @__PURE__ */ (0, F.jsx)(z, {
						label: "Failed",
						value: String(o.data.failedCount)
					})
				]
			})] }) : null
		]
	});
}
function Bo({ items: e, busyId: t, navigate: n, onCancel: r }) {
	return e.length === 0 ? /* @__PURE__ */ (0, F.jsx)("p", {
		className: "text-muted-foreground py-6 text-center text-sm",
		children: "No jobs yet."
	}) : /* @__PURE__ */ (0, F.jsxs)(jo, { children: [/* @__PURE__ */ (0, F.jsx)(Mo, { children: /* @__PURE__ */ (0, F.jsxs)(Po, { children: [
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "Job" }),
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "Source" }),
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "Type" }),
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "Status" }),
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "Requested" }),
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "D / A / S / F" }),
		/* @__PURE__ */ (0, F.jsx)(Fo, { children: "Actions" })
	] }) }), /* @__PURE__ */ (0, F.jsx)(No, { children: e.map((e) => /* @__PURE__ */ (0, F.jsxs)(Po, {
		className: "cursor-pointer",
		onClick: () => n(`/jobs/${e.id}`),
		children: [
			/* @__PURE__ */ (0, F.jsx)(Io, {
				className: "font-mono text-xs",
				children: qo(e.id)
			}),
			/* @__PURE__ */ (0, F.jsx)(Io, { children: /* @__PURE__ */ (0, F.jsx)(Bn, {
				variant: "outline",
				children: e.sourceKey
			}) }),
			/* @__PURE__ */ (0, F.jsx)(Io, { children: e.jobType }),
			/* @__PURE__ */ (0, F.jsx)(Io, { children: /* @__PURE__ */ (0, F.jsx)(Bn, {
				variant: Ko(e.status),
				children: e.status
			}) }),
			/* @__PURE__ */ (0, F.jsx)(Io, { children: Jo(e.requestedAt) }),
			/* @__PURE__ */ (0, F.jsxs)(Io, {
				className: "font-mono text-xs",
				children: [
					e.discoveredCount,
					" / ",
					e.archivedCount,
					" / ",
					e.skippedCount,
					" / ",
					e.failedCount
				]
			}),
			/* @__PURE__ */ (0, F.jsx)(Io, { children: e.status === "queued" || e.status === "running" ? /* @__PURE__ */ (0, F.jsxs)(Hn, {
				variant: "outline",
				size: "sm",
				disabled: t === e.id,
				onClick: (t) => {
					t.stopPropagation(), r(e);
				},
				children: [/* @__PURE__ */ (0, F.jsx)(he, {}), " Cancel"]
			}) : /* @__PURE__ */ (0, F.jsx)("span", {
				className: "text-muted-foreground text-xs",
				children: "—"
			}) })
		]
	}, e.id)) })] });
}
function Vo({ ops: e, error: t }) {
	return /* @__PURE__ */ (0, F.jsxs)(Un, { children: [/* @__PURE__ */ (0, F.jsxs)(Wn, { children: [/* @__PURE__ */ (0, F.jsx)(Gn, {
		className: "text-base",
		children: "Service health"
	}), /* @__PURE__ */ (0, F.jsx)(Kn, { children: e ? `Projection lag ${e.projectionLagSeconds}s · checked ${Jo(e.checkedAt)}` : "Health of crawler-service, api-service, PostgreSQL, Redis." })] }), /* @__PURE__ */ (0, F.jsxs)(qn, {
		className: "space-y-2 text-sm",
		children: [t ? /* @__PURE__ */ (0, F.jsx)(Wo, { error: t }) : null, e?.services.map((e) => /* @__PURE__ */ (0, F.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [
				/* @__PURE__ */ (0, F.jsx)("span", {
					className: "font-medium",
					children: e.service
				}),
				/* @__PURE__ */ (0, F.jsx)("span", {
					className: "text-muted-foreground flex-1 truncate text-right text-xs",
					children: e.details.join(" · ")
				}),
				/* @__PURE__ */ (0, F.jsx)(Bn, {
					variant: e.status === "healthy" ? "default" : e.status === "down" ? "destructive" : "secondary",
					children: e.status
				})
			]
		}, e.service))]
	})] });
}
function Ho({ title: e, description: t, actions: n }) {
	return /* @__PURE__ */ (0, F.jsxs)("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, F.jsxs)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, F.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: e
			}), t ? /* @__PURE__ */ (0, F.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: t
			}) : null]
		}), n ? /* @__PURE__ */ (0, F.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: n
		}) : null]
	});
}
function Uo({ text: e }) {
	return e ? /* @__PURE__ */ (0, F.jsx)(pn, { children: /* @__PURE__ */ (0, F.jsx)(hn, { children: e }) }) : null;
}
function Wo({ error: e }) {
	let t = e instanceof k ? e.message : "Request failed.", n = e instanceof k ? e.action : "Check that the stack is running.";
	return /* @__PURE__ */ (0, F.jsxs)(pn, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, F.jsx)(xe, {}),
			/* @__PURE__ */ (0, F.jsx)(mn, { children: t }),
			/* @__PURE__ */ (0, F.jsx)(hn, { children: n })
		]
	});
}
function z({ label: e, value: t, mono: n = !1 }) {
	return /* @__PURE__ */ (0, F.jsxs)("div", {
		className: "space-y-0.5",
		children: [/* @__PURE__ */ (0, F.jsx)("p", {
			className: "text-muted-foreground text-xs tracking-wide uppercase",
			children: e
		}), /* @__PURE__ */ (0, F.jsx)("p", {
			className: n ? "font-mono text-xs break-all" : "",
			children: t
		})]
	});
}
function Go() {
	return /* @__PURE__ */ (0, F.jsx)("div", {
		className: "space-y-2",
		children: Array.from({ length: 6 }).map((e, t) => /* @__PURE__ */ (0, F.jsx)(Ao, { className: "h-9 w-full" }, t))
	});
}
function Ko(e) {
	return e === "completed" ? "default" : e === "failed" ? "destructive" : e === "cancelled" ? "outline" : "secondary";
}
function qo(e) {
	return e.slice(0, 8);
}
function Jo(e) {
	return e ? `${e.slice(0, 19).replace("T", " ")} UTC` : "—";
}
//#endregion
//#region src/mfe.ts
C("tb-admin-app", Lo, ["view", "job-id"]);
//#endregion
