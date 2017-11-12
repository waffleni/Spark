import React, { Component } from 'react';

import { Menu, Input } from 'semantic-ui-react'

class Sidebar extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.onChange(name);
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu fluid vertical tabular style={{padding: '20px 0px 20px 0px', height: '100%'}}>
        <Menu.Item>
          <Input className='prompt' icon='search' type='text' placeholder='Search...' />
        </Menu.Item>
        <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
        <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
        <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
        <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default Sidebar;
