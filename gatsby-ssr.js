import React from 'react';
import {PageContextProvider} from './PageContext';
import i18n from './i18next';
import { I18nextProvider } from 'react-i18next';
import { silentAuth } from "./src/utils/auth"

// class SessionCheck extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: true,
//     }
//   }
//
//   handleCheckSession = () => {
//     this.setState({ loading: false })
//   }
//
//   componentDidMount() {
//     silentAuth(this.handleCheckSession)
//   }
//
//   render() {
//     return (
//       this.state.loading === false && (
//         <React.Fragment>{this.props.children}</React.Fragment>
//       )
//     )
//   }
// }
//
// export const wrapRootElement = ({ element }) => {
//   return <SessionCheck>
//           <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
//          </SessionCheck>
// }
/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
export const wrapRootElement = ({ element }) => {
  return <I18nextProvider i18n={i18n}>{element}</I18nextProvider>;
};

/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
 export const wrapPageElement = ({ element, props }) => {
   return <PageContextProvider pageContext={props.pageContext}>{element}</PageContextProvider>;
 };
