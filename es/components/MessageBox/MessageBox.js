import PropTypes from 'prop-types';
import React from 'react';
import { Notification } from 'carbon-components-react';

var propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func,
  className: PropTypes.string
};

var defaultProps = {
  type: "error"
};

var MessageBox = function MessageBox(props) {
  var type = props.type,
      data = props.data,
      onClose = props.onClose,
      className = props.className;


  return data ? React.createElement(Notification, {
    title: data.message,
    subtitle: data.details || "",
    kind: type || "error",
    onCloseButtonClick: function onCloseButtonClick() {
      onClose && onClose();
    },
    className: className
  }) : null;
};

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;

export default MessageBox;