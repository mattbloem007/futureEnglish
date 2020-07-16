const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`);


// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

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

  result.data.projects.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: projectTemplate,
      context: {
        slug: node.slug,
        images: `/${node.images}/`,
      },
    })
  })

  blogPosts.forEach(({ node }, i) => {
    if (node.categories.edges[0].node.name == "courses") {
      courses.push(node)
    }
    else {
      info.push(node)
    }
  });


  courses.forEach((node) => {
    createPage({
        path: "courses/" + node.slug,
        component: projectTemplate,
        context: {
            id: node.id,
            slug: node.slug,
            images: node.featuredImage,
            id2:  {"eq": "SitePage /courses/" + node.slug},
            featuredImage: node.featuredImage,
        }
      })
    });

    info.forEach((node) => {
      createPage({
          path: node.slug,
          component: projectTemplate,
          context: {
              id: node.id,
              slug: node.slug,
              images: node.featuredImage,
              id2:  {"eq": "SitePage /" + node.slug},
              featuredImage: node.featuredImage,
          }
        })
      });

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
       }
      }
    }
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
};
