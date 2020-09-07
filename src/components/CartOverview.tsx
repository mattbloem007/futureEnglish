import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { getProfile } from "../utils/auth"
import { useShoppingCart } from 'use-shopping-cart'
import {
  useStripe,
  Elements
} from '@stripe/react-stripe-js';

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

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
let email = "";



const Cart = () => {
  const [loading, setLoading] = useState(false)
  let user = getProfile()
  const stripe = useStripe()
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
    //console.log(cartDetails)
    let lineItems = []
    Object.keys(cartDetails).map(key => {
      console.log(cartDetails[key])
      lineItems = [...lineItems, {price: cartDetails[key].sku, quantity: cartDetails[key].quantity}]
    })


    let user = {email: e, name: customer.student_name}
    const body = JSON.stringify({
      customer: user,
      lineItems: lineItems,
    })
    await fetch("/.netlify/functions/createCustomer", {
      method: "POST",
      body,
    })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch(error => console.error(error))


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
