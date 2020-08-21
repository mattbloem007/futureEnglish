const configure = {
    bucket_name: process.env.GATSBY_APP_BUCKET_SLUG || "Future English",
    bucket_slug: process.env.GATSBY_APP_BUCKET_SLUG || "future-english",
    bucket_id: process.env.GATSBY_APP_BUCKET_ID || "5f2bef275723bf000832e49e",
    read_key: process.env.GATSBY_APP_BUCKET_READ_KEY || "irrT4UAvvcVTTzXUT0S3jSn0QoA0eFQlAnLdZA3SqWDNVHdnHQ",
    write_key: process.env.GATSBY_APP_BUCKET_WRITE_KEY || "tzOancix9Vtr5T6NM6Nc6zEj9BDIUMzdTX7foYQVT7S5QOgfJD",
    url: "https://api.cosmicjs.com/v1/"
  }
  export default configure;
