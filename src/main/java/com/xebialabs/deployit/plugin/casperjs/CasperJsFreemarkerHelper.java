/**
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */
package com.xebialabs.deployit.plugin.casperjs;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;
import com.google.common.io.Files;

import com.xebialabs.deployit.plugin.api.udm.ConfigurationItem;
import com.xebialabs.deployit.plugin.api.udm.base.BaseDeployableFileArtifact;
import com.xebialabs.deployit.plugin.generic.deployed.AbstractDeployed;
import com.xebialabs.overthere.RuntimeIOException;
import com.xebialabs.overthere.local.LocalFile;

import freemarker.ext.beans.BeanModel;

public class CasperJsFreemarkerHelper {

    public String toJson(BeanModel deployedBeanModel) {
        ConfigurationItem ci = (ConfigurationItem) deployedBeanModel.getWrappedObject();
        return new CiToJsonConverter().toJson(ci);
    }

    public List<String> readScriptLines(BeanModel deployedBeanModel) {
        final Object wrappedObject = deployedBeanModel.getWrappedObject();
        AbstractDeployed<?> deployedArtifact = (AbstractDeployed<?>) wrappedObject;
        BaseDeployableFileArtifact deployable = (BaseDeployableFileArtifact) deployedArtifact.getDeployable();
        LocalFile file = (LocalFile) deployable.getFile();
        try {
            return Files.readLines(file.getFile(), Charset.defaultCharset());
        } catch (IOException e) {
            throw new RuntimeIOException(e);
        }
    }
}
