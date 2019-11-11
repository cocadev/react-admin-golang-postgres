import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from "react-router-dom";
import * as hotelAction from '../../actions/hotelAction';

class HotelDashboardC extends Component {
  constructor (props){
    super(props)
  }

  componentDidMount() {
  }

  selectHotel(hotelId) {
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row >
        <Col xl={3}>
            <Link to="/mainHotels">
              <div className="func-box">
                <p>Hotels</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/destinations">
              <div className="func-box">
                <p>Destinations</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/bookingsCheck">
              <div className="func-box">
              <p>Bookings Check<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/loyalty">
              <div className="func-box">
              <p>Loyalty<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/bookings">
              <div className="func-box">
              <p>Bookings<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/suppliers">
              <div className="func-box">
              <p>Suppliers<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/agencies">
              <div className="func-box">
              <p>Agencies<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/affiliateProfiles">
              <div className="func-box">
              <p>Affiliate Profiles<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/salesReports">
              <div className="func-box">
              <p>Sales Reports<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/refundRequests">
              <div className="func-box">
              <p>Refund Requests<br/>(Coming Soon)</p>
              </div>
            </Link>
          </Col>
          <Col xl={3}>
            <Link to="/refundApprovals">
              <div className="func-box">
              <p>Refund Approvals<br/>(Coming Soon)</p>
              </div>
            </Link>
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

export const HotelDashboard = connect(mapStateToProps, mapDispatchToProps)(HotelDashboardC);
