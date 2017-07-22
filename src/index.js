import React from 'react';
import { render } from 'react-dom';
import LeftMenu from './components/LeftMenu';
import './index.less';


class App extends React.Component {
  render() {
    return (
      <div>
        <LeftMenu />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

