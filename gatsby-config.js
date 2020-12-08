require('dotenv').config({
  path: `.env`,
//  path: `.env.${process.env.NODE_ENV}`,
})

const config = require('./config')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    pathPrefix,
    title: config.siteTitle,
    titleAlt: config.siteTitleAlt,
    description: config.siteDescription,
    logo: config.siteLogo,
    headline: config.siteHeadline,
    siteLanguage: config.siteLanguage,
    supportedLanguages: ["us", "cn"], //"eu", "es", "mx", "gh", "vn", "kr", "jp"],
    defaultLanguage: "us",
    ogLanguage: config.ogLanguage,
    author: config.author,
    twitter: config.userTwitter,
    facebook: config.ogSiteName,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'projects',
        path: `${__dirname}/content/projects`,
      },
    },
    {
     resolve: `gatsby-source-stripe`,
     options: {
       objects: ["Product", "Price", "Sku", 'Subscription', 'Customer'],
       secretKey: process.env.STRIPE_SECRET_KEY,
       downloadFiles: false,
     },
   },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'config',
        path: `${__dirname}/config`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-instagram',
      options: {
        access_token: process.env.ACCESS_TOKEN,
        instagram_id: process.env.BUSINESS_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-react-helmet`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                "gatsby-remark-copy-linked-files",
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 1280
                    }
                }
            ]
        }
    },
    {
       resolve: `gatsby-source-graphql`,

       options: {
         // This type will contain remote schema Query type
         typeName: `WPGraphQL`,
         // This is field under which it's accessible
         fieldName: `wpgraphql`,
         // Url to query from
         url: `http://wordpress.futureleadership.online/wordpress/graphql`,
      //  url: `http://alchemy-of-remembrance.local/graphql`
       },
     },
    //  {
    //   resolve: "gatsby-wpgraphql-inline-images",
    //   options: {
    //     wordPressUrl: 'http://41.185.8.137/~xic02/future%20english/',
    //     uploadsUrl: 'http://41.185.8.137/~xic02/future%20english/wp-content/uploads/',
    //     processPostTypes: ["Post"],
    //     graphqlTypeName: `WPGraphQL`,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/favicon.png',
      },
    },
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-netlify',
  ],
}
