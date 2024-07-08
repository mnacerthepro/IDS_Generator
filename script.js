// Add these functions at the beginning of your script.js file

function clearForm() {
    document.getElementById('project_name').value = '';
    document.getElementById('entity_name').value = '';
    document.getElementById('parameters').innerHTML = '';
    createParameterGroup(); // Add an initial parameter group
}

function parseIdsFile(content) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "text/xml");

    // Extract project name
    const projectName = xmlDoc.querySelector('ids\\:title').textContent;
    document.getElementById('project_name').value = projectName;

    // Extract entity name (assuming it's the same for all properties)
    const entityName = xmlDoc.querySelector('ids\\:name').textContent;
    document.getElementById('entity_name').value = entityName;

    // Clear existing parameters
    document.getElementById('parameters').innerHTML = '';

    // Extract properties
    const properties = xmlDoc.querySelectorAll('ids\\:property');
    properties.forEach(property => {
        const group = createParameterGroup();
        
        const propertySet = property.querySelector('ids\\:propertySet xs\\:enumeration').getAttribute('value');
        group.querySelector('.property-set').value = propertySet;

        const propertyName = property.querySelector('ids\\:baseName ids\\:simpleValue').textContent;
        group.querySelector('.property-name').value = propertyName;

        const dataType = property.getAttribute('dataType');
        group.querySelector('.data-type').value = dataType;

        const values = property.querySelectorAll('ids\\:value xs\\:enumeration');
        values.forEach(value => {
            addValue(group, value.getAttribute('value'));
        });

        document.getElementById('parameters').appendChild(group);
    });
}

function addValue(group, value) {
    const valuesList = group.querySelector('.values-list');
    const valueItem = document.createElement('span');
    valueItem.className = 'value-item';
    valueItem.innerHTML = `
        ${value}
        <button type="button" class="remove-value">&times;</button>
    `;
    valuesList.appendChild(valueItem);
}
const dataTypes = [
    'IFCTEXT', 'IFCLABEL', 'IFCIDENTIFIER', 'IFCBOOLEAN', 'IFCINTEGER', 
    'IFCREAL', 'IFCDATETIME', 'IFCDATE', 'IFCTIME', 'IFCDURATION', 
    'IFCTIMESTAMP', 'IFCPOSITIVEINTEGER', 'IFCBINARY', 'IFCLOGICAL'
];

function createParameterGroup() {
    const group = document.createElement('div');
    group.className = 'parameter-group';
    group.innerHTML = `
        <input type="text" class="property-set" placeholder="Property Set" required>
        <input type="text" class="property-name" placeholder="Property Name" required>
        <select class="data-type">
            ${dataTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
        </select>
        <div class="values-list"></div>
        <input type="text" class="new-value" placeholder="Add a value">
        <button type="button" class="add-value">Add Value</button>
        <button type="button" class="remove-parameter">Remove Parameter</button>
    `;
    return group;
}

// Populate initial parameter group
document.addEventListener('DOMContentLoaded', function() {
    const parametersDiv = document.getElementById('parameters');
    parametersDiv.appendChild(createParameterGroup());
});

document.getElementById('add-parameter').addEventListener('click', function() {
    const parametersDiv = document.getElementById('parameters');
    parametersDiv.appendChild(createParameterGroup());
});

document.getElementById('parameters').addEventListener('click', function(e) {
    if (e.target.className === 'remove-parameter') {
        if (document.querySelectorAll('.parameter-group').length > 1) {
            e.target.closest('.parameter-group').remove();
        } else {
            alert('You must have at least one parameter group.');
        }
    } else if (e.target.className === 'add-value') {
        const group = e.target.closest('.parameter-group');
        const newValue = group.querySelector('.new-value').value.trim();
        if (newValue) {
            const valuesList = group.querySelector('.values-list');
            const valueItem = document.createElement('span');
            valueItem.className = 'value-item';
            valueItem.innerHTML = `
                ${newValue}
                <button type="button" class="remove-value">&times;</button>
            `;
            valuesList.appendChild(valueItem);
            group.querySelector('.new-value').value = '';
        }
    } else if (e.target.className === 'remove-value') {
        e.target.closest('.value-item').remove();
    }
});

document.getElementById('idsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const projectName = document.getElementById('project_name').value;
    
    let propertiesXml = '';
    const parameterGroups = document.querySelectorAll('.parameter-group');
    parameterGroups.forEach(group => {
        const propertySet = group.querySelector('.property-set').value;
        const propertyName = group.querySelector('.property-name').value;
        const dataType = group.querySelector('.data-type').value;
        const values = Array.from(group.querySelectorAll('.value-item'))
            .map(item => item.textContent.trim().replace(/×$/, '').trim());
        
        propertiesXml += `
        <ids:property dataType="${dataType || 'IFCTEXT'}">
          <ids:propertySet>
            <xs:restriction base="xs:string">
              <xs:enumeration value="${propertySet}" />
            </xs:restriction>
          </ids:propertySet>
          <ids:baseName>
            <ids:simpleValue>${propertyName}</ids:simpleValue>
          </ids:baseName>
          <ids:value>
            <xs:restriction base="xs:string">
              ${values.map(value => `<xs:enumeration value="${value}" />`).join('\n              ')}
            </xs:restriction>
          </ids:value>
        </ids:property>`;
    });

    const xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ids:ids xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://standards.buildingsmart.org/IDS http://standards.buildingsmart.org/IDS/1.0/ids.xsd" xmlns:ids="http://standards.buildingsmart.org/IDS">
  <ids:info>
    <ids:title>${projectName}</ids:title>
  </ids:info>
  <ids:specifications>
    <ids:specification ifcVersion="" name="Nouvelle spécification">
      <ids:applicability minOccurs="1" maxOccurs="unbounded">
        ${propertiesXml}
      </ids:applicability>
      <ids:requirements />
    </ids:specification>
  </ids:specifications>
</ids:ids>`;

    const blob = new Blob([xmlContent], { type: 'application/ids' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'specification.ids';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
// Add these event listeners after your existing code

document.getElementById('new-ids').addEventListener('click', function(e) {
    e.preventDefault();
    clearForm();
});

document.getElementById('edit-ids').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('ids-file-input').click();
});

document.getElementById('ids-file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            parseIdsFile(e.target.result);
        };
        reader.readAsText(file);
    }
});

// Make sure to call clearForm() when the page loads to initialize the form
document.addEventListener('DOMContentLoaded', clearForm);