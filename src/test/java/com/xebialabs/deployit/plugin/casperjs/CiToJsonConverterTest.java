package com.xebialabs.deployit.plugin.casperjs;

import java.util.Map;
import java.util.Set;
import javax.script.ScriptException;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.junit.BeforeClass;
import org.junit.Test;

import com.xebialabs.deployit.booter.local.LocalBooter;
import com.xebialabs.deployit.plugin.api.reflect.Descriptor;
import com.xebialabs.deployit.plugin.api.reflect.DescriptorRegistry;
import com.xebialabs.deployit.plugin.api.reflect.Type;

import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Sets.newTreeSet;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.instanceOf;

public class CiToJsonConverterTest {

    @BeforeClass
    public static void bootPlugins() {
        LocalBooter.bootWithoutGlobalContext();
    }

    public static <T> T newInstance(String type) {
        Descriptor descriptor = DescriptorRegistry.getDescriptor(type);
        if (descriptor == null) {
            throw new RuntimeException("Cannot instantiate unknown type");

        }
        return (T) descriptor.newInstance();
    }

    @SuppressWarnings("unchecked")
    public static <T> T newInstance(Class<T> clazz) {
        return newInstance(Type.valueOf(clazz).toString());
    }

    @Test
    public void shouldConvertSimpleConfigurationItem() throws ScriptException, JSONException {
        DummyConfigurationItem ci = newInstance(DummyConfigurationItem.class);
        ci.setId("Dummy/Configuration/Item/id");
        ci.setDefined("definedValue");
        ci.setBoolField(true);
        ci.setIntField(42);
        ci.setDefaultedStringProperty("defaultedStringProperty");
        ci.setStringField(null);
        ci.setEnumField(ChemistryElement.HYDROGEN);
        Set<String> setOfStrings = newTreeSet();
        setOfStrings.add("oneString");
        setOfStrings.add("anotherString");
        ci.setStringSetField(setOfStrings);
        ci.setAnotherStringSetField(null);
        Map<String, String> map = newHashMap();
        map.put("key", "value");
        map.put("keyWithNullValue", null);
        ci.setMapField(map);


        CiToJsonConverter jsonWriter = new CiToJsonConverter();
        String json = jsonWriter.toJson(ci);
        System.out.println(json);

        JSONObject jsonObject = new JSONObject(json);

        assertThat(jsonObject.getString("id"), equalTo("Dummy/Configuration/Item/id"));
        assertThat(jsonObject.getString("name"), equalTo("id"));
        assertThat(jsonObject.getString("type"), equalTo("casperjs.DummyConfigurationItem"));
        assertThat(jsonObject.getString("defined"), equalTo("definedValue"));
        assertThat(jsonObject.getBoolean("boolField"), equalTo(true));
        assertThat(jsonObject.getInt("intField"), equalTo(42));
        assertThat(jsonObject.has("stringField"), equalTo(false));
        assertThat(jsonObject.getString("enumField"), equalTo("HYDROGEN"));

        assertThat(jsonObject.getJSONArray("stringSetField"), instanceOf(JSONArray.class));
        JSONArray jsonArray = jsonObject.getJSONArray("stringSetField");
        assertThat(jsonArray.length(), equalTo(2));
        assertThat(jsonArray.getString(0), equalTo("anotherString"));
        assertThat(jsonArray.getString(1), equalTo("oneString"));
        assertThat(jsonObject.has("anotherStringSetField"), equalTo(false));


        assertThat(jsonObject.getJSONObject("mapField"), instanceOf(JSONObject.class));
        JSONObject jsonMap = jsonObject.getJSONObject("mapField");
        assertThat(jsonMap.length(), equalTo(1));
        assertThat(jsonMap.getString("key"), equalTo("value"));
    }

    @Test
    public void shouldConvertCircularReferenceConfigurationItem() throws JSONException {
        DummyConfigurationItem ci = newInstance(DummyConfigurationItem.class);
        ci.setSelfCiField(ci);
        CiToJsonConverter jsonWriter = new CiToJsonConverter();
        String json = jsonWriter.toJson(ci);
        System.out.println(json);

        JSONObject jsonObject = new JSONObject(json);

        assertThat(jsonObject.getJSONObject("selfCiField"), instanceOf(JSONObject.class));
    }


}
