<#assign factory = "freemarker.template.utility.ObjectConstructor"?new()>
<#assign helper = factory("com.xebialabs.deployit.plugin.casperjs.CasperJsFreemarkerHelper")/>
<#assign json = helper.toJson(deployed) />
var deployed=${json};
