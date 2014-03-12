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
					input: "#hello markdown!",
					output: fakeDomEl
				});

				expect(
					fakeDomEl.value
				).to.equal(
					"<h1 id=\"hellomarkdown\">hello markdown!</h1>"
				);
			});
		});

		describe('innerHTML', function(){
			it('should recieve HTML', function(){
				var fakeDomEl = {innerHTML:""};

				funkyDown({
					input: "#hello markdown!",
					output: fakeDomEl
				});

				expect(
					fakeDomEl.value
				).to.equal(
					"<h1 id=\"hellomarkdown\">hello markdown!</h1>"
				);
			});
		});


	});

});