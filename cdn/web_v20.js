function t(t) {
  return Object.keys(t).reduce((e, r) => {
    var n = t[r];
    return (
      (e[r] = Object.assign({}, n)),
      !s(n.value) ||
        (function (t) {
          return "[object Function]" === Object.prototype.toString.call(t);
        })(n.value) ||
        Array.isArray(n.value) ||
        (e[r].value = Object.assign({}, n.value)),
      Array.isArray(n.value) && (e[r].value = n.value.slice(0)),
      e
    );
  }, {});
}
function e(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch (e) {
      return t;
    }
}
function r(t, e, r) {
  if (null == r || !1 === r) return t.removeAttribute(e);
  let s = JSON.stringify(r);
  (t.__updating[e] = !0),
    "true" === s && (s = ""),
    t.setAttribute(e, s),
    Promise.resolve().then(() => delete t.__updating[e]);
}
function s(t) {
  return null != t && ("object" == typeof t || "function" == typeof t);
}
let n;
function i(s, i) {
  const o = Object.keys(i);
  return class extends s {
    static get observedAttributes() {
      return o.map((t) => i[t].attribute);
    }
    constructor() {
      super(),
        (this.__initialized = !1),
        (this.__released = !1),
        (this.__releaseCallbacks = []),
        (this.__propertyChangedCallbacks = []),
        (this.__updating = {}),
        (this.props = {});
    }
    connectedCallback() {
      if (!this.__initialized) {
        (this.__releaseCallbacks = []),
          (this.__propertyChangedCallbacks = []),
          (this.__updating = {}),
          (this.props = (function (s, n) {
            const i = t(n);
            return (
              Object.keys(n).forEach((t) => {
                const n = i[t],
                  o = s.getAttribute(n.attribute),
                  a = s[t];
                o && (n.value = n.parse ? e(o) : o),
                  null != a && (n.value = Array.isArray(a) ? a.slice(0) : a),
                  n.reflect && r(s, n.attribute, n.value),
                  Object.defineProperty(s, t, {
                    get: () => n.value,
                    set(e) {
                      var s = n.value;
                      (n.value = e), n.reflect && r(this, n.attribute, n.value);
                      for (
                        let r = 0, n = this.__propertyChangedCallbacks.length;
                        r < n;
                        r++
                      )
                        this.__propertyChangedCallbacks[r](t, e, s);
                    },
                    enumerable: !0,
                    configurable: !0,
                  });
              }),
              i
            );
          })(this, i));
        var s = (function (t) {
            return Object.keys(t).reduce(
              (e, r) => ((e[r] = t[r].value), e),
              {}
            );
          })(this.props),
          o = this.Component,
          a = n;
        try {
          ((n = this).__initialized = !0),
            (function (t) {
              return (
                "function" == typeof t && 0 === t.toString().indexOf("class")
              );
            })(o)
              ? new o(s, { element: this })
              : o(s, { element: this });
        } finally {
          n = a;
        }
      }
    }
    async disconnectedCallback() {
      if ((await Promise.resolve(), !this.isConnected)) {
        this.__propertyChangedCallbacks.length = 0;
        for (var t = null; (t = this.__releaseCallbacks.pop()); ) t(this);
        delete this.__initialized, (this.__released = !0);
      }
    }
    attributeChangedCallback(t, r, s) {
      !this.__initialized ||
        this.__updating[t] ||
        ((t = this.lookupProp(t)) in i &&
          ((null == s && !this[t]) || (this[t] = i[t].parse ? e(s) : s)));
    }
    lookupProp(t) {
      if (i) return o.find((e) => t === e || t === i[e].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({ mode: "open" });
    }
    addReleaseCallback(t) {
      this.__releaseCallbacks.push(t);
    }
    addPropertyChangedCallback(t) {
      this.__propertyChangedCallbacks.push(t);
    }
  };
}
function o(t, e = {}, r = {}) {
  const { BaseElement: n = HTMLElement, extension: o } = r;
  return (r) => {
    if (!t) throw new Error("tag is required to register a Component");
    let a = customElements.get(t);
    return (
      a
        ? (a.prototype.Component = r)
        : (((a = i(
            n,
            (function (t) {
              return t
                ? Object.keys(t).reduce((e, r) => {
                    var n = t[r];
                    return (
                      (e[r] = s(n) && "value" in n ? n : { value: n }),
                      e[r].attribute ||
                        (e[r].attribute = (function (t) {
                          return t
                            .replace(
                              /\.?([A-Z]+)/g,
                              (t, e) => "-" + e.toLowerCase()
                            )
                            .replace("_", "-")
                            .replace(/^-/, "");
                        })(r)),
                      (e[r].parse =
                        "parse" in e[r]
                          ? e[r].parse
                          : "string" != typeof e[r].value),
                      e
                    );
                  }, {})
                : {};
            })(e)
          )).prototype.Component = r),
          (a.prototype.registeredTag = t),
          customElements.define(t, a, o)),
      a
    );
  };
}
const a = Symbol("solid-proxy"),
  l = Symbol("solid-track"),
  c = { equals: (t, e) => t === e };
let h = I;
const u = 1,
  p = 2,
  d = { owned: null, cleanups: null, context: null, owner: null };
var f = null;
let g = null,
  b = null,
  m = null,
  y = null,
  w = 0;
function v(t, e) {
  const r = b,
    s = f,
    n = 0 === t.length,
    i = n
      ? d
      : {
          owned: null,
          cleanups: null,
          context: null,
          owner: void 0 === e ? s : e,
        },
    o = n ? t : () => t(() => E(() => H(i)));
  (f = i), (b = null);
  try {
    return O(o, !0);
  } finally {
    (b = r), (f = s);
  }
}
function x(t, e) {
  const r = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: (e = e ? Object.assign({}, c, e) : c).equals || void 0,
  };
  return [
    P.bind(r),
    (t) => ("function" == typeof t && (t = t(r.value)), R(r, t)),
  ];
}
function A(t, e, r) {
  L(_(t, e, !1, u));
}
function k(t, e, r) {
  (h = j), ((t = _(t, e, !1, u)).user = !0), y ? y.push(t) : L(t);
}
function C(t, e, r) {
  return (
    (r = r ? Object.assign({}, c, r) : c),
    ((t = _(t, e, !0, 0)).observers = null),
    (t.observerSlots = null),
    (t.comparator = r.equals || void 0),
    L(t),
    P.bind(t)
  );
}
function E(t) {
  if (null === b) return t();
  var e = b;
  b = null;
  try {
    return t();
  } finally {
    b = e;
  }
}
function S(t) {
  k(() => E(t));
}
function B(t) {
  return (
    null !== f &&
      (null === f.cleanups ? (f.cleanups = [t]) : f.cleanups.push(t)),
    t
  );
}
function P() {
  var t;
  return (
    this.sources &&
      this.state &&
      (this.state === u
        ? L(this)
        : ((t = m), (m = null), O(() => N(this), !1), (m = t))),
    b &&
      ((t = this.observers ? this.observers.length : 0),
      b.sources
        ? (b.sources.push(this), b.sourceSlots.push(t))
        : ((b.sources = [this]), (b.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(b),
          this.observerSlots.push(b.sources.length - 1))
        : ((this.observers = [b]),
          (this.observerSlots = [b.sources.length - 1]))),
    this.value
  );
}
function R(t, e, r) {
  var s = t.value;
  return (
    (t.comparator && t.comparator(s, e)) ||
      ((t.value = e),
      t.observers &&
        t.observers.length &&
        O(() => {
          for (let s = 0; s < t.observers.length; s += 1) {
            var e = t.observers[s],
              r = g && g.running;
            r && g.disposed.has(e),
              (r ? e.tState : e.state) ||
                ((e.pure ? m : y).push(e), e.observers && q(e)),
              r || (e.state = u);
          }
          if (1e6 < m.length) throw ((m = []), new Error());
        }, !1)),
    e
  );
}
function L(t) {
  var e, r, s;
  t.fn &&
    (H(t),
    (e = f),
    (r = b),
    (s = w),
    (function (t, e, r) {
      let s;
      try {
        s = t.fn(e);
      } catch (e) {
        return (
          t.pure &&
            ((t.state = u), t.owned && t.owned.forEach(H), (t.owned = null)),
          (t.updatedAt = r + 1),
          M(e)
        );
      }
      (!t.updatedAt || t.updatedAt <= r) &&
        (null != t.updatedAt && "observers" in t ? R(t, s) : (t.value = s),
        (t.updatedAt = r));
    })((b = f = t), t.value, s),
    (b = r),
    (f = e));
}
function _(t, e, r, s = u, n) {
  return (
    (t = {
      fn: t,
      state: s,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: e,
      owner: f,
      context: null,
      pure: r,
    }),
    null !== f && f !== d && (f.owned ? f.owned.push(t) : (f.owned = [t])),
    t
  );
}
function T(t) {
  if (0 !== t.state) {
    if (t.state === p) return N(t);
    if (t.suspense && E(t.suspense.inFallback))
      return t.suspense.effects.push(t);
    const r = [t];
    for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < w); )
      t.state && r.push(t);
    for (let s = r.length - 1; 0 <= s; s--) {
      var e;
      (t = r[s]).state === u
        ? L(t)
        : t.state === p &&
          ((e = m), (m = null), O(() => N(t, r[0]), !1), (m = e));
    }
  }
}
function O(t, e) {
  if (m) return t();
  let r = !1;
  e || (m = []), y ? (r = !0) : (y = []), w++;
  try {
    var s = t();
    return (
      (function (t) {
        if ((m && (I(m), (m = null)), !t)) {
          const t = y;
          (y = null), t.length && O(() => h(t), !1);
        }
      })(r),
      s
    );
  } catch (t) {
    r || (y = null), (m = null), M(t);
  }
}
function I(t) {
  for (let e = 0; e < t.length; e++) T(t[e]);
}
function j(t) {
  let e,
    r = 0;
  for (e = 0; e < t.length; e++) {
    var s = t[e];
    s.user ? (t[r++] = s) : T(s);
  }
  for (e = 0; e < r; e++) T(t[e]);
}
function N(t, e) {
  for (let n = (t.state = 0); n < t.sources.length; n += 1) {
    var r,
      s = t.sources[n];
    s.sources &&
      ((r = s.state) === u
        ? s !== e && (!s.updatedAt || s.updatedAt < w) && T(s)
        : r === p && N(s, e));
  }
}
function q(t) {
  for (let r = 0; r < t.observers.length; r += 1) {
    var e = t.observers[r];
    e.state || ((e.state = p), (e.pure ? m : y).push(e), e.observers && q(e));
  }
}
function H(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      var r,
        s,
        n = t.sources.pop(),
        i = t.sourceSlots.pop(),
        o = n.observers;
      o &&
        o.length &&
        ((r = o.pop()), (s = n.observerSlots.pop()), i < o.length) &&
        ((o[(r.sourceSlots[s] = i)] = r), (n.observerSlots[i] = s));
    }
  if (t.owned) {
    for (e = t.owned.length - 1; 0 <= e; e--) H(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; 0 <= e; e--) t.cleanups[e]();
    t.cleanups = null;
  }
  (t.state = 0), (t.context = null);
}
function M(t) {
  throw t;
}
const F = Symbol("fallback");
function z(t) {
  for (let e = 0; e < t.length; e++) t[e]();
}
function W(t, e) {
  return E(() => t(e || {}));
}
function D() {
  return !0;
}
const V = {
  get: (t, e, r) => (e === a ? r : t.get(e)),
  has: (t, e) => e === a || t.has(e),
  set: D,
  deleteProperty: D,
  getOwnPropertyDescriptor: (t, e) => ({
    configurable: !0,
    enumerable: !0,
    get: () => t.get(e),
    set: D,
    deleteProperty: D,
  }),
  ownKeys: (t) => t.keys(),
};
function G(t) {
  return (t = "function" == typeof t ? t() : t) || {};
}
function U(...t) {
  let e = !1;
  for (let s = 0; s < t.length; s++) {
    var r = t[s];
    (e = e || (!!r && a in r)),
      (t[s] = "function" == typeof r ? ((e = !0), C(r)) : r);
  }
  if (e)
    return new Proxy(
      {
        get(e) {
          for (let s = t.length - 1; 0 <= s; s--) {
            var r = G(t[s])[e];
            if (void 0 !== r) return r;
          }
        },
        has(e) {
          for (let r = t.length - 1; 0 <= r; r--) if (e in G(t[r])) return !0;
          return !1;
        },
        keys() {
          var e = [];
          for (let r = 0; r < t.length; r++) e.push(...Object.keys(G(t[r])));
          return [...new Set(e)];
        },
      },
      V
    );
  var s = {};
  for (let e = t.length - 1; 0 <= e; e--)
    if (t[e])
      for (const r in Object.getOwnPropertyDescriptors(t[e]))
        r in s ||
          Object.defineProperty(s, r, {
            enumerable: !0,
            get() {
              for (let s = t.length - 1; 0 <= s; s--) {
                var e = (t[s] || {})[r];
                if (void 0 !== e) return e;
              }
            },
          });
  return s;
}
function Q(t, ...e) {
  const r = new Set(e.flat());
  var s;
  if (a in t)
    return (
      (s = e.map(
        (e) =>
          new Proxy(
            {
              get: (r) => (e.includes(r) ? t[r] : void 0),
              has: (r) => e.includes(r) && r in t,
              keys: () => e.filter((e) => e in t),
            },
            V
          )
      )).push(
        new Proxy(
          {
            get: (e) => (r.has(e) ? void 0 : t[e]),
            has: (e) => !r.has(e) && e in t,
            keys: () => Object.keys(t).filter((t) => !r.has(t)),
          },
          V
        )
      ),
      s
    );
  const n = Object.getOwnPropertyDescriptors(t);
  return (
    e.push(Object.keys(n).filter((t) => !r.has(t))),
    e.map((e) => {
      var r = {};
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        i in t &&
          Object.defineProperty(
            r,
            i,
            n[i] || { get: () => t[i], set: () => !0, enumerable: !0 }
          );
      }
      return r;
    })
  );
}
function Y(t) {
  var e = "fallback" in t && { fallback: () => t.fallback };
  return C(
    (function (t, e, r = {}) {
      let s = [],
        n = [],
        i = [],
        o = 0,
        a = 1 < e.length ? [] : null;
      return (
        B(() => z(i)),
        () => {
          let c,
            h,
            u = t() || [];
          return (
            u[l],
            E(() => {
              let t,
                e,
                l,
                d,
                f,
                g,
                b,
                m,
                y,
                w = u.length;
              if (0 === w)
                0 !== o &&
                  (z(i), (i = []), (s = []), (n = []), (o = 0), (a = a && [])),
                  r.fallback &&
                    ((s = [F]),
                    (n[0] = v((t) => ((i[0] = t), r.fallback()))),
                    (o = 1));
              else if (0 === o) {
                for (n = new Array(w), h = 0; h < w; h++)
                  (s[h] = u[h]), (n[h] = v(p));
                o = w;
              } else {
                for (
                  l = new Array(w),
                    d = new Array(w),
                    a && (f = new Array(w)),
                    g = 0,
                    b = Math.min(o, w);
                  g < b && s[g] === u[g];
                  g++
                );
                for (
                  b = o - 1, m = w - 1;
                  b >= g && m >= g && s[b] === u[m];
                  b--, m--
                )
                  (l[m] = n[b]), (d[m] = i[b]), a && (f[m] = a[b]);
                for (t = new Map(), e = new Array(m + 1), h = m; h >= g; h--)
                  (y = u[h]),
                    (c = t.get(y)),
                    (e[h] = void 0 === c ? -1 : c),
                    t.set(y, h);
                for (c = g; c <= b; c++)
                  (y = s[c]),
                    void 0 !== (h = t.get(y)) && -1 !== h
                      ? ((l[h] = n[c]),
                        (d[h] = i[c]),
                        a && (f[h] = a[c]),
                        (h = e[h]),
                        t.set(y, h))
                      : i[c]();
                for (h = g; h < w; h++)
                  h in l
                    ? ((n[h] = l[h]),
                      (i[h] = d[h]),
                      a && ((a[h] = f[h]), a[h](h)))
                    : (n[h] = v(p));
                (n = n.slice(0, (o = w))), (s = u.slice(0));
              }
              return n;
            })
          );
          function p(t) {
            var r;
            return (
              (i[h] = t),
              a ? (([t, r] = x(h)), (a[h] = r), e(u[h], t)) : e(u[h])
            );
          }
        }
      );
    })(() => t.each, t.children, e || void 0)
  );
}
function $(t) {
  const e = t.keyed,
    r = C(() => t.when, void 0, { equals: (t, r) => (e ? t === r : !t == !r) });
  return C(
    () => {
      const s = r();
      if (s) {
        const n = t.children;
        return "function" == typeof n && 0 < n.length
          ? E(() =>
              n(
                e
                  ? s
                  : () => {
                      if (E(r)) return t.when;
                      throw ((t) => `Stale read from <${t}>.`)("Show");
                    }
              )
            )
          : n;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
const J = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ]),
  Z = new Set(["innerHTML", "textContent", "innerText", "children"]),
  X = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  K = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
const tt = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  et = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
const rt = "_$DX_DELEGATE";
function st(t, e, r) {
  let s;
  const n = () => {
    var e = document.createElement("template");
    return (e.innerHTML = t), (r ? e.content.firstChild : e.content).firstChild;
  };
  return ((e = e
    ? () => (s = s || n()).cloneNode(!0)
    : () => E(() => document.importNode((s = s || n()), !0))).cloneNode = e);
}
function nt(t, e = window.document) {
  var r = e[rt] || (e[rt] = new Set());
  for (let n = 0, i = t.length; n < i; n++) {
    var s = t[n];
    r.has(s) || (r.add(s), e.addEventListener(s, pt));
  }
}
function it(t, e, r) {
  null == r ? t.removeAttribute(e) : t.setAttribute(e, r);
}
function ot(t, e) {
  null == e ? t.removeAttribute("class") : (t.className = e);
}
function at(t, e = {}, r, s) {
  const n = {};
  return (
    s || A(() => (n.children = dt(t, e.children, n.children))),
    A(() => e.ref && e.ref(t)),
    A(() =>
      (function (t, e, r, s, n = {}, i = !1) {
        e = e || {};
        for (const s in n)
          s in e || ("children" !== s && (n[s] = ut(t, s, null, n[s], r, i)));
        for (const a in e) {
          var o;
          "children" === a
            ? s || dt(t, e.children)
            : ((o = e[a]), (n[a] = ut(t, a, o, n[a], r, i)));
        }
      })(t, e, r, !0, n, !0)
    ),
    n
  );
}
function lt(t, e, r) {
  return E(() => t(e, r));
}
function ct(t, e, r, s) {
  if ((void 0 !== r && (s = s || []), "function" != typeof e))
    return dt(t, e, s, r);
  A((s) => dt(t, e(), s, r), s);
}
function ht(t, e, r) {
  var s = e.trim().split(/\s+/);
  for (let e = 0, n = s.length; e < n; e++) t.classList.toggle(s[e], r);
}
function ut(t, e, r, s, n, i) {
  let o, a, l, c, h;
  var u;
  return "style" === e
    ? (function (t, e, r) {
        if (!e) return r ? it(t, "style") : e;
        var s = t.style;
        if ("string" == typeof e) return (s.cssText = e);
        let n, i;
        for (i in ("string" == typeof r && (s.cssText = r = void 0),
        (e = e || {}),
        (r = r || {})))
          null == e[i] && s.removeProperty(i), delete r[i];
        for (i in e) (n = e[i]) !== r[i] && (s.setProperty(i, n), (r[i] = n));
        return r;
      })(t, r, s)
    : "classList" === e
    ? (function (t, e, r = {}) {
        var s = Object.keys(e || {}),
          n = Object.keys(r);
        let i, o;
        for (i = 0, o = n.length; i < o; i++) {
          var a = n[i];
          a && "undefined" !== a && !e[a] && (ht(t, a, !1), delete r[a]);
        }
        for (i = 0, o = s.length; i < o; i++) {
          var l = s[i],
            c = !!e[l];
          l &&
            "undefined" !== l &&
            r[l] !== c &&
            c &&
            (ht(t, l, !0), (r[l] = c));
        }
        return r;
      })(t, r, s)
    : r === s
    ? s
    : ("ref" === e
        ? i || r(t)
        : "on:" === e.slice(0, 3)
        ? ((i = e.slice(3)),
          s && t.removeEventListener(i, s),
          r && t.addEventListener(i, r))
        : "oncapture:" === e.slice(0, 10)
        ? ((i = e.slice(10)),
          s && t.removeEventListener(i, s, !0),
          r && t.addEventListener(i, r, !0))
        : "on" === e.slice(0, 2)
        ? ((i = e.slice(2).toLowerCase()),
          !(u = tt.has(i)) &&
            s &&
            ((s = Array.isArray(s) ? s[0] : s), t.removeEventListener(i, s)),
          (u || r) &&
            ((function (t, e, r, s) {
              if (s)
                Array.isArray(r)
                  ? ((t["$$" + e] = r[0]), (t[`$$${e}Data`] = r[1]))
                  : (t["$$" + e] = r);
              else if (Array.isArray(r)) {
                const s = r[0];
                t.addEventListener(e, (r[0] = (e) => s.call(t, r[1], e)));
              } else t.addEventListener(e, r);
            })(t, i, r, u),
            u) &&
            nt([i]))
        : "attr:" === e.slice(0, 5)
        ? it(t, e.slice(5), r)
        : (h = "prop:" === e.slice(0, 5)) ||
          (l = Z.has(e)) ||
          (!n &&
            ((c = (function (t, e) {
              return "object" == typeof (t = K[t]) ? (t[e] ? t.$ : void 0) : t;
            })(e, t.tagName)) ||
              (a = J.has(e)))) ||
          (o = t.nodeName.includes("-"))
        ? (h && ((e = e.slice(5)), (a = !0)),
          "class" === e || "className" === e
            ? ot(t, r)
            : !o || a || l
            ? (t[c || e] = r)
            : (t[
                (function (t) {
                  return t
                    .toLowerCase()
                    .replace(/-([a-z])/g, (t, e) => e.toUpperCase());
                })(e)
              ] = r))
        : (s = n && -1 < e.indexOf(":") && et[e.split(":")[0]])
        ? (function (t, e, r, s) {
            null == s ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, s);
          })(t, s, e, r)
        : it(t, X[e] || e, r),
      r);
}
function pt(t) {
  var e = "$$" + t.type;
  let r = (t.composedPath && t.composedPath()[0]) || t.target;
  for (
    t.target !== r &&
      Object.defineProperty(t, "target", { configurable: !0, value: r }),
      Object.defineProperty(t, "currentTarget", {
        configurable: !0,
        get: () => r || document,
      });
    r;

  ) {
    var s = r[e];
    if (s && !r.disabled) {
      var n = r[e + "Data"];
      if ((void 0 !== n ? s.call(r, n, t) : s.call(r, t), t.cancelBubble))
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function dt(t, e, r, s, n) {
  for (; "function" == typeof r; ) r = r();
  if (e !== r) {
    var i = typeof e,
      o = void 0 !== s;
    if (
      ((t = (o && r[0] && r[0].parentNode) || t),
      "string" == i || "number" == i)
    )
      if (("number" == i && (e = e.toString()), o)) {
        let n = r[0];
        n && 3 === n.nodeType ? (n.data = e) : (n = document.createTextNode(e)),
          (r = bt(t, r, s, n));
      } else
        r =
          "" !== r && "string" == typeof r
            ? (t.firstChild.data = e)
            : (t.textContent = e);
    else if (null == e || "boolean" == i) r = bt(t, r, s);
    else {
      if ("function" == i)
        return (
          A(() => {
            let n = e();
            for (; "function" == typeof n; ) n = n();
            r = dt(t, n, r, s);
          }),
          () => r
        );
      if (Array.isArray(e)) {
        const a = [];
        if (((i = r && Array.isArray(r)), ft(a, e, r, n)))
          return A(() => (r = dt(t, a, r, s, !0))), () => r;
        if (0 === a.length) {
          if (((r = bt(t, r, s)), o)) return r;
        } else
          i
            ? 0 === r.length
              ? gt(t, a, s)
              : (function (t, e, r) {
                  let s = r.length,
                    n = e.length,
                    i = s,
                    o = 0,
                    a = 0,
                    l = e[n - 1].nextSibling,
                    c = null;
                  for (; o < n || a < i; )
                    if (e[o] === r[a]) o++, a++;
                    else {
                      for (; e[n - 1] === r[i - 1]; ) n--, i--;
                      if (n === o)
                        for (
                          var h =
                            i < s ? (a ? r[a - 1].nextSibling : r[i - a]) : l;
                          a < i;

                        )
                          t.insertBefore(r[a++], h);
                      else if (i === a)
                        for (; o < n; )
                          (c && c.has(e[o])) || e[o].remove(), o++;
                      else if (e[o] === r[i - 1] && r[a] === e[n - 1]) {
                        var u = e[--n].nextSibling;
                        t.insertBefore(r[a++], e[o++].nextSibling),
                          t.insertBefore(r[--i], u),
                          (e[n] = r[i]);
                      } else {
                        if (!c) {
                          c = new Map();
                          let t = a;
                          for (; t < i; ) c.set(r[t], t++);
                        }
                        var p = c.get(e[o]);
                        if (null != p)
                          if (a < p && p < i) {
                            let s,
                              l = o,
                              h = 1;
                            for (
                              ;
                              ++l < n &&
                              l < i &&
                              null != (s = c.get(e[l])) &&
                              s === p + h;

                            )
                              h++;
                            if (h > p - a)
                              for (var d = e[o]; a < p; )
                                t.insertBefore(r[a++], d);
                            else t.replaceChild(r[a++], e[o++]);
                          } else o++;
                        else e[o++].remove();
                      }
                    }
                })(t, r, a)
            : (r && bt(t), gt(t, a));
        r = a;
      } else if (e instanceof Node) {
        if (Array.isArray(r)) {
          if (o) return (r = bt(t, r, s, e));
          bt(t, r, null, e);
        } else
          null != r && "" !== r && t.firstChild
            ? t.replaceChild(e, t.firstChild)
            : t.appendChild(e);
        r = e;
      } else console.warn("Unrecognized value. Skipped inserting", e);
    }
  }
  return r;
}
function ft(t, e, r, s) {
  let n = !1;
  for (let o = 0, a = e.length; o < a; o++) {
    let a = e[o],
      l = r && r[o];
    if (a instanceof Node) t.push(a);
    else if (null != a && !0 !== a && !1 !== a)
      if (Array.isArray(a)) n = ft(t, a, l) || n;
      else if ("function" == typeof a)
        if (s) {
          for (; "function" == typeof a; ) a = a();
          n =
            ft(t, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || n;
        } else t.push(a), (n = !0);
      else {
        var i = String(a);
        l && 3 === l.nodeType
          ? ((l.data = i), t.push(l))
          : t.push(document.createTextNode(i));
      }
  }
  return n;
}
function gt(t, e, r = null) {
  for (let s = 0, n = e.length; s < n; s++) t.insertBefore(e[s], r);
}
function bt(t, e, r, s) {
  if (void 0 === r) return (t.textContent = "");
  var n = s || document.createTextNode("");
  if (e.length) {
    let s = !1;
    for (let a = e.length - 1; 0 <= a; a--) {
      var i,
        o = e[a];
      n !== o
        ? ((i = o.parentNode === t),
          s || a
            ? i && o.remove()
            : i
            ? t.replaceChild(n, o)
            : t.insertBefore(n, r))
        : (s = !0);
    }
  } else t.insertBefore(n, r);
  return [n];
}
function mt(t) {
  return (e, r) => {
    const s = r.element;
    return v(
      (n) => {
        const i = (function (t) {
          var e = Object.keys(t),
            r = {};
          for (let s = 0; s < e.length; s++) {
            const [n, i] = x(t[e[s]]);
            Object.defineProperty(r, e[s], {
              get: n,
              set(t) {
                i(() => t);
              },
            });
          }
          return r;
        })(e);
        s.addPropertyChangedCallback((t, e) => (i[t] = e)),
          s.addReleaseCallback(() => {
            (s.renderRoot.textContent = ""), n();
          });
        var o = t(i, r);
        return ct(s.renderRoot, o);
      },
      (function (t) {
        if (t.assignedSlot && t.assignedSlot._$owner)
          return t.assignedSlot._$owner;
        let e = t.parentNode;
        for (
          ;
          e && !e._$owner && (!e.assignedSlot || !e.assignedSlot._$owner);

        )
          e = e.parentNode;
        return (e && e.assignedSlot ? e.assignedSlot : t)._$owner;
      })(s)
    );
  };
}
function yt(t, e, r) {
  return 2 === arguments.length && ((r = e), (e = {})), o(t, e)(mt(r));
}
const wt = {
  chatflowid: "",
  apiHost: void 0,
  chatflowConfig: void 0,
  theme: void 0,
};
var vt,
  xt,
  At =
    '/*! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none{pointer-events:none}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-\\[165px\\]{bottom:165px}.bottom-\\[56px\\]{bottom:56px}.bottom-\\[90px\\]{bottom:90px}.left-0{left:0}.left-\\[-26px\\]{left:-26px}.left-\\[44px\\]{left:44px}.left-auto{left:auto}.right-5{right:20px}.top-0{top:0}.top-\\[11px\\]{top:11px}.top-\\[29px\\]{top:29px}.z-10{z-index:10}.z-\\[20\\]{z-index:20}.my-2{margin-top:8px}.mb-2,.my-2{margin-bottom:8px}.mb-4{margin-bottom:16px}.ml-1{margin-left:4px}.ml-2{margin-left:8px}.mr-1{margin-right:4px}.mr-2{margin-right:8px}.mt-\\[53px\\]{margin-top:53px}.block{display:block}.flex{display:flex}.hidden{display:none}.h-10{height:40px}.h-11{height:44px}.h-2{height:8px}.h-32{height:128px}.h-6{height:24px}.h-\\[25px\\]{height:25px}.h-\\[38px\\]{height:38px}.h-\\[60px\\]{height:60px}.h-full{height:100%}.min-h-full{min-height:100%}.w-10{width:40px}.w-2{width:8px}.w-6{width:24px}.w-9{width:36px}.w-\\[25px\\]{width:25px}.w-\\[30px\\]{width:30px}.w-\\[60px\\]{width:60px}.w-full{width:100%}.min-w-full{min-width:100%}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}.cursor-pointer{cursor:pointer}.resize{resize:both}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-4{gap:16px}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-2xl{border-radius:16px}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.border{border-width:1px}.bg-\\[\\#60C8FA\\]{--tw-bg-opacity:1;background-color:rgb(96 200 250/var(--tw-bg-opacity))}.bg-\\[\\#FFF\\]{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.p-2{padding:8px}.p-4{padding:16px}.p-\\[2px\\]{padding:2px}.\\!py-0{padding-bottom:0!important;padding-top:0!important}.px-2{padding-left:8px;padding-right:8px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.\\!pl-\\[19px\\]{padding-left:19px!important}.\\!pr-0{padding-right:0!important}.text-left{text-align:left}.text-center{text-align:center}.text-\\[10px\\]{font-size:10px}.text-base{font-size:16px;line-height:24px}.text-lg{font-size:18px;line-height:28px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.text-xs{font-size:12px;line-height:16px}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.leading-\\[14px\\]{line-height:14px}.leading-\\[16\\.8px\\]{line-height:16.8px}.leading-\\[19\\.6px\\]{line-height:19.6px}.leading-\\[25\\.2px\\]{line-height:25.2px}.text-\\[\\#364954\\]{--tw-text-opacity:1;color:rgb(54 73 84/var(--tw-text-opacity))}.text-\\[\\#678AA1\\]{--tw-text-opacity:1;color:rgb(103 138 161/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--chatbot-container-bg-image:none;--chatbot-container-bg-color:transparent;--chatbot-container-font-family:"Open Sans";--chatbot-button-bg-color:#0042da;--chatbot-button-color:#fff;--chatbot-host-bubble-bg-color:#f7f8ff;--chatbot-host-bubble-color:#303235;--chatbot-guest-bubble-bg-color:#3b81f6;--chatbot-guest-bubble-color:#fff;--chatbot-input-bg-color:#fff;--chatbot-input-color:#303235;--chatbot-input-placeholder-color:#9095a0;--chatbot-header-bg-color:#fff;--chatbot-header-color:#303235;--chatbot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}a{color:#16bed7;font-weight:500}a:hover{text-decoration:underline}pre{word-wrap:break-word;font-size:13px;margin:5px;overflow:auto;padding:5px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;width:auto}.string{color:green}.number{color:#ff8c00}.boolean{color:blue}.null{color:#f0f}.key{color:#002b36}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--chatbot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(0)}50%{transform:translateY(-5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:#9095a0!important;opacity:1!important}.text-input::placeholder{color:#9095a0!important;opacity:1!important}.chatbot-container{background-color:var(--chatbot-container-bg-color);background-image:var(--chatbot-container-bg-image);font-family:Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.chatbot-button{background-color:#0042da;border:1px solid #0042da;border-radius:var(--chatbot-border-radius);color:var(--chatbot-button-color)}.chatbot-button.selectable{border:1px solid #0042da}.chatbot-button.selectable,.chatbot-host-bubble{background-color:#f7f8ff;color:var(--chatbot-host-bubble-color)}.chatbot-host-bubble>.bubble-typing{background-color:#f7f8ff;border:var(--chatbot-host-bubble-border);border-radius:6px}.chatbot-host-bubble iframe,.chatbot-host-bubble img,.chatbot-host-bubble video{border-radius:var(--chatbot-border-radius)}.chatbot-guest-bubble{background-color:#3b81f6;border-radius:6px;color:var(--chatbot-guest-bubble-color)}.chatbot-input{background-color:#fff;border-radius:var(--chatbot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1);color:#303235}.chatbot-input-error-message{color:#303235}.chatbot-button>.send-icon{fill:var(--chatbot-button-color)}.chatbot-chat-view{max-width:800px}.ping span{background-color:#0042da}.rating-icon-container svg{stroke:#0042da;fill:#f7f8ff;height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:#0042da}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{background-color:#0042da;border-radius:var(--chatbot-border-radius)}.total-files-indicator{background-color:#0042da;color:var(--chatbot-button-color);font-size:10px}.chatbot-upload-input{transition:border-color .1s ease-out}.chatbot-upload-input.dragging-over{border-color:#0042da}.secondary-button{background-color:#f7f8ff;border-radius:var(--chatbot-border-radius);color:var(--chatbot-host-bubble-color)}.chatbot-country-select{color:#303235}.chatbot-country-select,.chatbot-date-input{background-color:#fff;border-radius:var(--chatbot-border-radius)}.chatbot-date-input{color:#303235;color-scheme:light}.chatbot-popup-blocked-toast{border-radius:var(--chatbot-border-radius)}.messagelist{border-radius:.5rem;height:100%;overflow-y:scroll;width:100%}.messagelistloading{display:flex;justify-content:center;margin-top:1rem;width:100%}.usermessage{padding:1rem 1.5rem}.usermessagewaiting-light{background:linear-gradient(270deg,#ede7f6,#e3f2fd,#ede7f6);background-position:-100% 0;background-size:200% 200%}.usermessagewaiting-dark,.usermessagewaiting-light{animation:loading-gradient 2s ease-in-out infinite;animation-direction:alternate;animation-name:loading-gradient;padding:1rem 1.5rem}.usermessagewaiting-dark{background:linear-gradient(270deg,#2e2352,#1d3d60,#2e2352);background-position:-100% 0;background-size:200% 200%;color:#ececf1}@keyframes loading-gradient{0%{background-position:-100% 0}to{background-position:100% 0}}.apimessage{animation:fadein .5s;padding:1rem 1.5rem}@keyframes fadein{0%{opacity:0}to{opacity:1}}.apimessage,.usermessage,.usermessagewaiting{display:flex}.markdownanswer{line-height:1.75}.markdownanswer a:hover{opacity:.8}.markdownanswer a{color:#16bed7;font-weight:500}.markdownanswer code{color:#15cb19;font-weight:500;white-space:pre-wrap!important}.markdownanswer ol,.markdownanswer ul{margin:1rem}.boticon,.usericon{border-radius:1rem;margin-right:1rem}.markdownanswer h1,.markdownanswer h2,.markdownanswer h3{font-size:inherit}.center{flex-direction:column;padding:10px;position:relative}.center,.cloud{align-items:center;display:flex;justify-content:center}.cloud{border-radius:.5rem;height:calc(100% - 50px);width:400px}input{background-color:transparent;border:none;font-family:Poppins,sans-serif;padding:10px}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:brightness-75:active{--tw-brightness:brightness(.75);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}@media (min-width:768px){.md\\:mt-\\[74px\\]{margin-top:74px}.md\\:h-\\[59px\\]{height:59px}}';
const kt = st(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M26.2925 9.62331L27.3844 6.34766H29.2818L30.3737 9.62331L33.6493 10.7152V12.6126L30.3737 13.7045L29.2818 16.9801H27.3844L26.2925 13.7045L23.0169 12.6126V10.7152L26.2925 9.62331Z" fill="#FFFCFF"></path><path d="M29.9998 19.9972V31.6639H26.6664V19.9972H29.9998Z" fill="#FFFCFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2286 9.99722H17.7709L23.388 31.6639H19.9445L18.6482 26.6639H11.3512L10.0549 31.6639H6.61133L12.2286 9.99722ZM12.2154 23.3305H17.7841L15.1916 13.3306H14.8079L12.2154 23.3305Z" fill="#FFFCFF">'
  ),
  Ct = st(
    '<button part="button" class="fixed rounded-full transition-transform duration-200 flex justify-center items-center animate-fade-in w-[60px] h-[60px]"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'
  ),
  Et = st(
    '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Group"><g id="Group_2"><path id="Path" d="M14.2061 12.0451C14.32 12.159 14.32 12.3436 14.2061 12.4575C14.0922 12.5714 13.9075 12.5714 13.7936 12.4575C13.6797 12.3436 13.6797 12.159 13.7936 12.0451C13.9075 11.9312 14.0922 11.9312 14.2061 12.0451" stroke="#678AA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path id="Path_2" d="M18.8731 12.0451C18.987 12.159 18.987 12.3436 18.8731 12.4575C18.7592 12.5714 18.5745 12.5714 18.4606 12.4575C18.3467 12.3436 18.3467 12.159 18.4606 12.0451C18.5745 11.9312 18.7592 11.9312 18.8731 12.0451" stroke="#678AA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path id="Path_3" d="M9.53957 12.0451C9.65348 12.159 9.65348 12.3436 9.53957 12.4575C9.42567 12.5714 9.241 12.5714 9.12709 12.4575C9.01319 12.3436 9.01319 12.159 9.12709 12.0451C9.241 11.9312 9.42567 11.9312 9.53957 12.0451" stroke="#678AA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path id="Path_4" d="M14 24.5L9.33333 19.8345V19.8333H5.83333C4.54417 19.8333 3.5 18.7892 3.5 17.5V5.83333C3.5 4.54417 4.54417 3.5 5.83333 3.5H22.1667C23.4558 3.5 24.5 4.54417 24.5 5.83333V17.5C24.5 18.7892 23.4558 19.8333 22.1667 19.8333H18.6667L14 24.4988" stroke="#678AA1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
  ),
  St = st(
    '<div class="fixed rounded-full transition-transform duration-200 flex justify-center items-center animate-fade-in w-[25px] h-[25px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Messages, Chat/Messages, Chat"><g id="Group"><g id="Group_2"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M14 24.5L9.33333 19.8345V19.8333H5.83333C4.54417 19.8333 3.5 18.7892 3.5 17.5V5.83333C3.5 4.54417 4.54417 3.5 5.83333 3.5H22.1667C23.4558 3.5 24.5 4.54417 24.5 5.83333V17.5C24.5 18.7892 23.4558 19.8333 22.1667 19.8333H18.6667L14 24.4988" fill="#55BBEB"></path><path id="Path_2" d="M14.2061 12.0451C14.32 12.159 14.32 12.3436 14.2061 12.4575C14.0922 12.5714 13.9075 12.5714 13.7936 12.4575C13.6797 12.3436 13.6797 12.159 13.7936 12.0451C13.9075 11.9312 14.0922 11.9312 14.2061 12.0451" stroke="#E9F0F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path id="Path_3" d="M18.8731 12.0451C18.987 12.159 18.987 12.3436 18.8731 12.4575C18.7592 12.5714 18.5745 12.5714 18.4606 12.4575C18.3467 12.3436 18.3467 12.159 18.4606 12.0451C18.5745 11.9312 18.7592 11.9312 18.8731 12.0451" stroke="#E9F0F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path id="Path_4" d="M9.53957 12.0451C9.65348 12.159 9.65348 12.3436 9.53957 12.4575C9.42567 12.5714 9.241 12.5714 9.12709 12.4575C9.01319 12.3436 9.01319 12.159 9.12709 12.0451C9.241 11.9312 9.42567 11.9312 9.53957 12.0451" stroke="#E9F0F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></g></g></svg><div><span class="text-xs leading-[16.8px] font-medium absolute top-[29px] left-[-26px] whitespace-nowrap text-center text-[#678AA1]">'
  );
function Bt() {
  const [t, e] = x(window.location.pathname),
    r = setInterval(() => {
      window.location.pathname !== t() && e(window.location.pathname);
    }, 200);
  return B(() => clearInterval(r)), t;
}
const Pt = (t) => {
    const e = (function () {
        const [t, e] = x(0);
        function r() {
          e(
            (window?.visualViewport?.width || 0) / 4 +
              (window?.visualViewport?.width || 0) / 14 || 0
          );
        }
        return (
          window?.visualViewport?.addEventListener("resize", r),
          r(),
          B(() => {
            window?.visualViewport?.removeEventListener("resize", r);
          }),
          t
        );
      })(),
      r = Bt(),
      s = 2 === r().split("/").length;
    var n = r().split("/")[1];
    const i =
        "kk" === n
          ? "AI Көмекші"
          : "ru" === n
          ? "AI Помощник"
          : "ar" === n
          ? "AI مساعد"
          : "en" !== n && "ko" === n
          ? "AI 보조"
          : "AI Assistant",
      o = "ar" === n,
      a = "ko" === n,
      l = (function () {
        const [t, e] = x(0);
        function r() {
          e(
            (2 * (window?.visualViewport?.width || 0)) / 4 +
              (window?.visualViewport?.width || 0) / 10 || -7
          );
        }
        return (
          window?.visualViewport?.addEventListener("resize", r),
          r(),
          B(() => {
            window?.visualViewport?.removeEventListener("resize", r);
          }),
          t
        );
      })(),
      c = (function (t) {
        const [e, r] = x(window.matchMedia(t).matches);
        return (
          k(() => {
            const e = window.matchMedia(t),
              s = () => r(e.matches);
            e.addEventListener("change", s),
              B(() => {
                e.removeEventListener("change", s);
              });
          }),
          e
        );
      })("(min-width: 640px)");
    return (
      k(() => {
        const t = (t) => {};
        document.addEventListener("mousedown", t),
          B(() => {
            document.removeEventListener("mousedown", t);
          });
      }),
      C(
        (() => {
          const n = C(() => !!c());
          return () =>
            (n()
              ? () => {
                  const e = Ct(),
                    n = e.firstChild;
                  return (
                    (e.$$click = () => t.toggleBot()),
                    e.style.setProperty("z-index", "1201"),
                    e.style.setProperty(
                      "box-shadow",
                      "0 5px 4px 0 rgba(0, 0, 0, .26)"
                    ),
                    e.style.setProperty("border-radius", "34px 8px 34px 34px"),
                    null != (o ? "20px" : "96px")
                      ? e.style.setProperty("bottom", o ? "20px" : "96px")
                      : e.style.removeProperty("bottom"),
                    ct(
                      e,
                      W($, {
                        get when() {
                          return t.customIconSrc;
                        },
                        get children() {
                          const e = kt();
                          return (
                            A(() =>
                              it(
                                e,
                                "class",
                                "absolute duration-200 transition w-9 " +
                                  (t.isBotOpened
                                    ? "scale-0 -rotate-180 opacity-0"
                                    : "scale-100 rotate-0 opacity-100")
                              )
                            ),
                            e
                          );
                        },
                      }),
                      n
                    ),
                    n.style.setProperty("fill", "white"),
                    A(
                      (i) => {
                        var o = t.backgroundColor ?? "#3B81F6",
                          a = t.right ? t.right.toString() + "px" : "25px",
                          l =
                            s ||
                            r().includes("login") ||
                            r().includes("programs") ||
                            r().includes("assessment") ||
                            "student" !== localStorage.getItem("role")
                              ? "none"
                              : "",
                          c =
                            "absolute duration-200 transition w-9 " +
                            (t.isBotOpened
                              ? "scale-100 rotate-0 opacity-100"
                              : "scale-0 -rotate-180 opacity-0");
                        return (
                          o !== i._v$ &&
                            (null != (i._v$ = o)
                              ? e.style.setProperty("background-color", o)
                              : e.style.removeProperty("background-color")),
                          a !== i._v$2 &&
                            (null != (i._v$2 = a)
                              ? e.style.setProperty("right", a)
                              : e.style.removeProperty("right")),
                          l !== i._v$3 &&
                            (null != (i._v$3 = l)
                              ? e.style.setProperty("display", l)
                              : e.style.removeProperty("display")),
                          c !== i._v$4 && it(n, "class", (i._v$4 = c)),
                          i
                        );
                      },
                      { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
                    ),
                    e
                  );
                }
              : () => {
                  const n = St(),
                    c = n.firstChild,
                    h = c.nextSibling.firstChild;
                  return (
                    (n.$$click = () => t.toggleBot()),
                    n.style.setProperty("z-index", "1201"),
                    n.style.setProperty("bottom", "27px"),
                    n.style.setProperty("padding", "10px"),
                    ct(
                      n,
                      W($, {
                        get when() {
                          return t.customIconSrc;
                        },
                        get children() {
                          const e = Et();
                          return (
                            A(() =>
                              it(
                                e,
                                "class",
                                "absolute duration-200 transition w-[30px] " +
                                  (t.isBotOpened
                                    ? "scale-0 -rotate-180 opacity-0"
                                    : "scale-100 rotate-0 opacity-100")
                              )
                            ),
                            e
                          );
                        },
                      }),
                      c
                    ),
                    null != (o ? "11px" : a ? "15px" : "3px")
                      ? h.style.setProperty(
                          "margin-left",
                          o ? "11px" : a ? "15px" : "3px"
                        )
                      : h.style.removeProperty("margin-left"),
                    ct(h, i),
                    A(
                      (i) => {
                        var a = o ? l() + "px" : (t.right, e() + "px"),
                          u =
                            s ||
                            r().includes("login") ||
                            r().includes("programs") ||
                            r().includes("assessment") ||
                            "student" !== localStorage.getItem("role")
                              ? "none"
                              : "",
                          p =
                            "absolute duration-200 transition w-[30px] " +
                            (t.isBotOpened
                              ? "scale-100 rotate-0 opacity-100"
                              : "scale-0 -rotate-180 opacity-0"),
                          d = t.isBotOpened ? "#36A0D0" : "#678AA1";
                        return (
                          a !== i._v$5 &&
                            (null != (i._v$5 = a)
                              ? n.style.setProperty("right", a)
                              : n.style.removeProperty("right")),
                          u !== i._v$6 &&
                            (null != (i._v$6 = u)
                              ? n.style.setProperty("display", u)
                              : n.style.removeProperty("display")),
                          p !== i._v$7 && it(c, "class", (i._v$7 = p)),
                          d !== i._v$8 &&
                            (null != (i._v$8 = d)
                              ? h.style.setProperty("color", d)
                              : h.style.removeProperty("color")),
                          i
                        );
                      },
                      { _v$5: void 0, _v$6: void 0, _v$7: void 0, _v$8: void 0 }
                    ),
                    n
                  );
                })();
        })()
      )
    );
  },
  Rt = (nt(["click"]), (t) => null == t),
  Lt = (t) => null != t,
  _t = async (t) => {
    try {
      var e = document.cookie
          .split("; ")
          .find((t) => t.includes("idToken"))
          ?.split("="),
        r = document.cookie
          .split("; ")
          .find((t) => t.includes("token"))
          ?.split("="),
        s = e ? "Bearer " + e[1] : null,
        n = r ? "Bearer " + r[1] : null,
        i = "string" == typeof t ? t : t.url,
        o = await fetch(i, {
          method: "string" == typeof t ? "GET" : t.method,
          mode: "cors",
          headers:
            "string" != typeof t && Lt(t.body)
              ? {
                  "Content-Type": "application/json",
                  "X-API-KEY": s,
                  Authorization: n,
                }
              : { "X-API-KEY": s, Authorization: n },
          body:
            "string" != typeof t && Lt(t.body)
              ? JSON.stringify(t.body)
              : void 0,
        });
      let l;
      var a = o.headers.get("Content-Type");
      if (
        ((l =
          a && a.includes("application/json")
            ? await o.json()
            : await o.text()),
        o.ok)
      )
        return { data: l };
      {
        let t;
        throw (t =
          "object" == typeof l && "error" in l ? l.error : l || o.statusText);
      }
    } catch (t) {
      return console.error(t), { error: t };
    }
  },
  Tt = st(
    '<input class="focus:outline-none bg-transparent flex-1 w-full text-input !pl-[19px] !py-0 !pr-0" type="text">'
  ),
  Ot = (t) => {
    const [e, r] = Q(t, ["ref", "onInput"]);
    return (
      ((s = Tt()).$$input = (t) => e.onInput(t.currentTarget.value)),
      "function" == typeof (n = t.ref) ? lt(n, s) : (t.ref = s),
      at(
        s,
        U(
          {
            get style() {
              return { "font-size": t.fontSize ? t.fontSize + "px" : "16px" };
            },
          },
          r
        ),
        !1,
        !1
      ),
      s
    );
    var s, n;
  },
  It =
    (nt(["input"]),
    st(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'
    )),
  jt = (t) => {
    return (
      at(
        (e = It()),
        U(
          {
            get style() {
              return { fill: t.color ?? "#3B81F6" };
            },
          },
          t
        ),
        !0,
        !0
      ),
      e
    );
    var e;
  },
  Nt = st('<button type="submit">'),
  qt = st(
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"><g clip-path="url(#clip0_17403_105694)"><path d="M23.4377 12.4888C23.4384 12.7672 23.3647 13.0407 23.2243 13.2811C23.0838 13.5215 22.8817 13.7199 22.6388 13.856L6.2404 23.232C6.00508 23.3654 5.73941 23.436 5.46892 23.4371C5.21969 23.4357 4.97439 23.3748 4.75352 23.2593C4.53264 23.1439 4.34258 22.9773 4.19921 22.7734C4.05585 22.5695 3.96333 22.3343 3.92938 22.0874C3.89543 21.8405 3.92104 21.589 4.00407 21.354L6.64079 13.5464C6.66656 13.4701 6.7153 13.4036 6.78034 13.356C6.84537 13.3085 6.92352 13.2822 7.00407 13.2808H14.0627C14.1698 13.281 14.2758 13.2592 14.3741 13.2168C14.4724 13.1743 14.561 13.1121 14.6342 13.034C14.7075 12.9559 14.7639 12.8635 14.8 12.7627C14.8361 12.6618 14.851 12.5547 14.8439 12.4478C14.8262 12.2469 14.7332 12.0601 14.5837 11.9248C14.4341 11.7896 14.2389 11.7158 14.0373 11.7183H7.00603C6.9243 11.7183 6.84463 11.6927 6.77823 11.645C6.71184 11.5974 6.66206 11.5301 6.63591 11.4527L3.99919 3.64604C3.89424 3.34681 3.88282 3.02274 3.96644 2.71686C4.05006 2.41099 4.22477 2.1378 4.46735 1.93358C4.70993 1.72937 5.0089 1.60379 5.32455 1.57354C5.6402 1.54328 5.95759 1.60978 6.23454 1.7642L22.6408 11.1285C22.8823 11.2642 23.0834 11.4617 23.2234 11.7008C23.3634 11.9398 23.4374 12.2118 23.4377 12.4888Z" fill="#55BBEB"></path></g><defs><clipPath id="clip0_17403_105694"><rect width="25" height="25" fill="white">'
  ),
  Ht = (t) => {
    return (
      at(
        (e = Nt()),
        U(
          {
            get disabled() {
              return t.isDisabled || t.isLoading;
            },
          },
          t,
          {
            get class() {
              return (
                "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " +
                t.class
              );
            },
            style: { background: "transparent", border: "none" },
          }
        ),
        !1,
        !0
      ),
      ct(
        e,
        W($, {
          get when() {
            return !t.isLoading;
          },
          get fallback() {
            return W(Mt, { class: "text-white" });
          },
          get children() {
            return W(jt, {
              get color() {
                return t.sendButtonColor;
              },
              get class() {
                return "send-icon flex " + (t.disableIcon ? "hidden" : "");
              },
            });
          },
        })
      ),
      e
    );
    var e;
  },
  Mt = (t) => qt(),
  Ft = st("<span>Send"),
  zt = st(
    '<div class="flex items-end justify-between chatbot-input h-11 items-center" data-testid="input">'
  ),
  Wt = (t) => {
    const [e, r] = x(t.defaultValue ?? "");
    let s;
    const n = (t) => r(t),
      i = () => {
        "" !== e() && s?.reportValidity() && t.onSubmit(e()), r("");
      },
      o = (t) => {
        var e = t.isComposing || 229 === t.keyCode;
        "Enter" !== t.key || e || i();
      };
    {
      const r = zt();
      return (
        (r.$$keydown = o),
        r.style.setProperty("border-top", "1px solid #eeeeee"),
        r.style.setProperty("position", "absolute"),
        r.style.setProperty("left", "20px"),
        r.style.setProperty("right", "20px"),
        r.style.setProperty("bottom", "18px"),
        r.style.setProperty("margin", "auto"),
        r.style.setProperty("z-index", "1000"),
        r.style.setProperty("border-radius", "32px"),
        ct(
          r,
          W(Ot, {
            ref(t) {
              "function" == typeof s ? s(t) : (s = t);
            },
            onInput: n,
            get value() {
              return e();
            },
            get fontSize() {
              return t.fontSize;
            },
            get placeholder() {
              return t.placeholder ?? "Type your question";
            },
          }),
          null
        ),
        ct(
          r,
          W(Ht, {
            get sendButtonColor() {
              return t.sendButtonColor;
            },
            type: "button",
            get isDisabled() {
              return "" === e();
            },
            class: "my-2 ml-2",
            "on:click": i,
            get children() {
              var t = Ft();
              return (
                t.style.setProperty("font-family", "Poppins, sans-serif"), t
              );
            },
          }),
          null
        ),
        A(
          (e) => {
            var s = t.backgroundColor ?? "#ffffff",
              n = t.textColor ?? "#303235";
            return (
              s !== e._v$ &&
                (null != (e._v$ = s)
                  ? r.style.setProperty("background-color", s)
                  : r.style.removeProperty("background-color")),
              n !== e._v$2 &&
                (null != (e._v$2 = n)
                  ? r.style.setProperty("color", n)
                  : r.style.removeProperty("color")),
              e
            );
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        r
      );
    }
  },
  [Dt, Vt] = (nt(["keydown"]), x()),
  Gt = st(
    '<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">'
  ),
  Ut = () => {
    {
      const t = Gt(),
        e = t.firstChild;
      return (
        A(
          (r) => {
            var s =
                "flex justify-center items-center rounded-full text-white relative " +
                (Dt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
              n =
                "absolute top-0 left-0 " +
                (Dt() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
            return (
              s !== r._v$ && ot(t, (r._v$ = s)),
              n !== r._v$2 && it(e, "class", (r._v$2 = n)),
              r
            );
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        t
      );
    }
  },
  Qt = st(
    '<figure><div class="flex justify-center items-center rounded-full text-white relative flex-shrink-0 bg-[#60C8FA] p-[2px] "><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none"><path d="M18.7517 7.49055L19.4895 5.27734H20.7714L21.5092 7.49055L23.7224 8.22828V9.51024L21.5092 10.248L20.7714 12.4612H19.4895L18.7517 10.248L16.5385 9.51024V8.22828L18.7517 7.49055Z" fill="#FFFCFF"></path><path d="M21.2565 14.4997V22.3823H19.0044V14.4997H21.2565Z" fill="#FFFCFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.24943 7.74318H12.9941L16.7893 22.3823H14.4627L13.5869 19.004H8.65658L7.78073 22.3823H5.4541L9.24943 7.74318ZM9.24047 16.7519H13.003L11.2513 9.99535H10.9922L9.24047 16.7519Z" fill="#FFFCFF">'
  ),
  Yt = (t) => {
    const [e, r] = x(t.initialAvatarSrc);
    return (
      k(() => {
        e()?.startsWith("{{") &&
          t.initialAvatarSrc?.startsWith("http") &&
          r(t.initialAvatarSrc);
      }),
      W($, {
        get when() {
          return ((t) => null != t && "" !== t)(e());
        },
        keyed: !0,
        get fallback() {
          return W(Ut, {});
        },
        get children() {
          const t = Qt();
          return (
            A(() =>
              ot(
                t,
                "flex justify-center items-center rounded-full text-white relative flex-shrink-0 bg-[#FFF] " +
                  (Dt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl")
              )
            ),
            t
          );
        },
      })
    );
  };
class $t {
  source;
  flags;
  constructor(t, e = "") {
    (this.source = t.source), (this.flags = e);
  }
  setGroup(t, e) {
    let r = "string" == typeof e ? e : e.source;
    return (
      (r = r.replace(/(^|[^\[])\^/g, "$1")),
      (this.source = this.source.replace(t, r)),
      this
    );
  }
  getRegexp() {
    return new RegExp(this.source, this.flags);
  }
}
const Jt = /[&<>"']/,
  Zt = /[&<>"']/g,
  Xt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  Kt = /[<>"']|&(?!#?\w+;)/,
  te = /[<>"']|&(?!#?\w+;)/g;
function ee(t, e) {
  if (e) {
    if (Jt.test(t)) return t.replace(Zt, (t) => Xt[t]);
  } else if (Kt.test(t)) return t.replace(te, (t) => Xt[t]);
  return t;
}
function re(t) {
  return t.replace(
    /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
    function (t, e) {
      return "colon" === (e = e.toLowerCase())
        ? ":"
        : "#" === e.charAt(0)
        ? "x" === e.charAt(1)
          ? String.fromCharCode(parseInt(e.substring(2), 16))
          : String.fromCharCode(+e.substring(1))
        : "";
    }
  );
}
var se;
((se = vt = vt || {})[(se.space = 1)] = "space"),
  (se[(se.text = 2)] = "text"),
  (se[(se.paragraph = 3)] = "paragraph"),
  (se[(se.heading = 4)] = "heading"),
  (se[(se.listStart = 5)] = "listStart"),
  (se[(se.listEnd = 6)] = "listEnd"),
  (se[(se.looseItemStart = 7)] = "looseItemStart"),
  (se[(se.looseItemEnd = 8)] = "looseItemEnd"),
  (se[(se.listItemStart = 9)] = "listItemStart"),
  (se[(se.listItemEnd = 10)] = "listItemEnd"),
  (se[(se.blockquoteStart = 11)] = "blockquoteStart"),
  (se[(se.blockquoteEnd = 12)] = "blockquoteEnd"),
  (se[(se.code = 13)] = "code"),
  (se[(se.table = 14)] = "table"),
  (se[(se.html = 15)] = "html"),
  (se[(se.hr = 16)] = "hr");
class ne {
  gfm = !0;
  tables = !0;
  breaks = !1;
  pedantic = !1;
  sanitize = !1;
  sanitizer;
  mangle = !0;
  smartLists = !1;
  silent = !1;
  highlight;
  langPrefix = "lang-";
  smartypants = !1;
  headerPrefix = "";
  renderer;
  xhtml = !1;
  escape = ee;
  unescape = re;
  isNoP;
}
class ie {
  options;
  constructor(t) {
    this.options = t || le.options;
  }
  code(t, e, r, s) {
    this.options.highlight &&
      null != (n = this.options.highlight(t, e)) &&
      n !== t &&
      ((r = !0), (t = n));
    var n = r ? t : this.options.escape(t, !0);
    return e
      ? `\n<pre><code class="${
          this.options.langPrefix + this.options.escape(e, !0)
        }">${n}\n</code></pre>\n`
      : `\n<pre><code>${n}\n</code></pre>\n`;
  }
  blockquote(t) {
    return `<blockquote>\n${t}</blockquote>\n`;
  }
  html(t) {
    return t;
  }
  heading(t, e, r) {
    return `<h${e} id="${
      this.options.headerPrefix + r.toLowerCase().replace(/[^\w]+/g, "-")
    }">${t}</h${e}>\n`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(t, e) {
    return `\n<${(e = e ? "ol" : "ul")}>\n${t}</${e}>\n`;
  }
  listitem(t) {
    return "<li>" + t + "</li>\n";
  }
  paragraph(t) {
    return "<p>" + t + "</p>\n";
  }
  table(t, e) {
    return `\n<table>\n<thead>\n${t}</thead>\n<tbody>\n${e}</tbody>\n</table>\n`;
  }
  tablerow(t) {
    return "<tr>\n" + t + "</tr>\n";
  }
  tablecell(t, e) {
    var r = e.header ? "th" : "td";
    return (
      (e.align
        ? "<" + r + ' style="text-align:' + e.align + '">'
        : "<" + r + ">") +
      t +
      "</" +
      r +
      ">\n"
    );
  }
  strong(t) {
    return "<strong>" + t + "</strong>";
  }
  em(t) {
    return "<em>" + t + "</em>";
  }
  codespan(t) {
    return "<code>" + t + "</code>";
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(t) {
    return "<del>" + t + "</del>";
  }
  link(t, e, r) {
    if (this.options.sanitize) {
      let s;
      try {
        s = decodeURIComponent(this.options.unescape(t))
          .replace(/[^\w:]/g, "")
          .toLowerCase();
      } catch (e) {
        return r;
      }
      if (
        0 === s.indexOf("javascript:") ||
        0 === s.indexOf("vbscript:") ||
        0 === s.indexOf("data:")
      )
        return r;
    }
    let s = '<a href="' + t + '"';
    return e && (s += ' title="' + e + '"'), s + ">" + r + "</a>";
  }
  image(t, e, r) {
    let s = '<img src="' + t + '" alt="' + r + '"';
    return (
      e && (s += ' title="' + e + '"'), s + (this.options.xhtml ? "/>" : ">")
    );
  }
  text(t) {
    return t;
  }
}
class oe {
  staticThis;
  links;
  options;
  static rulesBase = null;
  static rulesPedantic = null;
  static rulesGfm = null;
  static rulesBreaks = null;
  rules;
  renderer;
  inLink;
  hasRulesGfm;
  ruleCallbacks;
  constructor(t, e, r = le.options, s) {
    if (
      ((this.staticThis = t),
      (this.links = e),
      (this.options = r),
      (this.renderer = s || this.options.renderer || new ie(this.options)),
      !this.links)
    )
      throw new Error("InlineLexer requires 'links' parameter.");
    this.setRules();
  }
  static output(t, e, r) {
    return new this(this, e, r).output(t);
  }
  static getRulesBase() {
    var t;
    return (
      this.rulesBase ||
      (((t = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
        _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
        _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,
      }).link = new $t(t.link)
        .setGroup("inside", t._inside)
        .setGroup("href", t._href)
        .getRegexp()),
      (t.reflink = new $t(t.reflink).setGroup("inside", t._inside).getRegexp()),
      (this.rulesBase = t))
    );
  }
  static getRulesPedantic() {
    return (
      this.rulesPedantic ||
      (this.rulesPedantic = {
        ...this.getRulesBase(),
        strong:
          /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
      })
    );
  }
  static getRulesGfm() {
    var t, e, r;
    return (
      this.rulesGfm ||
      ((t = this.getRulesBase()),
      (e = new $t(t.escape).setGroup("])", "~|])").getRegexp()),
      (r = new $t(t.text)
        .setGroup("]|", "~]|")
        .setGroup("|", "|https?://|")
        .getRegexp()),
      (this.rulesGfm = {
        ...t,
        escape: e,
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: r,
      }))
    );
  }
  static getRulesBreaks() {
    var t, e;
    return (
      this.rulesBreaks ||
      ((t = this.getRulesGfm()),
      (e = this.getRulesGfm()),
      (this.rulesBreaks = {
        ...e,
        br: new $t(t.br).setGroup("{2,}", "*").getRegexp(),
        text: new $t(e.text).setGroup("{2,}", "*").getRegexp(),
      }))
    );
  }
  setRules() {
    this.options.gfm
      ? this.options.breaks
        ? (this.rules = this.staticThis.getRulesBreaks())
        : (this.rules = this.staticThis.getRulesGfm())
      : this.options.pedantic
      ? (this.rules = this.staticThis.getRulesPedantic())
      : (this.rules = this.staticThis.getRulesBase()),
      (this.hasRulesGfm = void 0 !== this.rules.url);
  }
  output(t) {
    let e,
      r = "";
    for (; t; )
      if ((e = this.rules.escape.exec(t)))
        (t = t.substring(e[0].length)), (r += e[1]);
      else if ((e = this.rules.autolink.exec(t))) {
        let s, n;
        (t = t.substring(e[0].length)),
          (n =
            "@" === e[2]
              ? ((s = this.options.escape(
                  ":" === e[1].charAt(6)
                    ? this.mangle(e[1].substring(7))
                    : this.mangle(e[1])
                )),
                this.mangle("mailto:") + s)
              : (s = this.options.escape(e[1]))),
          (r += this.renderer.link(n, null, s));
      } else if (
        !this.inLink &&
        this.hasRulesGfm &&
        (e = this.rules.url.exec(t))
      ) {
        t = t.substring(e[0].length);
        var s = this.options.escape(e[1]);
        r += this.renderer.link(s, null, s);
      } else if ((e = this.rules.tag.exec(t)))
        !this.inLink && /^<a /i.test(e[0])
          ? (this.inLink = !0)
          : this.inLink && /^<\/a>/i.test(e[0]) && (this.inLink = !1),
          (t = t.substring(e[0].length)),
          (r += this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(e[0])
              : this.options.escape(e[0])
            : e[0]);
      else if ((e = this.rules.link.exec(t)))
        (t = t.substring(e[0].length)),
          (this.inLink = !0),
          (r += this.outputLink(e, { href: e[2], title: e[3] })),
          (this.inLink = !1);
      else if (
        (e = (e = this.rules.reflink.exec(t)) || this.rules.nolink.exec(t))
      ) {
        t = t.substring(e[0].length);
        s = (e[2] || e[1]).replace(/\s+/g, " ");
        var n = this.links[s.toLowerCase()];
        n && n.href
          ? ((this.inLink = !0),
            (r += this.outputLink(e, n)),
            (this.inLink = !1))
          : ((r += e[0].charAt(0)), (t = e[0].substring(1) + t));
      } else if ((e = this.rules.strong.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.strong(this.output(e[2] || e[1])));
      else if ((e = this.rules.em.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.em(this.output(e[2] || e[1])));
      else if ((e = this.rules.code.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.codespan(this.options.escape(e[2].trim(), !0)));
      else if ((e = this.rules.br.exec(t)))
        (t = t.substring(e[0].length)), (r += this.renderer.br());
      else if (this.hasRulesGfm && (e = this.rules.del.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.del(this.output(e[1])));
      else if ((e = this.rules.text.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.text(
            this.options.escape(this.smartypants(e[0]))
          ));
      else if (t) throw new Error("Infinite loop on byte: " + t.charCodeAt(0));
    return r;
  }
  outputLink(t, e) {
    var r = this.options.escape(e.href);
    e = e.title ? this.options.escape(e.title) : null;
    return "!" !== t[0].charAt(0)
      ? this.renderer.link(r, e, this.output(t[1]))
      : this.renderer.image(r, e, this.options.escape(t[1]));
  }
  smartypants(t) {
    return this.options.smartypants
      ? t
          .replace(/---/g, "—")
          .replace(/--/g, "–")
          .replace(/(^|[-\u2014/([{"\s])'/g, "$1‘")
          .replace(/'/g, "’")
          .replace(/(^|[-\u2014/([{\u2018\s])"/g, "$1“")
          .replace(/"/g, "”")
          .replace(/\.{3}/g, "…")
      : t;
  }
  mangle(t) {
    if (!this.options.mangle) return t;
    let e = "";
    var r = t.length;
    for (let s = 0; s < r; s++) {
      let r;
      0.5 < Math.random() && (r = "x" + t.charCodeAt(s).toString(16)),
        (e += "&#" + r + ";");
    }
    return e;
  }
}
class ae {
  simpleRenderers = [];
  tokens;
  token;
  inlineLexer;
  options;
  renderer;
  line = 0;
  constructor(t) {
    (this.tokens = []),
      (this.token = null),
      (this.options = t || le.options),
      (this.renderer = this.options.renderer || new ie(this.options));
  }
  static parse(t, e, r) {
    return new this(r).parse(e, t);
  }
  parse(t, e) {
    (this.inlineLexer = new oe(oe, t, this.options, this.renderer)),
      (this.tokens = e.reverse());
    let r = "";
    for (; this.next(); ) r += this.tok();
    return r;
  }
  debug(t, e) {
    (this.inlineLexer = new oe(oe, t, this.options, this.renderer)),
      (this.tokens = e.reverse());
    let r = "";
    for (; this.next(); ) {
      var s = this.tok();
      (this.token.line = this.line += s.split("\n").length - 1), (r += s);
    }
    return r;
  }
  next() {
    return (this.token = this.tokens.pop());
  }
  getNextElement() {
    return this.tokens[this.tokens.length - 1];
  }
  parseText() {
    let t = this.token.text;
    for (var e; (e = this.getNextElement()) && e.type == vt.text; )
      t += "\n" + this.next().text;
    return this.inlineLexer.output(t);
  }
  tok() {
    switch (this.token.type) {
      case vt.space:
        return "";
      case vt.paragraph:
        return this.renderer.paragraph(
          this.inlineLexer.output(this.token.text)
        );
      case vt.text:
        return this.options.isNoP
          ? this.parseText()
          : this.renderer.paragraph(this.parseText());
      case vt.heading:
        return this.renderer.heading(
          this.inlineLexer.output(this.token.text),
          this.token.depth,
          this.token.text
        );
      case vt.listStart: {
        let e = "";
        for (var t = this.token.ordered; this.next().type != vt.listEnd; )
          e += this.tok();
        return this.renderer.list(e, t);
      }
      case vt.listItemStart: {
        let t = "";
        for (; this.next().type != vt.listItemEnd; )
          t += this.token.type == vt.text ? this.parseText() : this.tok();
        return this.renderer.listitem(t);
      }
      case vt.looseItemStart: {
        let t = "";
        for (; this.next().type != vt.listItemEnd; ) t += this.tok();
        return this.renderer.listitem(t);
      }
      case vt.code:
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped,
          this.token.meta
        );
      case vt.table: {
        t = "";
        let s,
          n = "";
        s = "";
        for (let t = 0; t < this.token.header.length; t++) {
          var e = { header: !0, align: this.token.align[t] },
            r = this.inlineLexer.output(this.token.header[t]);
          s += this.renderer.tablecell(r, e);
        }
        t += this.renderer.tablerow(s);
        for (const t of this.token.cells) {
          s = "";
          for (let e = 0; e < t.length; e++)
            s += this.renderer.tablecell(this.inlineLexer.output(t[e]), {
              header: !1,
              align: this.token.align[e],
            });
          n += this.renderer.tablerow(s);
        }
        return this.renderer.table(t, n);
      }
      case vt.blockquoteStart: {
        let t = "";
        for (; this.next().type != vt.blockquoteEnd; ) t += this.tok();
        return this.renderer.blockquote(t);
      }
      case vt.hr:
        return this.renderer.hr();
      case vt.html:
        return (
          (t =
            this.token.pre || this.options.pedantic
              ? this.token.text
              : this.inlineLexer.output(this.token.text)),
          this.renderer.html(t)
        );
      default:
        if (this.simpleRenderers.length)
          for (let t = 0; t < this.simpleRenderers.length; t++)
            if (this.token.type == "simpleRule" + (t + 1))
              return this.simpleRenderers[t].call(
                this.renderer,
                this.token.execArr
              );
        if (
          ((t = `Token with "${this.token.type}" type was not found.`),
          !this.options.silent)
        )
          throw new Error(t);
        console.log(t);
    }
  }
}
class le {
  static options = new ne();
  static simpleRenderers = [];
  static setOptions(t) {
    return Object.assign(this.options, t), this;
  }
  static setBlockRule(t, e = () => "") {
    return ce.simpleRules.push(t), this.simpleRenderers.push(e), this;
  }
  static parse(t, e) {
    try {
      e = { ...this.options, ...e };
      var { tokens: r, links: s } = this.callBlockLexer(t, e);
      return this.callParser(r, s, e);
    } catch (t) {
      return this.callMe(t);
    }
  }
  static debug(t, e = this.options) {
    var { tokens: t, links: r } = this.callBlockLexer(t, e);
    let s = t.slice();
    return (
      ((e = new ae(e)).simpleRenderers = this.simpleRenderers),
      (e = e.debug(r, t)),
      {
        tokens: (s = s.map((t) => {
          t.type = vt[t.type] || t.type;
          var e = t.line;
          return delete t.line, e ? { line: e, ...t } : t;
        })),
        links: r,
        result: e,
      }
    );
  }
  static callBlockLexer(t = "", e) {
    if ("string" != typeof t)
      throw new Error(
        `Expected that the 'src' parameter would have a 'string' type, got '${typeof t}'`
      );
    return (
      (t = t
        .replace(/\r\n|\r/g, "\n")
        .replace(/\t/g, "    ")
        .replace(/\u00a0/g, " ")
        .replace(/\u2424/g, "\n")
        .replace(/^ +$/gm, "")),
      ce.lex(t, e, !0)
    );
  }
  static callParser(t, e, r) {
    var s;
    return this.simpleRenderers.length
      ? (((s = new ae(r)).simpleRenderers = this.simpleRenderers),
        s.parse(e, t))
      : ae.parse(t, e, r);
  }
  static callMe(t) {
    if (
      ((t.message +=
        "\nPlease report this to https://github.com/ts-stack/markdown"),
      this.options.silent)
    )
      return (
        "<p>An error occured:</p><pre>" +
        this.options.escape(t.message + "", !0) +
        "</pre>"
      );
    throw t;
  }
}
class ce {
  staticThis;
  static simpleRules = [];
  static rulesBase = null;
  static rulesGfm = null;
  static rulesTables = null;
  rules;
  options;
  links = {};
  tokens = [];
  hasRulesGfm;
  hasRulesTables;
  constructor(t, e) {
    (this.staticThis = t), (this.options = e || le.options), this.setRules();
  }
  static lex(t, e, r, s) {
    return new this(this, e).getTokens(t, r, s);
  }
  static getRulesBase() {
    var t, e;
    return (
      this.rulesBase ||
      (((t = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        paragraph:
          /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/,
        bullet: /(?:[*+-]|\d+\.)/,
        item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,
      }).item = new $t(t.item, "gm").setGroup(/bull/g, t.bullet).getRegexp()),
      (t.list = new $t(t.list)
        .setGroup(/bull/g, t.bullet)
        .setGroup("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")
        .setGroup("def", "\\n+(?=" + t.def.source + ")")
        .getRegexp()),
      (e =
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b"),
      (t.html = new $t(t.html)
        .setGroup("comment", /<!--[\s\S]*?-->/)
        .setGroup("closed", /<(tag)[\s\S]+?<\/\1>/)
        .setGroup("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
        .setGroup(/tag/g, e)
        .getRegexp()),
      (t.paragraph = new $t(t.paragraph)
        .setGroup("hr", t.hr)
        .setGroup("heading", t.heading)
        .setGroup("lheading", t.lheading)
        .setGroup("blockquote", t.blockquote)
        .setGroup("tag", "<" + e)
        .setGroup("def", t.def)
        .getRegexp()),
      (this.rulesBase = t))
    );
  }
  static getRulesGfm() {
    var t, e, r, s;
    return (
      this.rulesGfm ||
      ((r = (e = {
        ...(t = this.getRulesBase()),
        fences:
          /^ *(`{3,}|~{3,})[ \.]*((\S+)? *[^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/,
        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/,
      }).fences.source.replace("\\1", "\\2")),
      (s = t.list.source.replace("\\1", "\\3")),
      (e.paragraph = new $t(t.paragraph)
        .setGroup("(?!", `(?!${r}|${s}|`)
        .getRegexp()),
      (this.rulesGfm = e))
    );
  }
  static getRulesTable() {
    return (
      this.rulesTables ||
      (this.rulesTables = {
        ...this.getRulesGfm(),
        nptable:
          /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
      })
    );
  }
  setRules() {
    this.options.gfm
      ? this.options.tables
        ? (this.rules = this.staticThis.getRulesTable())
        : (this.rules = this.staticThis.getRulesGfm())
      : (this.rules = this.staticThis.getRulesBase()),
      (this.hasRulesGfm = void 0 !== this.rules.fences),
      (this.hasRulesTables = void 0 !== this.rules.table);
  }
  getTokens(t, e, r) {
    let s,
      n = t;
    t: for (; n; )
      if (
        ((s = this.rules.newline.exec(n)) &&
          ((n = n.substring(s[0].length)), 1 < s[0].length) &&
          this.tokens.push({ type: vt.space }),
        (s = this.rules.code.exec(n)))
      ) {
        n = n.substring(s[0].length);
        var i = s[0].replace(/^ {4}/gm, "");
        this.tokens.push({
          type: vt.code,
          text: this.options.pedantic ? i : i.replace(/\n+$/, ""),
        });
      } else if (this.hasRulesGfm && (s = this.rules.fences.exec(n)))
        (n = n.substring(s[0].length)),
          this.tokens.push({
            type: vt.code,
            meta: s[2],
            lang: s[3],
            text: s[4] || "",
          });
      else if ((s = this.rules.heading.exec(n)))
        (n = n.substring(s[0].length)),
          this.tokens.push({
            type: vt.heading,
            depth: s[1].length,
            text: s[2],
          });
      else if (e && this.hasRulesTables && (s = this.rules.nptable.exec(n))) {
        n = n.substring(s[0].length);
        var o = {
          type: vt.table,
          header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
          align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: [],
        };
        for (let t = 0; t < o.align.length; t++)
          /^ *-+: *$/.test(o.align[t])
            ? (o.align[t] = "right")
            : /^ *:-+: *$/.test(o.align[t])
            ? (o.align[t] = "center")
            : /^ *:-+ *$/.test(o.align[t])
            ? (o.align[t] = "left")
            : (o.align[t] = null);
        var a = s[3].replace(/\n$/, "").split("\n");
        for (let t = 0; t < a.length; t++) o.cells[t] = a[t].split(/ *\| */);
        this.tokens.push(o);
      } else if ((s = this.rules.lheading.exec(n)))
        (n = n.substring(s[0].length)),
          this.tokens.push({
            type: vt.heading,
            depth: "=" === s[2] ? 1 : 2,
            text: s[1],
          });
      else if ((s = this.rules.hr.exec(n)))
        (n = n.substring(s[0].length)), this.tokens.push({ type: vt.hr });
      else if ((s = this.rules.blockquote.exec(n)))
        (n = n.substring(s[0].length)),
          this.tokens.push({ type: vt.blockquoteStart }),
          (i = s[0].replace(/^ *> ?/gm, "")),
          this.getTokens(i),
          this.tokens.push({ type: vt.blockquoteEnd });
      else if ((s = this.rules.list.exec(n))) {
        n = n.substring(s[0].length);
        var l,
          c = s[2],
          h =
            (this.tokens.push({ type: vt.listStart, ordered: 1 < c.length }),
            s[0].match(this.rules.item)),
          u = h.length;
        let t,
          e = !1;
        for (let s = 0; s < u; s++) {
          let i = h[s];
          (l = i.length),
            -1 !== (i = i.replace(/^ *([*+-]|\d+\.) +/, "")).indexOf("\n ") &&
              ((l -= i.length),
              (i = this.options.pedantic
                ? i.replace(/^ {1,4}/gm, "")
                : i.replace(new RegExp("^ {1," + l + "}", "gm"), ""))),
            !this.options.smartLists ||
              s === u - 1 ||
              c ===
                (l = this.staticThis.getRulesBase().bullet.exec(h[s + 1])[0]) ||
              (1 < c.length && 1 < l.length) ||
              ((n = h.slice(s + 1).join("\n") + n), (s = u - 1)),
            (t = e || /\n\n(?!\s*$)/.test(i)),
            s !== u - 1 &&
              ((e = "\n" === i.charAt(i.length - 1)), (t = t || e)),
            this.tokens.push({
              type: t ? vt.looseItemStart : vt.listItemStart,
            }),
            this.getTokens(i, !1, r),
            this.tokens.push({ type: vt.listItemEnd });
        }
        this.tokens.push({ type: vt.listEnd });
      } else if ((s = this.rules.html.exec(n))) {
        n = n.substring(s[0].length);
        var p = s[1];
        this.tokens.push({
          type: this.options.sanitize ? vt.paragraph : vt.html,
          pre:
            !this.options.sanitizer &&
            ("pre" === p || "script" === p || "style" === p),
          text: s[0],
        });
      } else if (e && (s = this.rules.def.exec(n)))
        (n = n.substring(s[0].length)),
          (this.links[s[1].toLowerCase()] = { href: s[2], title: s[3] });
      else if (e && this.hasRulesTables && (s = this.rules.table.exec(n))) {
        n = n.substring(s[0].length);
        var d = {
          type: vt.table,
          header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
          align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          cells: [],
        };
        for (let t = 0; t < d.align.length; t++)
          /^ *-+: *$/.test(d.align[t])
            ? (d.align[t] = "right")
            : /^ *:-+: *$/.test(d.align[t])
            ? (d.align[t] = "center")
            : /^ *:-+ *$/.test(d.align[t])
            ? (d.align[t] = "left")
            : (d.align[t] = null);
        var f = s[3].replace(/(?: *\| *)?\n$/, "").split("\n");
        for (let t = 0; t < f.length; t++)
          d.cells[t] = f[t].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
        this.tokens.push(d);
      } else {
        if (this.staticThis.simpleRules.length) {
          var g = this.staticThis.simpleRules;
          for (let t = 0; t < g.length; t++)
            if ((s = g[t].exec(n))) {
              n = n.substring(s[0].length);
              var b = "simpleRule" + (t + 1);
              this.tokens.push({ type: b, execArr: s });
              continue t;
            }
        }
        if (e && (s = this.rules.paragraph.exec(n)))
          (n = n.substring(s[0].length)),
            "\n" === s[1].slice(-1)
              ? this.tokens.push({
                  type: vt.paragraph,
                  text: s[1].slice(0, -1),
                })
              : this.tokens.push({
                  type: 0 < this.tokens.length ? vt.paragraph : vt.text,
                  text: s[1],
                });
        else if ((s = this.rules.text.exec(n)))
          (n = n.substring(s[0].length)),
            this.tokens.push({ type: vt.text, text: s[0] });
        else if (n)
          throw new Error(
            "Infinite loop on byte: " +
              n.charCodeAt(0) +
              `, near text '${n.slice(0, 30)}...'`
          );
      }
    return { tokens: this.tokens, links: this.links };
  }
}
const he = st(
    '<div class="flex justify-end mb-2 items-end guest-container"><span class="p-2 mr-2 whitespace-pre-wrap max-w-full chatbot-guest-bubble text-sm leading-[19.6px] font-medium" data-testid="guest-bubble">'
  ),
  ue =
    (le.setOptions({ isNoP: !0 }),
    (t) => {
      let e;
      S(() => {
        e && (e.innerHTML = le.parse(t.message));
      });
      {
        const r = he(),
          s = r.firstChild;
        r.style.setProperty("margin-left", "50px");
        return (
          "function" == typeof e ? lt(e, s) : (e = s),
          s.style.setProperty("border-radius", "16px"),
          ct(
            r,
            W($, {
              get when() {
                return t.showAvatar;
              },
              get children() {
                return W(Yt, {
                  get initialAvatarSrc() {
                    return t.avatarSrc;
                  },
                });
              },
            }),
            null
          ),
          A(
            (e) => {
              var r = t.backgroundColor ?? "#3B81F6",
                n = t.textColor ?? "#ffffff";
              return (
                r !== e._v$ &&
                  (null != (e._v$ = r)
                    ? s.style.setProperty("background-color", r)
                    : s.style.removeProperty("background-color")),
                n !== e._v$2 &&
                  (null != (e._v$2 = n)
                    ? s.style.setProperty("color", n)
                    : s.style.removeProperty("color")),
                e
              );
            },
            { _v$: void 0, _v$2: void 0 }
          ),
          r
        );
      }
    }),
  pe = st(
    '<div class="flex justify-start mb-2 items-start host-container relative"><span class="p-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble"></span><svg class="absolute top-[11px] left-[44px]" xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none"><path d="M9.99992 0L4.99992 14.5C4.99992 14.5 2.99992 12 1.49992 11L0.0389565 10.026C0.0131224 10.0088 0.0135369 9.99312 0.0399678 9.97683C0.256155 9.84353 1.39303 9.05073 4.49992 5.5C7.99992 1.5 9.99992 0 9.99992 0Z" fill="white">'
  ),
  de =
    (le.setOptions({ isNoP: !0 }),
    (t) => {
      let e;
      S(() => {
        e && (e.innerHTML = le.parse(t.message));
      });
      {
        const r = pe(),
          s = r.firstChild;
        r.style.setProperty("margin-right", "50px"),
          ct(
            r,
            W($, {
              get when() {
                return t.showAvatar;
              },
              get children() {
                return W(Yt, {
                  get initialAvatarSrc() {
                    return t.avatarSrc;
                  },
                });
              },
            }),
            s
          );
        return (
          "function" == typeof e ? lt(e, s) : (e = s),
          s.style.setProperty("border-radius", "16px"),
          A(
            (e) => {
              var r = t.backgroundColor ?? "#f7f8ff",
                n = t.textColor ?? "#303235";
              return (
                r !== e._v$ &&
                  (null != (e._v$ = r)
                    ? s.style.setProperty("background-color", r)
                    : s.style.removeProperty("background-color")),
                n !== e._v$2 &&
                  (null != (e._v$2 = n)
                    ? s.style.setProperty("color", n)
                    : s.style.removeProperty("color")),
                e
              );
            },
            { _v$: void 0, _v$2: void 0 }
          ),
          r
        );
      }
    }),
  fe = st(
    '<div class="flex justify-start items-center items-start animate-fade-in host-container"><figure class="flex justify-center items-center rounded-full text-white relative flex-shrink-0 bg-[#FFF] p-[2px] w-10 h-10 "><div class="flex justify-center items-center rounded-full text-white relative flex-shrink-0 bg-[#60C8FA] "><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none"><path d="M18.7517 7.49055L19.4895 5.27734H20.7714L21.5092 7.49055L23.7224 8.22828V9.51024L21.5092 10.248L20.7714 12.4612H19.4895L18.7517 10.248L16.5385 9.51024V8.22828L18.7517 7.49055Z" fill="#FFFCFF"></path><path d="M21.2565 14.4997V22.3823H19.0044V14.4997H21.2565Z" fill="#FFFCFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.24943 7.74318H12.9941L16.7893 22.3823H14.4627L13.5869 19.004H8.65658L7.78073 22.3823H5.4541L9.24943 7.74318ZM9.24047 16.7519H13.003L11.2513 9.99535H10.9922L9.24047 16.7519Z" fill="#FFFCFF"></path></svg></div></figure><span class="p-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble rounded-2xl flex flex-row gap-1" data-testid="host-bubble"><svg xmlns="http://www.w3.org/2000/svg" width="5" height="4" viewBox="0 0 5 4" fill="none"><circle cx="2.5" cy="2" r="2" fill="#60C8FA"></circle></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="4" viewBox="0 0 5 4" fill="none"><circle cx="2.5" cy="2" r="2" fill="#60C8FA"></circle></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="4" viewBox="0 0 5 4" fill="none"><circle cx="2.5" cy="2" r="2" fill="#60C8FA">'
  ),
  ge = () => fe(),
  be = st(
    '<div data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="flex justify-start mb-2 items-start animate-fade-in host-container hover:brightness-90 active:brightness-75"><span class="px-2 py-1 ml-1 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'
  ),
  me = (t) => {
    return (
      (r = (e = be()).firstChild),
      (e.$$click = () => t.onSourceClick?.()),
      r.style.setProperty("width", "max-content"),
      r.style.setProperty("max-width", "80px"),
      r.style.setProperty("font-size", "13px"),
      r.style.setProperty("border-radius", "15px"),
      r.style.setProperty("cursor", "pointer"),
      r.style.setProperty("text-overflow", "ellipsis"),
      r.style.setProperty("overflow", "hidden"),
      r.style.setProperty("white-space", "nowrap"),
      ct(r, () => t.pageContent),
      e
    );
    var e, r;
  },
  ye = (nt(["click"]), Object.create(null)),
  we =
    ((ye.open = "0"),
    (ye.close = "1"),
    (ye.ping = "2"),
    (ye.pong = "3"),
    (ye.message = "4"),
    (ye.upgrade = "5"),
    (ye.noop = "6"),
    Object.create(null)),
  ve =
    (Object.keys(ye).forEach((t) => {
      we[ye[t]] = t;
    }),
    { type: "error", data: "parser error" }),
  xe =
    "function" == typeof Blob ||
    ("undefined" != typeof Blob &&
      "[object BlobConstructor]" === Object.prototype.toString.call(Blob)),
  Ae = "function" == typeof ArrayBuffer,
  ke = (t) =>
    "function" == typeof ArrayBuffer.isView
      ? ArrayBuffer.isView(t)
      : t && t.buffer instanceof ArrayBuffer,
  Ce = ({ type: t, data: e }, r, s) =>
    xe && e instanceof Blob
      ? r
        ? s(e)
        : Ee(e, s)
      : Ae && (e instanceof ArrayBuffer || ke(e))
      ? r
        ? s(e)
        : Ee(new Blob([e]), s)
      : s(ye[t] + (e || "")),
  Ee = (t, e) => {
    const r = new FileReader();
    return (
      (r.onload = function () {
        var t = r.result.split(",")[1];
        e("b" + (t || ""));
      }),
      r.readAsDataURL(t)
    );
  };
function Se(t) {
  return t instanceof Uint8Array
    ? t
    : t instanceof ArrayBuffer
    ? new Uint8Array(t)
    : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let Be;
const Pe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Re = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
for (let t = 0; t < 64; t++) Re[Pe.charCodeAt(t)] = t;
const Le = "function" == typeof ArrayBuffer,
  _e = (t, e) => {
    var r;
    return "string" != typeof t
      ? { type: "message", data: Oe(t, e) }
      : "b" === (r = t.charAt(0))
      ? { type: "message", data: Te(t.substring(1), e) }
      : we[r]
      ? 1 < t.length
        ? { type: we[r], data: t.substring(1) }
        : { type: we[r] }
      : ve;
  },
  Te = (t, e) => {
    var r;
    return Le
      ? ((r = ((t) => {
          let e,
            r,
            s,
            n,
            i,
            o = 0.75 * t.length,
            a = t.length,
            l = 0;
          "=" === t[t.length - 1] && (o--, "=" === t[t.length - 2]) && o--;
          var c = new ArrayBuffer(o),
            h = new Uint8Array(c);
          for (e = 0; e < a; e += 4)
            (r = Re[t.charCodeAt(e)]),
              (s = Re[t.charCodeAt(e + 1)]),
              (n = Re[t.charCodeAt(e + 2)]),
              (i = Re[t.charCodeAt(e + 3)]),
              (h[l++] = (r << 2) | (s >> 4)),
              (h[l++] = ((15 & s) << 4) | (n >> 2)),
              (h[l++] = ((3 & n) << 6) | (63 & i));
          return c;
        })(t)),
        Oe(r, e))
      : { base64: !0, data: t };
  },
  Oe = (t, e) =>
    "blob" !== e
      ? t instanceof ArrayBuffer
        ? t
        : t.buffer
      : t instanceof Blob
      ? t
      : new Blob([t]),
  Ie = String.fromCharCode(30);
function je() {
  return new TransformStream({
    transform(t, e) {
      !(function (t, e) {
        xe && t.data instanceof Blob
          ? t.data.arrayBuffer().then(Se).then(e)
          : Ae && (t.data instanceof ArrayBuffer || ke(t.data))
          ? e(Se(t.data))
          : Ce(t, !1, (t) => {
              (Be = Be || new TextEncoder()), e(Be.encode(t));
            });
      })(t, (r) => {
        var s,
          n = r.length;
        let i;
        n < 126
          ? ((i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, n))
          : n < 65536
          ? ((i = new Uint8Array(3)),
            (s = new DataView(i.buffer)).setUint8(0, 126),
            s.setUint16(1, n))
          : ((i = new Uint8Array(9)),
            (s = new DataView(i.buffer)).setUint8(0, 127),
            s.setBigUint64(1, BigInt(n))),
          t.data && "string" != typeof t.data && (i[0] |= 128),
          e.enqueue(i),
          e.enqueue(r);
      });
    },
  });
}
let Ne;
function qe(t) {
  return t.reduce((t, e) => t + e.length, 0);
}
function He(t, e) {
  if (t[0].length === e) return t.shift();
  var r = new Uint8Array(e);
  let s = 0;
  for (let n = 0; n < e; n++)
    (r[n] = t[0][s++]), s === t[0].length && (t.shift(), (s = 0));
  return t.length && s < t[0].length && (t[0] = t[0].slice(s)), r;
}
function Me(t) {
  if (t)
    return (function (t) {
      for (var e in Me.prototype) t[e] = Me.prototype[e];
      return t;
    })(t);
}
(Me.prototype.on = Me.prototype.addEventListener =
  function (t, e) {
    return (
      (this._callbacks = this._callbacks || {}),
      (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
      this
    );
  }),
  (Me.prototype.once = function (t, e) {
    function r() {
      this.off(t, r), e.apply(this, arguments);
    }
    return (r.fn = e), this.on(t, r), this;
  }),
  (Me.prototype.off =
    Me.prototype.removeListener =
    Me.prototype.removeAllListeners =
    Me.prototype.removeEventListener =
      function (t, e) {
        if (((this._callbacks = this._callbacks || {}), 0 == arguments.length))
          this._callbacks = {};
        else {
          var r = this._callbacks["$" + t];
          if (r)
            if (1 == arguments.length) delete this._callbacks["$" + t];
            else {
              for (var s, n = 0; n < r.length; n++)
                if ((s = r[n]) === e || s.fn === e) {
                  r.splice(n, 1);
                  break;
                }
              0 === r.length && delete this._callbacks["$" + t];
            }
        }
        return this;
      }),
  (Me.prototype.emit = function (t) {
    this._callbacks = this._callbacks || {};
    for (
      var e = new Array(arguments.length - 1),
        r = this._callbacks["$" + t],
        s = 1;
      s < arguments.length;
      s++
    )
      e[s - 1] = arguments[s];
    if (r) {
      s = 0;
      for (var n = (r = r.slice(0)).length; s < n; ++s) r[s].apply(this, e);
    }
    return this;
  }),
  (Me.prototype.emitReserved = Me.prototype.emit),
  (Me.prototype.listeners = function (t) {
    return (
      (this._callbacks = this._callbacks || {}), this._callbacks["$" + t] || []
    );
  }),
  (Me.prototype.hasListeners = function (t) {
    return !!this.listeners(t).length;
  });
const Fe =
  "undefined" != typeof self
    ? self
    : "undefined" != typeof window
    ? window
    : Function("return this")();
function ze(t, ...e) {
  return e.reduce((e, r) => (t.hasOwnProperty(r) && (e[r] = t[r]), e), {});
}
const We = Fe.setTimeout,
  De = Fe.clearTimeout;
function Ve(t, e) {
  e.useNativeTimers
    ? ((t.setTimeoutFn = We.bind(Fe)), (t.clearTimeoutFn = De.bind(Fe)))
    : ((t.setTimeoutFn = Fe.setTimeout.bind(Fe)),
      (t.clearTimeoutFn = Fe.clearTimeout.bind(Fe)));
}
function Ge(t) {
  return "string" == typeof t
    ? (function (t) {
        let e,
          r = 0;
        for (let s = 0, n = t.length; s < n; s++)
          (e = t.charCodeAt(s)) < 128
            ? (r += 1)
            : e < 2048
            ? (r += 2)
            : e < 55296 || 57344 <= e
            ? (r += 3)
            : (s++, (r += 4));
        return r;
      })(t)
    : Math.ceil(1.33 * (t.byteLength || t.size));
}
class Ue extends Error {
  constructor(t, e, r) {
    super(t),
      (this.description = e),
      (this.context = r),
      (this.type = "TransportError");
  }
}
class Qe extends Me {
  constructor(t) {
    super(),
      (this.writable = !1),
      Ve(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket);
  }
  onError(t, e, r) {
    return super.emitReserved("error", new Ue(t, e, r)), this;
  }
  open() {
    return (this.readyState = "opening"), this.doOpen(), this;
  }
  close() {
    return (
      ("opening" !== this.readyState && "open" !== this.readyState) ||
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    "open" === this.readyState && this.write(t);
  }
  onOpen() {
    (this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open");
  }
  onData(t) {
    (t = _e(t, this.socket.binaryType)), this.onPacket(t);
  }
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  onClose(t) {
    (this.readyState = "closed"), super.emitReserved("close", t);
  }
  pause(t) {}
  createUri(t, e = {}) {
    return (
      t +
      "://" +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(e)
    );
  }
  _hostname() {
    var t = this.opts.hostname;
    return -1 === t.indexOf(":") ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && Number(443 !== this.opts.port)) ||
        (!this.opts.secure && 80 !== Number(this.opts.port)))
      ? ":" + this.opts.port
      : "";
  }
  _query(t) {
    return (t = (function (t) {
      let e = "";
      for (var r in t)
        t.hasOwnProperty(r) &&
          (e.length && (e += "&"),
          (e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r])));
      return e;
    })(t)).length
      ? "?" + t
      : "";
  }
}
const Ye =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
      ""
    ),
  $e = 64,
  Je = {};
let Ze,
  Xe = 0,
  Ke = 0;
function tr(t) {
  let e = "";
  for (; (e = Ye[t % $e] + e), 0 < (t = Math.floor(t / $e)); );
  return e;
}
function er() {
  var t = tr(+new Date());
  return t !== Ze ? ((Xe = 0), (Ze = t)) : t + "." + tr(Xe++);
}
for (; Ke < $e; Ke++) Je[Ye[Ke]] = Ke;
let rr = !1;
try {
  rr =
    "undefined" != typeof XMLHttpRequest &&
    "withCredentials" in new XMLHttpRequest();
} catch (se) {}
const sr = rr;
function nr(t) {
  t = t.xdomain;
  try {
    if ("undefined" != typeof XMLHttpRequest && (!t || sr))
      return new XMLHttpRequest();
  } catch (t) {}
  if (!t)
    try {
      return new Fe[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (t) {}
}
function ir() {}
const or = null != new nr({ xdomain: !1 }).responseType;
class ar extends Me {
  constructor(t, e) {
    super(),
      Ve(this, e),
      (this.opts = e),
      (this.method = e.method || "GET"),
      (this.uri = t),
      (this.data = void 0 !== e.data ? e.data : null),
      this.create();
  }
  create() {
    var t,
      e = ze(
        this.opts,
        "agent",
        "pfx",
        "key",
        "passphrase",
        "cert",
        "ca",
        "ciphers",
        "rejectUnauthorized",
        "autoUnref"
      );
    e.xdomain = !!this.opts.xd;
    const r = (this.xhr = new nr(e));
    try {
      r.open(this.method, this.uri, !0);
      try {
        if (this.opts.extraHeaders)
          for (var s in (r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0),
          this.opts.extraHeaders))
            this.opts.extraHeaders.hasOwnProperty(s) &&
              r.setRequestHeader(s, this.opts.extraHeaders[s]);
      } catch (t) {}
      if ("POST" === this.method)
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (t) {}
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch (t) {}
      null != (t = this.opts.cookieJar) && t.addCookies(r),
        "withCredentials" in r &&
          (r.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (r.timeout = this.opts.requestTimeout),
        (r.onreadystatechange = () => {
          var t;
          3 === r.readyState &&
            null != (t = this.opts.cookieJar) &&
            t.parseCookies(r),
            4 === r.readyState &&
              (200 === r.status || 1223 === r.status
                ? this.onLoad()
                : this.setTimeoutFn(() => {
                    this.onError("number" == typeof r.status ? r.status : 0);
                  }, 0));
        }),
        r.send(this.data);
    } catch (t) {
      return void this.setTimeoutFn(() => {
        this.onError(t);
      }, 0);
    }
    "undefined" != typeof document &&
      ((this.index = ar.requestsCount++), (ar.requests[this.index] = this));
  }
  onError(t) {
    this.emitReserved("error", t, this.xhr), this.cleanup(!0);
  }
  cleanup(t) {
    if (void 0 !== this.xhr && null !== this.xhr) {
      if (((this.xhr.onreadystatechange = ir), t))
        try {
          this.xhr.abort();
        } catch (t) {}
      "undefined" != typeof document && delete ar.requests[this.index],
        (this.xhr = null);
    }
  }
  onLoad() {
    var t = this.xhr.responseText;
    null !== t &&
      (this.emitReserved("data", t),
      this.emitReserved("success"),
      this.cleanup());
  }
  abort() {
    this.cleanup();
  }
}
if (
  ((ar.requestsCount = 0), (ar.requests = {}), "undefined" != typeof document)
)
  if ("function" == typeof attachEvent) attachEvent("onunload", lr);
  else if ("function" == typeof addEventListener) {
    addEventListener("onpagehide" in Fe ? "pagehide" : "unload", lr, !1);
  }
function lr() {
  for (var t in ar.requests)
    ar.requests.hasOwnProperty(t) && ar.requests[t].abort();
}
const cr =
    "function" == typeof Promise && "function" == typeof Promise.resolve
      ? (t) => Promise.resolve().then(t)
      : (t, e) => e(t, 0),
  hr = Fe.WebSocket || Fe.MozWebSocket,
  ur =
    "undefined" != typeof navigator &&
    "string" == typeof navigator.product &&
    "reactnative" === navigator.product.toLowerCase();
const pr = {
    websocket: class extends Qe {
      constructor(t) {
        super(t), (this.supportsBinary = !t.forceBase64);
      }
      get name() {
        return "websocket";
      }
      doOpen() {
        if (this.check()) {
          var t = this.uri(),
            e = this.opts.protocols,
            r = ur
              ? {}
              : ze(
                  this.opts,
                  "agent",
                  "perMessageDeflate",
                  "pfx",
                  "key",
                  "passphrase",
                  "cert",
                  "ca",
                  "ciphers",
                  "rejectUnauthorized",
                  "localAddress",
                  "protocolVersion",
                  "origin",
                  "maxPayload",
                  "family",
                  "checkServerIdentity"
                );
          this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
          try {
            this.ws = ur ? new hr(t, e, r) : e ? new hr(t, e) : new hr(t);
          } catch (t) {
            return this.emitReserved("error", t);
          }
          (this.ws.binaryType = this.socket.binaryType),
            this.addEventListeners();
        }
      }
      addEventListeners() {
        (this.ws.onopen = () => {
          this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
        }),
          (this.ws.onclose = (t) =>
            this.onClose({
              description: "websocket connection closed",
              context: t,
            })),
          (this.ws.onmessage = (t) => this.onData(t.data)),
          (this.ws.onerror = (t) => this.onError("websocket error", t));
      }
      write(t) {
        this.writable = !1;
        for (let r = 0; r < t.length; r++) {
          var e = t[r];
          const s = r === t.length - 1;
          Ce(e, this.supportsBinary, (t) => {
            try {
              this.ws.send(t);
            } catch (t) {}
            s &&
              cr(() => {
                (this.writable = !0), this.emitReserved("drain");
              }, this.setTimeoutFn);
          });
        }
      }
      doClose() {
        void 0 !== this.ws && (this.ws.close(), (this.ws = null));
      }
      uri() {
        var t = this.opts.secure ? "wss" : "ws",
          e = this.query || {};
        return (
          this.opts.timestampRequests && (e[this.opts.timestampParam] = er()),
          this.supportsBinary || (e.b64 = 1),
          this.createUri(t, e)
        );
      }
      check() {
        return !!hr;
      }
    },
    webtransport: class extends Qe {
      get name() {
        return "webtransport";
      }
      doOpen() {
        "function" == typeof WebTransport &&
          ((this.transport = new WebTransport(
            this.createUri("https"),
            this.opts.transportOptions[this.name]
          )),
          this.transport.closed
            .then(() => {
              this.onClose();
            })
            .catch((t) => {
              this.onError("webtransport error", t);
            }),
          this.transport.ready.then(() => {
            this.transport.createBidirectionalStream().then((t) => {
              var e = (function (t, e) {
                Ne = Ne || new TextDecoder();
                const r = [];
                let s = 0,
                  n = -1,
                  i = !1;
                return new TransformStream({
                  transform(o, a) {
                    for (r.push(o); ; ) {
                      if (0 === s) {
                        if (qe(r) < 1) break;
                        var l = He(r, 1);
                        (i = 128 == (128 & l[0])),
                          (n = 127 & l[0]),
                          (s = n < 126 ? 3 : 126 === n ? 1 : 2);
                      } else if (1 === s) {
                        if (qe(r) < 2) break;
                        (l = He(r, 2)),
                          (n = new DataView(
                            l.buffer,
                            l.byteOffset,
                            l.length
                          ).getUint16(0)),
                          (s = 3);
                      } else if (2 === s) {
                        if (qe(r) < 8) break;
                        var c = He(r, 8),
                          h = (c = new DataView(
                            c.buffer,
                            c.byteOffset,
                            c.length
                          )).getUint32(0);
                        if (h > Math.pow(2, 21) - 1) {
                          a.enqueue(ve);
                          break;
                        }
                        (n = h * Math.pow(2, 32) + c.getUint32(4)), (s = 3);
                      } else {
                        if (qe(r) < n) break;
                        (h = He(r, n)),
                          a.enqueue(_e(i ? h : Ne.decode(h), e)),
                          (s = 0);
                      }
                      if (0 === n || n > t) {
                        a.enqueue(ve);
                        break;
                      }
                    }
                  },
                });
              })(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
              const r = t.readable.pipeThrough(e).getReader();
              (e = je()).readable.pipeTo(t.writable),
                (this.writer = e.writable.getWriter());
              const s = () => {
                r.read()
                  .then(({ done: t, value: e }) => {
                    t || (this.onPacket(e), s());
                  })
                  .catch((t) => {});
              };
              s(),
                (t = { type: "open" }),
                this.query.sid && (t.data = `{"sid":"${this.query.sid}"}`),
                this.writer.write(t).then(() => this.onOpen());
            });
          }));
      }
      write(t) {
        this.writable = !1;
        for (let r = 0; r < t.length; r++) {
          var e = t[r];
          const s = r === t.length - 1;
          this.writer.write(e).then(() => {
            s &&
              cr(() => {
                (this.writable = !0), this.emitReserved("drain");
              }, this.setTimeoutFn);
          });
        }
      }
      doClose() {
        var t;
        null != (t = this.transport) && t.close();
      }
    },
    polling: class extends Qe {
      constructor(t) {
        if ((super(t), (this.polling = !1), "undefined" != typeof location)) {
          var e = "https:" === location.protocol;
          let r = location.port;
          (r = r || (e ? "443" : "80")),
            (this.xd =
              ("undefined" != typeof location &&
                t.hostname !== location.hostname) ||
              r !== t.port);
        }
        (e = t && t.forceBase64),
          (this.supportsBinary = or && !e),
          this.opts.withCredentials && (this.cookieJar = void 0);
      }
      get name() {
        return "polling";
      }
      doOpen() {
        this.poll();
      }
      pause(t) {
        this.readyState = "pausing";
        const e = () => {
          (this.readyState = "paused"), t();
        };
        if (this.polling || !this.writable) {
          let t = 0;
          this.polling &&
            (t++,
            this.once("pollComplete", function () {
              --t || e();
            })),
            this.writable ||
              (t++,
              this.once("drain", function () {
                --t || e();
              }));
        } else e();
      }
      poll() {
        (this.polling = !0), this.doPoll(), this.emitReserved("poll");
      }
      onData(t) {
        ((t, e) => {
          var r = t.split(Ie),
            s = [];
          for (let t = 0; t < r.length; t++) {
            var n = _e(r[t], e);
            if ((s.push(n), "error" === n.type)) break;
          }
          return s;
        })(t, this.socket.binaryType).forEach((t) => {
          if (
            ("opening" === this.readyState &&
              "open" === t.type &&
              this.onOpen(),
            "close" === t.type)
          )
            return (
              this.onClose({ description: "transport closed by the server" }),
              !1
            );
          this.onPacket(t);
        }),
          "closed" !== this.readyState &&
            ((this.polling = !1),
            this.emitReserved("pollComplete"),
            "open" === this.readyState) &&
            this.poll();
      }
      doClose() {
        var t = () => {
          this.write([{ type: "close" }]);
        };
        "open" === this.readyState ? t() : this.once("open", t);
      }
      write(t) {
        (this.writable = !1),
          ((t, e) => {
            const r = t.length,
              s = new Array(r);
            let n = 0;
            t.forEach((t, i) => {
              Ce(t, !1, (t) => {
                (s[i] = t), ++n === r && e(s.join(Ie));
              });
            });
          })(t, (t) => {
            this.doWrite(t, () => {
              (this.writable = !0), this.emitReserved("drain");
            });
          });
      }
      uri() {
        var t = this.opts.secure ? "https" : "http",
          e = this.query || {};
        return (
          !1 !== this.opts.timestampRequests &&
            (e[this.opts.timestampParam] = er()),
          this.supportsBinary || e.sid || (e.b64 = 1),
          this.createUri(t, e)
        );
      }
      request(t = {}) {
        return (
          Object.assign(
            t,
            { xd: this.xd, cookieJar: this.cookieJar },
            this.opts
          ),
          new ar(this.uri(), t)
        );
      }
      doWrite(t, e) {
        (t = this.request({ method: "POST", data: t })).on("success", e),
          t.on("error", (t, e) => {
            this.onError("xhr post error", t, e);
          });
      }
      doPoll() {
        var t = this.request();
        t.on("data", this.onData.bind(this)),
          t.on("error", (t, e) => {
            this.onError("xhr poll error", t, e);
          }),
          (this.pollXhr = t);
      }
    },
  },
  dr =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  fr = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function gr(t) {
  var e = t,
    r = t.indexOf("["),
    s = t.indexOf("]");
  -1 != r &&
    -1 != s &&
    (t =
      t.substring(0, r) +
      t.substring(r, s).replace(/:/g, ";") +
      t.substring(s, t.length));
  let n = dr.exec(t || ""),
    i = {},
    o = 14;
  for (; o--; ) i[fr[o]] = n[o] || "";
  return (
    -1 != r &&
      -1 != s &&
      ((i.source = e),
      (i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":")),
      (i.authority = i.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (i.ipv6uri = !0)),
    (i.pathNames = (function (t, e) {
      var r = e.replace(/\/{2,9}/g, "/").split("/");
      return (
        ("/" != e.slice(0, 1) && 0 !== e.length) || r.splice(0, 1),
        "/" == e.slice(-1) && r.splice(r.length - 1, 1),
        r
      );
    })(0, i.path)),
    (i.queryKey = (function (t, e) {
      const r = {};
      return (
        e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, s) {
          e && (r[e] = s);
        }),
        r
      );
    })(0, i.query)),
    i
  );
}
let br = class t extends Me {
  constructor(t, e = {}) {
    super(),
      (this.binaryType = "arraybuffer"),
      (this.writeBuffer = []),
      t && "object" == typeof t && ((e = t), (t = null)),
      t
        ? ((t = gr(t)),
          (e.hostname = t.host),
          (e.secure = "https" === t.protocol || "wss" === t.protocol),
          (e.port = t.port),
          t.query && (e.query = t.query))
        : e.host && (e.hostname = gr(e.host).host),
      Ve(this, e),
      (this.secure =
        null != e.secure
          ? e.secure
          : "undefined" != typeof location && "https:" === location.protocol),
      e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
      (this.hostname =
        e.hostname ||
        ("undefined" != typeof location ? location.hostname : "localhost")),
      (this.port =
        e.port ||
        ("undefined" != typeof location && location.port
          ? location.port
          : this.secure
          ? "443"
          : "80")),
      (this.transports = e.transports || [
        "polling",
        "websocket",
        "webtransport",
      ]),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        e
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") +
        (this.opts.addTrailingSlash ? "/" : "")),
      "string" == typeof this.opts.query &&
        (this.opts.query = (function (t) {
          var e = {},
            r = t.split("&");
          for (let t = 0, n = r.length; t < n; t++) {
            var s = r[t].split("=");
            e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
          }
          return e;
        })(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      "function" == typeof addEventListener &&
        (this.opts.closeOnBeforeunload &&
          ((this.beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener("beforeunload", this.beforeunloadEventListener, !1)),
        "localhost" !== this.hostname) &&
        ((this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost",
          });
        }),
        addEventListener("offline", this.offlineEventListener, !1)),
      this.open();
  }
  createTransport(t) {
    var e =
      (((e = Object.assign({}, this.opts.query)).EIO = 4),
      (e.transport = t),
      this.id && (e.sid = this.id),
      Object.assign(
        {},
        this.opts,
        {
          query: e,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port,
        },
        this.opts.transportOptions[t]
      ));
    return new pr[t](e);
  }
  open() {
    let e;
    if (
      this.opts.rememberUpgrade &&
      t.priorWebsocketSuccess &&
      -1 !== this.transports.indexOf("websocket")
    )
      e = "websocket";
    else {
      if (0 === this.transports.length)
        return void this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
      e = this.transports[0];
    }
    this.readyState = "opening";
    try {
      e = this.createTransport(e);
    } catch (e) {
      return this.transports.shift(), void this.open();
    }
    e.open(), this.setTransport(e);
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t)
        .on("drain", this.onDrain.bind(this))
        .on("packet", this.onPacket.bind(this))
        .on("error", this.onError.bind(this))
        .on("close", (t) => this.onClose("transport close", t));
  }
  probe(e) {
    let r = this.createTransport(e),
      s = !1;
    t.priorWebsocketSuccess = !1;
    const n = () => {
      s ||
        (r.send([{ type: "ping", data: "probe" }]),
        r.once("packet", (e) => {
          s ||
            ("pong" === e.type && "probe" === e.data
              ? ((this.upgrading = !0),
                this.emitReserved("upgrading", r),
                r &&
                  ((t.priorWebsocketSuccess = "websocket" === r.name),
                  this.transport.pause(() => {
                    s ||
                      ("closed" !== this.readyState &&
                        (h(),
                        this.setTransport(r),
                        r.send([{ type: "upgrade" }]),
                        this.emitReserved("upgrade", r),
                        (r = null),
                        (this.upgrading = !1),
                        this.flush()));
                  })))
              : (((e = new Error("probe error")).transport = r.name),
                this.emitReserved("upgradeError", e)));
        }));
    };
    function i() {
      s || ((s = !0), h(), r.close(), (r = null));
    }
    const o = (t) => {
      ((t = new Error("probe error: " + t)).transport = r.name),
        i(),
        this.emitReserved("upgradeError", t);
    };
    function a() {
      o("transport closed");
    }
    function l() {
      o("socket closed");
    }
    function c(t) {
      r && t.name !== r.name && i();
    }
    const h = () => {
      r.removeListener("open", n),
        r.removeListener("error", o),
        r.removeListener("close", a),
        this.off("close", l),
        this.off("upgrading", c);
    };
    r.once("open", n),
      r.once("error", o),
      r.once("close", a),
      this.once("close", l),
      this.once("upgrading", c),
      -1 !== this.upgrades.indexOf("webtransport") && "webtransport" !== e
        ? this.setTimeoutFn(() => {
            s || r.open();
          }, 200)
        : r.open();
  }
  onOpen() {
    if (
      ((this.readyState = "open"),
      (t.priorWebsocketSuccess = "websocket" === this.transport.name),
      this.emitReserved("open"),
      this.flush(),
      "open" === this.readyState && this.opts.upgrade)
    ) {
      let t = 0;
      for (var e = this.upgrades.length; t < e; t++)
        this.probe(this.upgrades[t]);
    }
  }
  onPacket(t) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    )
      switch (
        (this.emitReserved("packet", t),
        this.emitReserved("heartbeat"),
        this.resetPingTimeout(),
        t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this.sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong");
          break;
        case "error":
          var e = new Error("server error");
          (e.code = t.data), this.onError(e);
          break;
        case "message":
          this.emitReserved("data", t.data),
            this.emitReserved("message", t.data);
      }
  }
  onHandshake(t) {
    this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      (this.maxPayload = t.maxPayload),
      this.onOpen(),
      "closed" !== this.readyState && this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0) === this.writeBuffer.length
        ? this.emitReserved("drain")
        : this.flush();
  }
  flush() {
    var t;
    "closed" !== this.readyState &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length &&
      ((t = this.getWritablePackets()),
      this.transport.send(t),
      (this.prevBufferLen = t.length),
      this.emitReserved("flush"));
  }
  getWritablePackets() {
    if (
      this.maxPayload &&
      "polling" === this.transport.name &&
      1 < this.writeBuffer.length
    ) {
      let e = 1;
      for (let r = 0; r < this.writeBuffer.length; r++) {
        var t = this.writeBuffer[r].data;
        if ((t && (e += Ge(t)), 0 < r && e > this.maxPayload))
          return this.writeBuffer.slice(0, r);
        e += 2;
      }
    }
    return this.writeBuffer;
  }
  write(t, e, r) {
    return this.sendPacket("message", t, e, r), this;
  }
  send(t, e, r) {
    return this.sendPacket("message", t, e, r), this;
  }
  sendPacket(t, e, r, s) {
    "function" == typeof e && ((s = e), (e = void 0)),
      "function" == typeof r && ((s = r), (r = null)),
      "closing" !== this.readyState &&
        "closed" !== this.readyState &&
        (((r = r || {}).compress = !1 !== r.compress),
        this.emitReserved(
          "packetCreate",
          (t = { type: t, data: e, options: r })
        ),
        this.writeBuffer.push(t),
        s && this.once("flush", s),
        this.flush());
  }
  close() {
    const t = () => {
        this.onClose("forced close"), this.transport.close();
      },
      e = () => {
        this.off("upgrade", e), this.off("upgradeError", e), t();
      },
      r = () => {
        this.once("upgrade", e), this.once("upgradeError", e);
      };
    return (
      ("opening" !== this.readyState && "open" !== this.readyState) ||
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              (this.upgrading ? r : t)();
            })
          : (this.upgrading ? r : t)()),
      this
    );
  }
  onError(e) {
    (t.priorWebsocketSuccess = !1),
      this.emitReserved("error", e),
      this.onClose("transport error", e);
  }
  onClose(t, e) {
    ("opening" !== this.readyState &&
      "open" !== this.readyState &&
      "closing" !== this.readyState) ||
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners("close"),
      this.transport.close(),
      this.transport.removeAllListeners(),
      "function" == typeof removeEventListener &&
        (removeEventListener(
          "beforeunload",
          this.beforeunloadEventListener,
          !1
        ),
        removeEventListener("offline", this.offlineEventListener, !1)),
      (this.readyState = "closed"),
      (this.id = null),
      this.emitReserved("close", t, e),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0));
  }
  filterUpgrades(t) {
    var e = [];
    let r = 0;
    for (var s = t.length; r < s; r++)
      ~this.transports.indexOf(t[r]) && e.push(t[r]);
    return e;
  }
};
br.protocol = 4;
const mr = "function" == typeof ArrayBuffer,
  yr = (t) =>
    "function" == typeof ArrayBuffer.isView
      ? ArrayBuffer.isView(t)
      : t.buffer instanceof ArrayBuffer,
  wr = Object.prototype.toString,
  vr =
    "function" == typeof Blob ||
    ("undefined" != typeof Blob &&
      "[object BlobConstructor]" === wr.call(Blob)),
  xr =
    "function" == typeof File ||
    ("undefined" != typeof File &&
      "[object FileConstructor]" === wr.call(File));
function Ar(t) {
  return (
    (mr && (t instanceof ArrayBuffer || yr(t))) ||
    (vr && t instanceof Blob) ||
    (xr && t instanceof File)
  );
}
function kr(t, e) {
  if (t && "object" == typeof t)
    if (Array.isArray(t)) {
      for (let e = 0, r = t.length; e < r; e++) if (kr(t[e])) return !0;
    } else {
      if (Ar(t)) return !0;
      if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
        return kr(t.toJSON(), !0);
      for (const e in t)
        if (Object.prototype.hasOwnProperty.call(t, e) && kr(t[e])) return !0;
    }
  return !1;
}
function Cr(t) {
  var e = [],
    r = t.data;
  return (
    (t.data = Er(r, e)), (t.attachments = e.length), { packet: t, buffers: e }
  );
}
function Er(t, e) {
  if (!t) return t;
  var r;
  if (Ar(t)) return (r = { _placeholder: !0, num: e.length }), e.push(t), r;
  if (Array.isArray(t)) {
    var s = new Array(t.length);
    for (let r = 0; r < t.length; r++) s[r] = Er(t[r], e);
    return s;
  }
  if ("object" != typeof t || t instanceof Date) return t;
  var n = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (n[r] = Er(t[r], e));
  return n;
}
function Sr(t, e) {
  return (t.data = Br(t.data, e)), delete t.attachments, t;
}
function Br(t, e) {
  if (t) {
    if (t && !0 === t._placeholder) {
      if ("number" == typeof t.num && 0 <= t.num && t.num < e.length)
        return e[t.num];
      throw new Error("illegal attachments");
    }
    if (Array.isArray(t)) for (let r = 0; r < t.length; r++) t[r] = Br(t[r], e);
    else if ("object" == typeof t)
      for (const r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (t[r] = Br(t[r], e));
  }
  return t;
}
const Pr = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener",
];
!(function (t) {
  (t[(t.CONNECT = 0)] = "CONNECT"),
    (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
    (t[(t.EVENT = 2)] = "EVENT"),
    (t[(t.ACK = 3)] = "ACK"),
    (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
})((xt = xt || {}));
function Rr(t) {
  return "[object Object]" === Object.prototype.toString.call(t);
}
class Lr extends Me {
  constructor(t) {
    super(), (this.reviver = t);
  }
  add(t) {
    let e;
    if ("string" == typeof t) {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      var r = (e = this.decodeString(t)).type === xt.BINARY_EVENT;
      ((!r && e.type !== xt.BINARY_ACK) ||
        ((e.type = r ? xt.EVENT : xt.ACK),
        (this.reconstructor = new _r(e)),
        0 === e.attachments)) &&
        super.emitReserved("decoded", e);
    } else {
      if (!Ar(t) && !t.base64) throw new Error("Unknown type: " + t);
      if (!this.reconstructor)
        throw new Error("got binary data when not reconstructing a packet");
      (e = this.reconstructor.takeBinaryData(t)) &&
        ((this.reconstructor = null), super.emitReserved("decoded", e));
    }
  }
  decodeString(t) {
    let e = 0;
    var r = { type: Number(t.charAt(0)) };
    if (void 0 === xt[r.type]) throw new Error("unknown packet type " + r.type);
    if (r.type === xt.BINARY_EVENT || r.type === xt.BINARY_ACK) {
      for (var s = e + 1; "-" !== t.charAt(++e) && e != t.length; );
      if ((s = t.substring(s, e)) != Number(s) || "-" !== t.charAt(e))
        throw new Error("Illegal attachments");
      r.attachments = Number(s);
    }
    if ("/" === t.charAt(e + 1)) {
      for (s = e + 1; ++e && "," !== t.charAt(e) && e !== t.length; );
      r.nsp = t.substring(s, e);
    } else r.nsp = "/";
    if ("" !== (s = t.charAt(e + 1)) && Number(s) == s) {
      for (s = e + 1; ++e; ) {
        var n = t.charAt(e);
        if (null == n || Number(n) != n) {
          --e;
          break;
        }
        if (e === t.length) break;
      }
      r.id = Number(t.substring(s, e + 1));
    }
    if (t.charAt(++e)) {
      if (((s = this.tryParse(t.substr(e))), !Lr.isPayloadValid(r.type, s)))
        throw new Error("invalid payload");
      r.data = s;
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch (t) {
      return !1;
    }
  }
  static isPayloadValid(t, e) {
    switch (t) {
      case xt.CONNECT:
        return Rr(e);
      case xt.DISCONNECT:
        return void 0 === e;
      case xt.CONNECT_ERROR:
        return "string" == typeof e || Rr(e);
      case xt.EVENT:
      case xt.BINARY_EVENT:
        return (
          Array.isArray(e) &&
          ("number" == typeof e[0] ||
            ("string" == typeof e[0] && -1 === Pr.indexOf(e[0])))
        );
      case xt.ACK:
      case xt.BINARY_ACK:
        return Array.isArray(e);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class _r {
  constructor(t) {
    (this.packet = t), (this.buffers = []), (this.reconPack = t);
  }
  takeBinaryData(t) {
    return (
      this.buffers.push(t),
      this.buffers.length === this.reconPack.attachments
        ? ((t = Sr(this.reconPack, this.buffers)),
          this.finishedReconstruction(),
          t)
        : null
    );
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
var Tr = Object.freeze({
  __proto__: null,
  Decoder: Lr,
  Encoder: class {
    constructor(t) {
      this.replacer = t;
    }
    encode(t) {
      return (t.type !== xt.EVENT && t.type !== xt.ACK) || !kr(t)
        ? [this.encodeAsString(t)]
        : this.encodeAsBinary({
            type: t.type === xt.EVENT ? xt.BINARY_EVENT : xt.BINARY_ACK,
            nsp: t.nsp,
            data: t.data,
            id: t.id,
          });
    }
    encodeAsString(t) {
      let e = "" + t.type;
      return (
        (t.type !== xt.BINARY_EVENT && t.type !== xt.BINARY_ACK) ||
          (e += t.attachments + "-"),
        t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
        null != t.id && (e += t.id),
        null != t.data && (e += JSON.stringify(t.data, this.replacer)),
        e
      );
    }
    encodeAsBinary(t) {
      t = Cr(t);
      var e = this.encodeAsString(t.packet);
      return (t = t.buffers).unshift(e), t;
    }
  },
  get PacketType() {
    return xt;
  },
  protocol: 5,
});
function Or(t, e, r) {
  return (
    t.on(e, r),
    function () {
      t.off(e, r);
    }
  );
}
const Ir = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class jr extends Me {
  constructor(t, e, r) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = e),
      r && r.auth && (this.auth = r.auth),
      (this._opts = Object.assign({}, r)),
      this.io._autoConnect && this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    var t;
    this.subs ||
      ((t = this.io),
      (this.subs = [
        Or(t, "open", this.onopen.bind(this)),
        Or(t, "packet", this.onpacket.bind(this)),
        Or(t, "error", this.onerror.bind(this)),
        Or(t, "close", this.onclose.bind(this)),
      ]));
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return (
      this.connected ||
        (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        "open" === this.io._readyState && this.onopen()),
      this
    );
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  emit(t, ...e) {
    if (Ir.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    var r, s;
    return (
      e.unshift(t),
      !this._opts.retries || this.flags.fromQueue || this.flags.volatile
        ? (((t = { type: xt.EVENT, data: e, options: {} }).options.compress =
            !1 !== this.flags.compress),
          "function" == typeof e[e.length - 1] &&
            ((r = this.ids++),
            (s = e.pop()),
            this._registerAckCallback(r, s),
            (t.id = r)),
          (s =
            this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable),
          (!this.flags.volatile || (s && this.connected)) &&
            (this.connected
              ? (this.notifyOutgoingListeners(t), this.packet(t))
              : this.sendBuffer.push(t)),
          (this.flags = {}))
        : this._addToQueue(e),
      this
    );
  }
  _registerAckCallback(t, e) {
    var r = null != (r = this.flags.timeout) ? r : this._opts.ackTimeout;
    if (void 0 === r) this.acks[t] = e;
    else {
      const s = this.io.setTimeoutFn(() => {
        delete this.acks[t];
        for (let e = 0; e < this.sendBuffer.length; e++)
          this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
        e.call(this, new Error("operation has timed out"));
      }, r);
      this.acks[t] = (...t) => {
        this.io.clearTimeoutFn(s), e.apply(this, [null, ...t]);
      };
    }
  }
  emitWithAck(t, ...e) {
    const r = void 0 !== this.flags.timeout || void 0 !== this._opts.ackTimeout;
    return new Promise((s, n) => {
      e.push((t, e) => (r ? (t ? n(t) : s(e)) : s(t))), this.emit(t, ...e);
    });
  }
  _addToQueue(t) {
    let e;
    "function" == typeof t[t.length - 1] && (e = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    t.push((t, ...s) => {
      if (r === this._queue[0])
        return (
          null !== t
            ? r.tryCount > this._opts.retries &&
              (this._queue.shift(), e) &&
              e(t)
            : (this._queue.shift(), e && e(null, ...s)),
          (r.pending = !1),
          this._drainQueue()
        );
    }),
      this._queue.push(r),
      this._drainQueue();
  }
  _drainQueue(t = !1) {
    var e;
    !this.connected ||
      0 === this._queue.length ||
      ((e = this._queue[0]).pending && !t) ||
      ((e.pending = !0),
      e.tryCount++,
      (this.flags = e.flags),
      this.emit.apply(this, e.args));
  }
  packet(t) {
    (t.nsp = this.nsp), this.io._packet(t);
  }
  onopen() {
    "function" == typeof this.auth
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: xt.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t, e) {
    (this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", t, e);
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case xt.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                )
              );
          break;
        case xt.EVENT:
        case xt.BINARY_EVENT:
          this.onevent(t);
          break;
        case xt.ACK:
        case xt.BINARY_ACK:
          this.onack(t);
          break;
        case xt.DISCONNECT:
          this.ondisconnect();
          break;
        case xt.CONNECT_ERROR:
          this.destroy();
          var e = new Error(t.data.message);
          (e.data = t.data.data), this.emitReserved("connect_error", e);
      }
  }
  onevent(t) {
    var e = t.data || [];
    null != t.id && e.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(e)
        : this.receiveBuffer.push(Object.freeze(e));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length)
      for (const e of this._anyListeners.slice()) e.apply(this, t);
    super.emit.apply(this, t),
      this._pid &&
        t.length &&
        "string" == typeof t[t.length - 1] &&
        (this._lastOffset = t[t.length - 1]);
  }
  ack(t) {
    const e = this;
    let r = !1;
    return function (...s) {
      r || ((r = !0), e.packet({ type: xt.ACK, id: t, data: s }));
    };
  }
  onack(t) {
    var e = this.acks[t.id];
    "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id]);
  }
  onconnect(t, e) {
    (this.id = t),
      (this.recovered = e && this._pid === e),
      (this._pid = e),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved("connect"),
      this._drainQueue(!0);
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        this.notifyOutgoingListeners(t), this.packet(t);
      }),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: xt.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return (this.flags.compress = t), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(t) {
    return (this.flags.timeout = t), this;
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (this._anyListeners)
      if (t) {
        var e = this._anyListeners;
        for (let r = 0; r < e.length; r++)
          if (t === e[r]) return e.splice(r, 1), this;
      } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (this._anyOutgoingListeners)
      if (t) {
        var e = this._anyOutgoingListeners;
        for (let r = 0; r < e.length; r++)
          if (t === e[r]) return e.splice(r, 1), this;
      } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length)
      for (const e of this._anyOutgoingListeners.slice()) e.apply(this, t.data);
  }
}
function Nr(t) {
  (this.ms = (t = t || {}).min || 100),
    (this.max = t.max || 1e4),
    (this.factor = t.factor || 2),
    (this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0),
    (this.attempts = 0);
}
(Nr.prototype.duration = function () {
  var t,
    e,
    r = this.ms * Math.pow(this.factor, this.attempts++);
  return (
    this.jitter &&
      ((t = Math.random()),
      (e = Math.floor(t * this.jitter * r)),
      (r = 0 == (1 & Math.floor(10 * t)) ? r - e : r + e)),
    0 | Math.min(r, this.max)
  );
}),
  (Nr.prototype.reset = function () {
    this.attempts = 0;
  }),
  (Nr.prototype.setMin = function (t) {
    this.ms = t;
  }),
  (Nr.prototype.setMax = function (t) {
    this.max = t;
  }),
  (Nr.prototype.setJitter = function (t) {
    this.jitter = t;
  });
class qr extends Me {
  constructor(t, e) {
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && "object" == typeof t && ((e = t), (t = void 0)),
      ((e = e || {}).path = e.path || "/socket.io"),
      (this.opts = e),
      Ve(this, e),
      this.reconnection(!1 !== e.reconnection),
      this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(e.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
      this.randomizationFactor(null != (r = e.randomizationFactor) ? r : 0.5),
      (this.backoff = new Nr({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(null == e.timeout ? 2e4 : e.timeout),
      (this._readyState = "closed"),
      (this.uri = t);
    var r = e.parser || Tr;
    (this.encoder = new r.Encoder()),
      (this.decoder = new r.Decoder()),
      (this._autoConnect = !1 !== e.autoConnect),
      this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return void 0 === t
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var e;
    return void 0 === t
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        null != (e = this.backoff) && e.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var e;
    return void 0 === t
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        null != (e = this.backoff) && e.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var e;
    return void 0 === t
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        null != (e = this.backoff) && e.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      0 === this.backoff.attempts &&
      this.reconnect();
  }
  open(t) {
    if (!~this._readyState.indexOf("open")) {
      this.engine = new br(this.uri, this.opts);
      const s = this.engine,
        n = this,
        i =
          ((this._readyState = "opening"),
          (this.skipReconnect = !1),
          Or(s, "open", function () {
            n.onopen(), t && t();
          })),
        o = (e) => {
          this.cleanup(),
            (this._readyState = "closed"),
            this.emitReserved("error", e),
            t ? t(e) : this.maybeReconnectOnOpen();
        };
      var e = Or(s, "error", o);
      if (!1 !== this._timeout) {
        var r = this._timeout;
        const t = this.setTimeoutFn(() => {
          i(), o(new Error("timeout")), s.close();
        }, r);
        this.opts.autoUnref && t.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(t);
          });
      }
      this.subs.push(i), this.subs.push(e);
    }
    return this;
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
    var t = this.engine;
    this.subs.push(
      Or(t, "ping", this.onping.bind(this)),
      Or(t, "data", this.ondata.bind(this)),
      Or(t, "error", this.onerror.bind(this)),
      Or(t, "close", this.onclose.bind(this)),
      Or(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (t) {
      this.onclose("parse error", t);
    }
  }
  ondecoded(t) {
    cr(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, e) {
    let r = this.nsps[t];
    return (
      r
        ? this._autoConnect && !r.active && r.connect()
        : ((r = new jr(this, t, e)), (this.nsps[t] = r)),
      r
    );
  }
  _destroy(t) {
    for (const t of Object.keys(this.nsps)) {
      if (this.nsps[t].active) return;
    }
    this._close();
  }
  _packet(t) {
    var e = this.encoder.encode(t);
    for (let r = 0; r < e.length; r++) this.engine.write(e[r], t.options);
  }
  cleanup() {
    this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"),
      this.engine && this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(t, e) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, e),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1);
    else {
      var e = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          t.skipReconnect) ||
          t.open((e) => {
            e
              ? ((t._reconnecting = !1),
                t.reconnect(),
                this.emitReserved("reconnect_error", e))
              : t.onreconnect();
          });
      }, e);
      this.opts.autoUnref && r.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(r);
        });
    }
  }
  onreconnect() {
    var t = this.backoff.attempts;
    (this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t);
  }
}
const Hr = {};
function Mr(t, e) {
  "object" == typeof t && ((e = t), (t = void 0));
  t = (function (t, e = "", r) {
    let s = t;
    return (
      (r = r || ("undefined" != typeof location && location)),
      "string" == typeof (t = null == t ? r.protocol + "//" + r.host : t) &&
        ("/" === t.charAt(0) &&
          (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t),
        /^(https?|wss?):\/\//.test(t) ||
          (t = void 0 !== r ? r.protocol + "//" + t : "https://" + t),
        (s = gr(t))),
      s.port ||
        (/^(http|ws)$/.test(s.protocol)
          ? (s.port = "80")
          : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")),
      (s.path = s.path || "/"),
      (t = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host),
      (s.id = s.protocol + "://" + t + ":" + s.port + e),
      (s.href =
        s.protocol + "://" + t + (r && r.port === s.port ? "" : ":" + s.port)),
      s
    );
  })(t, (e = e || {}).path || "/socket.io");
  var r = t.source,
    s = t.id,
    n = t.path;
  n = Hr[s] && n in Hr[s].nsps;
  let i;
  return (
    (i = (n =
      e.forceNew || e["force new connection"] || !1 === e.multiplex || n)
      ? new qr(r, e)
      : (Hr[s] || (Hr[s] = new qr(r, e)), Hr[s])),
    t.query && !e.query && (e.query = t.queryKey),
    i.socket(t.path, e)
  );
}
Object.assign(Mr, { Manager: qr, Socket: jr, io: Mr, connect: Mr });
const Fr = st("<style>"),
  zr = st(
    '<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">'
  ),
  Wr = st("<div><pre>");
const Dr = (t) => {
    let e;
    const [r] = Q(t, ["onOpen", "onClose", "isOpen", "value"]),
      [s, n] =
        (S(() => {
          e &&
            (e.innerHTML = (function (t) {
              return (t = (t =
                "string" != typeof t ? JSON.stringify(t, void 0, 2) : t)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")).replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function (t) {
                  let e = "number";
                  return (
                    /^"/.test(t)
                      ? (e = /:$/.test(t) ? "key" : "string")
                      : /true|false/.test(t)
                      ? (e = "boolean")
                      : /null/.test(t) && (e = "null"),
                    '<span class="' + e + '">' + t + "</span>"
                  );
                }
              );
            })(JSON.stringify(t?.value, void 0, 2)));
        }),
        x(r.isOpen ?? !1)),
      i =
        (k(() => {
          Rt(t.isOpen) || t.isOpen === s() || a();
        }),
        (t) => {
          t.stopPropagation();
        }),
      o = () => {
        n(!1), r.onClose?.(), (document.body.style.overflow = "auto");
      },
      a = () => {
        s()
          ? o()
          : (n(!0), r.onOpen?.(), (document.body.style.overflow = "hidden"));
      };
    return W($, {
      get when() {
        return s();
      },
      get children() {
        return [
          (ct((n = Fr()), At), n),
          ((n = zr()),
          (r = n.firstChild),
          (s = r.nextSibling.nextSibling.firstChild.firstChild),
          n.style.setProperty("z-index", "1100"),
          n.addEventListener("click", o),
          ct(r, At),
          s.style.setProperty("background-color", "transparent"),
          s.style.setProperty("margin-left", "20px"),
          s.style.setProperty("margin-right", "20px"),
          s.addEventListener("click", i),
          s.addEventListener("pointerdown", i),
          ct(
            s,
            (() => {
              const r = C(() => !!t.value);
              return () => {
                return (
                  r() &&
                  ((s = (t = Wr()).firstChild),
                  t.style.setProperty("background", "white"),
                  t.style.setProperty("margin", "auto"),
                  t.style.setProperty("padding", "7px"),
                  "function" == typeof (n = e) ? lt(n, s) : (e = s),
                  t)
                );
                var t, s, n;
              };
            })()
          ),
          n),
        ];
        var r, s, n;
      },
    });
  },
  Vr = st(
    '<div><div class="flex w-full h-full justify-center"><div class="overflow-y-scroll min-w-full w-full min-h-full relative scrollable-container chatbot-chat-view scroll-smooth"><div class="w-full flex justify-between items-center bg-[#FFF] h-[38px] md:h-[59px] px-3 mb-4 fixed z-[20]"><div class="flex gap-4 "><div class=" text-lg text-[#364954] leading-[25.2px] font-bold"></div></div><span class="text-[#678AA1] text-[10px] font-normal leading-[14px]">Powered by Beyim NIS</span></div><div class="px-3 mt-[53px] md:mt-[74px]">'
  ),
  Gr = st("<div>"),
  Ur = st('<div class="w-full h-32">'),
  Qr = "Hi there! How can I help?",
  Yr = (t) => {
    let e, r, s;
    const [n, i] = x(""),
      [o, a] = x(!1),
      [l, c] = x(!1),
      [h, u] = x({}),
      [p, d] = x([{ message: t.welcomeMessage ?? Qr, type: "apiMessage" }], {
        equals: !1,
      }),
      [f, g] = x(""),
      [b, m] = x(!1),
      y =
        (S(() => {
          r &&
            setTimeout(() => {
              e?.scrollTo(0, e.scrollHeight);
            }, 50);
        }),
        () => {
          setTimeout(() => {
            e?.scrollTo(0, e.scrollHeight);
          }, 50);
        }),
      w = (t) => {
        d((e) => [
          ...e.map((r, s) =>
            s === e.length - 1 ? { ...r, message: r.message + t } : r
          ),
        ]);
      },
      v = (t) => {
        d((e) => [
          ...e.map((r, s) =>
            s === e.length - 1 ? { ...r, sourceDocuments: t } : r
          ),
        ]);
      },
      E = async (e) => {
        if ((i(e), "" !== e.trim())) {
          a(!0), y();
          const n = t.welcomeMessage ?? Qr;
          var r,
            s = p().filter((t) => t.message !== n);
          (s =
            (d((t) => [...t, { message: e, type: "userMessage" }]),
            { question: e, history: s })),
            (s =
              (t.chatflowConfig && (s.overrideConfig = t.chatflowConfig),
              b() && (s.socketIOClientId = f()),
              await (({
                chatflowid: t,
                apiHost: e = "http://localhost:3000",
                body: r,
              }) =>
                _t({
                  method: "POST",
                  url: e + "/api/v1/prediction/" + t,
                  body: r,
                }))({
                chatflowid: t.chatflowid,
                apiHost: t.apiHost,
                body: s,
              })));
          if (s.data) {
            const t = R(s.data);
            "object" == typeof t && t.text && t.sourceDocuments
              ? b() ||
                d((e) => [
                  ...e,
                  {
                    message: t.text,
                    sourceDocuments: t.sourceDocuments,
                    type: "apiMessage",
                  },
                ])
              : b() || d((e) => [...e, { message: t, type: "apiMessage" }]),
              a(!1),
              i(""),
              y();
          }
          s.error &&
            ((s = s.error),
            console.error(s),
            (s =
              "string" == typeof s
                ? s
                : s.response.data ||
                  s.response.status + ": " + s.response.statusText),
            ([r = "Oops! There seems to be an error. Please try again."] = [s]),
            d((t) => [...t, { message: r, type: "apiMessage" }]),
            a(!1),
            i(""),
            y());
        }
      },
      P =
        (k(() => {
          p() && y();
        }),
        k(() => {
          t.fontSize && s && (s.style.fontSize = t.fontSize + "px");
        }),
        k(async () => {
          var e = (
            await (({ chatflowid: t, apiHost: e = "http://localhost:3000" }) =>
              _t({
                method: "GET",
                url: e + "/api/v1/chatflows-streaming/" + t,
              }))({ chatflowid: t.chatflowid, apiHost: t.apiHost })
          ).data;
          e && m(e?.isStreaming ?? !1);
          const r = Mr(t.apiHost);
          return (
            r.on("connect", () => {
              g(r.id);
            }),
            r.on("start", () => {
              d((t) => [...t, { message: "", type: "apiMessage" }]);
            }),
            r.on("sourceDocuments", v),
            r.on("token", w),
            () => {
              i(""),
                a(!1),
                d([{ message: t.welcomeMessage ?? Qr, type: "apiMessage" }]),
                r && (r.disconnect(), g(""));
            }
          );
        }),
        (t) => {
          try {
            return new URL(t);
          } catch (t) {}
        }),
      R = (t) => (
        t.sourceDocuments &&
          t.sourceDocuments[0].metadata.length &&
          (t.sourceDocuments = t.sourceDocuments.map((t) => {
            var e = t.metadata.reduce((t, e) => ((t[e.name] = e.value), t), {});
            return { pageContent: t.pageContent, metadata: e };
          })),
        t
      );
    var L = Bt()().split("/")[1];
    const _ =
        "kk" === L
          ? "AI Көмекші"
          : "ru" === L
          ? "AI Помощник"
          : "ar" === L
          ? "AI مساعد"
          : "en" !== L && "ko" === L
          ? "AI 보조"
          : "AI Assistant",
      [, T] = x(window.innerHeight),
      [O, I] = x(window.innerWidth),
      j =
        (window.addEventListener("resize", () => {
          T(window.innerHeight), I(window.innerWidth);
        }),
        768 < O());
    return (
      k(() => {
        const e = (e) => {
          var r = document.getElementsByTagName("flowise-chatbot")[0];
          s &&
            !s.contains(e.target) &&
            t.isBotOpened &&
            !r?.contains(e.target) &&
            t.closeBot?.();
        };
        document.addEventListener("mousedown", e),
          B(() => {
            document.removeEventListener("mousedown", e);
          });
      }, [s, t.isBotOpened, t.toggleBot]),
      [
        (() => {
          const i = Vr(),
            a = i.firstChild.firstChild,
            l = a.firstChild,
            h = l.firstChild.firstChild,
            d = l.nextSibling;
          var f;
          return (
            "function" ==
            typeof (f = ("function" == typeof (f = s) ? lt(f, i) : (s = i), e))
              ? lt(f, a)
              : (e = a),
            a.style.setProperty("padding-bottom", "100px"),
            null != (j ? "16px 16px 0px 0px" : "0")
              ? l.style.setProperty(
                  "border-radius",
                  j ? "16px 16px 0px 0px" : "0"
                )
              : l.style.removeProperty("border-radius"),
            ct(h, _),
            ct(
              d,
              W(Y, {
                get each() {
                  return [...p()];
                },
                children: (e, r) => {
                  const s = e.message.includes("not found"),
                    n = e.message.includes("org-3QQESijIq5tobeE1sRIaphM4"),
                    i = e.message.includes(
                      "This model's maximum context length is"
                    );
                  return [
                    C(
                      (() => {
                        const r = C(() => "userMessage" === e.type);
                        return () =>
                          r() &&
                          W(ue, {
                            get message() {
                              return e.message;
                            },
                            get backgroundColor() {
                              return t.userMessage?.backgroundColor;
                            },
                            get textColor() {
                              return t.userMessage?.textColor;
                            },
                            get showAvatar() {
                              return t.userMessage?.showAvatar;
                            },
                            get avatarSrc() {
                              return t.userMessage?.avatarSrc;
                            },
                          });
                      })()
                    ),
                    C(
                      (() => {
                        const r = C(() => "apiMessage" === e.type);
                        return () =>
                          r() &&
                          W(de, {
                            get message() {
                              return s
                                ? "Извините, у нас ведутся технические работы. AI учитель скоро возобновит работу..."
                                : n
                                ? "Вы превысили количество символов."
                                : i
                                ? "Пожалуйста уменьшите количество символов."
                                : e.message;
                            },
                            get backgroundColor() {
                              return t.botMessage?.backgroundColor;
                            },
                            get textColor() {
                              return t.botMessage?.textColor;
                            },
                            get showAvatar() {
                              return t.botMessage?.showAvatar;
                            },
                            get avatarSrc() {
                              return t.botMessage?.avatarSrc;
                            },
                          });
                      })()
                    ),
                    C(
                      (() => {
                        const t = C(
                          () =>
                            !(
                              "userMessage" !== e.type ||
                              !o() ||
                              r() !== p().length - 1
                            )
                        );
                        return () => t() && W(ge, {});
                      })()
                    ),
                    C(
                      (() => {
                        const t = C(
                          () =>
                            !(!e.sourceDocuments || !e.sourceDocuments.length)
                        );
                        return () => {
                          return (
                            t() &&
                            ((r = Gr()).style.setProperty("display", "flex"),
                            r.style.setProperty("flex-direction", "row"),
                            r.style.setProperty("width", "100%"),
                            ct(
                              r,
                              W(Y, {
                                get each() {
                                  return [
                                    ...((t) => {
                                      const e = [],
                                        r = [];
                                      return (
                                        (t = R(t)).sourceDocuments.forEach(
                                          (t) => {
                                            P(t.metadata.source) &&
                                            !e.includes(t.metadata.source)
                                              ? (e.push(t.metadata.source),
                                                r.push(t))
                                              : P(t.metadata.source) ||
                                                r.push(t);
                                          }
                                        ),
                                        r
                                      );
                                    })(e),
                                  ];
                                },
                                children: (t) => {
                                  const e = P(t.metadata.source);
                                  return W(me, {
                                    get pageContent() {
                                      return e ? e.pathname : t.pageContent;
                                    },
                                    get metadata() {
                                      return t.metadata;
                                    },
                                    onSourceClick: () => {
                                      e
                                        ? window.open(
                                            t.metadata.source,
                                            "_blank"
                                          )
                                        : (u(t), c(!0));
                                    },
                                  });
                                },
                              })
                            ),
                            r)
                          );
                          var r;
                        };
                      })()
                    ),
                  ];
                },
              })
            ),
            ct(
              i,
              W(Wt, {
                get backgroundColor() {
                  return t.textInput?.backgroundColor;
                },
                get textColor() {
                  return t.textInput?.textColor;
                },
                get placeholder() {
                  return t.textInput?.placeholder;
                },
                get sendButtonColor() {
                  return t.textInput?.sendButtonColor;
                },
                get fontSize() {
                  return t.fontSize;
                },
                get defaultValue() {
                  return n();
                },
                onSubmit: E,
              }),
              null
            ),
            ct(
              i,
              W($r, {
                ref(t) {
                  "function" == typeof r ? r(t) : (r = t);
                },
              }),
              null
            ),
            A(() =>
              ot(
                i,
                "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center chatbot-container " +
                  t.class
              )
            ),
            i
          );
        })(),
        C(
          (() => {
            const t = C(() => !!l());
            return () =>
              t() &&
              W(Dr, {
                get isOpen() {
                  return l();
                },
                get value() {
                  return h();
                },
                onClose: () => c(!1),
              });
          })()
        ),
      ]
    );
  },
  $r = (t) => {
    return (
      (e = Ur()), "function" == typeof (r = t.ref) ? lt(r, e) : (t.ref = e), e
    );
    var e, r;
  },
  Jr = st("<style>"),
  Zr = st('<div part="bot">');
function Xr() {
  const [t, e] = x(0);
  function r() {
    e(window?.visualViewport?.width || 0);
  }
  return (
    window?.visualViewport?.addEventListener("resize", r),
    r(),
    B(() => {
      window?.visualViewport?.removeEventListener("resize", r);
    }),
    t
  );
}
const Kr = (t) => {
    const [e] = Q(t, ["theme"]),
      [r, s] = x(!1),
      [n, i] = x(!1),
      o = () => {
        s(!1), Xr()() < 768 && (document.body.style.overflow = "visible");
      },
      a = () => {
        r()
          ? o()
          : (n() || i(!0),
            s(!0),
            Xr()() < 768 && (document.body.style.overflow = "hidden"));
      };
    var l;
    const c = "ar" === (localStorage.getItem("i18nextLng") ?? "kk"),
      [, h] = x(window.innerHeight),
      [u, p] = x(window.innerWidth),
      d =
        (window.addEventListener("resize", () => {
          h(window.innerHeight), p(window.innerWidth);
        }),
        768 < u()),
      f = (function () {
        const [t, e] = x(0);
        function r() {
          e(window?.visualViewport?.height || 0);
        }
        return (
          window?.visualViewport?.addEventListener("resize", r),
          r(),
          B(() => {
            window?.visualViewport?.removeEventListener("resize", r);
          }),
          t
        );
      })(),
      g = (Xr(), Bt()),
      b = document.getElementsByTagName("flowise-chatbot")[0];
    return (
      k(() => {
        "/dashboard" === g() || g().includes("passing")
          ? b.setAttribute("style", "display:none")
          : b.setAttribute("style", "display:block");
      }, [g()]),
      [
        (ct((l = Jr()), At), l),
        W(
          Pt,
          U(() => e.theme?.button, {
            toggleBot: a,
            closeBot: o,
            get isBotOpened() {
              return r();
            },
          })
        ),
        (() => {
          const s = Zr();
          return (
            null != (d ? "16px" : "0")
              ? s.style.setProperty("border-radius", d ? "16px" : "0")
              : s.style.removeProperty("border-radius"),
            s.style.setProperty(
              "transition",
              "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"
            ),
            s.style.setProperty("transform-origin", "bottom right"),
            s.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"),
            s.style.setProperty("z-index", "42424242"),
            ct(
              s,
              W($, {
                get when() {
                  return n();
                },
                get children() {
                  return W(Yr, {
                    get badgeBackgroundColor() {
                      return e.theme?.chatWindow?.backgroundColor;
                    },
                    get welcomeMessage() {
                      return e.theme?.chatWindow?.welcomeMessage;
                    },
                    get poweredByTextColor() {
                      return e.theme?.chatWindow?.poweredByTextColor;
                    },
                    get textInput() {
                      return e.theme?.chatWindow?.textInput;
                    },
                    get botMessage() {
                      return e.theme?.chatWindow?.botMessage;
                    },
                    get userMessage() {
                      return e.theme?.chatWindow?.userMessage;
                    },
                    get fontSize() {
                      return e.theme?.chatWindow?.fontSize;
                    },
                    get chatflowid() {
                      return t.chatflowid;
                    },
                    get chatflowConfig() {
                      return t.chatflowConfig;
                    },
                    get apiHost() {
                      return t.apiHost;
                    },
                    closeBot: o,
                    get isBotOpened() {
                      return n();
                    },
                    toggleBot: a,
                  });
                },
              })
            ),
            A(
              (n) => {
                var i = d
                    ? f() < 500
                      ? f() - 20 + "px"
                      : 500 < f()
                      ? "443px"
                      : f() - 75 + "px"
                    : f() - 59 + "px",
                  o = r() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
                  a = e.theme?.chatWindow?.backgroundColor || "#ffffff",
                  l =
                    "fixed  sm:right-5 w-full sm:w-[400px]" +
                    (r() ? " opacity-1" : " opacity-0 pointer-events-none") +
                    ("large" === t.theme?.button?.size || d
                      ? c
                        ? " bottom-[90px]"
                        : " bottom-[165px]"
                      : " bottom-[56px]");
                return (
                  i !== n._v$ &&
                    (null != (n._v$ = i)
                      ? s.style.setProperty("height", i)
                      : s.style.removeProperty("height")),
                  o !== n._v$2 &&
                    (null != (n._v$2 = o)
                      ? s.style.setProperty("transform", o)
                      : s.style.removeProperty("transform")),
                  a !== n._v$3 &&
                    (null != (n._v$3 = a)
                      ? s.style.setProperty("background-color", a)
                      : s.style.removeProperty("background-color")),
                  l !== n._v$4 && ot(s, (n._v$4 = l)),
                  n
                );
              },
              { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
            ),
            s
          );
        })(),
      ]
    );
  },
  ts = st("<style>"),
  es = st("<div>"),
  rs = (t, { element: e }) => {
    const [r, s] = x(!1),
      n = new IntersectionObserver((t) => {
        t.some((t) => t.isIntersecting) && s(!0);
      });
    return (
      S(() => {
        n.observe(e);
      }),
      B(() => {
        n.disconnect();
      }),
      [
        (ct((i = ts()), At), i),
        W($, {
          get when() {
            return r();
          },
          get children() {
            const e = es();
            return (
              e.style.setProperty("margin", "0px"),
              ct(
                e,
                W(Yr, {
                  get badgeBackgroundColor() {
                    return t.theme?.chatWindow?.backgroundColor;
                  },
                  get welcomeMessage() {
                    return t.theme?.chatWindow?.welcomeMessage;
                  },
                  get poweredByTextColor() {
                    return t.theme?.chatWindow?.poweredByTextColor;
                  },
                  get textInput() {
                    return t.theme?.chatWindow?.textInput;
                  },
                  get botMessage() {
                    return t.theme?.chatWindow?.botMessage;
                  },
                  get userMessage() {
                    return t.theme?.chatWindow?.userMessage;
                  },
                  get fontSize() {
                    return t.theme?.chatWindow?.fontSize;
                  },
                  get chatflowid() {
                    return t.chatflowid;
                  },
                  get chatflowConfig() {
                    return t.chatflowConfig;
                  },
                  get apiHost() {
                    return t.apiHost;
                  },
                })
              ),
              A(
                (r) => {
                  var s = t.theme?.chatWindow?.backgroundColor || "#ffffff",
                    n = t.theme?.chatWindow?.height
                      ? t.theme?.chatWindow?.height.toString() + "px"
                      : "100vh",
                    i = t.theme?.chatWindow?.width
                      ? t.theme?.chatWindow?.width.toString() + "px"
                      : "100%";
                  return (
                    s !== r._v$ &&
                      (null != (r._v$ = s)
                        ? e.style.setProperty("background-color", s)
                        : e.style.removeProperty("background-color")),
                    n !== r._v$2 &&
                      (null != (r._v$2 = n)
                        ? e.style.setProperty("height", n)
                        : e.style.removeProperty("height")),
                    i !== r._v$3 &&
                      (null != (r._v$3 = i)
                        ? e.style.setProperty("width", i)
                        : e.style.removeProperty("width")),
                    r
                  );
                },
                { _v$: void 0, _v$2: void 0, _v$3: void 0 }
              ),
              e
            );
          },
        }),
      ]
    );
    var i;
  },
  ss = (t) => {
    var e = t.id
      ? document.getElementById(t.id)
      : document.querySelector("flowise-fullchatbot");
    if (!e)
      throw new Error(
        "Извините, у нас ведутся технические работы. AI учитель скоро возобновит работу..."
      );
    Object.assign(e, t);
  },
  ns = (t) => {
    var e = document.createElement("flowise-chatbot");
    Object.assign(e, t), document.body.appendChild(e);
  };
class is {
  avatar_url = "";
  avatar_icon = "";
  welcome_message = {};
  placeholder = {};
  name = {};
}
const os =
  ("undefined" != typeof window &&
    (yt("flowise-fullchatbot", wt, rs), yt("flowise-chatbot", wt, Kr)),
  { initFull: ss, init: ns, data: new is() });
((t) => {
  "undefined" != typeof window && (window.Chatbot = { ...t });
})(os),
  (os.data.avatar_url =
    "data:image/jpeg;base64,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"),
  (os.data.avatar_icon =
    "https://dl4ukkensysx3.cloudfront.net/1/5d999ec0-4b39-4d05-8d36-126b14a198df.png"),
  (os.data.welcome_message = {
    ru: "Приветствую! Я Ваш AI учитель\n\nМоя уникальная способность - быстро находить информацию, отвечать на вопросы и предоставлять советы.\n\nЧем я могу быть полезна?",
    kk: "Сәлем! Мен сіздің AI мұғаліміңізбін\n\nМенің өзіндік ерекшелігім - ақпараттар мен сұрақтарға жылдам жауап табу және кеңес беру. \n\nМен сіз үшін не істей аламын?",
    en: "Greetings! I'm your AI teacher\n\nMy unique ability is to quickly find information, answer questions and provide advice.\n\nWhat can I do for you?",
    ar: "تحياتي! أنا معلم الذكاء الاصطناعي الخاص بك\n\nقدرتي الفريدة هي العثور بسرعة على المعلومات والإجابة على الأسئلة وتقديم المشورة.\n\nماذا يمكنني أن أفعل لك؟",
    ko: "안녕하세요! 저는 당신의 인공 지능 선생님입니다.\n\n저의 독특한 능력은 정보를 빠르게 찾아 답변하고 조언을 제공하는 것입니다.\n\n무엇을 도와드릴까요?",
  }),
  (os.data.placeholder = {
    ru: "Напишите свой вопрос",
    kk: "Сұрағыңызды жазыңыз",
    en: "Ask your question",
    ar: "اطرح سؤالك",
    ko: "질문을 적어주세요.",
  });
export { os as default };
