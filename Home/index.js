/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import Story from 'components/Story';
import Hello from 'components/Hello'
export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
      <Helmet title="Home" meta={[{name: 'description', content: 'Description of Home'}]}/>
      <Hello/>
      <Story/>
      




      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
