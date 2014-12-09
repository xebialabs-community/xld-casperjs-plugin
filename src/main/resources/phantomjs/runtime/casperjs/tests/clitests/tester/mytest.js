/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*jshint strict:false*/
/*global CasperError casper console phantom require*/
casper.start('about:blank', function() {
    this.test.pass('ok1');
});

casper.then(function() {
    this.test.pass('ok2');
});

casper.run(function() {
    this.test.pass('ok3');
    this.test.done();
});
