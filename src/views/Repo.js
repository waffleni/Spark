import React, { Component } from 'react';

import { Divider, Header, List, Image, Grid, Segment, Icon, Sidebar } from 'semantic-ui-react'
import { Bar, Line } from 'react-chartjs-2'
import Iframe from 'react-iframe'

import gql from 'graphql-tag';
import moment from 'moment';

import client from '../Client';

import SidebarMenu from '../components/Menu';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
const dataLine = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

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
            ref(qualifiedName: "master") {
              target {
                ... on Commit {
                  id
                  history(first: 10) {
                    edges {
                      node {
                        messageHeadline
                        abbreviatedOid
                        message
                        committedDate
                        url
                        author {
                          name
                        }
                      }
                    }
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
        commits: data.ref.target.history
      });
    })
    .catch(error => console.log(error))
  }

  // https://api.github.com/repos/waffleni/www/stats/punch_card

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
            <List.Item key={obj.node.abbreviatedOid}>
              <List.Content>
                <List.Header as='a' href={obj.node.url}>{obj.node.author.name}</List.Header>
                <List.Description>{obj.node.abbreviatedOid} - {moment(obj.node.committedDate).format('MM/DD/YYYY - hh:m A')}</List.Description>
              </List.Content>
            </List.Item>
          )
        })
      : null

    return (
      <Sidebar.Pushable as={'div'} className='no-margin'>
        <SidebarMenu activeItem={this.props.name} onChange={this.props.onChange}/>
        <Sidebar.Pusher>
          <Segment basic>
            <div>
              <a onClick={() => this.props.onChange(undefined)} style={{color: 'black'}}>
                <Icon name='remove circle outline' size='big' />
              </a>
            </div>
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
                  <List.Header><strong>Colaboradores</strong></List.Header>
                  {collaborators}
                </List>
                <List divided size='large' verticalAlign='middle'>
                  <List.Header><strong>Lenguajes</strong></List.Header>
                  {languages}
                </List>
                <List divided size='large' verticalAlign='middle'>
                  <List.Header><strong>Commits</strong></List.Header>
                  {commits}
                </List>
              </Grid.Column>
              <Grid.Column width={11}>
                <div style={{height: 300}}>
                  <Bar
                    data={data}
                    width={'100%'}
                    height={300}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
                <div  style={{height: 300}}>
                  <Line data={data} />
                </div>
              </Grid.Column>
            </Grid>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>

    )
  }
}

export default Repo;
