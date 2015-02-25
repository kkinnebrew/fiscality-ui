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

    var ignore = false;

    if (this._ignoreEvents instanceof Array) {
      for (var i=0; i<this._ignoreEvents.length; i++) {
        if (this._ignoreEvents[i] === evName) {
          ignore = true;
        }
      }
    }

    if (parent != null && !ignore && ev.bubbles && evName[0] !== '_') {
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

function Application(config) {
  this.config = config;
}

Application.prototype.render = function(el) {
  var root = $('[ui-view]');
  if (el !== undefined) {
    this.$el = el;
  } else if (root.length === 1) {
    this.$el = root;
  } else {
    console.error('No root view found');
  }
};

var View = Class.extend({

  initialize: function(template) {

    this.template = template;

    this.$el = $('<div></div>');
    this.$target = null;

    if (typeof template === 'string') {
      this.$el.html(template);
    }

    this.$subview = this.$el.find('[ui-view]');

  },

  render: function($el) {

    this.$target = $el;

    this.$el.children().appendTo($el);

    this.bind();

  },

  remove: function() {

    this.unbind();

  },

  bind: function() {

    var that = this;

    console.log('binding');

    this.$target.find('[data-bind]').each(function() {

      var pattern = $(this).attr('data-bind');

      var parts = pattern.split(':');

      if (parts.length !== 2) {
        return console.error('Invalid data-bind pattern', pattern);
      }

      var event = parts[0];
      var message = parts[1].replace(/[()]/g, '');

      console.log('bound:', event, message);

      $(this).on(event, function() {
        that.fire('message', message);
        console.log('firing: ', pattern);
      });

      $(this).attr('data-bound', pattern);
      $(this).removeAttr('data-bind');

    });

    this.$target.find('[data-model]:not([data-live])').each(function() {

      var model = $(this).attr('data-model');
      var tag = $(this).prop('tagName');

      switch(tag.toLowerCase()) {
        case 'input':
          console.log('bound keyup');
          $(this).on('keyup', function(e) {
            if (e.which <= 90 && e.which >= 48) {
              that.fire('change', {
                key: model,
                value: $(this).val()
              });
            }

          });
          break;
        case 'select':
          $(this).on('change', function() {
            that.fire('change', {
              key: model,
              value: $(this).val()
            });
          });
          break;
      }

      console.log('live-bound:', model);

      $(this).attr('data-live', '');

    });

  },

  unbind: function() {

    this.$el.find('[data-bound]').each(function() {

      var pattern = $(this).attr('data-bound');
      var parts = pattern.split(':');
      var event = parts[0];

      $(this).off(event);

      $(this).attr('data-bind', pattern);
      $(this).removeAttr('data-bound');

    });

    this.$target.find('[data-bound]').each(function() {

      var model = $(this).attr('data-model');
      var tag = $(this).prop('tagName');

      switch(tag.toLowerCase()) {
        case 'input':
          $(this).off('keyup');
          break;
        case 'select':
          $(this).off('change');
          break;
      }

      console.log('live-bound:', model);

      $(this).removeAttr('data-live');

    });

  },

  renderSubview: function(view) {

    view.render(this.$subview);

  },


  getData: function() {

    var data = {};

    this.$el.find('[ng-model]').each(function() {
      var key = $(this).attr('ng-model');
      var tag = $(this).prop('tagName');
      var val = null;
      switch(tag.toLowerCase()) {
        case 'div':
          val = $(this).text();
          break;
        case 'span':
          val = $(this).text();
          break;
        case 'input':
          val = $(this).val();
          break;
        case 'select':
          val = $(this).val();
          break;
      }
      data[key] = val;
    });

    return data;

  },

  setData: function(data) {

    for (var key in data) {

      var el = this.$el.find('[ng-model="' + key + '"]');
      var tag = $(this).prop('tagName');
      var val = data[key];

      if (el.length) {
        switch(tag.toLowerCase()) {
          case 'div':
            val = $(this).text(val);
            break;
          case 'span':
            val = $(this).text(val);
            break;
          case 'input':
            val = $(this).val(val);
            break;
          case 'select':
            val = $(this).val(val);
            break;
        }
      }

    }

  }

});


var Controller = Class.extend({

  initialize: function(viewModel, view) {

    console.log('initialize controller');

    this.view = view;
    this.viewModel = viewModel;

    var that = this;

    this.view.on('message', function(e) {
      console.log(e.data);
      that.viewModel.execute(e.data);
    });

    this.view.on('change', function(e) {
      console.log('view changed', e.data.key, e.data.value);
      that.viewModel.update(e.data.key, e.data.value);
    });

    this.viewModel.on('change', function(e) {
      console.log('viewModel changed', e.data.key, e.data.value);
      that.view.update(e.data.key, e.data.value);
    });

  }

});

var ViewModel = Class.extend({

  initialize: function() {

    console.log('initialize view model');

  },

  execute: function(message) {
    console.log('executing', message);

    console.log(this[message]);

    if (typeof this[message] === 'function') {
      this[message].call(this);
    } else {
      console.warn('No method ' + message + ' found on view model');
    }
  },

  update: function(key, value) {

    this[key] = value;

    console.log('view model updated', key, value);
  }

});


module.exports.Application = Application;
module.exports.View = View;
module.exports.Controller = Controller;
module.exports.ViewModel = ViewModel;