import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { usePageContext } from './PageContext';

const Link = ({ to, ref, ...rest }) => {
  const { lang } = usePageContext();

  if (lang != undefined) {
    return <GatsbyLink {...rest} to={`/${lang}${to}`} />;
  }
  else {
    return <GatsbyLink {...rest} to={`${to}`} />;
  }

};

export default Link;
