const { expect } = require('chai');
const { Arrange } = require('./arrange-client');
const { WebSocket } = require('mock-socket');
// https://github.com/thoov/mock-socket
/*
Das funktioniert nicht, wine Client.-Bibliothek mit NodeJS-Unit-Tests zu prüfen.
Hier kann man weder require brauchbar verwenden, noch gibt es globale Objekte
wie window oder navigator oder WebSocket.
Also doch sowas wie PhantomJS.

Besser hier: https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai#running_it_all_on_travis_ci

*/

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