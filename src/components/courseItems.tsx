import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from 'styled-components'
import GridItem from './grid-item'
import { usePageContext } from '../../PageContext';

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

const FirstProject = styled(GridItem)`
  grid-area: first-project;
`
const ThreeProjects = styled.div`
  grid-area: three-projects;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`
const AboutUs = styled(GridItem)`
  grid-area: about-us;
`
const Instagram = styled(GridItem)`
  grid-area: instagram;`


class CourseItem extends React.Component {

    render() {
      let isImage = false;
      console.log("FILE", this.props.file)
      if (this.props.file.node.childImageSharp) {
        isImage = true;
      }
      switch (this.props.title) {
        case "0":
        return (
          <FirstProject to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
            {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
            <span>{this.props.data.node.title}</span>
          </FirstProject>

        );
        break;
        {/**case "1":
          return (
            <ThreeProjects to={`/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
              {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              <span>{this.props.data.node.title}</span>
            </ThreeProjects>

          );
        break; */}

        default:
        if (this.props.data.node.categories) {
          console.log(this.props.data.node.categories.nodes, _.some(this.props.data.node.categories.nodes, {"name": "photos"}))
          if (_.some(this.props.data.node.categories.nodes, {"name": "photos"}) && this.props.data.node.excerpt == "<p>pic1</p>\n") {
            return (
              <AboutUs to="#">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              </AboutUs>
            );
          }
          else if (_.some(this.props.data.node.categories.nodes, {"name": "photos"}) && this.props.data.node.excerpt == "<p>pic2</p>\n") {
            return (
              <Instagram to="#">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              </Instagram>
            );
          }
          else if (_.some(this.props.data.node.categories.nodes, {"name": "photos"})) {
            return (
              <GridItem to="#">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              </GridItem>
            )
          }
          else {
            return (
              <GridItem to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                <span>{this.props.data.node.title}</span>
              </GridItem>
            )
          }
        }


        break;
      }
    }
}

export default function(props) {
  const { lang } = usePageContext();
    console.log(props.data)
    let items = [];
    let fileIndex;
    if (props.data.wpgraphql.posts.edges != undefined) {
      const data = props.data.wpgraphql.posts.edges;
      data.forEach(function(e, i) {
          if (props.remove && e.node.id === props.remove) return;
            fileIndex = props.data.allFile.edges.find(({node}) => {
              if (node.parent) {
                console.log(node.parent.id)
                if (node.parent.id == `SitePage /${lang}/courses/` + e.node.slug) {
                  return node
                }
              }
            })
            console.log(fileIndex)
            if (fileIndex) {
              items.push(<CourseItem key={e.node.id} data={e} file={fileIndex} title={i}/>);
            }

      });
    }
    return <Area>{items}</Area>;
}
