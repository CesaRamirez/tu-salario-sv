webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapActions; });
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v2.5.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    "development" !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ("development" !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.5.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.5.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

exports.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

exports.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

exports.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

exports.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support (#5572)
        // since Safari 10.1 shipped with fetch, we can use that to detect it
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs;
var dbContexts;
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve) {
        deferredOperation.resolve = resolve;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        if (forages[i]._dbInfo.db) {
            forages[i]._dbInfo.db.close();
            forages[i]._dbInfo.db = null;
        }
    }

    return _getConnection(dbInfo, false).then(function (db) {
        for (var j = 0; j < forages.length; j++) {
            forages[j]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback) {
    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (!dbInfo.db || err.name === 'InvalidStateError') {
            return _tryReconnect(dbInfo).then(function () {

                var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                callback(null, tx);
            });
        }

        callback(err);
    }
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Initialize a singleton container for all running localForages.
    if (!dbContexts) {
        dbContexts = {};
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
        };
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback retuns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.put(value, key);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        });
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {

                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && typeof localStorage.setItem === 'function';
    } catch (e) {
        return false;
    }
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = dbInfo.name + '/';

    if (dbInfo.storeName !== self._defaultConfig.storeName) {
        dbInfo.keyPrefix += dbInfo.storeName + '/';
    }

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error('Can\'t call config() after localforage ' + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var customDriverMethod = driverMethods[i];
                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_auth__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_rent__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_settings__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_bonus__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__state__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__getters__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mutations__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions__ = __webpack_require__(170);







__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);






/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  state: __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */],
  getters: __WEBPACK_IMPORTED_MODULE_7__getters__,
  mutations: __WEBPACK_IMPORTED_MODULE_8__mutations__,
  actions: __WEBPACK_IMPORTED_MODULE_9__actions__,
  modules: {
    auth: __WEBPACK_IMPORTED_MODULE_2__modules_auth__["a" /* default */],
    rent: __WEBPACK_IMPORTED_MODULE_3__modules_rent__["a" /* default */],
    settings: __WEBPACK_IMPORTED_MODULE_4__modules_settings__["a" /* default */],
    bonus: __WEBPACK_IMPORTED_MODULE_5__modules_bonus__["a" /* default */]
  }
}));

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(196)
/* template */
var __vue_template__ = __webpack_require__(197)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/Notification.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Notification.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14604873", Component.options)
  } else {
    hotAPI.reload("data-v-14604873", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
module.exports = __webpack_require__(202);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bootstrap__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components__);





__WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('auth/setToken').then(function () {
  __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('auth/fetchUser').catch(function () {
    __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('auth/clearAuth');
    __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].replace({
      name: 'login'
    });
  });
}).catch(function () {
  __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].dispatch('auth/clearAuth');
});

var app = new Vue({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */]
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__beforeEach__ = __webpack_require__(145);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]({
  mode: 'history',
  routes: __WEBPACK_IMPORTED_MODULE_2__app_index__["a" /* routes */]
});

router.beforeEach(__WEBPACK_IMPORTED_MODULE_3__beforeEach__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__routes__["a"]; });


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_routes__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_routes__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_routes__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rent_routes__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_routes__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bonus_routes__ = __webpack_require__(140);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }








/* harmony default export */ __webpack_exports__["a"] = ([].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_0__auth_routes__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_1__errors_routes__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__home_routes__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_3__rent_routes__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_4__settings_routes__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_5__bonus_routes__["a" /* default */])));

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(30);


/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/login',
  component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Login */],
  name: 'login',
  meta: {
    guest: true,
    needsAuth: false
  }
}]);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Login = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('login', __webpack_require__(31));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(32)
/* template */
var __vue_template__ = __webpack_require__(34)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/auth/components/Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5a650942", Component.options)
  } else {
    hotAPI.reload("data-v-5a650942", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_localforage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_localforage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      email: null,
      password: null,
      errors: [],
      loading: false
    };
  },

  methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])({
    login: 'auth/login'
  }), {
    submit: function submit() {
      var _this = this;

      this.login({
        payload: {
          email: this.email,
          password: this.password
        },
        context: this
      }).then(function () {
        _this.loading = true;
        __WEBPACK_IMPORTED_MODULE_1_localforage___default.a.getItem('intended').then(function (name) {
          _this.$emit('update:v-model', true);
          if (Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["isEmpty"])(name)) {
            _this.$router.replace({
              name: 'home'
            });
            _this.loading = false;
            return;
          }
          _this.$router.replace({
            name: name
          });
          _this.loading = false;
        });
      }).catch(function (err) {});
    },
    cleanFields: function cleanFields(field) {
      return this.errors[field] = [];
    }
  })
});

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    [
      _c(
        "v-layout",
        {
          staticClass: "h100",
          attrs: { "align-center": "", "justify-center": "" }
        },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md4: "" } },
            [
              _c(
                "v-card",
                { attrs: { light: "" } },
                [
                  _c(
                    "v-card-media",
                    {
                      staticClass: "white--text",
                      attrs: { height: "200px", src: "../images/material.jpg" }
                    },
                    [
                      _c(
                        "v-container",
                        { attrs: { "fill-height": "", fluid: "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { "fill-height": "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xs12: "",
                                    "align-end": "",
                                    flexbox: ""
                                  }
                                },
                                [
                                  _c("span", { staticClass: "headline" }, [
                                    _vm._v("Iniciar Sesión")
                                  ])
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "form",
                    {
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          _vm.submit($event)
                        }
                      }
                    },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c("v-text-field", {
                            attrs: {
                              label: "Correo Electronico",
                              light: "",
                              color: "purple darken-2",
                              "error-messages": _vm.errors.email,
                              "prepend-icon": "mail"
                            },
                            nativeOn: {
                              keyup: function($event) {
                                _vm.cleanFields("email")
                              }
                            },
                            model: {
                              value: _vm.email,
                              callback: function($$v) {
                                _vm.email = $$v
                              },
                              expression: "email"
                            }
                          }),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              label: "Contraseña",
                              light: "",
                              color: "purple darken-2",
                              "error-messages": _vm.errors.password,
                              type: "password",
                              "prepend-icon": "vpn_key"
                            },
                            nativeOn: {
                              keyup: function($event) {
                                _vm.cleanFields("password")
                              }
                            },
                            model: {
                              value: _vm.password,
                              callback: function($$v) {
                                _vm.password = $$v
                              },
                              expression: "password"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                type: "submit",
                                color: "purple darken-2",
                                block: "",
                                loading: _vm.loading,
                                ripple: "",
                                dark: ""
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Iniciar\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5a650942", module.exports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(36);


/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '*',
  component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* NotFound */]
}]);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFound; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var NotFound = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('not-found', __webpack_require__(37));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(38)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/errors/components/NotFound.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NotFound.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2bf1a5ac", Component.options)
  } else {
    hotAPI.reload("data-v-2bf1a5ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("p", [_vm._v("404")])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2bf1a5ac", module.exports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(40);


/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/',
  component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Home */],
  name: 'home',
  meta: {
    guest: false,
    needsAuth: true
  }
}]);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Home = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('home', __webpack_require__(41));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(42)
/* template */
var __vue_template__ = __webpack_require__(43)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/home/components/Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a4c8c10", Component.options)
  } else {
    hotAPI.reload("data-v-7a4c8c10", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
    user: 'auth/user'
  })
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-container",
        [
          _c(
            "v-layout",
            { staticClass: "h100", attrs: { "align-content-start": "" } },
            [_vm._v("\n      Home\n    ")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7a4c8c10", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(45);


/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/admin/rent',
  component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Browse */],
  name: 'browse-rent',
  meta: {
    guest: false,
    needsAuth: true
  }
}]);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Browse = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('browse-rent', __webpack_require__(46));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(47)
/* template */
var __vue_template__ = __webpack_require__(134)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/rent/components/Browse.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Browse.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-569394d5", Component.options)
  } else {
    hotAPI.reload("data-v-569394d5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_collect_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_collect_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_collect_js__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            search_mensual: '',
            search_quincenal: '',
            headers_x: [{
                text: 'Tramo',
                align: 'left',
                sortable: false,
                value: 'section'
            }, {
                text: 'Desde',
                value: 'since'
            }, {
                text: 'Hasta',
                value: 'until'
            }, {
                text: '% a Aplicar',
                value: 'percentage'
            }, {
                text: 'Sobre el Exceso',
                value: 'excess'
            }, {
                text: 'Mas Cuota Fija de',
                value: 'fee'
            }],
            selected_mensual: [],
            selected_quincenal: [],
            dialog: false,
            next_rent: {}
        };
    },
    mounted: function mounted() {
        this.get(1);
        this.get(2);
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
        items_quincenal: 'rent/rentQ',
        items_mensual: 'rent/rentM',
        rent: 'rent/rent'
    })),
    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])({
        getRentTable: 'rent/getRentTable',
        getRent: 'rent/getRent',
        updateRent: 'rent/updateRent'
    }), {
        get: function get(_type) {
            this.getRentTable({
                type: _type
            }).then(function (response) {});
        },
        edit: function edit(selected) {
            var _this = this;

            this.getRent({
                id: selected[0].id
            }).then(function (response) {
                _this.next();
                _this.dialog = true;
            });
        },
        update: function update() {
            var _this2 = this;

            this.$validator.validateAll().then(function (result) {
                if (result) {
                    _this2.updateRent({
                        payload: {
                            since: _this2.rent.since,
                            until: _this2.rent.until,
                            percentage: _this2.rent.percentage,
                            excess: _this2.rent.excess,
                            fee: _this2.rent.fee,
                            type: _this2.rent.type
                        },
                        context: _this2,
                        id: _this2.rent.id
                    }).then(function () {
                        _this2.get(1);
                        _this2.get(2);
                        _this2.dialog = false;
                    }).catch(function (err) {});
                }

                return;
            });
        },
        clear: function clear() {
            this.$validator.reset();
            this.dialog = false;
        },
        next: function next() {
            if (this.rent.type == 1) {
                var r = __WEBPACK_IMPORTED_MODULE_1_collect_js___default()(this.items_mensual);
            } else if (this.rent.type == 2) {
                var r = __WEBPACK_IMPORTED_MODULE_1_collect_js___default()(this.items_quincenal);
            }
            if (this.rent.section == 4) {
                this.next_rent = {
                    since: "9999999999"
                };
            } else {
                this.next_rent = r.where('section', parseInt(this.rent.section) + 1).first();
            }
        }
    })
});

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-layout",
        { attrs: { "justify-center": "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", md10: "", lg10: "" } },
            [
              _c(
                "v-card",
                { staticClass: "tabs--flex-toolbar" },
                [
                  _c(
                    "v-tabs",
                    { attrs: { dark: "", centered: "" } },
                    [
                      _c(
                        "v-tabs-bar",
                        { staticClass: "deep-purple" },
                        [
                          _c("v-tabs-slider", { attrs: { color: "yellow" } }),
                          _vm._v(" "),
                          _vm._l(2, function(i) {
                            return _c(
                              "v-tabs-item",
                              { key: i, attrs: { href: "#tab-" + i } },
                              [
                                _vm._v(
                                  "\n                            Tabla de Renta " +
                                    _vm._s(i == 1 ? "Mensual" : "Quincenal") +
                                    "\n                        "
                                )
                              ]
                            )
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "v-tabs-items",
                        [
                          _c(
                            "v-tabs-content",
                            { key: 1, attrs: { id: "tab-1" } },
                            [
                              _c(
                                "v-toolbar",
                                { attrs: { card: "", prominent: "" } },
                                [
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _c(
                                    "v-tooltip",
                                    { attrs: { top: "" } },
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value:
                                                _vm.selected_mensual.length ===
                                                1,
                                              expression:
                                                "selected_mensual.length === 1"
                                            }
                                          ],
                                          attrs: {
                                            slot: "activator",
                                            card: "",
                                            icon: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.edit(_vm.selected_mensual)
                                            }
                                          },
                                          slot: "activator"
                                        },
                                        [_c("v-icon", [_vm._v("create")])],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("span", [_vm._v("Editar")])
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      "append-icon": "search",
                                      label: "Buscar",
                                      "single-line": "",
                                      "hide-details": "",
                                      color: "purple darken-2"
                                    },
                                    model: {
                                      value: _vm.search_mensual,
                                      callback: function($$v) {
                                        _vm.search_mensual = $$v
                                      },
                                      expression: "search_mensual"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("v-data-table", {
                                staticClass: "elevation-2",
                                attrs: {
                                  headers: _vm.headers_x,
                                  items: _vm.items_mensual,
                                  search: _vm.search_mensual,
                                  "selected-key": "id",
                                  "select-all": "",
                                  "rows-per-page-text": "Registros por Página",
                                  "no-data-text": "No se encontraron resultados"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "items",
                                    fn: function(props) {
                                      return [
                                        _c(
                                          "td",
                                          [
                                            _c("v-checkbox", {
                                              attrs: {
                                                color: "purple darken-2",
                                                "hide-details": ""
                                              },
                                              model: {
                                                value: props.selected,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    props,
                                                    "selected",
                                                    $$v
                                                  )
                                                },
                                                expression: "props.selected"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            _vm._s(
                                              props.item.section_for_humans
                                            )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [_vm._v(_vm._s(props.item.since))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                props.item.until_for_humans
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                props.item.percentage_for_humans
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [_vm._v(_vm._s(props.item.excess))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [_vm._v(_vm._s(props.item.fee))]
                                        )
                                      ]
                                    }
                                  },
                                  {
                                    key: "pageText",
                                    fn: function(ref) {
                                      var pageStart = ref.pageStart
                                      var pageStop = ref.pageStop
                                      var itemsLength = ref.itemsLength
                                      return [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(pageStart) +
                                            " - " +
                                            _vm._s(pageStop) +
                                            " de " +
                                            _vm._s(itemsLength) +
                                            "\n                                "
                                        )
                                      ]
                                    }
                                  }
                                ]),
                                model: {
                                  value: _vm.selected_mensual,
                                  callback: function($$v) {
                                    _vm.selected_mensual = $$v
                                  },
                                  expression: "selected_mensual"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-tabs-content",
                            { key: 2, attrs: { id: "tab-2" } },
                            [
                              _c(
                                "v-toolbar",
                                { attrs: { card: "", prominent: "" } },
                                [
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _c(
                                    "v-tooltip",
                                    { attrs: { top: "" } },
                                    [
                                      _c(
                                        "v-btn",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value:
                                                _vm.selected_quincenal
                                                  .length === 1,
                                              expression:
                                                "selected_quincenal.length === 1"
                                            }
                                          ],
                                          attrs: {
                                            slot: "activator",
                                            icon: ""
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.edit(_vm.selected_quincenal)
                                            }
                                          },
                                          slot: "activator"
                                        },
                                        [_c("v-icon", [_vm._v("create")])],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("span", [_vm._v("Editar")])
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      "append-icon": "search",
                                      label: "Buscar",
                                      "single-line": "",
                                      "hide-details": ""
                                    },
                                    model: {
                                      value: _vm.search_quincenal,
                                      callback: function($$v) {
                                        _vm.search_quincenal = $$v
                                      },
                                      expression: "search_quincenal"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("v-data-table", {
                                staticClass: "elevation-2",
                                attrs: {
                                  headers: _vm.headers_x,
                                  items: _vm.items_quincenal,
                                  search: _vm.search_quincenal,
                                  "selected-key": "id",
                                  "select-all": "",
                                  "rows-per-page-text": "Registros por Página",
                                  "no-data-text": "No se encontraron resultados"
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "items",
                                    fn: function(props) {
                                      return [
                                        _c(
                                          "td",
                                          [
                                            _c("v-checkbox", {
                                              attrs: {
                                                primary: "",
                                                "hide-details": ""
                                              },
                                              model: {
                                                value: props.selected,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    props,
                                                    "selected",
                                                    $$v
                                                  )
                                                },
                                                expression: "props.selected"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("td", [
                                          _vm._v(
                                            _vm._s(
                                              props.item.section_for_humans
                                            )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [_vm._v(_vm._s(props.item.since))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                props.item.until_for_humans
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                props.item.percentage_for_humans
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [_vm._v(_vm._s(props.item.excess))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "td",
                                          { staticClass: "text-xs-right" },
                                          [_vm._v(_vm._s(props.item.fee))]
                                        )
                                      ]
                                    }
                                  }
                                ]),
                                model: {
                                  value: _vm.selected_quincenal,
                                  callback: function($$v) {
                                    _vm.selected_quincenal = $$v
                                  },
                                  expression: "selected_quincenal"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", "justify-center": "" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "500px" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Editar Opciones de Tabla de Renta")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        { attrs: { "grid-list-md": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Sección",
                                      required: "",
                                      disabled: "",
                                      hint: "Sección",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.rent.section_for_humans,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.rent,
                                          "section_for_humans",
                                          $$v
                                        )
                                      },
                                      expression: "rent.section_for_humans"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value:
                                          "required|decimal|max_value:" +
                                          this.rent.until,
                                        expression:
                                          "`required|decimal|max_value:${this.rent.until}`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Desde",
                                      required: "",
                                      type: "number",
                                      max: _vm.rent.since,
                                      "error-messages": _vm._errors.collect(
                                        "since"
                                      ),
                                      "data-vv-name": "since",
                                      hint: "Desde Monto",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.rent.since,
                                      callback: function($$v) {
                                        _vm.$set(_vm.rent, "since", $$v)
                                      },
                                      expression: "rent.since"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value:
                                          "required|decimal|min_value:" +
                                          this.rent.since +
                                          "|max_value:" +
                                          this.next_rent.since,
                                        expression:
                                          "`required|decimal|min_value:${this.rent.since}|max_value:${this.next_rent.since}`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Hasta",
                                      required: "",
                                      type: "number",
                                      min: _vm.rent.until,
                                      "error-messages": _vm._errors.collect(
                                        "until"
                                      ),
                                      "data-vv-name": "until",
                                      hint: "Hasta Monto",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.rent.until,
                                      callback: function($$v) {
                                        _vm.$set(_vm.rent, "until", $$v)
                                      },
                                      expression: "rent.until"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required|decimal",
                                        expression: "`required|decimal`"
                                      }
                                    ],
                                    attrs: {
                                      label: "% a Aplicar",
                                      required: "",
                                      "error-messages": _vm._errors.collect(
                                        "percentage"
                                      ),
                                      "data-vv-name": "percentage",
                                      hint: "Porcentaje a Aplicar",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.rent.percentage,
                                      callback: function($$v) {
                                        _vm.$set(_vm.rent, "percentage", $$v)
                                      },
                                      expression: "rent.percentage"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required|decimal",
                                        expression: "`required|decimal`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Sobre el Exceso",
                                      required: "",
                                      type: "number",
                                      max: _vm.rent.excess,
                                      "error-messages": _vm._errors.collect(
                                        "excess"
                                      ),
                                      "data-vv-name": "excess",
                                      hint: "Sobre el Exceso",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.rent.excess,
                                      callback: function($$v) {
                                        _vm.$set(_vm.rent, "excess", $$v)
                                      },
                                      expression: "rent.excess"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required|decimal",
                                        expression: "`required|decimal`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Cuota Fija",
                                      required: "",
                                      type: "number",
                                      min: _vm.rent.fee,
                                      "error-messages": _vm._errors.collect(
                                        "fee"
                                      ),
                                      "data-vv-name": "fee",
                                      hint: "Cuota Fija",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.rent.fee,
                                      callback: function($$v) {
                                        _vm.$set(_vm.rent, "fee", $$v)
                                      },
                                      expression: "rent.fee"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("small", [_vm._v("*Indica campos obligatorios")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", flat: "" },
                          on: { click: _vm.clear }
                        },
                        [_vm._v("Cerrar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", flat: "" },
                          on: { click: _vm.update }
                        },
                        [_vm._v("Guardar")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-569394d5", module.exports)
  }
}

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(136);


/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/admin/settings',
  component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Browse */],
  name: 'browse-settings',
  meta: {
    guest: false,
    needsAuth: true
  }
}]);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Browse = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('browse-rent', __webpack_require__(137));

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(138)
/* template */
var __vue_template__ = __webpack_require__(139)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/settings/components/Browse.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Browse.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01853b82", Component.options)
  } else {
    hotAPI.reload("data-v-01853b82", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      search: '',
      headers: [{
        text: 'Llave',
        value: 'key',
        align: 'left',
        tooltip: 'Llave identificadora'
      }, {
        text: 'Descripción',
        value: 'description',
        align: 'left',
        tooltip: 'Descripción de Llave'
      }, {
        text: 'Valor',
        value: 'value',
        align: 'left',
        tooltip: 'Valor de Llave'
      }],
      loading: true,
      selected: [],
      dialog: false
    };
  },
  mounted: function mounted() {
    this.loading = true;
    this.getSettings();
    this.loading = false;
  },

  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
    items: 'settings/settings',
    setting: 'settings/setting'
  })),
  methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])({
    getSettings: 'settings/getSettings',
    getSetting: 'settings/getSetting',
    updateSetting: 'settings/updateSetting'
  }), {
    edit: function edit() {
      var _this = this;

      this.getSetting({
        id: this.selected[0].id
      }).then(function (response) {
        _this.dialog = true;
      });
    },
    update: function update() {
      var _this2 = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this2.updateSetting({
            payload: {
              key: _this2.setting.key,
              description: _this2.setting.description,
              value: _this2.setting.value
            },
            context: _this2,
            id: _this2.setting.id
          }).then(function () {
            _this2.loading = true;
            _this2.getSettings();
            _this2.loading = false;
            _this2.dialog = false;
          }).catch(function (err) {});
        }

        return;
      });
    },
    clear: function clear() {
      this.$validator.reset();
      this.dialog = false;
    }
  })
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-layout",
        { attrs: { "justify-center": "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", md10: "", lg10: "" } },
            [
              _c(
                "v-card",
                { staticClass: "card--flex-toolbar" },
                [
                  _c(
                    "v-toolbar",
                    {
                      attrs: {
                        card: "",
                        prominent: "",
                        color: "deep-purple",
                        dark: ""
                      }
                    },
                    [
                      _c("v-toolbar-title", { staticClass: "body-2" }, [
                        _vm._v("Configuraciones")
                      ]),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-tooltip",
                        { attrs: { top: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.selected.length === 1,
                                  expression: "selected.length === 1"
                                }
                              ],
                              attrs: { slot: "activator", icon: "" },
                              on: { click: _vm.edit },
                              slot: "activator"
                            },
                            [_c("v-icon", [_vm._v("create")])],
                            1
                          ),
                          _vm._v(" "),
                          _c("span", [_vm._v("Editar")])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          dark: "",
                          "append-icon": "search",
                          label: "Buscar",
                          "single-line": "",
                          "hide-details": "",
                          color: "cyan"
                        },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c("v-data-table", {
                    staticClass: "elevation-2",
                    attrs: {
                      headers: _vm.headers,
                      items: _vm.items,
                      search: _vm.search,
                      loading: _vm.loading,
                      "selected-key": "id",
                      "select-all": "",
                      "rows-per-page-text": "Registros por Página",
                      "no-data-text": "No se encontraron resultados"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "items",
                        fn: function(props) {
                          return [
                            _c(
                              "td",
                              [
                                _c("v-checkbox", {
                                  staticClass: "text-left",
                                  attrs: { primary: "", "hide-details": "" },
                                  model: {
                                    value: props.selected,
                                    callback: function($$v) {
                                      _vm.$set(props, "selected", $$v)
                                    },
                                    expression: "props.selected"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-left" }, [
                              _vm._v(_vm._s(props.item.key))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-left" }, [
                              _vm._v(_vm._s(props.item.description))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-left" }, [
                              _vm._v(_vm._s(props.item.value))
                            ])
                          ]
                        }
                      },
                      {
                        key: "pageText",
                        fn: function(ref) {
                          var pageStart = ref.pageStart
                          var pageStop = ref.pageStop
                          var itemsLength = ref.itemsLength
                          return [
                            _vm._v(
                              "\n                      " +
                                _vm._s(pageStart) +
                                " - " +
                                _vm._s(pageStop) +
                                " de " +
                                _vm._s(itemsLength) +
                                "\n                    "
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.selected,
                      callback: function($$v) {
                        _vm.selected = $$v
                      },
                      expression: "selected"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", "justify-center": "" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "500px" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Editar Opciones de Configuración")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        { attrs: { "grid-list-md": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required",
                                        expression: "'required'"
                                      }
                                    ],
                                    attrs: {
                                      label: "Llave",
                                      required: "",
                                      "error-messages": _vm._errors.collect(
                                        "key"
                                      ),
                                      "data-vv-name": "key",
                                      hint: "Llave de Configuración",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.setting.key,
                                      callback: function($$v) {
                                        _vm.$set(_vm.setting, "key", $$v)
                                      },
                                      expression: "setting.key"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required",
                                        expression: "`required`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Descripción",
                                      required: "",
                                      "error-messages": _vm._errors.collect(
                                        "description"
                                      ),
                                      "data-vv-name": "description",
                                      hint: "Descripción de Configuración",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.setting.description,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.setting,
                                          "description",
                                          $$v
                                        )
                                      },
                                      expression: "setting.description"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm12: "", md12: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required",
                                        expression: "`required`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Valor",
                                      required: "",
                                      "error-messages": _vm._errors.collect(
                                        "value"
                                      ),
                                      "data-vv-name": "value",
                                      hint: "Valor de Configuración",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.setting.value,
                                      callback: function($$v) {
                                        _vm.$set(_vm.setting, "value", $$v)
                                      },
                                      expression: "setting.value"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("small", [_vm._v("*Indica campos obligatorios")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", flat: "" },
                          on: { click: _vm.clear }
                        },
                        [_vm._v("Cerrar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", flat: "" },
                          on: { click: _vm.update }
                        },
                        [_vm._v("Guardar")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01853b82", module.exports)
  }
}

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(141);


/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/admin/bonus',
  component: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* Browse */],
  name: 'browse-bonus',
  meta: {
    guest: false,
    needsAuth: true
  }
}]);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Browse = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('browse-bonus', __webpack_require__(142));

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(143)
/* template */
var __vue_template__ = __webpack_require__(144)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/bonus/components/Browse.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Browse.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40f72e9b", Component.options)
  } else {
    hotAPI.reload("data-v-40f72e9b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            search: '',
            headers: [{
                text: 'Días',
                value: 'days',
                align: 'left'
            }, {
                text: 'Inicio (Años)',
                value: 'start',
                align: 'left'
            }, {
                text: 'Fin (Años)',
                value: 'end',
                align: 'left'
            }],
            selected: [],
            dialog: false,
            days: null,
            start: null,
            end: null
        };
    },
    mounted: function mounted() {
        this.getBonuses();
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
        items: 'bonus/bonuses',
        bonus: 'bonus/bonus'
    })),
    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])({
        getBonuses: 'bonus/getBonuses',
        getBonus: 'bonus/getBonus',
        updateBonus: 'bonus/updateBonus'
    }), {
        edit: function edit() {
            var _this = this;

            this.getBonus({
                id: this.selected[0].id
            }).then(function (response) {
                _this.dialog = true;
            });
        },
        update: function update() {
            var _this2 = this;

            this.$validator.validateAll().then(function (result) {
                if (result) {
                    _this2.updateBonus({
                        payload: {
                            days: _this2.bonus.days,
                            start: _this2.bonus.start,
                            end: _this2.bonus.end
                        },
                        context: _this2,
                        id: _this2.bonus.id
                    }).then(function () {
                        _this2.getBonuses();
                        _this2.dialog = false;
                    }).catch(function (err) {});
                }

                return;
            });
        },
        clear: function clear() {
            this.$validator.reset();
            this.dialog = false;
        }
    })
});

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-layout",
        { attrs: { "justify-center": "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs8: "", md8: "", lg8: "" } },
            [
              _c(
                "v-card",
                { staticClass: "card--flex-toolbar" },
                [
                  _c(
                    "v-toolbar",
                    {
                      attrs: {
                        card: "",
                        prominent: "",
                        color: "deep-purple",
                        dark: ""
                      }
                    },
                    [
                      _c("v-toolbar-title", { staticClass: "body-2" }, [
                        _vm._v("Días de pago de Aguinaldo")
                      ]),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-tooltip",
                        { attrs: { top: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.selected.length === 1,
                                  expression: "selected.length === 1"
                                }
                              ],
                              attrs: { slot: "activator", icon: "" },
                              on: { click: _vm.edit },
                              slot: "activator"
                            },
                            [_c("v-icon", [_vm._v("create")])],
                            1
                          ),
                          _vm._v(" "),
                          _c("span", [_vm._v("Editar")])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          dark: "",
                          "append-icon": "search",
                          label: "Buscar",
                          "single-line": "",
                          "hide-details": "",
                          color: "cyan"
                        },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-data-table", {
                    attrs: {
                      headers: _vm.headers,
                      items: _vm.items,
                      search: _vm.search,
                      "item-key": "id",
                      "select-all": "",
                      "no-data-text": "No se encontraron resultados",
                      "page-text": "de"
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "items",
                        fn: function(props) {
                          return [
                            _c(
                              "td",
                              [
                                _c("v-checkbox", {
                                  attrs: { "hide-details": "" },
                                  model: {
                                    value: props.selected,
                                    callback: function($$v) {
                                      _vm.$set(props, "selected", $$v)
                                    },
                                    expression: "props.selected"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-left" }, [
                              _vm._v(_vm._s(props.item.days))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-left" }, [
                              _vm._v(_vm._s(props.item.start))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-left" }, [
                              _vm._v(_vm._s(props.item.end))
                            ])
                          ]
                        }
                      },
                      {
                        key: "pageText",
                        fn: function(ref) {
                          var pageStart = ref.pageStart
                          var pageStop = ref.pageStop
                          var itemsLength = ref.itemsLength
                          return [
                            _vm._v(
                              "\n                        " +
                                _vm._s(pageStart) +
                                " - " +
                                _vm._s(pageStop) +
                                " de " +
                                _vm._s(itemsLength) +
                                "\n                    "
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.selected,
                      callback: function($$v) {
                        _vm.selected = $$v
                      },
                      expression: "selected"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", "justify-center": "" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "500px" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Editar Opciones de Aguinaldo")
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-container",
                        { attrs: { "grid-list-md": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value: "required|numeric",
                                        expression: "'required|numeric'"
                                      }
                                    ],
                                    attrs: {
                                      label: "Días",
                                      required: "",
                                      type: "number",
                                      "error-messages": _vm._errors.collect(
                                        "days"
                                      ),
                                      "data-vv-name": "days",
                                      hint: "Días de Aguinaldo",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.bonus.days,
                                      callback: function($$v) {
                                        _vm.$set(_vm.bonus, "days", $$v)
                                      },
                                      expression: "bonus.days"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value:
                                          "required|numeric|max_value:" +
                                          this.bonus.end,
                                        expression:
                                          "`required|numeric|max_value:${this.bonus.end}`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Inicio (Años)",
                                      required: "",
                                      type: "number",
                                      max: _vm.bonus.end,
                                      "error-messages": _vm._errors.collect(
                                        "start"
                                      ),
                                      "data-vv-name": "start",
                                      hint: "Año de Inicio",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.bonus.start,
                                      callback: function($$v) {
                                        _vm.$set(_vm.bonus, "start", $$v)
                                      },
                                      expression: "bonus.start"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md4: "" } },
                                [
                                  _c("v-text-field", {
                                    directives: [
                                      {
                                        name: "validate",
                                        rawName: "v-validate",
                                        value:
                                          "required|numeric|min_value:" +
                                          this.bonus.start,
                                        expression:
                                          "`required|numeric|min_value:${this.bonus.start}`"
                                      }
                                    ],
                                    attrs: {
                                      label: "Fin (Años)",
                                      required: "",
                                      type: "number",
                                      min: _vm.bonus.start,
                                      "error-messages": _vm._errors.collect(
                                        "end"
                                      ),
                                      "data-vv-name": "end",
                                      hint: "Año de Finalización",
                                      "persistent-hint": ""
                                    },
                                    model: {
                                      value: _vm.bonus.end,
                                      callback: function($$v) {
                                        _vm.$set(_vm.bonus, "end", $$v)
                                      },
                                      expression: "bonus.end"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("small", [_vm._v("*Indica campos obligatorios")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", flat: "" },
                          on: { click: _vm.clear }
                        },
                        [_vm._v("Cerrar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue darken-1", flat: "" },
                          on: { click: _vm.update }
                        },
                        [_vm._v("Guardar")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-40f72e9b", module.exports)
  }
}

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_localforage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_localforage__);



var beforeEach = function beforeEach(to, from, next) {
  __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].dispatch('auth/checkTokenExists').then(function () {
    if (to.meta.guest) {
      next({
        name: 'home'
      });
      return;
    }

    next();
  }).catch(function () {
    if (to.meta.needsAuth) {
      __WEBPACK_IMPORTED_MODULE_1_localforage___default.a.setItem('intended', to.name);
      next({
        name: 'login'
      });
      return;
    }

    next();
  });
};

/* harmony default export */ __webpack_exports__["a"] = (beforeEach);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(151);





/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__
});

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  user: {
    authenticated: false,
    data: null
  }
});

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAuthenticated", function() { return setAuthenticated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserData", function() { return setUserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_localforage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_localforage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);



var setToken = function setToken(state, token) {
  if (Object(__WEBPACK_IMPORTED_MODULE_1_lodash__["isEmpty"])(token)) {
    __WEBPACK_IMPORTED_MODULE_0_localforage___default.a.removeItem('authtoken', token);
    return;
  }
  __WEBPACK_IMPORTED_MODULE_0_localforage___default.a.setItem('authtoken', token);
};

var setAuthenticated = function setAuthenticated(state, boolean) {
  state.user.authenticated = boolean;
};

var setUserData = function setUserData(state, data) {
  state.user.data = data;
};

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUser", function() { return fetchUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkTokenExists", function() { return checkTokenExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAuth", function() { return clearAuth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_localforage__);




var login = function login(_ref, _ref2) {
  var dispatch = _ref.dispatch;
  var payload = _ref2.payload,
      context = _ref2.context;

  return new Promise(function (resolve, reject) {
    axios.post('/api/v1/login', payload).then(function (response) {
      dispatch('setToken', response.data.meta.token).then(function () {
        dispatch('fetchUser');
        resolve(response.data);
        dispatch('noti', {
          message: 'Bienvenido a Tu Salario SV',
          type: 'success'
        }, {
          root: true
        });
      });
    }).catch(function (error) {
      context.errors = error.response.data.errors;
      if (context.errors.root) {
        dispatch('noti', {
          message: 'Credenciales Invalidas',
          type: 'error'
        }, {
          root: true
        });
      }
      reject(error.response.data.errors);
    });
  });
};

var logout = function logout(_ref3) {
  var dispatch = _ref3.dispatch;

  return axios.post('/api/v1/logout').then(function () {
    dispatch('clearAuth');
  });
};

var fetchUser = function fetchUser(_ref4) {
  var commit = _ref4.commit;

  return axios.get('/api/v1/me').then(function (response) {
    commit('setAuthenticated', true);
    commit('setUserData', response.data.data);
  });
};

var setToken = function setToken(_ref5, token) {
  var commit = _ref5.commit,
      dispatch = _ref5.dispatch;

  if (Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"])(token)) {
    return dispatch('checkTokenExists').then(function (token) {
      Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* setHttpToken */])(token);
    });
  }

  commit('setToken', token);
  Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* setHttpToken */])(token);
};

var checkTokenExists = function checkTokenExists(_ref6, token) {
  var commit = _ref6.commit,
      dispatch = _ref6.dispatch;

  return __WEBPACK_IMPORTED_MODULE_2_localforage___default.a.getItem('authtoken').then(function (token) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"])(token)) {
      return Promise.reject('NO_STORAGE_TOKEN');
    }

    return Promise.resolve(token);
  });
};

var clearAuth = function clearAuth(_ref7, token) {
  var commit = _ref7.commit;

  commit('setAuthenticated', false);
  commit('setUserData', null);
  commit('setToken', null);
  Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* setHttpToken */])(null);
};

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setHttpToken; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


var setHttpToken = function setHttpToken(token) {
  if (Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"])(token)) {
    window.axios.defaults.headers.common['Authorization'] = null;
  }

  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
var user = function user(state) {
  return state.user;
};

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(156);





/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__
});

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  rentM: [],
  rentQ: [],
  rent: {}
});

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRentQ", function() { return setRentQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRentM", function() { return setRentM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRent", function() { return setRent; });
var setRentQ = function setRentQ(state, rentQ) {
  return state.rentQ = rentQ;
};
var setRentM = function setRentM(state, rentM) {
  return state.rentM = rentM;
};
var setRent = function setRent(state, rent) {
  return state.rent = rent;
};

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRentTable", function() { return getRentTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRent", function() { return getRent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRent", function() { return updateRent; });
var getRentTable = function getRentTable(_ref, _ref2) {
  var commit = _ref.commit;
  var type = _ref2.type;
  return axios.get('/api/v1/admin/rents/' + type + '/type').then(function (response) {
    if (type == 1) {
      commit('setRentM', response.data.data);
    } else if (type === 2) {
      commit('setRentQ', response.data.data);
    }
  });
};

var getRent = function getRent(_ref3, _ref4) {
  var commit = _ref3.commit;
  var id = _ref4.id;
  return axios.get('/api/v1/admin/rents/' + id).then(function (response) {
    commit('setRent', response.data.data);
  });
};

var updateRent = function updateRent(_ref5, _ref6) {
  var dispatch = _ref5.dispatch;
  var payload = _ref6.payload,
      context = _ref6.context,
      id = _ref6.id;

  return new Promise(function (resolve, reject) {
    axios.put('/api/v1/admin/rents/' + id, payload).then(function (response) {
      resolve(response.data);
      dispatch('noti', {
        message: '¡Los Datos se han actualizado con Exito!',
        type: 'success'
      }, {
        root: true
      });
    }).catch(function (error) {
      context.errors = error.response.data.errors;
      reject(error.response.data.errors);
    });
  });
};

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rentQ", function() { return rentQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rentM", function() { return rentM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rent", function() { return rent; });
var rentQ = function rentQ(state) {
  return state.rentQ;
};
var rentM = function rentM(state) {
  return state.rentM;
};
var rent = function rent(state) {
  return state.rent;
};

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(161);





/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__
});

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  settings: [],
  setting: {}
});

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSetting", function() { return setSetting; });
var setSettings = function setSettings(state, settings) {
  return state.settings = settings;
};
var setSetting = function setSetting(state, setting) {
  return state.setting = setting;
};

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSetting", function() { return getSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSetting", function() { return updateSetting; });
var getSettings = function getSettings(_ref) {
  var commit = _ref.commit;
  return axios.get('/api/v1/admin/settings').then(function (response) {
    commit('setSettings', response.data.data);
  });
};

var getSetting = function getSetting(_ref2, _ref3) {
  var commit = _ref2.commit;
  var id = _ref3.id;
  return axios.get('/api/v1/admin/settings/' + id).then(function (response) {
    commit('setSetting', response.data.data);
  });
};

var updateSetting = function updateSetting(_ref4, _ref5) {
  var dispatch = _ref4.dispatch;
  var payload = _ref5.payload,
      context = _ref5.context,
      id = _ref5.id;

  return new Promise(function (resolve, reject) {
    axios.put('/api/v1/admin/settings/' + id, payload).then(function (response) {
      resolve(response.data);
      dispatch('noti', {
        message: '¡Los Datos se han actualizado con Exito!',
        type: 'success'
      }, {
        root: true
      });
    }).catch(function (error) {
      context.errors = error.response.data.errors;
      reject(error.response.data.errors);
    });
  });
};

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setting", function() { return setting; });
var settings = function settings(state) {
  return state.settings;
};
var setting = function setting(state) {
  return state.setting;
};

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(166);





/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  bonuses: [],
  bonus: {}
});

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBonuses", function() { return setBonuses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBonus", function() { return setBonus; });
var setBonuses = function setBonuses(state, bonuses) {
  return state.bonuses = bonuses;
};
var setBonus = function setBonus(state, bonus) {
  return state.bonus = bonus;
};

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBonuses", function() { return getBonuses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBonus", function() { return getBonus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateBonus", function() { return updateBonus; });
var getBonuses = function getBonuses(_ref) {
  var commit = _ref.commit;
  return axios.get('/api/v1/admin/bonus').then(function (response) {
    commit('setBonuses', response.data.data);
  });
};

var getBonus = function getBonus(_ref2, _ref3) {
  var commit = _ref2.commit;
  var id = _ref3.id;
  return axios.get('/api/v1/admin/bonus/' + id).then(function (response) {
    commit('setBonus', response.data.data);
  });
};

var updateBonus = function updateBonus(_ref4, _ref5) {
  var dispatch = _ref4.dispatch;
  var payload = _ref5.payload,
      context = _ref5.context,
      id = _ref5.id;

  return new Promise(function (resolve, reject) {
    axios.put('/api/v1/admin/bonus/' + id, payload).then(function (response) {
      resolve(response.data);
      dispatch('noti', {
        message: '¡Los Datos se han actualizado con Exito!',
        type: 'success'
      }, {
        root: true
      });
    }).catch(function (error) {
      context.errors = error.response.data.errors;
      reject(error.response.data.errors);
    });
  });
};

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bonuses", function() { return bonuses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bonus", function() { return bonus; });
var bonuses = function bonuses(state) {
  return state.bonuses;
};
var bonus = function bonus(state) {
  return state.bonus;
};

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  noti: {
    message: '',
    type: 'blue',
    show: false
  }
});

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noti", function() { return noti; });
var noti = function noti(state) {
  return state.noti;
};

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNoti", function() { return setNoti; });
var setNoti = function setNoti(state, payload) {
  state.noti.message = payload.message;
  state.noti.type = payload.type;
  state.noti.show = true;
};

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noti", function() { return noti; });
var noti = function noti(_ref, payload) {
  var commit = _ref.commit;

  commit('setNoti', payload);
};

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuetify__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuetify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vuetify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue2_filters__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue2_filters___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue2_filters__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vee_validate__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vee_validate_dist_locale_es__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vee_validate_dist_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vee_validate_dist_locale_es__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__locale_es__ = __webpack_require__(192);








__WEBPACK_IMPORTED_MODULE_5_vee_validate__["Validator"].localize('es', __WEBPACK_IMPORTED_MODULE_6_vee_validate_dist_locale_es___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5_vee_validate__["default"], {
  errorBagName: '_errors',
  locale: 'es'
});



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue2_filters___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vuetify___default.a);

window.Vue = __WEBPACK_IMPORTED_MODULE_0_vue___default.a;

window._ = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a;

window.axios = __WEBPACK_IMPORTED_MODULE_2_axios___default.a;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/***/ }),
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var
    ArrayProto = Array.prototype,
    ObjProto = Object.prototype;

var
    slice = ArrayProto.slice,
    toString = ObjProto.toString;

var util = {};

util.isArray = function(obj) {
    return Array.isArray(obj);
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
util.isArrayLike = function(obj) {
    if(typeof obj !== 'object' || !obj){
        return false;
    }
    var length = obj.length;
    return typeof length === 'number'
        && length % 1 === 0 && length >= 0 && length <= MAX_ARRAY_INDEX;
};

util.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};


util.each = function(obj, callback) {
    var i,
        len;
    if (util.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
            if (callback(obj[i], i, obj) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback(obj[i], i, obj) === false) {
                break;
            }
        }
    }
    return obj;
};

util.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    util['is' + name] = function(obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
});

util.toArray = function(list, start) {
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

util.toNumber = function(value) {
  if (typeof value !== 'string') {
    return value
  } else {
    var parsed = Number(value)
    return isNaN(parsed)
      ? value
      : parsed
  }
};

util.convertArray = function (value) {
    if (util.isArray(value)) {
      return value
    } else if (util.isPlainObject(value)) {
      // convert plain object to array.
      var keys = Object.keys(value)
      var i = keys.length
      var res = new Array(i)
      var key
      while (i--) {
        key = keys[i]
        res[i] = {
          $key: key,
          $value: value[key]
        }
      }
      return res
    } else {
      return value || []
    }
}

function multiIndex(obj,is) {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex(obj[is[0]],is.slice(1)) : obj
}

util.getPath = function(obj,is) {   // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
    return multiIndex(obj,is.split('.'))
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString
var OBJECT_STRING = '[object Object]'
util.isPlainObject = function (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index__ = __webpack_require__(0);


/**
 * Filter filter for arrays
 *
 * @param {Array} arr
 * @param {String} prop
 * @param {String|Number} search
 */

function filterBy (arr, search) {
  var arr = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].convertArray(arr)
  if (search == null) {
    return arr
  }
  if (typeof search === 'function') {
    return arr.filter(search)
  }
  // cast to lowercase string
  search = ('' + search).toLowerCase()
  var n = 2
  // extract and flatten keys
  var keys = Array.prototype.concat.apply([], __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].toArray(arguments, n))
  var res = []
  var item, key, val, j
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i]
    val = (item && item.$value) || item
    j = keys.length
    if (j) {
      while (j--) {
        key = keys[j]
        if ((key === '$key' && contains(item.$key, search)) ||
            contains(__WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].getPath(val, key), search)) {
          res.push(item)
          break
        }
      }
    } else if (contains(item, search)) {
      res.push(item)
    }
  }
  return res
}

function contains (val, search) {
  var i
  if (__WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].isPlainObject(val)) {
    var keys = Object.keys(val)
    i = keys.length
    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true
      }
    }
  } else if (__WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].isArray(val)) {
    i = val.length
    while (i--) {
      if (contains(val[i], search)) {
        return true
      }
    }
  } else if (val != null) {
    return val.toString().toLowerCase().indexOf(search) > -1
  }
}

/* harmony default export */ __webpack_exports__["a"] = (filterBy);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__string_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__array_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__other_index__ = __webpack_require__(13);





var Vue2Filters = {
  install: function(Vue) {
    __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].each(__WEBPACK_IMPORTED_MODULE_1__string_index__, function(value, key) {
        Vue.filter(key, value)
    })

    __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].each(__WEBPACK_IMPORTED_MODULE_3__other_index__, function(value, key) {
        Vue.filter(key, value)
    })

    Vue.mixin({
      methods: {
        limitBy: __WEBPACK_IMPORTED_MODULE_2__array_index__["c" /* limitBy */],
        filterBy: __WEBPACK_IMPORTED_MODULE_2__array_index__["a" /* filterBy */],
        orderBy: __WEBPACK_IMPORTED_MODULE_2__array_index__["d" /* orderBy */],
        find: __WEBPACK_IMPORTED_MODULE_2__array_index__["b" /* find */]
      }
    })
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Vue2Filters);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vue2Filters);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__capitalize__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uppercase__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lowercase__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__placeholder__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__truncate__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return __WEBPACK_IMPORTED_MODULE_0__capitalize__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "uppercase", function() { return __WEBPACK_IMPORTED_MODULE_1__uppercase__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lowercase", function() { return __WEBPACK_IMPORTED_MODULE_2__lowercase__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return __WEBPACK_IMPORTED_MODULE_3__placeholder__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "truncate", function() { return __WEBPACK_IMPORTED_MODULE_4__truncate__["a"]; });








/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *  Converts a string into Capitalize
 * 
 * 'abc' => 'Abc'
 */

function capitalize (value) {
  if (!value && value !== 0) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/* harmony default export */ __webpack_exports__["a"] = (capitalize);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Converts a string to UPPERCASE
 * 
 * 'abc' => 'ABC'
 */

function uppercase (value) {
  return (value || value === 0)
    ? value.toString().toUpperCase()
    : ''
}

/* harmony default export */ __webpack_exports__["a"] = (uppercase);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Converts a string to lowercase
 * 
 * 'AbC' => 'abc'
 */

function lowercase (value) {
  return (value || value === 0)
    ? value.toString().toLowerCase()
    : ''
}

/* harmony default export */ __webpack_exports__["a"] = (lowercase);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *  If the value is missing outputs the placeholder text
 * 
 * '' => {placeholder}
 * 'foo' => 'foo'
 */

function placeholder (input, property) {
  return ( input === undefined || input === '' || input === null ) ? property : input;
}

/* harmony default export */ __webpack_exports__["a"] = (placeholder);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *  Truncate at the given || default length
 *
 * 'lorem ipsum dolor' => 'lorem ipsum dol...'
 */

function truncate (value, length) {
  length = length || 15
  if( !value || typeof value !== 'string' ) return ''
  if( value.length <= length) return value
  return value.substring(0, length) + '...'
}

/* harmony default export */ __webpack_exports__["a"] = (truncate);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__limitBy__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filterBy__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orderBy__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__limitBy__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__filterBy__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__orderBy__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__find__["a"]; });








/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index__ = __webpack_require__(0);


/**
 * Limit filter for arrays
 *
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy (arr, n, offset) {
  offset = offset ? parseInt(offset, 10) : 0
  n = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].toNumber(n)
  return typeof n === 'number'
    ? arr.slice(offset, offset + n)
    : arr
}

/* harmony default export */ __webpack_exports__["a"] = (limitBy);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index__ = __webpack_require__(0);


/**
 * Filter filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy (arr) {
  var comparator = null
  var sortKeys
  arr = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].convertArray(arr)

  // determine order (last argument)
  var args = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].toArray(arguments, 1)
  var order = args[args.length - 1]
  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1
    args = args.length > 1 ? args.slice(0, -1) : args
  } else {
    order = 1
  }

  // determine sortKeys & comparator
  var firstArg = args[0]
  if (!firstArg) {
    return arr
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order
    }
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args)
    comparator = function (a, b, i) {
      i = i || 0
      return i >= sortKeys.length - 1
        ? baseCompare(a, b, i)
        : baseCompare(a, b, i) || comparator(a, b, i + 1)
    }
  }

  function baseCompare (a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex]
    if (sortKey) {
      if (sortKey !== '$key') {
        if (__WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].isObject(a) && '$value' in a) a = a.$value
        if (__WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].isObject(b) && '$value' in b) b = b.$value
      }
      a = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].isObject(a) ? __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].getPath(a, sortKey) : a
      b = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].isObject(b) ? __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].getPath(b, sortKey) : b
    }
    return a === b ? 0 : a > b ? order : -order
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator)
}

/* harmony default export */ __webpack_exports__["a"] = (orderBy);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filterBy__ = __webpack_require__(1);


/**
 * Get first matching element from a filtered array
 *
 * @param {Array} arr
 * @param {String|Number} search
 * @returns {mixed}
 */
function find(arr, search) 
{
  var array = __WEBPACK_IMPORTED_MODULE_0__filterBy__["a" /* default */].apply(this, arguments);
  array.splice(1);
  return array;
}

/* harmony default export */ __webpack_exports__["a"] = (find);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__currency__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pluralize__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "currency", function() { return __WEBPACK_IMPORTED_MODULE_0__currency__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pluralize", function() { return __WEBPACK_IMPORTED_MODULE_1__pluralize__["a"]; });






/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 
 * 12345 => $12,345.00
 *
 * @param {String} sign
 * @param {Number} decimals Decimal places
 */

function currency (value, currency, decimals) {
  var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

/* harmony default export */ __webpack_exports__["a"] = (currency);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index__ = __webpack_require__(0);


/**
 * 'item' => 'items'
 *
 * @params
 *  an array of strings corresponding to
 *  the single, double, triple ... forms of the word to
 *  be pluralized. When the number to be pluralized
 *  exceeds the length of the args, it will use the last
 *  entry in the array.
 *
 *  e.g. ['single', 'double', 'triple', 'multiple']
 */

function pluralize (value) {
  var args = __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* default */].toArray(arguments, 1)
  return args.length > 1
    ? (args[value % 10 - 1] || args[args.length - 1])
    : (args[0] + (value === 1 ? '' : 's'))
}

/* harmony default export */ __webpack_exports__["a"] = (pluralize);

/***/ })
/******/ ]);
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):(e.__vee_validate_locale__es=e.__vee_validate_locale__es||{},e.__vee_validate_locale__es.js=n())}(this,function(){"use strict";var e=function(e){var n=["Byte","KB","MB","GB","TB","PB","EB","ZB","YB"],o=0===(e=1024*Number(e))?0:Math.floor(Math.log(e)/Math.log(1024));return 1*(e/Math.pow(1024,o)).toFixed(2)+" "+n[o]},n={name:"es",messages:{_default:function(e){return"El campo "+e+" no es válido."},after:function(e,n){var o=n[0];return"El campo "+e+" debe ser posterior "+(n[1]?"o igual ":"")+"a "+o+"."},alpha_dash:function(e){return"El campo "+e+" solo debe contener letras, números y guiones."},alpha_num:function(e){return"El campo "+e+" solo debe contener letras y números."},alpha_spaces:function(e){return"El campo "+e+" solo debe contener letras y espacios."},alpha:function(e){return"El campo "+e+" solo debe contener letras."},before:function(e,n){var o=n[0];return"El campo "+e+" debe ser anterior "+(n[1]?"o igual ":"")+"a "+o+"."},between:function(e,n){return"El campo "+e+" debe estar entre "+n[0]+" y "+n[1]+"."},confirmed:function(e){return"El campo "+e+" no coincide."},credit_card:function(e){return"El campo "+e+" es inválido."},date_between:function(e,n){return"El campo "+e+" debe estar entre "+n[0]+" y "+n[1]+"."},date_format:function(e,n){return"El campo "+e+" debe tener formato formato "+n[0]+"."},decimal:function(e,n){void 0===n&&(n=["*"]);var o=n[0];return"El campo "+e+" debe ser númerico y contener "+("*"===o?"":o)+" puntos decimales."},digits:function(e,n){return"El campo "+e+" debe ser númerico y contener exactamente "+n[0]+" dígitos."},dimensions:function(e,n){return"El campo "+e+" debe ser de "+n[0]+" pixeles por "+n[1]+" pixeles."},email:function(e){return"El campo "+e+" debe ser un correo electrónico válido."},ext:function(e){return"El campo "+e+" debe ser un archivo válido."},image:function(e){return"El campo "+e+" debe ser una imagen."},in:function(e){return"El campo "+e+" debe ser un valor válido."},integer:function(e){return"El campo "+e+" debe ser un entero."},ip:function(e){return"El campo "+e+" debe ser una dirección ip válida."},length:function(e,n){var o=n[0],r=n[1];return r?"El largo del campo "+e+" debe estar entre "+o+" y "+r+".":"El largo del campo "+e+" debe ser "+o+"."},max:function(e,n){return"El campo "+e+" no debe ser mayor a "+n[0]+" caracteres."},max_value:function(e,n){return"El campo "+e+" debe de ser "+n[0]+" o menor."},mimes:function(e){return"El campo "+e+" debe ser un tipo de archivo válido."},min:function(e,n){return"El campo "+e+" debe tener al menos "+n[0]+" caracteres."},min_value:function(e,n){return"El campo "+e+" debe ser "+n[0]+" o superior."},not_in:function(e){return"El campo "+e+" debe ser un valor válido."},numeric:function(e){return"El campo "+e+" debe contener solo caracteres númericos."},regex:function(e){return"El formato del campo "+e+" no es válido."},required:function(e){return"El campo "+e+" es obligatorio."},size:function(n,o){var r=o[0];return"El campo "+n+" debe ser menor a "+e(r)+"."},url:function(e){return"El campo "+e+" no es una URL válida."}},attributes:{}};return"undefined"!=typeof VeeValidate&&VeeValidate.Validator.addLocale(n),n});

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vee_validate__ = __webpack_require__(9);

var dictionary = {
  es: {
    attributes: {
      days: 'días',
      start: 'inicio',
      end: 'fin',
      key: 'llave',
      description: 'descripción',
      value: 'valor',
      percentage: 'porcentaje',
      since: 'desde',
      until: 'hasta',
      excess: 'exceso',
      fee: 'cuota fija'
    }
  }
};

__WEBPACK_IMPORTED_MODULE_0_vee_validate__["Validator"].updateDictionary(dictionary);

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('app', __webpack_require__(194));
Vue.component('navigation', __webpack_require__(199));
Vue.component('notification', __webpack_require__(21));

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(195)
/* template */
var __vue_template__ = __webpack_require__(198)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c203bc9", Component.options)
  } else {
    hotAPI.reload("data-v-3c203bc9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Notification__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Notification__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        notification: __WEBPACK_IMPORTED_MODULE_1__Notification___default.a
    },
    computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
        user: 'auth/user'
    })
});

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
    noti: 'noti'
  }))
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-snackbar",
        {
          attrs: { timeout: 6000, color: _vm.noti.type, "multi-line": "" },
          model: {
            value: _vm.noti.show,
            callback: function($$v) {
              _vm.$set(_vm.noti, "show", $$v)
            },
            expression: "noti.show"
          }
        },
        [
          _vm._v("\n        " + _vm._s(_vm.noti.message) + "\n        "),
          _c(
            "v-btn",
            {
              attrs: { flat: "", dark: "" },
              on: {
                click: function($event) {
                  _vm.noti.show = false
                }
              }
            },
            [_vm._v("Cerrar")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14604873", module.exports)
  }
}

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-card",
        { attrs: { flat: "", height: "100vh" } },
        [
          _c("navigation"),
          _vm._v(" "),
          _c("notification"),
          _vm._v(" "),
          _c("v-content", [_c("router-view")], 1)
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c203bc9", module.exports)
  }
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(200)
/* template */
var __vue_template__ = __webpack_require__(201)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/app/Navigation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Navigation.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dfe2dc8", Component.options)
  } else {
    hotAPI.reload("data-v-0dfe2dc8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      drawer: false,
      items: [{
        title: 'Inicio',
        icon: 'dashboard',
        to: 'home'
      }, {
        title: 'Tablas de Renta',
        icon: 'list',
        to: 'browse-rent'
      }, {
        title: 'Configuraciones',
        icon: 'build',
        to: 'browse-settings'
      }, {
        title: 'Aguinaldo',
        icon: 'event',
        to: 'browse-bonus'
      }],
      mini: false,
      right: null
    };
  },

  computed: Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])({
    user: 'auth/user'
  }),
  methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])({
    logout: 'auth/logout'
  }), {
    signout: function signout() {
      var _this = this;

      this.logout().then(function () {
        _this.$router.replace({
          name: 'login'
        });
      });
    }
  })
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.user.authenticated
    ? _c(
        "div",
        [
          _c(
            "v-navigation-drawer",
            {
              attrs: { persistent: "", clipped: "", app: "" },
              model: {
                value: _vm.drawer,
                callback: function($$v) {
                  _vm.drawer = $$v
                },
                expression: "drawer"
              }
            },
            [
              _c(
                "v-list",
                { staticClass: "pa-0" },
                [
                  _c(
                    "v-list-tile",
                    { attrs: { avatar: "", tag: "div" } },
                    [
                      _c(
                        "v-list-tile-content",
                        [
                          _c("v-list-tile-title", [
                            _vm._v(_vm._s(_vm.user.data.name))
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list",
                { staticClass: "pt-0", attrs: { dense: "" } },
                [
                  _c("v-divider"),
                  _vm._v(" "),
                  _vm._l(_vm.items, function(item) {
                    return _c(
                      "v-list-tile",
                      {
                        key: item.title,
                        attrs: { to: { name: item.to }, exact: "" }
                      },
                      [
                        _c(
                          "v-list-tile-action",
                          [_c("v-icon", [_vm._v(_vm._s(item.icon))])],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-list-tile-content",
                          [
                            _c("v-list-tile-title", {
                              domProps: { textContent: _vm._s(item.title) }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    )
                  })
                ],
                2
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-toolbar",
            {
              staticStyle: { "z-index": "0" },
              attrs: {
                dark: "",
                app: "",
                flat: "",
                fixed: "",
                extended: "",
                prominent: "",
                "clipped-left": "",
                color: "deep-purple"
              }
            },
            [
              _c("v-toolbar-side-icon", {
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    _vm.drawer = !_vm.drawer
                  }
                }
              }),
              _vm._v(" "),
              _c("v-toolbar-title", { staticClass: "white--text" }, [
                _vm._v("Tu Salario SV")
              ]),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _vm.user.authenticated
                ? _c("v-btn", { attrs: { flat: "" } }, [
                    _vm._v("\n      " + _vm._s(_vm.user.data.name) + "\n    ")
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { icon: "" },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.signout($event)
                    }
                  }
                },
                [
                  _c("v-icon", { attrs: { light: "" } }, [
                    _vm._v("exit_to_app")
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0dfe2dc8", module.exports)
  }
}

/***/ }),
/* 202 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[22]);