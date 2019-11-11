import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from "react-router-dom";
import * as agencyAction from '../../actions/agencyAction';
import utilService from '../../common/utilService';

function AgencyRow(props) {
  const agency = props.agency
  const agencyLink = `#/agencies/${agency.id}`

  const getBitEnabled = (val, pos) => {
    if(val&Math.pow(2, pos)) {
      return <i className="fa fa-check"></i>
    }

    return <i className="fa fa-uncheck"></i>
  }

  return (
    <tr key={agency.id.toString()}>
      <th scope="row"><a href={agencyLink}>{agency.id}</a></th>
      <td><a href={agencyLink}>{agency.name}</a></td>
      <td className="text-center">{getBitEnabled(agency.agencySettings, 0)}</td>
      <td className="text-center">{getBitEnabled(agency.agencySettings, 1)}</td>
      <td className="text-center">{getBitEnabled(agency.agencySettings, 2)}</td>
      <td className="text-center">{getBitEnabled(agency.agencySettings, 3)}</td>
      <td className="text-center">{getBitEnabled(agency.agencySettings, 4)}</td>
    </tr>
  )
}

class AgencyListC extends Component {
  componentDidMount() {
    this.props.actions.loadAgencyList('')
  }
  render() {

    let agencyList = this.props.agency.agencies;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Agency List
                <Link to="/agencies/new"><Button className="pull-right" size="sm" type="submit" color="primary"><i className="fa fa-plus"></i> New</Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col" className="text-center">Enable Itinerary</th>
                      <th scope="col" className="text-center">GDS Integration</th>
                      <th scope="col" className="text-center">Itinerary Hotel Code</th>
                      <th scope="col" className="text-center">Voucher Display</th>
                      <th scope="col" className="text-center">Voucher Not Display</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agencyList.map((agency, index) =>
                      <AgencyRow key={index} agency={agency}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
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

export const AgencyList = connect(mapStateToProps, mapDispatchToProps)(AgencyListC);
