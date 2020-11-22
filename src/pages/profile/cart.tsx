import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'

import SkuCard from '../../components/Products/SkuCard'
import CartOverview from '../../components/CartOverview'

import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import {usePageContext} from '../../../PageContext'
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const CartExample = (props) => {
  const {originalPath, lang} = usePageContext()
  console.log(props)
  return (

    <Layout>
      <SEO title="Cart Example" />
      <h1>Checkout with cart example</h1>

      <CartProvider
        mode="client-only"
        stripe={stripePromise}
        successUrl={`https://futureleadership.online/${lang}${originalPath}`}
        cancelUrl={`https://futureleadership.online/${lang}${originalPath}`}
        currency="USD"
        allowedCountries={['US', 'GB', 'CA']}
        billingAddressCollection={true}
      >
      <Elements stripe={stripePromise}>
        <CartOverview />
      </Elements>
        <SkuCard prices={props.data.prices}/>
      </CartProvider>
    </Layout>
  )

}


export default CartExample

export const query = graphql`
  query ProductPrices2 {
    prices: allStripePrice(
      filter: { active: { eq: true }, currency: { eq: "usd" } }
      sort: { fields: [unit_amount] }
    ) {
      edges {
        node {
          id
          active
          currency
          unit_amount
          unit_amount_decimal
          product {
            id
            active
            name
            description
            livemode
          }
          type
        }
      }
    }
  }
`
