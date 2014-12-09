./phantomjs --config=phantomconfig.json casperbootstrap.js <#if deployed.isCasperJSTest>--cli test inlinescript.js</#if>
res=$?
if [ $res != 0 ] ; then
exit $res
fi
