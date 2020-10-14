import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  padding: '1rem',
  marginBottom: '1rem',
  boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
  backgroundColor: '#fff',
  borderRadius: '6px',
  maxWidth: '300px',
}
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

const SkuCard = ({prices}) => {
  const classes = useStyles();
  const { addItem } = useShoppingCart()
  console.log(prices)
  return (
    <React.Fragment>
      <CssBaseline />
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Pricing
                  </Typography>
                  {/**<Typography variant="h5" align="center" color="textSecondary" component="p">
                    Quickly build an effective pricing table for your potential customers with this layout.
                    It&apos;s built with default Material-UI components with little customization.
                  </Typography>*/}
                </Container>
                <Container maxWidth="md" component="main">
                  <Grid container spacing={5} alignItems="flex-end">
                    {prices.edges.map(({ node:tier}) => {
                      console.log("livemode: ", tier.product.livemode)
                      const newSku  = {
                        sku: tier.id,
                        name: tier.product.name,
                        price: tier.unit_amount,
                        currency: tier.currency,
                        description: tier.product.description,
                        active: tier.product.active,
                        livemode: tier.product.livemode
                      }

                      if (newSku.active == true && newSku.livemode == true) {
                        return (


                        <Grid item key={newSku.name} xs={12} sm={newSku.name === 'Enterprise' ? 12 : 6} md={4}>
                          <Card>
                            <CardHeader
                              title={newSku.name}
                              titleTypographyProps={{ align: 'center' }}
                              subheaderTypographyProps={{ align: 'center' }}
                              action={newSku.name === 'Pro' ? <StarIcon /> : null}
                              className={classes.cardHeader}
                            />
                            <CardContent>
                              <div className={classes.cardPricing}>
                                <Typography component="h3" variant="h4" color="textPrimary">
                                  {formatCurrencyString({
                                            value: parseInt(newSku.price),
                                            currency: newSku.currency,
                                          })}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                  /mo
                                </Typography>
                              </div>
                              <ul>

                                  <Typography component="li" variant="subtitle1" align="center">
                                    {newSku.description}
                                  </Typography>

                              </ul>
                            </CardContent>
                            <CardActions>
                              <Button fullWidth color="primary" onClick={() => addItem(newSku)}>
                                Add to Cart
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      )
                      }
                      else {
                        return <div></div>
                      }

                    })}
                  </Grid>
                </Container>
    </React.Fragment>
  )

}



// const SkuCard = ({ sku }) => {
//   const { addItem } = useShoppingCart()
//   console.log(sku)
//   return (
//     <div style={cardStyles}>
//       <h4>{sku.name}</h4>
//       <p>
//         Price:{' '}
//         {formatCurrencyString({
//           value: parseInt(sku.price),
//           currency: sku.currency,
//         })}
//       </p>
//       <button style={buttonStyles} onClick={() => addItem(sku)}>
//         ADD TO CART
//       </button>
//     </div>
//   )
// }

export default SkuCard
