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

	// Obtain the correct input and output
	var input = typeof options.input === "string" ? options.input : options.input.value || options.input.innerHTML;
	var outputType = typeof options.output.value ? 'value' : 'innerHTML';

	// convert the input to Markdown
	var converter = new Showdown.converter();
	options.output[outputType] = converter.makeHtml(input);

	return{
		load: function(){
			options.output[outputType] = converter.makeHtml(typeof options.input === "string" ? options.input : options.input.value || options.input.innerHTML);
		}
	} 

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