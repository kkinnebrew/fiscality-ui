var $ = require('jquery');
var _ = require('underscore');


// ------------------------------------------------------------------------------------------------
// Class Object
// ------------------------------------------------------------------------------------------------

var Class = (function() {

  var initializing = false;
  var fnTest = /\b_super\b/;

  function ObjectClass() {}

  ObjectClass.extend = function(def) {

    var prototype;
    var name;
    var _super = this.prototype;

    initializing = true;
    prototype = new this();
    initializing = false;

    for (name in def) {
      prototype[name] = typeof def[name] === "function" && typeof _super[name] === "function" && fnTest.test(def[name]) ? (function(name, fn) {
        return function() {
          var tmp = this._super;
          this._super = _super[name];
          var ret = fn.apply(this, arguments);
          this._super = tmp;
          return ret;
        };
      }(name, def[name])) : def[name];
    }

    function Class() {
      if (!initializing && this.initialize) {
        this.initialize.apply(this, arguments);
      }
    }

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    Class.extend = ObjectClass.extend;
    Class.mixin = ObjectClass.mixin;

    return Class;

  };

  ObjectClass.mixin = function(def) {

    var key;
    var value;
    var ref;

    if (!def) {
      throw 'Missing definition';
    }

    for (key in def) {
      value = def[key];
      if (Array.prototype.indexOf.call(['extend', 'include'], key) < 0) {
        this.prototype[key] = value;
      }
    }

    return this;

  };

  return ObjectClass;

}());

// ------------------------------------------------------------------------------------------------
// EventTarget Object
// ------------------------------------------------------------------------------------------------

EventTarget = (function() {

  function EventTarget(type, currentTarget, target, data) {

    this.bubbles         = true;
    this.currentTarget   = currentTarget;
    this.data            = data;
    this.target          = target;
    this.type            = type;

  }

  EventTarget.prototype.stopPropagation = function() {
    this.bubbles = false;
  };

  return EventTarget;

}());


// ------------------------------------------------------------------------------------------------
// EventHandle Object
// ------------------------------------------------------------------------------------------------

EventHandle = (function() {

  function EventHandle(target, ev, call) {

    this.call      = call;
    this.ev        = ev;
    this.target    = target;

  }

  EventHandle.prototype.detach = function() {

    this.target.detach(this.ev, this.call);

    delete this.target;
    delete this.ev;
    delete this.call;

  };

  return EventHandle;

}());


// ------------------------------------------------------------------------------------------------
// EventTarget Object
// ------------------------------------------------------------------------------------------------

EventTarget = (function() {

  function EventTarget(type, currentTarget, target, data) {

    this.bubbles         = true;
    this.currentTarget   = currentTarget;
    this.data            = data;
    this.target          = target;
    this.type            = type;

  }

  EventTarget.prototype.stopPropagation = function() {
    this.bubbles = false;
  };

  return EventTarget;

}());


// ------------------------------------------------------------------------------------------------
// EventHandle Object
// ------------------------------------------------------------------------------------------------

EventHandle = (function() {

  function EventHandle(target, ev, call) {

    this.call      = call;
    this.ev        = ev;
    this.target    = target;

  }

  EventHandle.prototype.detach = function() {

    this.target.detach(this.ev, this.call);

    delete this.target;
    delete this.ev;
    delete this.call;

  };

  return EventHandle;

}());


// ------------------------------------------------------------------------------------------------
// Events Mixin
// ------------------------------------------------------------------------------------------------

Events = {

  on: function(ev, call, context) {

    var fn = typeof context !== 'undefined' ? proxy(call, context) : call;

    if (!this._listeners) { this._listeners = {}; }
    if (!this._listeners.hasOwnProperty(ev)) { this._listeners[ev] = []; }
    this._listeners[ev].push(fn);

    return new EventHandle(this, ev, fn);

  },

  once: function(ev, call, context) {

    var fn = typeof context !== 'undefined' ? proxy(call, context) : call;

    var wrap = function() {
      call.apply(this, arguments);
      this.detach(ev, fn);
    };

    this.on(ev, wrap);

  },

  fire: function(ev, data) {

    var parent = this._parent || null;
    var evName = ev;

    if (typeof ev === 'string') {
      ev = new EventTarget(ev, this, this, data);
    }

    if (typeof ev.type !== 'string') {
      throw "Error: Invalid 'type' when firing event";
    }

    if (!this._listeners) { this._listeners = {}; }
    if (this._listeners[ev.type] instanceof Array) {
      var listeners = this._listeners[ev.type];
      for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].call(this, ev, data);
      }
    }
    
    if (parent != null && ev.bubbles && evName[0] !== '_') {
      ev.currentTarget = this._parent;
      parent.fire.call(parent, ev, data);
    }

  },

  detach: function(ev, fn) {

    var listeners = [];

    if (!this._listeners) {
      this._listeners = {};
    }

    if (typeof ev === 'undefined') {
      this._listeners = {};
    } else if (this._listeners[ev] instanceof Array) {
      if (typeof fn !== 'undefined') {
        listeners = this._listeners[ev];
        for (var i = 0, len = listeners.length; i < len; i++) {
          if (listeners[i] === fn) {
            listeners.splice(i, 1);
            break;
          }
        }
      } else {
        this._listeners[ev] = [];
      }
    }

  }

};

Class.mixin(Events);

$.fn.childrenTo = function(selector) {
  var childList = [];
  var that = this;
  this.find(selector).each(function() {
    var include = false, parent = $(this).parent();
    while (parent.length !== 0 && !include) {
      if ($(parent).not($(that)).length === 0) {
        include = true; break;
      } else if ($(parent).not('[data-control]').length === 0) {
        include = false; break;
      } parent = $(parent).parent();
    }
    if (include) { childList.push($(this)); }
  });
  return childList;
};

module.exports.Class = Class;