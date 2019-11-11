import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import * as userAction from '../../actions/userAction';

class UserC extends Component {
  componentDidMount() {
    if(this.props.match.params) {
      this.props.actions.getUser(parseInt(this.props.match.params.id, 10))
    } else {
      return null;
    }
  }
  render() {

    let user = this.props.user.user;

    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User : {user.username}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      <tr>
                        <td>Username</td>
                        <td><strong>{user.username}</strong></td>
                      </tr>
                      <tr>
                        <td>First Name</td>
                        <td><strong>{user.firstname}</strong></td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td><strong>{user.lastname}</strong></td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td><strong>{user.email}</strong></td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td><strong>{user.role}</strong></td>
                      </tr>
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

export const User = connect(mapStateToProps, mapDispatchToProps)(UserC);
