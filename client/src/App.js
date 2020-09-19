import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

// const customers = [
//   {
//     'id': 1,
//     'image': 'https://placeimg.com/64/64/1',
//     'name': '홍길동',
//     'birthday': '961222',
//     'gender': '남자',
//     'job': '대학생'
//   },
//   {
//     'id': 2,
//     'image': 'https://placeimg.com/64/64/2',
//     'name': '장길산',
//     'birthday': '971222',
//     'gender': '남자',
//     'job': '대학생'
//   },
//   {
//     'id': 3,
//     'image': 'https://placeimg.com/64/64/3',
//     'name': '신사임당',
//     'birthday': '981222',
//     'gender': '여자',
//     'job': '대학생'
//   }
// ]


class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

  // componentDidMount() {
  //   console.log(this.props)
  //   axios.get('https://infinite-fjord-35976.herokuapp.com/api/customers')
  //   // axios.get('61.83.83.104:5000/api/customers')
  //     .then(res => {
  //       this.setState({customers: res});
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    // this.callApi()
    //   .then(res => this.setState({customers: res}))
    //   .catch(err => console.log(err));
  }


  callApi = async() => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }


  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(customer => {
              return (
                <Customer
                  key={customer.id}
                  id={customer.id}
                  image={customer.image}
                  name={customer.name}
                  birthday={customer.birthday}
                  gender={customer.gender}
                  job={customer.job}
                />
              );
            }) :
            <TableRow>
              <TableCell colspan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
