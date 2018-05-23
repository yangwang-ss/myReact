import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RouterConfig from '@/router/router'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './layout.css'
const {
	Header,
	Content,
	Footer,
	Sider
} = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderDemo extends React.Component {
	state = {
		collapsed: false,
	};
	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({
			collapsed
		});
	};

	componentDidMount() {
		if(sessionStorage.getItem('token')!==(null||undefined)){
  axios.defaults.headers['token']= sessionStorage.getItem('token');
}else {
  // window.location.href = "http://bmtest.voicegu.com";
}
		var that = this;
		axios.post('/enterprise/findUserInfo.do', {
			/*"id": sessionStorage.getItem('userID'), 类型：String  必有字段  备注：无*/
			"id": "BUSINESS201802011110000000008467"
		}).then(function(res, req) {
			let comList = res.data;
			if(comList.code === 0) {
				//              console.log(comList.data.user.nickName);
				that.oneList = comList.data.menus;
				if(comList.data.user.photo !== null && comList.data.user.photo !== undefined) {
					that.nickurl = comList.data.user.photo;
				}
				if(comList.data.user.nickName !== null && comList.data.user.nickName !== undefined && comList.data.user.nickName !== "") {
					that.nick = comList.data.user.nickName;
				} else {
					that.nick = comList.data.user.phoneNumber;
				}
				if(comList.data.user.companyId !== null && comList.data.user.companyId !== undefined) {
					sessionStorage.setItem("companyId", comList.data.user.companyId);
				}
			}
		}).catch(function(err) {

		})
	}
	render() {
		return(
			<Layout style={{ minHeight: '100vh' }} id="components-layout-demo-side">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="desktop" /><span>项目管理</span></span>}
            >
              <Menu.Item key="1"><Link to="/projectManage">发布项目</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="user" /><span>用户管理</span></span>}
            >
              <Menu.Item key="2"><Link to="/home">home</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0}} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <RouterConfig/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
		);
	}
}
