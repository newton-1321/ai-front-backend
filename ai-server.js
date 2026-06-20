const express = require("express");
const app = express();

app.use(express.json());

app.post("/analyze", (req, res) => {
    const { imagePath } = req.body;

    console.log("AI received image:", imagePath);

    // pretend AI processing
    res.json({
        status: "processed",
        riskLevel: "medium",
        message: "Building spacing analysis complete"
    });
});

app.listen(3000, () => {
    console.log("AI server running on http://localhost:3000");
});