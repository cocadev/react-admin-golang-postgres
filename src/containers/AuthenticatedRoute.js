import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as authAction from '../actions/authAction';

class AuthenticatedRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillUnmount() {
    if(this.props.auth.userAuth != 1) {
      this.props.actions.logout();
      this.props.actions.setRedirectedFrom(this.props.location.pathname + this.props.location.search);
    }
  }

	render() {

    const C = this.props.component;

    return (
      <Route
        render={props =>
          this.props.auth.userAuth==1
            ? <C {...props} match={this.props.computedMatch} />
            : <Redirect to={'/login'} />}
      />
    )
  }

}

AuthenticatedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.element
};

const mapStateToProps = (state) => {
	return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...authAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
