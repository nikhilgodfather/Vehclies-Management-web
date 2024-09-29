// src/components/VehicleList.js

import React, { useState, useMemo } from "react";
import VehicleCard from "./VehicleCard";
import './VehicleStyles.css';
const VehicleList = ({
	vehicles,
	onContactOwner,
	onDeleteVehicle,
	onUpdateVehicle,
}) => {
	const [companyFilter, setCompanyFilter] = useState("");
	const [sortBy, setSortBy] = useState("distanceCovered"); // Default sorting by distanceCovered

	const filteredAndSortedVehicles = useMemo(() => {
		return vehicles
			.filter((vehicle) =>
				vehicle.companyName
					.toLowerCase()
					.includes(companyFilter.toLowerCase())
			)
			.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
	}, [vehicles, companyFilter, sortBy]);

	return (
		<div className="list" style={{ marginTop: "20px" }}>
			<h2 style={{ color: "#007BFF" }}>Vehicle List</h2>

			{/* Filter and Sort Controls */}
			<div style={{ marginBottom: "10px" }}>
				<label>
					Filter by Company Name:
					<input
						type="text"
						value={companyFilter}
						onChange={(e) => setCompanyFilter(e.target.value)}
					/>
				</label>
				<label style={{ marginLeft: "10px" }}>
					Sort by:
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="distanceCovered">
							Distance Covered
						</option>
						<option value="mileage">Mileage</option>
					</select>
				</label>
			</div>

			<div className="list-container">
				{filteredAndSortedVehicles.map((vehicle) => (
					<VehicleCard
						key={vehicle._id}
						vehicle={vehicle}
						onContactOwner={onContactOwner}
						onDeleteVehicle={onDeleteVehicle}
						onUpdateVehicle={onUpdateVehicle}
					/>
				))}
			</div>
		</div>
	);
};

export default VehicleList;
