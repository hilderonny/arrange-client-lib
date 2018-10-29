// Karma Coverage: https://github.com/karma-runner/karma-coverage, https://github.com/caitp/karma-coveralls, https://github.com/CurtisHumphrey/es6-library-boilerplate/blob/master/karma.config.js

describe('class Arrange', async() => {

    describe('connect', async() => {

        it('Returns null when the given URL is invalid', async() => {
            var arr = Arrange.connect();
            console.log(arr);
        });

        xit('Returns null when the given URL does not target an arrange server', async() => {
        });

        xit('Returns a connection object when the given URL targets an arrange server', async() => {
        });

    });

    describe('FIELDTYPE', async() => {

        it('Contains field type "boolean" with value "boolean"', async() => {
            expect(Arrange.FIELDTYPE.boolean).to.equal('boolean');
        });

        it('Contains field type "number" with value "number"', async() => {
            expect(Arrange.FIELDTYPE.number).to.equal('number');
        });

        it('Contains field type "text" with value "text"', async() => {
            expect(Arrange.FIELDTYPE.text).to.equal('text');
        });

    });

});