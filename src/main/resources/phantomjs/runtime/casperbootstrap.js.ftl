<#--

    THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
    FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.

-->
console.log("\n ------------------ Phantom Console Output ------------------ \n\n");

phantom.injectJs('deployed.js');

<#if step.hostFileSeparator == "\\">
phantom.casperPath ='${step.remoteWorkingDirectory.path?replace("\\","\\\\")}\\casperjs';
phantom.injectJs(phantom.casperPath + '\\bin\\bootstrap.js');
<#else>
phantom.casperPath ='${step.remoteWorkingDirectory.path}/casperjs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');
</#if>

<#if !deployed.isCasperJSTest>
phantom.injectJs('inlinescript.js');
</#if>
