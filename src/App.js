import React, { Component } from 'react';

import moment from 'moment';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './views/Main';
import Repo from './views/Repo';

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
        <Header />
        {this.state.activeItem === undefined
          ?
            <Main onChange={this.onAction} />
          : <Repo onChange={this.onAction} name={this.state.activeItem} />
        }
        <Footer />
      </div>
    );
  }
}

export default App;
