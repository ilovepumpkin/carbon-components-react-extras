import React from 'react';

import { storiesOf } from '@storybook/react';
import SimpleTable from '../components/Table/SimpleTable'
import styles from './SimpleTable.css'

const headers = [{
  key: "name",
  label: "User name"
}, {
  key: "gender",
  label: "Gender"
}, {
  key: "age",
  label: "Age"
}]

const data = [{
  name: "Tom",
  gender: "Male",
  age: 13
}, {
  name: "Mary",
  gender: "Female",
  age: 34
}, {
  name: "Jim",
  gender: "Male",
  age: 66
}, {
  name: "Jane",
  gender: "Female",
  age: 11
}, {
  name: "Mike",
  gender: "Male",
  age: 39
}]


storiesOf('SimpleTable', module).add('default', () => <div className={"simpleTableContainer"}><SimpleTable headers={headers} data={data} searchable sortable defaultSort={"name|ASC"}/></div>)
