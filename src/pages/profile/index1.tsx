import { login, isAuthenticated, getProfile } from "../../utils/auth"
import React from 'react'
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'
import Img from 'gatsby-image'
import { transparentize, readableColor } from 'polished'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import { Box, AnimatedBox, Button } from '../../elements'
import {timeOptions, classOptions, genderOptions, engLevelOptions} from '../../../common.js'
import Select from 'react-select';

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
        <PBox py={10} px={[6, 6, 8, 10]}>
  {/**        <Category style={categoryAnimation}>{project.category}</Category>*/}
          <animated.h1 >Student Information</animated.h1>
          <Description>
          <form method="post">
            <div className="fields">
              <PBox py={2} px={[6, 6, 8, 10]}>
                <label htmlFor="label">Name</label>
                <input type="text" name="studentName" value={user.student_name} onChange={this.onChange} placeholder="Enter your name" className="form-control"/>
              </PBox>
              <PBox py={2} px={[6, 6, 8, 10]}>
                <label htmlFor="age">Age</label>
                <input type="text" name="age" value={user.age} onChange={this.onChange} placeholder="Enter your age" className="form-control"/>
              </PBox>
              <PBox py={2} px={[6, 6, 8, 10]}>
                <label htmlFor="age">Gender</label>
                <input type="text" name="gender" value={user.gender} onChange={this.onChange} placeholder="Enter your gender" className="form-control"/>
              </PBox>
              {/**<PBox py={2} px={[6, 6, 8, 10]}>
                <label htmlFor="message">Gender</label>
                <Select
                         className="basic-single"
                         classNamePrefix="select"
                         defaultValue={user.gender}
                         name="gender"
                         onChange={(e) => this.setState({gender: e.value})}
                         options={genderOptions}
                   />
                </PBox>*/}
                {/**<div className="field">
                  <label htmlFor="message">English Level</label>
                  <Select
                           className="basic-single"
                           classNamePrefix="select"
                           defaultValue={user.eng_level}
                           name="eng"
                           onChange={(e) => this.setState({engLevel: e.value})}
                           options={engLevelOptions}
                     />
                  </div>**/}
                  <PBox py={2} px={[6, 6, 8, 10]}>
                    <label htmlFor="age">English Level</label>
                    <input type="text" name="eng_level" value={user.eng_level} onChange={this.onChange} placeholder="Enter your English level" className="form-control"/>
                  </PBox>
                  <div className="field">
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" value={user.country} onChange={this.onChange} placeholder="Enter your country" className="form-control"/>
                  </div>
                  <div className="field">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" value={user.city} onChange={this.onChange} placeholder="Enter your city" className="form-control"/>
                  </div>
                  {/**<div className="field">
                    <label htmlFor="time">Time</label>
                    <Select
                             className="basic-single"
                             classNamePrefix="select"
                             defaultValue={user.time_zone}
                             name="gender"
                             onChange={(e) => this.setState({time: e.value})}
                             options={timeOptions}
                       />
              </div> */}
              <PBox py={2} px={[6, 6, 8, 10]}>
                <label htmlFor="age">Time Zone</label>
                <input type="text" name="time_zone" value={user.time_zone} onChange={this.onChange} placeholder="Enter your timezone" className="form-control"/>
              </PBox>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={this.onChange} placeholder="Enter your email" className="form-control"/>
              </div>
              <div className="field">
                <label htmlFor="number">WeChat/WhatsApp/Messenger Number</label>
                <input type="text" name="number" value={user.number} onChange={this.onChange} placeholder="Enter your number" className="form-control"/>
              </div>
              {/**<div className="field">
                <label htmlFor="classOption">Class Option</label>
                <Select
                         className="basic-single"
                         classNamePrefix="select"
                         defaultValue={this.state.classOption}
                         name="gender"
                         onChange={(e) => this.setState({classOption: e.value})}
                         options={classOptions}
                   />
              </div>**/}
              <div className="field">
                <label htmlFor="pemail">Parent Email</label>
                <input type="text" name="pemail" value={user.parent_email} onChange={this.onChange} placeholder="Enter your parent email" className="form-control"/>
              </div>
              <div className="field">
                <label htmlFor="semail">Second Contact Email</label>
                <input type="text" name="semail" value={user.second_email_contact} onChange={this.onChange} placeholder="Enter your second contact email" className="form-control"/>
              </div>
            </div>
              <button
                  className="button icon fa-envelope-o"
                  onClick={this.handleSubmit}
                  id="submit"
                  ref={c => (this.btn = c)}
              > Save </button>

          </form>
          </Description>
        </PBox>
        <Content bg="#90BDDF" py={10}>

        </Content>
        {/**<PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
          <h2>Want to start your own project?</h2>
          <PButton color="#90BDDF" py={4} px={8}>
            Contact Us
          </PButton>
        </PBox>*/}
      </Layout>
    )
  }
}

export default Account
