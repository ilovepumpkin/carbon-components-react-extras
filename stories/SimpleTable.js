import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import SimpleTable from '../components/Table/SimpleTable'
import { CardStatus, Link } from 'carbon-components-react';

const headers = [{
  key: "name",
  label: "User name"
}, {
  key: "gender",
  label: "Gender"
}, {
  key: "age",
  label: "Age",
  searchable: false
}, {
  key: "status",
  label: "Status",
  type: "component"
}, {
  key: "actions",
  label: "Actions",
  sortable: false
}]

const data = [{
  name: "Tom",
  gender: "Male",
  age: 13,
  status: 0
}, {
  name: "Mary",
  gender: "Female",
  age: 34,
  status: 1
}, {
  name: "Jim",
  gender: "Male",
  age: 66,
  status: 0
}, {
  name: "Jane",
  gender: "Female",
  age: 11,
  status: 1
}, {
  name: "Mike",
  gender: "Male",
  age: 39,
  status: 1
}]

const tableData = data.map(row => {
  row["key"] = row["name"]
  row["status!shadow"] = row["status"] ? "Not Running" : "Running"
  row["status"] = <CardStatus status={row["status"]}/>
  row["actions"] = <Link style={{
    cursor: "pointer"
  }} onClick={action("edit " + row["name"])}>Edit</Link>
  return row;
})

const error = {
  message: "This is an error.",
  details: "More details here."
}

storiesOf('SimpleTable', module).add('Default', withInfo(`
      This example demos how to use SimpleTable. Basically SimpleTable can make use of table easier. 

      In this example, I set table header and data with property "headers" and "data", both are an array. 
      I enable the searching and sorting with property "searchable" and "sortable".
      I set default sorting column to "User Name" column.
      "Status" column is actually displaying a React component. By using Shadow column value, we make it sortable and searchable.
      I disable the searching feature on "Age" column.
      I disable the sorting feature on "Actions" column.
      I also demo how the error message could be displayed. 
    `)(
  () => <div className={"simpleTableContainer"}><SimpleTable error={error} headers={headers} data={tableData} searchable sortable defaultSort={"name|ASC"}/></div>)
)

