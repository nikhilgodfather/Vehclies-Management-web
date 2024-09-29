//src/components/AddVehicle.js

import axios from "axios";
import React, { useState } from "react";
import './VehicleStyles.css';
const AddVehicle = ({ onAddVehicle }) => {
	const [newVehicle, setNewVehicle] = useState({
		companyName: "",
		distanceCovered: "",
		mileage: "",
		serviceDates: "",
		owner: {
			name: "",
			email: "",
		},
		image: "",
	});

	const handleAddVehicle = () => {
		// Submit a new vehicle
		axios.post("http://localhost:3001/api/cars/save", newVehicle)
			.then((response) => {
				// Notify the parent component about the new vehicle
				console.log(response.data.data)
				onAddVehicle(response.data.data);
                
				// Clear the newVehicle state for the next entry
				setNewVehicle({
					companyName: "",
					distanceCovered: "",
					mileage: "",
					owner: {
						name: "",
						email: "",
					},
					image: "", // Reset image URL field
				});
				
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className="form-container">
			<h2 style={{ color: "#007BFF", textAlign: "center" }}>
				Add a New Vehicle
			</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddVehicle();
				}}
			>
				<div className="form-row">
					<label>
						Company Name:
						<input
							type="text"
							value={newVehicle.companyName}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									companyName: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
					<label>
						Distance Covered:
						<input
							type="number"
							value={newVehicle.distanceCovered}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									distanceCovered: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
				</div>
				<div className="form-row">
					<label>
						Mileage:
						<input
							type="number"
							value={newVehicle.mileage}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									mileage: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
					<label>
						Service Dates (comma-separated):
						<input
							type="text"
							value={newVehicle.serviceDates}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									serviceDates: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
				</div>
				<div className="form-row">
					<label>
						Owner Name:
						<input
							type="text"
							value={newVehicle.owner.name}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									owner: {
										...newVehicle.owner,
										name: e.target.value,
									},
								})
							}
							required
							className="form-input"
						/>
					</label>
					<label>
						Owner Email:
						<input
							type="email"
							value={newVehicle.owner.email}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									owner: {
										...newVehicle.owner,
										email: e.target.value,
									},
								})
							}
							required
							className="form-input"
						/>
					</label>
				</div>
				<div className="form-row">
					<label>
						Image URL:
						<input
							type="text"
							value={newVehicle.image}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									image: e.target.value,
								})
							}
							className="form-input"
						/>
					</label>
				</div>
				<button type="submit" className="form-button">
					Add Vehicle
				</button>
			</form>
		</div>
	);
};

export default AddVehicle;
