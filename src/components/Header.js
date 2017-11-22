import React, { Component } from 'react';

import { Divider } from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
      <div> {/* Can Be a Segment with Basic Class */}
        <h3 className='app-title text-center'>Hackathon Nicaragua 2017</h3>
        <Divider fitted />
      </div>
    )
  }
}

export default Header;
