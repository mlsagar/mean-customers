const express = require("express");
const { addCustomer, allCustomers, oneCustomer, fullCustomerUpdate, partialCustomerUpdate, removeCustomer } = require("./controllers");

const router = express.Router()

router.route("/customers")
    .post(addCustomer)
    .get(allCustomers)

router.route("/customers/:customerId")
    .get(oneCustomer)
    .put(fullCustomerUpdate)
    .patch(partialCustomerUpdate)
    .delete(removeCustomer)


module.exports = router;