import React, { Component } from 'react';
import { Modal,ModalFooter,ModalBody,ModalHeader,Card, CardBody, CardHeader, Col,InputGroupAddon,InputGroup, Input, Row, Table, Button, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {AppSwitch} from "@coreui/react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import * as activepropertylistAction from "../../actions/activepropertylistAction";
import * as providerAction from "../../actions/providerAction";
import * as mappingAction from "../../actions/mappingAction";
import * as hotelAction from "../../actions/hotelAction";
import utilService from "../../common/utilService";
import PaginationComponent from "../common/PaginationComponent";
import _ from 'underscore'

let mapping_supplier = 'DEFAULT';
let map_content,ean=null,gta=null,hb=null,agoda=null,ta=null,hd=null,rs=null,wb=null;
let providerId;
let clarifid;
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZXVnZW5ld29uZGVyZnVsIiwiYSI6ImNqaHh0OHZoeTBmZ2YzcXJ2a2h0YTUxZHoifQ.xMI_NsQyuCfZjtgI984Sug"
});

class MainHotelC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      accordion: [true, false, false, false, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      disabled_overview:true,
      disabled_mapping: true,
      disabled_content: true,
      disabled_destination1: true,
      disabled_destination2: true,
      modal: false,
      viewModal:false,
      page:1,
      pageSize:10,
      selectedProviderId:0
    };
    this.toggleLarge = this.toggleLarge.bind(this);
    this.getProviderName.bind(this)
    this.clarifiId = 0
    this.providers = []
  }

  componentDidMount() {
    if(this.props.match.params) {
      this.props.actions.viewHotel(this.props.match.params.hotelId);
      //this.props.actions.viewMap(this.props.match.params.hotelId);
      var that = this
      this.props.actions.getMapping(1, this.props.match.params.hotelId).then(function({error, data}){
        if(!error) {
          that.clarifiId = data.clarifiId
          that.props.actions.loadMappings(data.clarifiId)
        }
      })
      this.props.actions.loadProviderList('').then(function({error, data}){
        if(!error) {
          that.providers = data
        }
      })
    } else {
      return null;
    }
  }

  toggleLarge() {
    this.setState({
      viewModal: !this.state.viewModal,
    });
  }

  handleSelected(selectedPage) {
    this.search(selectedPage)
  }

  search(page) {
    var {pageSize} = this.state;
    var offset = (page - 1) * pageSize;
    this.props.actions.loadHotelList(providerId, 'a', offset);

    this.setState({
      page:page
    })
  }

  editOverview(e){
    this.setState({
      disabled_overview:!this.state.disabled_overview
    });

    switch (e.currentTarget.dataset.id) {
      case '1':
        localStorage.setItem('name',this.props.activepropertylist.activepropertylist.name);
        localStorage.setItem('image',this.props.activepropertylist.activepropertylist.image);
        localStorage.setItem('type',this.refs.type.state.checked ? 'hotel' : 'villa');
        localStorage.setItem('algorithm',this.refs.algorithm.state.checked ? 'minus' : 'plus');
        localStorage.setItem('live',this.refs.live.state.checked ? 'true' : 'false');
        break;
      case '2':
         this.props.actions.updateMainHotelDo(Object.assign({}, this.props.activepropertylist.activepropertylist, {
         }));
        break;
      default:

        this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
          name:localStorage.getItem('name'),
          image:localStorage.getItem('image'),
          type:localStorage.getItem('type'),
          algorithm:localStorage.getItem('algorithm'),
          enabled:localStorage.getItem('live')
        }));
    }
  }

  editMapping(){
    this.setState({
      disabled_mapping:!this.state.disabled_mapping
    })
  }

  editContent(){
    this.setState({
      disabled_content:!this.state.disabled_content
    })
  }

  editDestination1(){
    this.setState({
      disabled_destination1:!this.state.disabled_destination1
    })
  }

  editDestination2(){
    this.setState({
      disabled_destination2:!this.state.disabled_destination2
    })
  }

  changeLive(hotelId, e) {
  }

  changeName(e){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
      name:e.target.value
    }))
  }

  changeImage(e){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
      image:e.target.value
    }))
  }

  onChangeType(e){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
      type:e.target.value
    }))
  }

  onChangeAlgorithm(e){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
    }))
  }

  onClickAlgorithm(){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
      algorithm:this.refs.algorithm.state.checked ? 'plus':'minus'
    }))
  }

  onClickType(){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
      type:this.refs.type.state.checked ? 'villa' : 'hotel',
    }));
  }

  onClickLive(){
    this.props.actions.updateMainHotel(Object.assign({}, this.props.activepropertylist.activepropertylist, {
      enabled:this.refs.live.state.checked ? 'false' : 'true',
    }));
  }

  showHotelList(providerId, e) {
    var {pageSize, page} = this.state;
    if(e) {
      e.stopPropagation()
      e.preventDefault()
    }
    var offset = (page - 1) * pageSize;
    this.props.actions.loadHotelList(providerId, '', 0, pageSize, offset);

    this.setState({
      showHotelListModal: true,
      selectedProviderId:providerId,
      page:1
    });    
  }

  searchHotelList(page) {
    var {pageSize, selectedProviderId} = this.state;

    var offset = (page - 1) * pageSize;
    this.props.actions.loadHotelList(selectedProviderId, '', 0, pageSize, offset);

    this.setState({
      page:page
    });    
  }

  onChangeMapping(e){
    switch (e.currentTarget.dataset.id) {
      case '1': break;
      default : break;
    }
  }

  onChangeMapSearch(){

  }

  selectViewHotel(providerId, supplierId, e) {
    if(e) {
      e.stopPropagation()
      e.preventDefault()
    }
    this.setState({
      viewModal: true,
      selectedProviderId:providerId,
    });
    this.props.actions.getHotel(providerId, supplierId);
  }

  closeHotelListModal() {
    this.setState({
      showHotelListModal:false
    })
  }

  getProviderName(providerId) {
    var provider = _.find(this.providers, (o)=>{
      return o.id == providerId
    })
    if(provider) return provider.name

    return ''
  }

  selectPage(page) {
    this.searchHotelList(page)
  }

  selectMappingHotel(providerId, supplierId) {
    this.setState({showHotelListModal:false});
    this.props.actions.saveMapping({
      "clarifiId": this.clarifiId,
      "supplierId": String(supplierId),
      "providerId": providerId,
      enabled:true
    })
  }

  toogleEnabled(mapping, e){
    console.log('mapping', mapping)
    mapping.enabled = !mapping.enabled
    this.props.actions.saveMapping(mapping)
  }

  searchHotelList(providerId, e){
    if(e.key == 'Enter') {
      let {pageSize} = this.state
      //console.log('search hotel', providerId, e.target.value)
      this.props.actions.loadHotelList(providerId, e.target.value, 0, pageSize, 0);

      this.setState({
        page:1
      });   
    }
  }

  render() {
    let activepropertylist = this.props.activepropertylist.activepropertylist;
    let suppliermap = this.props.suppliermap.suppliermap;
    let hotel = this.props.hotel.hotel;
    let hotelPageData = this.props.hotel.hotels||{};
    let hotelList = hotelPageData.hotels||[];
    let {mappings, mappingData} = this.props.mapping
    let {providers} = this.props.provider
    var {page, pageSize, selectedProviderId} = this.state;

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
                <i className="icon-info pr-1"></i>Room-Res Hotels – Hotel Details Page
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                        <span className="m-0 p-0">Overview:</span>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                        <Row>
                          <Col md={5}>
                            <Table responsive borderless>
                              <tbody>
                              <tr>
                                <td className='text-left'><strong>Hotel Name:</strong></td>
                                {
                                  !this.state.disabled_overview
                                  ? <td className='p-1'><Input type="text" ref={ref => {
                                    this.name = ref
                                   }} value={activepropertylist.name} onChange={this.changeName.bind(this)}/></td>
                                  : <td ref='name' className='w-50'>{activepropertylist.name}</td>
                                }
                                </tr>
                              <tr>
                                <td className='text-left'><strong>Room-Res Code:</strong></td>
                                <td className='w-50'>{activepropertylist.id}</td>
                              </tr>
                              <tr>
                                <td className='text-left'><strong>(Historical Code:)</strong></td>
                                <td className='w-50'></td>
                              </tr>
                              <tr>
                                    <td className='text-left'><strong>Live?:</strong></td>
                                    <td className='w-50 p-0 m-0 pl-2 pt-2'>
                                      <AppSwitch ref='live' size={'sm'} variant={'pill'} color={'primary'} label checked={activepropertylist.enabled == 'true' ? true : false} disabled={this.state.disabled_overview} onClick={this.onClickLive.bind(this)}/>
                                    </td>
                              </tr>
                              <tr>
                                   <td className='text-left'><strong>Number of times Booked:</strong></td>
                                   <td className='w-50'>{activepropertylist.bookCount}</td>
                              </tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col md={5}>
                            <Table responsive borderless>
                              <tbody className='line-height'>
                              <tr>
                                <td><strong>Type:</strong></td>
                                <td className='w-25'>Villa</td>
                                <td className='w-25 p-0 m-0 pl-2 pt-3'>
                                  <AppSwitch ref='type' size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_overview} label checked={activepropertylist.type == 'villa' ? true : false} onClick={this.onClickType.bind(this)}/>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td className='w-25'>Hotel</td>
                                <td className='w-25 p-0 m-0 pl-2 pt-3'>
                                  <AppSwitch ref='type' size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_overview} label checked={activepropertylist.type == 'hotel' ? true : false} onClick={this.onClickType.bind(this)}/>
                                </td>
                              </tr>
                              <tr>
                                <td><strong>Algorithm Boost:</strong></td>
                                <td className='w-25'>Plus</td>
                                <td className='w-25 p-0 m-0 pl-2 pt-3'>
                                  <AppSwitch ref='algorithm' size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_overview} label checked={activepropertylist.algorithm == 'plus' ? true : false} onClick={this.onClickAlgorithm.bind(this)}/>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td className='w-25'>Minus</td>
                                <td className='w-25 p-0 m-0 pl-2 pt-3'>
                                  <AppSwitch ref='algorithm' size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_overview} label checked={activepropertylist.algorithm == 'minus' ? true : false} onClick={this.onClickAlgorithm.bind(this)}/>
                                </td>
                              </tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col md={2}>
                            <img className="w-100 py-2" src={activepropertylist.image} alt={'No image'}/>
                            {
                              this.state.disabled_overview
                                ? <span>{activepropertylist.image}</span>
                                : <Input value={activepropertylist.image} onChange={this.changeImage.bind(this)}/>
                            }
                          </Col>
                          <Col md={12} className='mt-2'>
                            {
                              this.state.disabled_overview
                              ? <Button className='float-right' color='primary' onClick={this.editOverview.bind(this)} data-id="1">Edit data</Button>
                              : <div>
                                  <Button className='float-right' color='danger' onClick={this.editOverview.bind(this)} data-id="3">Cancel</Button>
                                  <Button className='float-right mr-1' color='success' onClick={this.editOverview.bind(this)} data-id="2">Save Changes</Button>
                                </div>
                            }
                          </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader  id="headingTwo">
                        <span className="m-0 p-0">Supplier Mapping:</span>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseTwo">
                      <CardBody>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th></th> 
                              {
                                providers.map((provider, index)=>{
                                  if(provider.id == 1) return
                                  return (
                                    <th className="text-capitalize text-center" key={index}>{provider.name}</th>
                                  )
                                })
                              }
                            </tr>
                          </thead>
                          <tbody>
                          {
                            <tr className='cursor-pointer'>
                                <td className='text-left w-10'>Supplier Code</td>
                                {
                                  providers.map((provider, index)=>{
                                    if(provider.id == 1) return
                                    var mapping = _.find(mappings, (o)=>{
                                      return o.providerId == provider.id
                                    })
                                    if(mapping) {
                                        return (
                                          <td key={index} className="text-center"><a href="#" onClick={this.selectViewHotel.bind(this, provider.id, mapping.supplierId)}>{mapping.supplierId}</a></td>
                                        )
                                      } else {
                                        return (
                                          <td key={index} className="text-center"><span>-</span></td>
                                        )
                                      }
                                  })
                                }
                              </tr>
                          }
                          <tr hidden={this.state.disabled_mapping } disabled={this.state.disabled_mapping }>
                            <td className='text-left w-10'>Edit Mapping</td>
                            {
                              providers.map((provider, index)=>{
                                if(provider.id == 1) return
                                return (
                                  <td key={index} className="text-center"><a href="#" className="link" onClick={this.showHotelList.bind(this, provider.id)}>Search</a></td>
                                )
                              })
                            }
                          </tr>
                          <tr>
                            <td className='text-left'>Live?</td>
                            {
                              providers.map((provider, index)=>{
                                if(provider.id == 1) return
                                var mapping = _.find(mappings, (o)=>{
                                  return o.providerId == provider.id
                                })
                                if(mapping) {
                                  return (
                                    <td key={index} className="text-center">
                                      <AppSwitch className={'mx-1'} size={'sm'} variant={'pill'} color={'primary'} label 
                                      checked={mapping.enabled} 
                                      disabled={this.state.disabled_mapping} 
                                      onClick={this.toogleEnabled.bind(this, mapping)}/>
                                    </td>
                                  ) 
                                } else {
                                  return (<td key={index}></td>)
                                }
                              })
                            }
                          </tr>
                          </tbody>
                        </Table>
                        <Modal isOpen={this.state.showHotelListModal} className='modal-lg'>
                          <ModalHeader toggle={this.closeHotelListModal.bind(this)}>Supplier :  {this.getProviderName(selectedProviderId)}</ModalHeader>
                          <ModalBody>
                            <Input placeholder='Search by code, name' type='text' onKeyPress={this.searchHotelList.bind(this, selectedProviderId)}/>
                            <Table className='mt-2' striped responsive hover>
                              <thead>
                                <tr>
                                 <th>Hotel ID</th>
                                 <th>Hotel Name</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                hotelList.map((hotel) =>
                                <tr key={hotel.id} onClick={this.selectMappingHotel.bind(this, selectedProviderId, hotel.hotelRef)}>
                                  <td>{hotel.hotelRef}</td>
                                  <td >{JSON.parse(hotel.contentItemData).Name}</td>
                                </tr>
                              )}
                              </tbody>
                            </Table>
                            <center>
                            {hotelPageData.total > 0 && <div style={{display:'inline-block'}}><PaginationComponent
                              activePage={page}
                              totalItems={hotelPageData.total}
                              pageSize={pageSize}
                              onSelect={this.selectPage.bind(this)}
                              maxPaginationNumbers={5}
                            /></div>}
                            </center>
                          </ModalBody>
                        </Modal>

                        <Modal className='modal-lg' isOpen={this.state.viewModal} toggle={this.toggleLarge} style={{maxWidth:1000}}>
                          <ModalHeader toggle={this.toggleLarge}>Hotel Supplier Content</ModalHeader>
                          <ModalBody>

                            <Row>
                              <Col lg={12}>
                                <Card>
                                  <CardHeader>
                                    <Row>
                                      <Col md={6}>
                                        <Row>
                                          <Col md={4}>Supplier Hotel Name:</Col>
                                          <Col md={8}>{general.Name}</Col>
                                          <br/><br/>
                                          <Col md={4}>Supplier Address:</Col>
                                          <Col md={8}>{address.Address1}</Col>
                                        </Row>
                                      </Col>
                                      <Col md={6}>
                                        <Row>
                                          <Col md={4}>Supplier Hotel Code:</Col>
                                          <Col md={8}>{this.getProviderName(selectedProviderId)}</Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </CardHeader>

                                  <CardBody>
                                    <Row>
                                      <Col md={6}>
                                        <Row>
                                          <Col md={4}>Mapped to:</Col>
                                          <Col md={8}></Col>
                                          <br/><br/>
                                          <Col md={4}>Room-Res Hotel Name:</Col>
                                          <Col md={8}>{activepropertylist.name}</Col>
                                          <br/><br/>
                                          <Col md={4}>Room-Res Address:</Col>
                                          <Col md={8}>{activepropertylist.address1}</Col>
                                        </Row>
                                      </Col>
                                      <Col md={6}>
                                        <Row>
                                          <Col md={12}></Col>
                                          <br/><br/>
                                          <Col md={4}>Room-Res Hotel Code:</Col>
                                          <Col md={8}>{activepropertylist.id}</Col>
                                          <br/><br/>
                                          <Col md={12}></Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={12}>
                                <Card>
                                  <CardHeader>
                                    Supplier Content:
                                  </CardHeader>
                                  <CardBody>
                                    <Row>
                                      <Col md={9}>
                                        <Row>
                                          <Col md={2}>Description:</Col>
                                          <Col md={10}>{
                                            descriptions.map((description, index)=> (
                                              <p key={index}>{description.Body}</p>
                                            ))
                                          }</Col>
                                          {/* <br/><br/>
                                          <Col md={2}>Standard Terms:</Col>
                                          <Col md={10}>{general.Remark}</Col> */}
                                        </Row>
                                      </Col>
                                      <Col md={3}>
                                        <img src={general.image||(images[0]?images[0].Url:'')} alt='No image' style={{width:'100%'}}/>
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={12}>
                                <Card>
                                  <CardHeader>
                                    Supplier Rooms:
                                  </CardHeader>

                                  <CardBody>
                                    <Table>
                                      <thead>
                                        <tr>
                                          <th>Room Name</th>
                                          <th>Room Code</th>
                                          <th>Room Description / Bedding Config</th>
                                          <th>Room Images </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {
                                        rooms.map((room, index)=> (
                                          <tr>
                                            <td>{room.Name}</td>
                                            <td>{room.TypeName}</td>
                                            <td>{room.Description}</td>
                                            <td>{room.TypeName}</td>
                                          </tr>
                                        ))
                                      }
                                      </tbody>
                                    </Table>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>

                          </ModalBody>
                        </Modal>

                        <Col className='text-right mt-2'>
                          {
                            this.state.disabled_mapping
                              ? <Button className='' color='primary' onClick={this.editMapping.bind(this)} data-id="1">Edit data</Button>
                              : <div>
                                  <Button className='' color='danger' onClick={this.editMapping.bind(this)} data-id="3">Cancel</Button>
                                  <div className='padding-box'/>
                              </div>
                          }
                        </Col>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader  id="headingThree">
                        <span className="m-0 p-0">Content:</span>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                        <Row>
                          <Col lg={9} md={8} sm={7} xs={12}>
                           <Table responsive borderless>
                          <tbody>
                          <tr>
                            <td className='text-left'><strong>Supplier Source:</strong></td>
                            <td className='w-75'></td>
                          </tr>
                          <tr>
                            <td className='text-left'><strong>Room-Res Address:</strong></td>
                            <td className='w-75'>{activepropertylist.address1}</td>
                          </tr>
                          <tr>
                            <td className='text-left'><strong>Description:</strong></td>
                            <td className='w-75'></td>
                          </tr>
                          <tr>
                            <td className='text-left'><strong>Standard Terms:</strong></td>
                            <td className='w-75'></td>
                          </tr>
                          </tbody>
                        </Table>
                          </Col>
                          <Col lg={3} md={4} sm={5} xs={12}>
                            {activepropertylist.latitude && activepropertylist.longitude

                              ? <Map
                                style="mapbox://styles/mapbox/streets-v9"
                                center={[
                                  parseFloat(activepropertylist.longitude),
                                  parseFloat(activepropertylist.latitude)
                                ]}
                                containerStyle={{
                                  height: "200px",
                                  width: "100%"
                                }}>
                                <Marker
                                  coordinates={[parseFloat(activepropertylist.longitude), parseFloat(activepropertylist.latitude)]}
                                  anchor="bottom">
                                  <img width='20' height='32' src='https://lifedeck.biz/wp-content/uploads/2017/12/map-marker-icon.png'/>
                                </Marker>
                              </Map>
                              : null
                            }
                          </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader  id="headingThree">
                        <span className="m-0 p-0">Destination Mapping:</span>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                        <Row>

                          <Col xl={6}>
                            <div className='b-a-1 p-3 mt-2'>
                              <Table responsive borderless>
                                <tbody>
                                <tr>
                                  <td className='text-left'><strong>Mapped to following destinations:</strong></td>
                                  <td className='w-25'></td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Sydney</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination1} label checked={true} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Sydney CBD</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination1} label checked={true} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Sydney Wynyard Station</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination1} label checked={true} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Circular Quay</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination1} label checked={true} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>Opera House</strong></td>
                                  <td className='w-25 p-0 pt-2 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination1} label checked={true} />
                                  </td>
                                </tr>
                                </tbody>
                              </Table>
                              <br/>
                              <div className='text-right'>
                                {
                                  this.state.disabled_destination1
                                    ? <Button color='primary' onClick={this.editDestination1.bind(this)} data-id="1">Edit data</Button>
                                    : <div>
                                      <Button color='danger' onClick={this.editDestination1.bind(this)} data-id="3">Cancel</Button>
                                      <Button className='ml-2' color='success' onClick={this.editDestination1.bind(this)} data-id="2">Save Changes</Button>
                                    </div>
                                }
                              </div>
                            </div>
                          </Col>

                          <Col xl={6}>
                            <div className='b-a-1 p-3 mt-2'>
                              <p className='pl-2 pt-25'><strong>Map to additional destinations:</strong></p>
                              <InputGroup className='pl-2'>
                                <Input id="appendedInputButton" placeholder='Sofitel Sydney' size="16" type="text" />
                                <InputGroupAddon addonType="append">
                                  <Button color="secondary">
                                    <i className="icon-magnifier icons d-block"></i>
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                              <Table className='mt-1' responsive borderless>
                                <tbody>
                                <tr>
                                  <td className='text-left'><strong>North Sydney</strong></td>
                                  <td className='w-25 p-0 pt-3 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination2} label checked={true} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className='text-left'><strong>North Sydney Oval</strong></td>
                                  <td className='w-25 p-0 pt-3 text-right'>
                                    <AppSwitch size={'sm'} variant={'pill'} color={'primary'} disabled={this.state.disabled_destination2} label checked={true} />
                                  </td>
                                </tr>
                                </tbody>
                              </Table>
                              <div className='text-right mt-11'>
                                {
                                  this.state.disabled_destination2
                                    ? <Button color='primary' onClick={this.editDestination2.bind(this)} data-id="1">Edit data</Button>
                                    : <div>
                                      <Button color='danger' onClick={this.editDestination2.bind(this)} data-id="3">Cancel</Button>
                                      <Button className='ml-2' color='success' onClick={this.editDestination2.bind(this)} data-id="2">Save Changes</Button>
                                    </div>
                                }
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader  id="headingThree">
                        <span className="m-0 p-0">Room Mapping (Coming soon):</span>
                    </CardHeader>
                    <Collapse isOpen={true} data-parent="#accordion" id="collapseThree">
                      <CardBody>
                        3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                        on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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

const mapStateToProps = ({ activepropertylist,suppliermap, hotel, mapping, provider }) => ({ activepropertylist,suppliermap,hotel, mapping, provider });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...activepropertylistAction, ...providerAction, ...mappingAction, ...hotelAction }, dispatch),
});

export const MainHotel = connect(mapStateToProps, mapDispatchToProps)(MainHotelC);
