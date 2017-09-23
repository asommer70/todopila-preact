import { h, Component } from 'preact';

export default class Lists extends Component {
	renderLists() {
		return this.props.lists.map((list, idx) => {
			return <li key={idx} className="list-name" onClick={() => this.props.selectList(idx)}>{list.name}</li>
		});
	}

	render() {
		return (
			<div>
				<h2>Lists</h2>
				<ul className="no-bullet">
					{this.renderLists()}
				</ul>
			</div>
		);
	}
}
