//server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())
const PORT =  3001;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://0.0.0.0/vehicle-tracking', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json())
// MongoDB Schema for Car
const carSchema = new mongoose.Schema({
	companyName: {
		type:String,
		required:true
	},
	distanceCovered:{
		type: Number,
	     required:true
		},
	mileage:{
		type:Number,
		required:true
	},
	serviceDates:{
      type:String,
	  required:true
	} ,
	owner: {
		name: String,
		email: String,
	},
	image: {
		type:String,
		required:true
	}
});

const CarModel = new mongoose.model('Car', carSchema);

// API Endpoints
// Get all cars
app.get('/api/cars', async (req, res) => {
	try {
		const cars = await CarModel.find().lean().exec();
		res.json(cars);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get a specific car by ID
app.get('/api/cars/:id', async (req, res) => {
	try {
		const car = await Car.findById(req.params.id);
		if (!car) {
			return res.status(404).json({ error: 'Car not found' });
		}
		res.json(car);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Add a new car
app.post('/api/cars/save', async (req, res) => {
    const data = req.body;

    try {
        console.log('Request Data:', data);
        const CarEntry = new CarModel(data);
        const carSaveResult = await CarEntry.save();

        console.log('Saved Data:', carSaveResult);
        const carFinds = await CarModel.find().lean().exec()
        res.json({
            success: true,
            message: "Data Inserted Successfully!",
			data: carFinds
        });
    } catch (error) {
        console.error('Error Saving Data:', error);
        res.status(400).json({
            success: false,
            message: "Data was not Inserted Successfully!",
            error: error.message
        });
    }
});

// Update a car by ID
app.put('/api/cars/:id', async (req, res) => {
	try {
		const updatedCar = await CarModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedCar) {
			return res.status(404).json({ error: 'Car not found' });
		}
		res.json(updatedCar);
	} catch (error) {
		res.status(400).json({ error: 'Bad Request' });
	}
});
// Delete a car by ID
app.delete('/api/cars/:id', async (req, res) => {
	try {
		console.log(req.params.id)
		const deletedCar = await CarModel.findByIdAndDelete(req.params.id);
		if (!deletedCar) {
			return res.status(404).json({ error: 'Car not found' });
		}
		console.log('car is deleted successfully');
		res.json({ message: 'Car deleted successfully' });
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Internal Server Error' });
	}
});


// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
