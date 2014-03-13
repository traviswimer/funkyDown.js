# ![FunkyDown](../blob/master/logo.png?raw=true)

## Javascript Markdown converter/editor optimized for laziness

FunkyDown.js is a front-end Javascript tool for easily displaying your Markdown as HTML.

Specify an input and an output. That's it.

```javascript
funkyDown({
	input: document.getElementById('myTextarea'),
	output: document.getElementById('myDisplayDiv')
});
```

*This library is built upon [Showdown.js](https://github.com/coreyti/showdown). Many thanks go out to it's creators.*

## How to Use

### Options

#### input

Required parameter.

Can be any of the following:
*	String
*	DOM Element
*	Function that returns a string

#### output

Required parameter.

Can be any of the following:
*	DOM Element
*	Function that recieves the converted HTML as its only parameter

### Methods

#### load( options )

This method re-renders the markdown and sends the HTML to your output.

You may pass the optional `input` and `output` options object as the method's only parameter.

#### options( options )

This method allows you to update the `input` and `output` values you specified when creating a funkyDown object.

## Examples

### Need your output to stay up to date with the input?

```javascript
var myTextarea = document.getElementById('myTextarea');
var outputter = funkyDown({
	input: myTextarea,
	output: document.getElementById('myDisplayDiv')
});

myTextarea.addEventListener("keyup", function(){
	outputter.load();
});
```

### Want to change the input or output?

```javascript
var outputter = funkyDown({
	input: document.getElementById('myTextarea'),
	output: document.getElementById('myDisplayDiv')
});

// The options method changes input, output, or both
outputter.options({
	input: "# This is a markdown string",
	output: document.getElementById('myOtherDisplayDiv')
});
outputter.load();

// New input/output can be specified witht he load method as well
outputter.load({
	input: "# This is a markdown string",
	output: document.getElementById('myOtherDisplayDiv')
});
```

### Feeling funky? Input/output can also be funtions

```javascript
var outputter = funkyDown({
	input: function(){
		if( youFeelTheFunk ){
			return document.getElementById('myFunkyTextArea').value;
		}else{
			return "Not enough funk.";
		}
	},
	output: function( html ){
		document.getElementById('myDisplayDiv').innerHTML = "This HTML rendered using funkyDown.js: " + html;
	}
});
```


*Won't you take me to FunkyDown?*