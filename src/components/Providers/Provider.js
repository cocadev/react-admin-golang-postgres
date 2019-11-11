import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Input, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppSwitch } from '@coreui/react'
import * as providerAction from '../../actions/providerAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let update_create = 0;
let bit0;
class ProviderC extends Component {
  constructor (props){
    super(props);
    this.state = {
      hidden:false
    }
  }
  componentDidMount() {
    update_create = 0;
    if(this.props.match.params) {
      if(this.props.match.params.id == 'new') {
        this.props.actions.createProvider({
          id:'',
          name:'',
          code:'',
          enabled:false
        })
      } else {
        this.setState({
          hidden:true,
        });
        this.props.actions.getProvider(parseInt(this.props.match.params.id, 10));
      }
    } else {
      return null;
    }
  }

  submit(e) {
    if(e) {
      e.stopPropagation();
      e.preventDefault()
    }
    var provider = this.props.provider.provider;

    if(this.props.match.params.id !== 'new') {
      update_create = 1
    }
      //check provider name
    var providerName = this.name.props.value;

    if(providerName) {
      bit0 = this.refs.bit0.state.checked;
      if(update_create == 1) {
        this.props.actions.updateProviderDo(Object.assign({}, this.props.provider.provider, {
          enabled:bit0
        })).then((ret)=>{
          toast.success('Updated successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          this.props.history.push('/providers')

        })
      } else {
        this.props.actions.createProviderDo(Object.assign({}, this.props.provider.provider, {
          enabled:bit0
        })).then((ret)=>{
          toast.success('Created successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
          });

          this.props.history.push('/providers')
        })
          .catch((e)=>{
            console.log('error', e);
          })
      }
    }
  }

  deleteProvider(e) {
    if(e) {
      e.stopPropagation();
      e.preventDefault()
    }

    this.props.actions.deleteProvider(this.props.provider.provider).then((ret)=>{
      toast.success('Deleted successfully', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      this.props.history.push('/providers')
    })
  }

  reset(e) {
    if(e) {
      e.stopPropagation();
      e.preventDefault()
    }

    if(this.props.match.params) {
      this.props.actions.getProvider(parseInt(this.props.match.params.id, 10))
    } else {
      return null;
    }
  }

  changeID(e) {
    this.props.actions.updateProvider(Object.assign({}, this.props.provider.provider, {
      id:parseInt(e.target.value)
    }))
  }

  changeName(e) {
    this.props.actions.updateProvider(Object.assign({}, this.props.provider.provider, {
      name:e.target.value
    }))
  }

  changeCode(e) {
    this.props.actions.updateProvider(Object.assign({}, this.props.provider.provider, {
      code:e.target.value
    }))
  }

  changeCheck(){
    bit0 = this.refs.bit0.state.checked;
  }

  render() {
    let provider = this.props.provider.provider;
    const getBitEnabled = (val, pos) => {
      if(val&Math.pow(2, pos)) {
        return true
      }
      return false
    };

    return (
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Provider</strong>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal">
                  <FormGroup row hidden={this.state.hidden}>
                    <Col md="3">
                      <Label>ID</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="number" ref={ref => {
                        this.id = ref
                      }} placeholder="Provider ID" value={provider.id} onChange={this.changeID.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Name</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="text" ref={ref => {
                        this.name = ref
                      }} placeholder="Provider Name" value={provider.name} onChange={this.changeName.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Code</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="text" ref={ref => {
                        this.code = ref
                      }} placeholder="Provider Code" value={provider.code} onChange={this.changeCode.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Enabled</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch ref="bit0" size={'sm'} className={'mx-1'} variant={'pill'} color={'primary'} label checked={provider.enabled} onChange={this.changeCheck.bind(this)}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="mr-1" type="submit" size="sm" color="primary" onClick={this.submit.bind(this)}> Submit</Button>
                {provider.id && <Button className="mr-1" size="sm" color="danger" onClick={this.deleteProvider.bind(this)}> Delete</Button>}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ provider }) => ({ provider });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...providerAction }, dispatch)
});

export const Provider = connect(mapStateToProps, mapDispatchToProps)(ProviderC);
