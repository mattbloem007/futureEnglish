import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import Select from 'react-select';
import { login, isAuthenticated, getProfile } from "../utils/auth"
import Auth0Lock from 'auth0-lock';
import Auth0LockPasswordless from 'auth0-lock-passwordless'
import { usePageContext } from '../../PageContext';

class Login extends React.Component {


  constructor(props) {
      super(props);


      this.state = {
      };

  }

  componentWillMount() {
    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
  }

    render () {
      return (
        <Layout>
          <SEO title="About | FEA" desc="This is Future English Academy" />

        </Layout>
      )
    }



}

export default Login
