import React from 'react';
import {Row, Col} from 'antd';
import {Select} from 'antd';
import {Input} from 'antd';
import axios from 'axios';
import {Button} from 'antd';
import {DatePicker} from 'antd'
import {Table, Icon, Divider} from 'antd';
import {Pagination} from 'antd';

import './projectManage.css'
// import Newproject from './newProject'
const Option = Select.Option;
const {RangePicker} = DatePicker;

export default class projectManage extends React.Component {
  // 数据初始化
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',//项目名称
      createTimes:[],
      projectKind:'',
      projectState:'',//项目状态
      posts: [],
      loading: false,
      columns: [
        {
          title: '项目名称',
          dataIndex: 'name'
        }, {
          title: '项目类型',
          dataIndex: 'typeDicValue'
        }, {
          title: '创建时间',
          // render: text => <Moment>{text}</Moment>,
          dataIndex: 'createTime'
        }, {
          title: '项目状态',
          dataIndex: 'statusDicValue'
        }, {
          title: '操作',
          key: 'action',
          render: (text, record) => (<span>
            <span href="#">查看</span>
            <Divider type="vertical"/>
            <span href="#">编辑</span>
            <Divider type="vertical"/>
            <span href="#">删除</span>
          </span>)
        }
      ],
      Tabledata: [
        {
          key: "projectId",
          name: 'John Brown',
          typeDicValue: 32,
          createTime: 'New York No. 1 Lake Park',
          statusDicValue: 'York'
        }, {
          key: '2',
          name: 'Jim Green',
          typeDicValue: 42,
          createTime: 'London No. 1 Lake Park',
          statusDicValue: 'York'
        }, {
          key: '3',
          name: 'Joe Black',
          typeDicValue: 32,
          createTime: 'Sidney No. 1 Lake Park',
          statusDicValue: 'York'
        }, {
          key: '4',
          name: 'Joe Black',
          typeDicValue: 32,
          address: 'Sidney No. 1 Lake Park',
          statusDicValue: ''
        }, {
          key: '5',
          name: 'Joe Black',
          typeDicValue: 32,
          createTime: 'Sidney No. 1 Lake Park',
          statusDicValue: ''
        }
      ],
      page: 1,
      pageSize: 10,
      selectvalue: '',
      pagination: {},
      loading: false,
    }
  }
  // input值更新
  InputHandleChange = (event) =>{
    this.setState({projectName: event.target.value});
  }
  //创建时间
  createTime = (dateString)=>{
    this.setState({createTimes:dateString});
  }
  //selectvalue
  SelectChange = (SelectValue)=>{
      this.setState({projectKind:SelectValue})
      console.log(this.state.projectKind);
  }
  // 新建
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  //重置
  reset=()=>{
    this.setState({projectName:'',createTimes:[],projectKind:'',projectState:''});
  }
  handleTableChange = (paginations) => {
    console.log(paginations);
    setTimeout(() => {
      this.setState({page: paginations.current})
      console.log(this.state.page);
      let page = this.state.page;
      this.fetchTale(page);
    })
  }
  //每页条数
  onShowSizeChange = (current, pagesize) => {
    setTimeout(() => {
      this.setState({pageSize: pagesize, page: current})
      console.log(this.state.page);
      console.log(this.state.pageSize);

      let page = this.state.page;
      let pageSize = this.state.pageSize;
      this.fetchTale(page, pageSize);
    })
  }
  // 翻页
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setTimeout(() => {
      this.setState({page: pageNumber})
      //console.log(this.state.page);
      let page = this.state.page;
      let pageSize = this.state.pageSize;
      this.fetchTale(page, pageSize);
    })
  }
  fetchTale=(pageNum, pageSize) =>{
    // 项目列表
    let that = this;
    this.setState({loading: true});
    axios.post('/task/searchProject.do', {
      "pageSize": pageSize?pageSize: 10, //类型：String  必有字段  备注：批次实例Id
      "pageNum": pageNum?pageNum: 1, //类型：Number  必有字段  备注：当前页数
      "status": that.state.projectState, //类型：Number  可有字段  备注：项目状态
      "startCreateTime": Date.parse(that.state.createTimes[0]),// 类型：String  可有字段  备注：项目创建开始时间
      "endCreateTime": Date.parse(that.state.createTimes[0]), //类型：String  可有字段  备注：项目创建结束时间
      "type": that.state.projectKind, //  可有字段  备注：项目类型
      "name": that.state.projectName //类型：String  可有字段  备注：项目名称
    }).then(res => {
      let Tabledata = res.data.data.projects;
      const pagination = {
        ...this.state.pagination
      };
      //console.log(pagination);
      pagination.total = res.data.data.totalCount;
      this.setState({Tabledata, pagination, loading: false});

    });
  }
  componentDidMount() {

    axios.post('/dictionary/searchParameterByName.do', {"name": 'projectType'}).then(res => {
      this.setState({posts: res.data.data.value});
    });
    //项目列表
    this.fetchTale();
  }

  render() {
    return (<div>
      <Row>
        <Col span={8}>项目名称:&nbsp;
          <Input placeholder="请选择" value={this.state.projectName} onChange={this.InputHandleChange}/></Col>
        <Col span={8}>创建时间:&nbsp;
          <RangePicker onChange={this.createTime} value={this.state.createTimes}/></Col>
      </Row>
      <div className="RowTop">
        <Row>
          <Col span={8}>项目类型:&nbsp;
            <Select placeholder="请选择" id="selectV1"  allowClear style={{
                width: 200
              }}  optionFilterProp="children" onChange={this.SelectChange}>
              {this.state.posts.map((item) => <Option value={item.key} key={item.key}>{item.value}</Option>)}
            </Select>
          </Col>
          <Col span={8}>项目状态:&nbsp;
            <Select id="selectV2" allowClear  style={{
                width: 200
              }} placeholder="请选择" optionFilterProp="children" onChange={this.SelectChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={()=>this.showModal()}>新建</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={() => this.fetchTale()}>搜索</Button>
          </Col>
          <Col span={2}>
            <Button onClick={()=>this.reset()}>重置</Button>
          </Col>
        </Row>
      </div>
      <Table rowKey={record => record.projectId} columns={this.state.columns} dataSource={this.state.Tabledata} pagination={false} loading={this.state.loading} onChange={this.handleTableChange}  size="small" bordered/>
      <div className="pagenation"><Pagination onChange={this.onChange} showQuickJumper showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={1} total={this.state.pagination.total}/></div>
      {/* modial */}
    
    </div>)
  }
}
