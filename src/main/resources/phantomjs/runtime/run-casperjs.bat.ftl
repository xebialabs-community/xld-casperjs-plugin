<#--

    THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
    FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.

-->
@echo off
phantomjs --debug=${deployed.debug} --config=phantomconfig.json casperbootstrap.js <#if deployed.isCasperJSTest>--cli test inlinescript.js</#if>
set RES=%ERRORLEVEL%
if not "%RES%" == "0" (
exit %RES%
)
