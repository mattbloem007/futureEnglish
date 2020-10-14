import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import SkuCard from './SkuCard'

const conatinerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '1rem 0 1rem 0',
}


export default props => (
  <StaticQuery
    query={graphql`
      query ProductPrices {
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
                name
                livemode
              }
              type
            }
          }
        }
      }
    `}
    render={({ prices }) => (
      <div style={conatinerStyles}>
        {prices.edges.map(({ node: price }) => {
          let mode = "payment"
          if (price.type == "one_time") {
            mode = "payment"
          }
          else if (price.type == "recurring") {
            mode = "subscription"
          }
          const newSku = {
            sku: price.id,
            name: price.product.name,
            price: price.unit_amount,
            currency: price.currency,
            mode: mode,
          }
          return <SkuCard key={price.id} sku={newSku} />
        })}
      </div>
    )}
  />
)
