import React from 'react';
import PageContextProvider from './PageContext';
import i18n from './i18next';
import { I18nextProvider } from 'react-i18next';

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
