import { h, Component } from 'preact';
import Menu from './menu';
import Lists from './lists';
import List from './list';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lists: [
				{id: 2, name: '09-23-2017', tasks: 'Beans...\n'},
				{id: 1, name: '09-22-2017', tasks: ''}
			],
			selectedList: undefined
		}
	}

	selectList(idx) {
		this.setState({selectedList: this.state.lists[idx]});
	}

	updateTask(tasks) {
		// Update the selectedList.
		const selected = this.state.selectedList;
		selected.tasks = tasks;

		// Update the selectedList in the lists array and set State.
		this.setState({
			lists: this.state.lists.map((list, index) => {
				if (list.id == this.state.selectedList.id) {
					return {
						...list,
						tasks: tasks
					}
				} else {
					return list;
				}
			}),
			selectedList: selected
		});
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
								<List list={this.state.selectedList} updateTask={this.updateTask.bind(this)} />
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
