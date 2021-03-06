import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import serverIP from "../config";

const Exercise = (props) => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={`/edit/${props.exercise._id}`}>edit</Link> |{" "}
			<a
				href="#"
				onClick={() => props.deleteExercise(props.exercise._id)}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);

		this.state = { exercises: [] };
	}

	componentDidMount() {
		axios
			.get(`${serverIP}/exercises`)
			.then((res) => {
				this.setState({
					exercises: res.data,
				});
			})
			.catch((err) => console.log(err));
	}

	deleteExercise(id) {
		axios.delete(`${serverIP}/exercises/${id}`).then((res) => {
			console.log(res);
		});

		this.setState({
			exercises: this.state.exercises.filter((ex) => ex._id !== id),
		});
	}

	exerciseList() {
		return this.state.exercises.map((exercise) => {
			return (
				<Exercise
					exercise={exercise}
					deleteExercise={this.deleteExercise}
					key={exercise._id}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
