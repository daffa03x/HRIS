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
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await Employee.findByPk(id);
      res.render("employee/edit", { employee });
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address, phone, email, position, department, date_of_joining, date_of_birth } = req.body;
    try {
      await Employee.update(
        {
          first_name,
          last_name,
          address,
          phone,
          email,
          position,
          department,
          date_of_joining,
          date_of_birth,
        },
        { where: { employee_id: id } }
      );
      res.redirect("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Employee.destroy({ where: { employee_id: id } });
      res.redirect("/employee");
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
