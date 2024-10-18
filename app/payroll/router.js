var express = require("express");
var router = express.Router();
const { index, create, store, edit, update, destroy } = require("./controller");

router.get("/", index);
router.get("/create", create);
router.post("/store", store);
router.get("/edit/:id", edit);
router.put("/update/:id", update);
router.delete("/destroy/:id", destroy);

module.exports = router;
