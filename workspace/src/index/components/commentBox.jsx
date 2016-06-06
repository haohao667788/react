import {Component} from 'react'; 
import CommentList from './commentList';
import CommentForm from './commentForm';

export default class CommentBox extends Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className='commentBox'>
				<h1>Comments</h1>
				<CommentList data={this.props.data} />
				<CommentForm />
			</div>
		);
	}
};