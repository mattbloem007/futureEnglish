import React from "react"
import { handleAuthentication, silentAuth } from "../utils/auth"

// const Callback = () => {
//   console.log("IN HERE CALLBACK")
//   //handleAuthentication()
//   silentAuth()
//
//   return <p>Loading...</p>
// }

class CallBack extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        loading: true,
      }
    }

    handleCheckSession = () => {
      this.setState({ loading: false })
    }

    componentDidMount() {
      silentAuth(this.handleCheckSession)
    }

    render() {
      return(
        <p>Loading...</p>
      )
    }
  }

export default CallBack
