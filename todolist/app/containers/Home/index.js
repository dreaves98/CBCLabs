/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      listItems:[],
      inputItem:""
    }
  };
  componentWillMount() {
    this.getTasks();
  }
  handleItem = (event) => {
    this.setState({
      inputItem:event.target.value
    })
  };
  storeItem = () => {
    var listItems = this.state.listItems;
    var inputItem = this.state.inputItem;

    if(inputItem !=="") {
      listItems.push(inputItem);

      this.setState({
        listItems:listItems,
        inputItem:""
      })
    }
  };
  getTasks = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method:'GET'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(json) {
      this.setState({
        listItems:json.tasks
      })
    }.bind(this))
  };
  storeTask = () => {
    let data = new FormData();
    data.append('taskContent', this.state.inputItem);

   fetch('http://localhost:8000/api/storeTask', {
     method:'POST',
     body:data
   })
   .then(function(response){
     return response.json();
   })
   .then(function(json) {
     let listItems = this.state.listItems;
     listItems.push(json.task);
     this.setState({
       listItems:listItems
     })
     this.forceUpdate();
   }.bind(this))
 };

  render() {
    return (
       <div className="container">
         <Helmet title="Home" meta={[ { name: 'description', content:   'Description of Home' }]}/>

          <div className="inputContainer">
            <input type="text" className="todoInput" onChange={this.handleItem} value={this.state.inputItem} />
            <input type="submit" value="Add to List" className="todoButton" onClick={this.storeTask} />
          </div>
          <div className="todoList">
            {this.state.listItems.map((item, index) => (
            <div className="listItem" key={index}>
              {item.taskContent}
            </div>
          ))}
          </div>
      </div>
    );
  }

}
