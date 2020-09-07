import { login, isAuthenticated, getProfile } from "../../utils/auth"
import React from 'react'
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'
import Img from 'gatsby-image'
import { transparentize, readableColor } from 'polished'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import { Box, AnimatedBox } from '../../elements'
import {timeOptions, classOptions, genderOptions, engLevelOptions} from '../../../common.js'
import Select from 'react-select';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import TabBar from 'components/TabBar'

const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
`

const Content = styled(Box)<{ bg: string }>`
  background-color: ${(props) => transparentize(0.9, props.bg)};

  .gatsby-image-wrapper:not(:last-child) {
    margin-bottom: ${(props) => props.theme.space[10]};

    @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
      margin-bottom: ${(props) => props.theme.space[8]};
    }
  }
`

const Category = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${(props) => props.theme.fontSizes[1]};
  text-transform: uppercase;
`

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`

const PButton = styled(Button)<{ color: string }>`
  background: ${(props) => (props.color === 'white' ? 'black' : props.color)};
  color: ${(props) => readableColor(props.color === 'white' ? 'black' : props.color)};
`

let user = null;
let email = "";

const styles = {
  paper: {
		margin: 'auto',
		overflow: 'hidden',
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	block: {
		display: 'block',
	},
	contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
	},
}

class Account extends React.Component {

  constructor(props) {
      super(props);


      this.state = {
          submitDisabled: false,
          studentName: '',
          age: '',
          gender: '',
          engLevel: '',
          country: '',
          city: '',
          time: '',
          email: '',
          number: '',
          classOption: '',
          pemail: '',
          semail: ''
      };

      this.textAreaInput = this.textAreaInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
      event.preventDefault();
      if (!this.state.submitDisabled) {
          this.setState({
              submitDisabled: true
          });
    }
  }

  onChange = (e) => {
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState(state);
  }

  textAreaInput(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
  }

 extractTypes = data => {
  const products = {}
  const skus = {}
  data.forEach(sku => {
    const { id } = sku.product
    if (!products[id]) {
      products[id] = { ...sku.product, skus: [] }
    }
    products[id].skus.push(sku)
    skus[sku.id] = sku
  })
  return { products, skus }
}

fetchProducts = async () => {
 const products = await fetch("/.netlify/functions/skuList")
   .then(response => response.json())
   .then(res => console.log(res))
   .catch(error => console.error(error))

  }

  componentWillMount = async () => {
    user = getProfile()
    email = user.email
    user = user['https://app.io/user_metadata']
    console.log(user)
  //  await this.fetchProducts()
  }

  componentDidMount = () => {
    user = getProfile()
    email = user.email
    user = user['https://app.io/user_metadata']

  }


  render() {
    return (
      <Layout color="#90BDDF">
        <SEO title="Profile | FEA" desc="This is Future English Academy" />
        <div className={styles.container}>
			<Paper className={styles.paper}>
				<Grid
					container
					spacing={16}
					className={styles.contentWrapper}
					wrap
					alignItems="center"
					justify="center"
				>
        <Typography variant="h6" gutterBottom>
        Student Information
      </Typography>
      <Grid lg={6} xs={12} item align="center">
						<div></div>
					</Grid>
        <Grid lg={6} xs={12} item align="center">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Student Name"
            value={user.student_name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            value={user.age}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            value={user.gender}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="eng_level"
            name="eng_level"
            label="English Level"
            value={user.eng_level}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="country" name="country" label="Country" value={user.country} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={user.city}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="time"
            name="timezone"
            label="Time Zone"
            value={user.time_zone}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="number"
            name="number"
            label="WeChat/WhatsApp/Messenger Number"
            value={user.number}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pemail"
            name="parent_email"
            label="Parent Email"
            value={user.parent_email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="second_email_contact"
            name="second_email_contact"
            label="Second Email Contact"
            value={user.second_email_contact}
            fullWidth
          />
        </Grid>
        </Grid>
        </Grid>
			</Paper>
		</div>
      </Layout>
    )
  }
}

export default Account
