import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@/components/layout/layout'
import { AppContainer } from 'react-hot-loader'; //局部热加载更新
import {
  BrowserRouter as Router

} from 'react-router-dom';
import axios from 'axios';
import  './common.css'
axios.defaults.baseURL = 'http://bmtest.voicegu.com/ucscmanager';
if (sessionStorage.getItem('token') !== (null || undefined)) {
  axios.defaults.headers['token'] = sessionStorage.getItem('token');
} else {
  // window.location.href = "http://bmtest.voicegu.com";
}
axios.defaults.headers['Content-Type'] = 'application/json';
const BasicExample = () => (
  <Router>
    <div>
    <Layout/>
      {/*<ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <hr/>
      <RouterConfig/>*/}
    </div>
  </Router>
)

ReactDOM.render(<AppContainer><BasicExample/></AppContainer>, document.getElementById('root'));
//  局部热加载
if (module.hot) {
  module.hot.accept();
}
