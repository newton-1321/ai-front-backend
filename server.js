const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
app.use(cors());

// storage setup for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// MAIN ROUTE: upload image
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const filePath = req.file.path;

        console.log("Image received:", filePath);

        const aiResponse = await axios.post("http://localhost:3000/analyze", {
            imagePath: filePath
        });

        console.log("AI Response:", aiResponse.data);

        // send response back to frontend
        res.json({
            message: "Image uploaded and sent to AI",
            file: filePath,
            ai: aiResponse.data
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
console.log("Server running on http://localhost:5000");
});