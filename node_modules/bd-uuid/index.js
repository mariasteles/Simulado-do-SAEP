'use strict';

var uid = require('uuid');

module.exports = function () {
  return function *uuid(next) {
    this.uuid = this.request.query.uuid || uid.v1();
    yield next;
  };
};