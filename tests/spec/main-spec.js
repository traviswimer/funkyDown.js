var expect = chai.expect;

describe('FunkyDown', function(){

	describe('options variable', function(){


		describe('undefined input property', function(){
			it('should throw error', function(){
				expect(function(){
					funkyDown({});
				}).to.throw("You must specify an input string or DOM element.");
			});
		});

		describe('undefined output property', function(){
			it('should throw error', function(){
				expect(function(){
					funkyDown({
						input: "a"
					});
				}).to.throw("You must specify an output DOM element.");
			});
		});

	});

	describe('output', function(){

		describe('value', function(){
			it('should recieve HTML', function(){
				var fakeDomEl = {value:""};

				funkyDown({
					input: "#header",
					output: fakeDomEl
				});

				expect(
					fakeDomEl.value
				).to.equal(
					"<h1 id=\"header\">header</h1>"
				);
			});
		});

		describe('innerHTML', function(){
			it('should recieve HTML', function(){
				var fakeDomEl = {innerHTML:""};

				funkyDown({
					input: "#header",
					output: fakeDomEl
				});

				expect(
					fakeDomEl.value
				).to.equal(
					"<h1 id=\"header\">header</h1>"
				);
			});
		});


	});

	describe('load method', function(){
		it('should display updated input value', function(){

			var inputDomEl = {value:"1"};
			var outputDomEl = {value:""};

			var test = funkyDown({
				input: inputDomEl,
				output: outputDomEl
			});

			inputDomEl.value = "2";
			test.load();

			expect(
				outputDomEl.value
			).to.equal(
				"<p>2</p>"
			);

		});


		it('should accept values to update', function(){
			var inputDomEl = {value:"1"};
			var inputDomEl2 = {value:"2"};
			var outputDomEl = {value:"1"};
			var outputDomEl2 = {value:"2"};

			var test = funkyDown({
				input: inputDomEl,
				output: outputDomEl
			});

			test.load({
				input: inputDomEl2,
				output: outputDomEl2
			});

			expect(
				outputDomEl.value
			).to.equal(
				"<p>1</p>"
			);

			expect(
				outputDomEl2.value
			).to.equal(
				"<p>2</p>"
			);

		});

	});

	describe('options method', function(){
		var inputDomEl = {value:"1"};
		var inputDomEl2 = {value:"2"};
		var outputDomEl = {value:"1"};
		var outputDomEl2 = {value:"2"};


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
				outputDomEl.value
			).to.equal(
				"<p>1</p>"
			);

			expect(
				outputDomEl2.value
			).to.equal(
				"<p>2</p>"
			);

		});



	});

});