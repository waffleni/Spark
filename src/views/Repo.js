import React, { Component } from 'react';

import { Divider, Header, List, Image, Grid } from 'semantic-ui-react'

import gql from 'graphql-tag';
import moment from 'moment';

import client from '../Client';

class Repo extends Component {

  state = {
    fullName: '',
    updatedAt: null,
    repoLink: '',
    collaborators: [],
    languages: [],
    commits: []
  }

  componentDidMount() {
    this.getRepoData(this.props.name)
  }

  componentWillReceiveProps(nextProps) {
    this.getRepoData(nextProps.name)
  }

  getRepoData = (repoName) => {
    client.query({
      query: gql`query RepoQuery${repoName} {
        organization(login: "waffleni") {
          repository(name: "${repoName}") {
            nameWithOwner
            url
            pushedAt
            commitComments(first: 20) {
              edges {
                node {
                  commit {
                    abbreviatedOid
                    author {
                      name
                    }
                    committedDate
                    message
                    url
                  }
                }
              }
            }
            languages(first: 5) {
              edges {
                node {
                  id
                  name
                }
              }
            }
            collaborators(first: 10) {
              edges {
                node {
                  id
                  name
                  avatarUrl
                }
              }
            }
          }
        }
      }`
    })
    .then(response => {
      const data = response.data.organization.repository;
      this.setState({
        fullName: data.nameWithOwner,
        updatedAt: moment(data.pushedAt).fromNow(),
        repoLink: data.url,
        languages: data.languages,
        collaborators: data.collaborators,
        commits: data.commitComments
      });
    })
    .catch(error => console.log(error))
  }

  render() {
    const collaborators = this.state.collaborators.edges !== undefined
      ? this.state.collaborators.edges.map(obj => {
          return (
            <List.Item key={obj.node.id}>
              <Image avatar src={obj.node.avatarUrl} />
              <List.Content>
                <List.Header as='a'>{obj.node.name}</List.Header>
              </List.Content>
            </List.Item>
          )
        })
      : null
    const languages = this.state.languages.edges !== undefined
      ? this.state.languages.edges.map(obj => {
          return (
            <List.Item key={obj.node.id}>
              <List.Content>
                <List.Header as='a'>{obj.node.name}</List.Header>
              </List.Content>
            </List.Item>
          )
        })
      : null
    const commits = this.state.commits.edges !== undefined
      ? this.state.commits.edges.map(obj => {
          return (
            <List.Item key={obj.node.commit.abbreviatedOid}>
              <List.Content>
                <List.Header as='a' href={obj.node.commit.author.url}>{obj.node.commit.author.name}</List.Header>
                <List.Description>{obj.node.commit.abbreviatedOid} - {obj.node.commit.committedDate}</List.Description>
              </List.Content>
            </List.Item>
          )
        })
      : null

    return (
      <div>
        <List divided relaxed>
          <List.Item>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a' href={this.state.repoLink} target='_blank' rel='noopener noreferrer'>{this.state.fullName}</List.Header>
              <List.Description as='span'>Ultimo cambio {this.state.updatedAt}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item />
        </List>
        <Grid>
          <Grid.Column width={5}>
            <List divided animated size='large' verticalAlign='middle'>
              <List.Header>Colaboradores</List.Header>
              {collaborators}
            </List>
            <List divided size='large' verticalAlign='middle'>
              <List.Header>Lenguajes</List.Header>
              {languages}
            </List>
            <List divided size='large' verticalAlign='middle'>
              <List.Header>Commits</List.Header>
              {commits}
            </List>
          </Grid.Column>
          <Grid.Column width={11}>
            <h3> Chart Area</h3>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

export default Repo;
