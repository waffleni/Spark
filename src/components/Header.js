import React, { Component } from 'react';

import { Input, Divider, Menu, Header } from 'semantic-ui-react'
// import { Grid, Segment, Divider } from 'semantic-ui-react'

class Head extends Component {
  render() {
    return (
      <div>
        <Header as='h3' textAlign='center'>Hackathon Nicaragua 2017</Header>
        <Divider />
      </div>
    )
  }
}

export default Head;
