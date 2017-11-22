import React, { Component } from 'react';

import { Segment, Icon } from 'semantic-ui-react';

import Head from './Header';
import Repo from '../views/Repo';
import Main from '../views/Main';

class Content extends Component {

  showMain = () => {
    console.log('clicked X')
    this.props.onChange(undefined)
  }

  render() {
    return (
      <div>
        <Head />
        <Segment basic>
          { this.props.activeItem &&
            <Segment textAlign='right' basic vertical>
              <Icon name='remove circle outline' onClick={this.showMain} size='big' />
            </Segment>
          }
          {this.props.activeItem
            ?
              (<Repo name={this.props.activeItem} />)
            :
              (<Main />)
          }
        </Segment>
      </div>
    )
  }
}

export default Content;
