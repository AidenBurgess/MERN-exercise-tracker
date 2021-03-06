import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import serverIP from "../config";

const PostPreview = (props) => (
	<div style={{ border: "solid 5px transparent" }}>
		<Card
			style={{
				width: "18rem",
				height: "18rem",
				flexGrow: "1",
			}}
		>
			<Card.Body>
				<Card.Title>{props.post.title}</Card.Title>
				<Card.Text>{props.post.body}</Card.Text>
				<Button variant="primary">See post</Button>
			</Card.Body>
		</Card>
	</div>
);

export default class Community extends Component {
	constructor(props) {
		super(props);

		// this.deleteExercise = this.deleteExercise.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = { posts: [] };
	}

	componentDidMount() {
		axios
			.get(`${serverIP}/posts/`)
			.then((res) => {
				this.setState({
					posts: res.data,
				});
				console.log(this.state.posts);
			})
			.catch((err) => console.log(err));
	}

	// deleteExercise(id) {
	// 	axios.delete(`http://13.239.96.117:5000/exercises/${id}`).then((res) => {
	// 		console.log(res);
	// 	});

	// 	this.setState({
	// 		exercises: this.state.exercises.filter((ex) => ex._id !== id),
	// 	});
	// }

	postList() {
		return this.state.posts.map((post) => {
			return <PostPreview post={post} key={post._id} />;
		});
	}

	render() {
		return (
			<div>
				<div>
					<h3>Community Posts</h3>
					<Button>Add New Post</Button>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
					}}
				>
					{this.postList()}
				</div>
			</div>
		);
	}
}
