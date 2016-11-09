# flow-remove-types-register

Add ability to `require()` [Flow](https://flowtype.org) modules and files using
[flow-remove-types](https://github.com/leebyron/flow-remove-types).

## Install

```
npm i @druide/flow-remove-types-register --save
```

## Usage

Require this module at your program or module entry point.

```
require('@druide/flow-remove-types-register')
```

Write you code with Flow:

```
// @flow
```

## Limitation

Flow cannot be used at program or module entry point directly.
Declare your `index.js` this way:

```
require('@druide/flow-remove-types-register')
require('./my-app-with-flow')
```
