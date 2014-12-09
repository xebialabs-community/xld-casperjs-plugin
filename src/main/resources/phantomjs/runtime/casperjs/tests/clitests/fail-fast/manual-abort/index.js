/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
casper.test.begin('test abort()', 10, function(test) {
    "use strict";
    for (var i = 0; i < 10; i++) {
        test.assert(true, 'test ' + (i + 1));
        if (i === 4) {
            test.abort('this is my abort message');
        }
    }
    test.done();
});

casper.test.begin('should not being executed', 1, function(test) {
    "use strict";
    test.fail('damn.');
    test.done();
});
