/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
/*jshint strict:false*/
casper.test.begin('step throws', 1, function(test) {
    casper.start();
    casper.then(function() {
        throw new Error('oops!')
    });
    casper.run(function() {
        test.done();
    })
});
