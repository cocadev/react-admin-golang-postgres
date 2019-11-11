import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,InputGroupAddon,InputGroup, Input, Row, TabContent, TabPane, Table, Button, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '../../actions/hotelAction';
import {AppSwitch} from "@coreui/react";

class DestinationC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      accordion: [true, false, false, false, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      disabled_regions:true,
      disabled_mapped:true
    };

  }

  componentDidMount() {
    if(this.props.match.params) {
      this.props.actions.getHotel(this.props.match.params.providerId, this.props.match.params.hotelId)
    } else {
      return null;
    }
  }

  editMapped(){
    this.setState({
      disabled_mapped:!this.state.disabled_mapped
    })
  }

  editRegions(){
    this.setState({
      disabled_regions:!this.state.disabled_regions
    })
  }

  changeIndex(hotelId, e) {
  }

  changeLive(hotelId, e) {
  }

  render() {

    let hotel = this.props.hotel.hotel;
    let general = (hotel.general)?JSON.parse(hotel.general):{};
    let descriptions = (hotel.descriptions&&hotel.descriptions.length>0)?JSON.parse(hotel.descriptions).Descriptions:[];
    let images = (hotel.images&&hotel.images.length>0)?JSON.parse(hotel.images).Images:[];
    let rooms = (hotel.rooms&&hotel.rooms.length>0)?JSON.parse(hotel.rooms).Rooms:[];
    let facilities = (hotel.facilities&&hotel.facilities.length>0)?JSON.parse(hotel.facilities).Facilities:[];
    let destinations = (hotel.destinations&&hotel.destinations.length>0)?JSON.parse(hotel.destinations).Destinations:[];
    let address = (destinations.length>0?destinations[0]:{});
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <i className="icon-info pr-1"></i>Room-Res Hotels – Hotel Details Page
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                        <p className="m-0 p-0">Related Regions</p>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        <Row>
                          <Col xl={6}>
                              <Table responsive hover >
                                <thead>
                                <tr>
                                  <th scope="col">Sub Regions</th>
                                  <th scope="col">Linked</th>
                                  <th scope="col">Priority</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                      <td>Brisbane CBD</td>
                                      <td>
                                        <AppSwitch size={'sm'} className={'mx-1'} variant={'pill'} color={'primary'} disabled={this.state.disabled_regions} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
                                      </td>
                                      <td>
                                        <AppSwitch size={'sm'} className={'mx-1'} variant={'pill'} color={'primary'} disabled={this.state.disabled_regions} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Fortitude Valley</td>
                                      <td>
                                        <AppSwitch className={'mx-1'} size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_regions} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
                                      </td>
                                      <td>
                                        <AppSwitch className={'mx-1'} size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_regions} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
                                      </td>
                                    </tr>
                                </tbody>
                              </Table>

                          </Col>

                          <Col xl={6}>
                              <Table responsive hover>
                                <thead>
                                <tr>
                                  <th scope="col">Parents</th>
                                  <th scope="col" className='w-25'>Linked</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td>Queensland</td>
                                  <td>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_regions} className={'mx-1'} variant={'pill'} color={'primary'} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Australia</td>
                                  <td>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_regions} className={'mx-1'} variant={'pill'} color={'primary'} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                </tbody>
                              </Table>
                              <div className='text-right'>
                                {
                                  this.state.disabled_regions
                                    ? <Button color='primary' onClick={this.editRegions.bind(this)} data-id="1">Edit data</Button>
                                    : <div>
                                      <Button color='danger' onClick={this.editRegions.bind(this)} data-id="3">Cancel</Button>
                                      <Button className='ml-2' color='success' onClick={this.editRegions.bind(this)} data-id="2">Save Changes</Button>
                                    </div>
                                }
                              </div>
                          </Col>

                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader id="headingTwo">
                        <p className="m-0 p-0">Hotels Mapped to Brisbane: 427</p>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                        <Row>
                          <Col xl={6}>
                            <div className='b-a-1 p-3 mt-2'>
                              <Table responsive borderless>
                                <tbody>
                                <tr>
                                  <td className='text-left'><strong>Hotel mappings for Brisbane:</strong></td>
                                  <td className='w-25'></td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Brisbane Hilton</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped} variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Brisbane Marriott</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped} variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>QT Brisbane</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped} variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Brisbane Mantra</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped} variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Brisbane Sofitel</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped} variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                </tbody>
                              </Table>
                              <div className='text-center'>
                                <Button className='pl-4 pr-4' color='success'>View Map</Button>
                              </div>
                            </div>
                          </Col>

                          <Col xl={6}>
                            <div className='b-a-1 p-3 mt-2'>
                              <p className='pl-2 pt-2'><strong>Map additional hotels:</strong></p>
                              <InputGroup className='pl-2 pt-2'>
                                <Input id="appendedInputButton" placeholder='Best Western Caboolture' size="16" type="text" />
                                <InputGroupAddon addonType="append">
                                  <Button color="secondary">
                                    <i className="icon-magnifier icons d-block"></i>
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                              <Table className='mb-10' responsive borderless>
                                <tbody>
                                <tr>
                                  <td className='text-left'><strong>Best Western Caboolture Gateway</strong></td>
                                  <td className='w-25 p-0 pt-3 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped}  variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Best Western Caboolture Central</strong></td>
                                  <td className='w-25 p-0 pt-3 text-right'>
                                    <AppSwitch size={'sm'} disabled={this.state.disabled_mapped} variant={'pill'} color={'primary'} label checked={hotel.isLive} onChange={this.changeLive.bind(this, hotel.id)}/>
                                  </td>
                                </tr>
                                </tbody>
                              </Table>
                            </div>
                          </Col>
                          <Col xl={12}>
                            <div className='text-right mt-3'>
                              {
                                this.state.disabled_mapped
                                  ? <Button color='primary' onClick={this.editMapped.bind(this)} data-id="1">Edit data</Button>
                                  : <div>
                                    <Button color='danger' onClick={this.editMapped.bind(this)} data-id="3">Cancel</Button>
                                    <Button className='ml-2' color='success' onClick={this.editMapped.bind(this)} data-id="2">Save Changes</Button>
                                  </div>
                              }
                            </div>
                          </Col>

                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export const Destination = connect(mapStateToProps, mapDispatchToProps)(DestinationC);
