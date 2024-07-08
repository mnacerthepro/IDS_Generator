# IDS File Editor

This web application allows users to create, edit, and generate IDS files. The IDS (Information Delivery Specification) format is used in the construction industry to define and exchange project requirements.

## Features

- Create new IDS files from scratch.
- Edit existing IDS files.
- Add and remove properties and their values.
- Save the edited IDS file to your local machine.

## Technologies Used

- HTML
- CSS
- JavaScript

## Installation

To run this app locally, follow these steps:

1. Clone the repository:

    git clone https://github.com/mnacerthepro/IDS_Generator.git

2. Navigate to the project directory:

    cd  IDS_Generator

3. Open `index.html` in your preferred browser.

## Usage

1. **Creating a New IDS File:**
   - Click on the "New IDS" button to clear the form and start creating a new IDS file.
   
2. **Editing an Existing IDS File:**
   - Click on the "Edit IDS" button to open a file dialog. Select the IDS file you want to edit. The form will be populated with the file's data.

3. **Adding a Parameter:**
   - Click the "Add Parameter" button to add a new parameter group.
   - Fill in the "Property Set", "Property Name", and select the "Data Type".
   - Add values by typing in the "Add a value" field and clicking the "Add Value" button.

4. **Removing a Parameter:**
   - Click the "Remove Parameter" button within the parameter group you want to remove. Note that at least one parameter group must be present.

5. **Generating and Downloading the IDS File:**
   - After filling out the form, click the "Generate IDS File" button.
   - The generated IDS file will be downloaded automatically.

## File Structure

- `index.html` - The main HTML file containing the structure of the app.
- `styles.css` - The CSS file for styling the app.
- `script.js` - The JavaScript file containing the logic for handling file input, parsing, and form interactions.

## Example IDS File

Here is an example of the IDS file structure that this app handles:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ids:ids xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd" xmlns:ids="http://standards.buildingsmart.org/IDS">
  <ids:info>
    <ids:title>VD</ids:title>
  </ids:info>
  <ids:specifications>
    <ids:specification ifcVersion="" name="Nouvelle spécification">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        <ids:property dataType="IFCTEXT">
          <ids:propertySet>
            <xs:restriction base="xs:string">
              <xs:enumeration value="IFC_WBS" />
            </xs:restriction>
          </ids:propertySet>
          <ids:baseName>
            <ids:simpleValue>WBS_METIER</ids:simpleValue>
          </ids:baseName>
          <ids:value>
            <xs:restriction base="xs:string">
              <xs:enumeration value="VOIE" />
              <xs:enumeration value="CAT" />
              <xs:enumeration value="SIG" />
            </xs:restriction>
          </ids:value>
        </ids:property>
        <ids:property dataType="IFCTEXT">
          <ids:propertySet>
            <xs:restriction base="xs:string">
              <xs:enumeration value="IFC_WBS" />
            </xs:restriction>
          </ids:propertySet>
          <ids:baseName>
            <ids:simpleValue>WBS_ZONE</ids:simpleValue>
          </ids:baseName>
          <ids:value>
            <xs:restriction base="xs:string">
              <xs:enumeration value="Zone1" />
              <xs:enumeration value="Zone2" />
            </xs:restriction>
          </ids:value>
        </ids:property>
      </ids:applicability>
      <ids:requirements />
    </ids:specification>
  </ids:specifications>
</ids:ids>
```

## License



## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or suggestions, please contact me
