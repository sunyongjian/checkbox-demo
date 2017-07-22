import React, { Component, PropTypes } from 'react';
import CheckBoxGroup from './group';
import './index.less';

// todo disable
class CheckBox extends Component { 
  static propsType = {
    checked: PropTypes.bool.isRequired,
    // disable: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.element.isRequired,
  }

  constructor(props) {
    super();
    const { checked = false } = props;
    this.state = {
      checked,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }

  handleTrigger = () => {
    const { onChange } = this.props;
    this.setState({
      checked: !this.state.checked,
    }, () => {
      onChange && onChange(this.state.checked);
    });
  }

  render() {
    const { children, } = this.props;
    const { checked } = this.state;
    const checkboxClass = checked ?  'c-checkbox checkbox-checked' : 'c-checkbox';

    return (
      <label className="checkbox">
        <span className="checkbox-wrapper">
          <input type="checkbox" className="checkbox-input" onClick={this.handleTrigger} />
          <span className={checkboxClass} >
            { checked && <i className="iconfont icon-select" />}
          </span>
        </span>
        <span>{children}</span>
      </label>
    )
  }
}
CheckBox.group = CheckBoxGroup;
export default CheckBox;
