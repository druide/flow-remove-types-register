var Module = require('module')
var removeTypes = require('flow-remove-types')
var path = require('path')

// Rather than use require.extensions, swizzle Module#_compile. Not only does
// this typically leverage the existing behavior of require.extensions['.js'],
// but allows for use alongside other "require extension hook" if necessary.
var superCompile = Module.prototype._compile
Module.prototype._compile = function _compile (source, filename) {
  var transformedSource = path.extname(filename) === '.js'
    ? removeTypes(source)
    : source
  superCompile.call(this, transformedSource, filename)
}
