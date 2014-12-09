<#--

    THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
    FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.

-->
<#assign factory = "freemarker.template.utility.ObjectConstructor"?new()>
<#assign helper = factory("com.xebialabs.deployit.plugin.casperjs.CasperJsFreemarkerHelper")/>
<#assign json = helper.toJson(deployed) />
var deployed=${json};
