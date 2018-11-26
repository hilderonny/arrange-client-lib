# arrange platform client-library

[![Build Status](https://travis-ci.org/arrangeplatform/client-library.svg?branch=master)](https://travis-ci.org/arrangeplatform/client-library)
[![Coverage Status](https://coveralls.io/repos/github/arrangeplatform/client-library/badge.svg?branch=master)](https://coveralls.io/github/arrangeplatform/client-library?branch=master)
[![Inline docs](https://inch-ci.org/github/arrangeplatform/client-library.svg?branch=master)](https://inch-ci.org/github/arrangeplatform/client-library)
[![Maintainability](https://api.codeclimate.com/v1/badges/dded5b14a388feb941bb/maintainability)](https://codeclimate.com/github/arrangeplatform/client-library/maintainability)
[![dependencies Status](https://david-dm.org/arrangeplatform/client-library/status.svg)](https://david-dm.org/arrangeplatform/client-library)
[![devDependencies Status](https://david-dm.org/arrangeplatform/client-library/dev-status.svg)](https://david-dm.org/arrangeplatform/client-library?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/arrangeplatform/client-library/issues)

## Creating a client

New clients can only be created by the 'admin' user.

[arrange-client.min.js](https://arrangeplatform.github.io/client-library/arrange-client.min.js)

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
