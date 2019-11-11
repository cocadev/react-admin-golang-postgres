import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import * as userAction from '../../actions/userAction';
import utilService from '../../common/utilService';

function UserRow(props) {
  const user = props.user
  const userLink = `#/users/${user.id}`

  return (
    <tr key={user.id.toString()}>
        <th scope="row"><a href={userLink}>{user.id}</a></th>
        <td><a href={userLink}>{user.username}</a></td>
        <td>{utilService.getUserName(user)}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
    </tr>
  )
}

class UsersC extends Component {
  componentDidMount() {
    this.props.actions.loadUsers()
  }
  render() {

    let userList = this.props.user.users
    console.log('this.props.user.users', this.props.user.users)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Username</th>
                      <th scope="col">Fullname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...userAction }, dispatch)
});

export const Users = connect(mapStateToProps, mapDispatchToProps)(UsersC);
