import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationComponent from "../common/PaginationComponent";
import * as hotelAction from '../../actions/hotelAction';
import * as providerAction from '../../actions/providerAction';
import utilService from '../../common/utilService';

function HotelRow(props) {
  const hotel = props.hotel;
  const hotelLink = `#/hotels/${hotel.providerId}/${hotel.hotelRef}`;
  var content = JSON.parse(hotel.contentItemData);
  return (
    <tr key={hotel.id.toString()}>
        <td>{utilService.getProviderName(hotel.providerId)}</td>
        <td><a href={hotelLink}>{hotel.hotelRef}</a></td>
        <td><a href={hotelLink}>{content.Name}</a></td>
        <td>{content.StarRating}</td>
    </tr>
  )
}

class HotelsC extends Component {
  constructor (props){
    super(props);
    this.state = {
      page:1,
      pageSize:10,
      providers:[]
    }
  }

  componentDidMount() {
    this.props.actions.loadProviderList('');
  }

  search(page) {
    var {pageSize} = this.state;

    var providerId = document.getElementById('providerId').value;

    if(providerId == "") return;

    var query = document.getElementById('query').value;
    var starRating = document.getElementById('starRating').value||"0";
    var offset = (page - 1) * pageSize;
    this.props.actions.loadHotelList(providerId, query, starRating, pageSize, offset);

    this.setState({
      page:page
    })
  }

  handleSelected(selectedPage) {
    this.search(selectedPage)
  }

  render() {
    var {page, pageSize} = this.state;
    let hotelPageData = this.props.hotel.hotels||{};
    let hotelList = hotelPageData.hotels||[];

    let ProviderData = this.props.provider.providers||{};

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Hotels
              </CardHeader>
              <CardBody>
                <br/>
                <Form inline style={{marginBottom:10, float:'right'}}>

                  <FormGroup className="pr-5">
                    <Label htmlFor="provider" className="pr-2">Provider</Label>
                    <Input type="select" name="providerId" id="providerId">
                      <option value="">Select a provider</option>
                      {ProviderData.map((item) =>
                        <option value={item.id}>{item.name}</option>
                      )}
                    </Input>
                  </FormGroup>
                  <FormGroup className="pr-5">
                    <Label htmlFor="query" className="pr-2">Hotel Name</Label>
                    <Input type="text" id="query" placeholder="Hotel Name" />
                  </FormGroup>
                  <FormGroup className="pr-5">
                    <Label htmlFor="starRating" className="pr-2">Stars</Label>
                    <Input type="select" name="starRating" id="starRating">
                      <option value="0">All Hotels</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" onClick={this.search.bind(this, 1)}>Search</Button>
                  </FormGroup>
                </Form>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Provider</th>
                      <th scope="col">Hotel ID</th>
                      <th scope="col">Hotel Name</th>
                      <th scope="col">Stars</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelList.map((hotel, index) =>
                      <HotelRow key={index} hotel={hotel}/>
                    )}
                  </tbody>
                </Table>
                <center>
                {hotelPageData.total > 0 && <div style={{display:'inline-block'}}><PaginationComponent
                  activePage={page}
                  totalItems={hotelPageData.total}
                  pageSize={pageSize}
                  onSelect={this.handleSelected.bind(this)}
                  maxPaginationNumbers={5}
                /></div>}
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ hotel,provider }) => ({ hotel,provider });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...hotelAction, ...providerAction }, dispatch)
});

export const Hotels = connect(mapStateToProps, mapDispatchToProps)(HotelsC);
