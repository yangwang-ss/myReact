import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import RouterConfig from '@/router/router'
import {withRouter} from "react-router-dom";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import './layout.css'
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

export  class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    menuList:[]
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed});
  };
  //路由跳转
  jumpRouter(path){
    this.props.history.push('/'+path)
  };
  // 菜单Data
  MenuData(){
    axios.post('/enterprise/findUserInfo.do',{
      "id": sessionStorage.getItem('userID')
    }).then((res)=>{
      if (res.data.code==='0') {
        this.setState({menuList:res.data.data.menus});
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  componentDidMount() {
    if (sessionStorage.getItem('token') !== (null || undefined)) {
      axios.defaults.headers['token'] = sessionStorage.getItem('token');
    } else {
      // window.location.href = "http://bmtest.voicegu.com";
    }

    axios.post('/enterprise/findUserInfo.do', {
      "id": sessionStorage.getItem('userID')
      // "id": "BUSINESS201802011110000000008467"
    }).then((res)=>{
      if (res.data.code==='0') {
        this.setState({menuList:res.data.data.menus});
      }
    }).catch((err)=>{
      console.log(err);
    });
  }
  render() {
    return (<Layout id="components-layout-demo-side" style={{ minHeight: '100vh' }}>
      <Sider   collapsible="collapsible" collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {this.state.menuList.map((item)=>
            <SubMenu key={item.id} title={<span> < Icon type = "desktop" />< span > {item.name}</span></span>}>
            {item.children.map((subitem)=><Menu.Item key={subitem.id}>
              <span onClick={()=>this.jumpRouter(subitem.url)}>{subitem.name}</span>
              {/* <Link to="'/'+subitem.url">{subitem.name}</Link> */}
            </Menu.Item>)}
            </SubMenu>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{
            background: '#fff',
            padding: 0
          }}/>
        <Content style={{
            margin: '0 16px'
          }}>
          <Breadcrumb style={{
              margin: '16px 0'
            }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{
              padding: 24,
              background: '#fff',
              minHeight: 360
            }}>
            <RouterConfig/>
          </div>
        </Content>
        <Footer style={{
            textAlign: 'center'
          }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>);
  }
}
export default withRouter(SiderDemo);
