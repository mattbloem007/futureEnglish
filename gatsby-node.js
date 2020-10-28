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

  exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

  exports.onCreatePage = async ({ page, actions: { createPage, deletePage, createRedirect } }) => {
    const isEnvDevelopment = process.env.NODE_ENV === 'development';
    const originalPath = page.path;
    const login = null

    // if (page.path.match(/^\/profile/)) {
    //     page.matchPath = "/profile/*"
    //
    //     // Update the page.
    //     createPage(page)
    // }

    config.siteMetadata.supportedLanguages.map(async lang => {
      console.log ("LANG ", lang)
      if (page.path == '/profile/' && lang == 'us') {
        console.log("Created profile");
        const localizedPath = `/${lang}${page.path}`;
        createPage({
              ...page,
              path: localizedPath,
              context: {
                ...page.context,
                originalPath,
                lang,
                login,
              },
            });
      }
      if (page.path == '/profile/cart/' && lang == 'us') {
        console.log("Created cart")
        const localizedPath = `/${lang}${page.path}`;
        createPage({
              ...page,
              path: localizedPath,
              context: {
                ...page.context,
                originalPath,
                lang,
                login,
              },
            });
      }
      if (page.path == '/profile/my-classes/' && lang == 'us') {
        console.log("Created classes")
        const localizedPath = `/${lang}${page.path}`;
        createPage({
              ...page,
              path: localizedPath,
              context: {
                ...page.context,
                originalPath,
                lang,
                login,
              },
            });
      }
      if (lang != "us") {
        const localizedPath = `/${lang}${page.path}`;
         createPage({
               ...page,
               path: localizedPath,
               context: {
                 ...page.context,
                 originalPath,
                 lang,
                 login,
               },
             });
      }

      })
    // Delete the original page (since we are gonna create localized versions of it) and add a
    // redirect header
    // await deletePage(page);
    //
    // await Promise.all(
    //   config.siteMetadata.supportedLanguages.map(async lang => {
    //     const localizedPath = `/${lang}${page.path}`;
    //
    //     // create a redirect based on the accept-language header
    //     createRedirect({
    //       fromPath: originalPath,
    //       toPath: localizedPath,
    //       Language: lang,
    //       isPermanent: false,
    //       redirectInBrowser: isEnvDevelopment,
    //       statusCode: 301,
    //     });
    //
    //     await createPage({
    //       ...page,
    //       path: localizedPath,
    //       context: {
    //         ...page.context,
    //         originalPath,
    //         lang,
    //         login,
    //       },
    //     });
    //   })
    // );
    //
    // // Create a fallback redirect if the language is not supported or the
    // // Accept-Language header is missing for some reason
    // createRedirect({
    //   fromPath: originalPath,
    //   toPath: `/${config.siteMetadata.defaultLanguage}${page.path}`,
    //   isPermanent: false,
    //   redirectInBrowser: isEnvDevelopment,
    //   statusCode: 301,
    // });
  };

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const projectTemplate = require.resolve('./src/templates/project.tsx')

  const result = await wrapper(
    graphql(`
      {


        wpgraphql{
posts(first: 1000){
  edges{
    node{
      id
      slug
      excerpt
      content
      title
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
      content
      title
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
  let register = [];
  let blog = [];

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
    //if (node.categories.edges.length == 1) {
      if (node.categories.edges[0].node.name == "courses") {
        courses.push(node)
      }
      else if (node.categories.edges[0].node.name == "register") {
        register.push(node)
      }
      else if (node.categories.edges[0].node.name == "blog") {
        blog.push(node)
      }
      else {
        info.push(node)
      }
  //  }

  });
  //console.log(courses, " ", info)

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
                content: node.content,
                excerpt: node.excerpt,
                title: node.title,
                id2:  {"eq": `SitePage /${langu}/courses/${node.slug}`},
                featuredImage: node.featuredImage,
                originalPath: `/courses/${node.slug}`,
                lang: langu
            }
          })
      }
      else if (lang == "us"){
        langu = lang
        createPage({
            path: `/courses/${node.slug}`,
            component: projectTemplate,
            context: {
                id: node.id,
                slug: node.slug,
                images: node.featuredImage,
                content: node.content,
                excerpt: node.excerpt,
                title: node.title,
                id2:  {"eq": `SitePage /courses/${node.slug}`},
                featuredImage: node.featuredImage,
                originalPath: `/courses/${node.slug}`,
              //  lang: langu
            }
          })
      }

      });

      blog.forEach((node) => {
      //  console.log("Blog: ", node.slug)
        if (node.tags.edges.length > 0) {
          if(node.tags.edges[0].node.name != lang) {
            langu = node.tags.edges[0].node.name
          }
          createPage({
              path: `/${langu}/blog/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  content: node.content,
                  excerpt: node.excerpt,
                  title: node.title,
                  id2:  {"eq": `SitePage /${langu}/blog/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/blog/${node.slug}`,
                  lang: langu
              }
            })
        }
        else if (lang == "us"){
          langu = lang
          createPage({
              path: `/blog/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  content: node.content,
                  excerpt: node.excerpt,
                  title: node.title,
                  id2:  {"eq": `SitePage /blog/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/blog/${node.slug}`,
                  //lang: langu
              }
            })
        }

        });

      register.forEach((node) => {
      //  console.log("Register: ", node.slug)
        if (node.tags.edges.length > 0) {
          if(node.tags.edges[0].node.name != lang) {
            langu = node.tags.edges[0].node.name
          }
          createPage({
              path: `/${langu}/register/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  id2:  {"eq": `SitePage /${langu}/register/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/register/${node.slug}`,
                  lang: langu
              }
            })
        }
        else if (lang == "us"){
          langu = lang
          createPage({
              path: `/register/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  id2:  {"eq": `SitePage /register/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/register/${node.slug}`,
                //  lang: langu
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
                  content: node.content,
                  excerpt: node.excerpt,
                  title: node.title,
                  id2:  {"eq": `SitePage /${langu}/${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/${node.slug}`,
                  lang: langu
              }
            })
        }
        else if (lang == "us"){
          langu = lang
          console.log(langu, " ", node.slug, " ", node.id)
          createPage({
              path: `/${node.slug}`,
              component: projectTemplate,
              context: {
                  id: node.id,
                  slug: node.slug,
                  images: node.featuredImage,
                  content: node.content,
                  excerpt: node.excerpt,
                  title: node.title,
                  id2:  {"eq": `SitePage /${node.slug}`},
                  featuredImage: node.featuredImage,
                  originalPath: `/${node.slug}`,
                //  lang: langu
              }
            })
        }

        });

        allPages.forEach(({ node }) => {
          console.log(node)
          let langu = lang

            createPage({
                path: `/${langu}/${node.slug}`,
                component: projectTemplate,
                context: {
                    id: node.id,
                    slug: node.slug,
                    content: node.content,
                    excerpt: "",
                    title: node.title,
                    lang: langu
                }
            });

        });
  })





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
