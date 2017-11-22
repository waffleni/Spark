import React, { Component } from 'react';

import { Menu, Sidebar } from 'semantic-ui-react';

import gql from 'graphql-tag';

import client from '../Client';

class SidebarMenu extends Component {

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

  render() {
    const activeItem  = this.props.activeItem;
    const reposItems = this.state.reposList.map(repo => {
      return (
        <Menu.Item
          key={repo.id} name={repo.name}
          active={activeItem === repo.name}
          onClick={() => this.props.onChange(repo.name)}
        />
      )
    });

    return (
      <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted>
        {reposItems}
      </Sidebar>
    )
  }
}

export default SidebarMenu;
