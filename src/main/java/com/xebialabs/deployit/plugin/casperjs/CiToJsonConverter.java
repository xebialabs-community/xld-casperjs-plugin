package com.xebialabs.deployit.plugin.casperjs;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.xebialabs.deployit.plugin.api.reflect.Descriptor;
import com.xebialabs.deployit.plugin.api.reflect.PropertyDescriptor;
import com.xebialabs.deployit.plugin.api.udm.ConfigurationItem;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.newHashSet;

public class CiToJsonConverter {

    public CiToJsonConverter() {
  }

    public String toJson(ConfigurationItem ci) {
        if (ci == null) {
            return null;
        }
        try {
            Set<String> reference = newHashSet();
            return convertToJson(ci, reference).toString();
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    private JSONObject convertToJson(ConfigurationItem ci, Set<String> reference) throws JSONException {

        if (ci == null) {
           return null;
        }

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", ci.getId());
        jsonObject.put("type", ci.getType());
        jsonObject.put("name", ci.getName());

        if (reference.contains(ci.getId())) {
            return jsonObject;
        }

        reference.add(ci.getId());

        Descriptor descriptor = ci.getType().getDescriptor();

        for (PropertyDescriptor pd : descriptor.getPropertyDescriptors()) {
            switch (pd.getKind()) {
                case CI:
                    jsonObject.put(pd.getName(), convertToJson((ConfigurationItem) pd.get(ci), reference));
                    break;
                case LIST_OF_CI:
                case SET_OF_CI:
                    if (pd.get(ci) != null) {
                        List<JSONObject> jsonObjectCis = newArrayList();
                        for (ConfigurationItem item : (Collection<ConfigurationItem>)pd.get(ci)) {
                            jsonObjectCis.add(convertToJson(item, reference));
                        }
                        jsonObject.put(pd.getName(), jsonObjectCis);
                    }
                    break;

                case LIST_OF_STRING:
                case SET_OF_STRING:
                    if (pd.get(ci) != null) {
                        JSONArray jsonArray = new JSONArray();
                        for (String item : (Collection<String>)pd.get(ci)) {
                            jsonArray.put(item);
                        }
                        jsonObject.put(pd.getName(), jsonArray);
                    }
                    break;

                case MAP_STRING_STRING:
                    if (pd.get(ci) != null) {
                        JSONObject jsonMap = new JSONObject();
                        Set<Map.Entry<String, String>> entries = ((Map<String, String>) pd.get(ci)).entrySet();
                        for (Map.Entry<String, String> entry : entries) {
                            jsonMap.put(entry.getKey(), entry.getValue());
                        }
                        jsonObject.put(pd.getName(), jsonMap);
                    }
                    break;

                default:
                    jsonObject.put(pd.getName(), pd.get(ci));
                    break;
            }
        }


        return jsonObject;
    }
}
