import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import * as authAction from '../actions/authAction';
import * as userAction from '../actions/userAction';


class LoginC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.username && this.state.password) {
      this.props.actions.loginAsync(this.state.username, this.state.password)
        .then(data => this.loginSuccessHandle(data))
        .catch(err => this.loginFailHandle(err))
    }
  }

  componentWillUnmount() {
    if(this.props.auth.userAuth == 1) {
      this.props.actions.setRedirectedFrom(null);
    }
  }

  loginFailHandle(error) {

  }

  loginSuccessHandle({ token, user }) {
    console.log('loginSuccessHandle', token, user)
    this.props.actions.setUserInfo(user);
    this.props.actions.guardAuth(token);
  }

  render() {
    var {username, password} = this.state
    //console.log('this.props.auth.userAuth', this.props.auth.userAuth)
    if(this.props.auth.userAuth == 1) {
      if(this.props.auth.redirectedFrom) {
        return <Redirect to={this.props.auth.redirectedFrom} />;
      } else {
        return <Redirect to={'/'}/>;
      }
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit.bind(this)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" placeholder="Email" name="username" autoComplete="username" value={username} onChange={this.onChange.bind(this)}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" autoComplete="current-password" value={password} onChange={this.onChange.bind(this)}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/*<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>*/}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({ auth, user });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authAction, ...userAction }, dispatch)
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginC);
