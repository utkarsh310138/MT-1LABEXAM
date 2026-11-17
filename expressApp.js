
import express from 'express';

const app = express();

app.use(express.json());

let vehicles = [
    {
        id: 1,
        vehicleName: "Hyundai Creta",
        vehicleNumber: "HR26AB1234",
        type: "SUV",
        price: 1500000
    },
    {
        id: 2,
        vehicleName: "Maruti Swift",
        vehicleNumber: "DL8CAF5030",
        type: "Hatchback",
        price: 750000
    },
    {
        id: 3,
        vehicleName: "Tata Nexon",
        vehicleNumber: "UP16AB1234",
        type: "SUV",
        price: 1200000
    }
];

// GET all vehicles
app.get("/vehicles", (req, res) => {

    res.json(vehicles);

});

// GET vehicle by ID
app.get("/vehicles/:id", (req, res) => {

    const id = Number(req.params.id);

    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    res.json(vehicle);

});

// POST new vehicle
app.post("/vehicles", (req, res) => {

    const { id, vehicleName, vehicleNumber, type, price } = req.body;

    if (
        id === undefined ||
        !vehicleName ||
        !vehicleNumber ||
        !type ||
        price === undefined ||
        typeof price !== "number" ||
        price <= 0
    ) {
        return res.status(400).json({
            message: "Invalid or missing vehicle details"
        });
    }

    const newVehicle = {
        id,
        vehicleName,
        vehicleNumber,
        type,
        price
    };

    vehicles.push(newVehicle);

    res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: newVehicle
    });

});

// PUT update vehicle
app.put("/vehicles/:id", (req, res) => {

    const id = Number(req.params.id);

    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    const updatedVehicle = {
        ...vehicle,
        ...req.body,
        id: vehicle.id
    };

    if (
        !updatedVehicle.vehicleName ||
        !updatedVehicle.vehicleNumber ||
        !updatedVehicle.type ||
        typeof updatedVehicle.price !== "number" ||
        updatedVehicle.price <= 0
    ) {
        return res.status(400).json({
            message: "Invalid vehicle details"
        });
    }

    Object.assign(vehicle, updatedVehicle);

    res.json({
        message: "Vehicle updated successfully",
        vehicle: vehicle
    });

});

// DELETE vehicle
app.delete("/vehicles/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = vehicles.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    vehicles.splice(index, 1);

    res.json({
        message: "Vehicle deleted successfully"
    });

});

// Start server
app.listen(4000, () => {

    console.log("Express Server running at http://localhost:4000");

});
