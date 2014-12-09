package com.xebialabs.deployit.plugin.casperjs;

import java.util.Map;
import java.util.Set;

import com.xebialabs.deployit.plugin.api.udm.Metadata;
import com.xebialabs.deployit.plugin.api.udm.Property;
import com.xebialabs.deployit.plugin.api.udm.base.BaseConfigurationItem;

import static com.xebialabs.deployit.plugin.api.udm.Metadata.ConfigurationItemRoot.INFRASTRUCTURE;

@SuppressWarnings("serial")
@Metadata(root = INFRASTRUCTURE)
public class DummyConfigurationItem extends BaseConfigurationItem {

    @Property
    private String defaultedStringProperty;

    @Property(asContainment = true, description = "random", label = "random string", category = "deployit", required = false, size = Property.Size.LARGE)
    private String defined;

    @Property(required = false)
    private boolean boolField;

    @Property
    private int intField;

    @Property
    private String stringField;

    @Property
    private ChemistryElement enumField;

    @Property
    private DummyDeployable ciField;

    @Property
    private Set<String> stringSetField;

    @Property
    private Set<String> anotherStringSetField;

    @Property
    private Set<DummyDeployable> ciSetField;

    @Property
    private DummyConfigurationItem selfCiField;

    @Property(password = true)
    private String password;

    @Property
    private Map<String,String> mapField;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDefaultedStringProperty() {
        return defaultedStringProperty;
    }

    public void setDefaultedStringProperty(String defaultedStringProperty) {
        this.defaultedStringProperty = defaultedStringProperty;
    }

    public String getDefined() {
        return defined;
    }

    public void setDefined(String defined) {
        this.defined = defined;
    }

    public boolean isBoolField() {
        return boolField;
    }

    public void setBoolField(boolean boolField) {
        this.boolField = boolField;
    }

    public int getIntField() {
        return intField;
    }

    public void setIntField(int intField) {
        this.intField = intField;
    }

    public String getStringField() {
        return stringField;
    }

    public void setStringField(String stringField) {
        this.stringField = stringField;
    }

    public ChemistryElement getEnumField() {
        return enumField;
    }

    public void setEnumField(ChemistryElement enumField) {
        this.enumField = enumField;
    }

    public DummyDeployable getCiField() {
        return ciField;
    }

    public void setCiField(DummyDeployable ciField) {
        this.ciField = ciField;
    }

    public Set<String> getStringSetField() {
        return stringSetField;
    }

    public void setStringSetField(Set<String> stringSetField) {
        this.stringSetField = stringSetField;
    }

    public Set<DummyDeployable> getCiSetField() {
        return ciSetField;
    }

    public void setCiSetField(Set<DummyDeployable> ciSetField) {
        this.ciSetField = ciSetField;
    }

    public Set<String> getAnotherStringSetField() {
        return anotherStringSetField;
    }

    public void setAnotherStringSetField(Set<String> anotherStringSetField) {
        this.anotherStringSetField = anotherStringSetField;
    }

    public DummyConfigurationItem getSelfCiField() {
        return selfCiField;
    }

    public void setSelfCiField(DummyConfigurationItem selfCiField) {
        this.selfCiField = selfCiField;
    }

    public Map<String, String> getMapField() {
        return mapField;
    }

    public void setMapField(Map<String, String> mapField) {
        this.mapField = mapField;
    }

}
