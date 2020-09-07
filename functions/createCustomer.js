const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = async (event, context, callback) => {
  // if (!context.clientContext.user) {
  //   return { statusCode: 401, body: "" }
  // }

  const requestBody = JSON.parse(event.body)
  console.log(requestBody)


  const customer = await stripe.customers.create({
    ...requestBody.customer,
  })

  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ customer }),
  }
  callback(null, response)
}
