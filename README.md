jsdoc-examplecode
=================

Additional JSDoc tag for place code from functions as example. This plugin used for defined documentation examples as real
functions and run it's (for example, in unit tests). This is tag - alternative for tutorials, where you
can set links to remote tutorials.

### Install instruction

Append `examplecode.js` file plugin in dir with `conf.js` file and add to section `plugins` it.
Also you need set param `allowUnknownTags` to `true` for allow `examplecode` custom tag. Example config:

```json
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
		"include": [
		    "source/",
            "examples/"
		],
        "includePattern": "\\.js$"
    },
    "plugins": [
		"examplecode"
	]
}
```

### Usage examplecode tag in code

Define example function, which need inline include in documentation. Then add tag `@examplecode` to
function or properties. In tag description you need set link to example function (`SayExample`).
Also you can set full path (with namespace) to function (`examples.person.SayExample`).
Default param values will be inserted in begin example as param with `var` define.

```js
// -------- Example function --------
/**
 * @function SayExample
 * @param {string} [message='Hello World!']
 */
function SayExample(message) {
	console.log('You message: ' + message);
}

// -------- Source code -------------
/**
 * Creates a new Person.
 * @class
 */
var Person = function() {
};

/**
 * Say method
 * @examplecode SayExample
 * @function
 */
Person.prototype.say = function() {
};
```

This code in jsdoc parser will be interpreted as:

```js
var Person = function() {
};

/**
 * Say method
 * @example
 *   var message = 'Hello World!';
 * 
 *   console.log('You message: ' + message);
 * @function
 */
Person.prototype.say = function() {
};
```

### Run test

You can run jsdoc build in `test` folder. Results will be placed in `test/out` folder.

```sh
cd test && sh run.sh
```