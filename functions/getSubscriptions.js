const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = async (event, context, callback) => {
  // if (!context.clientContext.user) {
  //   return { statusCode: 401, body: "" }
  // }

  const requestBody = JSON.parse(event.body)
  console.log(requestBody)


  const customer = await stripe.customers.list({
    email: requestBody.customer.email
  })
  console.log(customer.data[0])
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.data[0].id
  })

  let ids = []

  subscriptions.data.map((data) => {
    data.items.data.map((item) => {
      ids.push(item.price.product)
    })
  })

  console.log(ids)

  const productName = await stripe.products.list({
    ids
  })


  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ subscriptions, productName }),
  }
  callback(null, response)
}
