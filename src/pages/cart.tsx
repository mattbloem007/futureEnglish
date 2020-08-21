import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/SEO'

import Skus from '../components/Products/Skus'
import CartOverview from '../components/CartOverview'

import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'

//successUrl={`${window.location.origin}/page-2/`}
//cancelUrl={`${window.location.origin}/`}

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CartExample = () => (
  <Layout>
    <SEO title="Cart Example" />
    <h1>Checkout with cart example</h1>

    <CartProvider
      mode="client-only"
      stripe={stripePromise}

      currency="USD"
      allowedCountries={['US', 'GB', 'CA']}
      billingAddressCollection={true}
    >
      <CartOverview />
      <Skus />
    </CartProvider>
  </Layout>
)

export default CartExample
