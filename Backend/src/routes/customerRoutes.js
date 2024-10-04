const {
  getCustomers,
  getCustomerbyId,
} = require("../conrollers/customerController");

const router = require("express").Router();

router.get("/", getCustomers);

router.get("/:id", getCustomerbyId);

module.exports = router;
