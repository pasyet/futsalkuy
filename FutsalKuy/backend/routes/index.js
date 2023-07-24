const UserController = require("../controllers/UserController");
const errorHandler = require("../middlewares/error-handler-middleware");
const authentication = require("../middlewares/authentication-middleware");
const ProfileController = require("../controllers/ProfileController");
const FieldController = require("../controllers/FieldController");
const router = require("express").Router();
const {
  createPayment,
  getPaymentStatus,
} = require("../controllers/PaymentController");
const { register } = require("../controllers/UserController");

const {
  postParticipant,
  getParticipant,
} = require("../controllers/ParticipantController");
const EventController = require("../controllers/EventController");
const ProviderController = require("../controllers/ProviderController");
const {
  GetProvider,
  GetProviders,
} = require("../controllers/ProviderController");

router.post("/register", register);
router.post("/login", UserController.Login);

router.get("/profile", authentication, ProfileController.GetProfile);
router.get(
  "/profile/:userId",
  authentication,
  ProfileController.GetProfileById
);
router.put("/profile/:userId", authentication, ProfileController.UpdateProfile);

router.post("/payment", createPayment);
router.get("/payment/:eventId", getPaymentStatus);

router.get("/field", FieldController.GetAllFields);
router.get("/field/:id", FieldController.getFieldById);


router.get("/providers", GetProviders);
router.get("/provider/:providerId", GetProvider);

router.get("/participant", getParticipant);
router.post("/participant", postParticipant);

router.get("/events", EventController.AllEvents);
router.get("/event/:eventId", EventController.GetEvent);
router.post("/event", EventController.postEvent);
router.patch("/event/:eventId", EventController.UpdateStatus)


router.use(errorHandler);

module.exports = router;
