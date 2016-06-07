import { Component } from 'react';
import Header from './header';

export default class Container extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header />
				<div className="nav"></div>
				<div className="con"></div>
			</div>
		);
	}
}