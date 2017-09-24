import { h, Component } from 'preact';

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: (this.props.list ? this.props.list.tasks : "")
		}
	}

	componentWillReceiveProps(props) {
		this.setState({tasks: props.list.tasks});
	}

	handleChange(e) {
		this.setState({tasks: e.target.value});
	}

	saveTasks(e) {
		this.props.updateTask(this.state.tasks);
	}

	render() {
		if (!this.props.list) {
			return <h2>No list selected...</h2>;
		}

		return (
			<div>
        <h2>{this.props.list.name}</h2>
        <hr/>
        <br/>

        <div className="row">
					<div className="columns small-10">
						<h3>Tasks</h3>
						<textarea value={this.state.tasks} onChange={this.handleChange.bind(this)} />
						<button className="button small" onClick={this.saveTasks.bind(this)}>Save Tasks</button>
					</div>
        </div>
			</div>
		);
	}
}
