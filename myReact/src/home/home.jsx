import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class Home extends Component{
	render(){
		return(
			<div>
				 <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
                <NavLink to="/money" exact className="nav-link icon-jiantou-copy-copy">提现</NavLink>
                <NavLink to="/helpcenter" exact className="nav-link icon-jiantou-copy-copy">帮助中心</NavLink>
			</div>
		)
	}
}
