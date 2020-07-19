import React, { Component } from 'react';
import { without } from 'lodash';
import '../css/App.css';
import './AddAppointments';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';


class App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0
    }
    //this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  deleteAppointment = (apt)=> {
    let tempApts  = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState ({
      myAppointments : tempApts
    });
  }

  toggleForm = ()=> {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  componentDidMount() {
    fetch('./data.json').then(response => response.json()).then(result => {
      const apts = result.map(item =>{
        item.aptsid = this.state.lastIndex;
        this.setState({lastIndex: this.state.lastIndex + 1})
        return item;
      })
      this.setState({
        myAppointments : apts
      });
    });
  }

  render() {
  return (
    <main id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            <AddAppointments formDisplay = {this.state.formDisplay} toggleForm = {this.toggleForm}></AddAppointments>
            <SearchAppointments></SearchAppointments>
            <ListAppointments appointments = {this.state.myAppointments}
            deleteAppointment = {this.deleteAppointment}></ListAppointments>
          </div>
        </div>
      </div>
    </div>
  </main>
  );
  }
}

export default App;
