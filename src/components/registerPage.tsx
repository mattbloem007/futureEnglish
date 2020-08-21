import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import RegisterItems from "./registerItems";
import styled from 'styled-components'
import GridItem from './grid-item'

import { animated, useSpring, config } from 'react-spring'



const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    'first-project about-us about-us'
    'three-projects three-projects three-projects'
    'instagram instagram instagram';

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'first-project first-project about-us about-us'
      'three-projects three-projects three-projects three-projects'
      'three-projects three-projects three-projects three-projects'
      'instagram instagram instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'first-project about-us'
      'three-projects three-projects'
      'three-projects three-projects'
      'three-projects three-projects'
      'instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'first-project'
      'about-us'
      'three-projects'
      'three-projects'
      'three-projects'
      'instagram';
  }
`

export default function() {
    const query = useStaticQuery(graphql`
        query registerList {


            wpgraphql {
              posts (where: {categoryName: "register"}){
                edges{
                  node{
                    excerpt
                    slug
                    date
                    title
                    featuredImage {
                      sourceUrl(size: LARGE)
                      srcSet(size: MEDIUM_LARGE)
                    }

                  }
                }
              }
            }

            allFile {
              edges {
                node {
                  name
                  parent{
                    id
                  }
                  childImageSharp {
                    fluid (quality: 95, maxWidth: 1200){
                      srcSet
                      ...GatsbyImageSharpFluid_withWebp

                    }
                  }
                }
              }
            }
        }
    `);

    if (query.wpgraphql.posts.edges.length > 0) {
      console.log("QUERY", query.allFile)
      const pageAnimation = useSpring({
        config: config.slow,
        from: { opacity: 0 },
        to: { opacity: 1 },
      })
        return (
                <RegisterItems data={query} />
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
