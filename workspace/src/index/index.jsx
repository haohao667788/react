'use strict';

import CommentBox from './components/commentBox';

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

ReactDOM.render(
	<CommentBox data={data} />,
	document.getElementById('container')
);