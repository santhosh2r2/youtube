from lxml import etree
import pandas as pd
import json
import os
from xml.dom.minidom import parseString
import xml.etree.ElementTree as ET
from validator import validate_xml


def unflatten_json(flat_json):
    unflattened = {}
    for key, value in flat_json.items():
        if key == "CREATED":
            continue
        parts = key.split(".")
        data = unflattened
        for part in parts[:-1]:
            element, *attr = part.split("@")
            if element not in data:
                data[element] = {}
            data = data[element]
            if attr:
                attr_name = attr[0]
                if '@attributes' not in data:
                    data['@attributes'] = {}
                data['@attributes'][attr_name] = value

        last_element, *last_attr = parts[-1].split("@")
        if last_attr:
            if last_element not in data:
                data[last_element] = {}
            if '@attributes' not in data[last_element]:
                data[last_element]['@attributes'] = {}
            data[last_element]['@attributes'][last_attr[0]] = value
        else:
            data[last_element] = value

    return unflattened



def create_xml_from_series_dict(json_data, name, ns, schema_location):

    # Function to convert dictionary to XML with custom rules
    def custom_dict_to_xml(data, root_name, namespace):
        def convert_dict_to_xml_recurse(parent, dict_item):
            for key, value in dict_item.items():
                if key == '@attributes':
                    # If the dictionary contains attributes
                    for attr_key, attr_value in value.items():
                        parent.setAttribute(attr_key, str(attr_value))
                    continue

                child = doc.createElement(key)

                # If the dictionary contains sub-elements
                if isinstance(value, dict):
                    # Check if the sub-dictionary has attributes
                    if '@attributes' in value:
                        convert_dict_to_xml_recurse(
                            child, {'@attributes': value.pop('@attributes')})

                    # Recursively convert the rest of the elements
                    convert_dict_to_xml_recurse(child, value)
                else:
                    # Add text node for simple key-value pairs
                    child.appendChild(doc.createTextNode(str(value)))

                parent.appendChild(child)

        # Create XML document
        doc = parseString('<{}></{}>'.format(root_name, root_name))
        root = doc.documentElement
        root.setAttribute("xmlns", namespace)

        convert_dict_to_xml_recurse(root, data)
        print("JSON dict converted to XML document")
        return doc.toprettyxml()

    # Convert JSON to dictionary
    data_dict = json.loads(json.dumps(json_data))

    # Convert dictionary to XML with custom rules
    xml_data = custom_dict_to_xml(data_dict, 'person', ns)

    # Sample function - convert text string with seperator to sequence elements
    def process_children(xml_string, sep=","):
        # Parse the XML string
        root = etree.fromstring(xml_string)
        namespace = {'ns': ns}

        # Navigate to the Children node
        children = root.find('.//ns:household/ns:children',
                             namespaces=namespace)

        # Split the text content into individual child names
        names = children.text.split(sep)

        # Clear the original text content
        children.clear()

        # Add new child elements
        for name in names:
            new_element = etree.SubElement(children, 'child')
            new_element.set('name', name.strip())

        # Add xmlns:xsi and xsi:schemaLocation attributes to the root element
        root.set("{http://www.w3.org/2001/XMLSchema-instance}schemaLocation",
                 f"{ns} ../{schema_location}")

        # Convert the modified XML back to a string
        modified_xml = etree.tostring(
            root, pretty_print=True, xml_declaration=True, encoding='UTF-8').decode('UTF-8')
        return modified_xml

    xml_data = process_children(xml_data)
    print("Process 'children' element completed")

    if not os.path.exists("converted"):
        os.makedirs("converted")
        print("Created the folder 'converted'")

    # Save XML data to a file
    with open(f"converted/{name}.xml", "w") as f:
        f.write(xml_data)
        print(f"XML file for person: {name} created!")


#endregion

df = pd.read_excel("docs/Persons.xlsx", index_col=3)
df_modified = df.drop(columns=['Unnamed: 0', 'Unnamed: 1', 'Attributes'])

for col in df_modified.columns:
    if not df_modified[col]["CREATED"] == True:
        flat_dict = df_modified[col].dropna()
        json_data = unflatten_json(flat_dict)
        name = flat_dict["personalInfo.name"]
        create_xml_from_series_dict(json_data, name, "http://www.example.com/person", "../source/person.xsd")
        validate_xml(f"converted/{name}.xml", "source/person.xsd")