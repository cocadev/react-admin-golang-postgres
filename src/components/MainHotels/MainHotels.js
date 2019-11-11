import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, Input,Button, InputGroup, InputGroupAddon, FormGroup} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaginationComponent from "../common/PaginationComponent";
import * as activepropertylistAction from '../../actions/activepropertylistAction';

class MainHotelsC extends Component {

  constructor (props){
    super(props);
    this.state = {
      page:1,
      pageSize:10,
    }
  }

  componentDidMount() {
    this.props.actions.loadActivePropertyLists('');
  }

  search(page) {
    var {pageSize} = this.state;

    var name = document.getElementById('name').value.toUpperCase();
    var offset = (page - 1) * pageSize;

    this.props.actions.loadMainHotels( name, offset);

    this.setState({
      page:page
    })
  }

  handleSelected(selectedPage) {
    this.search(selectedPage)
  }

  changeLive(hotelId, e) {
    console.log('changeLive', hotelId, e)
  }

  changeIndex(hotelId, e) {
    console.log('changeIndex', hotelId, e)
  }
  

  render() {
    var {page, pageSize} = this.state;

    let activepropertylistPageData = this.props.activepropertylist.activepropertylists||{};
    let activepropertylistPageList = activepropertylistPageData.activepropertylists||[];

    let HotelRow = (props) => {

      const activepropertylist = props.activepropertylist;
      const activepropertylistLink = `#/mainHotels/${activepropertylist.id}`;

      return (
        <tr key={activepropertylist.id.toString()}>
            <td>{activepropertylist.id.toString()}</td>
            <td><a href={activepropertylistLink}>{activepropertylist.name}</a></td>
            <td className='m-auto w-15'>
              <AppSwitch variant={'pill'} size={'sm'} color={'primary'} label checked={activepropertylist.enabled} onChange={this.changeLive.bind(this, activepropertylist.enabled)} disabled={true}/>
            </td>
            <td className='m-auto w-15'>
              <AppSwitch variant={'pill'} size={'sm'} color={'primary'} label checked={activepropertylist.indexed} onChange={this.changeIndex.bind(this, activepropertylist.indexed)} disabled={true}/>
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
                   <Input type="text" id="name" placeholder='Search name' size="16" />

                   <InputGroupAddon addonType="append">
                     <Button color="secondary" onClick={this.search.bind(this, 1)}>
                       <i className="icon-magnifier icons d-block"></i>
                     </Button>
                   </InputGroupAddon>
                 </InputGroup>
                </Form>
                <Table responsive hover className='mt-2'>
                  <thead >
                    <tr>
                      <th className='w-25' scope="col">Room-Res ID</th>
                      <th scope="col">Hotel Name</th>
                      <th scope="col">Live?</th>
                      <th scope="col">Indexed?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activepropertylistPageList.map((activepropertylist, index) =>
                      <HotelRow key={index} activepropertylist={activepropertylist}/>
                    )}
                  </tbody>
                </Table>
                <center>
                {activepropertylistPageData.total > 0 && <div style={{display:'inline-block'}}><PaginationComponent
                  activePage={page}
                  totalItems={activepropertylistPageData.total}
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

const mapStateToProps = ({ hotel,activepropertylist }) => ({ hotel,activepropertylist });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...activepropertylistAction }, dispatch)
});

export const MainHotels = connect(mapStateToProps, mapDispatchToProps)(MainHotelsC);
