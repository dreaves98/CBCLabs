/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import Pleasework from 'components/Pleasework';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
        <Pleasework/>
      </div>
    );
  }
}
