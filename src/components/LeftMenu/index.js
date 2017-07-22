import React, { Component } from 'react';
import CombineCheckBox from '../CombineCheckBox';
import { mock } from './mock.js';
import './index.less';

const request = () => {
  // fetch code
  return mock;
};

export default class LeftMenu extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // async request
    (async () => {
      const data = await request();
      this.setState({
        data,
      });
    })();
  }

  render () {
    return (
      <div className="left-menu">
        <CombineCheckBox
          onChange={(val) => {
            // get values to send to server
            console.log(val);
          }}
          treeData={this.state.data}
        />
      </div>
    );
  }
}
