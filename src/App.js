import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid, Segment } from 'semantic-ui-react';

import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  state = {
    activeMenu: undefined
  }

  onSidebar = (action) => {
    console.log(action)
    this.setState({activeMenu: action});
  }

  render() {
    return (
      <div className="ui" style={{height: '100%'}}>
        <Grid style={{height: '100%'}}>
          <Grid.Column width={4} stretched>
            <Sidebar onChange={this.onSidebar} />
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <Content activeMenu={this.state.activeMenu} />
          </Grid.Column>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
