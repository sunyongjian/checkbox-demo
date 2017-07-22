import React from 'react';
import { render } from 'react-dom';
import CheckBox from './components/checkbox';
import './index.less';
const CheckBoxGroup = CheckBox.group;

class App extends React.Component {
  render() {
    return (
      <div>
        <CheckBoxGroup
          options={[
            { value: 1, label: '设计' },
            { value: 2, label: '前端' },
            { value: 3, label: '哈哈' },
          ]}
          onChange={(val) => {
            console.log(val, 'val');
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

