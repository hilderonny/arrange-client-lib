/**
 * Arrange client library. The instanziation of a new server connection is done via Arrange.connect(url).
 */
class Arrange {

    /**
     * Connect to server. Use Arrange.connect() for easier access.
     * @param {String} url URL of the server, defaults to window.location at same host
     */
    constructor(url) {
        this.messagehandlers = messagehandlers = {};
        messagehandlers.prototype.add = (msgtype, handler) => {
            if (!messagehandlers[msgtype]) messagehandlers[msgtype] = [];
            messagehandlers[msgtype].push(handler);
        }
        messagehandlers.prototype.remove = (msgtype, handler) => {
            if (!messagehandlers[msgtype]) return;
            messagehandlers[msgtype].splice(messagehandlers[msgtype].indexOf(handler), 1);
        }
        self.websocket = new WebSocket(url);
        self.websocket.onmessage = (evt) => {
            try {
                const msg = JSON.parse(evt.data);
                const msgtype = msg.type;
                if (!msgtype) return; // When no message type was set, ignore the message
                if (!self[msgtype]) return; // When there are not handlers, ignore the message
                self[msgtype].forEach((handler) => {
                    handler(msg);
                });
            } catch(err) {} // Ignore parsing errors, can be that only text was sent

        }
    }

    /**
     * Create a parent child relation between two objects.
     * The parent and child objects must exist in the client of the logged in user.
     * @param {String} parentdatatypeid Datatype ID of the parent object
     * @param {String} parentobjectid ID of the parent object
     * @param {String} childdatatypeid Datatype ID of the child object
     * @param {String} childobjectid ID of the child object
     * @returns {Boolean} True, when the parent child relation was created, false otherwise
     */
    async addchild(parentdatatypeid, parentobjectid, childdatatypeid, childobjectid) {
        return this.dorequest('addchild', { parentdatatypeid: parentdatatypeid, parentobjectid: parentobjectid, childdatatypeid: childdatatypeid, childobjectid: childobjectid }, 'onaddchild');
    }

    /**
     * Creates a client and returns it with an id.
     * Works only, when logged in as 'admin'.
     * @param {String} clientname Name for the new client. Does not need to be unique and can contain any string.
     * @returns Client object containing an id field or null when the logged in user was not 'admin'.
     * @example
     * await arrangeconnection.login('admin', 'adminpassword'); // Need to login as admin
     * var newclient = await arrangeconnection.createClient('My new client');
     * // newclient = {
     * //     id: 'generatedid',
     * //     name: 'My new client'
     * // }
     */
    async createclient(clientname) {
        return this.dorequest('createclient', { clientname: clientname }, 'oncreateclient');
    }

    /**
     * Creates a datatype and returns it with an id. A corresponding table will be created in
     * the database of the currently logged in user. 'admin'`s cannot create datatypes.
     * @param {String} datatypename Name of the datatype
     * @returns Object containing the id of the created datatype.
     * @example
     * var newdatatype = await arrangeconnection.createdatatype('My new datatype');
     * // newdatatype = {
     * //     id: 'generatedid',
     * //     name: 'My new datatype'
     * // }
     */
    async createdatatype(datatypename) {
        return this.dorequest('createdatatype', { datatypename: datatypename }, 'oncreatedatatype');
    }

    /**
     * Creates a field for a datatype. Returns the field with the generated id.
     * When the datatype or fieldtype does not exist, null is returned.
     */
    async createfield(datatypeid, fieldname, fieldtype) {
        return this.dorequest('createfield', { datatypeid: datatypeid, fieldname: fieldname, fieldtype: fieldtype }, 'oncreatefield');
    }

    /**
     * Creates an user within the client where the currently logged in user belongs to. When the 'admin' user
     * is logged in, the 'clientid' parameter must be set to define in which client the user should be created.
     * Fails when there is already an user with the given username in any client.
     * Returns the user without a password but with the generated id.
     * When there is no client with the given name, null is returned.
     * @param {String} username Username to use. Must be unique across all clients. 'admin' is not allowed.
     * @param {String} password Password for the new user
     * @param {String} clientid When the currently logged in user is 'admin', the new user is created in the client with this id, otherwise this parameter is ignored.
     * @returns {Object} Returns an object with the id of the newly created user or null, when the username is already in use or when the 'admin' user was logged in and there is no client with the given clientid. The password is not returned.
     * @example
     * // Create an user in any client when logged in as 'admin'
     * await arrangeconnection.login('admin', 'adminpassword');
     * var newuser = await arrangeconnection.createuser('newusername', 'newpassword', 'idoftheclient');
     * // newuser = {
     * //    id: 'generatedid',
     * //    username: 'newusername'
     * // }
     * // Login as normal user in a client
     * await arrangeconnection.login('normalusername', 'userpassword');
     * // Create an user in the same client as the logged in user
     * var newuser = await arrangeconnection.createuser('newusername', 'newpassword');
     */
    async createuser(username, password, clientid) {
        return this.dorequest('createuser', { clientid: clientid, username: username, password: password }, 'oncreateuser');
    }

    async deleteclient(clientid) {
        return this.dorequest('deleteclient', { clientid: clientid }, 'ondeleteclient');
    }

    /**
     * Delete a datatype and its corresponding database table.
     * When there is no datatype of the given id, nothing happens
     */
    async deletedatatype(datatypeid) {
        return this.dorequest('deletedatatype', { datatypeid: datatypeid }, 'ondeletedatatype');
    }

    /**
     * Delete a field of an object. All data of all objects in this field will be lost.
     * The field will be removed from the database table. When there is no field or datatype with the given id,
     * nothing happens.
     */
    async deletefield(datatypeid, fieldid) {
        return this.dorequest('deletefield', { datatypeid: datatypeid, fieldid: fieldid }, 'ondeletedatatype');
    }

    /**
     * Deletes an object of the given datatype and id.
     * When the datatype or object does not exists, nothing happens
     */
    async deleteobject(datatypeid, objectid) {
        return this.dorequest('deleteobject', { datatypeid: datatypeid, objectid: objectid }, 'ondeleteobject');
    }

    /**
     * Performs a request to the server and waits for the given result event
     */
    async dorequest(eventtosend, objecttosend, eventtowaitfor) {
        var ws = this.websocket;
        var mh = this.messagehandlers;
        return new Promise((resolve, reject) => {
            var timeout, callback;
            timeout = setTimeout(() => {
                mh.remove(eventtowaitfor, callback);
                reject();
            }, 2000);
            callback = (result) => {
                clearTimeout(timeout);
                mh.remove(eventtowaitfor, callback);
                resolve(result.data);
            };
            mh.add(eventtowaitfor, callback);
            ws.send(JSON.stringify({ type: eventtosend, data: objecttosend }));
        });
    }

    /**
     * Returns all datatypes with their fields. There is no need to obtain
     * information about special datatypes or fields separately because this call
     * contains a very small amount of data, so it can be retrieved all at once.
     */
    async getdatatypes() {
        return this.dorequest('getdatatypes', null, 'ongetdatatypes');
    }

    /**
     * Login an user. Depending on the username the user is logged in at its
     * corresponding client. Only the 'admin' user has special meanings and functions.
     * When the user was logged in before, logout() is called automatically, wo that the
     * user gets re-logged in. When the relogin fails, the user stays in the state "not logged in".
     * @param {String} username Username to use
     * @param {String} password Password of the user
     * @returns {Boolean} True on success, false when the username does not exist or the password is wrong.
     */
    async login(username, password) {
        return this.dorequest('login', { username: username, password: password }, 'onlogin');
    }

    /**
     * Logout the currently logged in user by destroying his session. After this call,
     * only login can be used to relogin. When the user was not logged in before, nothing happens.
     */
    async logout() {
        return this.dorequest('logout', null, 'onlogout');
    }

    /**
     * Creates or updates an object. When the data parameter contains
     * an id field and an object with this id exists, it will be updated.
     * Otherwise a new object will be created.
     * Only those fields get updated which are contained in the data.
     * The response contains the full object with an id field.
     */
    async saveobject(datatypeid, data) {
        return this.dorequest('saveobject', { datatypeid: datatypeid, data: data }, 'onsaveobject');
    }

    /**
     * Connect to the given server.
     * @param {String} url URL of the server, defaults to window.location at same host
     * @returns {Arrange} Instance of the arrange server connection
     * @example
     * var arrangeconnection = await Arrange.connect('myarrangeserverurl');
     */
    static async connect(url) {
        return new Arrange(url);
    }

}

/**
 * Describes possible types of datatype fields.
 * @memberof Arrange
 * @enum {String}
 */
Arrange.FIELDTYPE = {
    /** Used for all texts of any length. Value is 'text' */
    text: 'text',
    /** Can be true or false. Value is 'boolean' */
    boolean: 'boolean',
    number: 'number'
}

// When used in NodeJS, export the class as module, wo it can be included via:
// const { Arrange } = require('./arrange-client');
if (module) module.exports.Arrange = Arrange;