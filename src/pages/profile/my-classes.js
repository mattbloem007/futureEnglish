import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography, Paper, Grid} from '@material-ui/core'
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'
import { getProfile } from "../../utils/auth"
// Generate Order Data



let email = "";

function preventDefault(event) {
  event.preventDefault();
}

const styles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
		margin: 'auto',
		overflow: 'hidden',
	},
  contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
	},
})

class Orders extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      info: [],
      tableData: [],
      dataThere: false
    }
  }

  componentWillMount = () => {
    let user = getProfile()
    this.getUser(user)
  }

  populateTable = (info) => {
    let data = []
    info.map ((sub, i) => {
      let a = new Date(sub.created * 1000);
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let hour = a.getHours();
      let min = a.getMinutes();
      let sec = a.getSeconds();
      let time = date + ' ' + month + ' ' + year;
      data.push({id: i, date: time, name: sub.name, status: sub.active})
    })

    this.setState({tableData: data, dataThere: true})
  }

   getUser = async (user) => {

    const body = JSON.stringify({
      customer: user,
    })
    await fetch("/.netlify/functions/getSubscriptions", {
      method: "POST",
      body,
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
      let newData = []
      result.subscriptions.data.map((sub, i) => {
        console.log(sub, result.productName.data[i])
        newData.push({...sub, ...result.productName.data[i]})
      })
       this.populateTable(newData)
    })
    .catch(error => console.error(error))


  }

  render () {
    const {classes} = this.props
    const rows = [
      {id: 0, date: '16 Mar, 2019', name: 'Elvis Presley', shipTo: 'Tupelo, MS', paymentMethod: 'VISA ⠀•••• 3719', amount: 312.44},
      {id: 1, date: '16 Mar, 2019', name: 'Paul McCartney', shipTo: 'London, UK', paymentMethod: 'VISA ⠀•••• 2574', amount: 866.99}
    ];
    return (
      <Layout color="#90BDDF">
        <SEO title="Profile | FEA" desc="This is Future English Academy" />
        <div className={classes.container}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={16}
          className={classes.contentWrapper}
          wrap
          alignItems="center"
          justify="center"
        >
        <Typography variant="body1">Recent Orders</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.dataThere ? this.state.tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            )) : <TableRow>
                  <TableCell> No Classes purchased yet </TableCell>
                </TableRow>
          }
          </TableBody>
        </Table>
  { /**     <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div>*/}
        </Grid>
      </Paper>
    </div>
      </Layout>
    );
  }

}

export default withStyles(styles)(Orders)
