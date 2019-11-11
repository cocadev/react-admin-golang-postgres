import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import * as reportAction from '../../actions/reportAction';
import utilService from '../../common/utilService';
import * as Config from "../../config";

class ReportsC extends Component {
  componentDidMount() {
    this.props.actions.getReports()
  }

  downloadExcel(name, e) {
    if(e) {
      e.stopPropagation()
      e.preventDefault()
    }

    this.props.actions.createReport(name).then((data)=>{
      window.location.target = "_blank"
      console.log("Config.BACKEND_API_URL + data.relativePath", Config.BACKEND_API_URL + data.relativePath)
      window.location.href = Config.BACKEND_API_URL + data.relativePath
    })
  }

  render() {

    let reportList = this.props.report.reports
    console.log('this.props.report.reports', this.props.report.reports)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Reports
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Report Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportList.map((report, index) =>
                      (<tr key={index}>
                        <td><a href="#" onClick={this.downloadExcel.bind(this, report.name)}>{report.name}</a></td>
                      </tr>)
                    )}
                    {
                      reportList.length == 0 && <tr><td colSpan={1} style={{textAlign:'center'}}>There is not report</td></tr>
                    }
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

const mapStateToProps = ({ report }) => ({ report });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...reportAction }, dispatch)
});

export const Reports = connect(mapStateToProps, mapDispatchToProps)(ReportsC);
