import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from "react-router-dom";
import * as providerAction from '../../actions/providerAction';
import utilService from '../../common/utilService';
import {AppSwitch} from "@coreui/react";

function ProviderRow(props) {
  const provider = props.provider;
  const providerLink = `#/providers/${provider.id}`;

  const getBitEnabled = (val, pos) => {

    if(val&Math.pow(2, pos)) {
      return <i className="fa fa-check"></i>
    }

      return <i className="fa fa-uncheck"></i>
  };

  return (
    <tr key={provider.id.toString()}>
      <th scope="row"><a href={providerLink}>{provider.id}</a></th>
      <td><a href={providerLink}>{provider.name}</a></td>
      <td className="text-center">{provider.code}</td>
      <td className="text-center">
        <AppSwitch size={'sm'} variant={'pill'} color={'primary'} label checked={provider.enabled} disabled={true}/>
      </td>
    </tr>
  )
}

class ProviderListC extends Component {

  componentDidMount() {
    this.props.actions.loadProviderList('')
  }

  render() {

    let providerList = this.props.provider.providers;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Provider List
                <Link to="/providers/new"><Button className="pull-right" size="sm" type="submit" color="primary"><i className="fa fa-plus"></i> New</Button></Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col" className="text-center">Code</th>
                      <th scope="col" className="text-center">Enabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providerList.map((provider,  index) =>
                      <ProviderRow key={index} provider={provider}/>
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

const mapStateToProps = ({ provider }) => ({ provider });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...providerAction }, dispatch)
});

export const ProviderList = connect(mapStateToProps, mapDispatchToProps)(ProviderListC);
