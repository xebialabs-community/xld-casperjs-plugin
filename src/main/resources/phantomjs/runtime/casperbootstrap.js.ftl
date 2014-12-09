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
