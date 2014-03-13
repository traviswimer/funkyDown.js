var expect = chai.expect;

describe('FunkyDown', function(){

	describe('options variable', function(){


		describe('input property', function(){
			it('should throw error when undefined', function(){
				expect(function(){
					funkyDown({});
				}).to.throw("You must specify an input string, DOM element, or function.");
			});


			it('should accept strings', function(){
				expect(function(){
					funkyDown({
						input: "a"
					});
				}).to.throw("You must specify an output DOM element or function.");
			});

			it('should accept DOM-like objects', function(){
				expect(function(){
					funkyDown({
						input: {value: "a"}
					});
				}).to.throw("You must specify an output DOM element or function.");

				expect(function(){
					funkyDown({
						input: {innerHTML: "a"}
					});
				}).to.throw("You must specify an output DOM element or function.");
			});

			it('should accept functions', function(){
				var domEl = document.createElement('div');

				funkyDown({
					input: function(){
						return "a";
					},
					output: domEl
				});

				expect(domEl.innerHTML).to.equal("<p>a</p>");
			});

		});


		describe('output property', function(){

			it('should throw error when undefined', function(){
				expect(function(){
					funkyDown({
						input: "a"
					});
				}).to.throw("You must specify an output DOM element or function.");
			});

			it('value should recieve HTML', function(){
				var domEl = document.createElement('textarea');

				funkyDown({
					input: "#header",
					output: domEl
				});

				expect(
					domEl.value
				).to.equal(
					"<h1 id=\"header\">header</h1>"
				);
			});

			it('innerHTML should recieve HTML', function(){
				var domEl = document.createElement('div');

				funkyDown({
					input: "#header",
					output: domEl
				});

				expect(
					domEl.innerHTML
				).to.equal(
					"<h1 id=\"header\">header</h1>"
				);
			});



			it('function should recieve HTML', function(){
				var domEl = document.createElement('div');

				funkyDown({
					input: "#header",
					output: function(html){
						domEl.innerHTML = html + " success";
					}
				});

				expect(
					domEl.innerHTML
				).to.equal(
					"<h1 id=\"header\">header</h1> success"
				);
			});


		});

	});

	

	describe('load method', function(){
		it('should display updated input value', function(){

			var inputDomEl = document.createElement('input');
			inputDomEl.type = "text";
			inputDomEl.value = "1";

			var outputDomEl = document.createElement('div');

			var test = funkyDown({
				input: inputDomEl,
				output: outputDomEl
			});

			inputDomEl.value = "2";
			test.load();

			expect(
				outputDomEl.innerHTML
			).to.equal(
				"<p>2</p>"
			);

		});


		it('should accept values to update', function(){

			var inputDomEl = document.createElement('input');
			inputDomEl.type = "text";
			inputDomEl.value = "1";
			var inputDomEl2 = document.createElement('input');
			inputDomEl2.type = "text";
			inputDomEl2.value = "2";

			var outputDomEl = document.createElement('div');
			outputDomEl.innerHTML = "";
			var outputDomEl2 = document.createElement('div');
			outputDomEl2.innerHTML = "";

			var test = funkyDown({
				input: inputDomEl,
				output: outputDomEl
			});

			test.load({
				input: inputDomEl2,
				output: outputDomEl2
			});

			expect(
				outputDomEl.innerHTML
			).to.equal(
				"<p>1</p>"
			);

			expect(
				outputDomEl2.innerHTML
			).to.equal(
				"<p>2</p>"
			);

		});

	});

	describe('options method', function(){
		var inputDomEl = document.createElement('input');
		inputDomEl.type = "text";
		inputDomEl.value = "1";
		var inputDomEl2 = document.createElement('input');
		inputDomEl2.type = "text";
		inputDomEl2.value = "2";

		var outputDomEl = document.createElement('div');
		outputDomEl.innerHTML = "";
		var outputDomEl2 = document.createElement('div');
		outputDomEl2.innerHTML = "";


		it('should updated input/output values', function(){

			var test = funkyDown({
				input: inputDomEl,
				output: outputDomEl
			});

			test.options({
				input: inputDomEl2,
				output: outputDomEl2
			});

			test.load();

			expect(
				outputDomEl.innerHTML
			).to.equal(
				"<p>1</p>"
			);

			expect(
				outputDomEl2.innerHTML
			).to.equal(
				"<p>2</p>"
			);

		});



	});

});