var express = require("express");
var router = express.Router();
const { index, edit, update, updateStatus, destroy } = require("./controller");

router.get("/", index);
router.get("/edit/:id", edit);
router.put("/update/:id", update);
router.put("/updateStatus/:id", updateStatus);
router.delete("/destroy/:id", destroy);

module.exports = router;
