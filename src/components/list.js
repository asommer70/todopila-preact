import { h, Component } from 'preact';

export default class List extends Component {
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
						<textarea></textarea>
					</div>
        </div>
			</div>
		);
	}
}
