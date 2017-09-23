import { h, Component } from 'preact';
import Menu from './menu';
import Lists from './lists';
import List from './list';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lists: [
				{id: 2, name: '09-23-2017', tasks: []},
				{id: 1, name: '09-22-2017', tasks: []}
			],
			selectedList: undefined
		}
	}

	selectList(idx) {
		this.setState({selectedList: this.state.lists[idx]});
	}

	addTask(task) {
		const list = this.state.selectedList;
		list.tasks.append(task)
		this.setState({selectedList: list});
	}

	render() {
		return (
			<div id="app" className="container">
				<div className="row">
					<div className="columns small-12">
						<Menu />

						<div className="row">
							<div className="columns small-4">
								<Lists lists={this.state.lists} selectList={this.selectList.bind(this)} />
							</div>

							<div className="columns small-8">
								<List list={this.state.selectedList} addTask={this.addTask.bind(this)} />
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
