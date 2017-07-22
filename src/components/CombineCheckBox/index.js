import React, { Component } from 'react';
import CheckBox from '../CheckBox';
import './index.less';
const CheckBoxGroup = CheckBox.group;

export default class CombineCheckBox extends Component {
  constructor() {
    super();
    this.state = {
      parentValues: {},
      selectedValues: {},
      parentIdMapChild: {},
    };
  }

  componentDidMount() {
    this.getJobValues(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.treeData !== this.props.treeData) {
      this.getJobValues(nextProps);
    }
  }

  selectAll = id => allChecked => {
    const { parentIdMapChild } = this.state;
    const childValues = allChecked ? parentIdMapChild[id].allChildIds : [];
    this.setValues('selectedValues', id, childValues);
    this.setValues('parentValues', id, allChecked);
  }

  setValues = (stateKey, id, values) => {
    const { onChange } = this.props;
    const state = this.state[stateKey]; 
    this.setState({
      [stateKey]: {
        ...state,
        [id]: values,
      }
    }, () => { typeof onChange === 'function' && onChange(this.getAllChild()) })
  }

  selectItem = id => checkList => {
    const { allChildIds } = this.state.parentIdMapChild[id];
    const parentValue = checkList.length === allChildIds.length ? true : false;
    this.setValues('parentValues', id, parentValue);
    this.setValues('selectedValues', id, checkList);
  }

  getAllChild = () => {
    const { selectedValues } = this.state;
    return Object.values(selectedValues).reduce((res, cur) => {
      return [...res, ...cur];
    }, [])
  }

  clearAll = () => {
    const { parentIdMapChild } = this.state;
    const { onChange } = this.props;
    const allEmpty = Object.keys(parentIdMapChild).reduce((res, cur) => {
      return {...res, [cur]: []}
    }, {});
    this.setState({
      selectedValues: allEmpty,
      parentValues: {},
    }, () => { typeof onChange === 'function' && onChange(this.getAllChild()) })
  }

  getJobValues (props) {
    const { treeData } = props;
    const parentIdMapChild = treeData.reduce((cur, item) => {
      const { id, children } = item;
      const allChildIds = children.reduce((res, cur) => {
        return [...res, cur.id];
      });
      const allChild = children.reduce((res, cur) => {
        const { id, name } = cur;
        return [...res, { value: id, label: name }]
      });
      return {
        ...cur,
        [id]: {
          allChildIds,
          allChild,
        }
      };
    }, {});
    this.setState({
      parentIdMapChild,
    })
  }

  generateTree() {
    const { treeData, } = this.props;
    const { parentValues, selectedValues, parentIdMapChild} = this.state;
    return Array.isArray(treeData) && treeData.map(part => {
      const { id, name } = part;
      return <div key={id}>
        <CheckBox
          onChange={this.selectAll(id)}
          checked={parentValues[id]}
        >{name}</CheckBox>
        <div className="child">
          <CheckBoxGroup
            options={parentIdMapChild[id].allChild}
            onChange={this.selectItem(id)}
            value={selectedValues[id]}
        />
        </div>
        
      </div>
    })
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>招聘职位</div><div onClick={this.clearAll}>清除</div></div>    
        {this.generateTree()}
      </div>
    )
  }
}