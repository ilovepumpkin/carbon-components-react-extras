import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData, ToolbarSearch, Loading } from 'carbon-components-react';
import styles from './SimpleTable.css'

import MessageBox from '../MessageBox/MessageBox'

import classNames from 'classnames';

class SimpleTable extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
      sortHeader: null,
      sortDir: null
    }

    if (props.defaultSort) {
      const temp = props.defaultSort.split("|")
      this.state["sortHeader"] = temp[0]
      this.state["sortDir"] = temp[1]
    }
  }
  ;

  static propTypes = {
    searchable: PropTypes.bool,
    sortable: PropTypes.bool,
    headers: PropTypes.array.isRequired,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    isLoading: false,
    data: [],
    headers: []
  };

  handleSearchChange = (evt) => {
    const searchText = evt.target.value;
    this.setState({
      searchText
    })
  }

  sortHeader=(evt) => {
    const headerKey = evt.target.dataset.key

    let sortDir = null;
    if (headerKey !== this.state.sortHeader) {
      sortDir = "ASC"
    } else {
      sortDir = this.state.sortDir === "DESC" ? "ASC" : "DESC"
    }

    this.setState({
      sortHeader: headerKey,
      sortDir
    })
  }

  sortTableData=(tableData, headers) => {
    let sortHeader = this.state.sortHeader
    const sortDir = this.state.sortDir

    if (!sortDir) {
      return tableData;
    } else {
      /* For those headers containing a React component, they need to define 'sortKey' for sorting */
      const toSortHeader = headers.find(header => header.key === sortHeader)
      if (toSortHeader) {
        const type = toSortHeader.type
        if (type && type === "component") {
          sortHeader = sortHeader + "!shadow"
        }
        const dataType = toSortHeader["datatype"]
        return tableData.sort((x, y) => {
          const adjustNumber = sortDir === "DESC" ? 1 : -1
          let xValue = x[sortHeader]
          let yValue = y[sortHeader]
          if (dataType && dataType === "number") {
            xValue = +xValue
            yValue = +yValue
          }

          if (yValue === xValue) {
            return 0
          } else if (yValue > xValue) {
            return 1 * adjustNumber;
          } else {
            return -1 * adjustNumber;
          }

        })
      }
    }
  }

  render = () => {
    const self = this;

    let tableData = self.props.data || [];
    const visibleHeaders = self.props.headers;

    /* filter table with search keyword */
    if (this.props.searchable) {
      const searchText = this.state.searchText;
      const searcableHeaders = this.props.headers.map(item => item.key)

      if (searchText && searchText !== "") {
        tableData = tableData.filter((row) => {
          const values = searcableHeaders.map(header => {
            const value = row[header]
            return typeof value === 'string' ? value : row[header + "!shadow"];
          })
          return values.some(text => text && text.includes(searchText))
        })
      }
    }

    /* sort table data*/
    if (self.props.sortable) {
      self.sortTableData(tableData, visibleHeaders)
    }

    let tableHeader = (
    <TableHead>
        <TableRow>
        {
    visibleHeaders.map(function(header) {
      const sortDir = header.key === self.state.sortHeader ? self.state.sortDir : null;
      const headerSortable = header["sortable"] === undefined || header["sortable"] === true
      let headerStyle = self.props.sortable && headerSortable ? styles.sortableHeader : styles.unsortableHeader;
      if (header.className) {
        headerStyle = classNames(headerStyle, header.className)
      }
      return (
        <TableHeader className={headerStyle} iconClassName={styles.sortIcon} sortDir={sortDir} data-key={header.key} key={header.key} onClick={(evt) => self.props.sortable && headerSortable && self.sortHeader(evt)}>
                {header.label}
              </TableHeader>
      )
    })
    }
        </TableRow>
      </TableHead>
    )

    let tableBody = (
    <TableBody>
           {
    tableData.map(function(row) {
      return (
        <TableRow key={row.key}>
              {
        visibleHeaders.map(function(header) {
          return (
            <TableData key={header.key}>
                      {row[[header.key]]}
            </TableData>
          )
        })
        }
            </TableRow>
      )
    })}
    </TableBody>)

    let searchInput = <ToolbarSearch placeHolderText="" onChange={evt => this.handleSearchChange(evt)} className={styles.searchInput} id="table-search" labelText="Search"/>

    let buttons = <div className={styles.buttonsContainer}>
    {this.props.buttons && this.props.buttons.map((button, index) => <div key={index} className={styles.tableButton}>{button}</div>)}
    </div>

    let toolBar = this.props.searchable || this.props.buttons ? <div className={styles.toolBar}>
      {this.props.buttons && buttons} 
      {this.props.searchable && searchInput}
    </div> : null;

    const loading = this.props.isLoading ? <Loading /> : null;

    const notification = <MessageBox
    data={this.props.error}
    onClose={this.props.handleClearError}
    />

    return (<div className={styles.tableOuter}>
      {loading}
      {notification}
      {toolBar}
      <div className={styles.tableContainer}>
        <Table className={this.props.className}>
            {tableHeader}
            {tableBody}
        </Table>
      </div>
      </div>)

  };
}
export default SimpleTable