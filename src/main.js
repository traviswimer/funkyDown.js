var Showdown = require('./Showdown');


function funkyDown( options ){

	// force options to be an object
	options = options || {};

	// "input" property must be a string or a DOM element
	if(
		typeof options.input === "undefined" ||
		(
			typeof options.input !== "string" &&
			!isDomElement( options.input )
		)
	){
		throw new Error("You must specify an input string or DOM element.");
	}

	// "output" property must be a DOM element
	if(
		typeof options.output === "undefined" ||
		!isDomElement( options.output )
	){
		throw new Error("You must specify an output DOM element.");
	}

	// Store input/output
	var input = options.input;
	var output = options.output;

	// Create Markdown to HTML converter
	var converter = new Showdown.converter();

	// Retrieve current input value
	function getInput(){
		if( typeof input === "string"){
			return input;
		}else if( input.value ){
			return input.value;
		}else{
			return input.innerHTML;
		}
	}

	// Converts input to HTML and sends to output
	function createOutput(){
		// Obtain the correct input and output
		var outputType = typeof output.value ? 'value' : 'innerHTML';

		// Set output
		output[outputType] = converter.makeHtml( getInput() );
	}

	// Initial output
	createOutput();

	// return public methods
	return {
		load: createOutput
	};

}

// Makes sure the object has either a value or innerHTML property
// It doesn't have to actually be a DOM element
function isDomElement( object ){
	object = object || {};

	if( typeof object.value !== "string" && typeof object.innerHTML !== "string" ){
		return false
	}

	return true;
}

window.funkyDown = funkyDown;