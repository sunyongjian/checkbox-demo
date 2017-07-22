import React, { Component, PropTypes } from 'react';
import CheckBox from './index';

/**
 * options defaultValue value onChange
 * notice: 保证value的唯一性
 */
class CheckBoxGroup extends Component {

  static propsTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
        disable: PropTypes.bool,
      })
    ),
    onChange: PropTypes.func.isRequired,
    itemClassName: PropTypes.string,
  }

  constructor(props) {
    super();
    const { defaultValue = [], value } = props;
    if (value) {
      this.state = {
        checkedValues: value,
      }
    } else {
      this.state = {
        checkedValues: defaultValue,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        checkedValues: nextProps.value
      })
    }
  }

  pushValue = (value) => {
    const { onChange } = this.props;
    const { checkedValues } = this.state;
    this.setState({
      checkedValues: [...this.state.checkedValues, value],
    }, () => onChange(this.state.checkedValues));
  }

  deleteValue = (value) => {
    const { onChange } = this.props;
    const { checkedValues } = this.state;
    const result = checkedValues.filter(item => item !== value);
    this.setState({
      checkedValues: result,
    }, () => onChange(this.state.checkedValues));
  }

  handleChange = value => checked => {
    const { onChange } = this.props;
    if (checked) {
      this.pushValue(value);
      return;
    }
    this.deleteValue(value);
  }

  generateOptions() {
    const { options, itemClassName = 'check-item' } = this.props;
    const { checkedValues } = this.state;
    return Array.isArray(options) && options.map(item => {
      const { label, value, } = item;
      const checked = checkedValues.includes(value);
      return <div className={itemClassName} key={value}>
        <CheckBox checked={checked} onChange={this.handleChange(value)}>
          {label}
        </CheckBox>
      </div>
    })
  }

  render() {
    return (<div className="checkbox-group">
      {this.generateOptions()}
    </div>)
  }
}
export default CheckBoxGroup;
