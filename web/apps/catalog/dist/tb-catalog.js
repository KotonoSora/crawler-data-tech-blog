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
			Ce[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), Ce[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = Ee, this.updater = n || we;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = Ee, this.updater = n || we;
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
			if (typeof e == "function") return e.$$typeof === ke ? null : e.displayName || e.name || null;
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
			var e = k.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (Ae.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				A || (A = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return Ne[e] || (Ne[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
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
				return Oe(a) ? (n = "", c != null && (n = c.replace(Le, "$&/") + "/"), C(a, t, n, "", function(e) {
					return e;
				})) : a != null && (x(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(Le, "$&/") + "/") + c), i !== "" && s != null && x(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", Oe(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + te(i, l), s += C(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (Ie || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ie = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + te(i, l++), s += C(i, t, n, o, a);
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
			var e = k.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function re() {
			k.asyncTransitions--;
		}
		function ie(e) {
			var t = k.T, n = {};
			n.types = t === null ? null : t.types, n._updatedFibers = /* @__PURE__ */ new Set(), k.T = n;
			try {
				var r = e(), i = k.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (k.asyncTransitions++, r.then(re, re), r.then(c, Re));
			} catch (e) {
				Re(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), k.T = t;
			}
		}
		function ae(e) {
			var t = k.T;
			if (t !== null) {
				var n = t.types;
				n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
			} else k.asyncTransitions === 0 && console.error("addTransitionType can only be called inside a `startTransition()` callback. It must be associated with a specific Transition."), ie(ae.bind(null, e));
		}
		function oe(e) {
			if (Be === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				Be = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				Be = function(e) {
					!1 === ze && (ze = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return Be(e);
		}
		function se(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function ce(e, t) {
			t !== Ve - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ve = t;
		}
		function le(e, t, n) {
			var r = k.actQueue;
			if (r !== null) {
				if (r.length !== 0) try {
					E(r), oe(function() {
						return le(e, t, n);
					});
					return;
				} catch (e) {
					k.thrownErrors.push(e);
				}
				else k.actQueue = null;
			}
			0 < k.thrownErrors.length ? (r = se(k.thrownErrors), k.thrownErrors.length = 0, n(r)) : t(e);
		}
		function E(e) {
			if (!Ue) {
				Ue = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							k.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (k.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), k.thrownErrors.push(n);
				} finally {
					Ue = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var ue = Symbol.for("react.transitional.element"), de = Symbol.for("react.portal"), fe = Symbol.for("react.fragment"), pe = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), me = Symbol.for("react.consumer"), he = Symbol.for("react.context"), ge = Symbol.for("react.forward_ref"), _e = Symbol.for("react.suspense"), ve = Symbol.for("react.suspense_list"), ye = Symbol.for("react.memo"), be = Symbol.for("react.lazy"), xe = Symbol.for("react.activity"), Se = Symbol.for("react.view_transition"), O = Symbol.iterator, Ce = {}, we = {
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
		}, Te = Object.assign, Ee = {};
		Object.freeze(Ee), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var De = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (Ge in De) De.hasOwnProperty(Ge) && n(Ge, De[Ge]);
		o.prototype = a.prototype, De = s.prototype = new o(), De.constructor = s, Te(De, a.prototype), De.isPureReactComponent = !0;
		var Oe = Array.isArray, ke = Symbol.for("react.client.reference"), k = {
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
		}, Ae = Object.prototype.hasOwnProperty, je = console.createTask ? console.createTask : function() {
			return null;
		};
		De = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var A, Me, Ne = {}, Pe = De.react_stack_bottom_frame.bind(De, m)(), Fe = je(f(m)), Ie = !1, Le = /\/+/g, Re = typeof reportError == "function" ? reportError : function(e) {
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
		}, ze = !1, Be = null, Ve = 0, He = !1, Ue = !1, We = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : oe;
		De = Object.freeze({
			__proto__: null,
			c: function(e) {
				return T().useMemoCache(e);
			}
		});
		var Ge = {
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
		e.Activity = xe, e.Children = Ge, e.Component = a, e.Fragment = fe, e.Profiler = D, e.PureComponent = s, e.StrictMode = pe, e.Suspense = _e, e.ViewTransition = Se, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, e.__COMPILER_RUNTIME = De, e.act = function(e) {
			var t = k.actQueue, n = Ve;
			Ve++;
			var r = k.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				k.thrownErrors.push(e);
			}
			if (0 < k.thrownErrors.length) throw ce(t, n), e = se(k.thrownErrors), k.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return We(function() {
					i || He || (He = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (ce(t, n), n === 0) {
							try {
								E(r), oe(function() {
									return le(i, e, a);
								});
							} catch (e) {
								k.thrownErrors.push(e);
							}
							if (0 < k.thrownErrors.length) {
								var o = se(k.thrownErrors);
								k.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						ce(t, n), 0 < k.thrownErrors.length && (e = se(k.thrownErrors), k.thrownErrors.length = 0), a(e);
					});
				} };
			}
			var s = a;
			if (ce(t, n), n === 0 && (E(r), r.length !== 0 && We(function() {
				i || He || (He = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), k.actQueue = null), 0 < k.thrownErrors.length) throw e = se(k.thrownErrors), k.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (k.actQueue = r, oe(function() {
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
			var e = k.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = Te({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (Ae.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !Ae.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
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
			if (t != null) for (i in Me || !("__self" in t) || "key" in t || (Me = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), a = "" + t.key), t) Ae.call(t, i) && i !== "key" && i !== "__self" && i !== "__source" && (r[i] = t[i]);
			var o = arguments.length - 2;
			if (o === 1) r.children = n;
			else if (1 < o) {
				for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
				Object.freeze && Object.freeze(s), r.children = s;
			}
			if (e && e.defaultProps) for (i in o = e.defaultProps, o) r[i] === void 0 && (r[i] = o[i]);
			return a && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), (i = 1e4 > k.recentlyCreatedOwnerStacks++) ? (s = Error.stackTraceLimit, Error.stackTraceLimit = 10, o = Error("react-stack-top-frame"), Error.stackTraceLimit = s) : o = Pe, v(e, a, r, p(), o, i ? je(f(e)) : Fe);
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
	var Se = Array.isArray, O = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ce = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, we = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, Te = [], Ee = -1;
	function De(e) {
		return { current: e };
	}
	function Oe(e) {
		0 > Ee || (e.current = Te[Ee], Te[Ee] = null, Ee--);
	}
	function ke(e, t) {
		Ee++, Te[Ee] = e.current, e.current = t;
	}
	var k = De(null), Ae = De(null), je = De(null), A = De(null);
	function Me(e, t) {
		switch (ke(je, t), ke(Ae, e), ke(k, null), t.nodeType) {
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
		Oe(k), ke(k, e);
	}
	function Ne() {
		Oe(k), Oe(Ae), Oe(je);
	}
	function Pe(e) {
		var t = e.memoizedState;
		t !== null && (gh._currentValue = t.memoizedState, ke(A, e)), t = k.current;
		var n = Sp(t, e.type);
		t !== n && (ke(Ae, e), ke(k, n));
	}
	function Fe(e) {
		Ae.current === e && (Oe(k), Oe(Ae)), A.current === e && (Oe(A), gh._currentValue = we);
	}
	var Ie, Le;
	function Re(e) {
		if (Ie === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ie = t && t[1] || "", Le = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ie + e + Le;
	}
	var ze = !1;
	function Be(e, t) {
		if (!e || ze) return "";
		ze = !0;
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
			ze = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Re(n) : "";
	}
	function Ve(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Re(e.type);
			case 16: return Re("Lazy");
			case 13: return e.child !== t && t !== null ? Re("Suspense Fallback") : Re("Suspense");
			case 19: return Re("SuspenseList");
			case 0:
			case 15: return Be(e.type, !1);
			case 11: return Be(e.type.render, !1);
			case 1: return Be(e.type, !0);
			case 31: return Re("Activity");
			case 30: return Re("ViewTransition");
			default: return "";
		}
	}
	function He(e) {
		try {
			var t = "", n = null;
			do
				t += Ve(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ue = Object.prototype.hasOwnProperty, We = t.unstable_scheduleCallback, Ge = t.unstable_cancelCallback, Ke = t.unstable_shouldYield, qe = t.unstable_requestPaint, Je = t.unstable_now, Ye = t.unstable_getCurrentPriorityLevel, Xe = t.unstable_ImmediatePriority, Ze = t.unstable_UserBlockingPriority, Qe = t.unstable_NormalPriority, $e = t.unstable_LowPriority, et = t.unstable_IdlePriority, tt = t.log, nt = t.unstable_setDisableYieldValue, rt = null, it = null;
	function at(e) {
		if (typeof tt == "function" && nt(e), it && typeof it.setStrictMode == "function") try {
			it.setStrictMode(rt, e);
		} catch {}
	}
	var ot = Math.clz32 ? Math.clz32 : lt, st = Math.log, ct = Math.LN2;
	function lt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (st(e) / ct | 0) | 0;
	}
	var ut = 256, dt = 262144, ft = 4194304;
	function pt(e) {
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
	function mt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = pt(n))) : i = pt(o) : i = pt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = pt(n))) : i = pt(o)) : i = pt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ht(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function gt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - ot(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function _t(e, t) {
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
	function vt() {
		var e = ft;
		return ft <<= 1, !(ft & 62914560) && (ft = 4194304), e;
	}
	function yt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function bt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function xt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - ot(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && St(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function St(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - ot(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Ct(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - ot(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function wt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Tt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Tt(e) {
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
	function Et(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function j() {
		var e = Ce.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Mh(e.type)) : e;
	}
	function Dt(e, t) {
		var n = Ce.p;
		try {
			return Ce.p = e, t();
		} finally {
			Ce.p = n;
		}
	}
	var Ot = Math.random().toString(36).slice(2), kt = "__reactFiber$" + Ot, At = "__reactProps$" + Ot, jt = "__reactContainer$" + Ot, Mt = "__reactEvents$" + Ot, Nt = "__reactListeners$" + Ot, Pt = "__reactHandles$" + Ot, Ft = "__reactResources$" + Ot, It = "__reactMarker$" + Ot, Lt = "__reactLoad$" + Ot;
	function M(e) {
		delete e[kt], delete e[At], delete e[Nt], delete e[Pt];
	}
	function Rt(e) {
		var t;
		if (t = e[kt]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[jt] || n[kt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sm(e); e !== null;) {
					if (n = e[kt]) return n;
					e = Sm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function zt(e) {
		if (e = e[kt] || e[jt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Bt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Vt(e) {
		var t = e[Ft];
		return t ||= e[Ft] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ht(e) {
		e[It] = !0;
	}
	function Ut(e) {
		e[Lt] = void 0;
	}
	var Wt = /* @__PURE__ */ new Set(), N = {};
	function Gt(e, t) {
		Kt(e, t), Kt(e + "Capture", t);
	}
	function Kt(e, t) {
		for (N[e] = t, e = 0; e < t.length; e++) Wt.add(t[e]);
	}
	var qt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jt = {}, Yt = {};
	function Xt(e) {
		return Ue.call(Yt, e) ? !0 : Ue.call(Jt, e) ? !1 : qt.test(e) ? Yt[e] = !0 : (Jt[e] = !0, !1);
	}
	var Zt = !1;
	function Qt() {
		var e = Zt;
		return Zt = !1, e;
	}
	function $t(e, t, n) {
		if (Xt(t)) {
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
	function en(e, t, n) {
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
	function tn(e, t, n, r) {
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
	function nn(e) {
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
	function rn(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function an(e, t, n) {
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
	function on(e) {
		if (!e._valueTracker) {
			var t = rn(e) ? "checked" : "value";
			e._valueTracker = an(e, t, "" + e[t]);
		}
	}
	function sn(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = rn(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var cn = /[\n"\\]/g;
	function ln(e) {
		return e.replace(cn, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function un(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + nn(t)) : e.value !== "" + nn(t) && (e.value = "" + nn(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : fn(e, nn(n)) : o === "number" && e.value == t ? fn(e, nn(e.value)) : fn(e, nn(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + nn(s) : e.removeAttribute("name");
	}
	function dn(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				on(e);
				return;
			}
			n = n == null ? "" : "" + nn(n), t = t == null ? n : "" + nn(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), on(e);
	}
	function fn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function P(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + nn(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function pn(e, t, n) {
		t != null && (t = "" + nn(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + nn(n);
	}
	function mn(e, t, n, r) {
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
		n = nn(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), on(e);
	}
	function hn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var gn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function _n(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || gn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function vn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", Zt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (_n(e, a, r), Zt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && _n(e, o, t[o]);
	}
	function yn(e) {
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
	var bn = /* @__PURE__ */ new Map([
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
	]), xn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Sn(e) {
		return xn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Cn() {}
	var wn = null;
	function Tn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var En = null, Dn = null;
	function On(e) {
		var t = zt(e);
		if (t && (e = t.stateNode)) {
			var n = e[At] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (un(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + ln("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[At] || null;
								if (!a) throw Error(i(90));
								un(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && sn(r);
					}
					break a;
				case "textarea":
					pn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && P(e, !!n.multiple, t, !1);
			}
		}
	}
	var kn = !1;
	function An(e, t, n) {
		if (kn) return e(t, n);
		kn = !0;
		try {
			return e(t);
		} finally {
			if (kn = !1, (En !== null || Dn !== null) && (Jd(), En && (t = En, e = Dn, Dn = En = null, On(t), e))) for (t = 0; t < e.length; t++) On(e[t]);
		}
	}
	function jn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[At] || null;
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
	var Mn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Nn = !1;
	if (Mn) try {
		var Pn = {};
		Object.defineProperty(Pn, "passive", { get: function() {
			Nn = !0;
		} }), window.addEventListener("test", Pn, Pn), window.removeEventListener("test", Pn, Pn);
	} catch {
		Nn = !1;
	}
	var Fn = null, In = null, Ln = null;
	function Rn() {
		if (Ln) return Ln;
		var e, t = In, n = t.length, r, i = "value" in Fn ? Fn.value : Fn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Ln = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function zn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Bn() {
		return !0;
	}
	function Vn() {
		return !1;
	}
	function Hn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Bn : Vn, this.isPropagationStopped = Vn, this;
		}
		return w(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Bn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Bn);
			},
			persist: function() {},
			isPersistent: Bn
		}), t;
	}
	var Un = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Wn = Hn(Un), Gn = w({}, Un, {
		view: 0,
		detail: 0
	}), Kn = Hn(Gn), qn, Jn, Yn, Xn = w({}, Gn, {
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
		getModifierState: sr,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Yn && (Yn && e.type === "mousemove" ? (qn = e.screenX - Yn.screenX, Jn = e.screenY - Yn.screenY) : Jn = qn = 0, Yn = e), qn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Jn;
		}
	}), Zn = Hn(Xn), Qn = Hn(w({}, Xn, { dataTransfer: 0 })), $n = Hn(w({}, Gn, { relatedTarget: 0 })), er = Hn(w({}, Un, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), tr = Hn(w({}, Un, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), nr = Hn(w({}, Un, { data: 0 })), rr = {
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
	}, ir = {
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
	}, ar = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function or(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = ar[e]) ? !!t[e] : !1;
	}
	function sr() {
		return or;
	}
	var cr = Hn(w({}, Gn, {
		key: function(e) {
			if (e.key) {
				var t = rr[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = zn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ir[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: sr,
		charCode: function(e) {
			return e.type === "keypress" ? zn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? zn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), lr = Hn(w({}, Xn, {
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
	})), ur = Hn(w({}, Un, { submitter: 0 })), dr = Hn(w({}, Gn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: sr
	})), fr = Hn(w({}, Un, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), pr = Hn(w({}, Xn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), mr = Hn(w({}, Un, {
		newState: 0,
		oldState: 0,
		source: 0
	})), hr = [
		9,
		13,
		27,
		32
	], gr = Mn && "CompositionEvent" in window, _r = null;
	Mn && "documentMode" in document && (_r = document.documentMode);
	var vr = Mn && "TextEvent" in window && !_r, yr = Mn && (!gr || _r && 8 < _r && 11 >= _r), br = " ", xr = !1;
	function Sr(e, t) {
		switch (e) {
			case "keyup": return hr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Cr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var wr = !1;
	function Tr(e, t) {
		switch (e) {
			case "compositionend": return Cr(t);
			case "keypress": return t.which === 32 ? (xr = !0, br) : null;
			case "textInput": return e = t.data, e === br && xr ? null : e;
			default: return null;
		}
	}
	function Er(e, t) {
		if (wr) return e === "compositionend" || !gr && Sr(e, t) ? (e = Rn(), Ln = In = Fn = null, wr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return yr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Dr = {
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
	function Or(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Dr[e.type] : t === "textarea";
	}
	function kr(e, t, n, r) {
		En ? Dn ? Dn.push(r) : Dn = [r] : En = r, t = ip(t, "onChange"), 0 < t.length && (n = new Wn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Ar = null, jr = null;
	function Mr(e) {
		Zf(e, 0);
	}
	function Nr(e) {
		if (sn(Bt(e))) return e;
	}
	function Pr(e, t) {
		if (e === "change") return t;
	}
	var Fr = !1;
	if (Mn) {
		var Ir;
		if (Mn) {
			var Lr = "oninput" in document;
			if (!Lr) {
				var Rr = document.createElement("div");
				Rr.setAttribute("oninput", "return;"), Lr = typeof Rr.oninput == "function";
			}
			Ir = Lr;
		} else Ir = !1;
		Fr = Ir && (!document.documentMode || 9 < document.documentMode);
	}
	function zr() {
		Ar && (Ar.detachEvent("onpropertychange", Br), jr = Ar = null);
	}
	function Br(e) {
		if (e.propertyName === "value" && Nr(jr)) {
			var t = [];
			kr(t, jr, e, Tn(e)), An(Mr, t);
		}
	}
	function Vr(e, t, n) {
		e === "focusin" ? (zr(), Ar = t, jr = n, Ar.attachEvent("onpropertychange", Br)) : e === "focusout" && zr();
	}
	function Hr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Nr(jr);
	}
	function Ur(e, t) {
		if (e === "click") return Nr(t);
	}
	function Wr(e, t) {
		if (e === "input" || e === "change") return Nr(t);
	}
	function Gr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Kr = typeof Object.is == "function" ? Object.is : Gr;
	function qr(e, t) {
		if (Kr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ue.call(t, i) || !Kr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Jr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Yr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Xr(e, t) {
		var n = Yr(e);
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
			n = Yr(n);
		}
	}
	function Zr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Qr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Jr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Jr(e.document);
		}
		return t;
	}
	function $r(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var ei = Mn && "documentMode" in document && 11 >= document.documentMode, ti = null, ni = null, ri = null, ii = !1;
	function ai(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		ii || ti == null || ti !== Jr(r) || (r = ti, "selectionStart" in r && $r(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ri && qr(ri, r) || (ri = r, r = ip(ni, "onSelect"), 0 < r.length && (t = new Wn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = ti)));
	}
	function oi(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var si = {
		animationend: oi("Animation", "AnimationEnd"),
		animationiteration: oi("Animation", "AnimationIteration"),
		animationstart: oi("Animation", "AnimationStart"),
		transitionrun: oi("Transition", "TransitionRun"),
		transitionstart: oi("Transition", "TransitionStart"),
		transitioncancel: oi("Transition", "TransitionCancel"),
		transitionend: oi("Transition", "TransitionEnd")
	}, ci = {}, li = {};
	Mn && (li = document.createElement("div").style, "AnimationEvent" in window || (delete si.animationend.animation, delete si.animationiteration.animation, delete si.animationstart.animation), "TransitionEvent" in window || delete si.transitionend.transition);
	function ui(e) {
		if (ci[e]) return ci[e];
		if (!si[e]) return e;
		var t = si[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in li) return ci[e] = t[n];
		return e;
	}
	var di = ui("animationend"), fi = ui("animationiteration"), pi = ui("animationstart"), mi = ui("transitionrun"), hi = ui("transitionstart"), gi = ui("transitioncancel"), _i = ui("transitionend"), vi = /* @__PURE__ */ new Map(), yi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	yi.push("scrollEnd");
	function bi(e, t) {
		vi.set(e, t), Gt(t, [e]);
	}
	var xi = 0;
	function Si(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = kd.identifierPrefix;
		var n = xi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function Ci(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Ld;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function wi(e, t) {
		return e = Ci(e), t = Ci(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var Ti = typeof reportError == "function" ? reportError : function(e) {
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
	}, Ei = [], Di = 0, Oi = 0;
	function ki() {
		for (var e = Di, t = Oi = Di = 0; t < e;) {
			var n = Ei[t];
			Ei[t++] = null;
			var r = Ei[t];
			Ei[t++] = null;
			var i = Ei[t];
			Ei[t++] = null;
			var a = Ei[t];
			if (Ei[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Ni(n, i, a);
		}
	}
	function Ai(e, t, n, r) {
		Ei[Di++] = e, Ei[Di++] = t, Ei[Di++] = n, Ei[Di++] = r, Oi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ji(e, t, n, r) {
		return Ai(e, t, n, r), Pi(e);
	}
	function Mi(e, t) {
		return Ai(e, null, null, t), Pi(e);
	}
	function Ni(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - ot(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Pi(e) {
		if (50 < Rd) throw Rd = 0, zd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Fi = {};
	function Ii(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Li(e, t, n, r) {
		return new Ii(e, t, n, r);
	}
	function Ri(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function zi(e, t) {
		var n = e.alternate;
		return n === null ? (n = Li(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Bi(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Vi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Ri(r) && (s = 1);
		else if (typeof r == "string") s = nh(e, n, k.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case D: return e = Li(31, n, t, a), e.elementType = D, e.lanes = o, e;
			case ae: return Hi(n.children, a, o, t);
			case oe:
				s = 8, a |= 24;
				break;
			case se: return e = Li(12, n, t, a | 2), e.elementType = se, e.lanes = o, e;
			case ue: return e = Li(13, n, t, a), e.elementType = ue, e.lanes = o, e;
			case de: return e = Li(19, n, t, a), e.elementType = de, e.lanes = o, e;
			case me:
			case ge: return e = a | 32, e = Li(30, n, t, e), e.elementType = ge, e.lanes = o, e.stateNode = {
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
		return t = Li(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Hi(e, t, n, r) {
		return e = Li(7, e, r, t), e.lanes = n, e;
	}
	function Ui(e, t, n) {
		return e = Li(6, e, null, t), e.lanes = n, e;
	}
	function Wi(e) {
		var t = Li(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Gi(e, t, n) {
		return t = Li(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ki = /* @__PURE__ */ new WeakMap();
	function qi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ki.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: He(t)
			}, Ki.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: He(t)
		};
	}
	var Ji = [], Yi = 0, Xi = null, Zi = 0, Qi = [], $i = 0, ea = null, ta = 1, na = "";
	function ra(e, t) {
		Ji[Yi++] = Zi, Ji[Yi++] = Xi, Xi = e, Zi = t;
	}
	function ia(e, t, n) {
		Qi[$i++] = ta, Qi[$i++] = na, Qi[$i++] = ea, ea = e;
		var r = ta;
		e = na;
		var i = 32 - ot(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - ot(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ta = 1 << 32 - ot(t) + i | n << i | r, na = a + e;
		} else ta = 1 << a | n << i | r, na = e;
	}
	function aa(e) {
		e.return !== null && (ra(e, 1), ia(e, 1, 0));
	}
	function oa(e) {
		for (; e === Xi;) Xi = Ji[--Yi], Ji[Yi] = null, Zi = Ji[--Yi], Ji[Yi] = null;
		for (; e === ea;) ea = Qi[--$i], Qi[$i] = null, na = Qi[--$i], Qi[$i] = null, ta = Qi[--$i], Qi[$i] = null;
	}
	function sa(e, t) {
		Qi[$i++] = ta, Qi[$i++] = na, Qi[$i++] = ea, ta = t.id, na = t.overflow, ea = e;
	}
	var ca = null, la = null, F = !1, ua = null, da = !1, fa = Error(i(519));
	function pa(e) {
		throw ya(qi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), fa;
	}
	function ma(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[kt] = e, t[At] = r, n) {
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
				for (n = 0; n < Yf.length; n++) H(Yf[n], t);
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
				H("invalid", t), dn(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				H("invalid", t);
				break;
			case "textarea": H("invalid", t), mn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || up(t.textContent, n) ? (r.popover != null && (H("beforetoggle", t), H("toggle", t)), r.onScroll != null && H("scroll", t), r.onScrollEnd != null && H("scrollend", t), r.onClick != null && (t.onclick = Cn), t = !0) : t = !1, t || pa(e, !0);
	}
	function ha(e) {
		for (ca = e.return; ca;) switch (ca.tag) {
			case 5:
			case 31:
			case 13:
				da = !1;
				return;
			case 27:
			case 3:
				da = !0;
				return;
			default: ca = ca.return;
		}
	}
	function ga(e) {
		if (e !== ca) return !1;
		if (!F) return ha(e), F = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || wp(e.type, e.memoizedProps)), n = !n), n && la && pa(e), ha(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			la = U(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			la = U(e);
		} else t === 27 ? (t = la, Np(e.type) ? (e = xm, xm = null, la = e) : la = t) : la = ca ? bm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function _a() {
		la = ca = null, F = !1;
	}
	function va() {
		var e = ua;
		return e !== null && (xd === null ? xd = e : xd.push.apply(xd, e), ua = null), e;
	}
	function ya(e) {
		ua === null ? ua = [e] : ua.push(e);
	}
	var ba = De(null), xa = null, Sa = null;
	function Ca(e, t, n) {
		ke(ba, t._currentValue), t._currentValue = n;
	}
	function wa(e) {
		e._currentValue = ba.current, Oe(ba);
	}
	function Ta(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ea(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ta(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ta(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Ta(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
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
	function Da(e, t, n, r) {
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
					Kr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === A.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [gh] : e.push(gh));
			}
			a = a.return;
		}
		return e !== null && Ea(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function Oa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Kr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ka(e) {
		xa = e, Sa = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Aa(e) {
		return Ma(xa, e);
	}
	function ja(e, t) {
		return xa === null && ka(e), Ma(e, t);
	}
	function Ma(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Sa === null) {
			if (e === null) throw Error(i(308));
			Sa = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Sa = Sa.next = t;
		return n;
	}
	var Na = typeof AbortController < "u" ? AbortController : function() {
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
	}, Pa = t.unstable_scheduleCallback, Fa = t.unstable_NormalPriority, I = {
		$$typeof: le,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function L() {
		return {
			controller: new Na(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ia(e) {
		e.refCount--, e.refCount === 0 && Pa(Fa, function() {
			e.controller.abort();
		});
	}
	function La(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Ra = null;
	function za(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var Ba = null, Va = 0, Ha = 0, Ua = null;
	function Wa(e, t) {
		if (Ba === null) {
			var n = Ba = [];
			Va = 0, Ha = Wf(), Ua = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Va++, t.then(Ga, Ga), t;
	}
	function Ga() {
		if (--Va === 0 && (Ra = null, Ba !== null)) {
			Ua !== null && (Ua.status = "fulfilled");
			var e = Ba;
			Ba = null, Ha = 0, Ua = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ka(e, t) {
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
	var qa = O.S;
	O.S = function(e, t) {
		if (wd = Je(), typeof t == "object" && t && typeof t.then == "function" && Wa(e, t), Ra !== null) for (var n = Af; n !== null;) La(n, Ra), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = Af; r !== null;) La(r, n), r = r.next;
			if (Ha !== 0) {
				r = Ra, r === null && (r = Ra = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		qa !== null && qa(e, t);
	};
	var Ja = De(null);
	function Ya() {
		var e = Ja.current;
		return e === null ? sd.pooledCache : e;
	}
	function Xa(e, t) {
		t === null ? ke(Ja, Ja.current) : ke(Ja, t.pool);
	}
	function Za() {
		var e = Ya();
		return e === null ? null : {
			parent: I._currentValue,
			pool: e
		};
	}
	var Qa = Error(i(460)), $a = Error(i(474)), eo = Error(i(542)), to = { then: function() {} };
	function no(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ro(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Cn, Cn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, so(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(Cn, Cn);
				else {
					if (e = sd, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, so(e), e;
				}
				throw ao = t, Qa;
		}
	}
	function io(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ao = e, Qa) : e;
		}
	}
	var ao = null;
	function oo() {
		if (ao === null) throw Error(i(459));
		var e = ao;
		return ao = null, e;
	}
	function so(e) {
		if (e === Qa || e === eo) throw Error(i(483));
	}
	var co = null, lo = 0;
	function uo(e) {
		var t = lo;
		return lo += 1, co === null && (co = []), ro(co, e, t);
	}
	function fo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function po(e, t) {
		throw t.$$typeof === T ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function mo(e) {
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
			return e = zi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ui(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === ae ? (e = d(e, t, n.props.children, r, n.key), fo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === pe && io(i) === t.type) ? (t = a(t, n.props), fo(t, n), t.return = e, t) : (t = Vi(n.type, n.key, n.props, null, e.mode, r), fo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Gi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Hi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ui("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case re: return n = Vi(t.type, t.key, t.props, null, e.mode, n), fo(n, t), n.return = e, n;
					case ie: return t = Gi(t, e.mode, n), t.return = e, t;
					case pe: return t = io(t), f(e, t, n);
				}
				if (Se(t) || ye(t)) return t = Hi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, uo(t), n);
				if (t.$$typeof === le) return f(e, ja(e, t), n);
				po(e, t);
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
					case pe: return n = io(n), p(e, t, n, r);
				}
				if (Se(n) || ye(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, uo(n), r);
				if (n.$$typeof === le) return p(e, t, ja(e, n), r);
				po(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case re: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case ie: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case pe: return r = io(r), m(e, t, n, r, i);
				}
				if (Se(r) || ye(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, uo(r), i);
				if (r.$$typeof === le) return m(e, t, n, ja(t, r), i);
				po(t, r);
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
			if (h === s.length) return n(i, d), F && ra(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return F && ra(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), F && ra(i, h), l;
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
			if (v.done) return n(a, h), F && ra(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return F && ra(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), F && ra(a, g), u;
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
											n(e, r.sibling), c = a(r, o.props.children), fo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === pe && io(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), fo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === ae ? (c = Hi(o.props.children, e.mode, c, o.key), fo(c, o), c.return = e, e = c) : (c = Vi(o.type, o.key, o.props, null, e.mode, c), fo(c, o), c.return = e, e = c);
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
							c = Gi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case pe: return o = io(o), _(e, r, o, c);
				}
				if (Se(o)) return h(e, r, o, c);
				if (ye(o)) {
					if (l = ye(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, uo(o), c);
				if (o.$$typeof === le) return _(e, r, ja(e, o), c);
				po(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ui(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				lo = 0;
				var i = _(e, t, n, r);
				return co = null, i;
			} catch (t) {
				if (t === Qa || t === eo) throw t;
				var a = Li(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ho = mo(!0), go = mo(!1), _o = !1;
	function vo(e) {
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
	function yo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function bo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function xo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, od & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Pi(e), Ni(e, null, n), t;
		}
		return Ai(e, r, t, n), Pi(e);
	}
	function So(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ct(e, n);
		}
	}
	function Co(e, t) {
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
	var wo = !1;
	function To() {
		if (wo) {
			var e = Ua;
			if (e !== null) throw e;
		}
	}
	function Eo(e, t, n, r) {
		wo = !1;
		var i = e.updateQueue;
		_o = !1;
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
				if (p ? (B & f) === f : (r & f) === f) {
					f !== 0 && f === Ha && (wo = !0), u !== null && (u = u.next = {
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
							case 2: _o = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), hd |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Do(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Oo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Do(n[e], t);
	}
	var ko = De(null), Ao = De(0);
	function jo(e, t) {
		e = pd, ke(Ao, e), ke(ko, t), pd = e | t.baseLanes;
	}
	function Mo() {
		ke(Ao, pd), ke(ko, ko.current);
	}
	function No() {
		pd = Ao.current, Oe(ko), Oe(Ao);
	}
	var Po = De(null), Fo = null;
	function Io(e) {
		var t = e.alternate;
		ke(Vo, Vo.current & 1), ke(Po, e), Fo === null && (t === null || ko.current !== null || t.memoizedState !== null) && (Fo = e);
	}
	function Lo(e) {
		ke(Vo, Vo.current), ke(Po, e), Fo === null && (Fo = e);
	}
	function Ro(e) {
		e.tag === 22 ? (ke(Vo, Vo.current), ke(Po, e), Fo === null && (Fo = e)) : zo();
	}
	function zo() {
		ke(Vo, Vo.current), ke(Po, Po.current);
	}
	function Bo(e) {
		Oe(Po), Fo === e && (Fo = null), Oe(Vo);
	}
	var Vo = De(0);
	function Ho(e, t) {
		ke(Po, Po.current), ke(Vo, t);
	}
	function Uo(e) {
		Oe(Vo), Oe(Po), Fo === e && (Fo = null);
	}
	function Wo(e) {
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
	var Go = 0, R = null, Ko = null, qo = null, Jo = !1, Yo = !1, Xo = !1, Zo = 0, Qo = 0, $o = null, es = 0;
	function ts() {
		throw Error(i(321));
	}
	function ns(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Kr(e[n], t[n])) return !1;
		return !0;
	}
	function rs(e, t, n, r, i, a) {
		return Go = a, R = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? bc : xc, Xo = !1, a = n(r, i), Xo = !1, Yo && (a = as(t, n, r, i)), is(e), a;
	}
	function is(e) {
		O.H = yc;
		var t = Ko !== null && Ko.next !== null;
		if (Go = 0, qo = Ko = R = null, Jo = !1, Qo = 0, $o = null, t) throw Error(i(300));
		e === null || Rc || (e = e.dependencies, e !== null && Oa(e) && (Rc = !0));
	}
	function as(e, t, n, r) {
		R = e;
		var a = 0;
		do {
			if (Yo && ($o = null), Qo = 0, Yo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, qo = Ko = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			O.H = Sc, o = t(n, r);
		} while (Yo);
		return o;
	}
	function os() {
		var e = O.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ps(t) : t, e = e.useState()[0], (Ko === null ? null : Ko.memoizedState) !== e && (R.flags |= 1024), t;
	}
	function ss() {
		var e = Zo !== 0;
		return Zo = 0, e;
	}
	function cs(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function ls(e) {
		if (Jo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Jo = !1;
		}
		Go = 0, qo = Ko = R = null, Yo = !1, Qo = Zo = 0, $o = null;
	}
	function us() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return qo === null ? R.memoizedState = qo = e : qo = qo.next = e, qo;
	}
	function ds() {
		if (Ko === null) {
			var e = R.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Ko.next;
		var t = qo === null ? R.memoizedState : qo.next;
		if (t !== null) qo = t, Ko = e;
		else {
			if (e === null) throw R.alternate === null ? Error(i(467)) : Error(i(310));
			Ko = e, e = {
				memoizedState: Ko.memoizedState,
				baseState: Ko.baseState,
				baseQueue: Ko.baseQueue,
				queue: Ko.queue,
				next: null
			}, qo === null ? R.memoizedState = qo = e : qo = qo.next = e;
		}
		return qo;
	}
	function fs() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ps(e) {
		var t = Qo;
		return Qo += 1, $o === null && ($o = []), e = ro($o, e, t), t = R, (qo === null ? t.memoizedState : qo.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? bc : xc), e;
	}
	function ms(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ps(e);
			if (e.$$typeof === _e) return;
			if (e.$$typeof === le) return Aa(e);
		}
		throw Error(i(438, String(e)));
	}
	function hs(e) {
		var t = null, n = R.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = R.alternate;
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
		}, n === null && (n = fs(), R.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = he;
		return t.index++, n;
	}
	function gs(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function _s(e) {
		return vs(ds(), Ko, e);
	}
	function vs(e, t, n) {
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
				if (f === u.lane ? (Go & f) === f : (B & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Ha && (d = !0);
					else if ((Go & p) === p) {
						u = u.next, p === Ha && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, R.lanes |= p, hd |= p;
					f = u.action, Xo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, R.lanes |= f, hd |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Kr(o, e.memoizedState) && (Rc = !0, d && (n = Ua, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function ys(e) {
		var t = ds(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Kr(o, t.memoizedState) || (Rc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function bs(e, t, n) {
		var r = R, a = ds(), o = F;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Kr((Ko || a).memoizedState, n);
		if (s && (a.memoizedState = n, Rc = !0), a = a.queue, Gs(Cs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || qo !== null && !!(qo.memoizedState.tag & 1), Bs(e ? 9 : 8, { destroy: void 0 }, Ss.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, sd === null) throw Error(i(349));
			o || Go & 127 || xs(r, t, n);
		}
		return n;
	}
	function xs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = R.updateQueue, t === null ? (t = fs(), R.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ss(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ws(t) && Ts(e);
	}
	function Cs(e, t, n) {
		return n(function() {
			ws(t) && Ts(e);
		});
	}
	function ws(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Kr(e, n);
		} catch {
			return !0;
		}
	}
	function Ts(e) {
		var t = Mi(e, 2);
		t !== null && Ud(t, e, 2);
	}
	function Es(e) {
		var t = us();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Xo) {
				at(!0);
				try {
					n();
				} finally {
					at(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: gs,
			lastRenderedState: e
		}, t;
	}
	function Ds(e, t, n, r) {
		return e.baseState = n, vs(e, Ko, typeof r == "function" ? r : gs);
	}
	function Os(e, t, n, r, a) {
		if (gc(e)) throw Error(i(485));
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
			O.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, ks(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function ks(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = O.T, o = {};
			o.types = a === null ? null : a.types, O.T = o;
			try {
				var s = n(i, r), c = O.S;
				c !== null && c(o, s), As(e, t, s);
			} catch (n) {
				Ms(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), O.T = a;
			}
		} else try {
			a = n(i, r), As(e, t, a);
		} catch (n) {
			Ms(e, t, n);
		}
	}
	function As(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			js(e, t, n);
		}, function(n) {
			return Ms(e, t, n);
		}) : js(e, t, n);
	}
	function js(e, t, n) {
		t.status = "fulfilled", t.value = n, Ns(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ks(e, n)));
	}
	function Ms(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ns(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ns(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ps(e, t) {
		return t;
	}
	function Fs(e, t) {
		if (F) {
			var n = sd.formState;
			if (n !== null) {
				a: {
					var r = R;
					if (F) {
						if (la) {
							b: {
								for (var i = la, a = da; i.nodeType !== 8;) if (!a || (i = bm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								la = bm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						pa(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = us(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ps,
			lastRenderedState: t
		}, n.queue = r, n = pc.bind(null, R, r), r.dispatch = n, r = Es(!1), a = hc.bind(null, R, !1, r.queue), r = us(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Os.bind(null, R, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Is(e) {
		return Ls(ds(), Ko, e);
	}
	function Ls(e, t, n) {
		if (t = vs(e, t, Ps)[0], e = _s(gs)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ps(t);
		} catch (e) {
			throw e === Qa ? eo : e;
		}
		else r = t;
		t = ds();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (R.flags |= 2048, Bs(9, { destroy: void 0 }, Rs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Rs(e, t) {
		e.action = t;
	}
	function zs(e) {
		var t = ds(), n = Ko;
		if (n !== null) return Ls(t, n, e);
		ds(), t = t.memoizedState, n = ds();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Bs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = R.updateQueue, t === null && (t = fs(), R.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Vs() {
		return ds().memoizedState;
	}
	function Hs(e, t, n, r) {
		var i = us();
		R.flags |= e, i.memoizedState = Bs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Us(e, t, n, r) {
		var i = ds();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Ko !== null && r !== null && ns(r, Ko.memoizedState.deps) ? i.memoizedState = Bs(t, a, n, r) : (R.flags |= e, i.memoizedState = Bs(1 | t, a, n, r));
	}
	function Ws(e, t) {
		Hs(8390656, 8, e, t);
	}
	function Gs(e, t) {
		Us(2048, 8, e, t);
	}
	function Ks(e) {
		R.flags |= 4;
		var t = R.updateQueue;
		if (t === null) t = fs(), R.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function qs(e) {
		var t = ds().memoizedState;
		return Ks({
			ref: t,
			nextImpl: e
		}), function() {
			if (od & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Js(e, t) {
		return Us(4, 2, e, t);
	}
	function Ys(e, t) {
		return Us(4, 4, e, t);
	}
	function Xs(e, t) {
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
	function Zs(e, t, n) {
		n = n == null ? null : n.concat([e]), Us(4, 4, Xs.bind(null, t, e), n);
	}
	function Qs() {}
	function $s(e, t) {
		var n = ds();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && ns(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ec(e, t) {
		var n = ds();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && ns(t, r[1])) return r[0];
		if (r = e(), Xo) {
			at(!0);
			try {
				e();
			} finally {
				at(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function tc(e, t, n) {
		return n === void 0 || Go & 1073741824 && !(B & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Vd(), R.lanes |= e, hd |= e, n);
	}
	function nc(e, t, n, r) {
		return Kr(n, t) ? n : ko.current === null ? !(Go & 106) || Go & 1073741824 && !(B & 261930) ? (Rc = !0, e.memoizedState = n) : (e = Vd(), R.lanes |= e, hd |= e, t) : (e = tc(e, n, r), Kr(e, t) || (Rc = !0), e);
	}
	function rc(e, t, n, r, i) {
		var a = Ce.p;
		Ce.p = a !== 0 && 8 > a ? a : 8;
		var o = O.T, s = {};
		s.types = o === null ? null : o.types, O.T = s, hc(e, !1, t, n);
		try {
			var c = i(), l = O.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? mc(e, t, Ka(c, r), Bd(e)) : mc(e, t, r, Bd(e));
		} catch (n) {
			mc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Bd());
		} finally {
			Ce.p = a, o !== null && s.types !== null && (o.types = s.types), O.T = o;
		}
	}
	function ic() {}
	function ac(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = oc(e).queue;
		rc(e, a, t, we, n === null ? ic : function() {
			return sc(e), n(r);
		});
	}
	function oc(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: we,
			baseState: we,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: gs,
				lastRenderedState: we
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
				lastRenderedReducer: gs,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function sc(e) {
		var t = oc(e);
		t.next === null && (t = e.alternate.memoizedState), mc(e, t.next.queue, {}, Bd());
	}
	function cc() {
		return Aa(gh);
	}
	function lc() {
		return ds().memoizedState;
	}
	function uc() {
		return ds().memoizedState;
	}
	function dc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Bd();
					e = bo(n);
					var r = xo(t, e, n);
					r !== null && (Ud(r, t, n), So(r, t, n)), t = { cache: L() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function fc(e, t, n) {
		var r = Bd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, gc(e) ? _c(t, n) : (n = ji(e, t, n, r), n !== null && (Ud(n, e, r), vc(n, t, r)));
	}
	function pc(e, t, n) {
		mc(e, t, n, Bd());
	}
	function mc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (gc(e)) _c(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Kr(s, o)) return Ai(e, t, i, 0), sd === null && ki(), !1;
			} catch {}
			if (n = ji(e, t, i, r), n !== null) return Ud(n, e, r), vc(n, t, r), !0;
		}
		return !1;
	}
	function hc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Wf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, gc(e)) {
			if (t) throw Error(i(479));
		} else t = ji(e, n, r, 2), t !== null && Ud(t, e, 2);
	}
	function gc(e) {
		var t = e.alternate;
		return e === R || t !== null && t === R;
	}
	function _c(e, t) {
		Yo = Jo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function vc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ct(e, n);
		}
	}
	var yc = {
		readContext: Aa,
		use: ms,
		useCallback: ts,
		useContext: ts,
		useEffect: ts,
		useImperativeHandle: ts,
		useLayoutEffect: ts,
		useInsertionEffect: ts,
		useMemo: ts,
		useReducer: ts,
		useRef: ts,
		useState: ts,
		useDebugValue: ts,
		useDeferredValue: ts,
		useTransition: ts,
		useSyncExternalStore: ts,
		useId: ts,
		useHostTransitionStatus: ts,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: ts,
		useMemoCache: ts,
		useCacheRefresh: ts,
		useEffectEvent: ts
	}, bc = {
		readContext: Aa,
		use: ms,
		useCallback: function(e, t) {
			return us().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Aa,
		useEffect: Ws,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Hs(4194308, 4, Xs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Hs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Hs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = us();
			t = t === void 0 ? null : t;
			var r = e();
			if (Xo) {
				at(!0);
				try {
					e();
				} finally {
					at(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = us();
			if (n !== void 0) {
				var i = n(t);
				if (Xo) {
					at(!0);
					try {
						n(t);
					} finally {
						at(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = fc.bind(null, R, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = us();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Es(e);
			var t = e.queue, n = pc.bind(null, R, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Qs,
		useDeferredValue: function(e, t) {
			return tc(us(), e, t);
		},
		useTransition: function() {
			var e = Es(!1);
			return e = rc.bind(null, R, e.queue, !0, !1), us().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = R, a = us();
			if (F) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), sd === null) throw Error(i(349));
				B & 127 || xs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Ws(Cs.bind(null, r, o, e), [e]), r.flags |= 2048, Bs(9, { destroy: void 0 }, Ss.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = us(), t = sd.identifierPrefix;
			if (F) {
				var n = na, r = ta;
				n = (r & ~(1 << 32 - ot(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Zo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = es++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: cc,
		useFormState: Fs,
		useActionState: Fs,
		useOptimistic: function(e) {
			var t = us();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = hc.bind(null, R, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: hs,
		useCacheRefresh: function() {
			return us().memoizedState = dc.bind(null, R);
		},
		useEffectEvent: function(e) {
			var t = us(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (od & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, xc = {
		readContext: Aa,
		use: ms,
		useCallback: $s,
		useContext: Aa,
		useEffect: Gs,
		useImperativeHandle: Zs,
		useInsertionEffect: Js,
		useLayoutEffect: Ys,
		useMemo: ec,
		useReducer: _s,
		useRef: Vs,
		useState: function() {
			return _s(gs);
		},
		useDebugValue: Qs,
		useDeferredValue: function(e, t) {
			return nc(ds(), Ko.memoizedState, e, t);
		},
		useTransition: function() {
			var e = _s(gs)[0], t = ds().memoizedState;
			return [typeof e == "boolean" ? e : ps(e), t];
		},
		useSyncExternalStore: bs,
		useId: lc,
		useHostTransitionStatus: cc,
		useFormState: Is,
		useActionState: Is,
		useOptimistic: function(e, t) {
			return Ds(ds(), Ko, e, t);
		},
		useMemoCache: hs,
		useCacheRefresh: uc,
		useEffectEvent: qs
	}, Sc = {
		readContext: Aa,
		use: ms,
		useCallback: $s,
		useContext: Aa,
		useEffect: Gs,
		useImperativeHandle: Zs,
		useInsertionEffect: Js,
		useLayoutEffect: Ys,
		useMemo: ec,
		useReducer: ys,
		useRef: Vs,
		useState: function() {
			return ys(gs);
		},
		useDebugValue: Qs,
		useDeferredValue: function(e, t) {
			var n = ds();
			return Ko === null ? tc(n, e, t) : nc(n, Ko.memoizedState, e, t);
		},
		useTransition: function() {
			var e = ys(gs)[0], t = ds().memoizedState;
			return [typeof e == "boolean" ? e : ps(e), t];
		},
		useSyncExternalStore: bs,
		useId: lc,
		useHostTransitionStatus: cc,
		useFormState: zs,
		useActionState: zs,
		useOptimistic: function(e, t) {
			var n = ds();
			return Ko === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ds(n, Ko, e, t);
		},
		useMemoCache: hs,
		useCacheRefresh: uc,
		useEffectEvent: qs
	};
	function Cc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : w({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var wc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Bd(), i = bo(r);
			i.payload = t, n != null && (i.callback = n), t = xo(e, i, r), t !== null && (Ud(t, e, r), So(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Bd(), i = bo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = xo(e, i, r), t !== null && (Ud(t, e, r), So(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Bd(), r = bo(n);
			r.tag = 2, t != null && (r.callback = t), t = xo(e, r, n), t !== null && (Ud(t, e, n), So(t, e, n));
		}
	};
	function Tc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !qr(n, r) || !qr(i, a) : !0;
	}
	function Ec(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && wc.enqueueReplaceState(t, t.state, null);
	}
	function Dc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = w({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Oc(e) {
		Ti(e);
	}
	function kc(e) {
		console.error(e);
	}
	function Ac(e) {
		Ti(e);
	}
	function jc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Mc(e, t, n) {
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
	function Nc(e, t, n) {
		return n = bo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			jc(e, t);
		}, n;
	}
	function Pc(e) {
		return e = bo(e), e.tag = 3, e;
	}
	function Fc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Mc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Mc(t, n, r), typeof i != "function" && (Dd === null ? Dd = /* @__PURE__ */ new Set([this]) : Dd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Ic(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Da(t, n, a, !0), n = Po.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Fo === null ? tf() : n.alternate === null && md === 0 && (md = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === to ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), wf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === to ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), wf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return wf(e, r, a), tf(), !1;
		}
		if (F) return t = Po.current, t === null ? (r !== fa && (t = Error(i(423), { cause: r }), ya(qi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = qi(r, n), a = Nc(e.stateNode, r, a), Co(e, a), md !== 4 && (md = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== fa && (e = Error(i(422), { cause: r }), ya(qi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = qi(o, n), bd === null ? bd = [o] : bd.push(o), md !== 4 && (md = 2), t === null) return !0;
		r = qi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Nc(n.stateNode, r, e), Co(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (Dd === null || !Dd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Pc(a), Fc(a, e, n, r), Co(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Lc = Error(i(461)), Rc = !1;
	function zc(e, t, n, r) {
		t.child = e === null ? go(t, null, n, r) : ho(t, e.child, n, r);
	}
	function Bc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ka(t), r = rs(e, t, n, o, a, i), s = ss(), e !== null && !Rc ? (cs(e, t, i), ml(e, t, i)) : (F && s && aa(t), t.flags |= 1, zc(e, t, r, i), t.child);
	}
	function Vc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Ri(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Hc(e, t, a, r, i)) : (e = Vi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !hl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? qr : n, n(o, r) && e.ref === t.ref) return ml(e, t, i);
		}
		return t.flags |= 1, e = zi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Hc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (qr(a, r) && e.ref === t.ref) {
				if (Rc = !1, t.pendingProps = r = a, hl(e, i)) e.flags & 131072 && (Rc = !0);
				else return t.lanes = e.lanes, ml(e, t, i);
			}
		}
		return Xc(e, t, n, r, i);
	}
	function Uc(e, t, n, r) {
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
				return Gc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Xa(t, a === null ? null : a.cachePool), a === null ? Mo() : jo(t, a), Ro(t);
			else return r = t.lanes = 536870912, Gc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Xa(t, null), Mo(), zo()) : (Xa(t, a.cachePool), jo(t, a), zo(), t.memoizedState = null);
		return zc(e, t, i, n), t.child;
	}
	function Wc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Gc(e, t, n, r, i) {
		var a = Ya();
		return a = a === null ? null : {
			parent: I._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Xa(t, null), Mo(), Ro(t), e !== null && Da(e, t, r, !0), t.childLanes = i, null;
	}
	function Kc(e, t) {
		return t = al({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function qc(e, t, n) {
		return ho(t, e.child, null, n), e = Kc(t, t.pendingProps), e.flags |= 2, Bo(t), t.memoizedState = null, e;
	}
	function Jc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (F) {
				if (r.mode === "hidden") return e = Kc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Wc(null, e);
				if (Lo(t), (e = la) ? (e = gm(e, da), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ea === null ? null : {
						id: ta,
						overflow: na
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Wi(e), n.return = t, t.child = n, ca = t, la = null)) : e = null, e === null) throw pa(t);
				return t.lanes = 536870912, null;
			}
			return Kc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Lo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = qc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Rc || Da(e, t, n, !1), a = (n & e.childLanes) !== 0, Rc || a) {
				if (ko.current === null) {
					if (r = sd, r !== null && (s = wt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Mi(e, s), Ud(r, e, s), Lc;
					tf();
				}
				t = qc(e, t, n);
			} else e = o.treeContext, la = bm(s.nextSibling), ca = t, F = !0, ua = null, da = !1, e !== null && sa(t, e), t = Kc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = zi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Yc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Xc(e, t, n, r, i) {
		return ka(t), n = rs(e, t, n, r, void 0, i), r = ss(), e !== null && !Rc ? (cs(e, t, i), ml(e, t, i)) : (F && r && aa(t), t.flags |= 1, zc(e, t, n, i), t.child);
	}
	function Zc(e, t, n, r, i, a) {
		return ka(t), t.updateQueue = null, n = as(t, r, n, i), is(e), r = ss(), e !== null && !Rc ? (cs(e, t, a), ml(e, t, a)) : (F && r && aa(t), t.flags |= 1, zc(e, t, n, a), t.child);
	}
	function Qc(e, t, n, r, i) {
		if (ka(t), t.stateNode === null) {
			var a = Fi, o = n.contextType;
			typeof o == "object" && o && (a = Aa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = wc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, vo(t), o = n.contextType, a.context = typeof o == "object" && o ? Aa(o) : Fi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Cc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && wc.enqueueReplaceState(a, a.state, null), Eo(t, r, a, i), To(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Dc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Fi, typeof u == "object" && u && (o = Aa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ec(t, a, r, o), _o = !1;
			var f = t.memoizedState;
			a.state = f, Eo(t, r, a, i), To(), l = t.memoizedState, s || f !== l || _o ? (typeof d == "function" && (Cc(t, n, d, r), l = t.memoizedState), (c = _o || Tc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, yo(e, t), o = t.memoizedProps, u = Dc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Fi, typeof l == "object" && l && (c = Aa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ec(t, a, r, c), _o = !1, f = t.memoizedState, a.state = f, Eo(t, r, a, i), To();
			var p = t.memoizedState;
			o !== d || f !== p || _o || e !== null && e.dependencies !== null && Oa(e.dependencies) ? (typeof s == "function" && (Cc(t, n, s, r), p = t.memoizedState), (u = _o || Tc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Oa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Yc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ho(t, e.child, null, i), t.child = ho(t, null, n, i)) : zc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = ml(e, t, i), e;
	}
	function $c(e, t, n, r) {
		return _a(), t.flags |= 256, zc(e, t, n, r), t.child;
	}
	var el = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function tl(e) {
		return {
			baseLanes: e,
			cachePool: Za()
		};
	}
	function nl(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= vd), e;
	}
	function rl(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Vo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (F) {
				if (i ? Io(t) : zo(), (e = la) ? (e = gm(e, da), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ea === null ? null : {
						id: ta,
						overflow: na
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Wi(e), n.return = t, t.child = n, ca = t, la = null)) : e = null, e === null) throw pa(t);
				return t.lanes = vm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (zo(), i = t.mode, a = al({
				mode: "hidden",
				children: a
			}, i), r = Hi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = tl(n), r.childLanes = nl(e, o, n), t.memoizedState = el, Wc(null, r)) : (Io(t), il(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return sl(e, t, a, o, r, c, s, n);
		}
		return i ? (zo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = zi(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = Hi(i, a, n, null), i.flags |= 2) : i = zi(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Wc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = tl(n) : (a = i.cachePool, a === null ? a = Za() : (s = I._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = nl(e, o, n), t.memoizedState = el, Wc(e.child, r)) : (Io(t), n = e.child, e = n.sibling, n = zi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function il(e, t) {
		return t = al({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function al(e, t) {
		return e = Li(22, e, null, t), e.lanes = 0, e;
	}
	function ol(e, t, n) {
		return ho(t, e.child, null, n), e = il(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function sl(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Io(t), t.flags &= -257, ol(e, t, c)) : t.memoizedState === null ? (zo(), o = a.fallback, s = t.mode, a = al({
			mode: "visible",
			children: a.children
		}, s), o = Hi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, ho(t, e.child, null, c), a = t.child, a.memoizedState = tl(c), a.childLanes = nl(e, r, c), t.memoizedState = el, Wc(null, a)) : (zo(), t.child = e.child, t.flags |= 128, null);
		if (Io(t), vm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ya({
				value: a,
				source: null,
				stack: null
			})), ol(e, t, c);
		}
		if (Rc || Da(e, t, c, !1), r = (c & e.childLanes) !== 0, Rc || r) {
			if (ko.current !== null) return ol(e, t, c);
			if (r = sd, r !== null && (a = wt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, Mi(e, a), Ud(r, e, a), Lc;
			return _m(o) || tf(), ol(e, t, c);
		}
		return _m(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, la = bm(o.nextSibling), ca = t, F = !0, ua = null, da = !1, e !== null && sa(t, e), t = il(t, a.children), t.flags |= 134221824, t);
	}
	function cl(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ta(e.return, t, n);
	}
	function ll(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Wo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function ul(e, t, n, r, i, a) {
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
	function dl(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function fl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Vo.current;
		if (t.flags & 128) return Ho(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Ho(t, o), i === "backwards" && e !== null ? (dl(e), zc(e, t, r, n), dl(e)) : zc(e, t, r, n), r = F ? Zi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && cl(e, n, t);
			else if (e.tag === 19) cl(e, n, t);
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
				n = ll(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, dl(t)), ul(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Wo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				ul(t, !0, n, null, a, r);
				break;
			case "together":
				ul(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = ll(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ul(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function pl(e, t, n) {
		var r = t.pendingProps;
		return Ca(t, t.type, r.value), zc(e, t, r.children, n), t.child;
	}
	function ml(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), hd |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Da(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = zi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = zi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function hl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Oa(e)));
	}
	function gl(e, t, n) {
		switch (t.tag) {
			case 3:
				Me(t, t.stateNode.containerInfo), Ca(t, I, e.memoizedState.cache), _a();
				break;
			case 27:
			case 5:
				Pe(t);
				break;
			case 4:
				Me(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ca(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Lo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Io(t), t.flags |= 128, null;
					r = Da(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? rl(e, t, n) : (Io(t), e = ml(e, t, n), e === null ? null : e.sibling);
				}
				Io(t);
				break;
			case 19:
				if (t.flags & 128) return fl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (Da(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return fl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ho(t, Vo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Uc(e, t, n, t.pendingProps);
			case 24: Ca(t, I, e.memoizedState.cache);
		}
		return ml(e, t, n);
	}
	function _l(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Rc = !0;
			else {
				if (!hl(e, n) && !(t.flags & 128)) return Rc = !1, gl(e, t, n);
				Rc = !!(e.flags & 131072);
			}
		} else Rc = !1, F && t.flags & 1048576 && ia(t, Zi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = io(t.elementType), t.type = e, typeof e == "function") Ri(e) ? (r = Dc(e, r), t.tag = 1, t = Qc(null, t, e, r, n)) : (t.tag = 0, t = Xc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === E) {
								t.tag = 11, t = Bc(null, t, e, r, n);
								break a;
							}
							if (a === fe) {
								t.tag = 14, t = Vc(null, t, e, r, n);
								break a;
							}
							if (a === le) {
								t.tag = 10, t.type = e, t = pl(null, t, n);
								break a;
							}
						}
						throw t = xe(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Xc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Dc(r, t.pendingProps), Qc(e, t, r, a, n);
			case 3:
				a: {
					if (Me(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, yo(e, t), Eo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ca(t, I, r), r !== o.cache && Ea(t, [I], n, !0), To(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = $c(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = qi(Error(i(424)), t), ya(a), t = $c(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (la = bm(e.firstChild), ca = t, F = !0, ua = null, da = !0, n = go(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (_a(), r === a) {
							t = ml(e, t, n);
							break a;
						}
						zc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Yc(e, t), e === null ? (n = W(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : F || (t.stateNode = Cp(t.type, t.pendingProps, je.current, t)) : t.memoizedState = W(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Pe(t), e === null && F && (r = t.stateNode = Tm(t.type, t.pendingProps, je.current), ca = t, da = !0, a = la, Np(t.type) ? (xm = a, la = bm(r.firstChild)) : la = a), zc(e, t, t.pendingProps.children, n), Yc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && F && ((a = r = la) && (r = mm(r, t.type, t.pendingProps, da), r === null ? a = !1 : (t.stateNode = r, ca = t, la = bm(r.firstChild), da = !1, a = !0)), a || pa(t)), Pe(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, wp(a, o) ? r = null : s !== null && wp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = rs(e, t, os, null, null, n), gh._currentValue = a), Yc(e, t), zc(e, t, r, n), t.child;
			case 6: return e === null && F && ((e = n = la) && (n = hm(n, t.pendingProps, da), n === null ? e = !1 : (t.stateNode = n, ca = t, la = null, e = !0)), e || pa(t)), null;
			case 13: return rl(e, t, n);
			case 4: return Me(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ho(t, null, r, n) : zc(e, t, r, n), t.child;
			case 11: return Bc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Yc(e, t), zc(e, t, r, n), t.child;
			case 8: return zc(e, t, t.pendingProps.children, n), t.child;
			case 12: return zc(e, t, t.pendingProps.children, n), t.child;
			case 10: return pl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ka(t), a = Aa(a), r = r(a), t.flags |= 1, zc(e, t, r, n), t.child;
			case 14: return Vc(e, t, t.type, t.pendingProps, n);
			case 15: return Hc(e, t, t.type, t.pendingProps, n);
			case 19: return fl(e, t, n);
			case 31: return Jc(e, t, n);
			case 22: return Uc(e, t, n, t.pendingProps);
			case 24: return ka(t), r = Aa(I), e === null ? (a = Ya(), a === null && (a = sd, o = L(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, vo(t), Ca(t, I, a)) : ((e.lanes & n) !== 0 && (yo(e, t), Eo(t, null, null, n), To()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ca(t, I, r), r !== a.cache && Ea(t, [I], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ca(t, I, r))), zc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : F && aa(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Yc(e, t), zc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function vl(e) {
		e.flags |= 4;
	}
	function yl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? rh(t, r) : rh(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Qd()) e.flags |= 8192;
				else throw ao = to, $a;
			}
		} else e.flags &= -16777217;
	}
	function bl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !ih(t)) {
			if (Qd()) e.flags |= 8192;
			else throw ao = to, $a;
		}
	}
	function xl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : vt(), e.lanes |= t, yd |= t);
	}
	function Sl(e, t) {
		if (!F) switch (e.tailMode) {
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
	function z(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Cl(e, t, n) {
		var r = t.pendingProps;
		switch (oa(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return z(t), null;
			case 1: return z(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), wa(I), Ne(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ga(t) ? vl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, va())), z(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (vl(t), o === null ? (z(t), yl(t, a, null, r, n)) : (z(t), bl(t, o))) : o ? o === e.memoizedState ? (z(t), t.flags &= -16777217) : (vl(t), z(t), bl(t, o)) : (e = e.memoizedProps, e !== r && vl(t), z(t), yl(t, a, e, r, n)), null;
			case 27:
				if (Fe(t), n = je.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && vl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return z(t), t.subtreeFlags &= -33554433, null;
					}
					e = k.current, ga(t) ? ma(t, e) : (e = Tm(a, r, n), t.stateNode = e, vl(t));
				}
				return z(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Fe(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && vl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return z(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = k.current, ga(t)) ma(t, o);
					else {
						var s = bp(je.current);
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
						o[kt] = t, o[At] = r;
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
						r && vl(t);
					}
				}
				return z(t), t.subtreeFlags &= -33554433, yl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && vl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = je.current, ga(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = ca, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[kt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || up(e.nodeValue, n)), e || pa(t, !0);
					} else e = bp(e).createTextNode(r), e[kt] = t, t.stateNode = e;
				}
				return z(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ga(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[kt] = t;
						} else _a(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						z(t), e = !1;
					} else n = va(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Bo(t), t) : (Bo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return z(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ga(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[kt] = t;
						} else _a(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						z(t), a = !1;
					} else a = va(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Bo(t), t) : (Bo(t), null);
				}
				return Bo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), xl(t, t.updateQueue), z(t), null);
			case 4: return Ne(), e === null && ep(t.stateNode.containerInfo), t.flags |= 67108864, z(t), null;
			case 10: return wa(t.type), z(t), null;
			case 19:
				if (Uo(t), r = t.memoizedState, r === null) return z(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) Sl(r, !1);
					else {
						if (md !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Wo(e), o !== null) {
								for (t.flags |= 128, Sl(r, !1), e = o.updateQueue, t.updateQueue = e, xl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Bi(n, e), n = n.sibling;
								return Ho(t, Vo.current & 1 | 2), F && ra(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Je() > Td && (t.flags |= 128, a = !0, Sl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Wo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, xl(t, e), Sl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !F) return z(t), null;
						} else 2 * Je() - r.renderingStartTime > Td && n !== 536870912 && (t.flags |= 128, a = !0, Sl(r, !1), t.lanes = 4194304);
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
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Je(), e.sibling = null, o = Vo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || F ? Ho(t, o) : (n = o, ke(Po, t), ke(Vo, n), Fo === null && (Fo = t)), F && ra(t, r.treeForkCount), e;
				}
				return z(t), null;
			case 22:
			case 23: return Bo(t), No(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (z(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : z(t), n = t.updateQueue, n !== null && xl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && Oe(Ja), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), wa(I), z(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, z(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function wl(e, t) {
		switch (oa(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return wa(I), Ne(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Fe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Bo(t), t.alternate === null) throw Error(i(340));
					_a();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Bo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					_a();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Uo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return Ne(), null;
			case 10: return wa(t.type), null;
			case 22:
			case 23: return Bo(t), No(), e !== null && Oe(Ja), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return wa(I), null;
			case 25: return null;
			default: return null;
		}
	}
	function Tl(e, t) {
		switch (oa(t), t.tag) {
			case 3:
				wa(I), Ne();
				break;
			case 26:
			case 27:
			case 5:
				Fe(t);
				break;
			case 4:
				Ne();
				break;
			case 31:
				t.memoizedState !== null && Bo(t);
				break;
			case 13:
				Bo(t);
				break;
			case 19:
				Uo(t);
				break;
			case 10:
				wa(t.type);
				break;
			case 22:
			case 23:
				Bo(t), No(), e !== null && Oe(Ja);
				break;
			case 24: wa(I);
		}
	}
	function El(e, t) {
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
			Cf(t, t.return, e);
		}
	}
	function Dl(e, t, n) {
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
								Cf(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Cf(t, t.return, e);
		}
	}
	function Ol(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Oo(t, n);
			} catch (t) {
				Cf(e, e.return, t);
			}
		}
	}
	function kl(e, t, n) {
		n.props = Dc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Cf(e, t, n);
		}
	}
	function Al(e, t) {
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
						var i = e.stateNode, a = Si(e.memoizedProps, i);
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
			Cf(e, t, n);
		}
	}
	function jl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Cf(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Cf(e, t, n);
			}
			else n.current = null;
		}
	}
	function Ml(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) dm(e.stateNode, t[n]);
	}
	function Nl(e) {
		for (var t = e.return; t !== null && (Il(t) && dm(e.stateNode, t.stateNode), !Fl(t));) t = t.return;
	}
	function Pl(e) {
		for (var t = e.return; t !== null && (Il(t) && fm(e.stateNode, t.stateNode), !Fl(t));) t = t.return;
	}
	function Fl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Il(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Ll(e) {
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
			Cf(e, e.return, t);
		}
	}
	function Rl(e, t, n) {
		try {
			var r = e.stateNode;
			hp(r, e.type, n, t), r[At] = t;
		} catch (t) {
			Cf(e, e.return, t);
		}
	}
	function zl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Np(e.type) || e.tag === 4;
	}
	function Bl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || zl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Np(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Vl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Cn)), Ml(e, r), Zt = !0;
		else if (i !== 4 && (i === 27 && (Ml(e, r), r = null, Np(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Vl(e, t, n, r), e = e.sibling; e !== null;) Vl(e, t, n, r), e = e.sibling;
	}
	function Hl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Ml(e, r), Zt = !0;
		else if (i !== 4 && (i === 27 && (Ml(e, r), r = null, Np(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Hl(e, t, n, r), e = e.sibling; e !== null;) Hl(e, t, n, r), e = e.sibling;
	}
	function Ul(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			pp(t, r, n), t[kt] = e, t[At] = n;
		} catch (t) {
			Cf(e, e.return, t);
		}
	}
	var Wl = !1, Gl = null;
	function Kl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Wl = !0);
	}
	var ql = null;
	function Jl() {
		var e = ql;
		return ql = null, e;
	}
	var Yl = 0;
	function Xl(e, t, n, r, i) {
		return Yl = 0, Zl(e.child, t, n, r, i);
	}
	function Zl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = zp(o);
					r.push(s), s.view && (a = !0);
				} else a || zp(o).view && (a = !0);
				Wl = !0, Ip(o, Yl === 0 ? t : t + "_" + Yl, n), Yl++;
			} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Zl(e.child, t, n, r, i) && (a = !0));
			e = e.sibling;
		}
		return a;
	}
	function Ql(e, t) {
		for (; e !== null;) e.tag === 5 ? Lp(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Ql(e.child, t)), e = e.sibling;
	}
	function $l(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && ($l(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = wi(t.default, t.share), t !== "none" && (Xl(e, n, t, null, !1) || Ql(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function eu(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = Si(r, n), a = wi(r.default, n.paired ? r.share : r.enter);
			a === "none" ? $l(e) : Xl(e, i, a, null, !1) ? ($l(e), n.paired || t || Hd(e, r.onEnter)) : Ql(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) eu(e, t), e = e.sibling;
		else $l(e);
	}
	function tu(e) {
		if (Gl !== null && Gl.size !== 0) {
			var t = Gl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = wi(n.default, n.share);
								if (a !== "none" && (Xl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Hd(e, n.onShare)) : Ql(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					tu(e);
				}
				e = e.sibling;
			}
		}
	}
	function nu(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = Si(t, e.stateNode), r = Gl === null ? void 0 : Gl.get(n), i = wi(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Xl(e, n, i, null, !1) ? r === void 0 ? Hd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Gl.delete(n), Hd(e, t.onShare)) : Ql(e.child, !1)), Gl !== null && tu(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) nu(e), e = e.sibling;
		else Gl !== null && tu(e);
	}
	function ru(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = Si(t, e.stateNode);
				t = wi(t.default, t.update), e.flags &= -5, t !== "none" && Xl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && ru(e);
			e = e.sibling;
		}
	}
	function iu(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Ql(e.child, !1));
				}
				iu(e);
			}
			e = e.sibling;
		}
	}
	function au(e) {
		if (e.tag === 30) e.stateNode.paired = null, Ql(e.child, !1), iu(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) au(e), e = e.sibling;
		else iu(e);
	}
	function ou(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Ql(e.child, !1) : e.subtreeFlags & 33554432 && ou(e), e = e.sibling;
	}
	function su(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Yl < a.length) {
					var l = a[Yl], u = zp(c);
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
				e.flags & 4 && Ip(c, Yl === 0 ? n : n + "_" + Yl, i), s && e.flags & 4 || (ql === null && (ql = []), ql.push(c, Yl === 0 ? r : r + "_" + Yl, t.memoizedProps)), Yl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : su(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function cu(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = Si(n, r), a = wi(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(Bp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Yl = 0, i = su(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Hd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && cu(e, t);
			e = e.sibling;
		}
	}
	var lu = !1, uu = !1, du = !1, fu = !1, pu = typeof WeakSet == "function" ? WeakSet : Set, mu = null, hu = !1, gu = !1, _u = !1, vu = !1;
	function yu(e, t, n) {
		if (e = e.containerInfo, vp = Th, e = Qr(e), $r(e)) {
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
		}, Th = !1, n = (n & 335544064) === n, mu = t, t = n ? 9270 : 1024; mu !== null;) {
			if (e = mu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && nu(r[a]);
			if (e.alternate === null && e.flags & 2) n && Kl(e), bu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && nu(r), bu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Kl(e), bu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, mu = r) : (n && ru(e), bu(n));
			}
		}
		Gl = null;
	}
	function bu(e) {
		for (; mu !== null;) {
			var t = mu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = Dc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							Cf(t, t.return, e);
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
					n && r !== null && (n = Si(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = wi(a.default, a.update), a !== "none" && Xl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, mu = r;
				break;
			}
			mu = t.return;
		}
	}
	function xu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Vu(e, n), r & 4 && El(5, n);
				break;
			case 1:
				if (Vu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Cf(n, n.return, e);
					}
					else {
						var i = Dc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Cf(n, n.return, e);
						}
					}
				}
				r & 64 && Ol(n), r & 512 && Al(n, n.return);
				break;
			case 3:
				if (Vu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Oo(e, t);
					} catch (e) {
						Cf(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Ul(n);
			case 26:
			case 5:
				Vu(e, n), t === null && r & 4 && Ll(n), r & 512 && Al(n, n.return);
				break;
			case 12:
				Vu(e, n);
				break;
			case 31:
				Vu(e, n), r & 4 && Au(e, n);
				break;
			case 13:
				Vu(e, n), r & 4 && ju(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Df.bind(null, n), ym(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || lu, !r) {
					var a = t !== null && t.memoizedState !== null || uu;
					t = lu, i = uu, lu = r, (uu = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Uu(e, n, r)) : Vu(e, n), lu = t, uu = i;
				}
				break;
			case 30:
				Vu(e, n), r & 512 && Al(n, n.return);
				break;
			case 7: r & 512 && Al(n, n.return);
			default: Vu(e, n);
		}
	}
	function Su(e, t) {
		for (e = e.child; e !== null;) Cu(e, t), e = e.sibling;
	}
	function Cu(e, t) {
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
					Cf(e, e.return, t);
				}
				wu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Zt = !0;
				} catch (t) {
					Cf(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? Fp(s, !0) : Fp(e.stateNode, !1);
				} catch (t) {
					Cf(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && Su(e, t);
				break;
			default: Su(e, t);
		}
	}
	function wu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						Cu(n, r);
						break a;
					case 22:
						n.memoizedState === null && wu(n, r);
						break a;
					default: wu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function Tu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Tu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && M(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var Eu = null, Du = !1;
	function Ou(e, t, n) {
		for (n = n.child; n !== null;) ku(e, t, n), n = n.sibling;
	}
	function ku(e, t, n) {
		if (it && typeof it.onCommitFiberUnmount == "function") try {
			it.onCommitFiberUnmount(rt, n);
		} catch {}
		switch (n.tag) {
			case 26:
				uu || jl(n, t), Ou(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !uu && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				uu || jl(n, t), Pl(n);
				var r = Eu, i = Du;
				Np(n.type) && (Eu = n.stateNode, Du = !1), Ou(e, t, n), Em(n.stateNode, n.type, n.memoizedProps), Eu = r, Du = i;
				break;
			case 5: uu || jl(n, t), Pl(n);
			case 6:
				if (n.tag === 6 && Pl(n), r = Eu, i = Du, Eu = null, Ou(e, t, n), Eu = r, Du = i, Eu !== null) {
					if (Du) try {
						(Eu.nodeType === 9 ? Eu.body : Eu.nodeName === "HTML" ? Eu.ownerDocument.body : Eu).removeChild(n.stateNode), Zt = !0;
					} catch (e) {
						Cf(n, t, e);
					}
					else try {
						Eu.removeChild(n.stateNode), Zt = !0;
					} catch (e) {
						Cf(n, t, e);
					}
				}
				break;
			case 18:
				Eu !== null && (Du ? (e = Eu, Pp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Zh(e)) : Pp(Eu, n.stateNode));
				break;
			case 4:
				r = Eu, i = Du, Eu = n.stateNode.containerInfo, Du = !0, Ou(e, t, n), Eu = r, Du = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Dl(2, n, t), uu || Dl(4, n, t), Ou(e, t, n);
				break;
			case 1:
				uu || (jl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && kl(n, t, r)), Ou(e, t, n);
				break;
			case 21:
				Ou(e, t, n);
				break;
			case 22:
				uu = (r = uu) || n.memoizedState !== null, Ou(e, t, n), uu = r;
				break;
			case 30:
				jl(n, t), Ou(e, t, n);
				break;
			case 7:
				uu || jl(n, t), Ou(e, t, n);
				break;
			default: Ou(e, t, n);
		}
	}
	function Au(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Zh(e);
			} catch (e) {
				Cf(t, t.return, e);
			}
		}
	}
	function ju(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Zh(e);
		} catch (e) {
			Cf(t, t.return, e);
		}
	}
	function Mu(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new pu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new pu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Nu(e, t) {
		var n = Mu(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Of.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Pu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Np(l.type)) {
							Eu = l.stateNode, Du = !1;
							break a;
						}
						break;
					case 5:
						Eu = l.stateNode, Du = !1;
						break a;
					case 3:
					case 4:
						Eu = l.stateNode.containerInfo, Du = !0;
						break a;
				}
				l = l.return;
			}
			if (Eu === null) throw Error(i(160));
			ku(s, c, o), Eu = null, Du = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Iu(t, e, n), t = t.sibling;
	}
	var Fu = null;
	function Iu(e, t, n) {
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
				Pu(t, e, n), Lu(e), a & 4 && (Dl(3, e, e.return), El(3, e), Dl(5, e, e.return));
				break;
			case 1:
				Pu(t, e, n), Lu(e), a & 512 && (uu || r === null || jl(r, r.return)), a & 64 && lu && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Fu, Pu(t, e, n), Lu(e), a & 512 && (uu || r === null || jl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (lu) e.stateNode = Cp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[It] || r[kt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), pp(r, t, n), r[kt] = e, Ht(r), t = r;
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
										r[kt] = e, Ht(r), t = r;
									}
									e.stateNode = t;
								}
							} else lu || th(o, e.type, e.stateNode);
						} else e.stateNode = Ym(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Rl(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || uu || t.parentNode.removeChild(t)) : a.count--, n === null ? lu || th(o, e.type, e.stateNode) : Ym(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Pu(t, e, n), Lu(e), a & 512 && (uu || r === null || jl(r, r.return)), r !== null && a & 4 && Rl(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = du, du = !1, Pu(t, e, n), du = o, Lu(e), a & 512 && (uu || r === null || jl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						hn(t, ""), Zt = !0;
					} catch (t) {
						Cf(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Rl(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (fu = !0);
				break;
			case 6:
				if (Pu(t, e, n), Lu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Zt = !0;
					} catch (t) {
						Cf(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Zt = !1, $m = null, o = Fu, Fu = Am(t.containerInfo), Pu(t, e, n), Fu = o, Lu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Zh(t.containerInfo);
				} catch (t) {
					Cf(e, e.return, t);
				}
				fu && (fu = !1, Ru(e)), Zt = !1;
				break;
			case 4:
				a = du, du = lu, r = Qt(), o = Fu, Fu = Am(e.stateNode.containerInfo), Pu(t, e, n), Lu(e), Fu = o, Zt && gu && (_u = !0), Zt = r, du = a;
				break;
			case 12:
				Pu(t, e, n), Lu(e);
				break;
			case 31:
				Pu(t, e, n), Lu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Nu(e, t)));
				break;
			case 13:
				Pu(t, e, n), Lu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (Cd = Je()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Nu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = lu, l = uu, u = du;
				lu = c || o, du = u || o, uu = l || s, Pu(t, e, n), uu = l, du = u, lu = c, Lu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || lu || uu || (t = s || uu, n = lu, r = uu, lu = o || lu, uu = t, Hu(e, 2), lu = n, uu = r), !o && du || Su(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Nu(e, n))));
				break;
			case 19:
				Pu(t, e, n), Lu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Nu(e, t)));
				break;
			case 30:
				a & 512 && (uu || r === null || jl(r, r.return)), a = Qt(), o = gu, s = (n & 335544064) === n, c = e.memoizedProps, gu = s && wi(c.default, c.update) !== "none", Pu(t, e, n), Lu(e), s && r !== null && Zt && (e.flags |= 4), gu = o, Zt = a;
				break;
			case 21: break;
			case 7: a & 512 && (uu || r === null || jl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Pu(t, e, n), Lu(e);
		}
	}
	function Lu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (zl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Il(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Fl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Hl(e, Bl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (hn(l, ""), n.flags &= -33), Hl(e, Bl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Vl(e, Bl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Cf(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ru(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Ru(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Th = !0, t.reset(), Th = !1), e = e.sibling;
		}
	}
	function zu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Bu(t, e), t = t.sibling;
		else cu(t, !1);
	}
	function Bu(e, t) {
		var n = e.alternate;
		if (n === null) eu(e, !1);
		else switch (e.tag) {
			case 3:
				if (vu = hu = !1, Jl(), zu(t, e), !hu && !_u) {
					if (e = ql, e !== null) for (var r = 0; r < e.length; r += 3) {
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
					})), vu = !0;
				}
				ql = null;
				break;
			case 5:
				zu(t, e);
				break;
			case 4:
				r = hu, hu = !1, zu(t, e), hu && (_u = !0), hu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? zu(t, e) : eu(e, !1));
				break;
			case 30:
				r = hu, i = Jl(), hu = !1, zu(t, e), hu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = Si(a, o), o = Si(n.memoizedProps, o);
				var s = wi(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Yl = 0, t = su(e, n, t, o, s, a, !0), Yl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Hd(e, e.memoizedProps.onUpdate), ql = i) : i !== null && (i.push.apply(i, ql), ql = i), hu = e.flags & 32 ? !0 : r;
				break;
			default: zu(t, e);
		}
	}
	function Vu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) xu(e, t.alternate, t), t = t.sibling;
	}
	function Hu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Dl(4, n, n.return), Hu(n, r);
					break;
				case 1:
					jl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && kl(n, n.return, i), Hu(n, r);
					break;
				case 27: r & 2 && Em(n.stateNode, n.type, n.memoizedProps);
				case 5:
					jl(n, n.return), n.tag !== 5 && n.tag !== 27 || Pl(n), Hu(n, r);
					break;
				case 6:
					Pl(n);
					break;
				case 26:
					jl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || uu || i.parentNode.removeChild(i), Hu(n, r);
					break;
				case 22:
					n.memoizedState === null && Hu(n, r);
					break;
				case 30:
					jl(n, n.return), Hu(n, r);
					break;
				case 7: jl(n, n.return);
				default: Hu(n, r);
			}
			e = e.sibling;
		}
	}
	function Uu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Uu(i, a, n), El(4, a);
					break;
				case 1:
					if (Uu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Cf(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) Do(l[i], c);
						} catch (e) {
							Cf(r, r.return, e);
						}
					}
					s && o & 64 && Ol(a), Al(a, a.return);
					break;
				case 27: n & 2 && Ul(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Nl(a), Uu(i, a, n), s && r === null && o & 4 && Ll(a), Al(a, a.return);
					break;
				case 6:
					Nl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || lu || th(Am(c.ownerDocument), a.type, c), Uu(i, a, n), s && r === null && o & 4 && Ll(a), Al(a, a.return);
					break;
				case 12:
					Uu(i, a, n);
					break;
				case 31:
					Uu(i, a, n), s && o & 4 && Au(i, a);
					break;
				case 13:
					Uu(i, a, n), s && o & 4 && ju(i, a);
					break;
				case 22:
					a.memoizedState === null && Uu(i, a, n), Al(a, a.return);
					break;
				case 30:
					Uu(i, a, n), Al(a, a.return);
					break;
				case 7: Al(a, a.return);
				default: Uu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Wu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ia(n));
	}
	function Gu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ia(e));
	}
	function Ku(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) qu(e, t, n, r), t = t.sibling;
		else i && ou(t);
	}
	function qu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && au(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Ku(e, t, n, r), a & 2048 && El(9, t);
				break;
			case 1:
				Ku(e, t, n, r);
				break;
			case 3:
				Ku(e, t, n, r), i && vu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ia(a)));
				break;
			case 12:
				if (a & 2048) {
					Ku(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						Cf(t, t.return, e);
					}
				} else Ku(e, t, n, r);
				break;
			case 31:
				Ku(e, t, n, r);
				break;
			case 13:
				Ku(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && au(t), o._visibility & 2 ? Ku(e, t, n, r) : (o._visibility |= 2, Ju(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && au(s), o._visibility & 2 ? Ku(e, t, n, r) : Yu(e, t)), a & 2048 && Wu(s, t);
				break;
			case 24:
				Ku(e, t, n, r), a & 2048 && Gu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Ql(a.child, !0), Ql(t.child, !0))), Ku(e, t, n, r);
				break;
			default: Ku(e, t, n, r);
		}
	}
	function Ju(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ju(a, o, s, c, i), El(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ju(a, o, s, c, i)) : u._visibility & 2 ? Ju(a, o, s, c, i) : Yu(a, o), i && l & 2048 && Wu(o.alternate, o);
					break;
				case 24:
					Ju(a, o, s, c, i), i && l & 2048 && Gu(o.alternate, o);
					break;
				default: Ju(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Yu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Yu(n, r), i & 2048 && Wu(r.alternate, r);
					break;
				case 24:
					Yu(n, r), i & 2048 && Gu(r.alternate, r);
					break;
				default: Yu(n, r);
			}
			t = t.sibling;
		}
	}
	var Xu = 8192;
	function Zu(e, t, n) {
		if (e.subtreeFlags & Xu) for (e = e.child; e !== null;) Qu(e, t, n), e = e.sibling;
	}
	function Qu(e, t, n) {
		switch (e.tag) {
			case 26:
				Zu(e, t, n), e.flags & Xu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && oh(n, e)) : sh(n, Fu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Zu(e, t, n), e.flags & Xu && (e = e.stateNode, (t & 335544128) === t && oh(n, e));
				break;
			case 3:
			case 4:
				var r = Fu;
				Fu = Am(e.stateNode.containerInfo), Zu(e, t, n), Fu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Xu, Xu = 16777216, Zu(e, t, n), Xu = r) : Zu(e, t, n));
				break;
			case 30:
				if ((e.flags & Xu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Gl === null && (Gl = /* @__PURE__ */ new Map()), Gl.set(r, i);
				}
				Zu(e, t, n);
				break;
			default: Zu(e, t, n);
		}
	}
	function $u(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function ed(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				mu = r, rd(r, e);
			}
			$u(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) td(e), e = e.sibling;
	}
	function td(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				ed(e), e.flags & 2048 && Dl(9, e, e.return);
				break;
			case 3:
				ed(e);
				break;
			case 12:
				ed(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, nd(e)) : ed(e);
				break;
			default: ed(e);
		}
	}
	function nd(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				mu = r, rd(r, e);
			}
			$u(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Dl(8, t, t.return), nd(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, nd(t));
					break;
				default: nd(t);
			}
			e = e.sibling;
		}
	}
	function rd(e, t) {
		for (; mu !== null;) {
			var n = mu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Dl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ia(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, mu = r;
			else a: for (n = e; mu !== null;) {
				r = mu;
				var i = r.sibling, a = r.return;
				if (Tu(r), r === n) {
					mu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, mu = i;
					break a;
				}
				mu = a;
			}
		}
	}
	var id = {
		getCacheForType: function(e) {
			var t = Aa(I), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Aa(I).controller.signal;
		}
	}, ad = typeof WeakMap == "function" ? WeakMap : Map, od = 0, sd = null, cd = null, B = 0, ld = 0, V = null, ud = !1, dd = !1, fd = !1, pd = 0, md = 0, hd = 0, gd = 0, _d = 0, vd = 0, yd = 0, bd = null, xd = null, Sd = !1, Cd = 0, wd = 0, Td = Infinity, Ed = null, Dd = null, Od = 0, kd = null, Ad = null, jd = 0, Md = 0, Nd = null, Pd = null, Fd = null, Id = null, Ld = null, Rd = 0, zd = null;
	function Bd() {
		return od & 2 && B !== 0 ? B & -B : O.T === null ? j() : Wf();
	}
	function Vd() {
		if (vd === 0) {
			if (!(B & 536870912) || F) {
				var e = dt;
				dt <<= 1, !(dt & 3932160) && (dt = 262144), vd = e;
			} else vd = 536870912;
		}
		return e = Po.current, e !== null && (e.flags |= 32), vd;
	}
	function Hd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Gp(Si(e.memoizedProps, n))), Id === null && (Id = []), Id.push(t.bind(null, r));
		}
	}
	function Ud(e, t, n) {
		(e === sd && (ld === 2 || ld === 9) || e.cancelPendingCommit !== null) && (Xd(e, 0), qd(e, B, vd, !1)), bt(e, n), (!(od & 2) || e !== sd) && (e === sd && (!(od & 2) && (gd |= n), md === 4 && qd(e, B, vd, !1)), If(e));
	}
	function Wd(e, t, n) {
		if (od & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ht(e, t), a = r ? af(e, t) : nf(e, t, !0), o = r;
		do {
			if (a === 0) {
				dd && !r && qd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Kd(n)) a = nf(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = bd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Xd(c, s).flags |= 256), s = nf(c, s, !1), s !== 2 && s !== 6) {
								if (fd && !l) {
									c.errorRecoveryDisabledLanes |= o, gd |= o, a = 4;
									break a;
								}
								o = xd, xd = a, o !== null && (xd === null ? xd = o : xd.push.apply(xd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Xd(e, 0), qd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							qd(r, t, vd, !ud);
							break a;
						case 2:
							xd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Cd + 300 - Je(), 10 < a)) {
						if (qd(r, t, vd, !ud), mt(r, 0, !0) !== 0) break a;
						jd = t, r.timeoutHandle = Dp(Gd.bind(null, r, n, xd, Ed, Sd, t, vd, gd, yd, ud, o, "Throttled", -0, 0), a);
						break a;
					}
					Gd(r, n, xd, Ed, Sd, t, vd, gd, yd, ud, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		If(e);
	}
	function Gd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
			unsuspend: Cn
		}, Gl = null, Qu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = dh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? Cd - Je() : (a & 4194048) === a ? wd - Je() : 0, m = lh(d, m), m !== null) ? (jd = a, e.cancelPendingCommit = m(ff.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), qd(e, a, o, !l)) : ff(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Kd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Kr(a(), i)) return !1;
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
	function qd(e, t, n, r) {
		t = gt(e, t), t &= ~_d, t &= ~gd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - ot(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && St(e, n, t);
	}
	function Jd() {
		return od & 6 ? !0 : (Lf(0, !1), !1);
	}
	function Yd() {
		if (cd !== null) {
			if (ld === 0) var e = cd.return;
			else e = cd, Sa = xa = null, ls(e), co = null, lo = 0, e = cd;
			for (; e !== null;) Tl(e.alternate, e), e = e.return;
			cd = null;
		}
	}
	function Xd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, Op(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), jd = 0, Yd(), sd = e, cd = n = zi(e.current, null), B = t, ld = 0, V = null, ud = !1, dd = ht(e, t), fd = !1, yd = vd = _d = gd = hd = md = 0, xd = bd = null, Sd = !1, pd = gt(e, t), ki(), n;
	}
	function Zd(e, t) {
		R = null, O.H = yc, t === Qa || t === eo ? (t = oo(), ld = 3) : t === $a ? (t = oo(), ld = 4) : ld = t === Lc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, V = t, cd === null && (md = 1, jc(e, qi(t, e.current)));
	}
	function Qd() {
		var e = Po.current;
		return e === null ? !0 : (B & 4194048) === B ? Fo === null : (B & 62914560) === B || B & 536870912 ? e === Fo : !1;
	}
	function $d() {
		var e = O.H;
		return O.H = yc, e === null ? yc : e;
	}
	function ef() {
		var e = O.A;
		return O.A = id, e;
	}
	function tf() {
		md = 4, ud || (B & 4194048) !== B && Po.current !== null || (dd = !0), !(hd & 134217727) && !(gd & 134217727) || sd === null || qd(sd, B, vd, !1);
	}
	function nf(e, t, n) {
		var r = od;
		od |= 2;
		var i = $d(), a = ef();
		(sd !== e || B !== t) && (Ed = null, Xd(e, t)), t = !1;
		var o = md;
		a: do
			try {
				if (ld !== 0 && cd !== null) {
					var s = cd, c = V;
					switch (ld) {
						case 8:
							Yd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Po.current === null && (t = !0);
							var l = ld;
							if (ld = 0, V = null, lf(e, s, c, l), n && dd) {
								o = 0;
								break a;
							}
							break;
						default: l = ld, ld = 0, V = null, lf(e, s, c, l);
					}
				}
				rf(), o = md;
				break;
			} catch (t) {
				Zd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Sa = xa = null, od = r, O.H = i, O.A = a, cd === null && (sd = null, B = 0, ki()), o;
	}
	function rf() {
		for (; cd !== null;) sf(cd);
	}
	function af(e, t) {
		var n = od;
		od |= 2;
		var r = $d(), a = ef();
		sd !== e || B !== t ? (Ed = null, Td = Je() + 500, Xd(e, t)) : dd = ht(e, t);
		a: do
			try {
				if (ld !== 0 && cd !== null) {
					t = cd;
					var o = V;
					b: switch (ld) {
						case 1:
							ld = 0, V = null, lf(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (no(o)) {
								ld = 0, V = null, cf(t);
								break;
							}
							t = function() {
								ld !== 2 && ld !== 9 || sd !== e || (ld = 7), If(e);
							}, o.then(t, t);
							break a;
						case 3:
							ld = 7;
							break a;
						case 4:
							ld = 5;
							break a;
						case 7:
							no(o) ? (ld = 0, V = null, cf(t)) : (ld = 0, V = null, lf(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (cd.tag) {
								case 26: s = cd.memoizedState;
								case 5:
								case 27:
									var c = cd;
									if (s ? ih(s) : c.stateNode.complete) {
										ld = 0, V = null;
										var l = c.sibling;
										if (l !== null) cd = l;
										else {
											var u = c.return;
											u === null ? cd = null : (cd = u, uf(u));
										}
										break b;
									}
							}
							ld = 0, V = null, lf(e, t, o, 5);
							break;
						case 6:
							ld = 0, V = null, lf(e, t, o, 6);
							break;
						case 8:
							Yd(), md = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				of();
				break;
			} catch (t) {
				Zd(e, t);
			}
		while (1);
		return Sa = xa = null, O.H = r, O.A = a, od = n, cd === null ? (sd = null, B = 0, ki(), md) : 0;
	}
	function of() {
		for (; cd !== null && !Ke();) sf(cd);
	}
	function sf(e) {
		var t = _l(e.alternate, e, pd);
		e.memoizedProps = e.pendingProps, t === null ? uf(e) : cd = t;
	}
	function cf(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Zc(n, t, t.pendingProps, t.type, void 0, B);
				break;
			case 11:
				t = Zc(n, t, t.pendingProps, t.type.render, t.ref, B);
				break;
			case 5:
				ls(t);
				var r = t;
				r === ca && (F ? (ha(r), r.tag === 5 && r.stateNode != null && (la = r.stateNode)) : (ha(r), F = !0));
			default: Tl(n, t), t = cd = Bi(t, pd), t = _l(n, t, pd);
		}
		e.memoizedProps = e.pendingProps, t === null ? uf(e) : cd = t;
	}
	function lf(e, t, n, r) {
		Sa = xa = null, ls(t), co = null, lo = 0;
		var i = t.return;
		try {
			if (Ic(e, i, t, n, B)) {
				md = 1, jc(e, qi(n, e.current)), cd = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw cd = i, t;
			md = 1, jc(e, qi(n, e.current)), cd = null;
			return;
		}
		t.flags & 32768 ? (F || r === 1 ? e = !0 : dd || B & 536870912 ? e = !1 : (ud = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Po.current, r !== null && r.tag === 13 && (r.flags |= 16384))), df(t, e)) : uf(t);
	}
	function uf(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				df(t, ud);
				return;
			}
			e = t.return;
			var n = Cl(t.alternate, t, pd);
			if (n !== null) {
				cd = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				cd = t;
				return;
			}
			cd = t = e;
		} while (t !== null);
		md === 0 && (md = 5);
	}
	function df(e, t) {
		do {
			var n = wl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, cd = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				cd = e;
				return;
			}
			cd = e = n;
		} while (e !== null);
		md = 6, cd = null;
	}
	function ff(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			bf();
		while (Od !== 0);
		if (od & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === sd && (cd = sd = null, B = 0), Ad = t, kd = e, jd = n, Nd = a, Pd = r, pf(e, t, n, s, c, l, f);
		}
	}
	function pf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Md = s, s |= Oi, xt(e, n, s, r, i, a), Id = null, (n & 335544064) === n ? (Ld = za(e), r = 10262) : (Ld = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, kf(Qe, function() {
			return xf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Wl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = O.T, O.T = null, i = Ce.p, Ce.p = 2, a = od, od |= 4;
			try {
				yu(e, t, n);
			} finally {
				od = a, Ce.p = i, O.T = r;
			}
		}
		Od = 1, Wl ? Fd = Up(o, e.containerInfo, Ld, gf, _f, hf, vf, xf, mf, null, null) : (gf(), _f(), vf());
	}
	function mf(e) {
		if (Od !== 0) {
			var t = kd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function hf() {
		Od === 3 && (Od = 0, Bu(Ad, kd), Od = 4);
	}
	function gf() {
		if (Od === 1) {
			Od = 0;
			var e = kd, t = Ad, n = jd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = O.T, O.T = null;
				var i = Ce.p;
				Ce.p = 2;
				var a = od;
				od |= 4;
				try {
					gu = _u = !1, Iu(t, e, n), n = yp;
					var o = Qr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Zr(s.ownerDocument.documentElement, s)) {
						if (c !== null && $r(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Xr(s, h), v = Xr(s, g);
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
					od = a, Ce.p = i, O.T = r;
				}
			}
			e.current = t, Od = 2;
		}
	}
	function _f() {
		if (Od === 2) {
			Od = 0;
			var e = kd, t = Ad, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = O.T, O.T = null;
				var r = Ce.p;
				Ce.p = 2;
				var i = od;
				od |= 4;
				try {
					xu(e, t.alternate, t);
				} finally {
					od = i, Ce.p = r, O.T = n;
				}
			}
			Od = 3;
		}
	}
	function vf() {
		if (Od === 4 || Od === 3) {
			Od = 0;
			var e = Fd;
			Fd = null, qe();
			var t = kd, n = Ad, r = jd, i = Pd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? Od = 5 : (Od = 0, Ad = kd = null, yf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (Dd = null), Et(r), n = n.stateNode, it && typeof it.onCommitFiberRoot == "function") try {
				it.onCommitFiberRoot(rt, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = O.T, a = Ce.p, Ce.p = 2, O.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					O.T = n, Ce.p = a;
				}
			}
			if (i = Id, o = Ld, Ld = null, i !== null && (Id = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			jd & 3 && bf(), If(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === zd ? Rd++ : (Rd = 0, zd = t) : (Rd = 0, zd = null), Lf(0, !1);
		}
	}
	function yf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ia(t)));
	}
	function bf() {
		return Fd !== null && (Fd.skipTransition(), Fd = null), gf(), _f(), vf(), xf();
	}
	function xf() {
		if (Od !== 5) return !1;
		var e = kd, t = Md;
		Md = 0;
		var n = Et(jd), r = O.T, a = Ce.p;
		try {
			Ce.p = 32 > n ? 32 : n, O.T = null, n = Nd, Nd = null;
			var o = kd, s = jd;
			if (Od = 0, Ad = kd = null, jd = 0, od & 6) throw Error(i(331));
			var c = od;
			if (od |= 4, td(o.current), qu(o, o.current, s, n), od = c, Lf(0, !1), it && typeof it.onPostCommitFiberRoot == "function") try {
				it.onPostCommitFiberRoot(rt, o);
			} catch {}
			return !0;
		} finally {
			Ce.p = a, O.T = r, yf(e, t);
		}
	}
	function Sf(e, t, n) {
		t = qi(n, t), t = Nc(e.stateNode, t, 2), e = xo(e, t, 2), e !== null && (bt(e, 2), If(e));
	}
	function Cf(e, t, n) {
		if (e.tag === 3) Sf(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Sf(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Dd === null || !Dd.has(r))) {
					e = qi(n, e), n = Pc(2), r = xo(t, n, 2), r !== null && (Fc(n, r, t, e), bt(r, 2), If(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function wf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new ad();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (fd = !0, i.add(n), e = Tf.bind(null, e, t, n), t.then(e, e));
	}
	function Tf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, sd === e && (B & n) === n && (md === 4 || md === 3 && (B & 62914560) === B && 300 > Je() - Cd ? od & 2 ? _d |= n : Xd(e, 0) : _d |= n, yd === B && (yd = 0)), If(e);
	}
	function Ef(e, t) {
		t === 0 && (t = vt()), e = Mi(e, t), e !== null && (bt(e, t), If(e));
	}
	function Df(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ef(e, n);
	}
	function Of(e, t) {
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
		r !== null && r.delete(t), Ef(e, n);
	}
	function kf(e, t) {
		return We(e, t);
	}
	var Af = null, jf = null, Mf = !1, Nf = !1, Pf = !1, Ff = 0;
	function If(e) {
		e !== jf && e.next === null && (jf === null ? Af = jf = e : jf = jf.next = e), Nf = !0, Mf || (Mf = !0, Uf());
	}
	function Lf(e, t) {
		if (!Pf && Nf) {
			Pf = !0;
			do
				for (var n = !1, r = Af; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - ot(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Hf(r, a));
						} else a = B, a = mt(r, r === sd ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ht(r, a) || (n = !0, Hf(r, a));
					}
					r = r.next;
				}
			while (n);
			Pf = !1;
		}
	}
	function Rf() {
		zf();
	}
	function zf() {
		Nf = Mf = !1;
		var e = 0;
		Ff !== 0 && Ep() && (e = Ff);
		for (var t = Je(), n = null, r = Af; r !== null;) {
			var i = r.next, a = Bf(r, t);
			a === 0 ? (r.next = null, n === null ? Af = i : n.next = i, i === null && (jf = n)) : (n = r, (e !== 0 || a & 3) && (Nf = !0)), r = i;
		}
		Od !== 0 && Od !== 5 || Lf(e, !1), Ff !== 0 && (Ff = 0);
	}
	function Bf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - ot(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = _t(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = sd, n = B, n = mt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (ld === 2 || ld === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ge(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ht(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ge(r), Et(n)) {
				case 2:
				case 8:
					n = Ze;
					break;
				case 32:
					n = Qe;
					break;
				case 268435456:
					n = et;
					break;
				default: n = Qe;
			}
			return r = Vf.bind(null, e), n = We(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ge(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Vf(e, t) {
		if (Od !== 0 && Od !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (bf() && e.callbackNode !== n) return null;
		var r = B;
		return r = mt(e, e === sd ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Wd(e, r, t), Bf(e, Je()), e.callbackNode != null && e.callbackNode === n ? Vf.bind(null, e) : null);
	}
	function Hf(e, t) {
		if (bf()) return null;
		Wd(e, t, !0);
	}
	function Uf() {
		jp(function() {
			od & 6 ? We(Xe, Rf) : zf();
		});
	}
	function Wf() {
		if (Ff === 0) {
			var e = Ha;
			e === 0 && (e = ut, ut <<= 1, !(ut & 261888) && (ut = 256)), Ff = e;
		}
		return Ff;
	}
	function Gf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Sn(e);
	}
	function Kf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Gf((i[At] || null).action), o = r.submitter;
			o && (t = (t = o[At] || null) ? Gf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Wn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Ff !== 0) {
								var e = new FormData(i, o);
								ac(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), ac(n, {
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
	for (var qf = 0; qf < yi.length; qf++) {
		var Jf = yi[qf];
		bi(Jf.toLowerCase(), "on" + (Jf[0].toUpperCase() + Jf.slice(1)));
	}
	bi(di, "onAnimationEnd"), bi(fi, "onAnimationIteration"), bi(pi, "onAnimationStart"), bi("dblclick", "onDoubleClick"), bi("focusin", "onFocus"), bi("focusout", "onBlur"), bi(mi, "onTransitionRun"), bi(hi, "onTransitionStart"), bi(gi, "onTransitionCancel"), bi(_i, "onTransitionEnd"), Kt("onMouseEnter", ["mouseout", "mouseover"]), Kt("onMouseLeave", ["mouseout", "mouseover"]), Kt("onPointerEnter", ["pointerout", "pointerover"]), Kt("onPointerLeave", ["pointerout", "pointerover"]), Gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Gt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Yf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Xf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yf));
	function Zf(e, t) {
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
						Ti(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Ti(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function H(e, t) {
		var n = t[Mt];
		n === void 0 && (n = t[Mt] = /* @__PURE__ */ new Set());
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
			e[$f] = !0, Wt.forEach(function(t) {
				t !== "selectionchange" && (Xf.has(t) || Qf(t, !1, e), Qf(t, !0, e));
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
		n = i.bind(null, t, n, e), i = void 0, !Nn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = Rt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		An(function() {
			var r = a, i = Tn(n), s = [];
			a: {
				var c = vi.get(e);
				if (c !== void 0) {
					var l = Wn, u = e;
					switch (e) {
						case "keypress": if (zn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = cr;
							break;
						case "focusin":
							u = "focus", l = $n;
							break;
						case "focusout":
							u = "blur", l = $n;
							break;
						case "beforeblur":
						case "afterblur":
							l = $n;
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
							l = Zn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Qn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = dr;
							break;
						case di:
						case fi:
						case pi:
							l = er;
							break;
						case _i:
							l = fr;
							break;
						case "scroll":
						case "scrollend":
							l = Kn;
							break;
						case "wheel":
							l = pr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = tr;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = lr;
							break;
						case "submit":
							l = ur;
							break;
						case "toggle":
						case "beforetoggle": l = mr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = jn(m, p), g != null && d.push(rp(m, g, h))), f) break;
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
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== wn && (u = n.relatedTarget || n.fromElement) && (Rt(u) || u[jt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Rt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Zn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = lr, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Bt(c), h = l == null ? u : Bt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Rt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? ne(c, l, ap) : null, c !== null && op(s, u, c, d, !1), l !== null && f !== null && op(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Bt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Pr;
					else if (Or(c)) {
						if (Fr) _ = Wr;
						else {
							_ = Hr;
							var v = Vr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && yn(r.elementType) && (_ = Pr) : _ = Ur;
					if (_ &&= _(e, r)) {
						kr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Bt(r) : window, e) {
					case "focusin":
						(Or(v) || v.contentEditable === "true") && (ti = v, ni = r, ri = null);
						break;
					case "focusout":
						ri = ni = ti = null;
						break;
					case "mousedown":
						ii = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						ii = !1, ai(s, n, i);
						break;
					case "selectionchange": if (ei) break;
					case "keydown":
					case "keyup": ai(s, n, i);
				}
				var y;
				if (gr) b: {
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
				else wr ? Sr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (yr && n.locale !== "ko" && (wr || b !== "onCompositionStart" ? b === "onCompositionEnd" && wr && (y = Rn()) : (Fn = i, In = "value" in Fn ? Fn.value : Fn.textContent, wr = !0)), v = ip(r, b), 0 < v.length && (b = new nr(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = Cr(n), y !== null && (b.data = y)))), (y = vr ? Tr(e, n) : Er(e, n)) && (b = ip(r, "onBeforeInput"), 0 < b.length && (v = new nr("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Kf(s, e, r, n, i);
			}
			Zf(s, t);
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = jn(e, n), i != null && r.unshift(rp(e, i, a)), i = jn(e, t), i != null && r.push(rp(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = jn(n, a), l != null && o.unshift(rp(n, l, c))) : i || (l = jn(n, a), l != null && o.push(rp(n, l, c)))), n = n.return;
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
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || hn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && hn(e, "" + r);
				else return;
				break;
			case "className":
				en(e, "class", r);
				break;
			case "tabIndex":
				en(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				en(e, n, r);
				break;
			case "style":
				vn(e, r, o);
				return;
			case "data": if (t !== "object") {
				en(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Sn(r), e.setAttribute(n, r);
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
				r = Sn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Cn);
				return;
			case "onScroll":
				r != null && H("scroll", e);
				return;
			case "onScrollEnd":
				r != null && H("scrollend", e);
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
				n = Sn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				H("beforetoggle", e), H("toggle", e), $t(e, "popover", r);
				break;
			case "xlinkActuate":
				tn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				tn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				tn(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				tn(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				tn(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				tn(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				tn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				tn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				tn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				$t(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = bn.get(n) || n, $t(e, n, r);
			else return;
		}
		Zt = !0;
	}
	function fp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				vn(e, r, o);
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
				if (typeof r == "string") hn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") hn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && H("scroll", e);
				return;
			case "onScrollEnd":
				r != null && H("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = Cn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!N.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[At] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					Zt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : $t(e, n, r);
				}
				return;
		}
		Zt = !0;
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
				H("error", e), H("load", e);
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
				H("invalid", e);
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
				dn(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in H("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: dp(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && P(e, !!r, n, !0) : P(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in H("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
				mn(e, r, a, o);
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
				H("beforetoggle", e), H("toggle", e), H("cancel", e), H("close", e);
				break;
			case "iframe":
			case "object":
				H("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Yf.length; r++) H(Yf[r], e);
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
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: dp(e, t, u, r, n, null);
				}
				return;
			default: if (yn(t)) {
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
							m !== f && (Zt = !0), o = m;
							break;
						case "name":
							m !== f && (Zt = !0), a = m;
							break;
						case "checked":
							m !== f && (Zt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (Zt = !0), d = m;
							break;
						case "value":
							m !== f && (Zt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (Zt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && dp(e, t, p, m, r, f);
					}
				}
				un(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || dp(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Zt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Zt = !0), c = o;
						break;
					case "multiple": o !== l && (Zt = !0), s = o;
					default: o !== l && dp(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? P(e, !!n, n ? [] : "", !1) : P(e, !!n, t, !0)) : P(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: dp(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (Zt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (Zt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && dp(e, t, s, a, r, o);
				}
				pn(e, p, m);
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
						p !== m && (Zt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
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
			default: if (yn(t)) {
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
		return n = bp(n).createElement(e), n[kt] = r, n[At] = t, pp(n, e, t), Ht(n), n;
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
						a[It] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
		var a = Rt(i);
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
					pm(n), M(n);
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
			} else if (!e[It]) switch (t) {
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
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Cn && (e.onclick = null), M(e);
	}
	function Dm(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		M(e);
	}
	var Om = /* @__PURE__ */ new Map(), km = /* @__PURE__ */ new Set();
	function Am(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var jm = Ce.d;
	Ce.d = {
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
		var e = jm.f(), t = Jd();
		return e || t;
	}
	function Nm(e) {
		var t = zt(e);
		t !== null && t.tag === 5 && t.type === "form" ? sc(t) : jm.r(e);
	}
	var Pm = typeof document > "u" ? null : document;
	function Fm(e, t, n) {
		var r = Pm;
		if (r && typeof t == "string" && t) {
			var i = ln(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), km.has(i) || (km.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), pp(t, "link", e), Ht(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + ln(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + ln(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + ln(n.imageSizes) + "\"]")) : i += "[href=\"" + ln(e) + "\"]";
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
				pp(o, "link", e), t === "style" && (o[Lt] = !0, o.onload = o.onerror = function() {
					Ut(o);
				}), Ht(o), r.head.appendChild(o);
			}
		}
	}
	function zm(e, t) {
		jm.m(e, t);
		var n = Pm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + ln(r) + "\"][href=\"" + ln(e) + "\"]", a = i;
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
				r = n.createElement("link"), pp(r, "link", e), Ht(r), n.head.appendChild(r);
			}
		}
	}
	function Bm(e, t, n) {
		jm.S(e, t, n);
		var r = Pm;
		if (r && e) {
			var i = Vt(r).hoistableStyles, a = Um(e);
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
					Ht(c), pp(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = Vt(n).hoistableScripts, i = qm(e), a = r.get(i);
			a || (a = n.querySelector(Jm(i)), a || (e = w({
				src: e,
				async: !0
			}, t), (t = Om.get(i)) && Qm(e, t), a = n.createElement("script"), Ht(a), pp(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = Vt(n).hoistableScripts, i = qm(e), a = r.get(i);
			a || (a = n.querySelector(Jm(i)), a || (e = w({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Om.get(i)) && Qm(e, t), a = n.createElement("script"), Ht(a), pp(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function W(e, t, n, r) {
		var a = (a = je.current) ? Am(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Um(n.href), t = Vt(a).hoistableStyles, r = t.get(n), r || (r = {
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
					var o = Vt(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = qm(n), t = Vt(a).hoistableScripts, r = t.get(n), r || (r = {
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
		return "href=\"" + ln(e) + "\"";
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
			if (!0 !== t[Lt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Lt] = !0, t.onload = t.onerror = Ut.bind(null, t), pp(t, "link", n), Ht(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function qm(e) {
		return "[src=\"" + ln(e) + "\"]";
	}
	function Jm(e) {
		return "script[async]" + e;
	}
	function Ym(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + ln(n.href) + "\"]");
				if (r) return t.instance = r, Ht(r), r;
				var a = w({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ht(r), pp(r, "style", a), Xm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Um(n.href);
				var o = e.querySelector(Wm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ht(o), o;
				r = Gm(n), (a = Om.get(a)) && Zm(r, a), o = (e.ownerDocument || e).createElement("link"), Ht(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), pp(o, "link", r), t.state.loading |= 4, Xm(o, n.precedence, e), t.instance = o;
			case "script": return o = qm(n.src), (a = e.querySelector(Jm(o))) ? (t.instance = a, Ht(a), a) : (r = n, (a = Om.get(o)) && (r = w({}, n), Qm(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ht(a), pp(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[It] || a[kt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = dh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ht(a);
					return;
				}
				a = t.ownerDocument || t, r = Gm(r), (i = Om.get(i)) && Zm(r, i), a = a.createElement("link"), Ht(a);
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
		_currentValue: we,
		_currentValue2: we,
		_threadCount: 0
	};
	function _h(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = yt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yt(0), this.hiddenUpdates = yt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function vh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new _h(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Li(3, null, null, t), e.current = a, a.stateNode = e, t = L(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, vo(a), e;
	}
	function yh(e) {
		return e ? (e = Fi, e) : Fi;
	}
	function bh(e, t, n, r, i, a) {
		i = yh(i), r.context === null ? r.context = i : r.pendingContext = i, r = bo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = xo(e, r, t), n !== null && (Ud(n, e, t), So(n, e, t));
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
			var t = Mi(e, 67108864);
			t !== null && Ud(t, e, 67108864), Sh(e, 67108864);
		}
	}
	function wh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Bd();
			t = Tt(t);
			var n = Mi(e, t);
			n !== null && Ud(n, e, t), Sh(e, t);
		}
	}
	var Th = !0;
	function Eh(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = Ce.p;
		try {
			Ce.p = 2, Oh(e, t, n, r);
		} finally {
			Ce.p = a, O.T = i;
		}
	}
	function Dh(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = Ce.p;
		try {
			Ce.p = 8, Oh(e, t, n, r);
		} finally {
			Ce.p = a, O.T = i;
		}
	}
	function Oh(e, t, n, r) {
		if (Th) {
			var i = kh(r);
			if (i === null) np(e, t, r, Ah, n), Vh(e, r);
			else if (Uh(i, e, t, n, r)) r.stopPropagation();
			else if (Vh(e, r), t & 4 && -1 < Bh.indexOf(e)) {
				for (; i !== null;) {
					var a = zt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = pt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - ot(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									If(a), !(od & 6) && (Td = Je() + 500, Lf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Mi(a, 2), s !== null && Ud(s, a, 2), Jd(), Sh(a, 2);
					}
					if (a = kh(r), a === null && np(e, t, r, Ah, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else np(e, t, r, null, n);
		}
	}
	function kh(e) {
		return e = Tn(e), jh(e);
	}
	var Ah = null;
	function jh(e) {
		if (Ah = null, e = Rt(e), e !== null) {
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
			case "message": switch (Ye()) {
				case Xe: return 2;
				case Ze: return 8;
				case Qe:
				case $e: return 32;
				case et: return 268435456;
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
		}, t !== null && (t = zt(t), t !== null && Ch(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = Rt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Dt(e.priority, function() {
							wh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Dt(e.priority, function() {
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
				wn = r, n.target.dispatchEvent(r), wn = null;
			} else return t = zt(n), t !== null && Ch(t), e.blockedOn = n, !1;
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
				var a = zt(n);
				a !== null && (e.splice(t, 3), t -= 3, ac(a, {
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
			var i = n[r], a = n[r + 1], o = i[At] || null;
			if (typeof a == "function") o || Xh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[At] || null) s = o.formAction;
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
		bh(n, Bd(), e, t, null, null);
	}, eg.prototype.unmount = $h.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			bh(e.current, 2, null, e, null, null), Jd(), t[jt] = null;
		}
	};
	function eg(e) {
		this._internalRoot = e;
	}
	eg.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = j();
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
	Ce.findDOMNode = function(e) {
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
			rt = rg.inject(ng), it = rg;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Oc, s = kc, c = Ac;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = vh(e, 1, !1, null, null, n, r, null, o, s, c, Qh), e[jt] = t.current, ep(e), new $h(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = Oc, c = kc, l = Ac, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = vh(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Qh), t.context = yh(null), n = t.current, r = Bd(), r = Tt(r), o = bo(r), o.callback = null, xo(n, o, r), n = r, t.current.lanes = n, bt(t, n), If(t), e[jt] = t.current, ep(e), new eg(t);
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
			return new Nr(e, t, n, r);
		}
		function g(e, t) {
			e.context === Iv && (Gp(e.current, 2, t, e, null, null), iu());
		}
		function v(e, t) {
			if (Lv !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Fu(), Mr(e.current, t, n), iu();
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
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Wd(t) : _T;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Wd(t), t = Gd(t, n);
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
			n = n.toLowerCase(), n = $t(null, n), n = {
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
			var n = e.type, r = Gd(t.context, n);
			n = $t(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (ge(Ym, e, e), ge(Jm, r, e));
		}
		function Se(e) {
			Ym.current === e && (he(Jm, e), he(Ym, e)), Zm.current === e && (he(Zm, e), $T._currentValue = QT);
		}
		function O() {}
		function Ce() {
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
		function we() {
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
		function Te(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function Ee(e) {
			if (oh === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				oh = t && t[1] || "", sh = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + oh + e + sh;
		}
		function De(e, t) {
			if (!e || ch) return "";
			var n = lh.get(e);
			if (n !== void 0) return n;
			ch = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = W.H, W.H = null, Ce();
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
				ch = !1, W.H = r, we(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? Ee(l) : "", typeof e == "function" && lh.set(e, l), l;
		}
		function Oe(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return Ee(e.type);
				case 16: return Ee("Lazy");
				case 13: return e.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
				case 19: return Ee("SuspenseList");
				case 0:
				case 15: return De(e.type, !1);
				case 11: return De(e.type.render, !1);
				case 1: return De(e.type, !0);
				case 31: return Ee("Activity");
				case 30: return Ee("ViewTransition");
				default: return "";
			}
		}
		function ke(e) {
			try {
				var t = "", n = null;
				do {
					t += Oe(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = Te(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = Ee(s + (c ? " [" + c + "]" : ""));
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
		function k(e) {
			return (e = e ? e.displayName || e.name : "") ? Ee(e) : "";
		}
		function Ae() {
			if (uh === null) return null;
			var e = uh._debugOwner;
			return e == null ? null : pe(e);
		}
		function je() {
			if (uh === null) return "";
			var e = uh;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += Ee(e.type);
						break;
					case 13:
						t += Ee("Suspense");
						break;
					case 19:
						t += Ee("SuspenseList");
						break;
					case 31:
						t += Ee("Activity");
						break;
					case 30:
						t += Ee("ViewTransition");
						break;
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += k(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += k(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = Te(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + Te(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function A(e, t, n, r, i, a, o) {
			var s = uh;
			Me(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				Me(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function Me(e) {
			W.getCurrentStack = e === null ? null : je, dh = !1, uh = e;
		}
		function Ne(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Pe(e) {
			try {
				return Fe(e), !1;
			} catch {
				return !0;
			}
		}
		function Fe(e) {
			return "" + e;
		}
		function Ie(e, t) {
			if (Pe(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Ne(e)), Fe(e);
		}
		function Le(e, t) {
			if (Pe(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Ne(e)), Fe(e);
		}
		function Re(e) {
			if (Pe(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Ne(e)), Fe(e);
		}
		function ze(e) {
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
		function Be(e) {
			if (typeof wh == "function" && Th(e), Dh && typeof Dh.setStrictMode == "function") try {
				Dh.setStrictMode(Eh, e);
			} catch (e) {
				Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function Ve(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (jh(e) / Mh | 0) | 0;
		}
		function He(e) {
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
		function Ue(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = He(n))) : i = He(o) : i = He(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = He(n))) : i = He(o)) : i = He(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function We(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Ge(e, t) {
			t & 8 && (t |= t & 32);
			var n = e.entangledLanes;
			if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
				var r = 31 - Ah(n), i = 1 << r;
				t |= e[r], n &= ~i;
			}
			return t;
		}
		function Ke(e, t) {
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
		function qe() {
			var e = Fh;
			return Fh <<= 1, !(Fh & 62914560) && (Fh = 4194304), e;
		}
		function Je(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Ye(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Xe(e, t, n, r, i, a) {
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
			r !== 0 && Ze(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function Ze(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Ah(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Qe(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Ah(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function $e(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : et(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function et(e) {
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
		function tt(e, t, n) {
			if (kh) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Ah(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function nt(e, t) {
			if (kh) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Ah(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function rt(e) {
			return e &= -e, Ih !== 0 && Ih < e ? Lh !== 0 && Lh < e ? e & 134217727 ? Rh : zh : Lh : Ih;
		}
		function it() {
			var e = Um.p;
			return e === 0 ? (e = window.event, e === void 0 ? Rh : nm(e.type)) : e;
		}
		function at(e, t) {
			var n = Um.p;
			try {
				return Um.p = e, t();
			} finally {
				Um.p = n;
			}
		}
		function ot(e) {
			delete e[Vh], delete e[Hh], delete e[Gh], delete e[Kh];
		}
		function st(e) {
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
		function ct(e) {
			if (e = e[Vh] || e[Uh]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function lt(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function ut(e) {
			var t = e[qh];
			return t ||= e[qh] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function dt(e) {
			e[Jh] = !0;
		}
		function ft(e) {
			e[Yh] = void 0;
		}
		function pt(e, t) {
			mt(e, t), mt(e + "Capture", t);
		}
		function mt(e, t) {
			Zh[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Zh[e] = t;
			var n = e.toLowerCase();
			for (Qh[n] = e, e === "onDoubleClick" && (Qh.ondblclick = e), e = 0; e < t.length; e++) Xh.add(t[e]);
		}
		function ht(e, t) {
			$h[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function gt(e) {
			return fh.call(ng, e) ? !0 : fh.call(tg, e) ? !1 : eg.test(e) ? ng[e] = !0 : (tg[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function _t() {
			var e = rg;
			return rg = !1, e;
		}
		function vt(e, t, n) {
			if (gt(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = t.toLowerCase() === "nonce" ? e.nonce : e.getAttribute(t), e === "" && !0 === n || (Ie(n, t), e === "" + n ? n : e);
			}
		}
		function yt(e, t, n) {
			if (gt(t)) {
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
					Ie(n, t), e.setAttribute(t, n);
				}
			}
		}
		function bt(e, t, n) {
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
				Ie(n, t), e.setAttribute(t, n);
			}
		}
		function xt(e, t, n, r) {
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
				Ie(r, n), e.setAttributeNS(t, n, r);
			}
		}
		function St(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Re(e), e;
				default: return "";
			}
		}
		function Ct(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function wt(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Re(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Re(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function Tt(e) {
			if (!e._valueTracker) {
				var t = Ct(e) ? "checked" : "value";
				e._valueTracker = wt(e, t, "" + e[t]);
			}
		}
		function Et(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = Ct(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
		}
		function j(e) {
			return e.replace(ig, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function Dt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || og || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Ae() || "A component", t.type), og = !0), t.value === void 0 || t.defaultValue === void 0 || ag || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Ae() || "A component", t.type), ag = !0);
		}
		function Ot(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (Ie(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : At(e, St(n)) : o === "number" && e.value == t ? At(e, St(e.value)) : At(e, St(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (Ie(s, "name"), e.name = "" + St(s)) : e.removeAttribute("name");
		}
		function kt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (Ie(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					Tt(e);
					return;
				}
				n = n == null ? "" : "" + St(n), t = t == null ? n : "" + St(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (Ie(o, "name"), e.name = o), Tt(e);
		}
		function At(e, t) {
			e.defaultValue !== "" + t && (e.defaultValue = "" + t);
		}
		function jt(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? vm.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || cg || (cg = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || lg || (lg = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || sg || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), sg = !0);
		}
		function Mt() {
			var e = Ae();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function Nt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + St(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function Pt(e, t) {
			for (e = 0; e < dg.length; e++) {
				var n = dg[e];
				if (t[n] != null) {
					var r = Hm(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Mt()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Mt());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || ug || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), ug = !0);
		}
		function Ft(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || fg || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", Ae() || "A component"), fg = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function It(e, t, n) {
			t != null && (t = "" + St(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + St(n);
		}
		function Lt(e, t, n, r) {
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
			n = St(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Tt(e);
		}
		function M(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? M(e.children[0], t) : e;
		}
		function Rt(e) {
			return "  " + "  ".repeat(e);
		}
		function zt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Bt(e) {
			return "- " + "  ".repeat(e);
		}
		function Vt(e) {
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
		function Ht(e, t) {
			return pg.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Ut(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return zt(n) + Ht(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), zt(n) + Ht(e, r) + "\n" + Bt(n) + Ht(t, r) + "\n";
			}
			return Rt(n) + Ht(e, r) + "\n";
		}
		function Wt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function N(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Hm(e)) return "[...]";
					if (e.$$typeof === Cm) return (t = fe(e.type)) ? "<" + t + ">" : "<...>";
					var n = Wt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = N(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
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
		function Gt(e, t) {
			return typeof e != "string" || pg.test(e) ? "{" + N(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Kt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Gt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function qt(e, t, n) {
			var r = "", i = U({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = N(e[a], o);
				t.hasOwnProperty(a) ? (o = N(t[a], o), r += zt(n) + a + ": " + s + "\n", r += Bt(n) + a + ": " + o + "\n") : r += zt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = N(i[c], 120 - 2 * n - c.length - 2), r += Bt(n) + c + ": " + e + "\n");
			return r;
		}
		function Jt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Kt(e, t, Rt(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Gt(l, s);
						s = Gt(c, s), typeof l == "object" && l && typeof c == "object" && c && Wt(l) === "Object" && Wt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Rt(r + 1) + o + "={{\n" + qt(l, c, r + 2) + Rt(r + 1) + "}}\n" : (i += zt(r + 1) + o + "=" + u + "\n", i += Bt(r + 1) + o + "=" + s + "\n");
					} else i += Rt(r + 1) + o + "=" + Gt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Bt(r + 1) + e + "=" + Gt(n[e], t) + "\n";
					}
				}), i = i === "" ? Rt(r) + "<" + e + ">\n" : Rt(r) + "<" + e + "\n" + i + Rt(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Ut(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Ut("" + t, null, r + 1) : i + Ut("" + t, void 0, r + 1)), i;
		}
		function Yt(e, t) {
			var n = Vt(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Yt(e, t), e = e.sibling;
				return n;
			}
			return Rt(t) + "<" + n + ">\n";
		}
		function Xt(e, t) {
			var n = M(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Rt(t) + "...\n" + Xt(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Rt(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Ut(i, e.serverProps, t), t++;
			else if (a = Vt(e.fiber), a !== null) {
				if (e.serverProps === void 0) {
					r = t;
					var o = 120 - 2 * r - a.length - 2, s = "";
					for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
						var c = Gt(i[l], 15);
						if (o -= l.length + c.length + 2, 0 > o) {
							s += " ...";
							break;
						}
						s += " " + l + "=" + c;
					}
					r = Rt(r) + "<" + a + s + ">\n", t++;
				} else e.serverProps === null ? (r = Kt(a, i, zt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Jt(a, i, e.serverProps, t), t++);
			}
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += Xt(o, t), a++) : l += Yt(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Rt(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Bt(t) + Ht(a, 120 - 2 * t) + "\n") : l + Kt(a.type, a.props, Bt(t));
			return n + r + l;
		}
		function Zt(e) {
			try {
				return "\n\n" + Xt(e, 0);
			} catch {
				return "";
			}
		}
		function Qt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Zt(i).replaceAll(/^[+-]/gm, ">");
		}
		function $t(e, t) {
			var n = U({}, e || vg), r = { tag: t };
			return hg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), gg.indexOf(t) !== -1 && (n.pTagInButtonScope = null), mg.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function en(e, t, n) {
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
		function tn(e, t) {
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
		function nn(e, t) {
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
		function rn(e, t) {
			t ||= vg;
			var n = t.current;
			if (t = (n = en(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : tn(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, yg[t]) return !1;
			yg[t] = !0;
			var i = (t = uh) ? nn(t.return, r) : null, a = t !== null && i !== null ? Qt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || A(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function an(e, t, n) {
			if (n || en("#text", t, !1)) return !0;
			if (n = "#text|" + t, yg[n]) return !1;
			yg[n] = !0;
			var r = (n = uh) ? nn(n, t) : null;
			return n = n !== null && r !== null ? Qt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function on(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function sn(e) {
			return e.replace(Tg, function(e, t) {
				return t.toUpperCase();
			});
		}
		function cn(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Dg.hasOwnProperty(t) && Dg[t] || (Dg[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, sn(t.replace(wg, "ms-")))) : Cg.test(t) ? Dg.hasOwnProperty(t) && Dg[t] || (Dg[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Eg.test(n) || Og.hasOwnProperty(n) && Og[n] || (Og[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Eg, ""))), typeof n == "number" && (isNaN(n) ? kg || (kg = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Ag || (Ag = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || jg.has(t) ? t === "float" ? e.cssFloat = n : (Le(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function ln(e, t, n) {
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
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && (cn(e, f, l), rg = !0);
			} else for (r in t) t.hasOwnProperty(r) && cn(e, r, t[r]);
		}
		function un(e) {
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
		function dn(e) {
			return Pg.get(e) || e;
		}
		function fn(e, t) {
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
		function P(e, t) {
			var n = [], r;
			for (r in t) fn(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function pn(e, t, n, r) {
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
		function mn(e, t, n) {
			var r = [], i;
			for (i in t) pn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function hn(e) {
			return Kg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function gn() {}
		function _n(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function vn(e) {
			var t = ct(e);
			if (t && (e = t.stateNode)) {
				var n = e[Hh] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (Ot(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (Ie(t, "name"), n = n.querySelectorAll("input[name=\"" + j("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Hh] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									Ot(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Et(r);
						}
						break a;
					case "textarea":
						It(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && Nt(e, !!n.multiple, t, !1);
				}
			}
		}
		function yn(e, t, n) {
			if (Xg) return e(t, n);
			Xg = !0;
			try {
				return e(t);
			} finally {
				if (Xg = !1, (Jg !== null || Yg !== null) && (iu(), Jg && (t = Jg, e = Yg, Yg = Jg = null, vn(t), e))) for (t = 0; t < e.length; t++) vn(e[t]);
			}
		}
		function bn(e, t) {
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
		function xn() {
			if (n_) return n_;
			var e, t = t_, n = t.length, r, i = "value" in e_ ? e_.value : e_.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return n_ = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function Sn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function Cn() {
			return !0;
		}
		function wn() {
			return !1;
		}
		function Tn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Cn : wn, this.isPropagationStopped = wn, this;
			}
			return U(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Cn);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Cn);
				},
				persist: function() {},
				isPersistent: Cn
			}), t;
		}
		function En(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = b_[e]) ? !!t[e] : !1;
		}
		function Dn() {
			return En;
		}
		function On(e, t) {
			switch (e) {
				case "keyup": return O_.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== k_;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function kn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function An(e, t) {
			switch (e) {
				case "compositionend": return kn(t);
				case "keypress": return t.which === P_ ? (I_ = !0, F_) : null;
				case "textInput": return e = t.data, e === F_ && I_ ? null : e;
				default: return null;
			}
		}
		function jn(e, t) {
			if (L_) return e === "compositionend" || !A_ && On(e, t) ? (e = xn(), n_ = t_ = e_ = null, L_ = !1, e) : null;
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
		function Mn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!R_[e.type] : t === "textarea";
		}
		function Nn(e) {
			if (!Zg) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function Pn(e, t, n, r) {
			Jg ? Yg ? Yg.push(r) : Yg = [r] : Jg = r, t = hd(t, "onChange"), 0 < t.length && (n = new i_("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function Fn(e) {
			ld(e, 0);
		}
		function In(e) {
			if (Et(lt(e))) return e;
		}
		function Ln(e, t) {
			if (e === "change") return t;
		}
		function Rn() {
			z_ && (z_.detachEvent("onpropertychange", zn), B_ = z_ = null);
		}
		function zn(e) {
			if (e.propertyName === "value" && In(B_)) {
				var t = [];
				Pn(t, B_, e, _n(e)), yn(Fn, t);
			}
		}
		function Bn(e, t, n) {
			e === "focusin" ? (Rn(), z_ = t, B_ = n, z_.attachEvent("onpropertychange", zn)) : e === "focusout" && Rn();
		}
		function Vn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return In(B_);
		}
		function Hn(e, t) {
			if (e === "click") return In(t);
		}
		function Un(e, t) {
			if (e === "input" || e === "change") return In(t);
		}
		function Wn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Gn(e, t) {
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
		function Kn(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function qn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Jn(e, t) {
			var n = qn(e);
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
				n = qn(n);
			}
		}
		function Yn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Yn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function Xn(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = Kn(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = Kn(e.document);
			}
			return t;
		}
		function Zn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Qn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			q_ || W_ == null || W_ !== Kn(r) || (r = W_, "selectionStart" in r && Zn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), K_ && Gn(K_, r) || (K_ = r, r = hd(G_, "onSelect"), 0 < r.length && (t = new i_("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = W_)));
		}
		function $n(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function er(e) {
			if (Y_[e]) return Y_[e];
			if (!J_[e]) return e;
			var t = J_[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in X_) return Y_[e] = t[n];
			return e;
		}
		function tr(e, t) {
			iv.set(e, t), pt(t, [e]);
		}
		function nr(e, t) {
			if (e.name != null && e.name !== "auto") return e.name;
			if (t.autoName !== null) return t.autoName;
			e = iw.identifierPrefix;
			var n = ov++;
			return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
		}
		function rr(e) {
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
		function ir(e, t) {
			return e = rr(e), t = rr(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
		}
		function ar(e) {
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
		function or(e, t, n, r) {
			if (!ArrayBuffer.isView(e)) {
				var i = 0, a;
				for (a in e) if (fh.call(e, a) && a[0] !== "_" && (i++, cr(a, e[a], t, n, r), i >= _v)) {
					t.push([r + "\xA0\xA0".repeat(n) + "Only " + _v + " properties are shown. React will not log more properties of this object.", ""]);
					break;
				}
			}
		}
		function sr(e) {
			return "$$typeof" in e && fh.call(e, "$$typeof") ? e.$$typeof : void 0;
		}
		function cr(e, t, n, r, i) {
			switch (typeof t) {
				case "object":
					if (t === null) {
						t = "null";
						break;
					}
					if (sr(t) === Cm) {
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
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && cr("key", o, n, r + 1, i), e = !1, o = 0, t) if (o++, l === "children" ? t.children != null && (!Hm(t.children) || 0 < t.children.length) && (e = !0) : fh.call(t, l) && l[0] !== "_" && cr(l, t[l], n, r + 1, i), o >= _v) break;
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), ArrayBuffer.isView(t)) {
						t = t.length, t = typeof t == "number" ? a + "(" + t + ")" : a;
						break;
					}
					if (a === "Array") {
						if (l = t.length > _v, o = ar(t), o === hv || o === pv) {
							t = JSON.stringify(l ? t.slice(0, _v).concat("…") : t);
							break;
						}
						if (o === gv) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length && e < _v; e++) a = t[e], cr(a[0], a[1], n, r + 1, i);
							l && cr(_v.toString(), "…", n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, cr(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, cr(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && or(t, n, r + 1, i);
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
		function lr(e, t, n, r) {
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
							if (typeof s == "object" && typeof c == "object" && s !== null && c !== null && sr(s) === sr(c)) {
								if (sr(c) === Cm) {
									if (s.type === c.type && s.key === c.key) {
										s = fe(c.type) || "…", i = "\xA0\xA0".repeat(r) + o, s = "<" + s + " … />", n.push([vv + i, s], [yv + i, s]), i = !1;
										continue;
									}
								} else {
									var l = Object.prototype.toString.call(s), u = Object.prototype.toString.call(c);
									if (l === u && (u === "[object Object]" || u === "[object Array]")) {
										l = [bv + "\xA0\xA0".repeat(r) + o, u === "[object Array]" ? "Array" : ""], n.push(l), u = n.length, lr(s, c, n, r + 1) ? u === n.length && (l[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
										continue;
									}
								}
							} else if (typeof s == "function" && typeof c == "function" && s.name === c.name && s.length === c.length && (l = Function.prototype.toString.call(s), u = Function.prototype.toString.call(c), l === u)) {
								s = c.name === "" ? "() => {}" : c.name + "() {}", n.push([bv + "\xA0\xA0".repeat(r) + o, s + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						cr(o, s, n, r, vv), cr(o, c, n, r, yv), i = !1;
					}
				} else n.push([yv + "\xA0\xA0".repeat(r) + o, "…"]), i = !1;
				a++;
			}
			return i;
		}
		function ur(e) {
			wv = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function dr(e, t, n, r) {
			xv && (Dv.start = t, Dv.end = n, Ev.color = "warning", Ev.tooltipText = r, Ev.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, Dv)) : performance.measure(r, Dv), performance.clearMeasures(r));
		}
		function fr(e, t, n) {
			dr(e, t, n, "Reconnect");
		}
		function pr(e, t, n, r, i) {
			var a = D(e);
			if (a !== null && xv) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				s = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				r = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Ov], l = lr(o.memoizedProps, l, c, 0), 1 < c.length ? (l && !Tv && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Tv = !0, c[0] = Av, Ev.color = "warning", Ev.tooltipText = kv) : (Ev.color = s, Ev.tooltipText = a), Ev.properties = c, Dv.start = t, Dv.end = n, e = "​" + a, r == null ? performance.measure(e, Dv) : r.run(performance.measure.bind(performance, e, Dv)), performance.clearMeasures(e)) : r == null ? console.timeStamp(a, t, n, Sv, void 0, s) : r.run(console.timeStamp.bind(console, a, t, n, Sv, void 0, s))) : r == null ? console.timeStamp(a, t, n, Sv, void 0, s) : r.run(console.timeStamp.bind(console, a, t, n, Sv, void 0, s));
			}
		}
		function mr(e, t, n, r) {
			if (xv) {
				var i = D(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && cr("key", e.key, o, 0, ""), e.memoizedProps !== null && or(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
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
		function hr(e, t, n, r, i) {
			if (i !== null) {
				if (xv) {
					var a = D(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && cr("key", e.key, r, 0, ""), e.memoizedProps !== null && or(e.memoizedProps, r, 0, ""), t = {
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
		function gr(e, t, n, r) {
			!xv || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, wv, Cv, n)) : console.timeStamp("Prewarm", e, t, wv, Cv, n));
		}
		function _r(e, t, n, r) {
			!xv || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, wv, Cv, n)) : console.timeStamp("Suspended", e, t, wv, Cv, n));
		}
		function vr(e, t, n, r) {
			!xv || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, wv, Cv, "error")) : console.timeStamp("Errored", e, t, wv, Cv, "error"));
		}
		function yr(e, t, n, r) {
			!xv || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, wv, Cv, "secondary-light")) : console.timeStamp(n, e, t, wv, Cv, "secondary-light"));
		}
		function br(e, t, n, r, i) {
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
		function xr(e, t, n, r, i) {
			n === null ? !xv || t <= e || (i ? i.run(console.timeStamp.bind(console, r ? "Commit Interrupted View Transition" : "Commit", e, t, wv, Cv, r ? "error" : "secondary-dark")) : console.timeStamp(r ? "Commit Interrupted View Transition" : "Commit", e, t, wv, Cv, r ? "error" : "secondary-dark")) : br(e, t, n, !1, i);
		}
		function Sr(e, t, n) {
			!xv || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, wv, Cv, "secondary-dark")) : console.timeStamp("Animating", e, t, wv, Cv, "secondary-dark"));
		}
		function Cr() {
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
				a !== 0 && Dr(n, i, a);
			}
		}
		function wr(e, t, n, r) {
			Nv[Pv++] = e, Nv[Pv++] = t, Nv[Pv++] = n, Nv[Pv++] = r, Fv |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function Tr(e, t, n, r) {
			return wr(e, t, n, r), Or(e);
		}
		function Er(e, t) {
			return wr(e, null, null, t), Or(e);
		}
		function Dr(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & jv || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ah(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function Or(e) {
			if (vw > _w) throw Cw = vw = 0, ww = yw = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Cw > Sw && (Cw = 0, ww = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && qu(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && qu(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function kr(e) {
			if (Lv === null) return e;
			var t = Lv(e);
			return t === void 0 ? e : t.current;
		}
		function Ar(e, t) {
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
		function jr(e) {
			Lv !== null && typeof WeakSet == "function" && (Rv === null && (Rv = /* @__PURE__ */ new WeakSet()), Rv.add(e));
		}
		function Mr(e, t, n) {
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
				if (c = l = !1, u !== null && (u = d(u), u !== void 0 && (n.has(u) ? c = !0 : t.has(u) && (s === 1 ? c = !0 : l = !0))), c || r === null || (s = d(r), s !== void 0 && n.has(s) ? c = !0 : typeof r == "object" && r.$$typeof === Pm && (s = r._payload, s._status === 1 && (s = d(s._result.default), s !== void 0 && n.has(s) && (c = !0)))), Rv !== null && (Rv.has(e) || i !== null && Rv.has(i)) && (c = !0), c && (e._debugNeedsRemount = !0), (c || l) && (i = Er(e, 2), i !== null && $l(i, e, 2)), a === null || c || Mr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function Nr(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Uv || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function Pr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Fr(e, t) {
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
				case 11: n.type = kr(e.type);
			}
			return n;
		}
		function Ir(e, t) {
			e.flags &= 1206910978;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Lr(e, t, n, r, i, a) {
			var o = 0, s = kr(e);
			if (typeof s == "function") Pr(s) && (o = 1);
			else if (typeof s == "string") o = be(), o = Ap(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (s) {
				case Fm: return t = h(31, n, t, i), t.elementType = Fm, t.lanes = a, t;
				case Tm: return zr(n.children, i, a, t);
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
		function Rr(e, t, n) {
			return t = Lr(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function zr(e, t, n, r) {
			return e = h(7, e, r, t), e.lanes = n, e;
		}
		function Br(e, t, n) {
			return e = h(6, e, null, t), e.lanes = n, e;
		}
		function Vr(e) {
			var t = h(18, null, null, G);
			return t.stateNode = e, t;
		}
		function Hr(e, t, n) {
			return t = h(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Ur(e, t) {
			if (typeof e == "object" && e) {
				var n = Wv.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: ke(t)
				}, Wv.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: ke(t)
			};
		}
		function Wr(e, t) {
			Xr(), Gv[Kv++] = Jv, Gv[Kv++] = qv, qv = e, Jv = t;
		}
		function Gr(e, t, n) {
			Xr(), Yv[Xv++] = Qv, Yv[Xv++] = $v, Yv[Xv++] = Zv, Zv = e;
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
		function Kr(e) {
			Xr(), e.return !== null && (Wr(e, 1), Gr(e, 1, 0));
		}
		function qr(e) {
			for (; e === qv;) qv = Gv[--Kv], Gv[Kv] = null, Jv = Gv[--Kv], Gv[Kv] = null;
			for (; e === Zv;) Zv = Yv[--Xv], Yv[Xv] = null, $v = Yv[--Xv], Yv[Xv] = null, Qv = Yv[--Xv], Yv[Xv] = null;
		}
		function Jr() {
			return Xr(), Zv === null ? null : {
				id: Qv,
				overflow: $v
			};
		}
		function Yr(e, t) {
			Xr(), Yv[Xv++] = Qv, Yv[Xv++] = $v, Yv[Xv++] = Zv, Qv = t.id, $v = t.overflow, Zv = e;
		}
		function Xr() {
			q || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Zr(e, t) {
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
			var n = Zr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Qr() {
			q && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function $r(e, t) {
			ny || (e = Zr(e, 0), e.serverProps = null, t !== null && (t = tp(t), e.serverTail.push(t)));
		}
		function ei(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = ry;
			throw r !== null && (ry = null, n = Zt(r)), oi(Ur(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), oy;
		}
		function ti(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Vh] = e, t[Hh] = r, vd(n, r), n) {
				case "dialog":
					V("cancel", t), V("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					V("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < zw.length; n++) V(zw[n], t);
					break;
				case "source":
					V("error", t);
					break;
				case "img":
				case "image":
				case "link":
					V("error", t), V("load", t);
					break;
				case "details":
					V("toggle", t);
					break;
				case "input":
					ht("input", r), V("invalid", t), Dt(t, r), kt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					jt(t, r);
					break;
				case "select":
					ht("select", r), V("invalid", t), Pt(t, r);
					break;
				case "textarea": ht("textarea", r), V("invalid", t), Ft(t, r), Lt(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Ed(t.textContent, n) ? (r.popover != null && (V("beforetoggle", t), V("toggle", t)), r.onScroll != null && V("scroll", t), r.onScrollEnd != null && V("scrollend", t), r.onClick != null && (t.onclick = gn), t = !0) : t = !1, t || ei(e, !0);
		}
		function ni(e) {
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
		function ri(e) {
			if (e !== ey) return !1;
			if (!q) return ni(e), q = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Jd(e.type, e.memoizedProps)), n = !n), n && ty) {
				for (n = ty; n;) {
					var r = Zr(e, 0), i = tp(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? rp(n) : ep(n.nextSibling);
				}
				ei(e);
			}
			if (ni(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				ty = rp(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				ty = rp(e);
			} else t === 27 ? (t = ty, of(e.type) ? (e = FT, FT = null, ty = e) : ty = t) : ty = ey ? ep(e.stateNode.nextSibling) : null;
			return !0;
		}
		function ii() {
			ty = ey = null, ny = q = !1;
		}
		function ai() {
			var e = iy;
			return e !== null && (LC === null ? LC = e : LC.push.apply(LC, e), iy = null), e;
		}
		function oi(e) {
			iy === null ? iy = [e] : iy.push(e);
		}
		function si() {
			var e = ry;
			if (e !== null) {
				ry = null;
				for (var t = Zt(e); 0 < e.children.length;) e = e.children[0];
				A(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function ci() {
			dy = uy = null, fy = !1;
		}
		function li(e, t, n) {
			ge(sy, t._currentValue, e), t._currentValue = n, ge(cy, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== ly && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = ly;
		}
		function ui(e, t) {
			e._currentValue = sy.current;
			var n = cy.current;
			he(cy, t), e._currentRenderer = n, he(sy, t);
		}
		function di(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function fi(e, t, n, r) {
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
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), di(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), di(o, n, e), o = null;
				} else i.tag === 13 && i.memoizedState !== null && i.memoizedState.dehydrated === null ? (i.lanes |= n, o = i.alternate, o !== null && (o.lanes |= n), di(i.return, n, e), o = i.child, o = o === null ? null : o.sibling) : o = i.child;
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
		function pi(e, t, n, r) {
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
			return e !== null && fi(t, e, n, r), t.flags |= 262144, e !== null;
		}
		function mi(e) {
			for (e = e.firstContext; e !== null;) {
				if (!H_(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function hi(e) {
			uy = e, dy = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function gi(e) {
			return fy && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), vi(uy, e);
		}
		function _i(e, t) {
			return uy === null && hi(e), vi(e, t);
		}
		function vi(e, t) {
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
		function yi() {
			return {
				controller: new py(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function bi(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function xi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && my(hy, function() {
				e.controller.abort();
			});
		}
		function Si(e, t) {
			if (e.pendingLanes & 4194048) {
				var n = e.transitionTypes;
				for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
					var r = t[e];
					n.indexOf(r) === -1 && n.push(r);
				}
			}
		}
		function Ci(e) {
			var t = e.transitionTypes;
			return e.transitionTypes = null, t;
		}
		function wi(e, t, n) {
			e & 127 ? 0 > My && (My = vy(), Ny = yy(t), Fy = t, n != null && (Iy = D(n)), (fC & (rC | iC)) !== nC && (Ay = !0, Py = by), e = Zd(), t = Xd(), e !== zy || t !== Ry ? zy = -1.1 : t !== null && (Py = by), Ly = e, Ry = t) : e & 4194048 && 0 > Uy && (Uy = vy(), Gy = yy(t), Ky = t, n != null && (qy = D(n)), 0 > Hy) && (e = Zd(), t = Xd(), (e !== Xy || t !== Yy) && (Xy = -1.1), Jy = e, Yy = t);
		}
		function Ti(e) {
			if (0 > My) {
				My = vy(), Ny = e._debugTask == null ? null : e._debugTask, (fC & (rC | iC)) !== nC && (Py = by);
				var t = Zd(), n = Xd();
				t !== zy || n !== Ry ? zy = -1.1 : n !== null && (Py = by), Ly = t, Ry = n;
			}
			0 > Uy && (Uy = vy(), Gy = e._debugTask == null ? null : e._debugTask, 0 > Hy) && (e = Zd(), t = Xd(), (e !== Xy || t !== Yy) && (Xy = -1.1), Jy = e, Yy = t);
		}
		function Ei() {
			var e = Dy;
			return Dy = 0, e;
		}
		function Di(e) {
			var t = Dy;
			return Dy = e, t;
		}
		function Oi(e) {
			var t = Dy;
			return Dy += e, t;
		}
		function ki() {
			Y = J = -1.1;
		}
		function Ai() {
			var e = J;
			return J = -1.1, e;
		}
		function ji(e) {
			0 <= e && (J = e);
		}
		function Mi() {
			var e = Oy;
			return Oy = -0, e;
		}
		function Ni(e) {
			0 <= e && (Oy = e);
		}
		function Pi() {
			var e = ky;
			return ky = null, e;
		}
		function Fi() {
			var e = Ay;
			return Ay = !1, e;
		}
		function Ii(e) {
			Ey = vy(), 0 > e.actualStartTime && (e.actualStartTime = Ey);
		}
		function Li(e) {
			if (0 <= Ey) {
				var t = vy() - Ey;
				e.actualDuration += t, e.selfBaseDuration = t, Ey = -1;
			}
		}
		function Ri(e) {
			if (0 <= Ey) {
				var t = vy() - Ey;
				e.actualDuration += t, Ey = -1;
			}
		}
		function zi() {
			if (0 <= Ey) {
				var e = vy(), t = e - Ey;
				Ey = -1, Dy += t, Oy += t, Y = e;
			}
		}
		function Bi(e) {
			ky === null && (ky = []), ky.push(e), Ty === null && (Ty = []), Ty.push(e);
		}
		function Vi() {
			Ey = vy(), 0 > J && (J = Ey);
		}
		function Hi(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Ui(e, t) {
			if (ob === null) {
				var n = ob = [];
				sb = 0, cb = od(), lb = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return sb++, t.then(Wi, Wi), t;
		}
		function Wi() {
			if (--sb === 0 && (-1 < Uy || (Hy = -1.1), _y = null, ob !== null)) {
				lb !== null && (lb.status = "fulfilled");
				var e = ob;
				ob = null, cb = 0, lb = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Gi(e, t) {
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
		function Ki() {
			var e = db.current;
			return e === null ? pC.pooledCache : e;
		}
		function qi(e, t) {
			t === null ? ge(db, db.current, e) : ge(db, t.pool, e);
		}
		function Ji() {
			var e = Ki();
			return e === null ? null : {
				parent: gy._currentValue,
				pool: e
			};
		}
		function Yi() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Xi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Zi(e, t, n, r) {
			W.actQueue !== null && (W.didUsePromise = !0);
			var i = e.thenables;
			if (n = i[n], n === void 0 ? i.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(gn, gn), t = n), t._debugInfo === void 0) {
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
				case "rejected": throw r = t.reason, ea(r), r === void 0 && !("reason" in t) ? Error("A rejected Promise was passed to React without a `reason` property. React threw a generic error from where the Promise was used to assist in identifying the problematic Promise. Make sure that instrumented Promises correctly set the `reason` property when setting `status` to `'rejected'`.") : r;
				default:
					if (typeof t.status == "string") t.then(gn, gn);
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
						case "rejected": throw r = t.reason, ea(r), r;
					}
					throw Jb = t, Yb = !0, qb || r === null || r.alternate !== null || (Gb = r, Kb = Error("This library called use() to suspend in a previous render but did not call use() when it finished. This indicates an incorrect use of use(). Learn more: https://react.dev/warnings/conditional-use-of-use")), Vb;
			}
		}
		function Qi(e) {
			try {
				return Bb(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Jb = e, Yb = !0, Vb) : e;
			}
		}
		function $i() {
			if (Jb === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Jb;
			return Jb = null, Yb = !1, e;
		}
		function ea(e) {
			if (e === Vb || e === Ub) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function ta(e, t) {
			return e === t ? !0 : e.tag !== t.tag || e.type !== t.type || e.key !== t.key || e.index !== t.index || e.tag === 3 && e.stateNode !== t.stateNode || e.return === null || t.return === null ? !1 : ta(e.return, t.return);
		}
		function na(e) {
			var t = Qb;
			return e != null && (Qb = t === null ? e : t.concat(e)), t;
		}
		function ra() {
			var e = Qb;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function ia(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key" && a !== "ref") {
					t === null && (t = Rr(e, n.mode, 0), t._debugInfo = Qb, t.return = n), A(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key`, `ref`, and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function aa(e) {
			var t = Zb;
			return Zb += 1, Xb === null && (Xb = Yi()), Zi(Xb, e, t, null);
		}
		function oa(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function sa(e, t) {
			throw t.$$typeof === Sm ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function ca(e, t) {
			var n = ra();
			n === null ? sa(e, t) : n.run(sa.bind(null, e, t));
		}
		function la(e, t) {
			var n = D(e) || "Component";
			nx[n] || (nx[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function F(e, t) {
			var n = ra();
			n === null ? la(e, t) : n.run(la.bind(null, e, t));
		}
		function ua(e, t) {
			var n = D(e) || "Component";
			rx[n] || (rx[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function da(e, t) {
			var n = ra();
			n === null ? ua(e, t) : n.run(ua.bind(null, e, t));
		}
		function fa(e) {
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
				return e = Fr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 134217730), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = Br(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Qb, t) : (t = i(t, n), t.return = e, t._debugInfo = Qb, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Tm ? (t = u(e, t, n.props.children, r, n.key), oa(t, n), ia(n, t, e), t) : t !== null && (t.elementType === a || Ar(t, n) || typeof a == "object" && a && a.$$typeof === Pm && Qi(a) === t.type) ? (t = i(t, n.props), oa(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Qb, t) : (t = Rr(n, e.mode, r), oa(t, n), t.return = e, t._debugInfo = Qb, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Hr(n, e.mode, r), t.return = e, t._debugInfo = Qb, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Qb, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = zr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Qb, t) : (t = i(t, n), t.return = e, t._debugInfo = Qb, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Br("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Qb, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Cm: return n = Rr(t, e.mode, n), oa(n, t), n.return = e, e = na(t._debugInfo), n._debugInfo = Qb, Qb = e, n;
						case wm: return t = Hr(t, e.mode, n), t.return = e, t._debugInfo = Qb, t;
						case Pm:
							var r = na(t._debugInfo);
							return t = Qi(t), e = d(e, t, n), Qb = r, e;
					}
					if (Hm(t) || de(t)) return n = zr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = na(t._debugInfo), n._debugInfo = Qb, Qb = e, n;
					if (typeof t.then == "function") return r = na(t._debugInfo), e = d(e, aa(t), n), Qb = r, e;
					if (t.$$typeof === km) return d(e, _i(e, t), n);
					ca(e, t);
				}
				return typeof t == "function" && F(e, t), typeof t == "symbol" && da(e, t), null;
			}
			function p(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Cm: return n.key === i ? (i = na(n._debugInfo), e = c(e, t, n, r), Qb = i, e) : null;
						case wm: return n.key === i ? l(e, t, n, r) : null;
						case Pm: return i = na(n._debugInfo), n = Qi(n), e = p(e, t, n, r), Qb = i, e;
					}
					if (Hm(n) || de(n)) return i === null ? (i = na(n._debugInfo), e = u(e, t, n, r, null), Qb = i, e) : null;
					if (typeof n.then == "function") return i = na(n._debugInfo), e = p(e, t, aa(n), r), Qb = i, e;
					if (n.$$typeof === km) return p(e, t, _i(e, n), r);
					ca(e, n);
				}
				return typeof n == "function" && F(e, n), typeof n == "symbol" && da(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Cm: return n = e.get(r.key === null ? n : r.key) || null, e = na(r._debugInfo), t = c(t, n, r, i), Qb = e, t;
						case wm: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Pm:
							var a = na(r._debugInfo);
							return r = Qi(r), t = m(e, t, n, r, i), Qb = a, t;
					}
					if (Hm(r) || de(r)) return n = e.get(n) || null, e = na(r._debugInfo), t = u(t, n, r, i, null), Qb = e, t;
					if (typeof r.then == "function") return a = na(r._debugInfo), t = m(e, t, n, aa(r), i), Qb = a, t;
					if (r.$$typeof === km) return m(e, t, n, _i(t, r), i);
					ca(t, r);
				}
				return typeof r == "function" && F(t, r), typeof r == "symbol" && da(t, r), null;
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
						A(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Pm: n = Qi(n), g(e, t, n, r);
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
				if (_ === s.length) return n(i, h), q && Wr(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), f === null ? u = h : f.sibling = h, f = h);
					return q && Wr(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && (y = v.alternate, y !== null && h.delete(y.key === null ? _ : y.key)), o = a(v, o, _), f === null ? u = v : f.sibling = v, f = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), q && Wr(i, _), u;
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
				if (y.done) return n(i, f), q && Wr(i, h), l;
				if (f === null) {
					for (; !y.done; h++, y = s.next()) f = d(i, y.value, c), f !== null && (v = g(i, f, y.value, v), o = a(f, o, h), u === null ? l = f : u.sibling = f, u = f);
					return q && Wr(i, h), l;
				}
				for (f = r(f); !y.done; h++, y = s.next()) _ = m(f, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && (y = _.alternate, y !== null && f.delete(y.key === null ? h : y.key)), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && f.forEach(function(e) {
					return t(i, e);
				}), q && Wr(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Tm && a.key === null && a.props.ref === void 0 && (ia(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Cm:
							var c = na(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Tm) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), oa(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Qb, ia(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || Ar(r, a) || typeof l == "object" && l && l.$$typeof === Pm && Qi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), oa(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Qb, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								a.type === Tm ? (s = zr(a.props.children, e.mode, s, a.key), oa(s, a), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Qb, ia(a, s, e), e = s) : (s = Rr(a, e.mode, s), oa(s, a), s.return = e, s._debugInfo = Qb, e = s);
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
								s = Hr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Pm: return c = na(a._debugInfo), a = Qi(a), e = y(e, r, a, s), Qb = c, e;
					}
					if (Hm(a)) return _(e, r, a, s);
					if (de(a)) {
						if (c = a, a = de(c), typeof a != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						return l = a.call(c), l === c ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(l) !== "[object Generator]") && (ex || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), ex = !0) : c.entries !== a || $b || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), $b = !0), v(e, r, l, s);
					}
					if (typeof a.then == "function") return c = na(a._debugInfo), e = y(e, r, aa(a), s), Qb = c, e;
					if (a.$$typeof === km) return y(e, r, _i(e, a), s);
					ca(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = Br(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Qb, e = s), o(e)) : (typeof a == "function" && F(e, a), typeof a == "symbol" && da(e, a), n(e, r));
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
		function pa(e, t) {
			var n = Hm(e);
			return e = !n && typeof de(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function ma(e) {
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
		function ha(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function ga(e) {
			return {
				lane: e,
				tag: ox,
				payload: null,
				callback: null,
				next: null
			};
		}
		function _a(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, fx === r && !dx) {
				var i = D(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), dx = !0;
			}
			return (fC & rC) === nC ? (wr(e, r, t, n), Or(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Or(e), Dr(e, null, n), t);
		}
		function va(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Qe(e, n);
			}
		}
		function ya(e, t) {
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
		function ba() {
			if (px) {
				var e = lb;
				if (e !== null) throw e;
			}
		}
		function xa(e, t, n, r) {
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
											Be(!0);
											try {
												m.call(g, d, h);
											} finally {
												Be(!1);
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
											Be(!0);
											try {
												_.call(g, d, h);
											} finally {
												Be(!1);
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
		function Sa(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function Ca(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) Sa(n[e], t);
		}
		function wa(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Sa(n[e], t);
		}
		function Ta(e, t) {
			var n = kC;
			ge(hx, n, e), ge(mx, t, e), kC = n | t.baseLanes;
		}
		function Ea(e) {
			ge(hx, kC, e), ge(mx, mx.current, e);
		}
		function Da(e) {
			kC = hx.current, he(mx, e), he(hx, e);
		}
		function Oa(e) {
			var t = e.alternate;
			ge(bx, bx.current & vx, e), ge(gx, e, e), _x === null && (t === null || mx.current !== null || t.memoizedState !== null) && (_x = e);
		}
		function ka(e) {
			ge(bx, bx.current, e), ge(gx, e, e), _x === null && (_x = e);
		}
		function Aa(e) {
			e.tag === 22 ? (ge(bx, bx.current, e), ge(gx, e, e), _x === null && (_x = e)) : ja(e);
		}
		function ja(e) {
			ge(bx, bx.current, e), ge(gx, gx.current, e);
		}
		function Ma(e) {
			he(gx, e), _x === e && (_x = null), he(bx, e);
		}
		function Na(e, t) {
			ge(gx, gx.current, e), ge(bx, t, e);
		}
		function Pa(e) {
			he(bx, e), he(gx, e), _x === e && (_x = null);
		}
		function Fa(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || H(n) || Qf(n))) return t;
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
		function I() {
			var e = Z;
			Hx === null ? Hx = [e] : Hx.push(e);
		}
		function L() {
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
		function Ia(e) {
			e == null || Hm(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function La() {
			var e = D(X);
			Ax.has(e) || (Ax.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function Ra() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function za(e, t) {
			if (Wx) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!H_(e[n], t[n])) return !1;
			return !0;
		}
		function Ba(e, t, n, r, i, a) {
			jx = a, X = t, Hx = e === null ? null : e._debugHookTypes, Ux = -1, Wx = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = D(X), kx.has(a) || (kx.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, W.H = e !== null && e.memoizedState !== null ? Jx : Hx === null ? Kx : qx, Ix = a = (t.mode & Bv) !== G;
			var o = wb(n, r, i);
			if (Ix = !1, Fx && (o = Ha(t, n, r, i)), a) {
				Be(!0);
				try {
					o = Ha(t, n, r, i);
				} finally {
					Be(!1);
				}
			}
			return Va(e, t), o;
		}
		function Va(e, t) {
			t._debugHookTypes = Hx, t.dependencies === null ? zx !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: zx
			}) : t.dependencies._debugThenableState = zx;
			var n = zx;
			if (Gb !== null && ta(Gb, t) && (n !== null || Kb === null || qb || (qb = !0, console.error(Kb)), Kb = Gb = null), W.H = Gx, n = Mx !== null && Mx.next !== null, jx = 0, Hx = Z = Nx = Mx = X = null, Ux = -1, e !== null && (e.flags & 1206910976) != (t.flags & 1206910976) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Px = !1, Rx = 0, zx = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || mS || (e = e.dependencies, e !== null && mi(e) && (mS = !0)), Yb ? (Yb = !1, e = !0) : e = !1, e && (t = D(t) || "Unknown", Ox.has(t) || kx.has(t) || (Ox.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Ha(e, t, n, r) {
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
		function Ua() {
			var e = W.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Xa(t) : t, e = e.useState()[0], (Mx === null ? null : Mx.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Wa() {
			var e = Lx !== 0;
			return Lx = 0, e;
		}
		function Ga(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Vv) === G ? t.flags & -2053 : t.flags & -805308421, e.lanes &= ~n;
		}
		function Ka(e) {
			if (Px) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Px = !1;
			}
			jx = 0, Hx = Nx = Mx = X = null, Ux = -1, Z = null, Fx = !1, Rx = Lx = 0, zx = null;
		}
		function qa() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Nx === null ? X.memoizedState = Nx = e : Nx = Nx.next = e, Nx;
		}
		function Ja() {
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
		function Ya() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Xa(e) {
			var t = Rx;
			return Rx += 1, zx === null && (zx = Yi()), e = Zi(zx, e, t, X), t = X, (Nx === null ? t.memoizedState : Nx.next) === null && (t = t.alternate, W.H = t !== null && t.memoizedState !== null ? Jx : Kx), e;
		}
		function Za(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Xa(e);
				if (e.$$typeof === zm) return;
				if (e.$$typeof === km) return gi(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Qa(e) {
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
			}, n === null && (n = Ya(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Wx) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Lm;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function $a(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function eo(e, t, n) {
			var r = qa();
			if (n !== void 0) {
				var i = n(t);
				if (Ix) {
					Be(!0);
					try {
						n(t);
					} finally {
						Be(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = cs.bind(null, X, e), [r.memoizedState, e];
		}
		function to(e) {
			return no(Ja(), Mx, e);
		}
		function no(e, t, n) {
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
		function ro(e) {
			var t = Ja(), n = t.queue;
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
		function io(e, t, n) {
			var r = X, i = qa();
			if (q) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				Ex || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), Ex = !0);
			} else {
				if (a = t(), Ex || (n = t(), H_(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Ex = !0)), pC === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || oo(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, Po(co.bind(null, r, n, e), [e]), r.flags |= 2048, Ao(Sx | Tx, { destroy: void 0 }, so.bind(null, r, n, a, t), null), a;
		}
		function ao(e, t, n) {
			var r = X, i = Ja(), a = q;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !Ex) {
				var o = t();
				H_(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Ex = !0);
			}
			if ((o = !H_((Mx || i).memoizedState, n)) && (i.memoizedState = n, mS = !0), i = i.queue, No(2048, Tx, co.bind(null, r, i, e), [e]), e = i.getSnapshot !== t || o || Nx !== null && (Nx.memoizedState.tag & Sx) !== xx, Ao(e ? Sx | Tx : Tx, { destroy: void 0 }, so.bind(null, r, i, n, t), null), e) {
				if (r.flags |= 2048, pC === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || jx & 127 || oo(r, t, n);
			}
			return n;
		}
		function oo(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = Ya(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function so(e, t, n, r) {
			t.value = n, t.getSnapshot = r, lo(t) && uo(e);
		}
		function co(e, t, n) {
			return n(function() {
				lo(t) && (wi(2, "updateSyncExternalStore()", e), uo(e));
			});
		}
		function lo(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !H_(e, n);
			} catch {
				return !0;
			}
		}
		function uo(e) {
			var t = Er(e, 2);
			t !== null && $l(t, e, 2);
		}
		function fo(e) {
			var t = qa();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Ix) {
					Be(!0);
					try {
						n();
					} finally {
						Be(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: $a,
				lastRenderedState: e
			}, t;
		}
		function po(e) {
			e = fo(e);
			var t = e.queue, n = ls.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function mo(e) {
			var t = qa();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = ds.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function ho(e, t) {
			return go(Ja(), Mx, e, t);
		}
		function go(e, t, n, r) {
			return e.baseState = n, no(e, Mx, typeof r == "function" ? r : $a);
		}
		function _o(e, t) {
			var n = Ja();
			return Mx === null ? (n.baseState = e, [e, n.queue.dispatch]) : go(n, Mx, e, t);
		}
		function vo(e, t, n, r, i) {
			if (fs(e)) throw Error("Cannot update action state while rendering.");
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
				W.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, yo(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function yo(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = W.T, o = {};
				o.types = a === null ? null : a.types, o._updatedFibers = /* @__PURE__ */ new Set(), W.T = o;
				try {
					var s = n(i, r), c = W.S;
					c !== null && c(o, s), bo(e, t, s);
				} catch (n) {
					So(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), W.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), bo(e, t, o);
			} catch (n) {
				So(e, t, n);
			}
		}
		function bo(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (W.asyncTransitions++, n.then(Xo, Xo), n.then(function(n) {
				xo(e, t, n);
			}, function(n) {
				return So(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : xo(e, t, n);
		}
		function xo(e, t, n) {
			t.status = "fulfilled", t.value = n, Co(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, yo(e, n)));
		}
		function So(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, Co(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function Co(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function wo(e, t) {
			return t;
		}
		function To(e, t) {
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
							ei(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = qa(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: wo,
				lastRenderedState: t
			}, n.queue = r, n = ls.bind(null, X, r), r.dispatch = n, r = fo(!1), a = ds.bind(null, X, !1, r.queue), r = qa(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = vo.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function Eo(e) {
			return Do(Ja(), Mx, e);
		}
		function Do(e, t, n) {
			if (t = no(e, t, wo)[0], e = to($a)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Xa(t);
			} catch (e) {
				throw e === Vb ? Ub : e;
			}
			else r = t;
			t = Ja();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, Ao(Sx | Tx, { destroy: void 0 }, Oo.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function Oo(e, t) {
			e.action = t;
		}
		function ko(e) {
			var t = Ja(), n = Mx;
			if (n !== null) return Do(t, n, e);
			Ja(), t = t.memoizedState, n = Ja();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function Ao(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = Ya(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function jo(e) {
			var t = qa();
			return e = { current: e }, t.memoizedState = e;
		}
		function Mo(e, t, n, r) {
			var i = qa();
			X.flags |= e, i.memoizedState = Ao(Sx | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function No(e, t, n, r) {
			var i = Ja();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			Mx !== null && r !== null && za(r, Mx.memoizedState.deps) ? i.memoizedState = Ao(t, a, n, r) : (X.flags |= e, i.memoizedState = Ao(Sx | t, a, n, r));
		}
		function Po(e, t) {
			(X.mode & Vv) === G ? Mo(8390656, Tx, e, t) : Mo(545261568, Tx, e, t);
		}
		function Fo(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = Ya(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function Io(e) {
			var t = qa(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((fC & rC) !== nC) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function Lo(e) {
			var t = Ja().memoizedState;
			return Fo({
				ref: t,
				nextImpl: e
			}), function() {
				if ((fC & rC) !== nC) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function Ro(e, t) {
			var n = 4194308;
			return (X.mode & Vv) !== G && (n |= 268435456), Mo(n, wx, e, t);
		}
		function zo(e, t) {
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
		function Bo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Vv) !== G && (r |= 268435456), Mo(r, wx, zo.bind(null, t, e), n);
		}
		function Vo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), No(4, wx, zo.bind(null, t, e), n);
		}
		function Ho(e, t) {
			return qa().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Uo(e, t) {
			var n = Ja();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && za(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Wo(e, t) {
			var n = qa();
			t = t === void 0 ? null : t;
			var r = e();
			if (Ix) {
				Be(!0);
				try {
					e();
				} finally {
					Be(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Go(e, t) {
			var n = Ja();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && za(t, r[1])) return r[0];
			if (r = e(), Ix) {
				Be(!0);
				try {
					e();
				} finally {
					Be(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function R(e, t) {
			return Jo(qa(), e, t);
		}
		function Ko(e, t) {
			return Yo(Ja(), Mx.memoizedState, e, t);
		}
		function qo(e, t) {
			var n = Ja();
			return Mx === null ? Jo(n, e, t) : Yo(n, Mx.memoizedState, e, t);
		}
		function Jo(e, t, n) {
			return n === void 0 || jx & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Zl(), X.lanes |= e, jC |= e, n);
		}
		function Yo(e, t, n, r) {
			return H_(n, t) ? n : mx.current === null ? !(jx & 106) || jx & 1073741824 && !($ & 261930) ? (mS = !0, e.memoizedState = n) : (e = Zl(), X.lanes |= e, jC |= e, t) : (e = Jo(e, n, r), H_(e, t) || (mS = !0), e);
		}
		function Xo() {
			W.asyncTransitions--;
		}
		function Zo(e, t, n, r, i) {
			var a = Um.p;
			Um.p = a !== 0 && a < Lh ? a : Lh;
			var o = W.T, s = {};
			s.types = o === null ? null : o.types, s._updatedFibers = /* @__PURE__ */ new Set(), W.T = s, ds(e, !1, t, n);
			try {
				var c = i(), l = W.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					W.asyncTransitions++, c.then(Xo, Xo);
					var u = Gi(c, r);
					us(e, t, u, Xl(e));
				} else us(e, t, r, Xl(e));
			} catch (n) {
				us(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, Xl(e));
			} finally {
				Um.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), W.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function Qo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = $o(e).queue;
			Ti(e), Zo(e, i, t, QT, n === null ? u : function() {
				return es(e), n(r);
			});
		}
		function $o(e) {
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
					lastRenderedReducer: $a,
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
					lastRenderedReducer: $a,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function es(e) {
			W.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = $o(e);
			t.next === null && (t = e.alternate.memoizedState), us(e, t.next.queue, {}, Xl(e));
		}
		function ts() {
			var e = fo(!1);
			return e = Zo.bind(null, X, e.queue, !0, !1), qa().memoizedState = e, [!1, e];
		}
		function ns() {
			var e = to($a)[0], t = Ja().memoizedState;
			return [typeof e == "boolean" ? e : Xa(e), t];
		}
		function rs() {
			var e = ro($a)[0], t = Ja().memoizedState;
			return [typeof e == "boolean" ? e : Xa(e), t];
		}
		function is() {
			return gi($T);
		}
		function as() {
			var e = qa(), t = pC.identifierPrefix;
			if (q) {
				var n = $v, r = Qv;
				n = (r & ~(1 << 32 - Ah(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Lx++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Bx++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function os() {
			return qa().memoizedState = ss.bind(null, X);
		}
		function ss(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = Xl(n), i = ga(r), a = _a(n, i, r);
						a !== null && (wi(r, "refresh()", e), $l(a, n, r), va(a, n, r)), e = yi(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function cs(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Xl(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			fs(e) ? ps(t, i) : (i = Tr(e, t, i, r), i !== null && (wi(r, "dispatch()", e), $l(i, e, r), ms(i, t, r)));
		}
		function ls(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Xl(e), us(e, t, n, r) && wi(r, "setState()", e);
		}
		function us(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (fs(e)) ps(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = W.H;
					W.H = Zx;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, H_(c, s)) return wr(e, t, i, 0), pC === null && Cr(), !1;
					} catch {} finally {
						W.H = o;
					}
				}
				if (n = Tr(e, t, i, r), n !== null) return $l(n, e, r), ms(n, t, r), !0;
			}
			return !1;
		}
		function ds(e, t, n, r) {
			if (W.T === null && cb === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: od(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, fs(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = Tr(e, n, r, 2), t !== null && (wi(2, "setOptimistic()", e), $l(t, e, 2));
		}
		function fs(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function ps(e, t) {
			Fx = Px = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function ms(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Qe(e, n);
			}
		}
		function hs(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				lS.has(t) || (lS.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function gs(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Bv) {
				Be(!0);
				try {
					a = n(r, i);
				} finally {
					Be(!1);
				}
			}
			a === void 0 && (t = fe(t) || "Component", aS.has(t) || (aS.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : U({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function _s(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Bv) {
					Be(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Be(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", fe(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Gn(n, r) || !Gn(i, a) : !0;
		}
		function vs(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = D(e) || "Component", eS.has(e) || (eS.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), uS.enqueueReplaceState(t, t.state, null));
		}
		function ys(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = U({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function bs(e) {
			dv(e), console.warn("%s\n\n%s\n", dS ? "An error occurred in the <" + dS + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function xs(e) {
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
		function Ss(e) {
			dv(e);
		}
		function Cs(e, t) {
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
		function ws(e, t, n) {
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
		function Ts(e, t, n) {
			return n = ga(n), n.tag = lx, n.payload = { element: null }, n.callback = function() {
				A(t.source, Cs, e, t);
			}, n;
		}
		function Es(e) {
			return e = ga(e), e.tag = lx, e;
		}
		function Ds(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					jr(n), A(r.source, ws, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				jr(n), A(r.source, ws, t, n, r), typeof i != "function" && (KC === null ? KC = /* @__PURE__ */ new Set([this]) : KC.add(this)), Mb(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", D(n) || "Unknown");
			});
		}
		function Os(e, t, n, r, i) {
			if (n.flags |= 32768, kh && Ju(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && pi(t, n, i, !0), q && (ny = !0), n = gx.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13:
						case 19: return _x === null ? pu() : n.alternate === null && AC === aC && (AC = cC), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Wb ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), zu(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Wb ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), zu(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return zu(e, r, i), pu(), !1;
			}
			if (q) return ny = !0, t = gx.current, t === null ? (r !== oy && oi(Ur(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Ur(r, n), i = Ts(e.stateNode, r, i), ya(e, i), AC !== lC && (AC = sC)) : (t.tag === 19 && console.error("SuspenseList should never catch while hydrating. This is a bug in React."), !(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== oy && oi(Ur(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Ur(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (IC === null ? IC = [a] : IC.push(a), AC !== lC && (AC = sC), t === null) return !0;
			r = Ur(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = Ts(n.stateNode, r, e), ya(n, e), !1;
					case 1:
						if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (KC === null || !KC.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = Es(i), Ds(i, e, n, r), ya(n, i), !1;
						break;
					case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function ks(e, t, n, r) {
			t.child = e === null ? ax(t, null, n, r) : ix(t, e.child, n, r);
		}
		function As(e, t, n, r, i) {
			n = n.render;
			var a = kr(n);
			if (a !== n && (n = a, e !== null && (mS = !0)), a = t.ref, "ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return hi(t), r = Ba(e, t, n, o, a, i), s = Wa(), e !== null && !mS ? (Ga(e, t, i), ic(e, t, i)) : (q && s && Kr(t), t.flags |= 1, ks(e, t, r, i), t.child);
		}
		function js(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Pr(a) && a.defaultProps === void 0 && n.compare === null ? (n = kr(a), t.tag = 15, t.type = n, Ws(t, a), Ms(e, t, n, r, i)) : (e = Lr(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !ac(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Gn : n, n(o, r) && e.ref === t.ref) return ic(e, t, i);
			}
			return t.flags |= 1, e = Fr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function Ms(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Gn(a, r) && e.ref === t.ref && t.type === e.type) {
					if (mS = !1, t.pendingProps = r = a, ac(e, i)) e.flags & 131072 && (mS = !0);
					else return t.lanes = e.lanes, ic(e, t, i);
				}
			}
			return Bs(e, t, n, r, i);
		}
		function Ns(e, t, n, r) {
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
					return Fs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && qi(t, a === null ? null : a.cachePool), a === null ? Ea(t) : Ta(t, a), Aa(t);
				else return r = t.lanes = 536870912, Fs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && qi(t, null), Ea(t), ja(t)) : (qi(t, a.cachePool), Ta(t, a), ja(t), t.memoizedState = null);
			return ks(e, t, i, n), t.child;
		}
		function Ps(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: jv,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function Fs(e, t, n, r, i) {
			var a = Ki();
			return a = a === null ? null : {
				parent: gy._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && qi(t, null), Ea(t), Aa(t), e !== null && pi(e, t, r, !0), t.childLanes = i, null;
		}
		function Is(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = Ys({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function Ls(e, t, n) {
			return ix(t, e.child, null, n), e = Is(t, t.pendingProps), e.flags |= 2, Ma(t), t.memoizedState = null, e;
		}
		function Rs(e, t, n) {
			var r = t.pendingProps, i = !!(t.flags & 128);
			if (t.flags &= -129, e === null) {
				if (q) {
					if (r.mode === "hidden") return e = Is(t, r), t.lanes = 536870912, e.memoizedState = {
						baseLanes: 0,
						cachePool: null
					}, Ps(null, e);
					if (ka(t), (e = ty) ? (n = Zf(e, ay), n = n !== null && n.data === rT ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Jr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Vr(n), r.return = t, t.child = r, ey = t, ty = null)) : n = null, n === null) throw $r(t, e), ei(t);
					return t.lanes = 536870912, null;
				}
				return Is(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (ka(t), i) {
					if (t.flags & 256) t.flags &= -257, t = Ls(e, t, n);
					else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
					else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				} else if (Qr(), n & 536870912 && fu(t), mS || pi(e, t, n, !1), i = (n & e.childLanes) !== 0, mS || i) {
					if (mx.current === null) {
						if (r = pC, r !== null && (o = $e(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, Er(e, o), $l(r, e, o), pS;
						pu();
					}
					t = Ls(e, t, n);
				} else e = a.treeContext, ty = ep(o.nextSibling), ey = t, q = !0, iy = null, ny = !1, ry = null, ay = !1, e !== null && Yr(t, e), t = Is(t, r), t.flags |= 134221824;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && fu(t), e = Fr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function zs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function Bs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = fe(n) || "Unknown";
				hS[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), hS[a] = !0);
			}
			return t.mode & Bv && fb.recordLegacyContextWarning(t, null), e === null && (Ws(t, t.type), n.contextTypes && (a = fe(n) || "Unknown", _S[a] || (_S[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), hi(t), n = Ba(e, t, n, r, void 0, i), r = Wa(), e !== null && !mS ? (Ga(e, t, i), ic(e, t, i)) : (q && r && Kr(t), t.flags |= 1, ks(e, t, n, i), t.child);
		}
		function Vs(e, t, n, r, i, a) {
			return hi(t), Ux = -1, Wx = e !== null && e.type !== t.type, t.updateQueue = null, n = Ha(t, r, n, i), Va(e, t), r = Wa(), e !== null && !mS ? (Ga(e, t, a), ic(e, t, a)) : (q && r && Kr(t), t.flags |= 1, ks(e, t, n, a), t.child);
		}
		function Hs(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = pC, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = Es(c), Ds(c, o, t, Ur(a, t)), ya(t, c);
			}
			if (hi(t), t.stateNode === null) {
				if (o = Iv, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== km) && !cS.has(n) && (cS.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Om ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", fe(n) || "Component", c)), typeof a == "object" && a && (o = gi(a)), a = new n(r, o), t.mode & Bv) {
					Be(!0);
					try {
						a = new n(r, o);
					} finally {
						Be(!1);
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
				a = t.stateNode, o = fe(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !sS.has(n) && (sS.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !oS.has(n) && (oS.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", fe(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || nS.has(n) || (nS.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", fe(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || Hm(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ma(t), o = n.contextType, a.context = typeof o == "object" && o ? gi(o) : Iv, a.state === r && (o = fe(n) || "Component", iS.has(o) || (iS.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Bv && fb.recordLegacyContextWarning(t, a), fb.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (gs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", D(t) || "Component"), uS.enqueueReplaceState(a, a.state, null)), xa(t, r, a, i), ba(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = ys(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Iv, typeof l == "object" && l && (o = gi(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && vs(t, a, r, o), ux = !1;
				var p = t.memoizedState;
				a.state = p, xa(t, r, a, i), ba(), f = t.memoizedState, d || p !== f || ux ? (typeof u == "function" && (gs(t, n, u, r), f = t.memoizedState), (c = ux || _s(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Vv) !== G && (t.flags |= 268435456), a = !1);
			} else {
				a = t.stateNode, ha(e, t), o = t.memoizedProps, l = ys(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Iv, typeof f == "object" && f && (c = gi(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && vs(t, a, r, c), ux = !1, p = t.memoizedState, a.state = p, xa(t, r, a, i), ba();
				var m = t.memoizedState;
				o !== u || p !== m || ux || e !== null && e.dependencies !== null && mi(e.dependencies) ? (typeof d == "function" && (gs(t, n, d, r), m = t.memoizedState), (l = ux || _s(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && mi(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, zs(e, t), o = !!(t.flags & 128), c || o) {
				if (c = t.stateNode, Me(t), o && typeof n.getDerivedStateFromError != "function") n = null, Ey = -1;
				else if (n = Eb(c), t.mode & Bv) {
					Be(!0);
					try {
						Eb(c);
					} finally {
						Be(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = ix(t, e.child, null, i), t.child = ix(t, null, n, i)) : ks(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = ic(e, t, i);
			return i = t.stateNode, a && i.props !== r && (yS || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", D(t) || "a component"), yS = !0), e;
		}
		function Us(e, t, n, r) {
			return ii(), t.flags |= 256, ks(e, t, n, r), t.child;
		}
		function Ws(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = fe(t) || "Unknown", vS[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), vS[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = fe(t) || "Unknown", gS[t] || (console.error("%s: Function components do not support contextType.", t), gS[t] = !0));
		}
		function Gs(e) {
			return {
				baseLanes: e,
				cachePool: Ji()
			};
		}
		function Ks(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= PC), e;
		}
		function qs(e, t, n) {
			var r = t.pendingProps;
			o(t) && (t.flags |= 128);
			var i = !1, a = !!(t.flags & 128), s;
			if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (bx.current & yx) !== 0), s && (i = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
				if (q) {
					if (i ? Oa(t) : ja(t), (e = ty) ? (n = Zf(e, ay), n = n !== null && n.data !== rT ? n : null, n !== null && (s = {
						dehydrated: n,
						treeContext: Jr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = s, s = Vr(n), s.return = t, t.child = s, ey = t, ty = null)) : n = null, n === null) throw $r(t, e), ei(t);
					return t.lanes = Qf(n) ? 32 : 536870912, null;
				}
				return a = r.children, r = r.fallback, i ? (ja(t), i = t.mode, a = Ys({
					mode: "hidden",
					children: a
				}, i), r = zr(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Gs(n), r.childLanes = Ks(e, s, n), t.memoizedState = CS, Ps(null, r)) : (Oa(t), Js(t, a));
			}
			var c = e.memoizedState;
			if (c !== null) {
				var l = c.dehydrated;
				if (l !== null) return Zs(e, t, a, s, r, l, c, n);
			}
			return i ? (ja(t), i = r.fallback, a = t.mode, c = e.child, l = c.sibling, r = Fr(c, {
				mode: "hidden",
				children: r.children
			}), r.subtreeFlags = c.subtreeFlags & 1206910976, l === null ? (i = zr(i, a, n, null), i.flags |= 2) : i = Fr(l, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Ps(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Gs(n) : (a = i.cachePool, a === null ? a = Ji() : (c = gy._currentValue, a = a.parent === c ? a : {
				parent: c,
				pool: c
			}), i = {
				baseLanes: i.baseLanes | n,
				cachePool: a
			}), r.memoizedState = i, r.childLanes = Ks(e, s, n), t.memoizedState = CS, Ps(e.child, r)) : (c !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && fu(t), Oa(t), n = e.child, e = n.sibling, n = Fr(n, {
				mode: "visible",
				children: r.children
			}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Js(e, t) {
			return t = Ys({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function Ys(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function Xs(e, t, n) {
			return ix(t, e.child, null, n), e = Js(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function Zs(e, t, n, r, i, a, o, s) {
			if (n) {
				if (t.flags & 256) return Oa(t), t.flags &= -257, Xs(e, t, s);
				if (t.memoizedState !== null) return ja(t), t.child = e.child, t.flags |= 128, null;
				ja(t);
				var c = i.fallback, l = t.mode, u = Ys({
					mode: "visible",
					children: i.children
				}, l);
				return c = zr(c, l, s, null), c.flags |= 2, u.return = t, c.return = t, u.sibling = c, t.child = u, ix(t, e.child, null, s), c = t.child, c.memoizedState = Gs(s), c.childLanes = Ks(e, r, s), t.memoizedState = CS, Ps(null, c);
			}
			if (Oa(t), Qr(), s & 536870912 && fu(t), Qf(a)) {
				if (r = a.nextSibling && a.nextSibling.dataset, r) {
					c = r.dgst;
					var d = r.msg;
					l = r.stck, u = r.cstck;
				}
				return a = d, o = c, i = l, r = u, c = o, l = a, u = i, i = r, c !== Sb && (r = Error(l || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), r.stack = u || "", r.digest = c, c = i === void 0 ? null : i, l = {
					value: r,
					source: null,
					stack: c
				}, typeof c == "string" && Wv.set(r, l), oi(l)), Xs(e, t, s);
			}
			if (mS || pi(e, t, s, !1), r = (s & e.childLanes) !== 0, mS || r) {
				if (mx.current !== null) return Xs(e, t, s);
				if (r = pC, r !== null && (c = $e(r, s), c !== 0 && c !== o.retryLane)) throw o.retryLane = c, Er(e, c), $l(r, e, c), pS;
				return H(a) || pu(), Xs(e, t, s);
			}
			return H(a) ? (t.flags |= 192, t.child = e.child, null) : (e = o.treeContext, ty = ep(a.nextSibling), ey = t, q = !0, iy = null, ny = !1, ry = null, ay = !1, e !== null && Yr(t, e), t = Js(t, i.children), t.flags |= 134221824, t);
		}
		function Qs(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), di(e.return, t, n);
		}
		function $s(e) {
			for (var t = null; e !== null;) {
				var n = e.alternate;
				n !== null && Fa(n) === null && (t = e), e = e.sibling;
			}
			return t;
		}
		function ec(e, t, n, r, i, a) {
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
		function tc(e) {
			var t = e.child;
			for (e.child = null; t !== null;) {
				var n = t.sibling;
				t.sibling = e.child, e.child = t, t = n;
			}
		}
		function nc(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = bx.current;
			if (t.flags & 128) return Na(t, s), null;
			if ((r = (s & yx) !== 0) ? (s = s & vx | yx, t.flags |= 128) : s &= vx, Na(t, s), s = i ?? "null", i != null && i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !bS[s]) {
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
					for (s = 0; s < o.length; s++) if (!pa(o[s], s)) break a;
				} else if (s = de(o), typeof s == "function") {
					if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
						if (!pa(c.value, l)) break a;
						l++;
					}
				} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			}
			if (i === "backwards" && e !== null ? (tc(e), ks(e, t, o, n), tc(e)) : ks(e, t, o, n), q ? (Xr(), o = Jv) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Qs(e, n, t);
				else if (e.tag === 19) Qs(e, n, t);
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
					n = $s(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, tc(t)), ec(t, !0, i, null, a, o);
					break;
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && Fa(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					ec(t, !0, n, null, a, o);
					break;
				case "together":
					ec(t, !1, null, null, void 0, o);
					break;
				case "independent":
					t.memoizedState = null;
					break;
				default: n = $s(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ec(t, !1, i, n, a, o);
			}
			return t.child;
		}
		function rc(e, t, n) {
			var r = t.type, i = t.pendingProps, a = i.value;
			return "value" in i || wS || (wS = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), li(t, r, a), ks(e, t, i.children, n), t.child;
		}
		function ic(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), Ey = -1, jC |= t.lanes, (n & t.childLanes) === 0) {
				if (e !== null) {
					if (pi(e, t, n, !1), (n & t.childLanes) === 0) return null;
				} else return null;
			}
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Fr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Fr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function ac(e, t) {
			return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && mi(e)));
		}
		function oc(e, t, n) {
			switch (t.tag) {
				case 3:
					ve(t, t.stateNode.containerInfo), li(t, gy, e.memoizedState.cache), ii();
					break;
				case 27:
				case 5:
					xe(t);
					break;
				case 4:
					ve(t, t.stateNode.containerInfo);
					break;
				case 10:
					li(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, ka(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) {
						if (r.dehydrated !== null) return Oa(t), t.flags |= 128, null;
						r = pi(e, t, n, !1);
						var i = t.child.childLanes;
						return r || (n & i) !== 0 ? qs(e, t, n) : (Oa(t), e = ic(e, t, n), e === null ? null : e.sibling);
					}
					Oa(t);
					break;
				case 19:
					if (t.flags & 128) return nc(e, t, n);
					if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (pi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return nc(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Na(t, bx.current), r) break;
					return null;
				case 22: return t.lanes = 0, Ns(e, t, n, t.pendingProps);
				case 24: li(t, gy, e.memoizedState.cache);
			}
			return ic(e, t, n);
		}
		function sc(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Lr(kr(t.elementType), t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
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
					if (!ac(e, n) && !(t.flags & 128)) return mS = !1, oc(e, t, n);
					mS = !!(e.flags & 131072);
				}
			} else mS = !1, (r = q) && (Xr(), r = !!(t.flags & 1048576)), r && (r = t.index, Xr(), Gr(t, Jv, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Qi(t.elementType), e = kr(e), t.type = e, typeof e == "function") Pr(e) ? (r = ys(e, r), t.tag = 1, t = Hs(null, t, e, r, n)) : (t.tag = 0, Ws(t, e), t = Bs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Am) {
								t.tag = 11, t = As(null, t, e, r, n);
								break a;
							}
							if (i === Nm) {
								t.tag = 14, t = js(null, t, e, r, n);
								break a;
							}
							if (i === km) {
								t.tag = 10, t.type = e, t = rc(null, t, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Pm && (t = " Did you wrap a component in React.lazy() more than once?"), n = fe(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return Bs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = ys(r, t.pendingProps), Hs(e, t, r, i, n);
				case 3:
					a: {
						if (ve(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, ha(e, t), xa(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, li(t, gy, r), r !== a.cache && fi(t, [gy], n, !0), ba(), r = o.element, a.isDehydrated) {
							if (a = {
								element: r,
								isDehydrated: !1,
								cache: o.cache
							}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
								t = Us(e, t, r, n);
								break a;
							}
							if (r !== i) {
								i = Ur(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), oi(i), t = Us(e, t, r, n);
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
							if (ii(), r === i) {
								t = ic(e, t, n);
								break a;
							}
							ks(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return zs(e, t), e === null ? (n = gp(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : q || (t.stateNode = Kd(t.type, t.pendingProps, _e(Xm.current), t)) : t.memoizedState = gp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return xe(t), e === null && q && (r = _e(Xm.current), i = be(), r = t.stateNode = up(t.type, t.pendingProps, r, i, !1), ny || (i = zd(r, t.type, t.pendingProps, i), i !== null && (Zr(t, 0).serverProps = i)), ey = t, ay = !0, i = ty, of(t.type) ? (FT = i, ty = ep(r.firstChild)) : ty = i), ks(e, t, t.pendingProps.children, n), zs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && q && (a = be(), r = rn(t.type, a.ancestorInfo), i = ty, (o = !i) || (o = Yf(i, t.type, t.pendingProps, ay), o === null ? a = !1 : (t.stateNode = o, ny || (a = zd(o, t.type, t.pendingProps, a), a !== null && (Zr(t, 0).serverProps = a)), ey = t, ty = ep(o.firstChild), ay = !1, a = !0), o = !a), o && (r && $r(t, i), ei(t))), xe(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Jd(i, a) ? r = null : o !== null && Jd(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = Ba(e, t, Ua, null, null, n), $T._currentValue = i), zs(e, t), ks(e, t, r, n), t.child;
				case 6: return e === null && q && (n = t.pendingProps, e = be(), r = e.ancestorInfo.current, n = r == null || an(n, r.tag, e.ancestorInfo.implicitRootScope), e = ty, (r = !e) || (r = Xf(e, t.pendingProps, ay), r === null ? r = !1 : (t.stateNode = r, ey = t, ty = null, r = !0), r = !r), r && (n && $r(t, e), ei(t))), null;
				case 13: return qs(e, t, n);
				case 4: return ve(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ix(t, null, r, n) : ks(e, t, r, n), t.child;
				case 11: return As(e, t, t.type, t.pendingProps, n);
				case 7: return r = t.pendingProps, zs(e, t), ks(e, t, r, n), t.child;
				case 8: return ks(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, ks(e, t, t.pendingProps.children, n), t.child;
				case 10: return rc(e, t, n);
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), hi(t), i = gi(i), r = wb(r, i, void 0), t.flags |= 1, ks(e, t, r, n), t.child;
				case 14: return js(e, t, t.type, t.pendingProps, n);
				case 15: return Ms(e, t, t.type, t.pendingProps, n);
				case 19: return nc(e, t, n);
				case 31: return Rs(e, t, n);
				case 22: return Ns(e, t, n, t.pendingProps);
				case 24: return hi(t), r = gi(gy), e === null ? (i = Ki(), i === null && (i = pC, a = yi(), i.pooledCache = a, bi(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, ma(t), li(t, gy, i)) : ((e.lanes & n) !== 0 && (ha(e, t), xa(t, null, null, n), ba()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, li(t, gy, r), r !== i.cache && fi(t, [gy], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), li(t, gy, r))), ks(e, t, t.pendingProps.children, n), t.child;
				case 30: return t.stateNode === null && (t.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : q && Kr(t), r.className !== void 0 && (i = typeof r.className == "string" ? JSON.stringify(r.className) : "{...}", SS[i] || (SS[i] = !0, console.error("<ViewTransition> doesn't accept a \"className\" prop. It has been renamed to \"default\".\n-   <ViewTransition className=%s>\n+   <ViewTransition default=%s>", i, i))), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : zs(e, t), ks(e, t, r.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function cc(e) {
			e.flags |= 4;
		}
		function lc(e, t, n, r, i) {
			var a;
			if ((a = (e.mode & Hv) !== G) && (a = n === null ? jp(t, r) : jp(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
				if (e.flags |= 16777216, (i & 335544128) === i) {
					if (e.stateNode.complete) e.flags |= 8192;
					else if (lu()) e.flags |= 8192;
					else throw Jb = Wb, Hb;
				}
			} else e.flags &= -16777217;
		}
		function uc(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & BT) !== IT) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Mp(t)) {
				if (lu()) e.flags |= 8192;
				else throw Jb = Wb, Hb;
			}
		}
		function dc(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : qe(), e.lanes |= t, FC |= t);
		}
		function fc(e, t) {
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
		function pc(e) {
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
		function mc(e, t, n) {
			var r = t.pendingProps;
			switch (qr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return pc(t), null;
				case 1: return pc(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ui(gy, t), ye(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ri(t) ? (si(), cc(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ai())), pc(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (cc(t), a === null ? (pc(t), lc(t, i, null, r, n)) : (pc(t), uc(t, a))) : a ? a === e.memoizedState ? (pc(t), t.flags &= -16777217) : (cc(t), pc(t), uc(t, a)) : (e = e.memoizedProps, e !== r && cc(t), pc(t), lc(t, i, e, r, n)), null;
				case 27:
					if (Se(t), n = _e(Xm.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && cc(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return pc(t), t.subtreeFlags &= -33554433, null;
						}
						e = be(), ri(t) ? ti(t, e) : (e = up(i, r, n, e, !0), t.stateNode = e, cc(t));
					}
					return pc(t), t.subtreeFlags &= -33554433, null;
				case 5:
					if (Se(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && cc(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return pc(t), t.subtreeFlags &= -33554433, null;
						}
						var o = be();
						if (ri(t)) ti(t, o);
						else {
							switch (a = _e(Xm.current), rn(i, o.ancestorInfo), o = o.context, a = Ud(a), o) {
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
										a = a.createElement("div"), ST || qd(r) || (console.error("Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client. Consider using template tag instead (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)."), ST = !0), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
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
							a: switch (kd(a, i, r), i) {
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
							r && cc(t);
						}
					}
					return pc(t), t.subtreeFlags &= -33554433, lc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && cc(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = _e(Xm.current), n = be(), ri(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !ny, r = null, a = ey, a !== null) switch (a.tag) {
								case 3:
									i && (i = np(e, n, r), i !== null && (Zr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = np(e, n, r), i !== null && (Zr(t, 0).serverProps = i));
							}
							e[Vh] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Ed(e.nodeValue, n)), e || ei(t, !0);
						} else i = n.ancestorInfo.current, i != null && an(r, i.tag, n.ancestorInfo.implicitRootScope), e = Ud(e).createTextNode(r), e[Vh] = t, t.stateNode = e;
					}
					return pc(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = ri(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Vh] = t, pc(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else si(), ii(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, pc(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = ai(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (Ma(t), t) : (Ma(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return pc(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = ri(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Vh] = t, pc(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else si(), ii(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, pc(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = ai(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (Ma(t), t) : (Ma(t), null);
					}
					return Ma(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && Hi(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), dc(t, t.updateQueue), pc(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return ye(t), e === null && dd(t.stateNode.containerInfo), t.flags |= 67108864, pc(t), null;
				case 10: return ui(t.type, t), pc(t), null;
				case 19:
					if (Pa(t), r = t.memoizedState, r === null) return pc(t), null;
					if (i = !!(t.flags & 128), a = r.rendering, a === null) {
						if (i) fc(r, !1);
						else {
							if (AC !== aC || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
								if (a = Fa(e), a !== null) {
									for (t.flags |= 128, fc(r, !1), e = a.updateQueue, t.updateQueue = e, dc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Ir(n, e), n = n.sibling;
									return Na(t, bx.current & vx | yx), q && Wr(t, r.treeForkCount), t.child;
								}
								e = e.sibling;
							}
							r.tail !== null && _h() > HC && (t.flags |= 128, i = !0, fc(r, !1), t.lanes = 4194304);
						}
					} else {
						if (!i) {
							if (e = Fa(a), e !== null) {
								if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, dc(t, e), fc(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !a.alternate && !q) return pc(t), null;
							} else 2 * _h() - r.renderingStartTime > HC && n !== 536870912 && (t.flags |= 128, i = !0, fc(r, !1), t.lanes = 4194304);
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
						return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = _h(), e.sibling = null, a = bx.current, a = i ? a & vx | yx : a & vx, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || q ? Na(t, a) : (n = a, ge(gx, t, t), ge(bx, n, t), _x === null && (_x = t)), q && Wr(t, r.treeForkCount), e;
					}
					return pc(t), null;
				case 22:
				case 23: return Ma(t), Da(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (pc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : pc(t), n = t.updateQueue, n !== null && dc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && he(db, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ui(gy, t), pc(t), null;
				case 25: return null;
				case 30: return t.flags |= 33554432, pc(t), null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function hc(e, t) {
			switch (qr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Hi(t), t) : null;
				case 3: return ui(gy, t), ye(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return Se(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (Ma(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						ii();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Hi(t), t) : null;
				case 13:
					if (Ma(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						ii();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Hi(t), t) : null;
				case 19: return Pa(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
				case 4: return ye(t), null;
				case 10: return ui(t.type, t), null;
				case 22:
				case 23: return Ma(t), Da(t), e !== null && he(db, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Hi(t), t) : null;
				case 24: return ui(gy, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function gc(e, t) {
			switch (qr(t), t.tag) {
				case 3:
					ui(gy, t), ye(t);
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
					t.memoizedState !== null && Ma(t);
					break;
				case 13:
					Ma(t);
					break;
				case 19:
					Pa(t);
					break;
				case 10:
					ui(t.type, t);
					break;
				case 22:
				case 23:
					Ma(t), Da(t), e !== null && he(db, t);
					break;
				case 24: ui(gy, t);
			}
		}
		function _c(e) {
			return (e.mode & K) !== G;
		}
		function vc(e, t) {
			_c(e) ? (Vi(), bc(t, e), zi()) : bc(t, e);
		}
		function yc(e, t, n) {
			_c(e) ? (Vi(), xc(n, e, t), zi()) : xc(n, e, t);
		}
		function bc(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & Cx) !== xx && (Tw = !0), r = A(t, Ib, n), (e & Cx) !== xx && (Tw = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & wx) === 0 ? (n.tag & Cx) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, A(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Ru(t, t.return, e);
			}
		}
		function xc(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & Cx) !== xx && (Tw = !0), i = t, A(i, Rb, i, n, s), (e & Cx) !== xx && (Tw = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Ru(t, t.return, e);
			}
		}
		function Sc(e, t) {
			_c(e) ? (Vi(), bc(t, e), zi()) : bc(t, e);
		}
		function Cc(e, t, n) {
			_c(e) ? (Vi(), xc(n, e, t), zi()) : xc(n, e, t);
		}
		function wc(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || yS || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(e) || "instance"));
				try {
					A(e, wa, t, n);
				} catch (t) {
					Ru(e, e.return, t);
				}
			}
		}
		function Tc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function Ec(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || yS || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(e) || "instance"));
			try {
				var i = ys(e.type, n), a = A(e, Tc, t, i, r);
				n = TS, a !== void 0 || n.has(e.type) || (n.add(e.type), A(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", D(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Ru(e, e.return, t);
			}
		}
		function Dc(e, t, n) {
			n.props = ys(e.type, e.memoizedProps), n.state = e.memoizedState, _c(e) ? (Vi(), A(e, Pb, e, t, n), zi()) : A(e, Pb, e, t, n);
		}
		function Oc(e) {
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
						var r = nr(e.memoizedProps, n);
						(n.ref === null || n.ref.name !== r) && (n.ref = Of(r)), n = n.ref;
						break;
					case 7:
						e.stateNode === null && (n = new kf(e), w(e, Wf, n), e.stateNode = n), n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") {
					if (_c(e)) try {
						Vi(), e.refCleanup = t(n);
					} finally {
						zi();
					}
					else e.refCleanup = t(n);
				} else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", D(e)), t.current = n;
			}
		}
		function kc(e, t) {
			try {
				A(e, Oc, e);
			} catch (n) {
				Ru(e, t, n);
			}
		}
		function Ac(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) {
				if (typeof r == "function") try {
					if (_c(e)) try {
						Vi(), A(e, r);
					} finally {
						zi(e);
					}
					else A(e, r);
				} catch (n) {
					Ru(e, t, n);
				} finally {
					e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
				}
				else if (typeof n == "function") try {
					if (_c(e)) try {
						Vi(), A(e, n, null);
					} finally {
						zi(e);
					}
					else A(e, n, null);
				} catch (n) {
					Ru(e, t, n);
				}
				else n.current = null;
			}
		}
		function jc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", ib && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function Mc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", ib && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function Nc(e, t) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) Kf(e.stateNode, t[n]);
		}
		function Pc(e) {
			for (var t = e.return; t !== null && (Lc(t) && Kf(e.stateNode, t.stateNode), !Ic(t));) t = t.return;
		}
		function Fc(e) {
			for (var t = e.return; t !== null && (Lc(t) && qf(e.stateNode, t.stateNode), !Ic(t));) t = t.return;
		}
		function Ic(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 27;
		}
		function Lc(e) {
			return e && e.tag === 7 && e.stateNode !== null;
		}
		function Rc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				A(e, $d, r, t, n, e);
			} catch (t) {
				Ru(e, e.return, t);
			}
		}
		function zc(e, t, n) {
			try {
				A(e, tf, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Ru(e, e.return, t);
			}
		}
		function Bc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && of(e.type) || e.tag === 4;
		}
		function Vc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || Bc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && of(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function Hc(e, t, n, r) {
			var i = e.tag;
			if (i === 5 || i === 6) i = e.stateNode, t ? (af(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t)) : (af(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), i = n._reactRootContainer, i != null || t.onclick !== null || (t.onclick = gn)), Nc(e, r), rg = !0;
			else if (i !== 4 && (i === 27 && (Nc(e, r), r = null, of(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Hc(e, t, n, r), e = e.sibling; e !== null;) Hc(e, t, n, r), e = e.sibling;
		}
		function Uc(e, t, n, r) {
			var i = e.tag;
			if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Nc(e, r), rg = !0;
			else if (i !== 4 && (i === 27 && (Nc(e, r), r = null, of(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Uc(e, t, n, r), e = e.sibling; e !== null;) Uc(e, t, n, r), e = e.sibling;
		}
		function Wc(e) {
			for (var t, n = e.return; n !== null;) {
				if (Bc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			n = null;
			for (var r = e.return; r !== null;) {
				if (Lc(r)) {
					var i = r.stateNode;
					n === null ? n = [i] : n.push(i);
				}
				if (Ic(r)) break;
				r = r.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, r = Vc(e), Uc(e, r, t, n);
					break;
				case 5:
					r = t.stateNode, t.flags & 32 && (nf(r), t.flags &= -33), t = Vc(e), Uc(e, t, r, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, r = Vc(e), Hc(e, r, t, n);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function Gc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				A(e, dp, e.type, n, t, e);
			} catch (t) {
				Ru(e, e.return, t);
			}
		}
		function Kc(e) {
			(e.tag === 30 || e.subtreeFlags & 33554432) && (ES = !0);
		}
		function qc() {
			var e = OS;
			return OS = null, e;
		}
		function Jc(e, t, n, r, i) {
			return kS = 0, (t = Yc(e.child, t, n, r, i)) && e._debugTask != null && tb === null && (tb = e._debugTask), t;
		}
		function Yc(e, t, n, r, i) {
			for (var a = !1; e !== null;) {
				if (e.tag === 5) {
					var o = e.stateNode;
					if (r !== null) {
						var s = xf(o);
						r.push(s), s.view && (a = !0);
					} else a || xf(o).view && (a = !0);
					ES = !0, vf(o, kS === 0 ? t : t + "_" + kS, n), kS++;
				} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Yc(e.child, t, n, r, i) && (a = !0));
				e = e.sibling;
			}
			return a;
		}
		function Xc(e, t) {
			for (; e !== null;) e.tag === 5 ? yf(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Xc(e.child, t)), e = e.sibling;
		}
		function Zc(e) {
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if ((e.tag !== 22 || e.memoizedState === null) && (Zc(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
					var t = e.memoizedProps;
					if (t.name == null || t.name === "auto") throw Error("Found a pair with an auto name. This is a bug in React.");
					var n = t.name;
					t = ir(t.default, t.share), t !== "none" && (Jc(e, n, t, null, !1) || Xc(e.child, !1));
				}
				e = e.sibling;
			}
		}
		function Qc(e, t) {
			if (e.tag === 30) {
				var n = e.stateNode, r = e.memoizedProps, i = nr(r, n), a = ir(r.default, n.paired ? r.share : r.enter);
				a === "none" ? Zc(e) : Jc(e, i, a, null, !1) ? (Zc(e), n.paired || t || Ql(e, r.onEnter)) : Xc(e.child, !1);
			} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Qc(e, t), e = e.sibling;
			else Zc(e);
		}
		function $c(e) {
			if (DS !== null && DS.size !== 0) {
				var t = DS;
				if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
					if (e.tag !== 22 || e.memoizedState === null) {
						if (e.tag === 30 && e.flags & 18874368) {
							var n = e.memoizedProps, r = n.name;
							if (r != null && r !== "auto") {
								var i = t.get(r);
								if (i !== void 0) {
									var a = ir(n.default, n.share);
									if (a !== "none" && (Jc(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Ql(e, n.onShare)) : Xc(e.child, !1)), t.delete(r), t.size === 0) break;
								}
							}
						}
						$c(e);
					}
					e = e.sibling;
				}
			}
		}
		function el(e) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = nr(t, e.stateNode), r = DS === null ? void 0 : DS.get(n), i = ir(t.default, r === void 0 ? t.exit : t.share);
				i !== "none" && (Jc(e, n, i, null, !1) ? r === void 0 ? Ql(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, DS.delete(n), Ql(e, t.onShare)) : Xc(e.child, !1)), DS !== null && $c(e);
			} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) el(e), e = e.sibling;
			else DS !== null && $c(e);
		}
		function tl(e) {
			for (e = e.child; e !== null;) {
				if (e.tag === 30) {
					var t = e.memoizedProps, n = nr(t, e.stateNode);
					t = ir(t.default, t.update), e.flags &= -5, t !== "none" && Jc(e, n, t, e.memoizedState = [], !1);
				} else e.subtreeFlags & 33554432 && tl(e);
				e = e.sibling;
			}
		}
		function nl(e) {
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var t = e.stateNode;
						t.paired !== null && (t.paired = null, Xc(e.child, !1));
					}
					nl(e);
				}
				e = e.sibling;
			}
		}
		function rl(e) {
			if (e.tag === 30) e.stateNode.paired = null, Xc(e.child, !1), nl(e);
			else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) rl(e), e = e.sibling;
			else nl(e);
		}
		function il(e) {
			for (e = e.child; e !== null;) e.tag === 30 ? Xc(e.child, !1) : e.subtreeFlags & 33554432 && il(e), e = e.sibling;
		}
		function al(e, t, n, r, i, a, o) {
			for (var s = !1; t !== null;) {
				if (t.tag === 5) {
					var c = t.stateNode;
					if (a !== null && kS < a.length) {
						var l = a[kS], u = xf(c);
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
					e.flags & 4 && vf(c, kS === 0 ? n : n + "_" + kS, i), s && e.flags & 4 || (OS === null && (OS = []), OS.push(c, kS === 0 ? r : r + "_" + kS, t.memoizedProps)), kS++;
				} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : al(e, t.child, n, r, i, a, o) && (s = !0));
				t = t.sibling;
			}
			return s;
		}
		function ol(e, t) {
			for (e = e.child; e !== null;) {
				if (e.tag === 30) {
					var n = e.memoizedProps, r = e.stateNode, i = nr(n, r), a = ir(n.default, n.update);
					if (t) {
						r = r.clones;
						var o = r === null ? null : r.map(Sf);
					} else o = e.memoizedState, e.memoizedState = null;
					r = e;
					var s = e.child, c = i;
					kS = 0, a = al(r, s, c, i, a, o, !1), e.flags & 4 && a && (t || Ql(e, n.onUpdate));
				} else e.subtreeFlags & 33554432 && ol(e, t);
				e = e.sibling;
			}
		}
		function sl(e) {
			var t = e.memoizedProps.name;
			if (t != null && t !== "auto") {
				var n = AS.get(t);
				if (n !== void 0) {
					if (n !== e && n !== e.alternate && !jS[t]) {
						jS[t] = !0;
						var r = JSON.stringify(t);
						A(e, function() {
							console.error("There are two <ViewTransition name=%s> components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name.", r);
						}), A(n, function() {
							console.error("The existing <ViewTransition name=%s> duplicate has this stack trace.", r);
						});
					}
				} else AS.set(t, e);
			}
		}
		function cl(e) {
			var t = e.memoizedProps.name;
			if (t != null && t !== "auto") {
				var n = AS.get(t);
				n === void 0 || n !== e && n !== e.alternate || AS.delete(t);
			}
		}
		function ll(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && !(t.flags & 256);
		}
		function ul(e, t, n) {
			if (e = e.containerInfo, bT = gE, e = Xn(e), Zn(e)) {
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
				if (e = BS, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && el(r[a]);
				if (e.alternate === null && e.flags & 2) n && Kc(e), dl(n);
				else {
					if (e.tag === 22) {
						if (r = e.alternate, e.memoizedState !== null) {
							r !== null && r.memoizedState === null && n && el(r), dl(n);
							continue;
						}
						if (r !== null && r.memoizedState !== null) {
							n && Kc(e), dl(n);
							continue;
						}
					}
					r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, BS = r) : (n && tl(e), dl(n));
				}
			}
			DS = null;
		}
		function dl(e) {
			for (; BS !== null;) {
				var t = BS, n = t, r = e, i = n.alternate, a = n.flags;
				switch (n.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						a & 1024 && i !== null && Ec(n, i);
						break;
					case 3:
						if (a & 1024) {
							if (r = n.stateNode.containerInfo, n = r.nodeType, n === 9) Jf(r);
							else if (n === 1) switch (r.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									Jf(r);
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
						r && i !== null && (r = i, i = n, n = nr(r.memoizedProps, r.stateNode), i = i.memoizedProps, i = ir(i.default, i.update), i !== "none" && Jc(r, n, i, r.memoizedState = [], !0));
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
		function fl(e, t, n) {
			var r = Ai(), i = Mi(), a = Pi(), o = Fi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ol(e, n), s & 4 && vc(n, wx | Sx);
					break;
				case 1:
					if (Ol(e, n), s & 4) {
						if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || yS || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(n) || "instance")), _c(n) ? (Vi(), A(n, Ob, n, e), zi()) : A(n, Ob, n, e);
						else {
							var c = ys(n.type, t.memoizedProps);
							t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || yS || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", D(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", D(n) || "instance")), _c(n) ? (Vi(), A(n, Ab, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), zi()) : A(n, Ab, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
						}
					}
					s & 64 && wc(n), s & 512 && kc(n, n.return);
					break;
				case 3:
					if (t = Ei(), Ol(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							A(n, wa, s, c);
						} catch (e) {
							Ru(n, n.return, e);
						}
					}
					e.effectDuration += Di(t);
					break;
				case 27: t === null && s & 4 && Gc(n);
				case 26:
				case 5:
					if (Ol(e, n), t === null) {
						if (s & 4) Rc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								A(n, ef, c, e, t, n);
							} catch (e) {
								Ru(n, n.return, e);
							}
						}
					}
					s & 512 && kc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = Ei(), Ol(e, n), e = n.stateNode, e.effectDuration += Oi(s);
						try {
							A(n, jc, n, t, Cy, e.effectDuration);
						} catch (e) {
							Ru(n, n.return, e);
						}
					} else Ol(e, n);
					break;
				case 31:
					Ol(e, n), s & 4 && yl(e, n);
					break;
				case 13:
					Ol(e, n), s & 4 && bl(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Hu.bind(null, n), $f(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || FS, !s) {
						var l = t !== null && t.memoizedState !== null || IS;
						t = FS, c = IS, FS = s, (IS = l) && !c ? (s = PS, n.subtreeFlags & 8772 && (s |= NS), Ml(e, n, s), (n.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && fr(n, J, Y)) : Ol(e, n), FS = t, IS = c;
					}
					break;
				case 30:
					s & 18874368 && sl(n), Ol(e, n), s & 512 && kc(n, n.return);
					break;
				case 7: s & 512 && kc(n, n.return);
				default: Ol(e, n);
			}
			(n.mode & K) !== G && 0 <= J && 0 <= Y && ((Ay || .05 < Oy) && hr(n, J, Y, Oy, ky), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < Y - J && (ll(n.return.alternate, n.return) || dr(n, J, Y, "Mount"))), ji(r), Ni(i), ky = a, Ay = o;
		}
		function pl(e, t) {
			for (e = e.child; e !== null;) ml(e, t), e = e.sibling;
		}
		function ml(e, t) {
			switch (e.tag) {
				case 5:
				case 26:
					try {
						var n = e.stateNode;
						t ? A(e, ff, n) : A(e, hf, e.stateNode, e.memoizedProps);
					} catch (t) {
						Ru(e, e.return, t);
					}
					hl(e, t);
					break;
				case 6:
					try {
						var r = e.stateNode;
						t ? A(e, pf, r) : A(e, gf, r, e.memoizedProps), rg = !0;
					} catch (t) {
						Ru(e, e.return, t);
					}
					break;
				case 18:
					try {
						var i = e.stateNode;
						t ? A(e, df, i) : A(e, mf, e.stateNode);
					} catch (t) {
						Ru(e, e.return, t);
					}
					break;
				case 22:
				case 23:
					e.memoizedState === null && pl(e, t);
					break;
				default: pl(e, t);
			}
		}
		function hl(e, t) {
			if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
				a: {
					var n = e, r = t;
					switch (n.tag) {
						case 4:
							ml(n, r);
							break a;
						case 22:
							n.memoizedState === null && hl(n, r);
							break a;
						default: hl(n, r);
					}
				}
				e = e.sibling;
			}
		}
		function gl(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, gl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ot(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function _l(e, t, n) {
			for (n = n.child; n !== null;) vl(e, t, n), n = n.sibling;
		}
		function vl(e, t, n) {
			if (Dh && typeof Dh.onCommitFiberUnmount == "function") try {
				Dh.onCommitFiberUnmount(Eh, n);
			} catch (e) {
				Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = Ai(), i = Mi(), a = Pi(), o = Fi();
			switch (n.tag) {
				case 26:
					IS || Ac(n, t), _l(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !IS && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					IS || Ac(n, t), Fc(n);
					var s = qS, c = JS;
					of(n.type) && (qS = n.stateNode, JS = !1), _l(e, t, n), A(n, fp, n.stateNode, n.type, n.memoizedProps), qS = s, JS = c;
					break;
				case 5: IS || Ac(n, t), Fc(n);
				case 6:
					if (n.tag === 6 && Fc(n), s = qS, c = JS, qS = null, _l(e, t, n), qS = s, JS = c, qS !== null) {
						if (JS) try {
							A(n, cf, qS, n.stateNode), rg = !0;
						} catch (e) {
							Ru(n, t, e);
						}
						else try {
							A(n, sf, qS, n.stateNode), rg = !0;
						} catch (e) {
							Ru(n, t, e);
						}
					}
					break;
				case 18:
					qS !== null && (JS ? (e = qS, lf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), fm(e)) : lf(qS, n.stateNode));
					break;
				case 4:
					s = qS, c = JS, qS = n.stateNode.containerInfo, JS = !0, _l(e, t, n), qS = s, JS = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					xc(Cx, n, t), IS || yc(n, t, wx), _l(e, t, n);
					break;
				case 1:
					IS || (Ac(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && Dc(n, t, s)), _l(e, t, n);
					break;
				case 21:
					_l(e, t, n);
					break;
				case 22:
					IS = (s = IS) || n.memoizedState !== null, _l(e, t, n), IS = s;
					break;
				case 30:
					n.flags & 18874368 && cl(n), Ac(n, t), _l(e, t, n);
					break;
				case 7:
					IS || Ac(n, t), _l(e, t, n);
					break;
				default: _l(e, t, n);
			}
			(n.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(n, J, Y, Oy, ky), ji(r), Ni(i), ky = a, Ay = o;
		}
		function yl(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					A(t, op, e);
				} catch (e) {
					Ru(t, t.return, e);
				}
			}
		}
		function bl(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				A(t, sp, e);
			} catch (e) {
				Ru(t, t.return, e);
			}
		}
		function xl(e) {
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
		function Sl(e, t) {
			var n = xl(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), kh) {
						if (VS !== null && HS !== null) Ju(HS, VS);
						else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					}
					var r = Uu.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function z(e, t, n) {
			var r = t.deletions;
			if (r !== null) for (var i = 0; i < r.length; i++) {
				var a = e, o = t, s = r[i], c = Ai(), l = o;
				a: for (; l !== null;) {
					switch (l.tag) {
						case 27:
							if (of(l.type)) {
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
				vl(a, o, s), qS = null, JS = !1, (s.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(s, J, Y, "Unmount"), ji(c), a = s, o = a.alternate, o !== null && (o.return = null), a.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Cl(t, e, n), t = t.sibling;
		}
		function Cl(e, t, n) {
			var r = Ai(), i = Mi(), a = Pi(), o = Fi(), s = e.alternate, c = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					if (c & 4 && (s = e.updateQueue, s = s === null ? null : s.events, s !== null)) for (var l = 0; l < s.length; l++) {
						var u = s[l];
						u.ref.impl = u.nextImpl;
					}
					z(t, e, n), wl(e), c & 4 && (xc(Cx | Sx, e, e.return), bc(Cx | Sx, e), yc(e, e.return, wx | Sx));
					break;
				case 1:
					z(t, e, n), wl(e), c & 512 && (IS || s === null || Ac(s, s.return)), c & 64 && FS && (t = e.updateQueue, t !== null && (n = t.callbacks, n !== null && (c = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = c === null ? n : c.concat(n))));
					break;
				case 26:
					if (l = YS, z(t, e, n), wl(e), c & 512 && (IS || s === null || Ac(s, s.return)), c & 4) {
						if (c = s === null ? null : s.memoizedState, n = e.memoizedState, s === null) {
							if (n === null) {
								if (e.stateNode === null) {
									if (FS) e.stateNode = Kd(e.type, e.memoizedProps, t.containerInfo, e);
									else {
										a: {
											t = e.type, n = e.memoizedProps, c = l.ownerDocument || l;
											b: switch (t) {
												case "title":
													s = c.getElementsByTagName("title")[0], (!s || s[Jh] || s[Vh] || s.namespaceURI === Ng || s.hasAttribute("itemprop")) && (s = c.createElement(t), c.head.insertBefore(s, c.querySelector("head > title"))), kd(s, t, n), s[Vh] = e, dt(s), t = s;
													break a;
												case "link":
													if (l = Op("link", "href", c).get(t + (n.href || ""))) {
														for (u = 0; u < l.length; u++) if (s = l[u], s.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && s.getAttribute("rel") === (n.rel == null ? null : n.rel) && s.getAttribute("title") === (n.title == null ? null : n.title) && s.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
															l.splice(u, 1);
															break b;
														}
													}
													s = c.createElement(t), kd(s, t, n), c.head.appendChild(s);
													break;
												case "meta":
													if (l = Op("meta", "content", c).get(t + (n.content || ""))) {
														for (u = 0; u < l.length; u++) if (s = l[u], Ie(n.content, "content"), s.getAttribute("content") === (n.content == null ? null : "" + n.content) && s.getAttribute("name") === (n.name == null ? null : n.name) && s.getAttribute("property") === (n.property == null ? null : n.property) && s.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && s.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
															l.splice(u, 1);
															break b;
														}
													}
													s = c.createElement(t), kd(s, t, n), c.head.appendChild(s);
													break;
												default: throw Error("getNodesForType encountered a type it did not expect: \"" + t + "\". This is a bug in React.");
											}
											s[Vh] = e, dt(s), t = s;
										}
										e.stateNode = t;
									}
								} else FS || kp(l, e.type, e.stateNode);
							} else e.stateNode = wp(l, n, e.memoizedProps);
						} else c === n ? n === null && e.stateNode !== null && zc(e, e.memoizedProps, s.memoizedProps) : (c === null ? (t = s.stateNode, t === null || IS || t.parentNode.removeChild(t)) : c.count--, n === null ? FS || kp(l, e.type, e.stateNode) : wp(l, n, e.memoizedProps));
					}
					break;
				case 27:
					z(t, e, n), wl(e), c & 512 && (IS || s === null || Ac(s, s.return)), s !== null && c & 4 && zc(e, e.memoizedProps, s.memoizedProps);
					break;
				case 5:
					if (l = LS, LS = !1, z(t, e, n), LS = l, wl(e), c & 512 && (IS || s === null || Ac(s, s.return)), e.flags & 32) {
						t = e.stateNode;
						try {
							A(e, nf, t), rg = !0;
						} catch (t) {
							Ru(e, e.return, t);
						}
					}
					c & 4 && e.stateNode != null && (t = e.memoizedProps, zc(e, t, s === null ? t : s.memoizedProps)), c & 1024 && (RS = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (z(t, e, n), wl(e), c & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						t = e.memoizedProps, n = s === null ? t : s.memoizedProps, c = e.stateNode;
						try {
							A(e, rf, c, n, t), rg = !0;
						} catch (t) {
							Ru(e, e.return, t);
						}
					}
					break;
				case 3:
					if (l = Ei(), rg = !1, GT = null, u = YS, YS = mp(t.containerInfo), z(t, e, n), YS = u, wl(e), c & 4 && s !== null && s.memoizedState.isDehydrated) try {
						A(e, ap, t.containerInfo);
					} catch (t) {
						Ru(e, e.return, t);
					}
					RS && (RS = !1, Tl(e)), t.effectDuration += Di(l), rg = !1;
					break;
				case 4:
					c = LS, LS = FS, s = _t(), l = YS, YS = mp(e.stateNode.containerInfo), z(t, e, n), wl(e), YS = l, rg && WS && (GS = !0), rg = s, LS = c;
					break;
				case 12:
					c = Ei(), z(t, e, n), wl(e), e.stateNode.effectDuration += Oi(c);
					break;
				case 31:
					z(t, e, n), wl(e), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Sl(e, t)));
					break;
				case 13:
					z(t, e, n), wl(e), e.child.flags & 8192 && e.memoizedState !== null != (s !== null && s.memoizedState !== null) && (zC = _h()), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Sl(e, t)));
					break;
				case 22:
					l = e.memoizedState !== null, u = s !== null && s.memoizedState !== null;
					var d = FS, f = IS, p = LS;
					FS = d || l, LS = p || l, IS = f || u, z(t, e, n), IS = f, LS = p, FS = d, u && !l && !d && !f && (e.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && fr(e, J, Y), wl(e), c & 8192 && (t = e.stateNode, t._visibility = l ? t._visibility & ~jv : t._visibility | jv, !l || s === null || u || FS || IS || (t = PS, n = u || IS, s = FS, u = IS, FS = l || FS, IS = n, Al(e, t), (e.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(e, J, Y, "Disconnect"), FS = s, IS = u), !l && LS || pl(e, l)), c & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Sl(e, n))));
					break;
				case 19:
					z(t, e, n), wl(e), c & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Sl(e, t)));
					break;
				case 30:
					c & 512 && (IS || s === null || Ac(s, s.return)), c = _t(), l = WS, u = (n & 335544064) === n, d = e.memoizedProps, WS = u && ir(d.default, d.update) !== "none", z(t, e, n), wl(e), u && s !== null && rg && (e.flags |= 4), WS = l, rg = c;
					break;
				case 21: break;
				case 7: c & 512 && (IS || s === null || Ac(s, s.return)), s && s.stateNode !== null && (s.stateNode._fragmentFiber = e);
				default: z(t, e, n), wl(e);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && ((Ay || .05 < Oy) && hr(e, J, Y, Oy, ky), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < Y - J && (ll(e.return.alternate, e.return) || dr(e, J, Y, "Mount"))), ji(r), Ni(i), ky = a, Ay = o;
		}
		function wl(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					A(e, Wc, e);
				} catch (t) {
					Ru(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function Tl(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				Tl(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gE = !0, t.reset(), gE = !1), e = e.sibling;
			}
		}
		function El(e, t) {
			if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Dl(t, e), t = t.sibling;
			else ol(t, !1);
		}
		function Dl(e, t) {
			var n = e.alternate;
			if (n === null) Qc(e, !1);
			else switch (e.tag) {
				case 3:
					if (KS = US = !1, qc(), El(t, e), !US && !GS) {
						if (e = OS, e !== null) for (var r = 0; r < e.length; r += 3) {
							n = e[r];
							var i = e[r + 1];
							yf(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
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
					El(t, e);
					break;
				case 4:
					r = US, US = !1, El(t, e), US && (GS = !0), US = r;
					break;
				case 22:
					e.memoizedState === null && (n.memoizedState === null ? El(t, e) : Qc(e, !1));
					break;
				case 30:
					r = US, i = qc(), US = !1, El(t, e), US && (e.flags |= 4);
					var a = e.memoizedProps, o = e.stateNode;
					t = nr(a, o), o = nr(n.memoizedProps, o);
					var s = ir(a.default, a.update);
					s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, kS = 0, t = al(e, n, t, o, s, a, !0), kS !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Ql(e, e.memoizedProps.onUpdate), OS = i) : i !== null && (i.push.apply(i, OS), OS = i), US = e.flags & 32 ? !0 : r;
					break;
				default: El(t, e);
			}
		}
		function Ol(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) fl(e, t.alternate, t), t = t.sibling;
		}
		function kl(e, t) {
			var n = Ai(), r = Mi(), i = Pi(), a = Fi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					yc(e, e.return, wx), Al(e, t);
					break;
				case 1:
					Ac(e, e.return);
					var o = e.stateNode;
					typeof o.componentWillUnmount == "function" && Dc(e, e.return, o), Al(e, t);
					break;
				case 27: (t & PS) !== MS && A(e, fp, e.stateNode, e.type, e.memoizedProps);
				case 5:
					Ac(e, e.return), e.tag !== 5 && e.tag !== 27 || Fc(e), Al(e, t);
					break;
				case 6:
					Fc(e);
					break;
				case 26:
					Ac(e, e.return), o = e.stateNode, e.memoizedState !== null || o === null || IS || o.parentNode.removeChild(o), Al(e, t);
					break;
				case 22:
					e.memoizedState === null && Al(e, t);
					break;
				case 30:
					e.flags & 18874368 && cl(e), Ac(e, e.return), Al(e, t);
					break;
				case 7: Ac(e, e.return);
				default: Al(e, t);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(e, J, Y, Oy, ky), ji(n), Ni(r), ky = i, Ay = a;
		}
		function Al(e, t) {
			for (e = e.child; e !== null;) kl(e, t), e = e.sibling;
		}
		function jl(e, t, n, r) {
			var i = Ai(), a = Mi(), o = Pi(), s = Fi(), c = n.flags, l = (r & NS) !== MS;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ml(e, n, r), vc(n, wx);
					break;
				case 1:
					if (Ml(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && A(n, Ob, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							A(n, Ca, t, e);
						} catch (e) {
							Ru(n, n.return, e);
						}
					}
					l && c & 64 && wc(n), kc(n, n.return);
					break;
				case 27: (r & PS) !== MS && Gc(n);
				case 5:
					n.tag !== 5 && n.tag !== 27 || Pc(n), Ml(e, n, r), l && t === null && c & 4 && Rc(n), kc(n, n.return);
					break;
				case 6:
					Pc(n);
					break;
				case 26:
					var u = n.stateNode;
					n.memoizedState !== null || u === null || FS || kp(mp(u.ownerDocument), n.type, u), Ml(e, n, r), l && t === null && c & 4 && Rc(n), kc(n, n.return);
					break;
				case 12:
					if (l && c & 4) {
						c = Ei(), Ml(e, n, r), l = n.stateNode, l.effectDuration += Oi(c);
						try {
							A(n, jc, n, t, Cy, l.effectDuration);
						} catch (e) {
							Ru(n, n.return, e);
						}
					} else Ml(e, n, r);
					break;
				case 31:
					Ml(e, n, r), l && c & 4 && yl(e, n);
					break;
				case 13:
					Ml(e, n, r), l && c & 4 && bl(e, n);
					break;
				case 22:
					n.memoizedState === null && Ml(e, n, r), kc(n, n.return);
					break;
				case 30:
					Ml(e, n, r), c & 18874368 && sl(n), kc(n, n.return);
					break;
				case 7: kc(n, n.return);
				default: Ml(e, n, r);
			}
			(n.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(n, J, Y, Oy, ky), ji(i), Ni(a), ky = o, Ay = s;
		}
		function Ml(e, t, n) {
			for (n = t.subtreeFlags & 8772 ? n : n & ~NS, t = t.child; t !== null;) jl(e, t.alternate, t, n), t = t.sibling;
		}
		function Nl(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && bi(e), n != null && xi(n));
		}
		function Pl(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (bi(t), e != null && xi(e));
		}
		function Fl(e, t, n, r, i) {
			var a = (n & 335544064) === n;
			if (t.subtreeFlags & (a ? 10262 : 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) a = t.sibling, Il(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			else a && il(t);
		}
		function Il(e, t, n, r, i) {
			var a = Ai(), o = Mi(), s = Pi(), c = Fi(), l = Tv, u = (n & 335544064) === n;
			u && t.alternate === null && t.return !== null && t.return.alternate !== null && rl(t);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && pr(t, t.actualStartTime, i, XS, n), Fl(e, t, n, r, i), d & 2048 && Sc(t, Tx | Sx);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? mr(t, t.actualStartTime, i, []) : t.flags & 1 && pr(t, t.actualStartTime, i, XS, n)), Fl(e, t, n, r, i);
					break;
				case 3:
					var f = Ei(), p = XS;
					XS = t.alternate !== null && t.alternate.memoizedState.isDehydrated && !(t.flags & 256), Fl(e, t, n, r, i), XS = p, u && KS && (n = e.containerInfo, n = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, n.style.viewTransitionName === "root" && (n.style.viewTransitionName = ""), n = n.ownerDocument.documentElement, n !== null && n.style.viewTransitionName === "none" && (n.style.viewTransitionName = "")), d & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (bi(r), n != null && xi(n))), e.passiveEffectDuration += Di(f);
					break;
				case 12:
					if (d & 2048) {
						d = Ei(), Fl(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += Oi(d);
						try {
							A(t, Mc, t, t.alternate, Cy, e.passiveEffectDuration);
						} catch (e) {
							Ru(t, t.return, e);
						}
					} else Fl(e, t, n, r, i);
					break;
				case 31:
					d = XS, f = t.alternate === null ? null : t.alternate.memoizedState, u = t.memoizedState, f !== null && u === null ? (u = t.deletions, u !== null && 0 < u.length && u[0].tag === 18 ? (XS = !1, f = f.hydrationErrors, f !== null && mr(t, t.actualStartTime, i, f)) : XS = !0) : XS = !1, Fl(e, t, n, r, i), XS = d;
					break;
				case 13:
					d = XS, f = t.alternate === null ? null : t.alternate.memoizedState, u = t.memoizedState, f === null || f.dehydrated === null || u !== null && u.dehydrated !== null ? XS = !1 : (u = t.deletions, u !== null && 0 < u.length && u[0].tag === 18 ? (XS = !1, f = f.hydrationErrors, f !== null && mr(t, t.actualStartTime, i, f)) : XS = !0), Fl(e, t, n, r, i), XS = d;
					break;
				case 23: break;
				case 22:
					p = t.stateNode, f = t.alternate, t.memoizedState === null ? (u && f !== null && f.memoizedState !== null && rl(t), p._visibility & Mv ? Fl(e, t, n, r, i) : (p._visibility |= Mv, Ll(e, t, n, r, !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || XS || (e = t.actualStartTime, 0 <= e && .05 < i - e && fr(t, e, i), 0 <= J && 0 <= Y && .05 < Y - J && fr(t, J, Y)))) : (u && f !== null && f.memoizedState === null && rl(f), p._visibility & Mv ? Fl(e, t, n, r, i) : zl(e, t, n, r, i)), d & 2048 && Nl(f, t);
					break;
				case 24:
					Fl(e, t, n, r, i), d & 2048 && Pl(t.alternate, t);
					break;
				case 30:
					u && (d = t.alternate, d !== null && (Xc(d.child, !0), Xc(t.child, !0))), Fl(e, t, n, r, i);
					break;
				default: Fl(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !XS && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && dr(t, n, i, "Mount")), 0 <= J && 0 <= Y && ((Ay || .05 < Oy) && hr(t, J, Y, Oy, ky), e && .05 < Y - J && dr(t, J, Y, "Mount"))), ji(a), Ni(o), ky = s, Ay = c, Tv = l;
		}
		function Ll(e, t, n, r, i, a) {
			for (i &&= !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Rl(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Rl(e, t, n, r, i, a) {
			var o = Ai(), s = Mi(), c = Pi(), l = Fi(), u = Tv;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && pr(t, t.actualStartTime, a, XS, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Ll(e, t, n, r, i, a), Sc(t, Tx);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= Mv, Ll(e, t, n, r, i, a)) : f._visibility & Mv ? Ll(e, t, n, r, i, a) : zl(e, t, n, r, a), i && d & 2048 && Nl(t.alternate, t);
					break;
				case 24:
					Ll(e, t, n, r, i, a), i && d & 2048 && Pl(t.alternate, t);
					break;
				default: Ll(e, t, n, r, i, a);
			}
			(t.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(t, J, Y, Oy, ky), ji(o), Ni(s), ky = c, Ay = l, Tv = u;
		}
		function zl(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Tv;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && pr(a, a.actualStartTime, l, XS, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						zl(o, a, s, c, l), d & 2048 && Nl(a.alternate, a);
						break;
					case 24:
						zl(o, a, s, c, l), d & 2048 && Pl(a.alternate, a);
						break;
					default: zl(o, a, s, c, l);
				}
				Tv = u, a = t;
			}
		}
		function Bl(e, t, n) {
			if (e.subtreeFlags & ZS) for (e = e.child; e !== null;) Vl(e, t, n), e = e.sibling;
		}
		function Vl(e, t, n) {
			switch (e.tag) {
				case 26:
					Bl(e, t, n), e.flags & ZS && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Pp(n, e)) : Fp(n, YS, e.memoizedState, e.memoizedProps));
					break;
				case 5:
					Bl(e, t, n), e.flags & ZS && (e = e.stateNode, (t & 335544128) === t && Pp(n, e));
					break;
				case 3:
				case 4:
					var r = YS;
					YS = mp(e.stateNode.containerInfo), Bl(e, t, n), YS = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = ZS, ZS = 16777216, Bl(e, t, n), ZS = r) : Bl(e, t, n));
					break;
				case 30:
					if ((e.flags & ZS) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
						var i = e.stateNode;
						i.paired = null, DS === null && (DS = /* @__PURE__ */ new Map()), DS.set(r, i);
					}
					Bl(e, t, n);
					break;
				default: Bl(e, t, n);
			}
		}
		function Hl(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Ul(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = Ai();
					BS = r, ql(r, e), (r.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(r, J, Y, "Unmount"), ji(i);
				}
				Hl(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Wl(e), e = e.sibling;
		}
		function Wl(e) {
			var t = Ai(), n = Mi(), r = Pi(), i = Fi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Ul(e), e.flags & 2048 && Cc(e, e.return, Tx | Sx);
					break;
				case 3:
					var a = Ei();
					Ul(e), e.stateNode.passiveEffectDuration += Di(a);
					break;
				case 12:
					a = Ei(), Ul(e), e.stateNode.passiveEffectDuration += Oi(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & Mv && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~Mv, Gl(e), (e.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(e, J, Y, "Disconnect")) : Ul(e);
					break;
				default: Ul(e);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(e, J, Y, Oy, ky), ji(t), Ni(n), Ay = i, ky = r;
		}
		function Gl(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = Ai();
					BS = r, ql(r, e), (r.mode & K) !== G && 0 <= J && 0 <= Y && .05 < Y - J && dr(r, J, Y, "Unmount"), ji(i);
				}
				Hl(e);
			}
			for (e = e.child; e !== null;) Kl(e), e = e.sibling;
		}
		function Kl(e) {
			var t = Ai(), n = Mi(), r = Pi(), i = Fi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Cc(e, e.return, Tx), Gl(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & Mv && (a._visibility &= ~Mv, Gl(e));
					break;
				default: Gl(e);
			}
			(e.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(e, J, Y, Oy, ky), ji(t), Ni(n), Ay = i, ky = r;
		}
		function ql(e, t) {
			for (; BS !== null;) {
				var n = BS, r = n, i = t, a = Ai(), o = Mi(), s = Pi(), c = Fi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Cc(r, i, Tx);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && bi(i));
						break;
					case 24: xi(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= J && 0 <= Y && (Ay || .05 < Oy) && hr(r, J, Y, Oy, ky), ji(a), Ni(o), Ay = c, ky = s, r = n.child, r !== null) r.return = n, BS = r;
				else a: for (n = e; BS !== null;) {
					if (r = BS, a = r.sibling, o = r.return, gl(r), r === n) {
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
		function Jl() {
			eC.forEach(function(e) {
				return e();
			});
		}
		function Yl() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || W.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function Xl(e) {
			if ((fC & rC) !== nC && $ !== 0) return $ & -$;
			var t = W.T;
			return t === null ? (e = it(), e === Ih && (Gb = null), e) : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), Gb !== null && it() === Ih && (Gb = null), od());
		}
		function Zl() {
			if (PC === 0) {
				if (!($ & 536870912) || q) {
					var e = Ph;
					Ph <<= 1, !(Ph & 3932160) && (Ph = 262144), PC = e;
				} else PC = 536870912;
			}
			return e = gx.current, e !== null && (e.flags |= 32), PC;
		}
		function Ql(e, t) {
			if (t != null) {
				var n = e.stateNode, r = n.ref;
				r === null && (r = n.ref = Of(nr(e.memoizedProps, n))), fw === null && (fw = []), fw.push(t.bind(null, r));
			}
		}
		function $l(e, t, n) {
			if (Tw && console.error("useInsertionEffect must not schedule updates."), bw && (xw = !0), (e === pC && (wC === gC || wC === CC) || e.cancelPendingCommit !== null) && (su(e, 0), ru(e, $, PC, !1)), Ye(e, n), (fC & rC) !== nC && e === pC) {
				if (dh) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && D(Q) || "Unknown", kw.has(e) || (kw.add(e), t = D(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: Ow ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else kh && tt(e, t, n), Xu(t), e === pC && ((fC & rC) === nC && (MC |= n), AC === lC && ru(e, $, PC, !1)), Zu(e);
		}
		function eu(e, t, n) {
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
			a = (n = !n && !(t & 127) && (t & e.expiredLanes) === 0 || We(e, t)) ? gu(e, t) : mu(e, t, !0);
			var o = n;
			do {
				if (a === aC) {
					DC && !n && ru(e, t, 0, !1), t = wC, rb = vy(), nb = t;
					break;
				}
				if (r = _h(), i = e.current.alternate, o && !nu(i)) ur(t), i = Sy, a = r, !xv || a <= i || (GC ? GC.run(console.timeStamp.bind(console, "Teared Render", i, a, wv, Cv, "error")) : console.timeStamp("Teared Render", i, a, wv, Cv, "error")), ou(t, r), a = mu(e, t, !1), o = !1;
				else {
					if (a === sC) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							ur(t), vr(Sy, r, t, GC), ou(t, r), t = s;
							a: {
								r = e, a = o, o = IC;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (su(r, s).flags |= 256), s = mu(r, s, !1), s !== sC && s !== uC) {
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
						ur(t), vr(Sy, r, t, GC), ou(t, r), su(e, 0), ru(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case aC:
							case oC: throw Error("Root did not complete. This is a bug in React.");
							case lC: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
							case uC:
								ur(t), gr(Sy, r, t, GC), ou(t, r), i = t, i & 127 ? By = r : i & 4194048 && (Zy = r), ru(n, t, PC, !EC);
								break a;
							case sC:
								LC = null;
								break;
							case cC:
							case dC: break;
							default: throw Error("Unknown root exit status.");
						}
						if (W.actQueue !== null) wu(n, i, t, LC, WC, RC, PC, MC, FC, EC, a, null, null, Sy, r);
						else {
							if ((t & 62914560) === t && (o = zC + VC - _h(), 10 < o)) {
								if (ru(n, t, PC, !EC), Ue(n, 0, !0) !== 0) break a;
								ow = t, n.timeoutHandle = ET(tu.bind(null, n, i, LC, WC, RC, t, PC, MC, FC, EC, a, "Throttled", Sy, r), o);
								break a;
							}
							tu(n, i, LC, WC, RC, t, PC, MC, FC, EC, a, null, Sy, r);
						}
					}
					break;
				}
			} while (1);
			Zu(e);
		}
		function tu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
				unsuspend: gn
			}, DS = null, Vl(t, a, g), h && (m = g, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = Rp.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? zC - _h() : (a & 4194048) === a ? BC - _h() : 0, m = Ip(g, m), m !== null) ? (ow = a, e.cancelPendingCommit = m(wu.bind(null, e, t, a, n, r, i, o, s, c, l, u, g, g.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < g.count ? 0 < g.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : g.imgCount === 1 ? "Suspended on an Image" : 0 < g.imgCount ? "Suspended on Images" : null, f, p)), ru(e, a, o, !l)) : wu(e, t, a, n, r, i, o, s, c, l, u, g, d, f, p);
		}
		function nu(e) {
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
		function ru(e, t, n, r) {
			t = Ge(e, t), t &= ~NC, t &= ~MC, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Ah(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && Ze(e, n, t);
		}
		function iu() {
			return (fC & (rC | iC)) !== nC || (Qu(0, !1), !1);
		}
		function au() {
			if (Q !== null) {
				if (wC === mC) var e = Q.return;
				else e = Q, ci(), Ka(e), Xb = null, Zb = 0, e = Q;
				for (; e !== null;) gc(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function ou(e, t) {
			e & 127 && (jy = t), e & 4194048 && (Vy = t), e & 62914560 && (Qy = t), e & 2080374784 && ($y = t);
		}
		function su(e, t) {
			xv && (console.timeStamp("Blocking Track", .003, .003, "Blocking", Cv, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", Cv, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", Cv, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", Cv, "primary-light"));
			var n = Sy;
			if (Sy = vy(), $ !== 0 && 0 < n) {
				if (ur($), AC === cC || AC === lC) gr(n, Sy, t, GC);
				else {
					var r = Sy, i = GC;
					if (xv && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, wv, Cv, a)) : console.timeStamp(o, n, r, wv, Cv, a);
					}
				}
				ou($, Sy);
			}
			if (n = GC, GC = null, t & 127) {
				GC = Ny, i = 0 <= My && My < jy ? jy : My, r = 0 <= Ly && Ly < jy ? jy : Ly, a = 0 <= r ? r : 0 <= i ? i : Sy, 0 <= By ? (ur(2), _r(By, a, t, n)) : eb & 127 && (ur(2), Sr(jy, a, tb)), n = i;
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
			return t & 4194048 && (GC = Gy, i = 0 <= Hy && Hy < Vy ? Vy : Hy, n = 0 <= Uy && Uy < Vy ? Vy : Uy, r = 0 <= Jy && Jy < Vy ? Vy : Jy, a = 0 <= r ? r : 0 <= n ? n : Sy, 0 <= Zy ? (ur(256), _r(Zy, a, t, GC)) : eb & 4194048 && (ur(256), Sr(Vy, a, tb)), d = r, s = Yy, c = 0 < Xy, l = Wy === xy, a = Sy, r = Gy, o = Ky, u = qy, xv && (wv = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, wv, Cv, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, wv, Cv, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, wv, Cv, "primary-dark")) : console.timeStamp("Action", i, n, wv, Cv, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: wv,
					trackGroup: Cv,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n), performance.clearMeasures(i))), Uy = Hy = -1.1, Wy = 0, Zy = -1.1, Xy = Jy, Jy = -1.1, Vy = vy()), t & 62914560 && eb & 62914560 && (ur(4194304), Sr(Qy, Sy, tb)), t & 2080374784 && eb & 2080374784 && (ur(268435456), Sr($y, Sy, tb)), n = e.timeoutHandle, n !== OT && (e.timeoutHandle = OT, DT(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), ow = 0, au(), pC = e, Q = n = Fr(e.current, null), $ = t, wC = mC, TC = null, EC = !1, DC = We(e, t), OC = !1, AC = aC, FC = PC = NC = MC = jC = 0, LC = IC = null, RC = !1, kC = Ge(e, t), Cr(), e = lv(), 1e3 < e - sv && (W.recentlyCreatedOwnerStacks = 0, sv = e), fb.discardPendingWarnings(), n;
		}
		function cu(e, t) {
			X = null, W.H = Gx, W.getCurrentStack = null, dh = !1, uh = null, t === Vb || t === Ub ? (t = $i(), wC = _C) : t === Hb ? (t = $i(), wC = vC) : wC = t === pS ? SC : typeof t == "object" && t && typeof t.then == "function" ? bC : hC, TC = t;
			var n = Q;
			n === null ? (AC = oC, Cs(e, Ur(t, e.current))) : n.mode & K && Li(n);
		}
		function lu() {
			var e = gx.current;
			return e === null ? !0 : ($ & 4194048) === $ ? _x === null : ($ & 62914560) === $ || $ & 536870912 ? e === _x : !1;
		}
		function uu() {
			var e = W.H;
			return W.H = Gx, e === null ? Gx : e;
		}
		function du() {
			var e = W.A;
			return W.A = QS, e;
		}
		function fu(e) {
			GC === null && (GC = e._debugTask == null ? null : e._debugTask);
		}
		function pu() {
			AC = lC, EC || ($ & 4194048) !== $ && gx.current !== null || (DC = !0), !(jC & 134217727) && !(MC & 134217727) || pC === null || ru(pC, $, PC, !1);
		}
		function mu(e, t, n) {
			var r = fC;
			fC |= rC;
			var i = uu(), a = du();
			if (pC !== e || $ !== t) {
				if (kh) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Ju(e, $), o.clear()), nt(e, t);
				}
				WC = null, su(e, t);
			}
			t = !1, o = AC;
			a: do
				try {
					if (wC !== mC && Q !== null) {
						var s = Q, c = TC;
						switch (wC) {
							case SC:
								au(), o = uC;
								break a;
							case _C:
							case gC:
							case CC:
							case bC:
								gx.current === null && (t = !0);
								var l = wC;
								if (wC = mC, TC = null, xu(e, s, c, l), n && DC) {
									o = aC;
									break a;
								}
								break;
							default: l = wC, wC = mC, TC = null, xu(e, s, c, l);
						}
					}
					hu(), o = AC;
					break;
				} catch (t) {
					cu(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, ci(), fC = r, W.H = i, W.A = a, Q === null && (pC = null, $ = 0, Cr()), o;
		}
		function hu() {
			for (; Q !== null;) vu(Q);
		}
		function gu(e, t) {
			var n = fC;
			fC |= rC;
			var r = uu(), i = du();
			if (pC !== e || $ !== t) {
				if (kh) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Ju(e, $), a.clear()), nt(e, t);
				}
				WC = null, HC = _h() + UC, su(e, t);
			} else DC = We(e, t);
			a: do
				try {
					if (wC !== mC && Q !== null) b: switch (t = Q, a = TC, wC) {
						case hC:
							wC = mC, TC = null, xu(e, t, a, hC);
							break;
						case gC:
						case CC:
							if (Xi(a)) {
								wC = mC, TC = null, yu(t);
								break;
							}
							t = function() {
								wC !== gC && wC !== CC || pC !== e || (wC = xC), Zu(e);
							}, a.then(t, t);
							break a;
						case _C:
							wC = xC;
							break a;
						case vC:
							wC = yC;
							break a;
						case xC:
							Xi(a) ? (wC = mC, TC = null, yu(t)) : (wC = mC, TC = null, xu(e, t, a, xC));
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
											l === null ? Q = null : (Q = l, Su(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							wC = mC, TC = null, xu(e, t, a, yC);
							break;
						case bC:
							wC = mC, TC = null, xu(e, t, a, bC);
							break;
						case SC:
							au(), AC = uC;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					W.actQueue === null ? _u() : hu();
					break;
				} catch (t) {
					cu(e, t);
				}
			while (1);
			return ci(), W.H = r, W.A = i, fC = n, Q === null ? (pC = null, $ = 0, Cr(), AC) : aC;
		}
		function _u() {
			for (; Q !== null && !hh();) vu(Q);
		}
		function vu(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = A(e, sc, t, e, kC) : (Ii(e), t = A(e, sc, t, e, kC), Li(e)), e.memoizedProps = e.pendingProps, t === null ? Su(e) : Q = t;
		}
		function yu(e) {
			var t = A(e, bu, e);
			e.memoizedProps = e.pendingProps, t === null ? Su(e) : Q = t;
		}
		function bu(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && Ii(e), e.tag) {
				case 15:
				case 0:
					t = Vs(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = Vs(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5:
					Ka(e);
					var r = e;
					r === ey && (q ? (ni(r), r.tag === 5 && r.stateNode != null && (ty = r.stateNode)) : (ni(r), q = !0));
				default: gc(t, e), e = Q = Ir(e, kC), t = sc(t, e, kC);
			}
			return n && Li(e), t;
		}
		function xu(e, t, n, r) {
			ci(), Ka(t), Xb = null, Zb = 0;
			var i = t.return;
			try {
				if (Os(e, i, t, n, $)) {
					AC = oC, Cs(e, Ur(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				AC = oC, Cs(e, Ur(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (q || r === hC ? e = !0 : DC || $ & 536870912 ? e = !1 : (EC = e = !0, (r === gC || r === CC || r === _C || r === bC) && (r = gx.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Cu(t, e)) : Su(t);
		}
		function Su(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					Cu(t, EC);
					return;
				}
				var n = t.alternate;
				if (e = t.return, Ii(t), n = A(t, mc, n, t, kC), (t.mode & K) !== G && Ri(t), n !== null) {
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
		function Cu(e, t) {
			do {
				var n = hc(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & K) !== G) {
					Ri(e), n = e.actualDuration;
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
		function wu(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) {
			e.cancelPendingCommit = null;
			do
				Fu();
			while (rw !== ZC);
			if (fb.flushLegacyContextWarning(), fb.flushPendingUnsafeLifecycleWarnings(), (fC & (rC | iC)) !== nC) throw Error("Should not already be working.");
			if (ur(n), u === sC) vr(p, m, n, GC);
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
				e === pC && (Q = pC = null, $ = 0), aw = t, iw = e, ow = n, lw = i, uw = r, cw = m, mw = f, hw = qC, gw = null, Tu(e, t, n, o, s, c, d, f, m);
			}
		}
		function Tu(e, t, n, r, i, a, o, s, c) {
			var l = t.lanes | t.childLanes;
			if (sw = l, l |= Fv, Xe(e, n, l, r, i, a), fw = null, (n & 335544064) === n ? (pw = Ci(e), r = 10262) : (pw = null, r = 10256), t.actualDuration !== 0 || (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(xh, function() {
				return TT = window.event, hw === qC && (hw = YC), Iu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), Ty = null, Cy = vy(), s !== null && yr(c, Cy, s, GC), ES = !1, s = !!(t.flags & 13878), t.subtreeFlags & 13878 || s) {
				s = W.T, W.T = null, c = Um.p, Um.p = Ih, r = fC, fC |= iC;
				try {
					ul(e, t, n);
				} finally {
					fC = r, Um.p = c, W.T = s;
				}
			}
			rw = QC, ES ? (eb |= n, tb = null, dw = Ef(o, e.containerInfo, pw, Au, ju, ku, Mu, Iu, Eu, Du, Ou.bind(null, n))) : (Au(), ju(), Mu());
		}
		function Eu(e) {
			if (rw !== ZC) {
				var t = iw.onRecoverableError;
				t(e, Nu(null));
			}
		}
		function Du(e) {
			wy = vy(), xr(mw === null ? cw : Cy, wy, Ty, hw === JC, GC), mw = gw = e;
		}
		function Ou(e) {
			if ((eb & e) !== 0) {
				var t = tb;
				eb &= ~e, tb = null, e & 4194048 && !($ & 4194048) && !(ow & 4194048) && (ur(256), Sr(Vy, _h(), t)), e & 62914560 && !($ & 62914560) && !(ow & 62914560) && (ur(4194304), Sr(Qy, _h(), t)), e & 2080374784 && !($ & 2080374784) && !(ow & 2080374784) && (ur(268435456), Sr($y, _h(), t));
			}
		}
		function ku() {
			rw === ew && (rw = ZC, Dl(aw, iw), rw = tw);
		}
		function Au() {
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
						VS = n, HS = e, WS = GS = !1, ki(), Cl(t, e, n), HS = VS = null, n = xT;
						var o = Xn(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Yn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Zn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Jn(s, h), v = Jn(s, g);
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
		function ju() {
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
						VS = n, HS = e, ki(), fl(e, t.alternate, t), HS = VS = null;
					} finally {
						fC = a, Um.p = i, W.T = r;
					}
				}
				e = cw, t = mw, wy = vy(), xr(t === null ? e : Cy, wy, Ty, hw === JC, GC), rw = ew;
			}
		}
		function Mu() {
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
				(a = r.actualDuration !== 0 || (r.subtreeFlags & a) !== 0 || (r.flags & a) !== 0) ? rw = nw : (rw = ZC, aw = iw = null, Pu(t, t.pendingLanes), Cw = 0, ww = null);
				var o = t.pendingLanes;
				if (o === 0 && (KC = null), a || Ku(t), o = rt(n), r = r.stateNode, Dh && typeof Dh.onCommitFiberRoot == "function") try {
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
				if (kh && t.memoizedUpdaters.clear(), Jl(), i !== null) {
					s = W.T, c = Um.p, Um.p = Ih, W.T = null;
					try {
						var l = t.onRecoverableError;
						for (r = 0; r < i.length; r++) {
							var u = i[r], d = Nu(u.stack);
							A(u.source, l, u.value, d);
						}
					} finally {
						W.T = s, Um.p = c;
					}
				}
				if (l = fw, u = pw, pw = null, l !== null && (fw = null, u === null && (u = []), e !== null)) for (d = 0; d < l.length; d++) i = (0, l[d])(u), i !== void 0 && e.finished.finally(i);
				ow & 3 && Fu(), Zu(t), o = t.pendingLanes, n & 261930 && o & 42 ? (ab = !0, t === yw ? vw++ : (vw = 0, yw = t)) : (vw = 0, yw = null), a || ou(n, wy), Qu(0, !1);
			}
		}
		function Nu(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Pu(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, xi(t)));
		}
		function Fu() {
			return dw !== null && (dw.skipTransition(), Ew || (Ew = !0, console.warn("A flushSync update cancelled a View Transition because it was called while the View Transition was still preparing. To preserve the synchronous semantics, React had to skip the View Transition. If you can, try to avoid flushSync() in a scenario that's likely to interfere.")), dw = null, hw = JC), Au(), ju(), Mu(), Iu();
		}
		function Iu() {
			if (rw !== nw) return !1;
			var e = iw, t = sw;
			sw = 0;
			var n = rt(ow), r = Rh === 0 || Rh > n ? Rh : n;
			n = W.T;
			var i = Um.p;
			try {
				Um.p = r, W.T = null;
				var a = lw;
				lw = null, r = iw;
				var o = ow;
				if (rw = ZC, aw = iw = null, ow = 0, (fC & (rC | iC)) !== nC) throw Error("Cannot flush passive effects while already rendering.");
				ur(o), bw = !0, xw = !1;
				var s = 0;
				if (Ty = null, s = _h(), hw === XC) Sr(wy, s, tb);
				else {
					var c = wy, l = s, u = hw === YC;
					!xv || l <= c || (GC ? GC.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, wv, Cv, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, wv, Cv, "secondary-light"));
				}
				c = fC, fC |= iC;
				var d = r.current;
				ki(), Wl(d);
				var f = r.current;
				d = cw, ki(), Il(r, f, o, a, d), Ku(r), fC = c;
				var p = _h();
				if (f = s, d = GC, Ty === null ? !xv || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, wv, Cv, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, wv, Cv, "secondary-dark")) : br(f, p, Ty, !0, d), ou(o, p), Qu(0, !1), xw ? r === ww ? Cw++ : (Cw = 0, ww = r) : Cw = 0, xw = bw = !1, Dh && typeof Dh.onPostCommitFiberRoot == "function") try {
					Dh.onPostCommitFiberRoot(Eh, r);
				} catch (e) {
					Oh || (Oh = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Um.p = i, W.T = n, Pu(e, t);
			}
		}
		function Lu(e, t, n) {
			t = Ur(n, t), Bi(t), t = Ts(e.stateNode, t, 2), e = _a(e, t, 2), e !== null && (Ye(e, 2), Zu(e));
		}
		function Ru(e, t, n) {
			if (Tw = !1, e.tag === 3) Lu(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Lu(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (KC === null || !KC.has(r))) {
							e = Ur(n, e), Bi(e), n = Es(2), r = _a(t, n, 2), r !== null && (Ds(n, r, t, e), Ye(r, 2), Zu(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function zu(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new tC();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (OC = !0, i.add(n), r = Bu.bind(null, e, t, n), kh && Ju(e, n), t.then(r, r));
		}
		function Bu(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > My && (jy = My = vy(), Ny = yy("Promise Resolved"), Py = xy) : n & 4194048 && 0 > Uy && (Vy = Uy = vy(), Gy = yy("Promise Resolved"), Wy = xy), Yl() && W.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), pC === e && ($ & n) === n && ((AC === lC || AC === cC && ($ & 62914560) === $ && _h() - zC < VC) && (fC & rC) === nC ? su(e, 0) : NC |= n, FC === $ && (FC = 0)), Zu(e);
		}
		function Vu(e, t) {
			t === 0 && (t = qe()), e = Er(e, t), e !== null && (Ye(e, t), Zu(e));
		}
		function Hu(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Vu(e, n);
		}
		function Uu(e, t) {
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
			r !== null && r.delete(t), Vu(e, n);
		}
		function Wu(e, t, n) {
			if (t.subtreeFlags & 134225920) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Em;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 134225920 ? A(i, Gu, r, i) : i.subtreeFlags & 134217728 && A(i, Wu, r, i, a)) : i.flags & 134217728 ? a && A(i, Gu, r, i) : Wu(r, i, a), t = t.sibling;
			}
		}
		function Gu(e, t) {
			Be(!0);
			try {
				kl(t, MS), Kl(t), jl(e, t.alternate, t, MS), Rl(e, t, 0, null, !1, 0);
			} finally {
				Be(!1);
			}
		}
		function Ku(e) {
			var t = !0;
			e.current.mode & (Bv | Vv) || (t = !1), Wu(e, e.current, t);
		}
		function qu(e) {
			if ((fC & rC) === nC) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = D(e) || "ReactComponent", Dw !== null) {
						if (Dw.has(t)) return;
						Dw.add(t);
					} else Dw = /* @__PURE__ */ new Set([t]);
					A(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Ju(e, t) {
			kh && e.memoizedUpdaters.forEach(function(n) {
				tt(e, n, t);
			});
		}
		function Yu(e, t) {
			var n = W.actQueue;
			return n === null ? ph(e, t) : (n.push(t), Aw);
		}
		function Xu(e) {
			Yl() && W.actQueue === null && A(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", D(e));
			});
		}
		function Zu(e) {
			e !== Mw && e.next === null && (Mw === null ? jw = Mw = e : Mw = Mw.next = e), Fw = !0, W.actQueue === null ? Nw || (Nw = !0, ad()) : Pw || (Pw = !0, ad());
		}
		function Qu(e, t) {
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
								a !== 0 && (n = !0, rd(r, a));
							} else a = $, a = Ue(r, r === pC ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== OT), !(a & 3) || We(r, a) || (n = !0, rd(r, a));
						}
						r = r.next;
					}
				while (n);
				Iw = !1;
			}
		}
		function $u() {
			TT = window.event, ed();
		}
		function ed() {
			Fw = Pw = Nw = !1;
			var e = 0;
			Lw !== 0 && Yd() && (e = Lw);
			for (var t = _h(), n = null, r = jw; r !== null;) {
				var i = r.next, a = td(r, t);
				a === 0 ? (r.next = null, n === null ? jw = i : n.next = i, i === null && (Mw = n)) : (n = r, (e !== 0 || a & 3) && (Fw = !0)), r = i;
			}
			rw !== ZC && rw !== nw || Qu(e, !1), Lw !== 0 && (Lw = 0);
		}
		function td(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Ah(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ke(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = pC, n = $, n = Ue(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== OT), r = e.callbackNode, n === 0 || e === t && (wC === gC || wC === CC) || e.cancelPendingCommit !== null) return r !== null && id(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || We(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || W.actQueue !== null && r !== Rw) id(r);
				else return t;
				switch (rt(n)) {
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
				return r = nd.bind(null, e), W.actQueue === null ? n = ph(n, r) : (W.actQueue.push(r), n = Rw), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && id(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function nd(e, t) {
			if (ab = ib = !1, TT = window.event, rw !== ZC && rw !== nw) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (hw === qC && (hw = YC), Fu() && e.callbackNode !== n) return null;
			var r = $;
			return r = Ue(e, e === pC ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== OT), r === 0 ? null : (eu(e, r, t), td(e, _h()), e.callbackNode != null && e.callbackNode === n ? nd.bind(null, e) : null);
		}
		function rd(e, t) {
			if (Fu()) return null;
			ib = ab, ab = !1, eu(e, t, !0);
		}
		function id(e) {
			e !== Rw && e !== null && mh(e);
		}
		function ad() {
			W.actQueue !== null && W.actQueue.push(function() {
				return ed(), null;
			}), jT(function() {
				(fC & (rC | iC)) === nC ? ed() : ph(yh, $u);
			});
		}
		function od() {
			if (Lw === 0) {
				var e = cb;
				e === 0 && (e = Nh, Nh <<= 1, !(Nh & 261888) && (Nh = 256)), Lw = e;
			}
			return Lw;
		}
		function sd(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Ie(e, "action"), hn(e));
		}
		function cd(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = sd((i[Hh] || null).action), o = r.submitter;
				o && (t = (t = o[Hh] || null) ? sd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
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
									Object.freeze(t), Qo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), Qo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function B(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				dv(e);
			}
			e.currentTarget = null;
		}
		function ld(e, t) {
			t = !!(t & 4);
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? B(a, s, l) : A(c, B, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? B(a, s, l) : A(c, B, a, s, l), i = c;
					}
				}
			}
		}
		function V(e, t) {
			Bw.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Wh];
			n === void 0 && (n = t[Wh] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (fd(t, e, 2, !1), n.add(r));
		}
		function ud(e, t, n) {
			Bw.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), fd(n, e, r, t);
		}
		function dd(e) {
			if (!e[Vw]) {
				e[Vw] = !0, Xh.forEach(function(t) {
					t !== "selectionchange" && (Bw.has(t) || ud(t, !1, e), ud(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[Vw] || (t[Vw] = !0, ud("selectionchange", !1, t));
			}
		}
		function fd(e, t, n, r) {
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
		function pd(e, t, n, r, i) {
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
						if (o = st(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			yn(function() {
				var r = a, i = _n(n), o = [];
				a: {
					var s = iv.get(e);
					if (s !== void 0) {
						var c = i_, l = e;
						switch (e) {
							case "keypress": if (Sn(n) === 0) break a;
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
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = bn(p, f), h != null && u.push(md(p, h, m))), d) break;
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
						if (c = e === "mouseover" || e === "pointerover", s = e === "mouseout" || e === "pointerout", c && n !== qg && (l = n.relatedTarget || n.fromElement) && (st(l) || l[Uh])) break a;
						(s || c) && (l = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, s ? (c = n.relatedTarget || n.toElement, s = r, c = c ? st(c) : null, c !== null && (d = x(c), u = c.tag, c !== d || u !== 5 && u !== 27 && u !== 6) && (c = null)) : (s = null, c = r), s !== c && (u = d_, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = S_, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = s == null ? l : lt(s), m = c == null ? l : lt(c), l = new u(h, p + "leave", s, n, i), l.target = d, l.relatedTarget = m, h = null, st(i) === r && (u = new u(f, p + "enter", c, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, u = s && c ? ue(s, c, gd) : null, s !== null && _d(o, l, s, u, !1), c !== null && d !== null && _d(o, d, c, u, !0)));
					}
					a: {
						if (s = r ? lt(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = Ln;
						else if (Mn(s)) {
							if (V_) g = Un;
							else {
								g = Vn;
								var _ = Bn;
							}
						} else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && un(r.elementType) && (g = Ln) : g = Hn;
						if (g &&= g(e, r)) {
							Pn(o, g, n, i);
							break a;
						}
						_ && _(e, s, r);
					}
					switch (_ = r ? lt(r) : window, e) {
						case "focusin":
							(Mn(_) || _.contentEditable === "true") && (W_ = _, G_ = r, K_ = null);
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
							q_ = !1, Qn(o, n, i);
							break;
						case "selectionchange": if (U_) break;
						case "keydown":
						case "keyup": Qn(o, n, i);
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
					else L_ ? On(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === k_ && (y = "onCompositionStart");
					y && (N_ && n.locale !== "ko" && (L_ || y !== "onCompositionStart" ? y === "onCompositionEnd" && L_ && (v = xn()) : (e_ = i, t_ = "value" in e_ ? e_.value : e_.textContent, L_ = !0)), _ = hd(r, y), 0 < _.length && (y = new g_(y, e, null, n, i), o.push({
						event: y,
						listeners: _
					}), v ? y.data = v : (v = kn(n), v !== null && (y.data = v)))), (v = M_ ? An(e, n) : jn(e, n)) && (y = hd(r, "onBeforeInput"), 0 < y.length && (_ = new __("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: _,
						listeners: y
					}), _.data = v)), cd(o, e, r, n, i);
				}
				ld(o, t);
			});
		}
		function md(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function hd(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = bn(e, n), i != null && r.unshift(md(e, i, a)), i = bn(e, t), i != null && r.push(md(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function gd(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function _d(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = bn(n, a), l != null && o.unshift(md(n, l, c))) : i || (l = bn(n, a), l != null && o.push(md(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function vd(e, t) {
			P(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Bg || (Bg = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: Zh,
				possibleRegistrationNames: Qh
			};
			un(e) || typeof t.is == "string" || mn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function yd(e, t, n, r) {
			t !== n && (n = Td(n), Td(t) !== n && (r[e] = t));
		}
		function bd(e) {
			return !!(e.getAttribute("vt-share") || e.getAttribute("vt-exit") || e.getAttribute("vt-enter") || e.getAttribute("vt-update"));
		}
		function xd(e) {
			if (!bd(e)) return !1;
			var t = e.getAttribute("vt-name");
			return e = e.style["view-transition-name"], t ? t === e : e.startsWith("_T_");
		}
		function Sd(e, t, n) {
			t.forEach(function(t) {
				t === "style" ? e.getAttribute(t) !== "" && (t = e.style, (t.length === 1 && t[0] === "view-transition-name" || t.length === 2 && t[0] === "view-transition-class" && t[1] === "view-transition-name") && xd(e) || (n.style = Md(e))) : n[jd(t)] = e.getAttribute(t);
			});
		}
		function Cd(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function wd(e, t) {
			return e = e.namespaceURI === Mg || e.namespaceURI === Ng ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function Td(e) {
			return Pe(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Ne(e)), Fe(e)), (typeof e == "string" ? e : "" + e).replace(Xw, "\n").replace(Zw, "");
		}
		function Ed(e, t) {
			return t = Td(t), Td(e) === t;
		}
		function Dd(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					if (typeof r == "string") an(r, t, !1), t === "body" || t === "textarea" && r === "" || on(e, r);
					else if (typeof r == "number" || typeof r == "bigint") an("" + r, t, !1), t !== "body" && on(e, "" + r);
					else return;
					break;
				case "className":
					bt(e, "class", r);
					break;
				case "tabIndex":
					bt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					bt(e, n, r);
					break;
				case "style":
					ln(e, r, a);
					return;
				case "data": if (t !== "object") {
					bt(e, "data", r);
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
					Ie(r, n), r = hn(r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || qw || (qw = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || Kw || (Kw = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || Ww ? t !== "button" || i.type == null || i.type === "submit" || Ww ? typeof r == "function" && (i.name == null || Gw || (Gw = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || qw || (qw = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || Kw || (Kw = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (Ww = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (Ww = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					}
					if (typeof a == "function" && (n === "formAction" ? (t !== "input" && Dd(e, t, "name", i.name, i, null), Dd(e, t, "formEncType", i.formEncType, i, null), Dd(e, t, "formMethod", i.formMethod, i, null), Dd(e, t, "formTarget", i.formTarget, i, null)) : (Dd(e, t, "encType", i.encType, i, null), Dd(e, t, "method", i.method, i, null), Dd(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					Ie(r, n), r = hn(r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && Cd(n, r), e.onclick = gn);
					return;
				case "onScroll":
					r != null && (typeof r != "function" && Cd(n, r), V("scroll", e));
					return;
				case "onScrollEnd":
					r != null && (typeof r != "function" && Cd(n, r), V("scrollend", e));
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
					Ie(r, n), n = hn(r), e.setAttributeNS(Qw, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (Ie(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
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
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (Ie(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (Ie(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (Ie(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					V("beforetoggle", e), V("toggle", e), yt(e, "popover", r);
					break;
				case "xlinkActuate":
					xt(e, Qw, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					xt(e, Qw, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					xt(e, Qw, "xlink:role", r);
					break;
				case "xlinkShow":
					xt(e, Qw, "xlink:show", r);
					break;
				case "xlinkTitle":
					xt(e, Qw, "xlink:title", r);
					break;
				case "xlinkType":
					xt(e, Qw, "xlink:type", r);
					break;
				case "xmlBase":
					xt(e, $w, "xml:base", r);
					break;
				case "xmlLang":
					xt(e, $w, "xml:lang", r);
					break;
				case "xmlSpace":
					xt(e, $w, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), yt(e, "is", r);
					break;
				case "innerText":
				case "textContent": return;
				case "popoverTarget": Jw || typeof r != "object" || !r || (Jw = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = dn(n), yt(e, n, r);
				else {
					Zh.hasOwnProperty(n) && r != null && typeof r != "function" && Cd(n, r);
					return;
				}
			}
			rg = !0;
		}
		function Od(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					ln(e, r, a);
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
					if (typeof r == "string") on(e, r);
					else if (typeof r == "number" || typeof r == "bigint") on(e, "" + r);
					else return;
					break;
				case "onScroll":
					r != null && (typeof r != "function" && Cd(n, r), V("scroll", e));
					return;
				case "onScrollEnd":
					r != null && (typeof r != "function" && Cd(n, r), V("scrollend", e));
					return;
				case "onClick":
					r != null && (typeof r != "function" && Cd(n, r), e.onclick = gn);
					return;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": return;
				case "innerText":
				case "textContent": return;
				default:
					if (Zh.hasOwnProperty(n)) r != null && typeof r != "function" && Cd(n, r);
					else a: {
						if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), a = n.slice(2, i ? n.length - 7 : void 0), t = e[Hh] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(a, t, i), typeof r == "function")) {
							typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(a, r, i);
							break a;
						}
						rg = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : yt(e, n, r);
					}
					return;
			}
			rg = !0;
		}
		function kd(e, t, n) {
			switch (vd(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					V("error", e), V("load", e);
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
							default: Dd(e, t, a, o, n, null);
						}
					}
					i && Dd(e, t, "srcSet", n.srcSet, n, null), r && Dd(e, t, "src", n.src, n, null);
					return;
				case "input":
					ht("input", n), V("invalid", e);
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
							default: Dd(e, t, r, u, n, null);
						}
					}
					Dt(e, n), kt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in ht("select", n), V("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Dd(e, t, i, s, n, null);
					}
					Pt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && Nt(e, !!r, n, !0) : Nt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in ht("textarea", n), V("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
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
						default: Dd(e, t, o, s, n, null);
					}
					Ft(e, n), Lt(e, r, i, a);
					return;
				case "option":
					for (c in jt(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: Dd(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					V("beforetoggle", e), V("toggle", e), V("cancel", e), V("close", e);
					break;
				case "iframe":
				case "object":
					V("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < zw.length; r++) V(zw[r], e);
					break;
				case "image":
					V("error", e), V("load", e);
					break;
				case "details":
					V("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": V("error", e), V("load", e);
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
						default: Dd(e, t, l, r, n, null);
					}
					return;
				default: if (un(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Od(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && Dd(e, t, s, r, n, null));
		}
		function Ad(e, t, n, r) {
			switch (vd(t, r), t) {
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
							default: r.hasOwnProperty(p) || Dd(e, t, p, null, r, d);
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
							default: p !== d && Dd(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || Uw || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), Uw = !0), !t || r || Hw || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), Hw = !0), Ot(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || Dd(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							a !== c && (rg = !0), f = a;
							break;
						case "defaultValue":
							a !== c && (rg = !0), s = a;
							break;
						case "multiple": a !== c && (rg = !0), o = a;
						default: a !== c && Dd(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? Nt(e, !!t, t ? [] : "", !1) : Nt(e, !!t, r, !0)) : Nt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: Dd(e, t, s, null, r, i);
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
						default: i !== a && Dd(e, t, o, i, r, a);
					}
					It(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: Dd(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							f !== p && (rg = !0), e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: Dd(e, t, c, f, r, p);
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
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && Dd(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: Dd(e, t, l, f, r, p);
					}
					return;
				default: if (un(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Od(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Od(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && Dd(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || Dd(e, t, d, f, r, p);
		}
		function jd(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Md(e) {
			for (var t = {}, n = e.style, r = 0; r < n.length; r++) {
				var i = n[r];
				i === "view-transition-name" && xd(e) || (t[i] = n.getPropertyValue(i));
			}
			return t;
		}
		function Nd(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Le(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || jg.has(a) ? (Le(o, a), r += i + a.replace(xg, "-$1").toLowerCase().replace(Sg, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(xg, "-$1").toLowerCase().replace(Sg, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = Td(r), t = Td(t), t === r || t[t.length - 1] === ";" && bd(e) || (n.style = Md(e)));
			}
		}
		function Pd(e, t, n, r, i, a) {
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
				default: if (Ie(r, t), e === "" + r) return;
			}
			yd(t, e, r, a);
		}
		function Fd(e, t, n, r, i, a) {
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
			yd(t, e, r, a);
		}
		function Id(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (Ie(r, n), e === "" + r) return;
			}
			yd(t, e, r, a);
		}
		function Ld(e, t, n, r, i, a) {
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
				default: if (!isNaN(r) && (Ie(r, t), e === "" + r)) return;
			}
			yd(t, e, r, a);
		}
		function Rd(e, t, n, r, i, a) {
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
				default: if (Ie(r, t), n = hn("" + r), e === n) return;
			}
			yd(t, e, r, a);
		}
		function zd(e, t, n, r) {
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
			if (un(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (Zh.hasOwnProperty(c)) typeof l != "function" && Cd(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || yd("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = wd(e, l), yd(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Nd(e, l, i);
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
								a.delete("class"), o = vt(e, "class", l), yd("className", o, l, i);
								continue;
							default: r.context === _T && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = vt(e, c, l), yd(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (Zh.hasOwnProperty(l)) typeof c != "function" && Cd(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || yd("children", e.textContent, c, i);
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
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = wd(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Pd(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Pd(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Nd(e, c, i);
						continue;
					case "multiple":
						a.delete(l), yd(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), yd(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), yd(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), yd(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Rd(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						}
						if (o === tT) {
							a.delete(l.toLowerCase()), yd(l, "function", c, i);
							continue;
						}
						Rd(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Rd(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Id(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Id(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Id(e, l, l, c, a, i);
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
						Fd(e, l, l.toLowerCase(), c, a, i);
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
								default: if (Ie(c, o), s === "" + c) break a;
							}
							yd(o, s, c, d);
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
								default: if (!(isNaN(c) || 1 > c) && (Ie(c, o), s === "" + c)) break a;
							}
							yd(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Ld(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Ld(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Pd(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Pd(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Pd(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Pd(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Pd(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Pd(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Pd(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Pd(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Pd(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Pd(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || Yw[l] || (Yw[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), Fd(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = dn(l), o = !1, r.context === _T && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Fg.hasOwnProperty(u) && Fg[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, gt(d)) {
							if (u.hasAttribute(d)) u = d.toLowerCase() === "nonce" ? u.nonce : u.getAttribute(d), Ie(s, d), s = u === "" + s ? s : u;
							else {
								switch (typeof s) {
									case "function":
									case "symbol": break a;
									case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
								}
								s = s === void 0 ? void 0 : null;
							}
						} else s = void 0;
						o || yd(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && Sd(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Bd(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Vd(e) {
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
		function Hd() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Vd(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Vd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Ud(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Wd(e) {
			switch (e) {
				case Ng: return vT;
				case Mg: return yT;
				default: return _T;
			}
		}
		function Gd(e, t) {
			if (e === _T) switch (t) {
				case "svg": return vT;
				case "math": return yT;
				default: return _T;
			}
			return e === vT && t === "foreignObject" ? _T : e;
		}
		function Kd(e, t, n, r) {
			return n = Ud(n).createElement(e), n[Vh] = r, n[Hh] = t, kd(n, e, t), dt(n), n;
		}
		function qd(e) {
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
		function Jd(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Yd() {
			var e = window.event;
			return e && e.type === "popstate" ? e !== wT && (wT = e, !0) : (wT = null, !1);
		}
		function Xd() {
			var e = window.event;
			return e && e !== TT ? e.type : null;
		}
		function Zd() {
			var e = window.event;
			return e && e !== TT ? e.timeStamp : -1.1;
		}
		function Qd(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function $d(e, t, n) {
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
		function ef() {}
		function tf(e, t, n, r) {
			Ad(e, t, n, r), e[Hh] = r;
		}
		function nf(e) {
			on(e, "");
		}
		function rf(e, t, n) {
			e.nodeValue = n;
		}
		function af(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Hh] || null;
				if (t !== null) {
					var n = ct(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, A(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, A(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function of(e) {
			return e === "head";
		}
		function sf(e, t) {
			e.removeChild(t);
		}
		function cf(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function lf(e, t) {
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
		function uf(e, t) {
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
		function df(e) {
			uf(e, !0);
		}
		function ff(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function pf(e) {
			e.nodeValue = "";
		}
		function mf(e) {
			uf(e, !1);
		}
		function hf(e, t) {
			t = t[gT], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function gf(e, t) {
			e.nodeValue = t;
		}
		function _f(e) {
			for (var t = e.firstChild; t != null;) {
				if (t.nodeType === 1 && getComputedStyle(t).display === "block") {
					A(ct(t) || ct(e), function(e, t) {
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
		function vf(e, t, n) {
			if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
				if (t = e.getClientRects(), t.length === 1) var r = 1;
				else for (var i = r = 0; i < t.length; i++) {
					var a = t[i];
					0 < a.width && 0 < a.height && r++;
				}
				r === 1 ? (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom) : _f(e);
			}
		}
		function yf(e, t) {
			e = e.style, t = t[gT];
			var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
			e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
		}
		function bf(e, t, n) {
			return n = n.ownerDocument.defaultView, {
				rect: e,
				abs: t.position === "absolute" || t.position === "fixed",
				clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
				view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
			};
		}
		function xf(e) {
			return bf(e.getBoundingClientRect(), getComputedStyle(e), e);
		}
		function Sf(e) {
			var t = e.getBoundingClientRect();
			t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
			var n = getComputedStyle(e);
			return bf(t, n, e);
		}
		function Cf(e, t) {
			if (typeof e == "object" && e) switch (e.name) {
				case "TimeoutError": return Error("A ViewTransition timed out because a Navigation stalled. This can happen if a Navigation is blocked on React itself. Such as if it's resolved inside useEffect. This can be solved by moving the resolution to useLayoutEffect.", { cause: e });
				case "AbortError": return t ? null : Error("A ViewTransition was aborted early. This might be because you have other View Transition libraries on the page and only one can run at a time. To avoid this, use only React's built-in <ViewTransition> to coordinate.", { cause: e });
				case "InvalidStateError": if (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") return null;
			}
			return e;
		}
		function wf(e) {
			return e.documentElement.clientHeight;
		}
		function Tf(e) {
			this.addEventListener("load", e), this.addEventListener("error", e);
		}
		function Ef(e, t, n, r, i, a, o, s, c, l, u) {
			var d = t.nodeType === 9 ? t : t.ownerDocument;
			try {
				var f = d.startViewTransition({
					update: function() {
						var t = d.defaultView, n = t.navigation && t.navigation.transition, o = d.fonts.status;
						r();
						var s = [];
						if (o === "loaded" && (wf(d), d.fonts.status === "loading" && s.push(d.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, f = 0; f < c.length; f++) {
							var p = c[f];
							if (!p.complete) {
								var m = p.getBoundingClientRect();
								if (0 < m.bottom && 0 < m.right && m.top < t.innerHeight && m.left < t.innerWidth) {
									if (u += Np(p), u > YT) {
										s.length = o;
										break;
									}
									p = new Promise(Tf.bind(p)), s.push(p);
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
						e = Cf(e, !1), e !== null && c(e);
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
		function Df(e, t) {
			this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
		}
		function Of(e) {
			return {
				name: e,
				group: new Df("group", e),
				imagePair: new Df("image-pair", e),
				old: new Df("old", e),
				new: new Df("new", e)
			};
		}
		function kf(e) {
			this._fragmentFiber = e, this._observers = this._eventListeners = null;
		}
		function Af(e, t, n, r) {
			return se(e).addEventListener(t, n, r), !1;
		}
		function jf(e, t, n, r) {
			return se(e).removeEventListener(t, n, r), !1;
		}
		function Mf(e) {
			return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
				capture: e.capture,
				passive: e.passive
			} : e;
		}
		function Nf(e) {
			return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
		}
		function Pf(e, t, n, r) {
			if (e.length === 0) return -1;
			r = Nf(r);
			for (var i = 0; i < e.length; i++) {
				var a = e[i];
				if (a.type === t && a.listener === n && Nf(a.optionsOrUseCapture) === r) return i;
			}
			return -1;
		}
		function Ff(e, t) {
			return e.tag !== 6 && (e = se(e), cp(e, t));
		}
		function If(e, t) {
			return t.push(e), !1;
		}
		function Lf(e, t) {
			return e.tag !== 6 && (e = se(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
		}
		function Rf(e, t) {
			return e.tag === 6 || (e = se(e), t.observe(e)), !1;
		}
		function zf(e, t) {
			return e.tag === 6 || (e = se(e), t.unobserve(e)), !1;
		}
		function Bf(e, t, n) {
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
		function Vf(e, t) {
			if (e.tag === 6) {
				e = e.stateNode;
				var n = e.ownerDocument.createRange();
				n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
			} else e = se(e), t.push.apply(t, e.getClientRects());
			return !1;
		}
		function Hf(e, t, n, r, i) {
			var a = st(i);
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
		function Uf(e, t) {
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
		}
		function Wf(e, t) {
			return e = se(e), Gf(e, t), !1;
		}
		function Gf(e, t) {
			e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
		}
		function Kf(e, t) {
			var n = t._eventListeners;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.addEventListener(i.type, i.attachedListener, Mf(i.optionsOrUseCapture));
			}
			e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
				for (var r = 0, i = 0; i < NT.length; i++) {
					var a = NT[i];
					(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (NT[r++] = a);
				}
				NT.length = r, n.observe(e);
			}), Gf(e, t));
		}
		function qf(e, t) {
			var n = t._eventListeners;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = n[r];
				e.removeEventListener(i.type, i.attachedListener, Mf(i.optionsOrUseCapture));
			}
			e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
				typeof n.rootMargin == "string" ? Bf(t, n, e) : n.unobserve(e);
			}), e.reactFragments != null && e.reactFragments.delete(t));
		}
		function Jf(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						Jf(n), ot(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function Yf(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) {
					if (t === "input" && e.type === "hidden") {
						Ie(i.name, "name");
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
		function Xf(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = ep(e.nextSibling), e === null)) return null;
			return e;
		}
		function Zf(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = ep(e.nextSibling), e === null)) return null;
			return e;
		}
		function H(e) {
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
					n[jd(a.name)] = a.name.toLowerCase() === "style" ? Md(e) : a.value;
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
			return n === null || !0 !== n[nT] ? (e.nodeValue === t ? e = null : (t = Td(t), e = Td(e.nodeValue) === t ? null : e.nodeValue), e) : null;
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
			switch (i && rn(e, r.ancestorInfo), t = Ud(n), e) {
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
			if (!n[Uh] && ct(n)) {
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
			kd(n, e, t), n[Vh] = r, n[Hh] = t;
		}
		function fp(e, t, n) {
			for (var r in n) {
				var i = n[r];
				n.hasOwnProperty(r) && i != null && Dd(e, t, r, null, eT, i);
			}
			n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === gn && (e.onclick = null), ot(e);
		}
		function pp(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			ot(e);
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
				var i = j(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), HT.has(i) || (HT.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), kd(t, "link", e), dt(t), r.head.appendChild(t)));
			}
		}
		function gp(e, t, n, r) {
			var i = (i = Xm.current) ? mp(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = vp(n.href), t = ut(i).hoistableStyles, r = t.get(n), r || (r = {
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
						var a = ut(i).hoistableStyles, o = a.get(e);
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
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Sp(n), t = ut(i).hoistableScripts, r = t.get(n), r || (r = {
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
			return "href=\"" + j(e) + "\"";
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
			} else t = e.createElement("link"), t[Yh] = !0, t.onload = t.onerror = ft.bind(null, t), kd(t, "link", n), dt(t), e.head.appendChild(t);
			r.preload = t, t.addEventListener("load", function() {
				return r.loading |= LT;
			}), t.addEventListener("error", function() {
				return r.loading |= RT;
			});
		}
		function Sp(e) {
			return "[src=\"" + j(e) + "\"]";
		}
		function Cp(e) {
			return "script[async]" + e;
		}
		function wp(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + j(n.href) + "\"]");
					if (r) return t.instance = r, dt(r), r;
					var i = U({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), dt(r), kd(r, "style", i), Tp(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = vp(n.href);
					var a = e.querySelector(yp(i));
					if (a) return t.state.loading |= BT, t.instance = a, dt(a), a;
					r = bp(n), (i = VT.get(i)) && Ep(r, i), a = (e.ownerDocument || e).createElement("link"), dt(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), kd(a, "link", r), t.state.loading |= BT, Tp(a, n.precedence, e), t.instance = a;
				case "script": return a = Sp(n.src), (i = e.querySelector(Cp(a))) ? (t.instance = i, dt(i), i) : (r = n, (i = VT.get(a)) && (r = U({}, n), Dp(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), dt(i), kd(i, "link", r), e.head.appendChild(i), t.instance = i);
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
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Bd(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
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
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Rp.bind(e), t.then(e, e)), n.state.loading |= BT, n.instance = a, dt(a);
						return;
					}
					a = t.ownerDocument || t, r = bp(r), (i = VT.get(i)) && Ep(r, i), a = a.createElement("link"), dt(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), kd(a, "link", r), n.instance = a;
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
				0 < e.imgBytes && YT === 0 && (YT = 125 * Hd() * JT);
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
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = OT, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Je(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Je(0), this.hiddenUpdates = Je(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Up(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Hp(e, t, n, o, c, l, u, d, s), t = zv, !0 === a && (t |= Bv | Vv), t |= K, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = yi(), bi(t), e.pooledCache = t, bi(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, ma(a), e;
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
			i = Wp(i), r.context === null ? r.context = i : r.pendingContext = i, dh && uh !== null && !aE && (aE = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", D(uh) || "Unknown")), r = ga(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = _a(e, r, t), n !== null && (wi(t, "root.render()", null), $l(n, e, t), va(n, e, t));
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
				var t = Er(e, 67108864);
				t !== null && $l(t, e, 67108864), qp(e, 67108864);
			}
		}
		function Yp(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = Xl(e);
				t = et(t);
				var n = Er(e, t);
				n !== null && $l(n, e, t), qp(e, t);
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
				if (i === null) pd(e, t, r, _E, n), rm(e, r);
				else if (am(i, e, t, n, r)) r.stopPropagation();
				else if (rm(e, r), t & 4 && -1 < TE.indexOf(e)) {
					for (; i !== null;) {
						var a = ct(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = He(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Ah(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										Zu(a), (fC & (rC | iC)) === nC && (HC = _h() + UC, Qu(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = Er(a, 2), s !== null && $l(s, a, 2), iu(), qp(a, 2);
						}
						if (a = em(r), a === null && pd(e, t, r, _E, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else pd(e, t, r, null, n);
			}
		}
		function em(e) {
			return e = _n(e), tm(e);
		}
		function tm(e) {
			if (_E = null, e = st(e), e !== null) {
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
			}, t !== null && (t = ct(t), t !== null && Jp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
			var t = st(e.target);
			if (t !== null) {
				var n = x(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, at(e.priority, function() {
								Yp(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, at(e.priority, function() {
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
				} else return t = ct(n), t !== null && Jp(t), e.blockedOn = n, !1;
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
					var a = ct(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), Qo(a, n, r, i));
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
		var oh, sh, ch = !1, lh = new (typeof WeakMap == "function" ? WeakMap : Map)(), uh = null, dh = !1, fh = Object.prototype.hasOwnProperty, ph = _m.unstable_scheduleCallback, mh = _m.unstable_cancelCallback, hh = _m.unstable_shouldYield, gh = _m.unstable_requestPaint, _h = _m.unstable_now, vh = _m.unstable_getCurrentPriorityLevel, yh = _m.unstable_ImmediatePriority, bh = _m.unstable_UserBlockingPriority, xh = _m.unstable_NormalPriority, Sh = _m.unstable_LowPriority, Ch = _m.unstable_IdlePriority, wh = _m.log, Th = _m.unstable_setDisableYieldValue, Eh = null, Dh = null, Oh = !1, kh = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Ah = Math.clz32 ? Math.clz32 : Ve, jh = Math.log, Mh = Math.LN2, Nh = 256, Ph = 262144, Fh = 4194304, Ih = 2, Lh = 8, Rh = 32, zh = 268435456, Bh = Math.random().toString(36).slice(2), Vh = "__reactFiber$" + Bh, Hh = "__reactProps$" + Bh, Uh = "__reactContainer$" + Bh, Wh = "__reactEvents$" + Bh, Gh = "__reactListeners$" + Bh, Kh = "__reactHandles$" + Bh, qh = "__reactResources$" + Bh, Jh = "__reactMarker$" + Bh, Yh = "__reactLoad$" + Bh, Xh = /* @__PURE__ */ new Set(), Zh = {}, Qh = {}, $h = {
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
		}, i_ = Tn(r_), a_ = U({}, r_, {
			view: 0,
			detail: 0
		}), o_ = Tn(a_), s_, c_, l_, u_ = U({}, a_, {
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
			getModifierState: Dn,
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
		}), d_ = Tn(u_), f_ = Tn(U({}, u_, { dataTransfer: 0 })), p_ = Tn(U({}, a_, { relatedTarget: 0 })), m_ = Tn(U({}, r_, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), h_ = Tn(U({}, r_, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), g_ = Tn(U({}, r_, { data: 0 })), __ = g_, v_ = {
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
		}, x_ = Tn(U({}, a_, {
			key: function(e) {
				if (e.key) {
					var t = v_[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = Sn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? y_[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: Dn,
			charCode: function(e) {
				return e.type === "keypress" ? Sn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? Sn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), S_ = Tn(U({}, u_, {
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
		})), C_ = Tn(U({}, r_, { submitter: 0 })), w_ = Tn(U({}, a_, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: Dn
		})), T_ = Tn(U({}, r_, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), E_ = Tn(U({}, u_, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), D_ = Tn(U({}, r_, {
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
		Zg && (V_ = Nn("input") && (!document.documentMode || 9 < document.documentMode));
		var H_ = typeof Object.is == "function" ? Object.is : Wn, U_ = Zg && "documentMode" in document && 11 >= document.documentMode, W_ = null, G_ = null, K_ = null, q_ = !1, J_ = {
			animationend: $n("Animation", "AnimationEnd"),
			animationiteration: $n("Animation", "AnimationIteration"),
			animationstart: $n("Animation", "AnimationStart"),
			transitionrun: $n("Transition", "TransitionRun"),
			transitionstart: $n("Transition", "TransitionStart"),
			transitioncancel: $n("Transition", "TransitionCancel"),
			transitionend: $n("Transition", "TransitionEnd")
		}, Y_ = {}, X_ = {};
		Zg && (X_ = document.createElement("div").style, "AnimationEvent" in window || (delete J_.animationend.animation, delete J_.animationiteration.animation, delete J_.animationstart.animation), "TransitionEvent" in window || delete J_.transitionend.transition);
		var Z_ = er("animationend"), Q_ = er("animationiteration"), $_ = er("animationstart"), ev = er("transitionrun"), tv = er("transitionstart"), nv = er("transitioncancel"), rv = er("transitionend"), iv = /* @__PURE__ */ new Map(), av = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
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
					var n = Zd(), r = Xd();
					(n !== Xy || r !== Yy) && (Xy = -1.1), Jy = n, Yy = r;
				}
				Ui(e, t);
			}
			if (_y !== null) for (n = jw; n !== null;) Si(n, _y), n = n.next;
			if (n = e.types, n !== null) {
				for (r = jw; r !== null;) Si(r, n), r = r.next;
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
					A(t, function() {
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
				Ru(e, e.return, t);
			}
		} }, Ob = Db.react_stack_bottom_frame.bind(Db), kb = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Ru(e, e.return, t);
			}
		} }, Ab = kb.react_stack_bottom_frame.bind(kb), jb = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Mb = jb.react_stack_bottom_frame.bind(jb), Nb = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Ru(e, t, n);
			}
		} }, Pb = Nb.react_stack_bottom_frame.bind(Nb), Fb = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Ib = Fb.react_stack_bottom_frame.bind(Fb), Lb = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Ru(e, t, n);
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
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = D(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), A(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var ix = fa(!0), ax = fa(!1), ox = 0, sx = 1, cx = 2, lx = 3, ux = !1, dx = !1, fx = null, px = !1, mx = me(null), hx = me(0), gx = me(null), _x = null, vx = 1, yx = 2, bx = me(0), xx = 0, Sx = 1, Cx = 2, wx = 4, Tx = 8, Ex, Dx = /* @__PURE__ */ new Set(), Ox = /* @__PURE__ */ new Set(), kx = /* @__PURE__ */ new Set(), Ax = /* @__PURE__ */ new Set(), jx = 0, X = null, Mx = null, Nx = null, Px = !1, Fx = !1, Ix = !1, Lx = 0, Rx = 0, zx = null, Bx = 0, Vx = 25, Z = null, Hx = null, Ux = -1, Wx = !1, Gx = {
			readContext: gi,
			use: Za,
			useCallback: Ra,
			useContext: Ra,
			useEffect: Ra,
			useImperativeHandle: Ra,
			useLayoutEffect: Ra,
			useInsertionEffect: Ra,
			useMemo: Ra,
			useReducer: Ra,
			useRef: Ra,
			useState: Ra,
			useDebugValue: Ra,
			useDeferredValue: Ra,
			useTransition: Ra,
			useSyncExternalStore: Ra,
			useId: Ra,
			useHostTransitionStatus: Ra,
			useFormState: Ra,
			useActionState: Ra,
			useOptimistic: Ra,
			useMemoCache: Ra,
			useCacheRefresh: Ra,
			useEffectEvent: Ra
		}, Kx = null, qx = null, Jx = null, Yx = null, Xx = null, Zx = null, Qx = null;
		Kx = {
			readContext: function(e) {
				return gi(e);
			},
			use: Za,
			useCallback: function(e, t) {
				return Z = "useCallback", I(), Ia(t), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", I(), gi(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", I(), Ia(t), Po(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", I(), Ia(n), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", I(), Ia(t), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", I(), Ia(t), Ro(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", I(), Ia(t);
				var n = W.H;
				W.H = Xx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", I();
				var r = W.H;
				W.H = Xx;
				try {
					return eo(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", I(), jo(e);
			},
			useState: function(e) {
				Z = "useState", I();
				var t = W.H;
				W.H = Xx;
				try {
					return po(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", I(), R(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", I(), ts();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", I(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", I(), as();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", I(), La(), To(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", I(), To(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", I(), mo(e);
			},
			useHostTransitionStatus: is,
			useMemoCache: Qa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), os();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", I(), Io(e);
			}
		}, qx = {
			readContext: function(e) {
				return gi(e);
			},
			use: Za,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), gi(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", L(), Po(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", L(), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), Ro(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L();
				var n = W.H;
				W.H = Xx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = W.H;
				W.H = Xx;
				try {
					return eo(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", L(), jo(e);
			},
			useState: function(e) {
				Z = "useState", L();
				var t = W.H;
				W.H = Xx;
				try {
					return po(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), R(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), ts();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), as();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", L(), To(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", L(), La(), To(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", L(), mo(e);
			},
			useHostTransitionStatus: is,
			useMemoCache: Qa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), os();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), Io(e);
			}
		}, Jx = {
			readContext: function(e) {
				return gi(e);
			},
			use: Za,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), Uo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), gi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", L(), No(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), Vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", L(), No(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), No(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L();
				var n = W.H;
				W.H = Zx;
				try {
					return Go(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = W.H;
				W.H = Zx;
				try {
					return to(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", L(), Ja().memoizedState;
			},
			useState: function() {
				Z = "useState", L();
				var e = W.H;
				W.H = Zx;
				try {
					return to($a);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), Ko(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), ns();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), ao(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), Ja().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", L(), La(), Eo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", L(), Eo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", L(), ho(e, t);
			},
			useHostTransitionStatus: is,
			useMemoCache: Qa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Ja().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), Lo(e);
			}
		}, Yx = {
			readContext: function(e) {
				return gi(e);
			},
			use: Za,
			useCallback: function(e, t) {
				return Z = "useCallback", L(), Uo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", L(), gi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", L(), No(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", L(), Vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", L(), No(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", L(), No(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", L();
				var n = W.H;
				W.H = Qx;
				try {
					return Go(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", L();
				var r = W.H;
				W.H = Qx;
				try {
					return ro(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", L(), Ja().memoizedState;
			},
			useState: function() {
				Z = "useState", L();
				var e = W.H;
				W.H = Qx;
				try {
					return ro($a);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", L(), qo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", L(), rs();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", L(), ao(e, t, n);
			},
			useId: function() {
				return Z = "useId", L(), Ja().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", L(), La(), ko(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", L(), ko(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", L(), _o(e, t);
			},
			useHostTransitionStatus: is,
			useMemoCache: Qa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Ja().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", L(), Lo(e);
			}
		}, Xx = {
			readContext: function(e) {
				return l(), gi(e);
			},
			use: function(e) {
				return c(), Za(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), I(), Ho(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), I(), gi(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", c(), I(), Po(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), I(), Bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", c(), I(), Mo(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), I(), Ro(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), I();
				var n = W.H;
				W.H = Xx;
				try {
					return Wo(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), I();
				var r = W.H;
				W.H = Xx;
				try {
					return eo(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", c(), I(), jo(e);
			},
			useState: function(e) {
				Z = "useState", c(), I();
				var t = W.H;
				W.H = Xx;
				try {
					return po(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), I(), R(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), I(), ts();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), I(), io(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), I(), as();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", c(), I(), To(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", c(), I(), To(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", c(), I(), mo(e);
			},
			useMemoCache: function(e) {
				return c(), Qa(e);
			},
			useHostTransitionStatus: is,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), os();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), I(), Io(e);
			}
		}, Zx = {
			readContext: function(e) {
				return l(), gi(e);
			},
			use: function(e) {
				return c(), Za(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), L(), Uo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), L(), gi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), L(), No(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), L(), Vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), L(), No(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), L(), No(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), L();
				var n = W.H;
				W.H = Zx;
				try {
					return Go(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), L();
				var r = W.H;
				W.H = Zx;
				try {
					return to(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), L(), Ja().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), L();
				var e = W.H;
				W.H = Zx;
				try {
					return to($a);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), L(), Ko(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), L(), ns();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), L(), ao(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), L(), Ja().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), L(), Eo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), L(), Eo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), L(), ho(e, t);
			},
			useMemoCache: function(e) {
				return c(), Qa(e);
			},
			useHostTransitionStatus: is,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Ja().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), L(), Lo(e);
			}
		}, Qx = {
			readContext: function(e) {
				return l(), gi(e);
			},
			use: function(e) {
				return c(), Za(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), L(), Uo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), L(), gi(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), L(), No(2048, Tx, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), L(), Vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), L(), No(4, Cx, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), L(), No(4, wx, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), L();
				var n = W.H;
				W.H = Zx;
				try {
					return Go(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), L();
				var r = W.H;
				W.H = Zx;
				try {
					return ro(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), L(), Ja().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), L();
				var e = W.H;
				W.H = Zx;
				try {
					return ro($a);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), L();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), L(), qo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), L(), rs();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), L(), ao(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), L(), Ja().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), L(), ko(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), L(), ko(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), L(), _o(e, t);
			},
			useMemoCache: function(e) {
				return c(), Qa(e);
			},
			useHostTransitionStatus: is,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", L(), Ja().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), L(), Lo(e);
			}
		};
		var $x = {}, eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), sS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), lS = /* @__PURE__ */ new Set();
		Object.freeze($x);
		var uS = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = Xl(e), i = ga(r);
				i.payload = t, n != null && (hs(n), i.callback = n), t = _a(e, i, r), t !== null && (wi(r, "this.setState()", e), $l(t, e, r), va(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = Xl(e), i = ga(r);
				i.tag = sx, i.payload = t, n != null && (hs(n), i.callback = n), t = _a(e, i, r), t !== null && (wi(r, "this.replaceState()", e), $l(t, e, r), va(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = Xl(e), r = ga(n);
				r.tag = cx, t != null && (hs(t), r.callback = t), t = _a(e, r, n), t !== null && (wi(n, "this.forceUpdate()", e), $l(t, e, n), va(t, e, n));
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
				var t = gi(gy), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return gi(gy).controller.signal;
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
				t = t[0].toUpperCase() + t.slice(1), tr(n, "on" + t);
			}
			tr(Z_, "onAnimationEnd"), tr(Q_, "onAnimationIteration"), tr($_, "onAnimationStart"), tr("dblclick", "onDoubleClick"), tr("focusin", "onFocus"), tr("focusout", "onBlur"), tr(ev, "onTransitionRun"), tr(tv, "onTransitionStart"), tr(nv, "onTransitionCancel"), tr(rv, "onTransitionEnd");
		})(), mt("onMouseEnter", ["mouseout", "mouseover"]), mt("onMouseLeave", ["mouseout", "mouseover"]), mt("onPointerEnter", ["pointerout", "pointerover"]), mt("onPointerLeave", ["pointerout", "pointerover"]), pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), pt("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var zw = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Bw = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zw)), Vw = "_reactListening" + Math.random().toString(36).slice(2), Hw = !1, Uw = !1, Ww = !1, Gw = !1, Kw = !1, qw = !1, Jw = !1, Yw = {}, Xw = /\r\n?/g, Zw = /\u0000|\uFFFD/g, Qw = "http://www.w3.org/1999/xlink", $w = "http://www.w3.org/XML/1998/namespace", eT = {}, tT = "javascript:throw new Error('React form unexpectedly submitted.')", nT = "suppressHydrationWarning", rT = "&", iT = "/&", aT = "$", oT = "/$", sT = "$?", cT = "$~", lT = "$!", uT = "html", dT = "body", fT = "head", pT = "F!", mT = "F", hT = "loading", gT = "style", _T = 0, vT = 1, yT = 2, bT = null, xT = null, ST = !1, CT = {
			dialog: !0,
			webview: !0
		}, wT = null, TT = void 0, ET = typeof setTimeout == "function" ? setTimeout : void 0, DT = typeof clearTimeout == "function" ? clearTimeout : void 0, OT = -1, kT = typeof Promise == "function" ? Promise : void 0, AT = typeof requestAnimationFrame == "function" ? requestAnimationFrame : ET, jT = typeof queueMicrotask == "function" ? queueMicrotask : kT === void 0 ? ET : function(e) {
			return kT.resolve(null).then(e).catch(Qd);
		}, MT = 500;
		Df.prototype.animate = function(e, t) {
			return t = typeof t == "number" ? { duration: t } : U({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
		}, Df.prototype.getAnimations = function() {
			for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
				var a = n[i].effect;
				a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
			}
			return r;
		}, Df.prototype.getComputedStyle = function() {
			return getComputedStyle(this._scope, this._selector);
		}, kf.prototype.addEventListener = function(e, t, n) {
			var r = null, i = null;
			if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
				this._eventListeners === null && (this._eventListeners = []);
				var a = this._eventListeners;
				if (Pf(a, e, t, n) === -1) {
					var o = this, s = t;
					n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
						o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
					}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Mf(n), a.push({
						type: e,
						listener: t,
						optionsOrUseCapture: n,
						attachedListener: s,
						cleanup: i
					}), w(this._fragmentFiber, Af, e, s, r);
				}
				this._eventListeners = a;
			}
		}, kf.prototype.removeEventListener = function(e, t, n) {
			var r = this._eventListeners;
			if (r !== null && (t = Pf(r, e, t, n), t !== -1)) {
				var i = r[t];
				n = i.attachedListener;
				var a = i.cleanup;
				i = Mf(i.optionsOrUseCapture), w(this._fragmentFiber, jf, e, n, i), r.splice(t, 1), a !== null && a();
			}
		}, kf.prototype.dispatchEvent = function(e) {
			var t = re(this._fragmentFiber);
			if (t === null) return !0;
			t = se(t);
			var n = this._eventListeners;
			if (n !== null && 0 < n.length || !e.bubbles) {
				var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
				if (n) for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.addEventListener(a.type, a.attachedListener, Mf(a.optionsOrUseCapture));
				}
				if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Mf(a.optionsOrUseCapture));
				return t.removeChild(r), e;
			}
			return t.dispatchEvent(e);
		}, kf.prototype.focus = function(e) {
			T(this._fragmentFiber.child, !0, Ff, e, void 0, void 0);
		}, kf.prototype.focusLast = function(e) {
			var t = [];
			T(this._fragmentFiber.child, !0, If, t, void 0, void 0);
			for (var n = t.length - 1; 0 <= n && !Ff(t[n], e); n--);
		}, kf.prototype.blur = function() {
			var e = re(this._fragmentFiber);
			e !== null && (e = se(e), e = Ud(e).activeElement, e !== null && w(this._fragmentFiber, Lf, e));
		}, kf.prototype.observeUsing = function(e) {
			var t = !1, n = !1;
			w(this._fragmentFiber, function(e) {
				if (e.tag === 6) t = !0;
				else return n = !0;
				return !1;
			}), t && !n && console.error("observeUsing() was called on a FragmentInstance with only text children. Observers do not work on text nodes."), this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), w(this._fragmentFiber, Rf, e);
		}, kf.prototype.unobserveUsing = function(e) {
			var t = this._observers;
			if (t !== null && t.has(e)) {
				t.delete(e), w(this._fragmentFiber, zf, e);
				for (var n = t = 0; n < NT.length; n++) {
					var r = NT[n];
					r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : NT[t++] = r;
				}
				NT.length = t;
			} else console.error("You are calling unobserveUsing() with an observer that is not being observed with this fragment instance. First attach the observer with observeUsing()");
		};
		var NT = [], PT = !1;
		kf.prototype.getClientRects = function() {
			var e = [];
			return w(this._fragmentFiber, Vf, e), e;
		}, kf.prototype.getRootNode = function(e) {
			var t = re(this._fragmentFiber);
			return t === null ? this : se(t).getRootNode(e);
		}, kf.prototype.compareDocumentPosition = function(e) {
			var t = re(this._fragmentFiber);
			if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
			var n = [];
			w(this._fragmentFiber, If, n);
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
			return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Hf(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}, kf.prototype.scrollIntoView = function(e) {
			if (typeof e == "object") throw Error("FragmentInstance.scrollIntoView() does not support scrollIntoViewOptions. Use the alignToTop boolean instead.");
			var t = [];
			w(this._fragmentFiber, If, t);
			var n = !1 !== e;
			if (t.length === 0) {
				var r = ae(this._fragmentFiber);
				if (r = n ? r[1] || r[0] || re(this._fragmentFiber) : r[0] || r[1], r === null) return;
				if (r.tag === 6) {
					e = se(r), Uf(e, n);
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
				i.tag === 6 ? (i = se(i), Uf(i, n)) : se(i).scrollIntoView(e), r += n ? -1 : 1;
			}
		};
		var FT = null, IT = 0, LT = 1, RT = 2, zT = 3, BT = 4, VT = /* @__PURE__ */ new Map(), HT = /* @__PURE__ */ new Set(), UT = Um.d;
		Um.d = {
			f: function() {
				var e = UT.f(), t = iu();
				return e || t;
			},
			r: function(e) {
				var t = ct(e);
				t !== null && t.tag === 5 && t.type === "form" ? es(t) : UT.r(e);
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
					var i = "link[rel=\"preload\"][as=\"" + j(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + j(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + j(n.imageSizes) + "\"]")) : i += "[href=\"" + j(e) + "\"]";
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
						kd(o, "link", e), t === "style" && (o[Yh] = !0, o.onload = o.onerror = function() {
							ft(o);
						}), dt(o), r.head.appendChild(o);
					}
				}
			},
			m: function(e, t) {
				UT.m(e, t);
				var n = WT;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + j(r) + "\"][href=\"" + j(e) + "\"]", a = i;
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
						r = n.createElement("link"), kd(r, "link", e), dt(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				UT.X(e, t);
				var n = WT;
				if (n && e) {
					var r = ut(n).hoistableScripts, i = Sp(e), a = r.get(i);
					a || (a = n.querySelector(Cp(i)), a || (e = U({
						src: e,
						async: !0
					}, t), (t = VT.get(i)) && Dp(e, t), a = n.createElement("script"), dt(a), kd(a, "link", e), n.head.appendChild(a)), a = {
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
					var i = ut(r).hoistableStyles, a = vp(e);
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
							dt(c), kd(c, "link", e), c._p = new Promise(function(e, t) {
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
					var r = ut(n).hoistableScripts, i = Sp(e), a = r.get(i);
					a || (a = n.querySelector(Cp(i)), a || (e = U({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = VT.get(i)) && Dp(e, t), a = n.createElement("script"), dt(a), kd(a, "link", e), n.head.appendChild(a)), a = {
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
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = U({}, e.memoizedProps), i = Er(e, 2), i !== null && $l(i, e, 2));
		}, sE = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = U({}, e.memoizedProps), r = Er(e, 2), r !== null && $l(r, e, 2));
		}, cE = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = U({}, e.memoizedProps), i = Er(e, 2), i !== null && $l(i, e, 2));
		}, lE = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Er(e, 2), t !== null && $l(t, e, 2);
		}, uE = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Er(e, 2), t !== null && $l(t, e, 2);
		}, dE = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Er(e, 2), t !== null && $l(t, e, 2);
		}, fE = function(e) {
			var t = Er(e, 2);
			t !== null && $l(t, e, 2);
		}, pE = function(e) {
			var t = qe(), n = Er(e, t);
			n !== null && $l(n, e, t);
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
			Gp(r, Xl(r), n, t, null, null);
		}, hm.prototype.unmount = mm.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(fC & (rC | iC)) !== nC && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Gp(e.current, 2, null, e, null, null), iu(), t[Uh] = null;
			}
		}, hm.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = it();
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
			return e.overrideHookState = oE, e.overrideHookStateDeletePath = sE, e.overrideHookStateRenamePath = cE, e.overrideProps = lE, e.overridePropsDeletePath = uE, e.overridePropsRenamePath = dE, e.scheduleUpdate = fE, e.scheduleRetry = pE, e.setErrorHandler = mE, e.setSuspenseHandler = hE, e.scheduleRefresh = v, e.scheduleRoot = g, e.setRefreshHandler = y, e.getCurrentFiber = Xp, ze(e);
		})() && Zg && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var DE = window.location.protocol;
			/^(https?|file):$/.test(DE) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (DE === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			gm(e);
			var n = !1, r = "", i = bs, a = xs, o = Ss;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Cm && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Up(e, 1, !1, null, null, n, r, null, i, a, o, pm), e[Uh] = t.current, dd(e), new mm(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			gm(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = bs, o = xs, s = Ss, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Up(e, 1, !0, t, n ?? null, r, i, c, a, o, s, pm), t.context = Wp(null), n = t.current, r = Xl(n), r = et(r), i = ga(r), i.callback = null, _a(n, i, r), wi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Ye(t, n), Zu(t), e[Uh] = t.current, dd(e), new hm(t);
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
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
};
me.node;
var he = fe(me), ge = {
	name: "refresh-cw",
	size: 24,
	node: [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]
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
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
be.node;
var xe = fe(be), Se = {
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
Se.node;
var O = fe(Se), Ce = class extends Error {
	code;
	action;
	status;
	detail;
	constructor(e, t, n, r) {
		super(e), this.code = e, this.action = t, this.status = n, this.detail = r, this.name = "UiError";
	}
}, we = {
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
function Te(e) {
	return we[e] ?? {
		summary: e,
		action: "Inspect service logs."
	};
}
var Ee = 1e4;
function De(e) {
	if (typeof e.type == "string") return e.type.startsWith("urn:tech-blog:error:") ? e.type.slice(20) : void 0;
}
async function Oe(e, t) {
	let n = new AbortController(), r = setTimeout(() => n.abort(), Ee);
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
				e = De(n) ?? "UNKNOWN", typeof n.detail == "string" && (t = n.detail);
			} catch {}
			let { summary: n, action: i } = Te(e), a = new Ce(e, i, r.status, t);
			throw a.message = n, a;
		}
		return await r.json();
	} finally {
		clearTimeout(r);
	}
}
function ke(e) {
	let t = new URLSearchParams();
	for (let [n, r] of Object.entries(e)) r !== void 0 && r !== "" && t.set(n, String(r));
	let n = t.toString();
	return n === "" ? "" : `?${n}`;
}
var k = (e) => Oe(e), Ae = (e, t) => Oe(e, {
	method: "POST",
	body: t === void 0 ? void 0 : JSON.stringify(t)
}), je = (e, t) => Oe(e, {
	method: "PATCH",
	body: JSON.stringify(t)
}), A = {
	sources: () => k("/api/v1/sources"),
	source: (e) => k(`/api/v1/sources/${encodeURIComponent(e)}`),
	setSourceEnabled: (e, t) => je(`/api/v1/sources/${encodeURIComponent(e)}`, { enabled: t }),
	articles: (e) => k(`/api/v1/articles${ke(e)}`),
	article: (e) => k(`/api/v1/articles/${encodeURIComponent(e)}`),
	articleContentUrl: (e) => `/api/v1/articles/${encodeURIComponent(e)}/content`,
	jobs: (e) => k(`/api/v1/jobs${ke(e)}`),
	job: (e) => k(`/api/v1/jobs/${encodeURIComponent(e)}`),
	createCrawlJob: (e) => Ae("/api/v1/crawl-jobs", e),
	cancelJob: (e) => Ae(`/api/v1/crawl-jobs/${encodeURIComponent(e)}/cancel`),
	retryArticle: (e) => Ae(`/api/v1/articles/${encodeURIComponent(e)}/retry`),
	opsSummary: () => k("/api/v1/ops/summary")
};
//#endregion
//#region ../../packages/shared/src/hooks.ts
function Me(e, t, n) {
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
function Ne(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Ne(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Pe() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Ne(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../node_modules/class-variance-authority/dist/index.mjs
var Fe = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ie = Pe, Le = (e, t) => (n) => {
	if (t?.variants == null) return Ie(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = Fe(t) || Fe(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Ie(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, Re = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, ze = (e, t) => ({
	classGroupId: e,
	validator: t
}), Be = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Ve = "-", He = [], Ue = "arbitrary..", We = (e) => {
	let t = qe(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return Ke(e);
			let n = e.split(Ve);
			return Ge(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Re(i, t) : t : i || He;
			}
			return n[e] || He;
		}
	};
}, Ge = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = Ge(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Ve) : e.slice(t).join(Ve), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, Ke = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? Ue + r : void 0;
})(), qe = (e) => {
	let { theme: t, classGroups: n } = e;
	return Je(n, t);
}, Je = (e, t) => {
	let n = Be();
	for (let r in e) {
		let i = e[r];
		Ye(i, n, r, t);
	}
	return n;
}, Ye = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Xe(i, t, n, r);
	}
}, Xe = (e, t, n, r) => {
	typeof e == "string" ? Ze(e, t, n) : typeof e == "function" ? Qe(e, t, n, r) : $e(e, t, n, r);
}, Ze = (e, t, n) => {
	let r = e === "" ? t : et(t, e);
	r.classGroupId = n;
}, Qe = (e, t, n, r) => {
	tt(e) ? Ye(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(ze(n, e)));
}, $e = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Ye(o, et(t, a), n, r);
	}
}, et = (e, t) => {
	let n = e, r = t.split(Ve), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Be(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, tt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, nt = (e) => {
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
}, rt = "!", it = ":", at = [], ot = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), st = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === it) {
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
		s.endsWith(rt) ? (c = s.slice(0, -1), l = !0) : s.startsWith(rt) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return ot(t, l, c, u);
	};
	if (t) {
		let e = t + it, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : ot(at, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, ct = (e) => {
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
}, lt = (e) => ({
	cache: nt(e.cacheSize),
	parseClassName: st(e),
	sortModifiers: ct(e),
	postfixLookupClassGroupIds: ut(e),
	...We(e)
}), ut = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, dt = /\s+/, ft = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(dt), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + rt : _, y = v + g;
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
}, pt = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = mt(n)) && (i && (i += " "), i += r);
	return i;
}, mt = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = mt(e[r])) && (n && (n += " "), n += t);
	return n;
}, ht = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = lt(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = ft(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(pt(...e));
}, gt = [], _t = (e) => {
	let t = (t) => t[e] || gt;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, vt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, yt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, bt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, xt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, St = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ct = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, wt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Et = (e) => bt.test(e), j = (e) => !!e && !Number.isNaN(Number(e)), Dt = (e) => !!e && Number.isInteger(Number(e)), Ot = (e) => e.endsWith("%") && j(e.slice(0, -1)), kt = (e) => xt.test(e), At = () => !0, jt = (e) => St.test(e) && !Ct.test(e), Mt = () => !1, Nt = (e) => wt.test(e), Pt = (e) => Tt.test(e), Ft = (e) => !M(e) && !N(e), It = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Lt = (e) => Qt(e, nn, Mt), M = (e) => vt.test(e), Rt = (e) => Qt(e, rn, jt), zt = (e) => Qt(e, an, j), Bt = (e) => Qt(e, sn, At), Vt = (e) => Qt(e, on, Mt), Ht = (e) => Qt(e, en, Mt), Ut = (e) => Qt(e, tn, Pt), Wt = (e) => Qt(e, cn, Nt), N = (e) => yt.test(e), Gt = (e) => $t(e, rn), Kt = (e) => $t(e, on), qt = (e) => $t(e, en), Jt = (e) => $t(e, nn), Yt = (e) => $t(e, tn), Xt = (e) => $t(e, cn, !0), Zt = (e) => $t(e, sn, !0), Qt = (e, t, n) => {
	let r = vt.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, $t = (e, t, n = !1) => {
	let r = yt.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, en = (e) => e === "position" || e === "percentage", tn = (e) => e === "image" || e === "url", nn = (e) => e === "length" || e === "size" || e === "bg-size", rn = (e) => e === "length", an = (e) => e === "number", on = (e) => e === "family-name", sn = (e) => e === "number" || e === "weight", cn = (e) => e === "shadow", ln = /*#__PURE__*/ ht(() => {
	let e = _t("color"), t = _t("font"), n = _t("text"), r = _t("font-weight"), i = _t("tracking"), a = _t("leading"), o = _t("breakpoint"), s = _t("container"), c = _t("spacing"), l = _t("radius"), u = _t("shadow"), d = _t("inset-shadow"), f = _t("text-shadow"), p = _t("drop-shadow"), m = _t("blur"), h = _t("perspective"), g = _t("aspect"), _ = _t("ease"), v = _t("animate"), y = () => [
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
		N,
		M
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
		N,
		M,
		c
	], C = () => [
		Et,
		"full",
		"auto",
		...S()
	], ne = () => [
		Dt,
		"none",
		"subgrid",
		N,
		M
	], w = () => [
		"auto",
		{ span: [
			"full",
			Dt,
			N,
			M
		] },
		Dt,
		N,
		M
	], T = () => [
		Dt,
		"auto",
		N,
		M
	], re = () => [
		"auto",
		"min",
		"max",
		"fr",
		N,
		M
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
		Et,
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
		Et,
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
		Et,
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
		N,
		M
	], ue = () => [
		...b(),
		qt,
		Ht,
		{ position: [N, M] }
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
		Jt,
		Lt,
		{ size: [N, M] }
	], pe = () => [
		Ot,
		Gt,
		Rt
	], D = () => [
		"",
		"none",
		"full",
		l,
		N,
		M
	], me = () => [
		"",
		j,
		Gt,
		Rt
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
		j,
		Ot,
		qt,
		Ht
	], ve = () => [
		"",
		"none",
		m,
		N,
		M
	], ye = () => [
		"none",
		j,
		N,
		M
	], be = () => [
		"none",
		j,
		N,
		M
	], xe = () => [
		j,
		N,
		M
	], Se = () => [
		Et,
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
			blur: [kt],
			breakpoint: [kt],
			color: [At],
			container: [kt],
			"drop-shadow": [kt],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Ft],
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
			"inset-shadow": [kt],
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
			radius: [kt],
			shadow: [kt],
			spacing: ["px", j],
			text: [kt],
			"text-shadow": [kt],
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
				Et,
				M,
				N,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				N,
				M
			] }],
			"container-named": [It],
			columns: [{ columns: [
				j,
				"auto",
				M,
				N,
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
				Dt,
				"auto",
				N,
				M
			] }],
			basis: [{ basis: [
				Et,
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
				j,
				Et,
				"auto",
				"initial",
				"none",
				M
			] }],
			grow: [{ grow: [
				"",
				j,
				N,
				M
			] }],
			shrink: [{ shrink: [
				"",
				j,
				N,
				M
			] }],
			order: [{ order: [
				Dt,
				"first",
				"last",
				"none",
				N,
				M
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
				Gt,
				Rt
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Zt,
				Bt
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
				Ot,
				M
			] }],
			"font-family": [{ font: [
				Kt,
				Vt,
				t
			] }],
			"font-features": [{ "font-features": [M] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				N,
				M
			] }],
			"line-clamp": [{ "line-clamp": [
				j,
				"none",
				N,
				zt
			] }],
			leading: [{ leading: [
				"none",
				a,
				...S()
			] }],
			"list-image": [{ "list-image": [
				"none",
				N,
				M
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				N,
				M
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
				j,
				"from-font",
				"auto",
				N,
				Rt
			] }],
			"text-decoration-color": [{ decoration: E() }],
			"underline-offset": [{ "underline-offset": [
				j,
				"auto",
				N,
				M
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
				Dt,
				N,
				M
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
				N,
				M
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
				N,
				M
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
						Dt,
						N,
						M
					],
					radial: [
						"",
						N,
						M
					],
					conic: [
						"",
						Dt,
						N,
						M
					]
				},
				Yt,
				Ut
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
				j,
				N,
				M
			] }],
			"outline-w": [{ outline: [
				"",
				j,
				Gt,
				Rt
			] }],
			"outline-color": [{ outline: E() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Xt,
				Wt
			] }],
			"shadow-color": [{ shadow: E() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Xt,
				Wt
			] }],
			"inset-shadow-color": [{ "inset-shadow": E() }],
			"ring-w": [{ ring: me() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: E() }],
			"ring-offset-w": [{ "ring-offset": [j, Rt] }],
			"ring-offset-color": [{ "ring-offset": E() }],
			"inset-ring-w": [{ "inset-ring": me() }],
			"inset-ring-color": [{ "inset-ring": E() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Xt,
				Wt
			] }],
			"text-shadow-color": [{ "text-shadow": E() }],
			opacity: [{ opacity: [
				j,
				N,
				M
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
			"mask-image-linear-pos": [{ "mask-linear": [j] }],
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
			"mask-image-radial": [{ "mask-radial": [N, M] }],
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
			"mask-image-conic-pos": [{ "mask-conic": [j] }],
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
				N,
				M
			] }],
			filter: [{ filter: [
				"",
				"none",
				N,
				M
			] }],
			blur: [{ blur: ve() }],
			brightness: [{ brightness: [
				j,
				N,
				M
			] }],
			contrast: [{ contrast: [
				j,
				N,
				M
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Xt,
				Wt
			] }],
			"drop-shadow-color": [{ "drop-shadow": E() }],
			grayscale: [{ grayscale: [
				"",
				j,
				N,
				M
			] }],
			"hue-rotate": [{ "hue-rotate": [
				j,
				N,
				M
			] }],
			invert: [{ invert: [
				"",
				j,
				N,
				M
			] }],
			saturate: [{ saturate: [
				j,
				N,
				M
			] }],
			sepia: [{ sepia: [
				"",
				j,
				N,
				M
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				N,
				M
			] }],
			"backdrop-blur": [{ "backdrop-blur": ve() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				j,
				N,
				M
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				j,
				N,
				M
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				j,
				N,
				M
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				j,
				N,
				M
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				j,
				N,
				M
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				j,
				N,
				M
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				j,
				N,
				M
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				j,
				N,
				M
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
				N,
				M
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				j,
				"initial",
				N,
				M
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				N,
				M
			] }],
			delay: [{ delay: [
				j,
				N,
				M
			] }],
			animate: [{ animate: [
				"none",
				v,
				N,
				M
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				N,
				M
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
				N,
				M,
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
				Dt,
				N,
				M
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
				N,
				M
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
				N,
				M
			] }],
			fill: [{ fill: ["none", ...E()] }],
			"stroke-w": [{ stroke: [
				j,
				Gt,
				Rt,
				zt
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
function un(...e) {
	return ln(Pe(e));
}
//#endregion
//#region ../../node_modules/react/cjs/react-jsx-runtime.production.js
var dn = /* @__PURE__ */ o(((e) => {
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
})), fn = /* @__PURE__ */ o(((e) => {
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
})), P = (/* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? dn() : fn();
})))(), pn = Le("relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
	} },
	defaultVariants: { variant: "default" }
});
function mn({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: un(pn({ variant: t }), e),
		...n
	});
}
function hn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "alert-title",
		className: un("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
		...t
	});
}
function gn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "alert-description",
		className: un("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", e),
		...t
	});
}
//#endregion
//#region ../../node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var _n = Object.defineProperty, vn = (e, t) => _n(e, "name", {
	value: t,
	configurable: !0
});
function yn(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
vn(yn, "setRef");
function bn(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = yn(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : yn(e[t], null);
			}
		};
	};
}
vn(bn, "composeRefs");
function xn(...e) {
	return x.useCallback(bn(...e), e);
}
vn(xn, "useComposedRefs");
//#endregion
//#region ../../node_modules/@radix-ui/react-slot/dist/index.mjs
var Sn = Object.defineProperty, Cn = (e, t) => Sn(e, "name", {
	value: t,
	configurable: !0
});
// @__NO_SIDE_EFFECTS__
function wn(e) {
	let t = x.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		r = Fn(r), x.Children.forEach(r, (e) => {
			if (jn(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				for (; Nn(n) && typeof zn == "function";) n = zn(n._payload);
				a = On(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = x.cloneElement(a, void 0, s) : !o && x.Children.count(r) === 1 && x.isValidElement(r) && (a = r);
		let c = a ? An(a) : void 0, l = xn(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? Rn(e) : Ln(e));
			return r;
		}
		let u = kn(i, a.props ?? {});
		return a.type !== x.Fragment && (u.ref = n ? l : c), x.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
Cn(wn, "createSlot");
var Tn = /* @__PURE__ */ wn("Slot"), En = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Dn(e) {
	let t = /* @__PURE__ */ Cn((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = En, t;
}
Cn(Dn, "createSlottable");
var On = /* @__PURE__ */ Cn((e, t) => "child" in e.props ? x.isValidElement(t) ? x.cloneElement(t, void 0, e.props.children(t.props.children)) : null : x.isValidElement(t) ? t : null, "getSlottableElementFromSlottable");
function kn(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" ? n[r] = [i, a].filter(Boolean).join(" ") : r === "aria-describedby" && (n[r] = In(a, i));
	}
	return {
		...e,
		...n
	};
}
Cn(kn, "mergeProps");
function An(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Cn(An, "getElementRef");
function jn(e) {
	return x.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === En;
}
Cn(jn, "isSlottable");
var Mn = Symbol.for("react.lazy");
function Nn(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === Mn && "_payload" in e && Pn(e._payload);
}
Cn(Nn, "isLazyComponent");
function Pn(e) {
	return typeof e == "object" && !!e && "then" in e;
}
Cn(Pn, "isPromiseLike");
function Fn(e) {
	let t = e;
	for (; Nn(t) && typeof zn == "function";) t = zn(t._payload);
	return t;
}
Cn(Fn, "useUnwrappedLazy");
function In(...e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) if (typeof n == "string") for (let e of String(n).trim().split(/\s+/)) e && t.add(e);
	return t.size > 0 ? Array.from(t).join(" ") : void 0;
}
Cn(In, "concatAriaDescribedby");
var Ln = /* @__PURE__ */ Cn((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), Rn = /* @__PURE__ */ Cn((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), zn = x.use, Bn = Le("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		destructive: "border-transparent bg-destructive text-destructive-foreground",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Vn({ className: e, variant: t, asChild: n = !1, ...r }) {
	return /* @__PURE__ */ (0, P.jsx)(n ? Tn : "span", {
		"data-slot": "badge",
		className: un(Bn({ variant: t }), e),
		...r
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/button.tsx
var Hn = Le("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", {
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
function Un({ className: e, variant: t, size: n, asChild: r = !1, ...i }) {
	return /* @__PURE__ */ (0, P.jsx)(r ? Tn : "button", {
		"data-slot": "button",
		className: un(Hn({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/card.tsx
function Wn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card",
		className: un("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", e),
		...t
	});
}
function Gn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card-header",
		className: un("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]", e),
		...t
	});
}
function Kn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card-title",
		className: un("leading-none font-semibold", e),
		...t
	});
}
function qn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card-description",
		className: un("text-muted-foreground text-sm", e),
		...t
	});
}
function Jn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card-action",
		className: un("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
		...t
	});
}
function Yn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card-content",
		className: un("px-6", e),
		...t
	});
}
function Xn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "card-footer",
		className: un("flex items-center px-6 [.border-t]:pt-6", e),
		...t
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/input.tsx
function Zn({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, P.jsx)("input", {
		type: t,
		"data-slot": "input",
		className: un("border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 aria-invalid:border-destructive", e),
		...n
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/skeleton.tsx
function Qn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "skeleton",
		className: un("bg-accent animate-pulse rounded-md", e),
		...t
	});
}
//#endregion
//#region ../../packages/ui/src/components/ui/table.tsx
function $n({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, P.jsx)("table", {
			"data-slot": "table",
			className: un("w-full caption-bottom text-sm", e),
			...t
		})
	});
}
function er({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("thead", {
		"data-slot": "table-header",
		className: un("[&_tr]:border-b", e),
		...t
	});
}
function tr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("tbody", {
		"data-slot": "table-body",
		className: un("[&_tr:last-child]:border-0", e),
		...t
	});
}
function nr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("tr", {
		"data-slot": "table-row",
		className: un("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", e),
		...t
	});
}
function rr({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("th", {
		"data-slot": "table-head",
		className: un("text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
function ir({ className: e, ...t }) {
	return /* @__PURE__ */ (0, P.jsx)("td", {
		"data-slot": "table-cell",
		className: un("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
		...t
	});
}
//#endregion
//#region src/app.tsx
function ar({ attrs: e, navigate: t }) {
	let n = e.view ?? "dashboard";
	return n === "source" ? /* @__PURE__ */ (0, P.jsx)(pr, {
		sourceKey: e["source-key"] ?? "",
		navigate: t
	}) : n === "articles" ? /* @__PURE__ */ (0, P.jsx)(mr, { navigate: t }) : /* @__PURE__ */ (0, P.jsx)(dr, { navigate: t });
}
function or({ title: e, description: t, actions: n }) {
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, P.jsxs)("div", {
			className: "space-y-1",
			children: [/* @__PURE__ */ (0, P.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: e
			}), t ? /* @__PURE__ */ (0, P.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: t
			}) : null]
		}), n ? /* @__PURE__ */ (0, P.jsx)("div", {
			className: "flex items-center gap-2",
			children: n
		}) : null]
	});
}
function sr({ error: e }) {
	let t = e instanceof Ce ? e.message : "Request failed.", n = e instanceof Ce ? e.action : "Check that the stack is running.";
	return /* @__PURE__ */ (0, P.jsxs)(mn, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, P.jsx)(O, {}),
			/* @__PURE__ */ (0, P.jsx)(hn, { children: t }),
			/* @__PURE__ */ (0, P.jsx)(gn, { children: n })
		]
	});
}
function cr({ text: e }) {
	return e ? /* @__PURE__ */ (0, P.jsx)(mn, { children: /* @__PURE__ */ (0, P.jsx)(gn, { children: e }) }) : null;
}
function lr({ status: e }) {
	return /* @__PURE__ */ (0, P.jsx)(Vn, {
		variant: e === "archived" || e === "completed" ? "default" : e === "failed" ? "destructive" : "secondary",
		children: e
	});
}
function ur(e) {
	return e ? e.slice(0, 10) : "—";
}
function dr({ navigate: e }) {
	let t = Me(() => A.sources(), []), [n, r] = (0, x.useState)(null), [i, a] = (0, x.useState)(!1), o = async (e) => {
		a(!0), r(null);
		try {
			let t = await A.createCrawlJob(e), n = t.items.map((e) => e.sourceKey).join(", ");
			r(`Requested ${t.items.length} job(s): ${n}. Track them under Jobs.`);
		} catch (e) {
			r(e instanceof Ce ? `${e.message} ${e.action}` : "Request failed.");
		} finally {
			a(!1);
		}
	}, s = (t.data?.items ?? []).filter((e) => e.enabled && e.health !== "fresh").map((e) => e.key);
	return /* @__PURE__ */ (0, P.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, P.jsx)(or, {
				title: "Sources",
				description: "Personal archive — crawls run only when you trigger them here (no schedule).",
				actions: /* @__PURE__ */ (0, P.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, P.jsxs)(Un, {
					variant: "outline",
					size: "sm",
					disabled: i || s.length === 0,
					onClick: () => o({
						sourceKeys: s,
						jobType: "incremental"
					}),
					children: [
						/* @__PURE__ */ (0, P.jsx)(_e, {}),
						" Refresh stale (",
						s.length,
						")"
					]
				}), /* @__PURE__ */ (0, P.jsxs)(Un, {
					variant: "outline",
					size: "sm",
					disabled: i,
					onClick: () => t.reload(),
					children: [/* @__PURE__ */ (0, P.jsx)(ye, {}), " Reload"]
				})] })
			}),
			/* @__PURE__ */ (0, P.jsx)(cr, { text: n }),
			t.error ? /* @__PURE__ */ (0, P.jsx)(sr, { error: t.error }) : null,
			t.loading && !t.data ? /* @__PURE__ */ (0, P.jsx)(_r, {}) : null,
			t.data ? /* @__PURE__ */ (0, P.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: t.data.items.map((t) => /* @__PURE__ */ (0, P.jsx)(fr, {
					source: t,
					busy: i,
					navigate: e,
					onCrawl: () => o({
						sourceKeys: [t.key],
						jobType: "incremental"
					})
				}, t.key))
			}) : null
		]
	});
}
function fr({ source: e, busy: t, navigate: n, onCrawl: r }) {
	let i = e.health === "fresh" ? "default" : e.health === "failing" ? "destructive" : "secondary";
	return /* @__PURE__ */ (0, P.jsxs)(Wn, { children: [
		/* @__PURE__ */ (0, P.jsxs)(Gn, { children: [
			/* @__PURE__ */ (0, P.jsx)(Kn, {
				className: "truncate",
				children: e.name
			}),
			/* @__PURE__ */ (0, P.jsxs)(qn, {
				className: "font-mono",
				children: [
					e.key,
					" · ",
					e.discoveryType
				]
			}),
			/* @__PURE__ */ (0, P.jsx)(Jn, { children: /* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, P.jsx)(Vn, {
					variant: i,
					children: e.health
				}), e.enabled ? null : /* @__PURE__ */ (0, P.jsx)(Vn, {
					variant: "outline",
					children: "disabled"
				})]
			}) })
		] }),
		/* @__PURE__ */ (0, P.jsxs)(Yn, {
			className: "text-muted-foreground space-y-1 text-sm",
			children: [/* @__PURE__ */ (0, P.jsxs)("p", { children: [
				e.archivedCount,
				" archived · ",
				e.failedCount,
				" failed · ",
				e.articleCount,
				" ",
				"discovered"
			] }), /* @__PURE__ */ (0, P.jsxs)("p", { children: ["Last success: ", ur(e.lastSuccessAt)] })]
		}),
		/* @__PURE__ */ (0, P.jsxs)(Xn, {
			className: "gap-2",
			children: [/* @__PURE__ */ (0, P.jsxs)(Un, {
				size: "sm",
				disabled: t || !e.enabled,
				onClick: r,
				children: [/* @__PURE__ */ (0, P.jsx)(he, {}), " Crawl now"]
			}), /* @__PURE__ */ (0, P.jsx)(Un, {
				size: "sm",
				variant: "outline",
				onClick: () => n(`/sources/${e.key}`),
				children: "Open"
			})]
		})
	] });
}
function pr({ sourceKey: e, navigate: t }) {
	let [n, r] = (0, x.useState)(0), [i, a] = (0, x.useState)(null), [o, s] = (0, x.useState)(!1), c = Me(() => A.source(e), [e]), l = Me(() => A.articles({
		source: e,
		page: n,
		size: 25
	}), [e, n]);
	return (0, x.useEffect)(() => {
		r(0);
	}, [e]), e === "" ? /* @__PURE__ */ (0, P.jsxs)(mn, {
		variant: "destructive",
		children: [
			/* @__PURE__ */ (0, P.jsx)(O, {}),
			/* @__PURE__ */ (0, P.jsx)(hn, { children: "Missing source key" }),
			/* @__PURE__ */ (0, P.jsx)(gn, { children: "The shell routed here without a source-key attribute." })
		]
	}) : /* @__PURE__ */ (0, P.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, P.jsx)(or, {
				title: c.data?.name ?? e,
				description: c.data ? `${c.data.archivedCount} archived · ${c.data.failedCount} failed · last success ${ur(c.data.lastSuccessAt)}` : "Source detail",
				actions: /* @__PURE__ */ (0, P.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, P.jsxs)(Un, {
					variant: "ghost",
					size: "sm",
					onClick: () => t("/"),
					children: [/* @__PURE__ */ (0, P.jsx)(D, {}), " Sources"]
				}), /* @__PURE__ */ (0, P.jsxs)(Un, {
					size: "sm",
					disabled: o || !c.data?.enabled,
					onClick: async () => {
						s(!0), a(null);
						try {
							await A.createCrawlJob({
								sourceKeys: [e],
								jobType: "incremental"
							}), a(`Job requested for ${e}. Track it under Jobs.`);
						} catch (e) {
							a(e instanceof Ce ? `${e.message} ${e.action}` : "Request failed.");
						} finally {
							s(!1);
						}
					},
					children: [/* @__PURE__ */ (0, P.jsx)(he, {}), " Crawl now"]
				})] })
			}),
			/* @__PURE__ */ (0, P.jsx)(cr, { text: i }),
			c.error ? /* @__PURE__ */ (0, P.jsx)(sr, { error: c.error }) : null,
			/* @__PURE__ */ (0, P.jsxs)(Wn, { children: [/* @__PURE__ */ (0, P.jsx)(Gn, { children: /* @__PURE__ */ (0, P.jsx)(Kn, { children: "Articles" }) }), /* @__PURE__ */ (0, P.jsxs)(Yn, {
				className: "space-y-2",
				children: [
					l.loading && !l.data ? /* @__PURE__ */ (0, P.jsx)(vr, {}) : null,
					l.error ? /* @__PURE__ */ (0, P.jsx)(sr, { error: l.error }) : null,
					l.data ? /* @__PURE__ */ (0, P.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, P.jsx)(hr, {
						items: l.data.items,
						navigate: t
					}), /* @__PURE__ */ (0, P.jsx)(gr, {
						page: l.data.page,
						size: l.data.size,
						total: l.data.total,
						onPage: r
					})] }) : null
				]
			})] })
		]
	});
}
function mr({ navigate: e }) {
	let [t, n] = (0, x.useState)(""), [r, i] = (0, x.useState)(""), [a, o] = (0, x.useState)(0), s = Me(() => A.articles({
		q: r,
		page: a,
		size: 25
	}), [r, a]);
	return /* @__PURE__ */ (0, P.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, P.jsx)(or, {
				title: "Articles",
				description: "Search the local archive; the reader module opens the full text."
			}),
			/* @__PURE__ */ (0, P.jsxs)("form", {
				className: "flex max-w-lg items-center gap-2",
				onSubmit: (e) => {
					e.preventDefault(), o(0), i(t.trim());
				},
				children: [/* @__PURE__ */ (0, P.jsx)(Zn, {
					value: t,
					onChange: (e) => n(e.target.value),
					placeholder: "Search titles…",
					"aria-label": "Search articles"
				}), /* @__PURE__ */ (0, P.jsxs)(Un, {
					type: "submit",
					size: "sm",
					variant: "outline",
					children: [/* @__PURE__ */ (0, P.jsx)(xe, {}), " Search"]
				})]
			}),
			s.error ? /* @__PURE__ */ (0, P.jsx)(sr, { error: s.error }) : null,
			s.loading && !s.data ? /* @__PURE__ */ (0, P.jsx)(vr, {}) : null,
			s.data ? /* @__PURE__ */ (0, P.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, P.jsx)(hr, {
				items: s.data.items,
				navigate: e,
				showSource: !0
			}), /* @__PURE__ */ (0, P.jsx)(gr, {
				page: s.data.page,
				size: s.data.size,
				total: s.data.total,
				onPage: o
			})] }) : null
		]
	});
}
function hr({ items: e, navigate: t, showSource: n = !1 }) {
	return e.length === 0 ? /* @__PURE__ */ (0, P.jsx)("p", {
		className: "text-muted-foreground py-6 text-center text-sm",
		children: "No articles found."
	}) : /* @__PURE__ */ (0, P.jsxs)($n, { children: [/* @__PURE__ */ (0, P.jsx)(er, { children: /* @__PURE__ */ (0, P.jsxs)(nr, { children: [
		/* @__PURE__ */ (0, P.jsx)(rr, { children: "Title" }),
		n ? /* @__PURE__ */ (0, P.jsx)(rr, { children: "Source" }) : null,
		/* @__PURE__ */ (0, P.jsx)(rr, { children: "Status" }),
		/* @__PURE__ */ (0, P.jsx)(rr, { children: "Published" }),
		/* @__PURE__ */ (0, P.jsx)(rr, { children: "SHA" })
	] }) }), /* @__PURE__ */ (0, P.jsx)(tr, { children: e.map((e) => /* @__PURE__ */ (0, P.jsxs)(nr, {
		className: "cursor-pointer",
		onClick: () => t(`/articles/${e.id}`),
		children: [
			/* @__PURE__ */ (0, P.jsx)(ir, {
				className: "max-w-md truncate font-medium",
				children: e.title
			}),
			n ? /* @__PURE__ */ (0, P.jsx)(ir, { children: /* @__PURE__ */ (0, P.jsx)(Vn, {
				variant: "outline",
				children: e.sourceKey
			}) }) : null,
			/* @__PURE__ */ (0, P.jsx)(ir, { children: /* @__PURE__ */ (0, P.jsx)(lr, { status: e.status }) }),
			/* @__PURE__ */ (0, P.jsx)(ir, { children: ur(e.publishedAt) }),
			/* @__PURE__ */ (0, P.jsx)(ir, {
				className: "font-mono text-xs",
				children: e.contentSha256
			})
		]
	}, e.id)) })] });
}
function gr({ page: e, size: t, total: n, onPage: r }) {
	let i = Math.max(1, Math.ceil(n / Math.max(1, t)));
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "text-muted-foreground flex items-center justify-between gap-2 pt-2 text-sm",
		children: [/* @__PURE__ */ (0, P.jsxs)("span", { children: [
			"Page ",
			e + 1,
			" of ",
			i,
			" — ",
			n,
			" items"
		] }), /* @__PURE__ */ (0, P.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, P.jsx)(Un, {
				variant: "outline",
				size: "sm",
				disabled: e <= 0,
				onClick: () => r(e - 1),
				children: "Previous"
			}), /* @__PURE__ */ (0, P.jsx)(Un, {
				variant: "outline",
				size: "sm",
				disabled: e + 1 >= i,
				onClick: () => r(e + 1),
				children: "Next"
			})]
		})]
	});
}
function _r() {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
		children: Array.from({ length: 6 }).map((e, t) => /* @__PURE__ */ (0, P.jsx)(Qn, { className: "h-44 rounded-xl" }, t))
	});
}
function vr() {
	return /* @__PURE__ */ (0, P.jsx)("div", {
		className: "space-y-2",
		children: Array.from({ length: 6 }).map((e, t) => /* @__PURE__ */ (0, P.jsx)(Qn, { className: "h-9 w-full" }, t))
	});
}
//#endregion
//#region src/mfe.ts
C("tb-catalog-app", ar, ["view", "source-key"]);
//#endregion
