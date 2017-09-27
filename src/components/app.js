import { h, Component } from 'preact';
import Menu from './menu';
import Lists from './lists';
import List from './list';

export default class App extends Component {
	constructor(props) {
		super(props);

		const exampleLists = [
			{id: 2, name: '09-23-2017', tasks: 'Beans...\n* [ ] Stuff\n* [ ] Other stuff...'},
			{id: 1, name: '09-22-2017', tasks: ''}
		];

		this.state = {
			lists: exampleLists,
			selectedList: exampleLists[0]
		}
	}

	selectList(idx) {
		this.setState({selectedList: this.state.lists[idx]});
	}

	updateLists(selected, tasks) {
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

	updateTask(tasks) {
		// Update the selectedList.
		const selected = this.state.selectedList;
		selected.tasks = tasks;

		// Update the selectedList in the lists array and set State.
		this.updateLists(selected, tasks);
	}

	taskStatusChange(text, status) {
		const selected = this.state.selectedList;

		let tasks = selected.tasks.split("\n");
		tasks = tasks.map((task) => {
			if (task.substr(5) == text) {
				if (status) {
					task = '* [x]' + task.substr(5);
				} else {
					task = '* [ ]' + task.substr(5);
				}
			}
			return task;
		});

		selected.tasks = tasks.join("\n");

		// Update the selectedList in the lists array and set State.
		this.updateLists(selected, selected.tasks);
	}

	render() {
		return (
			<div id="app" className="container">
				<div className="row">
					<div className="columns small-12">
						<Menu />

						<div className="row">
							<div className="columns small-2">
								<Lists lists={this.state.lists} selectList={this.selectList.bind(this)} />
							</div>

							<div className="columns small-10">
								<List list={this.state.selectedList}
											updateTask={this.updateTask.bind(this)}
											taskStatusChange={this.taskStatusChange.bind(this)}
								/>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
