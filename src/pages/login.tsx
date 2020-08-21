import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import Select from 'react-select';
import { login, isAuthenticated, getProfile } from "../utils/auth"


class Login extends React.Component {

  constructor(props) {
      super(props);


      this.state = {
      };

  }

  componentWillMount() {
    console.log(isAuthenticated())
    if (!isAuthenticated()) {
      console.log("INHERE")
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
