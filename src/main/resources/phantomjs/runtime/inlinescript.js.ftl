<#if deployed.script?has_content>
    ${deployed.script}
<#else>
    <#assign factory = "freemarker.template.utility.ObjectConstructor"?new()>
    <#assign helper = factory("com.xebialabs.deployit.plugin.casperjs.CasperJsFreemarkerHelper")/>
    <#assign scriptLines = helper.readScriptLines(deployed) />
    <#list scriptLines as line>
        ${line}
    </#list>
</#if>