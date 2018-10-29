function mockWebsocket() {
    WebSocket = function() {
    };
    WebSocket.prototype.send = function(messagestring) {
        var message = JSON.parse(messagestring);
        var type = message.type;
        var data = message.data;
        var returndata = {};
        switch (type) {
            case 'login':
                returndata.type = 'onlogin';
                returndata.data = data.username === 'username' && data.password === 'password' ? true : false;
                break;
        }
        this.onmessage({ data: JSON.stringify(returndata) });
    }
}

describe('class Arrange', async() => {

    describe('connect', async() => {

        it('Returns null when the given URL is not starting with "wss://"', async() => {
            var arr = Arrange.connect('invalidurl');
            assert.isNull(arr);
        });

        it('Returns null when the given URL does not contain an hostname', async() => {
            var arr = Arrange.connect('wss://');
            assert.isNull(arr);
        });

        it('Returns a connection object when the given URL is a valid websocket URL', async() => {
            var arr = Arrange.connect('wss://127.0.0.1');
            assert.isNotNull(arr);
        });

        it('Returns a connection object when no URL is given', async() => {
            var arr = Arrange.connect();
            assert.isNotNull(arr);
        });

    });

    describe('login', async() => {

        before(() => {
            mockWebsocket();
        });

        it('returns true when loggin in with correct username and password', async() => {
            var arr = Arrange.connect();
            var result = await arr.login('username', 'password');
            assert.isTrue(result);
        });

        it('returns false when loggin in with unknown username', async() => {
            var arr = Arrange.connect();
            var result = await arr.login('unknownusername', 'password');
            assert.isFalse(result);
        });

        it('returns false when loggin in with wrong password', async() => {
            var arr = Arrange.connect();
            var result = await arr.login('username', 'wrongpassword');
            assert.isFalse(result);
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