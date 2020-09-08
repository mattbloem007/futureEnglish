// import { silentAuth } from "./src/utils/auth"
// import React from 'react';
// import i18n from './i18next';
// import { I18nextProvider } from 'react-i18next';
//
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

export { wrapPageElement, wrapRootElement } from './gatsby-ssr';

// export const wrapRootElement = ({ element }) => {
//
//   return <SessionCheck>
//           <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
//           </SessionCheck>;
// };
