import config from './../config/config';
import axios from 'axios';

const cosmicService = {

    registerLearner(studentName, age, gender, engLevel, country, city, time, email, number, classOption, pemail, semail)
    {
    //  return axios.get(`https://api.cosmicjs.com/v1/${config.bucket_slug}/object/john`, {read_key: config.read_key})
    axios
      .get(
        `https://api.cosmicjs.com/v1/${
          config.bucket_slug
        }/object-type/students?sort=created_at`
      )
      .then(response => {
        console.log(response)
      });
        // return axios.post(`https://api.cosmicjs.com/v1/${config.bucket_slug}/add-object`, {
        //     type_slug: "students", content: "here", write_key: config.write_key,
        //     metafields: [
        //         {
        //           key: "student_name",
        //           type: "text",
        //           value: studentName
        //         },
        //         {
        //             key: "age",
        //             type: "text",
        //             value: age
        //           },
        //           {
        //             key: "gender",
        //             type: "text",
        //             value: gender
        //           },
        //           {
        //             key: "english_level",
        //             type: "text",
        //             value: engLevel
        //           },
        //           {
        //             key: "country",
        //             type: "text",
        //             value: country
        //           },
        //           {
        //             key: "city",
        //             type: "text",
        //             value: city
        //           },
        //           {
        //             key: "time_zone",
        //             type: "text",
        //             value: time
        //           },
        //           {
        //             key: "email",
        //             type: "text",
        //             value: email
        //           },
        //           {
        //             key: "number",
        //             type: "text",
        //             value: number
        //           },
        //           {
        //             key: "class_option",
        //             type: "text",
        //             value: classOption
        //           },
        //           {
        //             key: "parent_email",
        //             type: "text",
        //             value: pemail
        //           },
        //           {
        //             key: "second_email_contact",
        //             type: "text",
        //             value: semail
        //           }
        //     ]
        // })
    }
}

export default cosmicService;
