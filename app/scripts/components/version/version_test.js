'use strict';

describe('util.version module', function() {

  beforeEach(module('util.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1.0');
    }));
  });

});
