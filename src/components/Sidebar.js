import React, { Component } from 'react';

import { Menu, Input, Divider } from 'semantic-ui-react';

import gql from 'graphql-tag';

import client from '../Client';

class Sidebar extends Component {

  state = {
    reposList: []
  }

  componentDidMount() {
    client.query({
      query: gql`query SidebarQuery {
        organization(login: "waffleni") {
          name
          repositories(first: 50) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }`
    })
    .then(response => {
      let reposList = [];
      const repos = response.data.organization.repositories.edges
      repos.map(obj => {
        return reposList.push({id: obj.node.id, name: obj.node.name})
      })
      this.setState({ reposList });
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  handleItemClick = (e, { name }) => this.props.onChange(name)

  render() {
    const activeItem  = this.props.activeItem;
    const reposItems = this.state.reposList.map(repo => {
      return (
        <Menu.Item
          key={repo.id} name={repo.name}
          active={activeItem === repo.name}
          onClick={this.handleItemClick}
        />
      )
    });

    return (
      <Menu fluid vertical tabular style={{padding: '20px 0px 20px 0px', height: '100%'}}>
        <Menu.Item>
          <Input className='prompt' icon='search' type='text' placeholder='Search...' />
        </Menu.Item>
        <Divider />
        <Menu.Item />
        {reposItems}
      </Menu>
    )
  }
}

export default Sidebar;
