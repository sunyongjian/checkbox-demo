import React, { Component } from 'react';
import CheckBox from '../CheckBox';
const CheckBoxGroup = CheckBox.group;

export default class CombineCheckBox extends Component {
  constructor() {
    super();
    this.state = {
      selectedValues: [],
    };
    this.options = [
      { value: 1, label: '设计' },
      { value: 2, label: '前端' },
      { value: 3, label: '哈哈' },
    ];
    this.vas = [1, 2, 3];
  }

  selectAll = allChecked => {
    this.setState({
      selectedValues: allChecked ? this.vas : []
    });
  }

  selectItem = checkList => {
    this.setState({
      selectedValues: checkList,
    })
  }

  render() {
    const { selectedValues } = this.state;
    console.log(selectedValues, 'selectedValues');
    return (
      <div>
        <div>
          <CheckBox onChange={this.selectAll} checked={selectedValues.length === this.vas.length}>
            全选
          </CheckBox>
        </div>
        
        <div>
          <CheckBoxGroup
            options={this.options}
            value={selectedValues}
            onChange={this.selectItem}
          />
        </div>
      </div>
    )
  }
}