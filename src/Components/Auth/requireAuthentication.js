import React, {Component} from 'react';  
import {connect} from 'react-redux';  
//import {pushState} from 'redux-router';

export default function (ComposedComponent) {

  class AuthenticatedComponent extends Component {

    componentWillMount() {
      console.log('auth will mount...');
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      console.log('auth will receipt props...');
      this.checkAuth();
    }

    /*
    componentWillUpdate(nextProps) {
        if (!nextProps.authenticated) {
          this.context.router.push('/login');
        }
    }
    */

    checkAuth() {
      //console.log('this.props.isAuthenticated => ' + this.props.isAuthenticated);
      console.log('check auth...');
      if (!this.props.isAuthenticated) {
        //let redirectAfterLogin = this.props.location.pathname;
        console.log('redirect after login...');
        //console.log('redirectAfterLogin => ' + redirectAfterLogin);
        //return <Redirect to={'/login'} />
        this.props.history.push('/login');
        //this.props.dispatch(pushState(null, '/login?next=' + {redirectAfterLogin}));
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <ComposedComponent {...this.props}/>
            : null
          }
        </div>
      );
    }

  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}