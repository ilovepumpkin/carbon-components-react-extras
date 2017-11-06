import PropTypes from 'prop-types';
import React from 'react';
import { Notification } from 'carbon-components-react';

const propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  onClose: PropTypes.func,
  className: PropTypes.string
}

const defaultProps = {
  type: "error"
}

const MessageBox = (props) => {
  const {type, data, onClose, className} = props;

  return data ? <Notification
  title={data.message}
  subtitle={data.details || ""}
  kind={type || "error"}
  onCloseButtonClick={() => {
    onClose && onClose()
  }}
  className={className}
  /> : null;
}

MessageBox.propTypes = propTypes;
MessageBox.defaultProps = defaultProps;

export default MessageBox;