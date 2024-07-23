const Employee = require("./model");
const db = require("../../db/mysql2");

module.exports = {
  index: async (req, res) => {
    try {
      const employees = await Employee.findAll();
      res.render("employee/index", { employees });
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: (req, res) => {
    res.render("employee/create");
  },
  store: async (req, res) => {
    const { first_name, last_name, address, phone, email, position, department, date_of_joining, date_of_birth } = req.body;

    if (!first_name || !last_name || !address || !phone || !email || !position || !department || !date_of_joining || !date_of_birth) {
      return res.redirect("/employee/create");
    }

    try {
      await Employee.create({
        first_name,
        last_name,
        address,
        phone,
        email,
        position,
        department,
        date_of_joining,
        date_of_birth,
      });

      res.redirect("/employee");
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
