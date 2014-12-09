/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
// this should never happen
// http://docs.casperjs.org/en/latest/testing.html#test-command-args-and-options
var casper = require("casper").create();

casper.test.begin("foo", function(test) {
  "use strict";
  test.assert(true);
  test.done();
});
