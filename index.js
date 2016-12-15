var flowRemoveTypes = require('flow-remove-types')

// Supported options:
//
//   - all: Transform all files, not just those with a @flow comment.
//   - includes: A Regexp to determine which files should be transformed.
//   - excludes: A Regexp to determine which files should not be transformed,
//               defaults to ignoring /node_modules/, set to null to excludes nothing.
//   - module: Module name to exclude from excludes :). This option is cumulative:
//             setting option `module` will add the name to the previous registered
//             names.
var options
var flowModules = []
module.exports = function setOptions (newOptions) {
  options = newOptions
  if (options.module) flowModules.push(options.module)
}

// Swizzle Module#_compile on each applicable module instance.
// NOTE: if using alongside Babel or another require-hook which simply
// over-writes the require.extensions and does not continue execution, then
// this require hook must come after it. Encourage those module authors to call
// the prior loader in their require hooks.
var jsLoader = require.extensions['.js']
var exts = [ '.js', '.jsx', '.flow', '.es6' ]
exts.forEach(function (ext) {
  var superLoader = require.extensions[ext] || jsLoader
  require.extensions[ext] = function (module, filename) {
    if (shouldTransform(filename.replace(/\\/g, '/'), options)) {
      var superCompile = module._compile
      module._compile = function _compile (code, filename) {
        superCompile.call(this, flowRemoveTypes(code, options).toString(), filename)
      }
    }
    superLoader(module, filename)
  }
})

function shouldTransform (filename, options) {
  var includes = options && options.includes
  var excludes = options && 'excludes' in options ? options.excludes : /\/node_modules\//
  return (!includes || includes.test(filename)) &&
    !(excludes && excludes.test(filename) && !isFlowModule(filename))
}

function isFlowModule (filename) {
  for (var i = 0, len = flowModules.length; i < len; i++) {
    if (filename.indexOf('node_modules/' + flowModules[i] + '/') !== -1) return true
  }
  return false
}
