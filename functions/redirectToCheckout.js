const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = async (event, context, callback) => {
  // if (!context.clientContext.user) {
  //   return { statusCode: 401, body: "" }
  // }

  const requestBody = JSON.parse(event.body)
  console.log(stripe)


  const checkout = await stripe.redirectToCheckout({
    ...requestBody.checkout,
  })

  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ checkout }),
  }
  callback(null, response)
}
