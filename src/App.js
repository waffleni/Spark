import React, { Component } from 'react';

import moment from 'moment';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

import './App.css';

moment.locale('Es');
moment.updateLocale('en', {
  relativeTime : {
    future: "en %s",
    past:   "hace %s",
    s  : 'unos pocos segundos',
    ss : '%d segundos',
    m:  "un minuto",
    mm: "%d minutos",
    h:  "una hora",
    hh: "%d horas",
    d:  "un dia",
    dd: "%d dias",
    M:  "un mes",
    MM: "%d meses",
    y:  "un año",
    yy: "%d años"
  }
});


class App extends Component {
  state = {
    activeItem: undefined
  }

  onAction = (action) => {
    console.log(action)
    this.setState({activeItem: action});
  }

  render() {
    return (
      <div className="ui" style={{height: '100%'}}>
        <Grid style={{height: '100%'}}>
          <Grid.Column width={4} stretched className='no-padding-right'>
            <Sidebar onChange={this.onAction} activeItem={this.state.activeItem} />
          </Grid.Column>
          <Grid.Column width={12} stretched className='no-padding-left'>
            <Content onChange={this.onAction} activeItem={this.state.activeItem} />
          </Grid.Column>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
