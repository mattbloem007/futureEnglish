import React from 'react'
import logo from '../../content/logo.png'
import logo_us from '../../content/usa_logo.png'
import { usePageContext } from '../../PageContext';


const styles = {
  height: '250%',
  width: '250%'
}

const Logo = () => {
  const { lang } = usePageContext();

  if (lang == undefined || lang == "us") {
    return (
      <div>
        <img style={styles} src={logo_us} />
      </div>
    )
  }
  else {
    return (
      <div>
        <img style={styles} src={logo} />
      </div>
    )
  }



}

export default Logo
