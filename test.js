const { expect } = require('chai');
const { Arrange } = require('./arrange-client');

describe('class Arrange', async() => {

    describe('connect', async() => {

        xit('Returns null when the given URL is invalid', async() => {
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