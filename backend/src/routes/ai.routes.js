const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

// Support both GET and POST methods
router.get("/get-response", aiController.getResponse);
router.post("/get-response", aiController.getResponse);

module.exports = router;