const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const imageController = require("../controllers/imageController");
const dealsController = require("../controllers/dealsController");
const visitedController = require("../controllers/visitedController");
const nearbyPlaceController = require("../controllers/nearbyPlaceController");
const userCoinsController = require("../controllers/userCoinsController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/events", verifyToken, eventController.createEvent);
router.get("/events", eventController.getEvents);
router.put("/events/:eventId/toggleSaved", verifyToken, eventController.updateEvents);
router.post("/gallery", imageController.uploadImage);
router.get("/gallery", imageController.getImages);
router.post("/deals", verifyToken, dealsController.createDeal);
router.get("/deals", dealsController.getDeals);
router.get("/advertisements", dealsController.getAdvertisements);
router.post("/visited", verifyToken, visitedController.saveVisitedPlace);
router.get("/visited", verifyToken, visitedController.getVisitedPlaces);
router.post("/nearbyPlaces", verifyToken, nearbyPlaceController.saveNearbyPlace);
router.get("/nearbyPlaces", verifyToken, nearbyPlaceController.getNearbyPlaces);
router.post("/addCoins", verifyToken, userCoinsController.addCoins);
router.get("/getCoins", verifyToken, userCoinsController.getCoins);
module.exports = router;

module.exports = router;
