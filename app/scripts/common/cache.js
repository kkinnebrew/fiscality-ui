var cache = {};

module.exports = window.cache = {

  hasPersistentItem: function(key) {

    var original = localStorage.getItem('cache:' + key);

    return !(original === null || original === undefined);

  },

  setPersistentItem: function(key, value) {

    if (value === null || value === undefined) {
      return this.clearPersistentItem(key);
    }

    var original = localStorage.getItem('cache:' + key);

    if (!original) {

      var keys = localStorage.getItem('persistentKeys');

      if (keys) {
        keys += ',' + key;
      } else {
        keys = key;
      }

      localStorage.setItem('persistentKeys', keys);

    }

    localStorage.setItem('cache:' + key, value);

  },

  getPersistentItem: function(key) {

    return localStorage.getItem('cache:' + key) || null;

  },

  clearPersistentItem: function(key) {

    var keys = localStorage.getItem('persistentKeys');

    if (keys) {

      var keysArray = keys.replace(/\s/g, '').split(',') || [];
      var finalArray = [];

      for (var i = 0; i < keysArray.length; i++) {
        if (keysArray[i] !== key) {
          finalArray.push(keysArray[i]);
        }
      }

      localStorage.setItem('persistentKeys', finalArray);

    }

    localStorage.removeItem('cache:' + key);

  },

  clearPersistentItems: function() {

    var keys = localStorage.getItem('persistentKeys');

    if (keys) {

      var keysArray = keys.replace(/\s/g, '').split(',') || [];

      for (var i = 0; i < keysArray.length; i++) {
        localStorage.removeItem('cache:' + keysArray[i]);
      }

      localStorage.removeItem('persistentKeys');

    }

  },

  hasItem: function(key) {
    return cache.hasOwnProperty(key);
  },

  setItem: function(key, value) {

    if (value === null || value === undefined) {
      return this.clearItem(key);
    }

    cache[key] = value;

  },

  getItem: function(key) {
    return cache.hasOwnProperty(key) ? cache[key] : null;
  },

  clearItem: function(key) {
    cache.hasOwnProperty(key) ? delete cache[key] : null;
  },

  clear: function() {
    cache = {};
  },

  purge: function() {
    this.clear();
    this.clearPersistentItems();
  }

};