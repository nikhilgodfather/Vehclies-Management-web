// src/App.js

import React, { useState, useEffect } from "react";
import VehicleList from "./components/VehicleList";
import AddVehicle from "./components/AddVehicle";
import axios from "axios";
import "./App.css";

const App = () => {
	const [vehicles, setVehicles] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:3001/api/cars")
			.then((response) => setVehicles(response.data))
			.catch((error) => console.error(error));
	}, []);

	const handleAddVehicle = (newVehicle) => {
		console.log("new vehicle", newVehicle);

		setVehicles(newVehicle);
		setShowForm(!showForm)
	};

	const handleContactOwner = (email) => {
		alert(`Contacting the owner of the vehicle at ${email}`);
	};

	const handleDeleteVehicle = (vehicleId) => {
		console.log(`Deleting ${vehicleId}`);
		axios
			.delete(`http://localhost:3001/api/cars/${vehicleId}`)
			.then((response) => {
				// Filter out the deleted vehicle from the state
				setVehicles((prevVehicles) =>
					prevVehicles.filter((vehicle) => vehicle._id !== vehicleId)
				);
			})
			.catch((error) => console.error(error));
	};

	const handleUpdateVehicle = async (updatedVehicle) => {
		try {
			const response = await axios.put(
				`
http://localhost:3001/api/cars/${updatedVehicle._id}`,
				updatedVehicle
			);

			// Handle the response
			console.log("Vehicle updated successfully:", response.data);

			// Update the vehicles array with the updated vehicle
			setVehicles((prevVehicles) =>
				prevVehicles.map((vehicle) =>
					vehicle._id === updatedVehicle._id ? response.data : vehicle
				)
			);
		} catch (error) {
			// Handle errors, e.g., show an error message to the user
			console.error("Error updating vehicle:", error);
		}
	};

	return (
		<div className="main-container">
			{/* <h1 className="gfg">GFG</h1> */}
			<h1>Vehicle Tracking System</h1>
			<button onClick={() => setShowForm(!showForm)}>
				{showForm ? "Close" : "Add New Vehicle"}
			</button>
			<div className="">
				{showForm && <AddVehicle onAddVehicle={handleAddVehicle} />}
				{vehicles && (
					<VehicleList
						onDeleteVehicle={handleDeleteVehicle}
						onUpdateVehicle={handleUpdateVehicle}
						vehicles={vehicles}
						onContactOwner={handleContactOwner}
					/>
				)}
			</div>
		</div>
	);
};

export default App;

