# flow-remove-types-register

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Flowtype](https://img.shields.io/badge/type%20check-flow-brightgreen.svg)](https://flowtype.org/)
[![npm version](https://img.shields.io/npm/v/@druide/flow-remove-types-register.svg)](https://www.npmjs.com/package/@druide/flow-remove-types-register)
[![license](https://img.shields.io/github/license/druide/flow-remove-types-register.svg)](https://github.com/druide/flow-remove-types-register)

Add ability to `require()` [Flow](https://flowtype.org) modules and files using
[flow-remove-types](https://github.com/leebyron/flow-remove-types).

## Install

```
npm i @druide/flow-remove-types-register --save
```

## Usage

Require this module at your program entry point (index.js):

```
require('@druide/flow-remove-types-register')()
```

or at your module entry point:

```
require('@druide/flow-remove-types-register')({module: 'moduleName'})
```

Write you code with Flow:

```
// @flow
```

## Limitation

Flow cannot be used at program or module entry point directly.
Declare your `index.js` this way:

```
require('@druide/flow-remove-types-register')()
require('./my-app-with-flow')
```

Also notice some program startup time slow down due to source files
pre-processing.
