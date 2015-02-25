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

    if (typeof template === 'string') {
      this.$el.html(template);
    }

    this.$subview = this.$el.find('[ui-view]');

  },

  render: function($el) {

    this.$el.children().appendTo($el);

    this.bind();

  },

  remove: function() {

    this.unbind();

  },

  bind: function() {

  },

  unbind: function() {

  },

  renderSubview: function(view) {

    view.render(this.$subview);

  }

});

module.exports.Application = Application;
module.exports.View = View;