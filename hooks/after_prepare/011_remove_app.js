#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var fs = require('fs');
var path = require('path');

var deleteFolderRecursive = function(removePath) {
  if( fs.existsSync(removePath) ) {
    fs.readdirSync(removePath).forEach(function(file,index){
      var curPath = path.join(removePath, file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(removePath);
  }
};

console.log("Removing Raw app dir");
var iosPlatformsDir = path.resolve(__dirname, '../../platforms/ios/www/app');
var androidPlatformsDir = path.resolve(__dirname, '../../platforms/android/assets/www/app');

console.log("Removing Raw Done");
deleteFolderRecursive(iosPlatformsDir);
deleteFolderRecursive(androidPlatformsDir);
