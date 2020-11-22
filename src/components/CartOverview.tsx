import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { getProfile } from "../utils/auth"
import { useShoppingCart } from 'use-shopping-cart'
import {
  useStripe,
  Elements
} from '@stripe/react-stripe-js';
import emailjs from 'emailjs-com';
import {usePageContext} from '../../PageContext'


const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

let email = "";



const Cart = () => {
  const [loading, setLoading] = useState(false)
  let user = getProfile()
  const stripe = useStripe()
  const { originalPath, lang } = usePageContext()
  /* Gets the totalPrice and a method for redirecting to stripe */
  const {
    formattedTotalPrice,
    redirectToCheckout,
    cartCount,
    clearCart,
    cartDetails
  } = useShoppingCart()

  if (user) {
    email = user.email
    user = user['https://app.io/user_metadata']
  }

  const createUser = async (customer, e) => {
    console.log(cartDetails)
    const stripePromise = await loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
    let lineItems = []
    let message = "There has been a new order for the following product(s) from " + customer.student_name + ":\n\n"
    let listItems = "";
    Object.keys(cartDetails).map(key => {
      console.log(cartDetails[key])
      listItems = listItems + cartDetails[key].name + " valued at: " + cartDetails[key].formattedValue + "\n"
      lineItems = [...lineItems, {price: cartDetails[key].sku, quantity: cartDetails[key].quantity}]
    })
    message = listItems;

    var template_params = {
       "reply_to": e,
       "from_name": customer.student_name,
       "to_name": "Dylan",
       "message_html": message
    }

    var service_id = "default_service";
    var template_id = "template_sr6blae";
    var user_id = "user_wLPGPl2w2ETFdTUDNZQP2";
    emailjs.send(service_id, template_id, template_params, user_id);

  //  redirectToCheckout();
  console.log(stripePromise)
  stripePromise.redirectToCheckout({mode: "subscription", successUrl: `https://futureleadership.online/${lang}${originalPath}`,
  cancelUrl: `https://futureleadership.online/${lang}${originalPath}`, lineItems: lineItems})

    // const body = JSON.stringify({
    //   checkout: user
    // })
    // console.log(body, " ", user)
    //
    // await fetch("http://localhost:8888/.netlify/functions/redirectToCheckout", {
    //   method: "POST",
    //   body,
    // })
    // .then((res) => res.json())
    // .then((result) => {
    //   console.log(result)
    //
    // })
    // .catch(error => console.error(error))


  }


  return (
    <div>
      {/* This is where we'll render our cart */}
      <p>Number of Items: {cartCount}</p>
      <p>Total: {formattedTotalPrice}</p>

      {/* Redirects the user to Stripe */}
      <button
        style={buttonStyles}
        disabled={loading}
        onClick={() => {
          setLoading(true)
          createUser(user, email)
        }}
      >
        {loading ? 'Loading...' : 'Checkout'}
      </button>
      <button style={buttonStyles} onClick={clearCart}>
        Clear cart
      </button>
    </div>
  )
}

export default Cart
