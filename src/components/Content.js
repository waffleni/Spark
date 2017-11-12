import React, { Component } from 'react';
import Head from './Header';

class Content extends Component {
  render() {
    console.log(this.props.activeMenu);
    return (
      <div>
        <Head />
        <h1>Prueba</h1>
      </div>
    )
  }
}

export default Content;