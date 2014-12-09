@echo off
phantomjs --config=phantomconfig.json casperbootstrap.js <#if deployed.isCasperJSTest>--cli test inlinescript.js</#if>
set RES=%ERRORLEVEL%
if not "%RES%" == "0" (
exit %RES%
)
