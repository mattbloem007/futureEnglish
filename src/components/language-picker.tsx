import React from 'react';
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby';
import { usePageContext } from '../../PageContext';
import FlagIcon from './FlagIcon'


 const LanguagePicker = () => {
  const { originalPath } = usePageContext();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            supportedLanguages
          }
        }
      }
    `
  );


  return (
    <div className="language-selector-container">
      {site.siteMetadata.supportedLanguages.map(supportedLang => {

        if (supportedLang == "us") {
            return (
              <GatsbyLink
                key={supportedLang}
                aria-label={`Change language to ${supportedLang}`}
                to={`/`}

              >
                <FlagIcon code={supportedLang} size='3x' />
              </GatsbyLink>
            )
        }
        else {
          return (

            <GatsbyLink
              key={supportedLang}
              aria-label={`Change language to ${supportedLang}`}
              to={`/${supportedLang}`}

            >
              <FlagIcon code={supportedLang} size='3x' />
            </GatsbyLink>
          )
        }



      })}
    </div>
  );
};

export default LanguagePicker;
