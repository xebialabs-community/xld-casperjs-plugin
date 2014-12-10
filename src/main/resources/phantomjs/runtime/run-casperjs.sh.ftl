<#--

    THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
    FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.

-->
chmod +x ./phantomjs
./phantomjs --debug=true --config=phantomconfig.json casperbootstrap.js <#if deployed.isCasperJSTest>--cli test inlinescript.js</#if>
res=$?
if [ $res != 0 ] ; then
exit $res
fi
