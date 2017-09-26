import { h, Component } from 'preact';
import md from 'markdown-it';
import taskLists from 'markdown-it-task-lists';

const parser = md().use(taskLists, {enabled: true, label: true, labelAfter: true});

export default class List extends Component {
	constructor(props) {
		super(props);

		// var result = parser.render(...);

		this.state = {
			tasks: (this.props.list ? this.props.list.tasks : ""),
			edit: false
		}
	}

	componentWillReceiveProps(props) {
		this.setState({tasks: props.list.tasks});
	}

	componentDidMount() {
		// Add an event listener to the document to listen for the change event outside of React.
		document.addEventListener('change', (e) => {
			if (e.target.classList.contains('task-list-item-checkbox')) {
				// Get the text for the task and if it's checked or not.
				const taskText = e.target.nextSibling.innerHTML;
				const taskStatus = e.target.checked;
				this.props.taskStatusChange(taskText, taskStatus);
			}
		});
	}

	handleChange(e) {
		this.setState({tasks: e.target.value});
	}

	saveTasks(e) {
		this.props.updateTask(this.state.tasks);
		this.setState({edit: !this.state.edit});
	}

	render() {
		if (!this.props.list) {
			return <h2>No list selected...</h2>;
		}

		let tasks;
		if (this.state.edit) {
			tasks = (
				<div>
					<textarea value={this.state.tasks} onChange={this.handleChange.bind(this)} />
					<button className="button small" onClick={this.saveTasks.bind(this)}>Save Tasks</button>
				</div>
			);
		} else {
			tasks = <div dangerouslySetInnerHTML={{__html: parser.render(this.state.tasks)}} />;
		}

		return (
			<div>
        <h2>{this.props.list.name}</h2>
        <hr/>
        <br/>

        <div className="row">
					<div className="columns small-10">
						<h3 className="tasks-label">Tasks</h3>
						<button className="button tiny secondary float-right task-edit" onClick={() => this.setState({edit: !this.state.edit})}>Edit</button>
						<br/>

						{tasks}
					</div>
        </div>
			</div>
		);
	}
}
