'use strict';

var path = require('path');
var fs = require('fs');

module.exports = function(name) {
    name = name || 'apps';
    var dirname = path.dirname(process.mainModule.filename);
    var appPath = path.join(dirname, name);
    if (fs.existsSync(appPath)) {
        var dirs = fs.readdirSync(appPath);
        var apps = {};
        dirs.map(function(value) {
            if (value.indexOf('.') != 0) {
                apps[value] = path.join(dirname, name, value);
            }
        });
        return apps;
    } else {
        return [];
    }
};