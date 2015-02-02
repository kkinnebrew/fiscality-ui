'use strict';

angular.module('util.version', [
  'util.version.interpolate-filter',
  'util.version.version-directive'
])

.value('version', '0.1.0');
