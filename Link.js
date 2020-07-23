import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { usePageContext } from './PageContext';

const Link = ({ to, ref, ...rest }) => {
  const { lang } = usePageContext();
  console.log("Lang ", lang)

  return <GatsbyLink {...rest} to={`/${lang}${to}`} />;
};

export default Link;
