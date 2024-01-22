import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="text-center mt-5">
		<h1 className="display-1 fw-bold">4geeks Diego Gómez contact list</h1>
		<Link className="display-5" to="/contact">Go to Contact List</Link>
	</div>
);
