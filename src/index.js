import React from 'react';
import { render } from 'react-dom';
import CombineCheckBox from './components/CombineCheckBox';
import './index.less';


class App extends React.Component {
  render() {
    return (
      <div>
        <CombineCheckBox />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

