import React, { Component } from 'react';

import gql from 'graphql-tag';

import client from '../Client';

import { Divider, Header, Segment } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'

class Main extends Component {

  state = {
    reposList: []
  }

  componentDidMount() {
    // hackathonnicaragua
    client.query({
      query: gql`query SidebarQuery {
        organization(login: "waffleni") {
          name
          repositories(first: 50) {
            edges {
              node {
                id
                name
                description
                primaryLanguage {
                  name
                }
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
        return reposList.push({
          id: obj.node.id,
          name: obj.node.name,
          description: obj.node.description,
          lang: obj.node.primaryLanguage ? obj.node.primaryLanguage.name : ''
        })
      })
      this.setState({ reposList });
    })
    .catch(error => console.log(error))
  }

  handleItemClick = (repoName) => {
    this.props.onChange(repoName)
  }

  render() {
    const reposList = this.state.reposList.map(repo => {
      return (
        <Card
          centered
          link
          key={repo.id}
          header={repo.name}
          meta={repo.description}
          description={repo.lang}
          onClick={() => this.props.onChange(repo.name)}
        />
      )
    });

    return (
      <Segment basic>
        <Header as='h3' textAlign='center'>Lista de equipos</Header>
        <Card.Group>
          {reposList}
        </Card.Group>
      </Segment>
    )
  }
}

export default Main;
