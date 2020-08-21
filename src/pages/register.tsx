import React from 'react'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import cosmicService from './../services/cosmicService';
import Select from 'react-select';
import axios from 'axios'
import configure from './../config/config';
import { login, isAuthenticated, getProfile } from "../utils/auth"
const Cosmic = require('cosmicjs')


const api = Cosmic()

const bucket = api.bucket({
  slug: configure.bucket_slug,
  write_key: configure.write_key,
  read_key: configure.read_key
})



const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other'},
];

const classOptions = [
  { value: 'Private', label: 'Private' },
  { value: 'Group', label: 'Group' },
];

const engLevelOptions = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Low-Intermediate', label: 'Low-Intermediate' },
  { value: 'Intermediate', label: 'Intermediate'},
  { value: 'High', label: 'High'},
  { value: 'Fluent', label: 'Fluent'},
];

const timeOptions = [
  {
    value: "GMT-12:00",
    label: "Etc/GMT-12"
  },
  {
    value: "GMT-11:00",
    label: "Etc/GMT-11"
  },
  {
    value: "GMT-11:00",
    label: "Pacific/Midway"
  },
  {
    value: "GMT-10:00",
    label: "America/Adak"
  },
  {
    value: "GMT-09:00",
    label: "America/Anchorage"
  },
  {
    value: "GMT-09:00",
    label: "Pacific/Gambier"
  },
  {
    value: "GMT-08:00",
    label: "America/Dawson_Creek"
  },
  {
    value: "GMT-08:00",
    label: "America/Ensenada"
  },
  {
    value: "GMT-08:00",
    label: "America/Los_Angeles"
  },
  {
    value: "GMT-07:00",
    label: "America/Chihuahua"
  },
  {
    value: "GMT-07:00",
    label: "America/Denver"
  },
  {
    value: "GMT-06:00",
    label: "America/Belize"
  },
  {
    value: "GMT-06:00",
    label: "America/Cancun"
  },
  {
    value: "GMT-06:00",
    label: "America/Chicago"
  },
  {
    value: "GMT-06:00",
    label: "Chile/EasterIsland"
  },
  {
    value: "GMT-05:00",
    label: "America/Bogota"
  },
  {
    value: "GMT-05:00",
    label: "America/Havana"
  },
  {
    value: "GMT-05:00",
    label: "America/New_York"
  },
  {
    value: "GMT-04:30",
    label: "America/Caracas"
  },
  {
    value: "GMT-04:00",
    label: "America/Campo_Grande"
  },
  {
    value: "GMT-04:00",
    label: "America/Glace_Bay"
  },
  {
    value: "GMT-04:00",
    label: "America/Goose_Bay"
  },
  {
    value: "GMT-04:00",
    label: "America/Santiago"
  },
  {
    value: "GMT-04:00",
    label: "America/La_Paz"
  },
  {
    value: "GMT-03:00",
    label: "America/Argentina/Buenos_Aires"
  },
  {
    value: "GMT-03:00",
    label: "America/Montevideo"
  },
  {
    value: "GMT-03:00",
    label: "America/Araguaina"
  },
  {
    value: "GMT-03:00",
    label: "America/Godthab"
  },
  {
    value: "GMT-03:00",
    label: "America/Miquelon"
  },
  {
    value: "GMT-03:00",
    label: "America/Sao_Paulo"
  },
  {
    value: "GMT-03:30",
    label: "America/St_Johns"
  },
  {
    value: "GMT-02:00",
    label: "America/Noronha"
  },
  {
    value: "GMT-01:00",
    label: "Atlantic/Cape_Verde"
  },
  {
    value: "GMT",
    label: "Europe/Belfast"
  },
  {
    value: "GMT",
    label: "Africa/Abidjan"
  },
  {
    value: "GMT",
    label: "Europe/Dublin"
  },
  {
    value: "GMT",
    label: "Europe/Lisbon"
  },
  {
    value: "GMT",
    label: "Europe/London"
  },
  {
    value: "UTC",
    label: "UTC"
  },
  {
    value: "GMT+01:00",
    label: "Africa/Algiers"
  },
  {
    value: "GMT+01:00",
    label: "Africa/Windhoek"
  },
  {
    value: "GMT+01:00",
    label: "Atlantic/Azores"
  },
  {
    value: "GMT+01:00",
    label: "Atlantic/Stanley"
  },
  {
    value: "GMT+01:00",
    label: "Europe/Amsterdam"
  },
  {
    value: "GMT+01:00",
    label: "Europe/Belgrade"
  },
  {
    value: "GMT+01:00",
    label: "Europe/Brussels"
  },
  {
    value: "GMT+02:00",
    label: "Africa/Cairo"
  },
  {
    value: "GMT+02:00",
    label: "Africa/Blantyre"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Beirut"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Damascus"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Gaza"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Jerusalem"
  },
  {
    value: "GMT+03:00",
    label: "Africa/Addis_Ababa"
  },
  {
    value: "GMT+03:00",
    label: "Asia/Riyadh89"
  },
  {
    value: "GMT+03:00",
    label: "Europe/Minsk"
  },
  {
    value: "GMT+03:30",
    label: "Asia/Tehran"
  },
  {
    value: "GMT+04:00",
    label: "Asia/Dubai"
  },
  {
    value: "GMT+04:00",
    label: "Asia/Yerevan"
  },
  {
    value: "GMT+04:00",
    label: "Europe/Moscow"
  },
  {
    value: "GMT+04:30",
    label: "Asia/Kabul"
  },
  {
    value: "GMT+05:00",
    label: "Asia/Tashkent"
  },
  {
    value: "GMT+05:30",
    label: "Asia/Kolkata"
  },
  {
    value: "GMT+05:45",
    label: "Asia/Katmandu"
  },
  {
    value: "GMT+06:00",
    label: "Asia/Dhaka"
  },
  {
    value: "GMT+06:00",
    label: "Asia/Yekaterinburg"
  },
  {
    value: "GMT+06:30",
    label: "Asia/Rangoon"
  },
  {
    value: "GMT+07:00",
    label: "Asia/Bangkok"
  },
  {
    value: "GMT+07:00",
    label: "Asia/Novosibirsk"
  },
  {
    value: "GMT+08:00",
    label: "Etc/GMT+8"
  },
  {
    value: "GMT+08:00",
    label: "Asia/Hong_Kong"
  },
  {
    value: "GMT+08:00",
    label: "Asia/Krasnoyarsk"
  },
  {
    value: "GMT+08:00",
    label: "Australia/Perth"
  },
  {
    value: "GMT+08:45",
    label: "Australia/Eucla"
  },
  {
    value: "GMT+09:00",
    label: "Asia/Irkutsk"
  },
  {
    value: "GMT+09:00",
    label: "Asia/Seoul"
  },
  {
    value: "GMT+09:00",
    label: "Asia/Tokyo"
  },
  {
    value: "GMT+09:30",
    label: "Australia/Adelaide"
  },
  {
    value: "GMT+09:30",
    label: "Australia/Darwin"
  },
  {
    value: "GMT+09:30",
    label: "Pacific/Marquesas"
  },
  {
    value: "GMT+10:00",
    label: "Etc/GMT+10"
  },
  {
    value: "GMT+10:00",
    label: "Australia/Brisbane"
  },
  {
    value: "GMT+10:00",
    label: "Australia/Hobart"
  },
  {
    value: "GMT+10:00",
    label: "Asia/Yakutsk"
  },
  {
    value: "GMT+10:30",
    label: "Australia/Lord_Howe"
  },
  {
    value: "GMT+11:00",
    label: "Asia/Vladivostok"
  },
  {
    value: "GMT+11:30",
    label: "Pacific/Norfolk"
  },
  {
    value: "GMT+12:00",
    label: "Etc/GMT+12"
  },
  {
    value: "GMT+12:00",
    label: "Asia/Anadyr"
  },
  {
    value: "GMT+12:00",
    label: "Asia/Magadan"
  },
  {
    value: "GMT+12:00",
    label: "Pacific/Auckland"
  },
  {
    value: "GMT+12:45",
    label: "Pacific/Chatham"
  },
  {
    value: "GMT+13:00",
    label: "Pacific/Tongatapu"
  },
  {
    value: "GMT+14:00",
    label: "Pacific/Kiritimati"
  }
]

class Register extends React.Component {

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

  componentWillMount() {
    if (!isAuthenticated()) {
      console.log("IN HERE")
      login()
      return <p>Redirecting to login...</p>
    }
  }

  textAreaInput(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
  }

  handleSubmit = async (event) => {
      event.preventDefault();
      if (!this.state.submitDisabled) {
          this.setState({
              submitDisabled: true
          });

        let params = {
          title: this.state.studentName,
          type_slug: "students",
            metafields: [
                {
                  title: "Student Name",
                  key: "student_name",
                  type: "text",
                  value: this.state.studentName
                },
                {
                    title: "Age",
                    key: "age",
                    type: "text",
                    value: this.state.age
                  },
                  {
                    title: "Gender",
                    key: "gender",
                    type: "text",
                    value: this.state.gender
                  },
                  {
                    title: "English level",
                    key: "english_level",
                    type: "text",
                    value: this.state.engLevel
                  },
                  {
                    title: "Country",
                    key: "country",
                    type: "text",
                    value: this.state.country
                  },
                  {
                    title: "City",
                    key: "city",
                    type: "text",
                    value: this.state.city
                  },
                  {
                    title: "Time zone",
                    key: "time_zone",
                    type: "text",
                    value: this.state.time
                  },
                  {
                    title: "Email",
                    key: "email",
                    type: "text",
                    value: this.state.email
                  },
                  {
                    title: "Number",
                    key: "number",
                    type: "text",
                    value: this.state.number
                  },
                  {
                    title: "Class Option",
                    key: "class_option",
                    type: "text",
                    value: this.state.classOption
                  },
                  {
                    title: "Parent email",
                    key: "parent_email",
                    type: "text",
                    value: this.state.pemail
                  },
                  {
                    title: "second email contact",
                    key: "second_email_contact",
                    type: "text",
                    value: this.state.semail
                  }
            ]
          }

          bucket.addObject(params).then(data => {
            console.log(data)
          }).catch(err => {
            console.log(err)
          })

      }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    render () {
      return (
        <Layout>
          <SEO title="About | FEA" desc="This is Future English Academy" />
            <h1>Register as a Learner</h1>
            <form method="post">
              <div className="fields">
                <div className="field">
                  <label htmlFor="label">Name</label>
                  <input type="text" name="studentName" value={this.state.studentName} onChange={this.onChange} placeholder="Enter your name" className="form-control"/>
                </div>
                <div className="field">
                  <label htmlFor="age">Age</label>
                  <input type="text" name="age" value={this.state.age} onChange={this.onChange} placeholder="Enter your age" className="form-control"/>
                </div>
                <div className="field">
                  <label htmlFor="message">Gender</label>
                  <Select
                           className="basic-single"
                           classNamePrefix="select"
                           defaultValue=""
                           name="gender"
                           onChange={(e) => this.setState({gender: e.value})}
                           options={genderOptions}
                     />
                  </div>
                  <div className="field">
                    <label htmlFor="message">English Level</label>
                    <Select
                             className="basic-single"
                             classNamePrefix="select"
                             defaultValue=""
                             name="eng"
                             onChange={(e) => this.setState({engLevel: e.value})}
                             options={engLevelOptions}
                       />
                    </div>
                    <div className="field">
                      <label htmlFor="country">Country</label>
                      <input type="text" name="country" value={this.state.country} onChange={this.onChange} placeholder="Enter your country" className="form-control"/>
                    </div>
                    <div className="field">
                      <label htmlFor="city">City</label>
                      <input type="text" name="city" value={this.state.city} onChange={this.onChange} placeholder="Enter your city" className="form-control"/>
                    </div>
                    <div className="field">
                      <label htmlFor="time">Time</label>
                      <Select
                               className="basic-single"
                               classNamePrefix="select"
                               defaultValue={this.state.time}
                               name="gender"
                               onChange={(e) => this.setState({time: e.value})}
                               options={timeOptions}
                         />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter your email" className="form-control"/>
                </div>
                <div className="field">
                  <label htmlFor="number">WeChat/WhatsApp/Messenger Number</label>
                  <input type="text" name="number" value={this.state.number} onChange={this.onChange} placeholder="Enter your number" className="form-control"/>
                </div>
                <div className="field">
                  <label htmlFor="classOption">Class Option</label>
                  <Select
                           className="basic-single"
                           classNamePrefix="select"
                           defaultValue={this.state.classOption}
                           name="gender"
                           onChange={(e) => this.setState({classOption: e.value})}
                           options={classOptions}
                     />
                </div>
                <div className="field">
                  <label htmlFor="pemail">Parent Email</label>
                  <input type="text" name="pemail" value={this.state.pemail} onChange={this.onChange} placeholder="Enter your parent email" className="form-control"/>
                </div>
                <div className="field">
                  <label htmlFor="semail">Second Contact Email</label>
                  <input type="text" name="semail" value={this.state.semail} onChange={this.onChange} placeholder="Enter your second contact email" className="form-control"/>
                </div>
              </div>
                <button
                    className="button icon fa-envelope-o"
                    onClick={this.handleSubmit}
                    id="submit"
                    ref={c => (this.btn = c)}
                > Send Message</button>

            </form>
        </Layout>
      )
    }



}

export default Register
