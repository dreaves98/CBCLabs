/**
*
* Grid
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class Grid extends React.PureComponent

{
  constructor() {
     super();
     this.state = {
      images: ['Hiking1.jpg','Hiking2.jpg','Hiking3.jpg','Hiking4.jpg','Hiking5.jpg','Hiking6.jpg','Hiking7.jpg','Hiking8.jpg']
     }
   }
  render() {
    return (
      <div>
        <div className="grid">
        {this.state.images.map((image, index) => (
         <div className="gridItem" key={index}>
           <img src={require('../../images/'+image)} className="gridImage"/>
         </div>
       ))}
        </div>
      </div>
    );
  }
}
