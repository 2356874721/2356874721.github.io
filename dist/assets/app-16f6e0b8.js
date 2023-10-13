(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === 'childList')
        for (const i of o.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function or(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const ie = {},
  mt = [],
  Ie = () => {},
  Yo = () => !1,
  Go = /^on[^a-z]/,
  Jt = (e) => Go.test(e),
  ir = (e) => e.startsWith('onUpdate:'),
  ae = Object.assign,
  lr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Xo = Object.prototype.hasOwnProperty,
  Q = (e, t) => Xo.call(e, t),
  U = Array.isArray,
  $t = (e) => vn(e) === '[object Map]',
  Zo = (e) => vn(e) === '[object Set]',
  K = (e) => typeof e == 'function',
  he = (e) => typeof e == 'string',
  cr = (e) => typeof e == 'symbol',
  ce = (e) => e !== null && typeof e == 'object',
  Hs = (e) => ce(e) && K(e.then) && K(e.catch),
  ei = Object.prototype.toString,
  vn = (e) => ei.call(e),
  ti = (e) => vn(e).slice(8, -1),
  ni = (e) => vn(e) === '[object Object]',
  fr = (e) =>
    he(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Ft = or(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  En = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  ri = /-(\w)/g,
  Be = En((e) => e.replace(ri, (t, n) => (n ? n.toUpperCase() : ''))),
  si = /\B([A-Z])/g,
  Rt = En((e) => e.replace(si, '-$1').toLowerCase()),
  xn = En((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Sn = En((e) => (e ? `on${xn(e)}` : '')),
  Kt = (e, t) => !Object.is(e, t),
  Hn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  an = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  oi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ir;
const Dn = () =>
  Ir ||
  (Ir =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {});
function ur(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = he(r) ? fi(r) : ur(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (he(e)) return e;
    if (ce(e)) return e;
  }
}
const ii = /;(?![^(]*\))/g,
  li = /:([^]+)/,
  ci = /\/\*[^]*?\*\//g;
function fi(e) {
  const t = {};
  return (
    e
      .replace(ci, '')
      .split(ii)
      .forEach((n) => {
        if (n) {
          const r = n.split(li);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function ar(e) {
  let t = '';
  if (he(e)) t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const r = ar(e[n]);
      r && (t += r + ' ');
    }
  else if (ce(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const ui =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  ai = or(ui);
function ks(e) {
  return !!e || e === '';
}
let Ae;
class di {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ae),
      !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ae;
      try {
        return (Ae = this), t();
      } finally {
        Ae = n;
      }
    }
  }
  on() {
    Ae = this;
  }
  off() {
    Ae = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function hi(e, t = Ae) {
  t && t.active && t.effects.push(e);
}
function pi() {
  return Ae;
}
const dr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Is = (e) => (e.w & et) > 0,
  Ls = (e) => (e.n & et) > 0,
  gi = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= et;
  },
  mi = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        Is(s) && !Ls(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~et),
          (s.n &= ~et);
      }
      t.length = n;
    }
  },
  Kn = new WeakMap();
let It = 0,
  et = 1;
const Wn = 30;
let Se;
const it = Symbol(''),
  qn = Symbol('');
class hr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      hi(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Se,
      n = Xe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Se),
        (Se = this),
        (Xe = !0),
        (et = 1 << ++It),
        It <= Wn ? gi(this) : Lr(this),
        this.fn()
      );
    } finally {
      It <= Wn && mi(this),
        (et = 1 << --It),
        (Se = this.parent),
        (Xe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Se === this
      ? (this.deferStop = !0)
      : this.active &&
        (Lr(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Lr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Xe = !0;
const $s = [];
function At() {
  $s.push(Xe), (Xe = !1);
}
function Ot() {
  const e = $s.pop();
  Xe = e === void 0 ? !0 : e;
}
function Ee(e, t, n) {
  if (Xe && Se) {
    let r = Kn.get(e);
    r || Kn.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = dr())), Fs(s);
  }
}
function Fs(e, t) {
  let n = !1;
  It <= Wn ? Ls(e) || ((e.n |= et), (n = !Is(e))) : (n = !e.has(Se)),
    n && (e.add(Se), Se.deps.push(e));
}
function Ke(e, t, n, r, s, o) {
  const i = Kn.get(e);
  if (!i) return;
  let l = [];
  if (t === 'clear') l = [...i.values()];
  else if (n === 'length' && U(e)) {
    const c = Number(r);
    i.forEach((u, a) => {
      (a === 'length' || a >= c) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case 'add':
        U(e)
          ? fr(n) && l.push(i.get('length'))
          : (l.push(i.get(it)), $t(e) && l.push(i.get(qn)));
        break;
      case 'delete':
        U(e) || (l.push(i.get(it)), $t(e) && l.push(i.get(qn)));
        break;
      case 'set':
        $t(e) && l.push(i.get(it));
        break;
    }
  if (l.length === 1) l[0] && Vn(l[0]);
  else {
    const c = [];
    for (const u of l) u && c.push(...u);
    Vn(dr(c));
  }
}
function Vn(e, t) {
  const n = U(e) ? e : [...e];
  for (const r of n) r.computed && $r(r);
  for (const r of n) r.computed || $r(r);
}
function $r(e, t) {
  (e !== Se || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const _i = or('__proto__,__v_isRef,__isVue'),
  Ns = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(cr)
  ),
  yi = pr(),
  bi = pr(!1, !0),
  vi = pr(!0),
  Fr = Ei();
function Ei() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = Y(this);
        for (let o = 0, i = this.length; o < i; o++) Ee(r, 'get', o + '');
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(Y)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        At();
        const r = Y(this)[t].apply(this, n);
        return Ot(), r;
      };
    }),
    e
  );
}
function xi(e) {
  const t = Y(this);
  return Ee(t, 'has', e), t.hasOwnProperty(e);
}
function pr(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === '__v_isReactive') return !e;
    if (s === '__v_isReadonly') return e;
    if (s === '__v_isShallow') return t;
    if (s === '__v_raw' && o === (e ? (t ? Ni : Ks) : t ? Ds : Us).get(r))
      return r;
    const i = U(r);
    if (!e) {
      if (i && Q(Fr, s)) return Reflect.get(Fr, s, o);
      if (s === 'hasOwnProperty') return xi;
    }
    const l = Reflect.get(r, s, o);
    return (cr(s) ? Ns.has(s) : _i(s)) || (e || Ee(r, 'get', s), t)
      ? l
      : ge(l)
      ? i && fr(s)
        ? l
        : l.value
      : ce(l)
      ? e
        ? Ws(l)
        : Yt(l)
      : l;
  };
}
const wi = js(),
  Pi = js(!0);
function js(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (bt(i) && ge(i) && !ge(s)) return !1;
    if (
      !e &&
      (!dn(s) && !bt(s) && ((i = Y(i)), (s = Y(s))), !U(n) && ge(i) && !ge(s))
    )
      return (i.value = s), !0;
    const l = U(n) && fr(r) ? Number(r) < n.length : Q(n, r),
      c = Reflect.set(n, r, s, o);
    return (
      n === Y(o) && (l ? Kt(s, i) && Ke(n, 'set', r, s) : Ke(n, 'add', r, s)), c
    );
  };
}
function Ci(e, t) {
  const n = Q(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Ke(e, 'delete', t, void 0), r;
}
function Ti(e, t) {
  const n = Reflect.has(e, t);
  return (!cr(t) || !Ns.has(t)) && Ee(e, 'has', t), n;
}
function Ri(e) {
  return Ee(e, 'iterate', U(e) ? 'length' : it), Reflect.ownKeys(e);
}
const Bs = { get: yi, set: wi, deleteProperty: Ci, has: Ti, ownKeys: Ri },
  Ai = {
    get: vi,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    }
  },
  Oi = ae({}, Bs, { get: bi, set: Pi }),
  gr = (e) => e,
  wn = (e) => Reflect.getPrototypeOf(e);
function Gt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = Y(e),
    o = Y(t);
  n || (t !== o && Ee(s, 'get', t), Ee(s, 'get', o));
  const { has: i } = wn(s),
    l = r ? gr : n ? yr : Wt;
  if (i.call(s, t)) return l(e.get(t));
  if (i.call(s, o)) return l(e.get(o));
  e !== s && e.get(t);
}
function Xt(e, t = !1) {
  const n = this.__v_raw,
    r = Y(n),
    s = Y(e);
  return (
    t || (e !== s && Ee(r, 'has', e), Ee(r, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Zt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ee(Y(e), 'iterate', it), Reflect.get(e, 'size', e)
  );
}
function Nr(e) {
  e = Y(e);
  const t = Y(this);
  return wn(t).has.call(t, e) || (t.add(e), Ke(t, 'add', e, e)), this;
}
function jr(e, t) {
  t = Y(t);
  const n = Y(this),
    { has: r, get: s } = wn(n);
  let o = r.call(n, e);
  o || ((e = Y(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? Kt(t, i) && Ke(n, 'set', e, t) : Ke(n, 'add', e, t), this
  );
}
function Br(e) {
  const t = Y(this),
    { has: n, get: r } = wn(t);
  let s = n.call(t, e);
  s || ((e = Y(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && Ke(t, 'delete', e, void 0), o;
}
function Ur() {
  const e = Y(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ke(e, 'clear', void 0, void 0), n;
}
function en(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = Y(i),
      c = t ? gr : e ? yr : Wt;
    return (
      !e && Ee(l, 'iterate', it), i.forEach((u, a) => r.call(s, c(u), c(a), o))
    );
  };
}
function tn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = Y(s),
      i = $t(o),
      l = e === 'entries' || (e === Symbol.iterator && i),
      c = e === 'keys' && i,
      u = s[e](...r),
      a = n ? gr : t ? yr : Wt;
    return (
      !t && Ee(o, 'iterate', c ? qn : it),
      {
        next() {
          const { value: d, done: p } = u.next();
          return p
            ? { value: d, done: p }
            : { value: l ? [a(d[0]), a(d[1])] : a(d), done: p };
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    );
  };
}
function qe(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function Mi() {
  const e = {
      get(o) {
        return Gt(this, o);
      },
      get size() {
        return Zt(this);
      },
      has: Xt,
      add: Nr,
      set: jr,
      delete: Br,
      clear: Ur,
      forEach: en(!1, !1)
    },
    t = {
      get(o) {
        return Gt(this, o, !1, !0);
      },
      get size() {
        return Zt(this);
      },
      has: Xt,
      add: Nr,
      set: jr,
      delete: Br,
      clear: Ur,
      forEach: en(!1, !0)
    },
    n = {
      get(o) {
        return Gt(this, o, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(o) {
        return Xt.call(this, o, !0);
      },
      add: qe('add'),
      set: qe('set'),
      delete: qe('delete'),
      clear: qe('clear'),
      forEach: en(!0, !1)
    },
    r = {
      get(o) {
        return Gt(this, o, !0, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(o) {
        return Xt.call(this, o, !0);
      },
      add: qe('add'),
      set: qe('set'),
      delete: qe('delete'),
      clear: qe('clear'),
      forEach: en(!0, !0)
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
      (e[o] = tn(o, !1, !1)),
        (n[o] = tn(o, !0, !1)),
        (t[o] = tn(o, !1, !0)),
        (r[o] = tn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Si, Hi, ki, Ii] = Mi();
function mr(e, t) {
  const n = t ? (e ? Ii : ki) : e ? Hi : Si;
  return (r, s, o) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
      ? e
      : s === '__v_raw'
      ? r
      : Reflect.get(Q(n, s) && s in r ? n : r, s, o);
}
const Li = { get: mr(!1, !1) },
  $i = { get: mr(!1, !0) },
  Fi = { get: mr(!0, !1) },
  Us = new WeakMap(),
  Ds = new WeakMap(),
  Ks = new WeakMap(),
  Ni = new WeakMap();
function ji(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Bi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ji(ti(e));
}
function Yt(e) {
  return bt(e) ? e : _r(e, !1, Bs, Li, Us);
}
function Ui(e) {
  return _r(e, !1, Oi, $i, Ds);
}
function Ws(e) {
  return _r(e, !0, Ai, Fi, Ks);
}
function _r(e, t, n, r, s) {
  if (!ce(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = Bi(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return s.set(e, l), l;
}
function _t(e) {
  return bt(e) ? _t(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
function dn(e) {
  return !!(e && e.__v_isShallow);
}
function qs(e) {
  return _t(e) || bt(e);
}
function Y(e) {
  const t = e && e.__v_raw;
  return t ? Y(t) : e;
}
function Vs(e) {
  return an(e, '__v_skip', !0), e;
}
const Wt = (e) => (ce(e) ? Yt(e) : e),
  yr = (e) => (ce(e) ? Ws(e) : e);
function zs(e) {
  Xe && Se && ((e = Y(e)), Fs(e.dep || (e.dep = dr())));
}
function Qs(e, t) {
  e = Y(e);
  const n = e.dep;
  n && Vn(n);
}
function ge(e) {
  return !!(e && e.__v_isRef === !0);
}
function Js(e) {
  return Ys(e, !1);
}
function Di(e) {
  return Ys(e, !0);
}
function Ys(e, t) {
  return ge(e) ? e : new Ki(e, t);
}
class Ki {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Y(t)),
      (this._value = n ? t : Wt(t));
  }
  get value() {
    return zs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || dn(t) || bt(t);
    (t = n ? t : Y(t)),
      Kt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Wt(t)), Qs(this));
  }
}
function lt(e) {
  return ge(e) ? e.value : e;
}
const Wi = {
  get: (e, t, n) => lt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ge(s) && !ge(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  }
};
function Gs(e) {
  return _t(e) ? e : new Proxy(e, Wi);
}
class qi {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new hr(t, () => {
        this._dirty || ((this._dirty = !0), Qs(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = Y(this);
    return (
      zs(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Vi(e, t, n = !1) {
  let r, s;
  const o = K(e);
  return (
    o ? ((r = e), (s = Ie)) : ((r = e.get), (s = e.set)),
    new qi(r, s, o || !s, n)
  );
}
function Ze(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    Pn(o, t, n);
  }
  return s;
}
function Le(e, t, n, r) {
  if (K(e)) {
    const o = Ze(e, t, n, r);
    return (
      o &&
        Hs(o) &&
        o.catch((i) => {
          Pn(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Le(e[o], t, n, r));
  return s;
}
function Pn(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let a = 0; a < u.length; a++) if (u[a](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Ze(c, null, 10, [e, i, l]);
      return;
    }
  }
  zi(e, n, s, r);
}
function zi(e, t, n, r = !0) {
  console.error(e);
}
let qt = !1,
  zn = !1;
const pe = [];
let Ne = 0;
const yt = [];
let Ue = null,
  st = 0;
const Xs = Promise.resolve();
let br = null;
function vr(e) {
  const t = br || Xs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Qi(e) {
  let t = Ne + 1,
    n = pe.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Vt(pe[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Er(e) {
  (!pe.length || !pe.includes(e, qt && e.allowRecurse ? Ne + 1 : Ne)) &&
    (e.id == null ? pe.push(e) : pe.splice(Qi(e.id), 0, e), Zs());
}
function Zs() {
  !qt && !zn && ((zn = !0), (br = Xs.then(eo)));
}
function Ji(e) {
  const t = pe.indexOf(e);
  t > Ne && pe.splice(t, 1);
}
function Yi(e) {
  U(e)
    ? yt.push(...e)
    : (!Ue || !Ue.includes(e, e.allowRecurse ? st + 1 : st)) && yt.push(e),
    Zs();
}
function Dr(e, t = qt ? Ne + 1 : 0) {
  for (; t < pe.length; t++) {
    const n = pe[t];
    n && n.pre && (pe.splice(t, 1), t--, n());
  }
}
function hn(e) {
  if (yt.length) {
    const t = [...new Set(yt)];
    if (((yt.length = 0), Ue)) {
      Ue.push(...t);
      return;
    }
    for (Ue = t, Ue.sort((n, r) => Vt(n) - Vt(r)), st = 0; st < Ue.length; st++)
      Ue[st]();
    (Ue = null), (st = 0);
  }
}
const Vt = (e) => (e.id == null ? 1 / 0 : e.id),
  Gi = (e, t) => {
    const n = Vt(e) - Vt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function eo(e) {
  (zn = !1), (qt = !0), pe.sort(Gi);
  const t = Ie;
  try {
    for (Ne = 0; Ne < pe.length; Ne++) {
      const n = pe[Ne];
      n && n.active !== !1 && Ze(n, null, 14);
    }
  } finally {
    (Ne = 0),
      (pe.length = 0),
      hn(),
      (qt = !1),
      (br = null),
      (pe.length || yt.length) && eo();
  }
}
function Xi(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ie;
  let s = n;
  const o = t.startsWith('update:'),
    i = o && t.slice(7);
  if (i && i in r) {
    const a = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: d, trim: p } = r[a] || ie;
    p && (s = n.map((b) => (he(b) ? b.trim() : b))), d && (s = n.map(oi));
  }
  let l,
    c = r[(l = Sn(t))] || r[(l = Sn(Be(t)))];
  !c && o && (c = r[(l = Sn(Rt(t)))]), c && Le(c, e, 6, s);
  const u = r[l + 'Once'];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Le(u, e, 6, s);
  }
}
function to(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!K(e)) {
    const c = (u) => {
      const a = to(u, t, !0);
      a && ((l = !0), ae(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !l
    ? (ce(e) && r.set(e, null), null)
    : (U(o) ? o.forEach((c) => (i[c] = null)) : ae(i, o),
      ce(e) && r.set(e, i),
      i);
}
function Cn(e, t) {
  return !e || !Jt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, Rt(t)) || Q(e, t));
}
let He = null,
  no = null;
function pn(e) {
  const t = He;
  return (He = e), (no = (e && e.type.__scopeId) || null), t;
}
function Zi(e, t = He, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Zr(-1);
    const o = pn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      pn(o), r._d && Zr(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function kn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: u,
    render: a,
    renderCache: d,
    data: p,
    setupState: b,
    ctx: C,
    inheritAttrs: O
  } = e;
  let F, m;
  const y = pn(e);
  try {
    if (n.shapeFlag & 4) {
      const A = s || r;
      (F = Me(a.call(A, A, d, o, b, p, C))), (m = c);
    } else {
      const A = t;
      (F = Me(
        A.length > 1 ? A(o, { attrs: c, slots: l, emit: u }) : A(o, null)
      )),
        (m = t.props ? c : el(c));
    }
  } catch (A) {
    (Bt.length = 0), Pn(A, e, 1), (F = ve(Et));
  }
  let H = F;
  if (m && O !== !1) {
    const A = Object.keys(m),
      { shapeFlag: W } = H;
    A.length && W & 7 && (i && A.some(ir) && (m = tl(m, i)), (H = xt(H, m)));
  }
  return (
    n.dirs && ((H = xt(H)), (H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (H.transition = n.transition),
    (F = H),
    pn(y),
    F
  );
}
const el = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || Jt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  tl = (e, t) => {
    const n = {};
    for (const r in e) (!ir(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function nl(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? Kr(r, i, u) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        const p = a[d];
        if (i[p] !== r[p] && !Cn(u, p)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Kr(r, i, u)
        : !0
      : !!i;
  return !1;
}
function Kr(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Cn(n, o)) return !0;
  }
  return !1;
}
function rl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const sl = (e) => e.__isSuspense;
function ro(e, t) {
  t && t.pendingBranch
    ? U(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Yi(e);
}
const nn = {};
function on(e, t, n) {
  return so(e, t, n);
}
function so(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = ie
) {
  var l;
  const c = pi() === ((l = de) == null ? void 0 : l.scope) ? de : null;
  let u,
    a = !1,
    d = !1;
  if (
    (ge(e)
      ? ((u = () => e.value), (a = dn(e)))
      : _t(e)
      ? ((u = () => e), (r = !0))
      : U(e)
      ? ((d = !0),
        (a = e.some((A) => _t(A) || dn(A))),
        (u = () =>
          e.map((A) => {
            if (ge(A)) return A.value;
            if (_t(A)) return gt(A);
            if (K(A)) return Ze(A, c, 2);
          })))
      : K(e)
      ? t
        ? (u = () => Ze(e, c, 2))
        : (u = () => {
            if (!(c && c.isUnmounted)) return p && p(), Le(e, c, 3, [b]);
          })
      : (u = Ie),
    t && r)
  ) {
    const A = u;
    u = () => gt(A());
  }
  let p,
    b = (A) => {
      p = y.onStop = () => {
        Ze(A, c, 4);
      };
    },
    C;
  if (Qt)
    if (
      ((b = Ie),
      t ? n && Le(t, c, 3, [u(), d ? [] : void 0, b]) : u(),
      s === 'sync')
    ) {
      const A = ec();
      C = A.__watcherHandles || (A.__watcherHandles = []);
    } else return Ie;
  let O = d ? new Array(e.length).fill(nn) : nn;
  const F = () => {
    if (y.active)
      if (t) {
        const A = y.run();
        (r || a || (d ? A.some((W, V) => Kt(W, O[V])) : Kt(A, O))) &&
          (p && p(),
          Le(t, c, 3, [A, O === nn ? void 0 : d && O[0] === nn ? [] : O, b]),
          (O = A));
      } else y.run();
  };
  F.allowRecurse = !!t;
  let m;
  s === 'sync'
    ? (m = F)
    : s === 'post'
    ? (m = () => be(F, c && c.suspense))
    : ((F.pre = !0), c && (F.id = c.uid), (m = () => Er(F)));
  const y = new hr(u, m);
  t
    ? n
      ? F()
      : (O = y.run())
    : s === 'post'
    ? be(y.run.bind(y), c && c.suspense)
    : y.run();
  const H = () => {
    y.stop(), c && c.scope && lr(c.scope.effects, y);
  };
  return C && C.push(H), H;
}
function ol(e, t, n) {
  const r = this.proxy,
    s = he(e) ? (e.includes('.') ? oo(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  K(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = de;
  wt(this);
  const l = so(s, o.bind(r), n);
  return i ? wt(i) : ct(), l;
}
function oo(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function gt(e, t) {
  if (!ce(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ge(e))) gt(e.value, t);
  else if (U(e)) for (let n = 0; n < e.length; n++) gt(e[n], t);
  else if (Zo(e) || $t(e))
    e.forEach((n) => {
      gt(n, t);
    });
  else if (ni(e)) for (const n in e) gt(e[n], t);
  return e;
}
function Fe(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[r];
    c && (At(), Le(c, n, 8, [e.el, l, e, t]), Ot());
  }
}
function Tn(e, t) {
  return K(e) ? (() => ae({ name: e.name }, t, { setup: e }))() : e;
}
const Nt = (e) => !!e.type.__asyncLoader,
  io = (e) => e.type.__isKeepAlive;
function il(e, t) {
  lo(e, 'a', t);
}
function ll(e, t) {
  lo(e, 'da', t);
}
function lo(e, t, n = de) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Rn(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      io(s.parent.vnode) && cl(r, t, n, s), (s = s.parent);
  }
}
function cl(e, t, n, r) {
  const s = Rn(t, e, r, !0);
  fo(() => {
    lr(r[t], s);
  }, n);
}
function Rn(e, t, n = de, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          At(), wt(n);
          const l = Le(t, n, e, i);
          return ct(), Ot(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const We =
    (e) =>
    (t, n = de) =>
      (!Qt || e === 'sp') && Rn(e, (...r) => t(...r), n),
  fl = We('bm'),
  co = We('m'),
  ul = We('bu'),
  al = We('u'),
  dl = We('bum'),
  fo = We('um'),
  hl = We('sp'),
  pl = We('rtg'),
  gl = We('rtc');
function ml(e, t = de) {
  Rn('ec', e, t);
}
const uo = 'components';
function _l(e, t) {
  return bl(uo, e, !0, t) || e;
}
const yl = Symbol.for('v-ndc');
function bl(e, t, n = !0, r = !1) {
  const s = He || de;
  if (s) {
    const o = s.type;
    if (e === uo) {
      const l = Gl(o, !1);
      if (l && (l === t || l === Be(t) || l === xn(Be(t)))) return o;
    }
    const i = Wr(s[e] || o[e], t) || Wr(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function Wr(e, t) {
  return e && (e[t] || e[Be(t)] || e[xn(Be(t))]);
}
const Qn = (e) => (e ? (Co(e) ? Tr(e) || e.proxy : Qn(e.parent)) : null),
  jt = ae(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Qn(e.parent),
    $root: (e) => Qn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => xr(e),
    $forceUpdate: (e) => e.f || (e.f = () => Er(e.update)),
    $nextTick: (e) => e.n || (e.n = vr.bind(e.proxy)),
    $watch: (e) => ol.bind(e)
  }),
  In = (e, t) => e !== ie && !e.__isScriptSetup && Q(e, t),
  vl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c
      } = e;
      let u;
      if (t[0] !== '$') {
        const b = i[t];
        if (b !== void 0)
          switch (b) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (In(r, t)) return (i[t] = 1), r[t];
          if (s !== ie && Q(s, t)) return (i[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && Q(u, t)) return (i[t] = 3), o[t];
          if (n !== ie && Q(n, t)) return (i[t] = 4), n[t];
          Jn && (i[t] = 0);
        }
      }
      const a = jt[t];
      let d, p;
      if (a) return t === '$attrs' && Ee(e, 'get', t), a(e);
      if ((d = l.__cssModules) && (d = d[t])) return d;
      if (n !== ie && Q(n, t)) return (i[t] = 4), n[t];
      if (((p = c.config.globalProperties), Q(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return In(s, t)
        ? ((s[t] = n), !0)
        : r !== ie && Q(r, t)
        ? ((r[t] = n), !0)
        : Q(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o
        }
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== ie && Q(e, i)) ||
        In(t, i) ||
        ((l = o[0]) && Q(l, i)) ||
        Q(r, i) ||
        Q(jt, i) ||
        Q(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Q(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    }
  };
function qr(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Jn = !0;
function El(e) {
  const t = xr(e),
    n = e.proxy,
    r = e.ctx;
  (Jn = !1), t.beforeCreate && Vr(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    created: a,
    beforeMount: d,
    mounted: p,
    beforeUpdate: b,
    updated: C,
    activated: O,
    deactivated: F,
    beforeDestroy: m,
    beforeUnmount: y,
    destroyed: H,
    unmounted: A,
    render: W,
    renderTracked: V,
    renderTriggered: B,
    errorCaptured: D,
    serverPrefetch: se,
    expose: te,
    inheritAttrs: oe,
    components: _e,
    directives: fe,
    filters: N
  } = t;
  if ((u && xl(u, r, null), i))
    for (const ne in i) {
      const X = i[ne];
      K(X) && (r[ne] = X.bind(n));
    }
  if (s) {
    const ne = s.call(n, n);
    ce(ne) && (e.data = Yt(ne));
  }
  if (((Jn = !0), o))
    for (const ne in o) {
      const X = o[ne],
        Ce = K(X) ? X.bind(n, n) : K(X.get) ? X.get.bind(n, n) : Ie,
        tt = !K(X) && K(X.set) ? X.set.bind(n) : Ie,
        Te = je({ get: Ce, set: tt });
      Object.defineProperty(r, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Te.value,
        set: (ye) => (Te.value = ye)
      });
    }
  if (l) for (const ne in l) ao(l[ne], r, n, ne);
  if (c) {
    const ne = K(c) ? c.call(n) : c;
    Reflect.ownKeys(ne).forEach((X) => {
      ln(X, ne[X]);
    });
  }
  a && Vr(a, e, 'c');
  function G(ne, X) {
    U(X) ? X.forEach((Ce) => ne(Ce.bind(n))) : X && ne(X.bind(n));
  }
  if (
    (G(fl, d),
    G(co, p),
    G(ul, b),
    G(al, C),
    G(il, O),
    G(ll, F),
    G(ml, D),
    G(gl, V),
    G(pl, B),
    G(dl, y),
    G(fo, A),
    G(hl, se),
    U(te))
  )
    if (te.length) {
      const ne = e.exposed || (e.exposed = {});
      te.forEach((X) => {
        Object.defineProperty(ne, X, {
          get: () => n[X],
          set: (Ce) => (n[X] = Ce)
        });
      });
    } else e.exposed || (e.exposed = {});
  W && e.render === Ie && (e.render = W),
    oe != null && (e.inheritAttrs = oe),
    _e && (e.components = _e),
    fe && (e.directives = fe);
}
function xl(e, t, n = Ie) {
  U(e) && (e = Yn(e));
  for (const r in e) {
    const s = e[r];
    let o;
    ce(s)
      ? 'default' in s
        ? (o = De(s.from || r, s.default, !0))
        : (o = De(s.from || r))
      : (o = De(s)),
      ge(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i)
          })
        : (t[r] = o);
  }
}
function Vr(e, t, n) {
  Le(U(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ao(e, t, n, r) {
  const s = r.includes('.') ? oo(n, r) : () => n[r];
  if (he(e)) {
    const o = t[e];
    K(o) && on(s, o);
  } else if (K(e)) on(s, e.bind(n));
  else if (ce(e))
    if (U(e)) e.forEach((o) => ao(o, t, n, r));
    else {
      const o = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(o) && on(s, o, e);
    }
}
function xr(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i }
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((u) => gn(c, u, i, !0)), gn(c, t, i)),
    ce(t) && o.set(t, c),
    c
  );
}
function gn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && gn(e, o, n, !0), s && s.forEach((i) => gn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === 'expose')) {
      const l = wl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const wl = {
  data: zr,
  props: Qr,
  emits: Qr,
  methods: Lt,
  computed: Lt,
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  components: Lt,
  directives: Lt,
  watch: Cl,
  provide: zr,
  inject: Pl
};
function zr(e, t) {
  return t
    ? e
      ? function () {
          return ae(
            K(e) ? e.call(this, this) : e,
            K(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Pl(e, t) {
  return Lt(Yn(e), Yn(t));
}
function Yn(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Lt(e, t) {
  return e ? ae(Object.create(null), e, t) : t;
}
function Qr(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : ae(Object.create(null), qr(e), qr(t ?? {}))
    : t;
}
function Cl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ae(Object.create(null), e);
  for (const r in t) n[r] = me(e[r], t[r]);
  return n;
}
function ho() {
  return {
    app: null,
    config: {
      isNativeTag: Yo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let Tl = 0;
function Rl(e, t) {
  return function (r, s = null) {
    K(r) || (r = ae({}, r)), s != null && !ce(s) && (s = null);
    const o = ho(),
      i = new Set();
    let l = !1;
    const c = (o.app = {
      _uid: Tl++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Ao,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...a) {
        return (
          i.has(u) ||
            (u && K(u.install)
              ? (i.add(u), u.install(c, ...a))
              : K(u) && (i.add(u), u(c, ...a))),
          c
        );
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), c;
      },
      component(u, a) {
        return a ? ((o.components[u] = a), c) : o.components[u];
      },
      directive(u, a) {
        return a ? ((o.directives[u] = a), c) : o.directives[u];
      },
      mount(u, a, d) {
        if (!l) {
          const p = ve(r, s);
          return (
            (p.appContext = o),
            a && t ? t(p, u) : e(p, u, d),
            (l = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            Tr(p.component) || p.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, a) {
        return (o.provides[u] = a), c;
      },
      runWithContext(u) {
        mn = c;
        try {
          return u();
        } finally {
          mn = null;
        }
      }
    });
    return c;
  };
}
let mn = null;
function ln(e, t) {
  if (de) {
    let n = de.provides;
    const r = de.parent && de.parent.provides;
    r === n && (n = de.provides = Object.create(r)), (n[e] = t);
  }
}
function De(e, t, n = !1) {
  const r = de || He;
  if (r || mn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : mn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && K(t) ? t.call(r && r.proxy) : t;
  }
}
function Al(e, t, n, r = !1) {
  const s = {},
    o = {};
  an(o, An, 1), (e.propsDefaults = Object.create(null)), po(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : Ui(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function Ol(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i }
    } = e,
    l = Y(s),
    [c] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        let p = a[d];
        if (Cn(e.emitsOptions, p)) continue;
        const b = t[p];
        if (c)
          if (Q(o, p)) b !== o[p] && ((o[p] = b), (u = !0));
          else {
            const C = Be(p);
            s[C] = Gn(c, l, C, b, e, !1);
          }
        else b !== o[p] && ((o[p] = b), (u = !0));
      }
    }
  } else {
    po(e, t, s, o) && (u = !0);
    let a;
    for (const d in l)
      (!t || (!Q(t, d) && ((a = Rt(d)) === d || !Q(t, a)))) &&
        (c
          ? n &&
            (n[d] !== void 0 || n[a] !== void 0) &&
            (s[d] = Gn(c, l, d, void 0, e, !0))
          : delete s[d]);
    if (o !== l) for (const d in o) (!t || !Q(t, d)) && (delete o[d], (u = !0));
  }
  u && Ke(e, 'set', '$attrs');
}
function po(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (Ft(c)) continue;
      const u = t[c];
      let a;
      s && Q(s, (a = Be(c)))
        ? !o || !o.includes(a)
          ? (n[a] = u)
          : ((l || (l = {}))[a] = u)
        : Cn(e.emitsOptions, c) ||
          ((!(c in r) || u !== r[c]) && ((r[c] = u), (i = !0)));
    }
  if (o) {
    const c = Y(n),
      u = l || ie;
    for (let a = 0; a < o.length; a++) {
      const d = o[a];
      n[d] = Gn(s, c, d, u[d], e, !Q(u, d));
    }
  }
  return i;
}
function Gn(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = Q(i, 'default');
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && K(c)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (wt(s), (r = u[n] = c.call(null, t)), ct());
      } else r = c;
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === '' || r === Rt(n)) && (r = !0));
  }
  return r;
}
function go(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!K(e)) {
    const a = (d) => {
      c = !0;
      const [p, b] = go(d, t, !0);
      ae(i, p), b && l.push(...b);
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c) return ce(e) && r.set(e, mt), mt;
  if (U(o))
    for (let a = 0; a < o.length; a++) {
      const d = Be(o[a]);
      Jr(d) && (i[d] = ie);
    }
  else if (o)
    for (const a in o) {
      const d = Be(a);
      if (Jr(d)) {
        const p = o[a],
          b = (i[d] = U(p) || K(p) ? { type: p } : ae({}, p));
        if (b) {
          const C = Xr(Boolean, b.type),
            O = Xr(String, b.type);
          (b[0] = C > -1),
            (b[1] = O < 0 || C < O),
            (C > -1 || Q(b, 'default')) && l.push(d);
        }
      }
    }
  const u = [i, l];
  return ce(e) && r.set(e, u), u;
}
function Jr(e) {
  return e[0] !== '$';
}
function Yr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function Gr(e, t) {
  return Yr(e) === Yr(t);
}
function Xr(e, t) {
  return U(t) ? t.findIndex((n) => Gr(n, e)) : K(t) && Gr(t, e) ? 0 : -1;
}
const mo = (e) => e[0] === '_' || e === '$stable',
  wr = (e) => (U(e) ? e.map(Me) : [Me(e)]),
  Ml = (e, t, n) => {
    if (t._n) return t;
    const r = Zi((...s) => wr(t(...s)), n);
    return (r._c = !1), r;
  },
  _o = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (mo(s)) continue;
      const o = e[s];
      if (K(o)) t[s] = Ml(s, o, r);
      else if (o != null) {
        const i = wr(o);
        t[s] = () => i;
      }
    }
  },
  yo = (e, t) => {
    const n = wr(t);
    e.slots.default = () => n;
  },
  Sl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = Y(t)), an(t, '_', n)) : _o(t, (e.slots = {}));
    } else (e.slots = {}), t && yo(e, t);
    an(e.slots, An, 1);
  },
  Hl = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = ie;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (ae(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), _o(t, s)),
        (i = t);
    } else t && (yo(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !mo(l) && !(l in i) && delete s[l];
  };
function _n(e, t, n, r, s = !1) {
  if (U(e)) {
    e.forEach((p, b) => _n(p, t && (U(t) ? t[b] : t), n, r, s));
    return;
  }
  if (Nt(r) && !s) return;
  const o = r.shapeFlag & 4 ? Tr(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    u = t && t.r,
    a = l.refs === ie ? (l.refs = {}) : l.refs,
    d = l.setupState;
  if (
    (u != null &&
      u !== c &&
      (he(u)
        ? ((a[u] = null), Q(d, u) && (d[u] = null))
        : ge(u) && (u.value = null)),
    K(c))
  )
    Ze(c, l, 12, [i, a]);
  else {
    const p = he(c),
      b = ge(c);
    if (p || b) {
      const C = () => {
        if (e.f) {
          const O = p ? (Q(d, c) ? d[c] : a[c]) : c.value;
          s
            ? U(O) && lr(O, o)
            : U(O)
            ? O.includes(o) || O.push(o)
            : p
            ? ((a[c] = [o]), Q(d, c) && (d[c] = a[c]))
            : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          p
            ? ((a[c] = i), Q(d, c) && (d[c] = i))
            : b && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((C.id = -1), be(C, n)) : C();
    }
  }
}
let Ve = !1;
const rn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== 'foreignObject',
  sn = (e) => e.nodeType === 8;
function kl(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: o,
        parentNode: i,
        remove: l,
        insert: c,
        createComment: u
      }
    } = e,
    a = (m, y) => {
      if (!y.hasChildNodes()) {
        n(null, m, y), hn(), (y._vnode = m);
        return;
      }
      (Ve = !1),
        d(y.firstChild, m, null, null, null),
        hn(),
        (y._vnode = m),
        Ve && console.error('Hydration completed but contains mismatches.');
    },
    d = (m, y, H, A, W, V = !1) => {
      const B = sn(m) && m.data === '[',
        D = () => O(m, y, H, A, W, B),
        { type: se, ref: te, shapeFlag: oe, patchFlag: _e } = y;
      let fe = m.nodeType;
      (y.el = m), _e === -2 && ((V = !1), (y.dynamicChildren = null));
      let N = null;
      switch (se) {
        case vt:
          fe !== 3
            ? y.children === ''
              ? (c((y.el = s('')), i(m), m), (N = m))
              : (N = D())
            : (m.data !== y.children && ((Ve = !0), (m.data = y.children)),
              (N = o(m)));
          break;
        case Et:
          fe !== 8 || B ? (N = D()) : (N = o(m));
          break;
        case cn:
          if ((B && ((m = o(m)), (fe = m.nodeType)), fe === 1 || fe === 3)) {
            N = m;
            const xe = !y.children.length;
            for (let G = 0; G < y.staticCount; G++)
              xe && (y.children += N.nodeType === 1 ? N.outerHTML : N.data),
                G === y.staticCount - 1 && (y.anchor = N),
                (N = o(N));
            return B ? o(N) : N;
          } else D();
          break;
        case Oe:
          B ? (N = C(m, y, H, A, W, V)) : (N = D());
          break;
        default:
          if (oe & 1)
            fe !== 1 || y.type.toLowerCase() !== m.tagName.toLowerCase()
              ? (N = D())
              : (N = p(m, y, H, A, W, V));
          else if (oe & 6) {
            y.slotScopeIds = W;
            const xe = i(m);
            if (
              (t(y, xe, null, H, A, rn(xe), V),
              (N = B ? F(m) : o(m)),
              N && sn(N) && N.data === 'teleport end' && (N = o(N)),
              Nt(y))
            ) {
              let G;
              B
                ? ((G = ve(Oe)),
                  (G.anchor = N ? N.previousSibling : xe.lastChild))
                : (G = m.nodeType === 3 ? Po('') : ve('div')),
                (G.el = m),
                (y.component.subTree = G);
            }
          } else
            oe & 64
              ? fe !== 8
                ? (N = D())
                : (N = y.type.hydrate(m, y, H, A, W, V, e, b))
              : oe & 128 &&
                (N = y.type.hydrate(m, y, H, A, rn(i(m)), W, V, e, d));
      }
      return te != null && _n(te, null, A, y), N;
    },
    p = (m, y, H, A, W, V) => {
      V = V || !!y.dynamicChildren;
      const { type: B, props: D, patchFlag: se, shapeFlag: te, dirs: oe } = y,
        _e = (B === 'input' && oe) || B === 'option';
      if (_e || se !== -1) {
        if ((oe && Fe(y, null, H, 'created'), D))
          if (_e || !V || se & 48)
            for (const N in D)
              ((_e && N.endsWith('value')) || (Jt(N) && !Ft(N))) &&
                r(m, N, null, D[N], !1, void 0, H);
          else D.onClick && r(m, 'onClick', null, D.onClick, !1, void 0, H);
        let fe;
        if (
          ((fe = D && D.onVnodeBeforeMount) && Pe(fe, H, y),
          oe && Fe(y, null, H, 'beforeMount'),
          ((fe = D && D.onVnodeMounted) || oe) &&
            ro(() => {
              fe && Pe(fe, H, y), oe && Fe(y, null, H, 'mounted');
            }, A),
          te & 16 && !(D && (D.innerHTML || D.textContent)))
        ) {
          let N = b(m.firstChild, y, m, H, A, W, V);
          for (; N; ) {
            Ve = !0;
            const xe = N;
            (N = N.nextSibling), l(xe);
          }
        } else
          te & 8 &&
            m.textContent !== y.children &&
            ((Ve = !0), (m.textContent = y.children));
      }
      return m.nextSibling;
    },
    b = (m, y, H, A, W, V, B) => {
      B = B || !!y.dynamicChildren;
      const D = y.children,
        se = D.length;
      for (let te = 0; te < se; te++) {
        const oe = B ? D[te] : (D[te] = Me(D[te]));
        if (m) m = d(m, oe, A, W, V, B);
        else {
          if (oe.type === vt && !oe.children) continue;
          (Ve = !0), n(null, oe, H, null, A, W, rn(H), V);
        }
      }
      return m;
    },
    C = (m, y, H, A, W, V) => {
      const { slotScopeIds: B } = y;
      B && (W = W ? W.concat(B) : B);
      const D = i(m),
        se = b(o(m), y, D, H, A, W, V);
      return se && sn(se) && se.data === ']'
        ? o((y.anchor = se))
        : ((Ve = !0), c((y.anchor = u(']')), D, se), se);
    },
    O = (m, y, H, A, W, V) => {
      if (((Ve = !0), (y.el = null), V)) {
        const se = F(m);
        for (;;) {
          const te = o(m);
          if (te && te !== se) l(te);
          else break;
        }
      }
      const B = o(m),
        D = i(m);
      return l(m), n(null, y, D, B, H, A, rn(D), W), B;
    },
    F = (m) => {
      let y = 0;
      for (; m; )
        if (
          ((m = o(m)), m && sn(m) && (m.data === '[' && y++, m.data === ']'))
        ) {
          if (y === 0) return o(m);
          y--;
        }
      return m;
    };
  return [a, d];
}
const be = ro;
function Il(e) {
  return bo(e);
}
function Ll(e) {
  return bo(e, kl);
}
function bo(e, t) {
  const n = Dn();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: a,
      parentNode: d,
      nextSibling: p,
      setScopeId: b = Ie,
      insertStaticContent: C
    } = e,
    O = (
      f,
      h,
      g,
      _ = null,
      E = null,
      P = null,
      M = !1,
      w = null,
      T = !!h.dynamicChildren
    ) => {
      if (f === h) return;
      f && !Ht(f, h) && ((_ = R(f)), ye(f, E, P, !0), (f = null)),
        h.patchFlag === -2 && ((T = !1), (h.dynamicChildren = null));
      const { type: x, ref: L, shapeFlag: k } = h;
      switch (x) {
        case vt:
          F(f, h, g, _);
          break;
        case Et:
          m(f, h, g, _);
          break;
        case cn:
          f == null && y(h, g, _, M);
          break;
        case Oe:
          _e(f, h, g, _, E, P, M, w, T);
          break;
        default:
          k & 1
            ? W(f, h, g, _, E, P, M, w, T)
            : k & 6
            ? fe(f, h, g, _, E, P, M, w, T)
            : (k & 64 || k & 128) && x.process(f, h, g, _, E, P, M, w, T, J);
      }
      L != null && E && _n(L, f && f.ref, P, h || f, !h);
    },
    F = (f, h, g, _) => {
      if (f == null) r((h.el = l(h.children)), g, _);
      else {
        const E = (h.el = f.el);
        h.children !== f.children && u(E, h.children);
      }
    },
    m = (f, h, g, _) => {
      f == null ? r((h.el = c(h.children || '')), g, _) : (h.el = f.el);
    },
    y = (f, h, g, _) => {
      [f.el, f.anchor] = C(f.children, h, g, _, f.el, f.anchor);
    },
    H = ({ el: f, anchor: h }, g, _) => {
      let E;
      for (; f && f !== h; ) (E = p(f)), r(f, g, _), (f = E);
      r(h, g, _);
    },
    A = ({ el: f, anchor: h }) => {
      let g;
      for (; f && f !== h; ) (g = p(f)), s(f), (f = g);
      s(h);
    },
    W = (f, h, g, _, E, P, M, w, T) => {
      (M = M || h.type === 'svg'),
        f == null ? V(h, g, _, E, P, M, w, T) : se(f, h, E, P, M, w, T);
    },
    V = (f, h, g, _, E, P, M, w) => {
      let T, x;
      const { type: L, props: k, shapeFlag: $, transition: j, dirs: z } = f;
      if (
        ((T = f.el = i(f.type, P, k && k.is, k)),
        $ & 8
          ? a(T, f.children)
          : $ & 16 &&
            D(f.children, T, null, _, E, P && L !== 'foreignObject', M, w),
        z && Fe(f, null, _, 'created'),
        B(T, f, f.scopeId, M, _),
        k)
      ) {
        for (const Z in k)
          Z !== 'value' &&
            !Ft(Z) &&
            o(T, Z, null, k[Z], P, f.children, _, E, S);
        'value' in k && o(T, 'value', null, k.value),
          (x = k.onVnodeBeforeMount) && Pe(x, _, f);
      }
      z && Fe(f, null, _, 'beforeMount');
      const re = (!E || (E && !E.pendingBranch)) && j && !j.persisted;
      re && j.beforeEnter(T),
        r(T, h, g),
        ((x = k && k.onVnodeMounted) || re || z) &&
          be(() => {
            x && Pe(x, _, f), re && j.enter(T), z && Fe(f, null, _, 'mounted');
          }, E);
    },
    B = (f, h, g, _, E) => {
      if ((g && b(f, g), _)) for (let P = 0; P < _.length; P++) b(f, _[P]);
      if (E) {
        let P = E.subTree;
        if (h === P) {
          const M = E.vnode;
          B(f, M, M.scopeId, M.slotScopeIds, E.parent);
        }
      }
    },
    D = (f, h, g, _, E, P, M, w, T = 0) => {
      for (let x = T; x < f.length; x++) {
        const L = (f[x] = w ? Ye(f[x]) : Me(f[x]));
        O(null, L, h, g, _, E, P, M, w);
      }
    },
    se = (f, h, g, _, E, P, M) => {
      const w = (h.el = f.el);
      let { patchFlag: T, dynamicChildren: x, dirs: L } = h;
      T |= f.patchFlag & 16;
      const k = f.props || ie,
        $ = h.props || ie;
      let j;
      g && nt(g, !1),
        (j = $.onVnodeBeforeUpdate) && Pe(j, g, h, f),
        L && Fe(h, f, g, 'beforeUpdate'),
        g && nt(g, !0);
      const z = E && h.type !== 'foreignObject';
      if (
        (x
          ? te(f.dynamicChildren, x, w, g, _, z, P)
          : M || X(f, h, w, null, g, _, z, P, !1),
        T > 0)
      ) {
        if (T & 16) oe(w, h, k, $, g, _, E);
        else if (
          (T & 2 && k.class !== $.class && o(w, 'class', null, $.class, E),
          T & 4 && o(w, 'style', k.style, $.style, E),
          T & 8)
        ) {
          const re = h.dynamicProps;
          for (let Z = 0; Z < re.length; Z++) {
            const ue = re[Z],
              Re = k[ue],
              at = $[ue];
            (at !== Re || ue === 'value') &&
              o(w, ue, Re, at, E, f.children, g, _, S);
          }
        }
        T & 1 && f.children !== h.children && a(w, h.children);
      } else !M && x == null && oe(w, h, k, $, g, _, E);
      ((j = $.onVnodeUpdated) || L) &&
        be(() => {
          j && Pe(j, g, h, f), L && Fe(h, f, g, 'updated');
        }, _);
    },
    te = (f, h, g, _, E, P, M) => {
      for (let w = 0; w < h.length; w++) {
        const T = f[w],
          x = h[w],
          L =
            T.el && (T.type === Oe || !Ht(T, x) || T.shapeFlag & 70)
              ? d(T.el)
              : g;
        O(T, x, L, null, _, E, P, M, !0);
      }
    },
    oe = (f, h, g, _, E, P, M) => {
      if (g !== _) {
        if (g !== ie)
          for (const w in g)
            !Ft(w) && !(w in _) && o(f, w, g[w], null, M, h.children, E, P, S);
        for (const w in _) {
          if (Ft(w)) continue;
          const T = _[w],
            x = g[w];
          T !== x && w !== 'value' && o(f, w, x, T, M, h.children, E, P, S);
        }
        'value' in _ && o(f, 'value', g.value, _.value);
      }
    },
    _e = (f, h, g, _, E, P, M, w, T) => {
      const x = (h.el = f ? f.el : l('')),
        L = (h.anchor = f ? f.anchor : l(''));
      let { patchFlag: k, dynamicChildren: $, slotScopeIds: j } = h;
      j && (w = w ? w.concat(j) : j),
        f == null
          ? (r(x, g, _), r(L, g, _), D(h.children, g, L, E, P, M, w, T))
          : k > 0 && k & 64 && $ && f.dynamicChildren
          ? (te(f.dynamicChildren, $, g, E, P, M, w),
            (h.key != null || (E && h === E.subTree)) && vo(f, h, !0))
          : X(f, h, g, L, E, P, M, w, T);
    },
    fe = (f, h, g, _, E, P, M, w, T) => {
      (h.slotScopeIds = w),
        f == null
          ? h.shapeFlag & 512
            ? E.ctx.activate(h, g, _, M, T)
            : N(h, g, _, E, P, M, T)
          : xe(f, h, T);
    },
    N = (f, h, g, _, E, P, M) => {
      const w = (f.component = Vl(f, _, E));
      if ((io(f) && (w.ctx.renderer = J), zl(w), w.asyncDep)) {
        if ((E && E.registerDep(w, G), !f.el)) {
          const T = (w.subTree = ve(Et));
          m(null, T, h, g);
        }
        return;
      }
      G(w, f, h, g, E, P, M);
    },
    xe = (f, h, g) => {
      const _ = (h.component = f.component);
      if (nl(f, h, g))
        if (_.asyncDep && !_.asyncResolved) {
          ne(_, h, g);
          return;
        } else (_.next = h), Ji(_.update), _.update();
      else (h.el = f.el), (_.vnode = h);
    },
    G = (f, h, g, _, E, P, M) => {
      const w = () => {
          if (f.isMounted) {
            let { next: L, bu: k, u: $, parent: j, vnode: z } = f,
              re = L,
              Z;
            nt(f, !1),
              L ? ((L.el = z.el), ne(f, L, M)) : (L = z),
              k && Hn(k),
              (Z = L.props && L.props.onVnodeBeforeUpdate) && Pe(Z, j, L, z),
              nt(f, !0);
            const ue = kn(f),
              Re = f.subTree;
            (f.subTree = ue),
              O(Re, ue, d(Re.el), R(Re), f, E, P),
              (L.el = ue.el),
              re === null && rl(f, ue.el),
              $ && be($, E),
              (Z = L.props && L.props.onVnodeUpdated) &&
                be(() => Pe(Z, j, L, z), E);
          } else {
            let L;
            const { el: k, props: $ } = h,
              { bm: j, m: z, parent: re } = f,
              Z = Nt(h);
            if (
              (nt(f, !1),
              j && Hn(j),
              !Z && (L = $ && $.onVnodeBeforeMount) && Pe(L, re, h),
              nt(f, !0),
              k && q)
            ) {
              const ue = () => {
                (f.subTree = kn(f)), q(k, f.subTree, f, E, null);
              };
              Z
                ? h.type.__asyncLoader().then(() => !f.isUnmounted && ue())
                : ue();
            } else {
              const ue = (f.subTree = kn(f));
              O(null, ue, g, _, f, E, P), (h.el = ue.el);
            }
            if ((z && be(z, E), !Z && (L = $ && $.onVnodeMounted))) {
              const ue = h;
              be(() => Pe(L, re, ue), E);
            }
            (h.shapeFlag & 256 ||
              (re && Nt(re.vnode) && re.vnode.shapeFlag & 256)) &&
              f.a &&
              be(f.a, E),
              (f.isMounted = !0),
              (h = g = _ = null);
          }
        },
        T = (f.effect = new hr(w, () => Er(x), f.scope)),
        x = (f.update = () => T.run());
      (x.id = f.uid), nt(f, !0), x();
    },
    ne = (f, h, g) => {
      h.component = f;
      const _ = f.vnode.props;
      (f.vnode = h),
        (f.next = null),
        Ol(f, h.props, _, g),
        Hl(f, h.children, g),
        At(),
        Dr(),
        Ot();
    },
    X = (f, h, g, _, E, P, M, w, T = !1) => {
      const x = f && f.children,
        L = f ? f.shapeFlag : 0,
        k = h.children,
        { patchFlag: $, shapeFlag: j } = h;
      if ($ > 0) {
        if ($ & 128) {
          tt(x, k, g, _, E, P, M, w, T);
          return;
        } else if ($ & 256) {
          Ce(x, k, g, _, E, P, M, w, T);
          return;
        }
      }
      j & 8
        ? (L & 16 && S(x, E, P), k !== x && a(g, k))
        : L & 16
        ? j & 16
          ? tt(x, k, g, _, E, P, M, w, T)
          : S(x, E, P, !0)
        : (L & 8 && a(g, ''), j & 16 && D(k, g, _, E, P, M, w, T));
    },
    Ce = (f, h, g, _, E, P, M, w, T) => {
      (f = f || mt), (h = h || mt);
      const x = f.length,
        L = h.length,
        k = Math.min(x, L);
      let $;
      for ($ = 0; $ < k; $++) {
        const j = (h[$] = T ? Ye(h[$]) : Me(h[$]));
        O(f[$], j, g, null, E, P, M, w, T);
      }
      x > L ? S(f, E, P, !0, !1, k) : D(h, g, _, E, P, M, w, T, k);
    },
    tt = (f, h, g, _, E, P, M, w, T) => {
      let x = 0;
      const L = h.length;
      let k = f.length - 1,
        $ = L - 1;
      for (; x <= k && x <= $; ) {
        const j = f[x],
          z = (h[x] = T ? Ye(h[x]) : Me(h[x]));
        if (Ht(j, z)) O(j, z, g, null, E, P, M, w, T);
        else break;
        x++;
      }
      for (; x <= k && x <= $; ) {
        const j = f[k],
          z = (h[$] = T ? Ye(h[$]) : Me(h[$]));
        if (Ht(j, z)) O(j, z, g, null, E, P, M, w, T);
        else break;
        k--, $--;
      }
      if (x > k) {
        if (x <= $) {
          const j = $ + 1,
            z = j < L ? h[j].el : _;
          for (; x <= $; )
            O(null, (h[x] = T ? Ye(h[x]) : Me(h[x])), g, z, E, P, M, w, T), x++;
        }
      } else if (x > $) for (; x <= k; ) ye(f[x], E, P, !0), x++;
      else {
        const j = x,
          z = x,
          re = new Map();
        for (x = z; x <= $; x++) {
          const we = (h[x] = T ? Ye(h[x]) : Me(h[x]));
          we.key != null && re.set(we.key, x);
        }
        let Z,
          ue = 0;
        const Re = $ - z + 1;
        let at = !1,
          Sr = 0;
        const St = new Array(Re);
        for (x = 0; x < Re; x++) St[x] = 0;
        for (x = j; x <= k; x++) {
          const we = f[x];
          if (ue >= Re) {
            ye(we, E, P, !0);
            continue;
          }
          let $e;
          if (we.key != null) $e = re.get(we.key);
          else
            for (Z = z; Z <= $; Z++)
              if (St[Z - z] === 0 && Ht(we, h[Z])) {
                $e = Z;
                break;
              }
          $e === void 0
            ? ye(we, E, P, !0)
            : ((St[$e - z] = x + 1),
              $e >= Sr ? (Sr = $e) : (at = !0),
              O(we, h[$e], g, null, E, P, M, w, T),
              ue++);
        }
        const Hr = at ? $l(St) : mt;
        for (Z = Hr.length - 1, x = Re - 1; x >= 0; x--) {
          const we = z + x,
            $e = h[we],
            kr = we + 1 < L ? h[we + 1].el : _;
          St[x] === 0
            ? O(null, $e, g, kr, E, P, M, w, T)
            : at && (Z < 0 || x !== Hr[Z] ? Te($e, g, kr, 2) : Z--);
        }
      }
    },
    Te = (f, h, g, _, E = null) => {
      const { el: P, type: M, transition: w, children: T, shapeFlag: x } = f;
      if (x & 6) {
        Te(f.component.subTree, h, g, _);
        return;
      }
      if (x & 128) {
        f.suspense.move(h, g, _);
        return;
      }
      if (x & 64) {
        M.move(f, h, g, J);
        return;
      }
      if (M === Oe) {
        r(P, h, g);
        for (let k = 0; k < T.length; k++) Te(T[k], h, g, _);
        r(f.anchor, h, g);
        return;
      }
      if (M === cn) {
        H(f, h, g);
        return;
      }
      if (_ !== 2 && x & 1 && w)
        if (_ === 0) w.beforeEnter(P), r(P, h, g), be(() => w.enter(P), E);
        else {
          const { leave: k, delayLeave: $, afterLeave: j } = w,
            z = () => r(P, h, g),
            re = () => {
              k(P, () => {
                z(), j && j();
              });
            };
          $ ? $(P, z, re) : re();
        }
      else r(P, h, g);
    },
    ye = (f, h, g, _ = !1, E = !1) => {
      const {
        type: P,
        props: M,
        ref: w,
        children: T,
        dynamicChildren: x,
        shapeFlag: L,
        patchFlag: k,
        dirs: $
      } = f;
      if ((w != null && _n(w, null, g, f, !0), L & 256)) {
        h.ctx.deactivate(f);
        return;
      }
      const j = L & 1 && $,
        z = !Nt(f);
      let re;
      if ((z && (re = M && M.onVnodeBeforeUnmount) && Pe(re, h, f), L & 6))
        v(f.component, g, _);
      else {
        if (L & 128) {
          f.suspense.unmount(g, _);
          return;
        }
        j && Fe(f, null, h, 'beforeUnmount'),
          L & 64
            ? f.type.remove(f, h, g, E, J, _)
            : x && (P !== Oe || (k > 0 && k & 64))
            ? S(x, h, g, !1, !0)
            : ((P === Oe && k & 384) || (!E && L & 16)) && S(T, h, g),
          _ && ut(f);
      }
      ((z && (re = M && M.onVnodeUnmounted)) || j) &&
        be(() => {
          re && Pe(re, h, f), j && Fe(f, null, h, 'unmounted');
        }, g);
    },
    ut = (f) => {
      const { type: h, el: g, anchor: _, transition: E } = f;
      if (h === Oe) {
        Mr(g, _);
        return;
      }
      if (h === cn) {
        A(f);
        return;
      }
      const P = () => {
        s(g), E && !E.persisted && E.afterLeave && E.afterLeave();
      };
      if (f.shapeFlag & 1 && E && !E.persisted) {
        const { leave: M, delayLeave: w } = E,
          T = () => M(g, P);
        w ? w(f.el, P, T) : T();
      } else P();
    },
    Mr = (f, h) => {
      let g;
      for (; f !== h; ) (g = p(f)), s(f), (f = g);
      s(h);
    },
    v = (f, h, g) => {
      const { bum: _, scope: E, update: P, subTree: M, um: w } = f;
      _ && Hn(_),
        E.stop(),
        P && ((P.active = !1), ye(M, f, h, g)),
        w && be(w, h),
        be(() => {
          f.isUnmounted = !0;
        }, h),
        h &&
          h.pendingBranch &&
          !h.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === h.pendingId &&
          (h.deps--, h.deps === 0 && h.resolve());
    },
    S = (f, h, g, _ = !1, E = !1, P = 0) => {
      for (let M = P; M < f.length; M++) ye(f[M], h, g, _, E);
    },
    R = (f) =>
      f.shapeFlag & 6
        ? R(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : p(f.anchor || f.el),
    I = (f, h, g) => {
      f == null
        ? h._vnode && ye(h._vnode, null, null, !0)
        : O(h._vnode || null, f, h, null, null, null, g),
        Dr(),
        hn(),
        (h._vnode = f);
    },
    J = {
      p: O,
      um: ye,
      m: Te,
      r: ut,
      mt: N,
      mc: D,
      pc: X,
      pbc: te,
      n: R,
      o: e
    };
  let le, q;
  return (
    t && ([le, q] = t(J)), { render: I, hydrate: le, createApp: Rl(I, le) }
  );
}
function nt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function vo(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (U(r) && U(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = Ye(s[o])), (l.el = i.el)),
        n || vo(i, l)),
        l.type === vt && (l.el = i.el);
    }
}
function $l(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l);
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Fl = (e) => e.__isTeleport,
  Oe = Symbol.for('v-fgt'),
  vt = Symbol.for('v-txt'),
  Et = Symbol.for('v-cmt'),
  cn = Symbol.for('v-stc'),
  Bt = [];
let ke = null;
function Eo(e = !1) {
  Bt.push((ke = e ? null : []));
}
function Nl() {
  Bt.pop(), (ke = Bt[Bt.length - 1] || null);
}
let zt = 1;
function Zr(e) {
  zt += e;
}
function xo(e) {
  return (
    (e.dynamicChildren = zt > 0 ? ke || mt : null),
    Nl(),
    zt > 0 && ke && ke.push(e),
    e
  );
}
function jl(e, t, n, r, s, o) {
  return xo(On(e, t, n, r, s, o, !0));
}
function Bl(e, t, n, r, s) {
  return xo(ve(e, t, n, r, s, !0));
}
function Xn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const An = '__vInternal',
  wo = ({ key: e }) => e ?? null,
  fn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? he(e) || ge(e) || K(e)
        ? { i: He, r: e, k: t, f: !!n }
        : e
      : null
  );
function On(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Oe ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && wo(t),
    ref: t && fn(t),
    scopeId: no,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: He
  };
  return (
    l
      ? (Pr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= he(n) ? 8 : 16),
    zt > 0 &&
      !i &&
      ke &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      ke.push(c),
    c
  );
}
const ve = Ul;
function Ul(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === yl) && (e = Et), Xn(e))) {
    const l = xt(e, t, !0);
    return (
      n && Pr(l, n),
      zt > 0 &&
        !o &&
        ke &&
        (l.shapeFlag & 6 ? (ke[ke.indexOf(e)] = l) : ke.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Xl(e) && (e = e.__vccOpts), t)) {
    t = Dl(t);
    let { class: l, style: c } = t;
    l && !he(l) && (t.class = ar(l)),
      ce(c) && (qs(c) && !U(c) && (c = ae({}, c)), (t.style = ur(c)));
  }
  const i = he(e) ? 1 : sl(e) ? 128 : Fl(e) ? 64 : ce(e) ? 4 : K(e) ? 2 : 0;
  return On(e, t, n, r, s, i, o, !0);
}
function Dl(e) {
  return e ? (qs(e) || An in e ? ae({}, e) : e) : null;
}
function xt(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? Kl(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && wo(l),
    ref:
      t && t.ref ? (n && s ? (U(s) ? s.concat(fn(t)) : [s, fn(t)]) : fn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Oe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && xt(e.ssContent),
    ssFallback: e.ssFallback && xt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Po(e = ' ', t = 0) {
  return ve(vt, null, e, t);
}
function Me(e) {
  return e == null || typeof e == 'boolean'
    ? ve(Et)
    : U(e)
    ? ve(Oe, null, e.slice())
    : typeof e == 'object'
    ? Ye(e)
    : ve(vt, null, String(e));
}
function Ye(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : xt(e);
}
function Pr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (U(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Pr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(An in t)
        ? (t._ctx = He)
        : s === 3 &&
          He &&
          (He.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    K(t)
      ? ((t = { default: t, _ctx: He }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Po(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Kl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class')
        t.class !== r.class && (t.class = ar([t.class, r.class]));
      else if (s === 'style') t.style = ur([t.style, r.style]);
      else if (Jt(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(U(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function Pe(e, t, n, r = null) {
  Le(e, t, 7, [n, r]);
}
const Wl = ho();
let ql = 0;
function Vl(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Wl,
    o = {
      uid: ql++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new di(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: go(r, s),
      emitsOptions: to(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ie,
      inheritAttrs: r.inheritAttrs,
      ctx: ie,
      data: ie,
      props: ie,
      attrs: ie,
      slots: ie,
      refs: ie,
      setupState: ie,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Xi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let de = null,
  Cr,
  dt,
  es = '__VUE_INSTANCE_SETTERS__';
(dt = Dn()[es]) || (dt = Dn()[es] = []),
  dt.push((e) => (de = e)),
  (Cr = (e) => {
    dt.length > 1 ? dt.forEach((t) => t(e)) : dt[0](e);
  });
const wt = (e) => {
    Cr(e), e.scope.on();
  },
  ct = () => {
    de && de.scope.off(), Cr(null);
  };
function Co(e) {
  return e.vnode.shapeFlag & 4;
}
let Qt = !1;
function zl(e, t = !1) {
  Qt = t;
  const { props: n, children: r } = e.vnode,
    s = Co(e);
  Al(e, n, s, t), Sl(e, r);
  const o = s ? Ql(e, t) : void 0;
  return (Qt = !1), o;
}
function Ql(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Vs(new Proxy(e.ctx, vl)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Yl(e) : null);
    wt(e), At();
    const o = Ze(r, e, 0, [e.props, s]);
    if ((Ot(), ct(), Hs(o))) {
      if ((o.then(ct, ct), t))
        return o
          .then((i) => {
            ts(e, i, t);
          })
          .catch((i) => {
            Pn(i, e, 0);
          });
      e.asyncDep = o;
    } else ts(e, o, t);
  } else To(e, t);
}
function ts(e, t, n) {
  K(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ce(t) && (e.setupState = Gs(t)),
    To(e, n);
}
let ns;
function To(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && ns && !r.render) {
      const s = r.template || xr(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          u = ae(ae({ isCustomElement: o, delimiters: l }, i), c);
        r.render = ns(s, u);
      }
    }
    e.render = r.render || Ie;
  }
  wt(e), At(), El(e), Ot(), ct();
}
function Jl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ee(e, 'get', '$attrs'), t[n];
      }
    }))
  );
}
function Yl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Jl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Tr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Gs(Vs(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in jt) return jt[n](e);
        },
        has(t, n) {
          return n in t || n in jt;
        }
      }))
    );
}
function Gl(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Xl(e) {
  return K(e) && '__vccOpts' in e;
}
const je = (e, t) => Vi(e, t, Qt);
function Ro(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? ce(t) && !U(t)
      ? Xn(t)
        ? ve(e, null, [t])
        : ve(e, t)
      : ve(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Xn(n) && (n = [n]),
      ve(e, t, n));
}
const Zl = Symbol.for('v-scx'),
  ec = () => De(Zl),
  Ao = '3.3.4',
  tc = 'http://www.w3.org/2000/svg',
  ot = typeof document < 'u' ? document : null,
  rs = ot && ot.createElement('template'),
  nc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? ot.createElementNS(tc, e)
        : ot.createElement(e, n ? { is: n } : void 0);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          s.setAttribute('multiple', r.multiple),
        s
      );
    },
    createText: (e) => ot.createTextNode(e),
    createComment: (e) => ot.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ot.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        rs.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = rs.content;
        if (r) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild
      ];
    }
  };
function rc(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
function sc(e, t, n) {
  const r = e.style,
    s = he(n);
  if (n && !s) {
    if (t && !he(t)) for (const o in t) n[o] == null && Zn(r, o, '');
    for (const o in n) Zn(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'),
      '_vod' in e && (r.display = o);
  }
}
const ss = /\s*!important$/;
function Zn(e, t, n) {
  if (U(n)) n.forEach((r) => Zn(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = oc(e, t);
    ss.test(n)
      ? e.setProperty(Rt(r), n.replace(ss, ''), 'important')
      : (e[r] = n);
  }
}
const os = ['Webkit', 'Moz', 'ms'],
  Ln = {};
function oc(e, t) {
  const n = Ln[t];
  if (n) return n;
  let r = Be(t);
  if (r !== 'filter' && r in e) return (Ln[t] = r);
  r = xn(r);
  for (let s = 0; s < os.length; s++) {
    const o = os[s] + r;
    if (o in e) return (Ln[t] = o);
  }
  return t;
}
const is = 'http://www.w3.org/1999/xlink';
function ic(e, t, n, r, s) {
  if (r && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(is, t.slice(6, t.length))
      : e.setAttributeNS(is, t, n);
  else {
    const o = ai(t);
    n == null || (o && !ks(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? '' : n);
  }
}
function lc(e, t, n, r, s, o, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, s, o), (e[t] = n ?? '');
    return;
  }
  const l = e.tagName;
  if (t === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
    e._value = n;
    const u = l === 'OPTION' ? e.getAttribute('value') : e.value,
      a = n ?? '';
    u !== a && (e.value = a), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === '' || n == null) {
    const u = typeof e[t];
    u === 'boolean'
      ? (n = ks(n))
      : n == null && u === 'string'
      ? ((n = ''), (c = !0))
      : u === 'number' && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function cc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function fc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function uc(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = ac(t);
    if (r) {
      const u = (o[t] = pc(r, s));
      cc(e, l, u, c);
    } else i && (fc(e, l, i, c), (o[t] = void 0));
  }
}
const ls = /(?:Once|Passive|Capture)$/;
function ac(e) {
  let t;
  if (ls.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(ls)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Rt(e.slice(2)), t];
}
let $n = 0;
const dc = Promise.resolve(),
  hc = () => $n || (dc.then(() => ($n = 0)), ($n = Date.now()));
function pc(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Le(gc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = hc()), n;
}
function gc(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const cs = /^on[a-z]/,
  mc = (e, t, n, r, s = !1, o, i, l, c) => {
    t === 'class'
      ? rc(e, r, s)
      : t === 'style'
      ? sc(e, n, r)
      : Jt(t)
      ? ir(t) || uc(e, t, n, r, i)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : _c(e, t, r, s)
        )
      ? lc(e, t, r, o, i, l, c)
      : (t === 'true-value'
          ? (e._trueValue = r)
          : t === 'false-value' && (e._falseValue = r),
        ic(e, t, r, s));
  };
function _c(e, t, n, r) {
  return r
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && cs.test(t) && K(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (cs.test(t) && he(n))
    ? !1
    : t in e;
}
const Oo = ae({ patchProp: mc }, nc);
let Ut,
  fs = !1;
function yc() {
  return Ut || (Ut = Il(Oo));
}
function bc() {
  return (Ut = fs ? Ut : Ll(Oo)), (fs = !0), Ut;
}
const vc = (...e) => {
    const t = yc().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Mo(r);
        if (!s) return;
        const o = t._component;
        !K(o) && !o.render && !o.template && (o.template = s.innerHTML),
          (s.innerHTML = '');
        const i = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
          i
        );
      }),
      t
    );
  },
  Ec = (...e) => {
    const t = bc().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Mo(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function Mo(e) {
  return he(e) ? document.querySelector(e) : e;
}
const xc = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  wc = {};
function Pc(e, t) {
  const n = _l('router-view');
  return Eo(), Bl(n);
}
const Cc = xc(wc, [['render', Pc]]),
  Tc = 'modulepreload',
  Rc = function (e) {
    return '/' + e;
  },
  us = {},
  Rr = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      n.map((o) => {
        if (((o = Rc(o)), o in us)) return;
        us[o] = !0;
        const i = o.endsWith('.css'),
          l = i ? '[rel="stylesheet"]' : '';
        if (r)
          for (let a = s.length - 1; a >= 0; a--) {
            const d = s[a];
            if (d.href === o && (!i || d.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${o}"]${l}`)) return;
        const u = document.createElement('link');
        if (
          ((u.rel = i ? 'stylesheet' : Tc),
          i || ((u.as = 'script'), (u.crossOrigin = '')),
          (u.href = o),
          document.head.appendChild(u),
          i)
        )
          return new Promise((a, d) => {
            u.addEventListener('load', a),
              u.addEventListener('error', () =>
                d(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((o) => {
        const i = new Event('vite:preloadError', { cancelable: !0 });
        if (((i.payload = o), window.dispatchEvent(i), !i.defaultPrevented))
          throw o;
      });
  },
  Ac = { class: 'markdown-body' },
  Oc = On('h1', null, 'Hi, Markdown', -1),
  Mc = On('p', null, 'This is a markdown page.', -1),
  Sc = [Oc, Mc],
  Hc = Tn({
    __name: 'index',
    setup(e, { expose: t }) {
      return (
        t({ frontmatter: {}, excerpt: void 0 }),
        (n, r) => (Eo(), jl('div', Ac, Sc))
      );
    }
  }),
  kc = () => Rr(() => import('./index-95568411.js'), []),
  Ic = () => Rr(() => import('./index-6e2c92c1.js'), []),
  Lc = () => Rr(() => import('./cooking-ef423b24.js'), []),
  $c = [
    {
      name: 'technology',
      path: '/technology',
      component: kc,
      props: !0,
      meta: { frontmatter: {} }
    },
    {
      name: 'life',
      path: '/life',
      component: Ic,
      props: !0,
      meta: { frontmatter: {} }
    },
    {
      name: 'life-cooking',
      path: '/life/cooking',
      component: Lc,
      props: !0,
      meta: { frontmatter: {} }
    },
    {
      name: 'index',
      path: '/',
      component: Hc,
      props: !0,
      meta: { frontmatter: {} }
    }
  ];
/*!
 * vue-router v4.0.13
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const So =
    typeof Symbol == 'function' && typeof Symbol.toStringTag == 'symbol',
  Mt = (e) => (So ? Symbol(e) : '_vr_' + e),
  Fc = Mt('rvlm'),
  as = Mt('rvd'),
  Ar = Mt('r'),
  Ho = Mt('rl'),
  er = Mt('rvl'),
  pt = typeof window < 'u';
function Nc(e) {
  return e.__esModule || (So && e[Symbol.toStringTag] === 'Module');
}
const ee = Object.assign;
function Fn(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Array.isArray(s) ? s.map(e) : e(s);
  }
  return n;
}
const Dt = () => {},
  jc = /\/$/,
  Bc = (e) => e.replace(jc, '');
function Nn(e, t, n = '/') {
  let r,
    s = {},
    o = '',
    i = '';
  const l = t.indexOf('?'),
    c = t.indexOf('#', l > -1 ? l : 0);
  return (
    l > -1 &&
      ((r = t.slice(0, l)),
      (o = t.slice(l + 1, c > -1 ? c : t.length)),
      (s = e(o))),
    c > -1 && ((r = r || t.slice(0, c)), (i = t.slice(c, t.length))),
    (r = Wc(r ?? t, n)),
    { fullPath: r + (o && '?') + o + i, path: r, query: s, hash: i }
  );
}
function Uc(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function ds(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function Dc(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    Pt(t.matched[r], n.matched[s]) &&
    ko(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Pt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ko(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Kc(e[n], t[n])) return !1;
  return !0;
}
function Kc(e, t) {
  return Array.isArray(e) ? hs(e, t) : Array.isArray(t) ? hs(t, e) : e === t;
}
function hs(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Wc(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/');
  let s = n.length - 1,
    o,
    i;
  for (o = 0; o < r.length; o++)
    if (((i = r[o]), !(s === 1 || i === '.')))
      if (i === '..') s--;
      else break;
  return (
    n.slice(0, s).join('/') +
    '/' +
    r.slice(o - (o === r.length ? 1 : 0)).join('/')
  );
}
var Ct;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(Ct || (Ct = {}));
var ft;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(ft || (ft = {}));
const jn = '';
function Io(e) {
  if (!e)
    if (pt) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), Bc(e);
}
const qc = /^[^#]+#/;
function Lo(e, t) {
  return e.replace(qc, '#') + t;
}
function Vc(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  };
}
const Mn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function zc(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = Vc(s, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function ps(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const tr = new Map();
function Qc(e, t) {
  tr.set(e, t);
}
function Jc(e) {
  const t = tr.get(e);
  return tr.delete(e), t;
}
let Yc = () => location.protocol + '//' + location.host;
function $o(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf('#');
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = s.slice(l);
    return c[0] !== '/' && (c = '/' + c), ds(c, '');
  }
  return ds(n, e) + r + s;
}
function Gc(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const l = ({ state: p }) => {
    const b = $o(e, location),
      C = n.value,
      O = t.value;
    let F = 0;
    if (p) {
      if (((n.value = b), (t.value = p), i && i === C)) {
        i = null;
        return;
      }
      F = O ? p.position - O.position : 0;
    } else r(b);
    s.forEach((m) => {
      m(n.value, C, {
        delta: F,
        type: Ct.pop,
        direction: F ? (F > 0 ? ft.forward : ft.back) : ft.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(p) {
    s.push(p);
    const b = () => {
      const C = s.indexOf(p);
      C > -1 && s.splice(C, 1);
    };
    return o.push(b), b;
  }
  function a() {
    const { history: p } = window;
    p.state && p.replaceState(ee({}, p.state, { scroll: Mn() }), '');
  }
  function d() {
    for (const p of o) p();
    (o = []),
      window.removeEventListener('popstate', l),
      window.removeEventListener('beforeunload', a);
  }
  return (
    window.addEventListener('popstate', l),
    window.addEventListener('beforeunload', a),
    { pauseListeners: c, listen: u, destroy: d }
  );
}
function gs(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Mn() : null
  };
}
function Xc(e) {
  const { history: t, location: n } = window,
    r = { value: $o(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
      },
      !0
    );
  function o(c, u, a) {
    const d = e.indexOf('#'),
      p =
        d > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(d)) + c
          : Yc() + e + c;
    try {
      t[a ? 'replaceState' : 'pushState'](u, '', p), (s.value = u);
    } catch (b) {
      console.error(b), n[a ? 'replace' : 'assign'](p);
    }
  }
  function i(c, u) {
    const a = ee({}, t.state, gs(s.value.back, c, s.value.forward, !0), u, {
      position: s.value.position
    });
    o(c, a, !0), (r.value = c);
  }
  function l(c, u) {
    const a = ee({}, s.value, t.state, { forward: c, scroll: Mn() });
    o(a.current, a, !0);
    const d = ee({}, gs(r.value, c, null), { position: a.position + 1 }, u);
    o(c, d, !1), (r.value = c);
  }
  return { location: r, state: s, push: l, replace: i };
}
function Zc(e) {
  e = Io(e);
  const t = Xc(e),
    n = Gc(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = ee(
    { location: '', base: e, go: r, createHref: Lo.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, 'location', {
      enumerable: !0,
      get: () => t.location.value
    }),
    Object.defineProperty(s, 'state', {
      enumerable: !0,
      get: () => t.state.value
    }),
    s
  );
}
function ef(e = '') {
  let t = [],
    n = [jn],
    r = 0;
  e = Io(e);
  function s(l) {
    r++, r === n.length || n.splice(r), n.push(l);
  }
  function o(l, c, { direction: u, delta: a }) {
    const d = { direction: u, delta: a, type: Ct.pop };
    for (const p of t) p(l, c, d);
  }
  const i = {
    location: jn,
    state: {},
    base: e,
    createHref: Lo.bind(null, e),
    replace(l) {
      n.splice(r--, 1), s(l);
    },
    push(l, c) {
      s(l);
    },
    listen(l) {
      return (
        t.push(l),
        () => {
          const c = t.indexOf(l);
          c > -1 && t.splice(c, 1);
        }
      );
    },
    destroy() {
      (t = []), (n = [jn]), (r = 0);
    },
    go(l, c = !0) {
      const u = this.location,
        a = l < 0 ? ft.back : ft.forward;
      (r = Math.max(0, Math.min(r + l, n.length - 1))),
        c && o(this.location, u, { direction: a, delta: l });
    }
  };
  return (
    Object.defineProperty(i, 'location', { enumerable: !0, get: () => n[r] }), i
  );
}
function tf(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function Fo(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const ze = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  No = Mt('nf');
var ms;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(ms || (ms = {}));
function Tt(e, t) {
  return ee(new Error(), { type: e, [No]: !0 }, t);
}
function Qe(e, t) {
  return e instanceof Error && No in e && (t == null || !!(e.type & t));
}
const _s = '[^/]+?',
  nf = { sensitive: !1, strict: !1, start: !0, end: !0 },
  rf = /[.+*?^${}()[\]/\\]/g;
function sf(e, t) {
  const n = ee({}, nf, t),
    r = [];
  let s = n.start ? '^' : '';
  const o = [];
  for (const u of e) {
    const a = u.length ? [] : [90];
    n.strict && !u.length && (s += '/');
    for (let d = 0; d < u.length; d++) {
      const p = u[d];
      let b = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        d || (s += '/'), (s += p.value.replace(rf, '\\$&')), (b += 40);
      else if (p.type === 1) {
        const { value: C, repeatable: O, optional: F, regexp: m } = p;
        o.push({ name: C, repeatable: O, optional: F });
        const y = m || _s;
        if (y !== _s) {
          b += 10;
          try {
            new RegExp(`(${y})`);
          } catch (A) {
            throw new Error(
              `Invalid custom RegExp for param "${C}" (${y}): ` + A.message
            );
          }
        }
        let H = O ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        d || (H = F && u.length < 2 ? `(?:/${H})` : '/' + H),
          F && (H += '?'),
          (s += H),
          (b += 20),
          F && (b += -8),
          O && (b += -20),
          y === '.*' && (b += -50);
      }
      a.push(b);
    }
    r.push(a);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += '/?'), n.end ? (s += '$') : n.strict && (s += '(?:/|$)');
  const i = new RegExp(s, n.sensitive ? '' : 'i');
  function l(u) {
    const a = u.match(i),
      d = {};
    if (!a) return null;
    for (let p = 1; p < a.length; p++) {
      const b = a[p] || '',
        C = o[p - 1];
      d[C.name] = b && C.repeatable ? b.split('/') : b;
    }
    return d;
  }
  function c(u) {
    let a = '',
      d = !1;
    for (const p of e) {
      (!d || !a.endsWith('/')) && (a += '/'), (d = !1);
      for (const b of p)
        if (b.type === 0) a += b.value;
        else if (b.type === 1) {
          const { value: C, repeatable: O, optional: F } = b,
            m = C in u ? u[C] : '';
          if (Array.isArray(m) && !O)
            throw new Error(
              `Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`
            );
          const y = Array.isArray(m) ? m.join('/') : m;
          if (!y)
            if (F)
              p.length < 2 &&
                (a.endsWith('/') ? (a = a.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${C}"`);
          a += y;
        }
    }
    return a;
  }
  return { re: i, score: r, keys: o, parse: l, stringify: c };
}
function of(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function lf(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = of(r[n], s[n]);
    if (o) return o;
    n++;
  }
  return s.length - r.length;
}
const cf = { type: 0, value: '' },
  ff = /[a-zA-Z0-9_]/;
function uf(e) {
  if (!e) return [[]];
  if (e === '/') return [[cf]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(b) {
    throw new Error(`ERR (${n})/"${u}": ${b}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let l = 0,
    c,
    u = '',
    a = '';
  function d() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (c === '*' || c === '+') &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: u,
            regexp: a,
            repeatable: c === '*' || c === '+',
            optional: c === '*' || c === '?'
          }))
        : t('Invalid state to consume buffer'),
      (u = ''));
  }
  function p() {
    u += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === '/' ? (u && d(), i()) : c === ':' ? (d(), (n = 1)) : p();
        break;
      case 4:
        p(), (n = r);
        break;
      case 1:
        c === '('
          ? (n = 2)
          : ff.test(c)
          ? p()
          : (d(), (n = 0), c !== '*' && c !== '?' && c !== '+' && l--);
        break;
      case 2:
        c === ')'
          ? a[a.length - 1] == '\\'
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        d(), (n = 0), c !== '*' && c !== '?' && c !== '+' && l--, (a = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), d(), i(), s;
}
function af(e, t, n) {
  const r = sf(uf(e.path), n),
    s = ee(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function df(e, t) {
  const n = [],
    r = new Map();
  t = bs({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(a) {
    return r.get(a);
  }
  function o(a, d, p) {
    const b = !p,
      C = pf(a);
    C.aliasOf = p && p.record;
    const O = bs(t, a),
      F = [C];
    if ('alias' in a) {
      const H = typeof a.alias == 'string' ? [a.alias] : a.alias;
      for (const A of H)
        F.push(
          ee({}, C, {
            components: p ? p.record.components : C.components,
            path: A,
            aliasOf: p ? p.record : C
          })
        );
    }
    let m, y;
    for (const H of F) {
      const { path: A } = H;
      if (d && A[0] !== '/') {
        const W = d.record.path,
          V = W[W.length - 1] === '/' ? '' : '/';
        H.path = d.record.path + (A && V + A);
      }
      if (
        ((m = af(H, d, O)),
        p
          ? p.alias.push(m)
          : ((y = y || m),
            y !== m && y.alias.push(m),
            b && a.name && !ys(m) && i(a.name)),
        'children' in C)
      ) {
        const W = C.children;
        for (let V = 0; V < W.length; V++) o(W[V], m, p && p.children[V]);
      }
      (p = p || m), c(m);
    }
    return y
      ? () => {
          i(y);
        }
      : Dt;
  }
  function i(a) {
    if (Fo(a)) {
      const d = r.get(a);
      d &&
        (r.delete(a),
        n.splice(n.indexOf(d), 1),
        d.children.forEach(i),
        d.alias.forEach(i));
    } else {
      const d = n.indexOf(a);
      d > -1 &&
        (n.splice(d, 1),
        a.record.name && r.delete(a.record.name),
        a.children.forEach(i),
        a.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(a) {
    let d = 0;
    for (
      ;
      d < n.length &&
      lf(a, n[d]) >= 0 &&
      (a.record.path !== n[d].record.path || !jo(a, n[d]));

    )
      d++;
    n.splice(d, 0, a), a.record.name && !ys(a) && r.set(a.record.name, a);
  }
  function u(a, d) {
    let p,
      b = {},
      C,
      O;
    if ('name' in a && a.name) {
      if (((p = r.get(a.name)), !p)) throw Tt(1, { location: a });
      (O = p.record.name),
        (b = ee(
          hf(
            d.params,
            p.keys.filter((y) => !y.optional).map((y) => y.name)
          ),
          a.params
        )),
        (C = p.stringify(b));
    } else if ('path' in a)
      (C = a.path),
        (p = n.find((y) => y.re.test(C))),
        p && ((b = p.parse(C)), (O = p.record.name));
    else {
      if (((p = d.name ? r.get(d.name) : n.find((y) => y.re.test(d.path))), !p))
        throw Tt(1, { location: a, currentLocation: d });
      (O = p.record.name),
        (b = ee({}, d.params, a.params)),
        (C = p.stringify(b));
    }
    const F = [];
    let m = p;
    for (; m; ) F.unshift(m.record), (m = m.parent);
    return { name: O, path: C, params: b, matched: F, meta: mf(F) };
  }
  return (
    e.forEach((a) => o(a)),
    {
      addRoute: o,
      resolve: u,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: s
    }
  );
}
function hf(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function pf(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: gf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e ? e.components || {} : { default: e.component }
  };
}
function gf(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'boolean' ? n : n[r];
  return t;
}
function ys(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function mf(e) {
  return e.reduce((t, n) => ee(t, n.meta), {});
}
function bs(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function jo(e, t) {
  return t.children.some((n) => n === e || jo(e, n));
}
const Bo = /#/g,
  _f = /&/g,
  yf = /\//g,
  bf = /=/g,
  vf = /\?/g,
  Uo = /\+/g,
  Ef = /%5B/g,
  xf = /%5D/g,
  Do = /%5E/g,
  wf = /%60/g,
  Ko = /%7B/g,
  Pf = /%7C/g,
  Wo = /%7D/g,
  Cf = /%20/g;
function Or(e) {
  return encodeURI('' + e)
    .replace(Pf, '|')
    .replace(Ef, '[')
    .replace(xf, ']');
}
function Tf(e) {
  return Or(e).replace(Ko, '{').replace(Wo, '}').replace(Do, '^');
}
function nr(e) {
  return Or(e)
    .replace(Uo, '%2B')
    .replace(Cf, '+')
    .replace(Bo, '%23')
    .replace(_f, '%26')
    .replace(wf, '`')
    .replace(Ko, '{')
    .replace(Wo, '}')
    .replace(Do, '^');
}
function Rf(e) {
  return nr(e).replace(bf, '%3D');
}
function Af(e) {
  return Or(e).replace(Bo, '%23').replace(vf, '%3F');
}
function Of(e) {
  return e == null ? '' : Af(e).replace(yf, '%2F');
}
function yn(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
function Mf(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(Uo, ' '),
      i = o.indexOf('='),
      l = yn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : yn(o.slice(i + 1));
    if (l in t) {
      let u = t[l];
      Array.isArray(u) || (u = t[l] = [u]), u.push(c);
    } else t[l] = c;
  }
  return t;
}
function vs(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = Rf(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (Array.isArray(r) ? r.map((o) => o && nr(o)) : [r && nr(r)]).forEach(
      (o) => {
        o !== void 0 &&
          ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o));
      }
    );
  }
  return t;
}
function Sf(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Array.isArray(r)
        ? r.map((s) => (s == null ? null : '' + s))
        : r == null
        ? r
        : '' + r);
  }
  return t;
}
function kt() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function Ge(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((i, l) => {
      const c = (d) => {
          d === !1
            ? l(Tt(4, { from: n, to: t }))
            : d instanceof Error
            ? l(d)
            : tf(d)
            ? l(Tt(2, { from: t, to: d }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof d == 'function' &&
                o.push(d),
              i());
        },
        u = e.call(r && r.instances[s], t, n, c);
      let a = Promise.resolve(u);
      e.length < 3 && (a = a.then(c)), a.catch((d) => l(d));
    });
}
function Bn(e, t, n, r) {
  const s = [];
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i];
      if (!(t !== 'beforeRouteEnter' && !o.instances[i]))
        if (Hf(l)) {
          const u = (l.__vccOpts || l)[t];
          u && s.push(Ge(u, n, r, o, i));
        } else {
          let c = l();
          s.push(() =>
            c.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const a = Nc(u) ? u.default : u;
              o.components[i] = a;
              const p = (a.__vccOpts || a)[t];
              return p && Ge(p, n, r, o, i)();
            })
          );
        }
    }
  return s;
}
function Hf(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function Es(e) {
  const t = De(Ar),
    n = De(Ho),
    r = je(() => t.resolve(lt(e.to))),
    s = je(() => {
      const { matched: c } = r.value,
        { length: u } = c,
        a = c[u - 1],
        d = n.matched;
      if (!a || !d.length) return -1;
      const p = d.findIndex(Pt.bind(null, a));
      if (p > -1) return p;
      const b = xs(c[u - 2]);
      return u > 1 && xs(a) === b && d[d.length - 1].path !== b
        ? d.findIndex(Pt.bind(null, c[u - 2]))
        : p;
    }),
    o = je(() => s.value > -1 && $f(n.params, r.value.params)),
    i = je(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        ko(n.params, r.value.params)
    );
  function l(c = {}) {
    return Lf(c)
      ? t[lt(e.replace) ? 'replace' : 'push'](lt(e.to)).catch(Dt)
      : Promise.resolve();
  }
  return {
    route: r,
    href: je(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l
  };
}
const kf = Tn({
    name: 'RouterLink',
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' }
    },
    useLink: Es,
    setup(e, { slots: t }) {
      const n = Yt(Es(e)),
        { options: r } = De(Ar),
        s = je(() => ({
          [ws(e.activeClass, r.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [ws(
            e.exactActiveClass,
            r.linkExactActiveClass,
            'router-link-exact-active'
          )]: n.isExactActive
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Ro(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
              },
              o
            );
      };
    }
  }),
  If = kf;
function Lf(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function $f(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == 'string') {
      if (r !== s) return !1;
    } else if (
      !Array.isArray(s) ||
      s.length !== r.length ||
      r.some((o, i) => o !== s[i])
    )
      return !1;
  }
  return !0;
}
function xs(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const ws = (e, t, n) => e ?? t ?? n,
  Ff = Tn({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    setup(e, { attrs: t, slots: n }) {
      const r = De(er),
        s = je(() => e.route || r.value),
        o = De(as, 0),
        i = je(() => s.value.matched[o]);
      ln(as, o + 1), ln(Fc, i), ln(er, s);
      const l = Js();
      return (
        on(
          () => [l.value, i.value, e.name],
          ([c, u, a], [d, p, b]) => {
            u &&
              ((u.instances[a] = c),
              p &&
                p !== u &&
                c &&
                c === d &&
                (u.leaveGuards.size || (u.leaveGuards = p.leaveGuards),
                u.updateGuards.size || (u.updateGuards = p.updateGuards))),
              c &&
                u &&
                (!p || !Pt(u, p) || !d) &&
                (u.enterCallbacks[a] || []).forEach((C) => C(c));
          },
          { flush: 'post' }
        ),
        () => {
          const c = s.value,
            u = i.value,
            a = u && u.components[e.name],
            d = e.name;
          if (!a) return Ps(n.default, { Component: a, route: c });
          const p = u.props[e.name],
            b = p
              ? p === !0
                ? c.params
                : typeof p == 'function'
                ? p(c)
                : p
              : null,
            O = Ro(
              a,
              ee({}, b, t, {
                onVnodeUnmounted: (F) => {
                  F.component.isUnmounted && (u.instances[d] = null);
                },
                ref: l
              })
            );
          return Ps(n.default, { Component: O, route: c }) || O;
        }
      );
    }
  });
function Ps(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Nf = Ff;
function jf(e) {
  const t = df(e.routes, e),
    n = e.parseQuery || Mf,
    r = e.stringifyQuery || vs,
    s = e.history,
    o = kt(),
    i = kt(),
    l = kt(),
    c = Di(ze);
  let u = ze;
  pt &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const a = Fn.bind(null, (v) => '' + v),
    d = Fn.bind(null, Of),
    p = Fn.bind(null, yn);
  function b(v, S) {
    let R, I;
    return (
      Fo(v) ? ((R = t.getRecordMatcher(v)), (I = S)) : (I = v), t.addRoute(I, R)
    );
  }
  function C(v) {
    const S = t.getRecordMatcher(v);
    S && t.removeRoute(S);
  }
  function O() {
    return t.getRoutes().map((v) => v.record);
  }
  function F(v) {
    return !!t.getRecordMatcher(v);
  }
  function m(v, S) {
    if (((S = ee({}, S || c.value)), typeof v == 'string')) {
      const f = Nn(n, v, S.path),
        h = t.resolve({ path: f.path }, S),
        g = s.createHref(f.fullPath);
      return ee(f, h, {
        params: p(h.params),
        hash: yn(f.hash),
        redirectedFrom: void 0,
        href: g
      });
    }
    let R;
    if ('path' in v) R = ee({}, v, { path: Nn(n, v.path, S.path).path });
    else {
      const f = ee({}, v.params);
      for (const h in f) f[h] == null && delete f[h];
      (R = ee({}, v, { params: d(v.params) })), (S.params = d(S.params));
    }
    const I = t.resolve(R, S),
      J = v.hash || '';
    I.params = a(p(I.params));
    const le = Uc(r, ee({}, v, { hash: Tf(J), path: I.path })),
      q = s.createHref(le);
    return ee(
      { fullPath: le, hash: J, query: r === vs ? Sf(v.query) : v.query || {} },
      I,
      { redirectedFrom: void 0, href: q }
    );
  }
  function y(v) {
    return typeof v == 'string' ? Nn(n, v, c.value.path) : ee({}, v);
  }
  function H(v, S) {
    if (u !== v) return Tt(8, { from: S, to: v });
  }
  function A(v) {
    return B(v);
  }
  function W(v) {
    return A(ee(y(v), { replace: !0 }));
  }
  function V(v) {
    const S = v.matched[v.matched.length - 1];
    if (S && S.redirect) {
      const { redirect: R } = S;
      let I = typeof R == 'function' ? R(v) : R;
      return (
        typeof I == 'string' &&
          ((I = I.includes('?') || I.includes('#') ? (I = y(I)) : { path: I }),
          (I.params = {})),
        ee({ query: v.query, hash: v.hash, params: v.params }, I)
      );
    }
  }
  function B(v, S) {
    const R = (u = m(v)),
      I = c.value,
      J = v.state,
      le = v.force,
      q = v.replace === !0,
      f = V(R);
    if (f) return B(ee(y(f), { state: J, force: le, replace: q }), S || R);
    const h = R;
    h.redirectedFrom = S;
    let g;
    return (
      !le &&
        Dc(r, I, R) &&
        ((g = Tt(16, { to: h, from: I })), tt(I, I, !0, !1)),
      (g ? Promise.resolve(g) : se(h, I))
        .catch((_) => (Qe(_) ? (Qe(_, 2) ? _ : Ce(_)) : ne(_, h, I)))
        .then((_) => {
          if (_) {
            if (Qe(_, 2))
              return B(
                ee(y(_.to), { state: J, force: le, replace: q }),
                S || h
              );
          } else _ = oe(h, I, !0, q, J);
          return te(h, I, _), _;
        })
    );
  }
  function D(v, S) {
    const R = H(v, S);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function se(v, S) {
    let R;
    const [I, J, le] = Bf(v, S);
    R = Bn(I.reverse(), 'beforeRouteLeave', v, S);
    for (const f of I)
      f.leaveGuards.forEach((h) => {
        R.push(Ge(h, v, S));
      });
    const q = D.bind(null, v, S);
    return (
      R.push(q),
      ht(R)
        .then(() => {
          R = [];
          for (const f of o.list()) R.push(Ge(f, v, S));
          return R.push(q), ht(R);
        })
        .then(() => {
          R = Bn(J, 'beforeRouteUpdate', v, S);
          for (const f of J)
            f.updateGuards.forEach((h) => {
              R.push(Ge(h, v, S));
            });
          return R.push(q), ht(R);
        })
        .then(() => {
          R = [];
          for (const f of v.matched)
            if (f.beforeEnter && !S.matched.includes(f))
              if (Array.isArray(f.beforeEnter))
                for (const h of f.beforeEnter) R.push(Ge(h, v, S));
              else R.push(Ge(f.beforeEnter, v, S));
          return R.push(q), ht(R);
        })
        .then(
          () => (
            v.matched.forEach((f) => (f.enterCallbacks = {})),
            (R = Bn(le, 'beforeRouteEnter', v, S)),
            R.push(q),
            ht(R)
          )
        )
        .then(() => {
          R = [];
          for (const f of i.list()) R.push(Ge(f, v, S));
          return R.push(q), ht(R);
        })
        .catch((f) => (Qe(f, 8) ? f : Promise.reject(f)))
    );
  }
  function te(v, S, R) {
    for (const I of l.list()) I(v, S, R);
  }
  function oe(v, S, R, I, J) {
    const le = H(v, S);
    if (le) return le;
    const q = S === ze,
      f = pt ? history.state : {};
    R &&
      (I || q
        ? s.replace(v.fullPath, ee({ scroll: q && f && f.scroll }, J))
        : s.push(v.fullPath, J)),
      (c.value = v),
      tt(v, S, R, q),
      Ce();
  }
  let _e;
  function fe() {
    _e = s.listen((v, S, R) => {
      const I = m(v),
        J = V(I);
      if (J) {
        B(ee(J, { replace: !0 }), I).catch(Dt);
        return;
      }
      u = I;
      const le = c.value;
      pt && Qc(ps(le.fullPath, R.delta), Mn()),
        se(I, le)
          .catch((q) =>
            Qe(q, 12)
              ? q
              : Qe(q, 2)
              ? (B(q.to, I)
                  .then((f) => {
                    Qe(f, 20) && !R.delta && R.type === Ct.pop && s.go(-1, !1);
                  })
                  .catch(Dt),
                Promise.reject())
              : (R.delta && s.go(-R.delta, !1), ne(q, I, le))
          )
          .then((q) => {
            (q = q || oe(I, le, !1)),
              q &&
                (R.delta
                  ? s.go(-R.delta, !1)
                  : R.type === Ct.pop && Qe(q, 20) && s.go(-1, !1)),
              te(I, le, q);
          })
          .catch(Dt);
    });
  }
  let N = kt(),
    xe = kt(),
    G;
  function ne(v, S, R) {
    Ce(v);
    const I = xe.list();
    return (
      I.length ? I.forEach((J) => J(v, S, R)) : console.error(v),
      Promise.reject(v)
    );
  }
  function X() {
    return G && c.value !== ze
      ? Promise.resolve()
      : new Promise((v, S) => {
          N.add([v, S]);
        });
  }
  function Ce(v) {
    return (
      G ||
        ((G = !v),
        fe(),
        N.list().forEach(([S, R]) => (v ? R(v) : S())),
        N.reset()),
      v
    );
  }
  function tt(v, S, R, I) {
    const { scrollBehavior: J } = e;
    if (!pt || !J) return Promise.resolve();
    const le =
      (!R && Jc(ps(v.fullPath, 0))) ||
      ((I || !R) && history.state && history.state.scroll) ||
      null;
    return vr()
      .then(() => J(v, S, le))
      .then((q) => q && zc(q))
      .catch((q) => ne(q, v, S));
  }
  const Te = (v) => s.go(v);
  let ye;
  const ut = new Set();
  return {
    currentRoute: c,
    addRoute: b,
    removeRoute: C,
    hasRoute: F,
    getRoutes: O,
    resolve: m,
    options: e,
    push: A,
    replace: W,
    go: Te,
    back: () => Te(-1),
    forward: () => Te(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: xe.add,
    isReady: X,
    install(v) {
      const S = this;
      v.component('RouterLink', If),
        v.component('RouterView', Nf),
        (v.config.globalProperties.$router = S),
        Object.defineProperty(v.config.globalProperties, '$route', {
          enumerable: !0,
          get: () => lt(c)
        }),
        pt &&
          !ye &&
          c.value === ze &&
          ((ye = !0), A(s.location).catch((J) => {}));
      const R = {};
      for (const J in ze) R[J] = je(() => c.value[J]);
      v.provide(Ar, S), v.provide(Ho, Yt(R)), v.provide(er, c);
      const I = v.unmount;
      ut.add(v),
        (v.unmount = function () {
          ut.delete(v),
            ut.size < 1 &&
              ((u = ze), _e && _e(), (c.value = ze), (ye = !1), (G = !1)),
            I();
        });
    }
  };
}
function ht(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Bf(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => Pt(u, l)) ? r.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((u) => Pt(u, c)) || s.push(c));
  }
  return [n, r, s];
}
function rr(e, t = {}, n) {
  for (const r in e) {
    const s = e[r],
      o = n ? `${n}:${r}` : r;
    typeof s == 'object' && s !== null
      ? rr(s, t, o)
      : typeof s == 'function' && (t[o] = s);
  }
  return t;
}
const Uf = { run: (e) => e() },
  Df = () => Uf,
  qo = typeof console.createTask < 'u' ? console.createTask : Df;
function Kf(e, t) {
  const n = t.shift(),
    r = qo(n);
  return e.reduce(
    (s, o) => s.then(() => r.run(() => o(...t))),
    Promise.resolve()
  );
}
function Wf(e, t) {
  const n = t.shift(),
    r = qo(n);
  return Promise.all(e.map((s) => r.run(() => s(...t))));
}
function Un(e, t) {
  for (const n of [...e]) n(t);
}
class qf {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != 'function') return () => {};
    const s = t;
    let o;
    for (; this._deprecatedHooks[t]; )
      (o = this._deprecatedHooks[t]), (t = o.to);
    if (o && !r.allowDeprecated) {
      let i = o.message;
      i ||
        (i =
          `${s} hook has been deprecated` +
          (o.to ? `, please use ${o.to}` : '')),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(i) ||
          (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, 'name', {
          get: () => '_' + t.replace(/\W+/g, '_') + '_hook_cb',
          configurable: !0
        });
      } catch {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      s = (...o) => (
        typeof r == 'function' && r(), (r = void 0), (s = void 0), n(...o)
      );
    return (r = this.hook(t, s)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == 'string' ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const s of r) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = rr(t),
      r = Object.keys(n).map((s) => this.hook(s, n[s]));
    return () => {
      for (const s of r.splice(0, r.length)) s();
    };
  }
  removeHooks(t) {
    const n = rr(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Kf, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Wf, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const s =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Un(this._before, s);
    const o = t(n in this._hooks ? [...this._hooks[n]] : [], r);
    return o instanceof Promise
      ? o.finally(() => {
          this._after && s && Un(this._after, s);
        })
      : (this._after && s && Un(this._after, s), o);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function Vf() {
  return new qf();
}
function zf(e) {
  return Array.isArray(e) ? e : [e];
}
const Qf = ['title', 'titleTemplate', 'script', 'style', 'noscript'],
  un = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
  Jf = [
    'title',
    'titleTemplate',
    'templateParams',
    'base',
    'htmlAttrs',
    'bodyAttrs',
    'meta',
    'link',
    'style',
    'script',
    'noscript'
  ],
  Yf = [
    'base',
    'title',
    'titleTemplate',
    'bodyAttrs',
    'htmlAttrs',
    'templateParams'
  ],
  Vo = [
    'tagPosition',
    'tagPriority',
    'tagDuplicateStrategy',
    'innerHTML',
    'textContent',
    'processTemplateParams'
  ],
  Gf = typeof window < 'u';
function zo(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function Cs(e) {
  return (
    e._h ||
    zo(
      e._d
        ? e._d
        : `${e.tag}:${e.textContent || e.innerHTML || ''}:${Object.entries(
            e.props
          )
            .map(([t, n]) => `${t}:${String(n)}`)
            .join(',')}`
    )
  );
}
function Qo(e, t) {
  const { props: n, tag: r } = e;
  if (Yf.includes(r)) return r;
  if (r === 'link' && n.rel === 'canonical') return 'canonical';
  if (n.charset) return 'charset';
  const s = ['id'];
  r === 'meta' && s.push('name', 'property', 'http-equiv');
  for (const o of s)
    if (typeof n[o] < 'u') {
      const i = String(n[o]);
      return t && !t(i) ? !1 : `${r}:${o}:${i}`;
    }
  return !1;
}
function Ts(e, t) {
  return e == null ? t || null : typeof e == 'function' ? e(t) : e;
}
async function Xf(e, t, n) {
  const r = {
    tag: e,
    props: await Jo(
      typeof t == 'object' && typeof t != 'function' && !(t instanceof Promise)
        ? { ...t }
        : {
            [['script', 'noscript', 'style'].includes(e)
              ? 'innerHTML'
              : 'textContent']: t
          },
      ['templateParams', 'titleTemplate'].includes(e)
    )
  };
  return (
    Vo.forEach((s) => {
      const o = typeof r.props[s] < 'u' ? r.props[s] : n[s];
      typeof o < 'u' &&
        ((!['innerHTML', 'textContent'].includes(s) || Qf.includes(r.tag)) &&
          (r[s] = o),
        delete r.props[s]);
    }),
    r.props.body && ((r.tagPosition = 'bodyClose'), delete r.props.body),
    r.props.children &&
      ((r.innerHTML = r.props.children), delete r.props.children),
    r.tag === 'script' &&
      (typeof r.innerHTML == 'object' &&
        ((r.innerHTML = JSON.stringify(r.innerHTML)),
        (r.props.type = r.props.type || 'application/json')),
      r.innerHTML &&
        ['application/ld+json', 'application/json'].includes(r.props.type) &&
        (r.innerHTML = r.innerHTML.replace(/</g, '\\u003C'))),
    Array.isArray(r.props.content)
      ? r.props.content.map((s) => ({
          ...r,
          props: { ...r.props, content: s }
        }))
      : r
  );
}
function Zf(e) {
  return (
    typeof e == 'object' &&
      !Array.isArray(e) &&
      (e = Object.keys(e).filter((t) => e[t])),
    (Array.isArray(e) ? e.join(' ') : e)
      .split(' ')
      .filter((t) => t.trim())
      .filter(Boolean)
      .join(' ')
  );
}
async function Jo(e, t) {
  for (const n of Object.keys(e)) {
    if (n === 'class') {
      e[n] = Zf(e[n]);
      continue;
    }
    if (
      (e[n] instanceof Promise && (e[n] = await e[n]), !t && !Vo.includes(n))
    ) {
      const r = String(e[n]),
        s = n.startsWith('data-');
      r === 'true' || r === ''
        ? (e[n] = s ? 'true' : !0)
        : e[n] || (s && r === 'false' ? (e[n] = 'false') : delete e[n]);
    }
  }
  return e;
}
const eu = 10;
async function tu(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput)
      .filter(([n, r]) => typeof r < 'u' && Jf.includes(n))
      .forEach(([n, r]) => {
        const s = zf(r);
        t.push(...s.map((o) => Xf(n, o, e)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .filter(Boolean)
      .map(
        (n, r) => (
          (n._e = e._i), e.mode && (n._m = e.mode), (n._p = (e._i << eu) + r), n
        )
      )
  );
}
const Rs = { base: -10, title: 10 },
  As = { critical: -80, high: -10, low: 20 };
function bn(e) {
  let t = 100;
  const n = e.tagPriority;
  return typeof n == 'number'
    ? n
    : (e.tag === 'meta'
        ? (e.props['http-equiv'] === 'content-security-policy' && (t = -30),
          e.props.charset && (t = -20),
          e.props.name === 'viewport' && (t = -15))
        : e.tag === 'link' && e.props.rel === 'preconnect'
        ? (t = 20)
        : e.tag in Rs && (t = Rs[e.tag]),
      typeof n == 'string' && n in As ? t + As[n] : t);
}
const nu = [
    { prefix: 'before:', offset: -1 },
    { prefix: 'after:', offset: 1 }
  ],
  Je = '%separator';
function rt(e, t, n) {
  if (typeof e != 'string' || !e.includes('%')) return e;
  function r(i) {
    let l;
    return (
      ['s', 'pageTitle'].includes(i)
        ? (l = t.pageTitle)
        : i.includes('.')
        ? (l = i.split('.').reduce((c, u) => (c && c[u]) || void 0, t))
        : (l = t[i]),
      typeof l < 'u' ? (l || '').replace(/"/g, '\\"') : !1
    );
  }
  let s = e;
  try {
    s = decodeURI(e);
  } catch {}
  return (
    (s.match(/%(\w+\.+\w+)|%(\w+)/g) || [])
      .sort()
      .reverse()
      .forEach((i) => {
        const l = r(i.slice(1));
        typeof l == 'string' &&
          (e = e
            .replace(new RegExp(`\\${i}(\\W|$)`, 'g'), (c, u) => `${l}${u}`)
            .trim());
      }),
    e.includes(Je) &&
      (e.endsWith(Je) && (e = e.slice(0, -Je.length).trim()),
      e.startsWith(Je) && (e = e.slice(Je.length).trim()),
      (e = e.replace(new RegExp(`\\${Je}\\s*\\${Je}`, 'g'), Je)),
      (e = rt(e, { separator: n }, n))),
    e
  );
}
async function ru(e) {
  const t = {
    tag: e.tagName.toLowerCase(),
    props: await Jo(
      e
        .getAttributeNames()
        .reduce((n, r) => ({ ...n, [r]: e.getAttribute(r) }), {})
    ),
    innerHTML: e.innerHTML
  };
  return (t._d = Qo(t)), t;
}
async function su(e, t = {}) {
  var a;
  const n = t.document || e.resolvedOptions.document;
  if (!n) return;
  const r = { shouldRender: e.dirty, tags: [] };
  if ((await e.hooks.callHook('dom:beforeRender', r), !r.shouldRender)) return;
  const s = (await e.resolveTags()).map((d) => ({
    tag: d,
    id: un.includes(d.tag) ? Cs(d) : d.tag,
    shouldRender: !0
  }));
  let o = e._dom;
  if (!o) {
    o = { elMap: { htmlAttrs: n.documentElement, bodyAttrs: n.body } };
    for (const d of ['body', 'head']) {
      const p = (a = n == null ? void 0 : n[d]) == null ? void 0 : a.children;
      for (const b of [...p].filter((C) =>
        un.includes(C.tagName.toLowerCase())
      ))
        o.elMap[b.getAttribute('data-hid') || Cs(await ru(b))] = b;
    }
  }
  (o.pendingSideEffects = { ...(o.sideEffects || {}) }), (o.sideEffects = {});
  function i(d, p, b) {
    const C = `${d}:${p}`;
    (o.sideEffects[C] = b), delete o.pendingSideEffects[C];
  }
  function l({ id: d, $el: p, tag: b }) {
    const C = b.tag.endsWith('Attrs');
    (o.elMap[d] = p),
      C ||
        (['textContent', 'innerHTML'].forEach((O) => {
          b[O] && b[O] !== p[O] && (p[O] = b[O]);
        }),
        i(d, 'el', () => {
          o.elMap[d].remove(), delete o.elMap[d];
        })),
      Object.entries(b.props).forEach(([O, F]) => {
        const m = `attr:${O}`;
        if (O === 'class')
          for (const y of (F || '').split(' ').filter(Boolean))
            C && i(d, `${m}:${y}`, () => p.classList.remove(y)),
              !p.classList.contains(y) && p.classList.add(y);
        else
          p.getAttribute(O) !== F &&
            p.setAttribute(O, F === !0 ? '' : String(F)),
            C && i(d, m, () => p.removeAttribute(O));
      });
  }
  const c = [],
    u = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
  for (const d of s) {
    const { tag: p, shouldRender: b, id: C } = d;
    if (b) {
      if (p.tag === 'title') {
        n.title = p.textContent;
        continue;
      }
      (d.$el = d.$el || o.elMap[C]),
        d.$el ? l(d) : un.includes(p.tag) && c.push(d);
    }
  }
  for (const d of c) {
    const p = d.tag.tagPosition || 'head';
    (d.$el = n.createElement(d.tag.tag)),
      l(d),
      (u[p] = u[p] || n.createDocumentFragment()),
      u[p].appendChild(d.$el);
  }
  for (const d of s) await e.hooks.callHook('dom:renderTag', d, n, i);
  u.head && n.head.appendChild(u.head),
    u.bodyOpen && n.body.insertBefore(u.bodyOpen, n.body.firstChild),
    u.bodyClose && n.body.appendChild(u.bodyClose),
    Object.values(o.pendingSideEffects).forEach((d) => d()),
    (e._dom = o),
    (e.dirty = !1),
    await e.hooks.callHook('dom:rendered', { renders: s });
}
async function ou(e, t = {}) {
  const n = t.delayFn || ((r) => setTimeout(r, 10));
  return (e._domUpdatePromise =
    e._domUpdatePromise ||
    new Promise((r) =>
      n(async () => {
        await su(e, t), delete e._domUpdatePromise, r();
      })
    ));
}
function iu(e) {
  return (t) => {
    var r, s;
    const n =
      ((s =
        (r = t.resolvedOptions.document) == null
          ? void 0
          : r.head.querySelector('script[id="unhead:payload"]')) == null
        ? void 0
        : s.innerHTML) || !1;
    return (
      n && t.push(JSON.parse(n)),
      {
        mode: 'client',
        hooks: {
          'entries:updated': function (o) {
            ou(o, e);
          }
        }
      }
    );
  };
}
const lu = ['templateParams', 'htmlAttrs', 'bodyAttrs'],
  cu = {
    hooks: {
      'tag:normalise': function ({ tag: e }) {
        ['hid', 'vmid', 'key'].forEach((r) => {
          e.props[r] && ((e.key = e.props[r]), delete e.props[r]);
        });
        const n = Qo(e) || (e.key ? `${e.tag}:${e.key}` : !1);
        n && (e._d = n);
      },
      'tags:resolve': function (e) {
        const t = {};
        e.tags.forEach((r) => {
          const s = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p,
            o = t[s];
          if (o) {
            let l = r == null ? void 0 : r.tagDuplicateStrategy;
            if ((!l && lu.includes(r.tag) && (l = 'merge'), l === 'merge')) {
              const c = o.props;
              ['class', 'style'].forEach((u) => {
                r.props[u] &&
                  c[u] &&
                  (u === 'style' && !c[u].endsWith(';') && (c[u] += ';'),
                  (r.props[u] = `${c[u]} ${r.props[u]}`));
              }),
                (t[s].props = { ...c, ...r.props });
              return;
            } else if (r._e === o._e) {
              (o._duped = o._duped || []),
                (r._d = `${o._d}:${o._duped.length + 1}`),
                o._duped.push(r);
              return;
            } else if (bn(r) > bn(o)) return;
          }
          const i =
            Object.keys(r.props).length +
            (r.innerHTML ? 1 : 0) +
            (r.textContent ? 1 : 0);
          if (un.includes(r.tag) && i === 0) {
            delete t[s];
            return;
          }
          t[s] = r;
        });
        const n = [];
        Object.values(t).forEach((r) => {
          const s = r._duped;
          delete r._duped, n.push(r), s && n.push(...s);
        }),
          (e.tags = n),
          (e.tags = e.tags.filter(
            (r) =>
              !(
                r.tag === 'meta' &&
                (r.props.name || r.props.property) &&
                !r.props.content
              )
          ));
      }
    }
  },
  fu = {
    mode: 'server',
    hooks: {
      'tags:resolve': function (e) {
        const t = {};
        e.tags
          .filter(
            (n) =>
              ['titleTemplate', 'templateParams', 'title'].includes(n.tag) &&
              n._m === 'server'
          )
          .forEach((n) => {
            t[n.tag] = n.tag.startsWith('title') ? n.textContent : n.props;
          }),
          Object.keys(t).length &&
            e.tags.push({
              tag: 'script',
              innerHTML: JSON.stringify(t),
              props: { id: 'unhead:payload', type: 'application/json' }
            });
      }
    }
  },
  Os = ['script', 'link', 'bodyAttrs'];
function Ms(e) {
  const t = {},
    n = {};
  return (
    Object.entries(e.props).forEach(([r, s]) => {
      r.startsWith('on') && typeof s == 'function' ? (n[r] = s) : (t[r] = s);
    }),
    { props: t, eventHandlers: n }
  );
}
const uu = {
    hooks: {
      'ssr:render': function (e) {
        e.tags = e.tags.map(
          (t) => (
            !Os.includes(t.tag) ||
              !Object.entries(t.props).find(
                ([n, r]) => n.startsWith('on') && typeof r == 'function'
              ) ||
              (t.props = Ms(t).props),
            t
          )
        );
      },
      'tags:resolve': function (e) {
        e.tags = e.tags.map((t) => {
          if (!Os.includes(t.tag)) return t;
          const { props: n, eventHandlers: r } = Ms(t);
          return (
            Object.keys(r).length && ((t.props = n), (t._eventHandlers = r)), t
          );
        });
      },
      'dom:renderTag': function (e, t, n) {
        if (!e.tag._eventHandlers) return;
        const r = e.tag.tag === 'bodyAttrs' ? t.defaultView : e.$el;
        Object.entries(e.tag._eventHandlers).forEach(([s, o]) => {
          const i = `${e.tag._d || e.tag._p}:${s}`,
            l = s.slice(2).toLowerCase(),
            c = `data-h-${l}`;
          if ((n(e.id, i, () => {}), e.$el.hasAttribute(c))) return;
          const u = o;
          e.$el.setAttribute(c, ''),
            r.addEventListener(l, u),
            e.entry &&
              n(e.id, i, () => {
                r.removeEventListener(l, u), e.$el.removeAttribute(c);
              });
        });
      }
    }
  },
  au = ['link', 'style', 'script', 'noscript'],
  du = {
    hooks: {
      'tag:normalise': ({ tag: e }) => {
        e.key && au.includes(e.tag) && (e.props['data-hid'] = e._h = zo(e.key));
      }
    }
  },
  hu = {
    hooks: {
      'tags:resolve': (e) => {
        const t = (n) => {
          var r;
          return (r = e.tags.find((s) => s._d === n)) == null ? void 0 : r._p;
        };
        for (const { prefix: n, offset: r } of nu)
          for (const s of e.tags.filter(
            (o) =>
              typeof o.tagPriority == 'string' && o.tagPriority.startsWith(n)
          )) {
            const o = t(s.tagPriority.replace(n, ''));
            typeof o < 'u' && (s._p = o + r);
          }
        e.tags.sort((n, r) => n._p - r._p).sort((n, r) => bn(n) - bn(r));
      }
    }
  },
  pu = {
    hooks: {
      'tags:resolve': (e) => {
        var i;
        const { tags: t } = e,
          n =
            (i = t.find((l) => l.tag === 'title')) == null
              ? void 0
              : i.textContent,
          r = t.findIndex((l) => l.tag === 'templateParams'),
          s = r !== -1 ? t[r].props : {},
          o = s.separator || '|';
        delete s.separator, (s.pageTitle = rt(s.pageTitle || n || '', s, o));
        for (const l of t)
          l.processTemplateParams !== !1 &&
            (['titleTemplate', 'title'].includes(l.tag) &&
            typeof l.textContent == 'string'
              ? (l.textContent = rt(l.textContent, s, o))
              : l.tag === 'meta' && typeof l.props.content == 'string'
              ? (l.props.content = rt(l.props.content, s, o))
              : l.tag === 'link' && typeof l.props.href == 'string'
              ? (l.props.href = rt(l.props.href, s, o))
              : l.processTemplateParams === !0 &&
                (l.innerHTML
                  ? (l.innerHTML = rt(l.innerHTML, s, o))
                  : l.textContent &&
                    (l.textContent = rt(l.textContent, s, o))));
        e.tags = t.filter((l) => l.tag !== 'templateParams');
      }
    }
  },
  gu = {
    hooks: {
      'tags:resolve': (e) => {
        const { tags: t } = e;
        let n = t.findIndex((s) => s.tag === 'titleTemplate');
        const r = t.findIndex((s) => s.tag === 'title');
        if (r !== -1 && n !== -1) {
          const s = Ts(t[n].textContent, t[r].textContent);
          s !== null ? (t[r].textContent = s || t[r].textContent) : delete t[r];
        } else if (n !== -1) {
          const s = Ts(t[n].textContent);
          s !== null &&
            ((t[n].textContent = s), (t[n].tag = 'title'), (n = -1));
        }
        n !== -1 && delete t[n], (e.tags = t.filter(Boolean));
      }
    }
  };
function mu(e = {}) {
  const t = _u(e);
  return t.use(iu()), t;
}
function Ss(e, t) {
  return !e || (e === 'server' && t) || (e === 'client' && !t);
}
function _u(e = {}) {
  const t = Vf();
  t.addHooks(e.hooks || {}),
    (e.document = e.document || (Gf ? document : void 0));
  const n = !e.document;
  e.plugins = [
    cu,
    fu,
    uu,
    du,
    hu,
    pu,
    gu,
    ...((e == null ? void 0 : e.plugins) || [])
  ];
  const r = () => {
    (i.dirty = !0), t.callHook('entries:updated', i);
  };
  let s = 0,
    o = [];
  const i = {
    dirty: !1,
    resolvedOptions: e,
    hooks: t,
    headEntries() {
      return o;
    },
    use(l) {
      const c = typeof l == 'function' ? l(i) : l;
      Ss(c.mode, n) && t.addHooks(c.hooks || {});
    },
    push(l, c) {
      c == null || delete c.head;
      const u = { _i: s++, input: l, ...c };
      return (
        Ss(u.mode, n) && (o.push(u), r()),
        {
          dispose() {
            (o = o.filter((a) => a._i !== u._i)),
              t.callHook('entries:updated', i),
              r();
          },
          patch(a) {
            (o = o.map((d) => (d._i === u._i && (d.input = u.input = a), d))),
              r();
          }
        }
      );
    },
    async resolveTags() {
      const l = { tags: [], entries: [...o] };
      await t.callHook('entries:resolve', l);
      for (const c of l.entries) {
        const u = c.resolvedInput || c.input;
        if (
          ((c.resolvedInput = await (c.transform ? c.transform(u) : u)),
          c.resolvedInput)
        )
          for (const a of await tu(c)) {
            const d = { tag: a, entry: c, resolvedOptions: i.resolvedOptions };
            await t.callHook('tag:normalise', d), l.tags.push(d.tag);
          }
      }
      return (
        await t.callHook('tags:beforeResolve', l),
        await t.callHook('tags:resolve', l),
        l.tags
      );
    },
    ssr: n
  };
  return e.plugins.forEach((l) => i.use(l)), i.hooks.callHook('init', i), i;
}
const yu = Ao.startsWith('3');
function bu(e) {
  return typeof e == 'function' ? e() : lt(e);
}
function sr(e, t = '') {
  if (e instanceof Promise) return e;
  const n = bu(e);
  return !e || !n
    ? n
    : Array.isArray(n)
    ? n.map((r) => sr(r, t))
    : typeof n == 'object'
    ? Object.fromEntries(
        Object.entries(n).map(([r, s]) =>
          r === 'titleTemplate' || r.startsWith('on')
            ? [r, lt(s)]
            : [r, sr(s, r)]
        )
      )
    : n;
}
const vu = {
    hooks: {
      'entries:resolve': function (e) {
        for (const t of e.entries) t.resolvedInput = sr(t.input);
      }
    }
  },
  Eu = 'usehead';
function xu(e) {
  return {
    install(n) {
      yu &&
        ((n.config.globalProperties.$unhead = e),
        (n.config.globalProperties.$head = e),
        n.provide(Eu, e));
    }
  }.install;
}
function wu(e = {}) {
  e.domDelayFn = e.domDelayFn || ((n) => vr(() => setTimeout(() => n(), 0)));
  const t = mu(e);
  return t.use(vu), (t.install = xu(t)), t;
}
function Pu(e) {
  try {
    return JSON.parse(e || '{}');
  } catch (t) {
    return console.error('[SSG] On state deserialization -', t, e), {};
  }
}
function Cu(e) {
  return document.readyState === 'loading'
    ? new Promise((t) => {
        document.addEventListener('DOMContentLoaded', () => t(e));
      })
    : Promise.resolve(e);
}
const Tu = Tn({
  setup(e, { slots: t }) {
    const n = Js(!1);
    return (
      co(() => (n.value = !0)),
      () =>
        n.value
          ? t.default && t.default({})
          : t.placeholder && t.placeholder({})
    );
  }
});
function Ru(e, t, n, r = {}) {
  const {
      transformState: s,
      registerComponents: o = !0,
      useHead: i = !0,
      rootContainer: l = '#app'
    } = r,
    c = typeof window < 'u';
  async function u(a = !1, d) {
    const p = a ? vc(e) : Ec(e);
    let b;
    i && ((b = wu()), p.use(b));
    const C = jf({ history: a ? Zc(t.base) : ef(t.base), ...t }),
      { routes: O } = t;
    o && p.component('ClientOnly', Tu);
    const F = [],
      H = {
        app: p,
        head: b,
        isClient: c,
        router: C,
        routes: O,
        onSSRAppRendered: a ? () => {} : (B) => F.push(B),
        triggerOnSSRAppRendered: () => Promise.all(F.map((B) => B())),
        initialState: {},
        transformState: s,
        routePath: d
      };
    a &&
      (await Cu(),
      (H.initialState =
        (s == null ? void 0 : s(window.__INITIAL_STATE__ || {})) ||
        Pu(window.__INITIAL_STATE__))),
      await (n == null ? void 0 : n(H)),
      p.use(C);
    let A,
      W = !0;
    if (
      (C.beforeEach((B, D, se) => {
        (W || (A && A === B.path)) &&
          ((W = !1), (A = B.path), (B.meta.state = H.initialState)),
          se();
      }),
      !a)
    ) {
      const B = H.routePath ?? '/';
      C.push(B),
        await C.isReady(),
        (H.initialState = C.currentRoute.value.meta.state || {});
    }
    const V = H.initialState;
    return { ...H, initialState: V };
  }
  return (
    c &&
      (async () => {
        const { app: a, router: d } = await u(!0);
        await d.isReady(), a.mount(l, !0);
      })(),
    u
  );
}
Ru(Cc, { routes: $c });
export { On as a, jl as c, Tn as d, Eo as o };
