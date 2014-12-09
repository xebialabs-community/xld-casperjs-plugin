# CasperJS plugin #

# Overview #

Plugin supports the execution of native PhantomJS or CasperJS scripts. This plugin can be useful in the writing functional tests suites of a website or simple integrations via a web interface.

# Requirements #

* **Deployit requirements**
	* **Deployit**: version 3.9.4 with hotfix depl-5368.

# Installation #

Place the plugin JAR file into your `SERVER_HOME/plugins` directory. 

# Usage #	

Define a `casperjs.Runtime` container under the desired `overthere.Host`.  The host will be used to stage the PhantomJS runtime and execute the script. The `executable` property must be set to one of the following depending on the host platform :

* windows: __win/phantomjs.exe__
* osx: __osx/phantomjs__
* linux 64-bit: __linux_64/phantomjs__
* linux 32-bit: __linux_32/phantomjs__

If your platform is not supported, you will have to compile PhantomJS for your platform.  Please refer to [PhantomJS build instructions](http://phantomjs.org/build.html) for details. Place your custom compiled executable in `<DEPLOYIT_SERVER_HOME>/ext/phantomjs/runtime/<platform name>`.

Define `casperjs.ScriptSpec` or `casperjs.Script` deployable items in a package.  These deployables are targeted to `casperjs.Runtime` containers in an environment.

All properties of a deployed can be accessed directly in the script by referring to the `deployed` javascript variable.

Please refer to [PhantomJS](http://phantomjs.org/) and [CasperJS](http://casperjs.org/) sites for detailed documentation on how to write scripts that will run in the headless PhantomJS Webkit.

# CasperJS Tests #

When running CasperJS test scripts, the `isCasperJSTest` property must be set to `true`.  

## Sample Browser Test ##

Following sample is from the [CasperJS Testing documentation](http://docs.casperjs.org/en/latest/testing.html)

	casper.test.begin('Google search retrieves 10 or more results', 5, function suite(test) {
	    casper.start("http://www.google.fr/", function() {
    	    test.assertTitle("Google", "google homepage title is the one expected");
        	test.assertExists('form[action="/search"]', "main form is found");
        	this.fill('form[action="/search"]', {
           	 q: "casperjs"
        	}, true);
    	});

    	casper.then(function() {
        	test.assertTitle("casperjs - Recherche Google", "google title is ok");
        	test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
        	test.assertEval(function() {
            	return __utils__.findAll("h3.r").length >= 10;
        	}, "google search for \"casperjs\" retrieves 10 or more results");
    	});

    	casper.run(function() {
        	test.done();
    	});
	});

