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
import com.xebialabs.deployit.plugin.api.udm.artifact.DerivedArtifact;
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
        DerivedArtifact derivedArtifact = (DerivedArtifact) wrappedObject;
        LocalFile file = (LocalFile) derivedArtifact.getFile();
        try {
            return Files.readLines(file.getFile(), Charset.defaultCharset());
        } catch (IOException e) {
            throw new RuntimeIOException(e);
        }
    }
}
