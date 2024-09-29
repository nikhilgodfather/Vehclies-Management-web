// src/components/VehicleCard.js

import React, { useState } from "react";
import './VehicleStyles.css';
const VehicleCard = ({
	vehicle,
	onContactOwner,
	onDeleteVehicle,
	onUpdateVehicle,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);

	const handleUpdateClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setUpdatedVehicle(vehicle); // Reset to original values
	};

	const handleSaveClick = () => {
		// Implement the logic to save the updated details

		onUpdateVehicle(updatedVehicle);
		setIsEditing(false);
	};

	const handleInputChange = (fieldName, value) => {
		const [field, subField] = fieldName.split(".");

		setUpdatedVehicle((prevVehicle) => ({
			...prevVehicle,
			[field]: subField
				? { ...prevVehicle[field], [subField]: value }
				: value,
		}));
	};

	return (
		<div className="vehicle-card">
			{isEditing ? (
				// Render editable fields for updating details
				<div>
					<label>
						Company Name:
						<input
							type="text"
							value={updatedVehicle.companyName}
							onChange={(e) =>
								handleInputChange("companyName", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Distance Covered:
						<input
							type="number"
							value={updatedVehicle.distanceCovered}
							onChange={(e) =>
								handleInputChange(
									"distanceCovered",
									e.target.value
								)
							}
							required
						/>
					</label>
					<label>
						Mileage:
						<input
							type="number"
							value={updatedVehicle.mileage}
							onChange={(e) =>
								handleInputChange("mileage", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Service Dates:
						<input
							type="String"
							value={updatedVehicle.serviceDates}
							onChange={(e) =>
								handleInputChange("serviceDates", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Owner Name:
						<input
							type="text"
							value={updatedVehicle.owner.name}
							onChange={(e) =>
								handleInputChange("owner.name", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Owner Email:
						<input
							type="email"
							value={updatedVehicle.owner.email}
							onChange={(e) =>
								handleInputChange("owner.email", e.target.value)
							}
							required
						/>
					</label>
					{/* Add input fields for other properties like 
						owner name, owner email, and image */}
					<button onClick={handleSaveClick}>Save</button>
					<button onClick={handleCancelClick} style={{ marginLeft:'5px'}}>Cancel</button>
				</div>
			) : (
				// Display details
				<div>
					<h3 style={{ fontWeight: "bold" }}>
						{vehicle.companyName}
					</h3>
					<p>
						<span style={{ fontWeight: "bold" }}>
							Distance Covered:
						</span>{" "}
						{vehicle.distanceCovered}
					</p>
					<p>
						<span style={{ fontWeight: "bold" }}>Mileage:
						</span>{" "}
						{vehicle.mileage}
					</p>

					{vehicle.owner && (
						<div>
							<p style={{ fontWeight: "bold" }}>Owner:</p>
							<ul style={{ listStyle: "none", padding: 0 }}>
								<li>{vehicle.owner.name}</li>
								<li>{vehicle.owner.email}</li>
							</ul>
						</div>
					)}

					{vehicle.serviceDates && (
						<div>
							<p style={{ fontWeight: "bold" }}>Service Dates:</p>
							<ul style={{ listStyle: "none", padding: 0 }}>
								<li>{vehicle.serviceDates}</li>
							</ul>
						</div>
					)}

					{vehicle.image && (
						<div className="image-container">
							<img
								src={vehicle.image}
								alt={vehicle.companyName}
								className="vehicle-image"
							/>
						</div>
					)}


					<div className="button-container">
						<button
							onClick={() =>
								onContactOwner(
									vehicle.owner ? vehicle.owner.email : ""
								)
							}
						>
							Contact Owner
						</button>
						<button onClick={() => onDeleteVehicle(vehicle._id)}>
							Delete Vehicle
						</button>
						<button onClick={handleUpdateClick}>Update</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default VehicleCard;
