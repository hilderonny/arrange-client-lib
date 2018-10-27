# arrange platform client-library

[![Build Status](https://travis-ci.org/arrangeplatform/client-library.svg?branch=master)](https://travis-ci.org/arrangeplatform/client-library)

## Creating a client

New clients can only be created by the 'admin' user.

```js
// Connect to Arrange server
var arrangeconnection = await Arrange.connect('urlofarrangeserver');
// Log in as admin
await arrangeconnection.login('admin', 'adminpassword');
// Create a new client
var newclient = await arrangeconnection.createclient('My very new client');
// Create user within the client
await arrangeconnection.createuser('myusername', 'mypassword', newclient.id);
// Re-login as client user, login does an automatic logout
await arrangeconnection.login('myusername', 'mypassword');
// Do any stuff in the new client scope
```