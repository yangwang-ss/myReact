import React, {
	Component
} from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
//Switch只渲染所匹配到的第一个路由组件
import asyncComponent from '@/utils/asyncComponent'; //异步加载组件
import PbProject from '@/views/projects/projectManage'
const complaintHandling = asyncComponent(() =>
	import("@/home/home"));

const Topics = ({
	match
}) => (
	<div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({
	match
}) => (
	<div>
    <h3>{match.params.topicId}</h3>
  </div>
)
export default class RouterConfig extends Component {
	render() {
		const history = this.props.history
		return(
			<Switch history={history}>
		      <Route path="/PbProject"  component={PbProject}/>
		      <Route path="/complaintHandling" component={complaintHandling}/>
		      <Route path="/topics" component={Topics}/>
		      <Redirect to="/projectManage"/>
     		</Switch>
		)
	}
}
