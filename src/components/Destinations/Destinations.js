import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, Input,Button, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationComponent from "../common/PaginationComponent";
import * as hotelAction from '../../actions/hotelAction';

class DestinationsC extends Component {
  constructor (props){
    super(props);
    this.state = {
      page:1,
      pageSize:10,
    }
  }

  componentDidMount() {
  }

  search(page) {
    var {pageSize} = this.state;

    //var providerId = document.getElementById('providerId').value;
    var providerId = 1;

    if(providerId == "") return;

    //var query = document.getElementById('query').value;
    var query = '';

    //var starRating = document.getElementById('starRating').value||"0";
    var starRating = '0';

    var offset = (page - 1) * pageSize;
    this.props.actions.getHotels(providerId, query, starRating, pageSize, offset);

    this.setState({
      page:page
    })
  }

  handleSelected(selectedPage) {
    this.search(selectedPage)
  }

  changeLive(hotelId, e) {
  }

  changeIndex(hotelId, e) {
  }


  render() {
    var {page, pageSize} = this.state;
    let hotelPageData = this.props.hotel.hotels||{};
    let hotelList = hotelPageData.hotels||[];

    let DistinationRow = (props) => {
      const hotel = props.hotel;
      const hotelLink = `#/destinations/${hotel.id}`;
      var content = JSON.parse(hotel.contentItemData);
      return (
        <tr key={hotel.id.toString()}>
          <td>{hotel.id.toString()}</td>
          <td><a href={hotelLink}>{content.Name}</a></td>
          <td>test</td>
          <td>
            <AppSwitch className={'mx-1'} size={'sm'} variant={'pill'} color={'primary'} disabled={true} label checked={hotel.isIndexed} onChange={this.changeIndex.bind(this, hotel.id)}/>
          </td>
        </tr>
      )
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Room-Res Hotels – Hotel Search Page
              </CardHeader>
              <CardBody>
                {/* <Form onSubmit={this.search.bind(this, 1)}>
                  <FormGroup>
                    <Input type="text" id="query" placeholder="Hotel Name" />
                  </FormGroup>
                </Form> */}
                <Form onSubmit={this.search.bind(this, 1)}>
                  <InputGroup>
                    <Input id="appendedInputButton" placeholder='Sofitel Sydney' size="16" type="text" />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary">
                        <i className="icon-magnifier icons d-block"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
                <Table responsive hover className='mt-2'>
                  <thead>
                  <tr>
                    <th scope="col">Country / State / High Level Region</th>
                    <th scope="col">City</th>
                    <th scope="col">Neighbourhood / POI / Station</th>
                    <th scope="col">Indexed?</th>
                  </tr>
                  </thead>
                  <tbody>
                  {hotelList.map((hotel, index) =>
                    <DistinationRow key={index} hotel={hotel}/>
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

const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export const Destinations = connect(mapStateToProps, mapDispatchToProps)(DestinationsC);
