function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData, ToolbarSearch, Loading } from 'carbon-components-react';
import styles from './SimpleTable.css';

import MessageBox from '../MessageBox/MessageBox';

import classNames from 'classnames';

var SimpleTable = function (_PureComponent) {
  _inherits(SimpleTable, _PureComponent);

  function SimpleTable(props) {
    _classCallCheck(this, SimpleTable);

    var _this = _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).call(this, props));

    _this.handleSearchChange = function (evt) {
      var searchText = evt.target.value;
      _this.setState({
        searchText: searchText
      });
    };

    _this.sortHeader = function (evt) {
      var headerKey = evt.target.dataset.key;

      var sortDir = null;
      if (headerKey !== _this.state.sortHeader) {
        sortDir = "ASC";
      } else {
        sortDir = _this.state.sortDir === "DESC" ? "ASC" : "DESC";
      }

      _this.setState({
        sortHeader: headerKey,
        sortDir: sortDir
      });
    };

    _this.sortTableData = function (tableData, headers) {
      var sortHeader = _this.state.sortHeader;
      var sortDir = _this.state.sortDir;

      if (!sortDir) {
        return tableData;
      } else {
        /* For those headers containing a React component, they need to define 'sortKey' for sorting */
        var toSortHeader = headers.find(function (header) {
          return header.key === sortHeader;
        });
        if (toSortHeader) {
          var type = toSortHeader.type;
          if (type && type === "component") {
            sortHeader = sortHeader + "!shadow";
          }
          var dataType = toSortHeader["datatype"];
          return tableData.sort(function (x, y) {
            var adjustNumber = sortDir === "DESC" ? 1 : -1;
            var xValue = x[sortHeader];
            var yValue = y[sortHeader];
            if (dataType && dataType === "number") {
              xValue = +xValue;
              yValue = +yValue;
            }

            if (yValue === xValue) {
              return 0;
            } else if (yValue > xValue) {
              return 1 * adjustNumber;
            } else {
              return -1 * adjustNumber;
            }
          });
        }
      }
    };

    _this.render = function () {
      var self = _this;

      var tableData = self.props.data || [];
      var visibleHeaders = self.props.headers;

      /* filter table with search keyword */
      if (_this.props.searchable) {
        var searchText = _this.state.searchText;
        var searcableHeaders = _this.props.headers.map(function (item) {
          return item.key;
        });

        if (searchText && searchText !== "") {
          tableData = tableData.filter(function (row) {
            var values = searcableHeaders.map(function (header) {
              var value = row[header];
              return typeof value === 'string' ? value : row[header + "!shadow"];
            });
            return values.some(function (text) {
              return text && text.includes(searchText);
            });
          });
        }
      }

      /* sort table data*/
      if (self.props.sortable) {
        self.sortTableData(tableData, visibleHeaders);
      }

      var tableHeader = React.createElement(
        TableHead,
        null,
        React.createElement(
          TableRow,
          null,
          visibleHeaders.map(function (header) {
            var sortDir = header.key === self.state.sortHeader ? self.state.sortDir : null;
            var headerSortable = header["sortable"] === undefined || header["sortable"] === true;
            var headerStyle = self.props.sortable && headerSortable ? styles.sortableHeader : styles.unsortableHeader;
            if (header.className) {
              headerStyle = classNames(headerStyle, header.className);
            }
            return React.createElement(
              TableHeader,
              { className: headerStyle, iconClassName: styles.sortIcon, sortDir: sortDir, 'data-key': header.key, key: header.key, onClick: function onClick(evt) {
                  return self.props.sortable && headerSortable && self.sortHeader(evt);
                } },
              header.label
            );
          })
        )
      );

      var tableBody = React.createElement(
        TableBody,
        null,
        tableData.map(function (row) {
          return React.createElement(
            TableRow,
            { key: row.key },
            visibleHeaders.map(function (header) {
              return React.createElement(
                TableData,
                { key: header.key },
                row[[header.key]]
              );
            })
          );
        })
      );

      var searchInput = React.createElement(ToolbarSearch, { placeHolderText: '', onChange: function onChange(evt) {
          return _this.handleSearchChange(evt);
        }, className: styles.searchInput, id: 'table-search', labelText: 'Search' });

      var buttons = React.createElement(
        'div',
        { className: styles.buttonsContainer },
        _this.props.buttons && _this.props.buttons.map(function (button, index) {
          return React.createElement(
            'div',
            { key: index, className: styles.tableButton },
            button
          );
        })
      );

      var toolBar = _this.props.searchable || _this.props.buttons ? React.createElement(
        'div',
        { className: styles.toolBar },
        _this.props.buttons && buttons,
        _this.props.searchable && searchInput
      ) : null;

      var loading = _this.props.isLoading ? React.createElement(Loading, null) : null;

      var notification = React.createElement(MessageBox, {
        data: _this.props.error,
        onClose: _this.props.handleClearError
      });

      return React.createElement(
        'div',
        { className: styles.tableOuter },
        loading,
        notification,
        toolBar,
        React.createElement(
          'div',
          { className: styles.tableContainer },
          React.createElement(
            Table,
            { className: _this.props.className },
            tableHeader,
            tableBody
          )
        )
      );
    };

    _this.state = {
      searchText: "",
      sortHeader: null,
      sortDir: null
    };

    if (props.defaultSort) {
      var temp = props.defaultSort.split("|");
      _this.state["sortHeader"] = temp[0];
      _this.state["sortDir"] = temp[1];
    }
    return _this;
  }

  return SimpleTable;
}(PureComponent);

SimpleTable.propTypes = {
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};
SimpleTable.defaultProps = {
  isLoading: false,
  data: [],
  headers: []
};

export default SimpleTable;