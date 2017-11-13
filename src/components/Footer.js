import React, { Component } from 'react';

import { Divider, Icon } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <div>
        <Divider fitted />
        <p className='text-center'>
          <Icon name='code' />
          <strong>with</strong>
          <Icon name='heart' color='red' />
          <strong>by</strong> <strong><a href='http://waffle.studio' target='_blank' rel='noopener noreferrer' className='company-link'>Waffle Studio</a></strong>
        </p>
      </div>
    )
  }
}

export default Footer;