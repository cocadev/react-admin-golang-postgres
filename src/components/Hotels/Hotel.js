import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import * as hotelAction from '../../actions/hotelAction';
import classnames from 'classnames';
import utilService from '../../common/utilService';

class HotelC extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    if(this.props.match.params) {
      //console.log("componentDidMount", this.props.match.params, this.props.match.params.providerId, this.props.match.params.hotelId)
      this.props.actions.getHotel(this.props.match.params.providerId, this.props.match.params.hotelId)
    } else {
      return null;
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    let hotel = this.props.hotel.hotel
    console.log("hotel", hotel, this.props.hotel)
    let general = (hotel.general)?JSON.parse(hotel.general):{}
    let descriptions = (hotel.descriptions&&hotel.descriptions.length>0)?JSON.parse(hotel.descriptions).Descriptions:[]
    let images = (hotel.images&&hotel.images.length>0)?JSON.parse(hotel.images).Images:[]
    let rooms = (hotel.rooms&&hotel.rooms.length>0)?JSON.parse(hotel.rooms).Rooms:[]
    let facilities = (hotel.facilities&&hotel.facilities.length>0)?JSON.parse(hotel.facilities).Facilities:[]
    let destinations = (hotel.destinations&&hotel.destinations.length>0)?JSON.parse(hotel.destinations).Destinations:[]
    let address = (destinations.length>0?destinations[0]:{})
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <i className="icon-info pr-1"></i>Hotel : {general.Name}
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      General
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      Description
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      Images
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '4' })}
                      onClick={() => { this.toggle('4'); }}
                    >
                      Rooms
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '5' })}
                      onClick={() => { this.toggle('5'); }}
                    >
                      Facilities
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Table responsive striped hover>
                      <tbody>
                        <tr>
                          <td width={150}>Name</td>
                          <td className="text-left">{general.Name}</td>
                        </tr>
                        <tr>
                          <td>Provider</td>
                          <td>{utilService.getProviderName(this.props.match.params.providerId)}</td>
                        </tr>
                        <tr>
                          <td>Star Rating</td>
                          <td>{general.StarRating}</td>
                        </tr>
                        <tr>
                          <td>Url</td>
                          <td>{general.Url}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{general.Emails?general.Emails.join(", "):""}</td>
                        </tr>
                        <tr>
                          <td>Phones</td>
                          <td>{general.Phones?general.Phones.join(", "):""}</td>
                        </tr>
                        <tr>
                          <td>Country</td>
                          <td>{address.Country}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{address.State}</td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>{address.City}</td>
                        </tr>
                        <tr>
                          <td>Address1</td>
                          <td>{address.Address1}</td>
                        </tr>
                        <tr>
                          <td>Address2</td>
                          <td>{address.Address2}</td>
                        </tr>
                        <tr>
                          <td>Postal Code</td>
                          <td>{address.PostalCode}</td>
                        </tr>                        <tr>
                          <td>Location</td>
                          <td>Latitude: {general.Latitude}, Longitude: {general.Longitude}</td>
                        </tr>
                        <tr>
                          <td>Remark</td>
                          <td>{general.Remark}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="2">
                    {
                      descriptions.map((description, index)=> (
                        <p key={index}>{description.Body}</p>
                      ))
                    }
                  </TabPane>
                  <TabPane tabId="3">
                    <Table responsive striped hover>
                        <tbody>
                        {
                          images.map((image, index)=> (
                            <tr>
                              <td width={150}>{image.Name}</td>
                              <td ><img src={image.Url}></img></td>
                            </tr>
                          ))
                        }
                        </tbody>
                    </Table>    
                  </TabPane>
                  <TabPane tabId="4">
                    <Table responsive striped hover>
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Num of Rooms</th>
                            <th scope="col">Bed Type</th>
                            <th scope="col">Max Pax</th>
                            <th scope="col">Min Pax</th>
                            <th scope="col">Max Adults</th>
                            <th scope="col">Min Adults</th>
                            <th scope="col">Max Children</th>
                            <th scope="col">Min Children</th>
                            <th scope="col">Max Extra Beds</th>
                            <th scope="col">Max Infant</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          rooms.map((room, index)=> (
                            <tr>
                              <td>{room.Name}</td>
                              <td>{room.TypeName}</td>
                              <td>{room.Description}</td>
                              <td>{room.NumOfRoom}</td>
                              <td>{room.BedType}</td>
                              <td>{room.MaxPax}</td>
                              <td>{room.MinPax}</td>
                              <td>{room.MaxAdults}</td>
                              <td>{room.MinAdults}</td>
                              <td>{room.MaxChildren}</td>
                              <td>{room.MinChildren}</td>
                              <td>{room.MaxExtraBed}</td>
                              <td>{room.MaxInfant}</td>
                            </tr>
                          ))
                        }
                        </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="5">
                    <Table responsive striped hover>
                        <tbody>
                        {
                          facilities.map((facility, index)=> (
                            <tr>
                              <td width={300}>{facility.Category?(facility.Category + "/"):""}{facility.Name}</td>
                              <td ><img src={facility.Url}></img></td>
                            </tr>
                          ))
                        }
                        </tbody>
                    </Table>    
                  </TabPane>
                </TabContent>
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

export const Hotel = connect(mapStateToProps, mapDispatchToProps)(HotelC);
