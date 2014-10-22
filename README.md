jsdoc-examplecode
=================

Additional JSDoc tag for place code from functions. This plugin used for defined documentation examples as real
functions and run it's, for example (in my case), in unit tests. This is tag - alternative tutorials, where you
can set links to remote tutorials.

### Include plugin in config

Append `examplecode.js` file plugin in dir with `conf.js` file and add to section `plugins` it.
Also you need set param `allowUnknownTags` to true for allow examplecode custom tag. Example config:

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

### Usage in code

Define example function, which need inline include in documentation. Then add tag `@examplecode` to
function or properties. In tag description you need set link to example function (`SayExample`).
Also you can set namespace to function (`examples.person.SayExample`).
Default param values will be inserted in begin on function as param with `var` define.

```js
/**
 * @function SayExample
 * @param {string} [message='Hello World!']
 */
function SayExample(message) {
	console.log('You message: ' + message);
}

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