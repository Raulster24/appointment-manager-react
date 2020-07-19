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
      orderBy: 'aptDate',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0
    }
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

  addAppointment = (apt)=> {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);

    this.setState({
      myAppointments : tempApts,
      lastIndex : this.state.lastIndex + 1
    })

  }

  changeOrder = (order, dir)=> {
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }

  searchApts = (queryParam)=> {
    this.setState({
      queryText : queryParam
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

 let order;
 let filteredApts = this.state.myAppointments;
 if (this.state.orderDir === 'asc') {
   order = 1;
 } else{
   order = -1;
 }

 filteredApts = filteredApts.sort((a,b) => {
   if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
     return -1 * order;
   }
   else{
     return 1 * order;
   }
 }).filter(eachItem=> {
   return (eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
   eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
   eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase())
   )
 })

  return (
    <main id="petratings">
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-white">
          <div className="container">
            <AddAppointments formDisplay = {this.state.formDisplay} toggleForm = {this.toggleForm} addAppointment= {this.addAppointment}></AddAppointments>
            <SearchAppointments orderBy = {this.state.orderBy} orderDir = {this.state.orderDir} changeOrder = {this.changeOrder} searchApts = {this.searchApts}></SearchAppointments>
            <ListAppointments appointments = {filteredApts}
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
