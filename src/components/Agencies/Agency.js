import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Input, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppSwitch } from '@coreui/react'
import * as agencyAction from '../../actions/agencyAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AgencyC extends Component {
  constructor (props){
    super(props)
  }
  componentDidMount() {
    if(this.props.match.params) {
      if(this.props.match.params.id == 'new') {
        this.props.actions.createAgency({
          name:'',
          agenctSettings:0
        })
      } else {
        this.props.actions.getAgency(parseInt(this.props.match.params.id, 10))
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

    //check agency name
    var agentName = this.name.props.value;
    if(agentName) {
      var bit0 = this.refs.bit0.state.checked?1:0;
      var bit1 = this.refs.bit1.state.checked?1:0;
      var bit2 = this.refs.bit2.state.checked?1:0;
      var bit3 = this.refs.bit3.state.checked?1:0;
      var bit4 = this.refs.bit4.state.checked?1:0;

      var agency = this.props.agency.agency;
      if(agency.id) {
        this.props.actions.updateAgencyDo(Object.assign({}, this.props.agency.agency, {
          name:agentName,
          agencySettings:(bit0 + bit1 * 2 + bit2 * 4 + bit3 * 8 + bit4 * 16)
        })).then((ret)=>{
          toast.success('Updated successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        })
      } else {
        this.props.actions.createAgencyDo(Object.assign({}, this.props.agency.agency, {
          name:agentName,
          agencySettings:(bit0 + bit1 * 2 + bit2 * 4 + bit3 * 8 + bit4 * 16)
        })).then((ret)=>{
          toast.success('Created successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
          });

          this.props.history.push('/agencies')
        })
      }
    }
  }

  deleteAgency(e) {
    if(e) {
      e.stopPropagation()
      e.preventDefault()
    }

    this.props.actions.deleteAgency(this.props.agency.agency).then((ret)=>{
      toast.success('Deleted successfully', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      this.props.history.push('/agencies')
    })
  }

  reset(e) {
    if(e) {
      e.stopPropagation();
      e.preventDefault()
    }

    if(this.props.match.params) {
      this.props.actions.getAgency(parseInt(this.props.match.params.id, 10))
    } else {
      return null;
    }
  }

  changeName(e) {
    this.props.actions.updateAgency(Object.assign({}, this.props.agency.agency, {
      name:e.target.value
    }))
  }

  render() {
    let agency = this.props.agency.agency;
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
                <strong>Agency</strong>
              </CardHeader>
              <CardBody>
                <Form className="">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Name</Label>
                    </Col>
                    <Col xs="6" md="6">
                      <Input type="text" ref={ref => {
                        this.name = ref
                      }} placeholder="Agency Name" value={agency.name} onChange={this.changeName.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Enable Itinerary</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch ref="bit0" className={'mx-1'} variant={'pill'} color={'primary'} label checked={getBitEnabled(agency.agencySettings, 0)}  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>GDS Integration</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch ref="bit1" className={'mx-1'} variant={'pill'} color={'primary'} label checked={getBitEnabled(agency.agencySettings, 1)} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Itinerary Hotel Code</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch ref="bit2" className={'mx-1'} variant={'pill'} color={'primary'} label checked={getBitEnabled(agency.agencySettings, 2)} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Voucher Display</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch ref="bit3" className={'mx-1'} variant={'pill'} color={'primary'} label checked={getBitEnabled(agency.agencySettings, 3)} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Voucher Not Display</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch ref="bit4" className={'mx-1'} variant={'pill'} color={'primary'} label checked={getBitEnabled(agency.agencySettings, 4)} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="mr-1" type="submit" size="sm" color="primary" onClick={this.submit.bind(this)}> Submit</Button>
                {agency.id && <Button className="mr-1" size="sm" color="danger" onClick={this.deleteAgency.bind(this)}> Delete</Button>}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ agency }) => ({ agency });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...agencyAction }, dispatch)
});

export const Agency = connect(mapStateToProps, mapDispatchToProps)(AgencyC);
