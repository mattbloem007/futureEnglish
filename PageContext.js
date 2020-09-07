import React from 'react';
import { useTranslation } from 'react-i18next';
import { silentAuth } from "./src/utils/auth"
import i18n from './i18next';
//import Auth from './src/utils/Auth2'

const PageContext = React.createContext({});

class PageContextProvider extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        loading: true,
      }
    //  this.auth = new Auth()
    }

    handleCheckSession = () => {
      this.setState({ loading: false })
    }

    // login = () => {
    //   this.auth.login()
    // }


    componentDidMount() {
      console.log("PC, ", this.state.loading)
      silentAuth(this.handleCheckSession)
    }

    render() {
        console.log(this.props.pageContext)
      //  this.props.pageContext.login = this.login
        if(i18n.language != this.props.pageContext.lang) i18n.changeLanguage(this.props.pageContext.lang);


      return (
        this.state.loading === false && (
          <PageContext.Provider value={this.props.pageContext}>{this.props.children}</PageContext.Provider>
        )
      )
    }

}
export default PageContextProvider;
// export const PageContextProvider = ({ pageContext, children }) => {
//   const { i18n } = useTranslation();
//   console.log("PC ", pageContext)
//   if(i18n.language != pageContext.lang) i18n.changeLanguage(pageContext.lang);
//
//   return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>;
//
// };

export const usePageContext = () => React.useContext(PageContext);
