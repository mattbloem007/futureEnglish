const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`);
const config = require('./gatsby-config');


// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

  exports.onCreatePage = async ({ page, actions: { createPage, deletePage, createRedirect } }) => {
    const isEnvDevelopment = process.env.NODE_ENV === 'development';
    const originalPath = page.path;
    // Delete the original page (since we are gonna create localized versions of it) and add a
    // redirect header
    await deletePage(page);

    await Promise.all(
      config.siteMetadata.supportedLanguages.map(async lang => {
        const localizedPath = `/${lang}${page.path}`;

        // create a redirect based on the accept-language header
        createRedirect({
          fromPath: originalPath,
          toPath: localizedPath,
          Language: lang,
          isPermanent: false,
          redirectInBrowser: isEnvDevelopment,
          statusCode: 301,
        });

        await createPage({
          ...page,
          path: localizedPath,
          context: {
            ...page.context,
            originalPath,
            lang,
          },
        });
      })
    );

    // Create a fallback redirect if the language is not supported or the
    // Accept-Language header is missing for some reason
    createRedirect({
      fromPath: originalPath,
      toPath: `/${config.siteMetadata.defaultLanguage}${page.path}`,
      isPermanent: false,
      redirectInBrowser: isEnvDevelopment,
      statusCode: 301,
    });
  };

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = require.resolve('./src/templates/project.tsx')

  const result = await wrapper(
    graphql(`
      {
        projects: allProjectsYaml {
          nodes {
            slug
            images
          }
        }

        wpgraphql{
posts(first: 100){
  edges{
    node{
      id
      slug
      tags {
        edges {
          node {
            name
          }
        }
      }
      featuredImage{
        sourceUrl
      }
      categories{
        edges{
          node{
            name
          }
        }
      }
    }
  }
}
pages{
  edges{
    node{
      id
      slug
    }
  }
}
}
      }
    `)
  )

  const blogPosts = result.data.wpgraphql.posts.edges;
  const allPages = result.data.wpgraphql.pages.edges;
  let courses = [];
  let info = [];

  // result.data.projects.nodes.forEach(node => {
  //   createPage({
  //     path: node.slug,
  //     component: projectTemplate,
  //     context: {
  //       slug: node.slug,
  //       images: `/${node.images}/`,
  //     },
  //   })
  // })

  blogPosts.forEach(({ node }, i) => {
    if (node.categories.edges[0].node.name == "courses") {
      courses.push(node)
    }
    else {
      info.push(node)
    }
  });

  config.siteMetadata.supportedLanguages.map(async lang => {
    let langu = lang
    courses.forEach((node) => {
      if (node.tags.edges.length > 0) {
        if(node.tags.edges[0].node.name != lang) {
          langu = node.tags.edges[0].node.name
        }
        createPage({
            path: `/${langu}/courses/${node.slug}`,
            component: projectTemplate,
            context: {
                id: node.id,
                slug: node.slug,
                images: node.featuredImage,
                id2:  {"eq": `SitePage /${langu}/courses/${node.slug}`},
                featuredImage: node.featuredImage,
                originalPath: `/courses/${node.slug}`,
                lang: langu
            }
          })
      }
      else {
        langu = lang
        createPage({
            path: `/${langu}/courses/${node.slug}`,
            component: projectTemplate,
            context: {
                id: node.id,
                slug: node.slug,
                images: node.featuredImage,
                id2:  {"eq": `SitePage /${langu}/courses/${node.slug}`},
                featuredImage: node.featuredImage,
                originalPath: `/courses/${node.slug}`,
                lang: langu
            }
          })
      }

      });

      info.forEach((node) => {
        let langu = lang
        if (node.tags.edges.length > 0) {
          if(node.tags.edges[0].node.name != lang) {
            langu = node.tags.edges[0].node.name
          }
          createPage({
              path: `/${langu}/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  id2:  {"eq": `SitePage /${langu}/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/${node.slug}`,
                  lang: langu
              }
            })
        }
        else {
          langu = lang
          createPage({
              path: `/${langu}/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  id2:  {"eq": `SitePage /${langu}/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/${node.slug}`,
                  lang: langu
              }
            })
        }

        });
  })




  // allPages.forEach(({ node }) => {
  //     createPage({
  //         path: node.slug,
  //         component: path.resolve("./src/templates/blog.js"),
  //         context: {
  //             id: node.id,
  //             slug: node.slug
  //         }
  //     });
  // });
}

exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId, _auth, }) => {
    const { createNodeField, createNode } = actions;
    let fileNode

    if (node.internal.type === `SitePage`) {
     if (node.context != undefined) {

       if (node.context.featuredImage) {

         try {
           fileNode = await createRemoteFileNode({
             url: node.context.featuredImage.sourceUrl,
             parentNodeId: node.id,
             store,
             cache,
             createNode,
             createNodeId,
             auth: _auth,
           })
         } catch (e) {
           console.log(e)
         }
         console.log("NODE ", node.id)
       }
      }
    }
    if (fileNode) {

      node.localFile___NODE = fileNode.id
    }
};
