const Employee = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const employees = await Employee.findAll();
      res.render("employee/index", { employees, alert });
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    res.render("employee/create", { alert });
  },
  store: async (req, res) => {
    const { first_name, last_name, address, phone, email, position, department, date_of_joining, date_of_birth } = req.body;

    if (!first_name || !last_name || !address || !phone || !email || !position || !department || !date_of_joining || !date_of_birth) {
      req.flash("alertMessage", "Lengkapi semua kolom");
      req.flash("alertStatus", "danger");
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
      req.flash("alertMessage", "Berhasil tambah pegawai");
      req.flash("alertStatus", "success");

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
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("employee/edit", { employee, alert });
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
      req.flash("alertMessage", "Berhasil ubah pegawai");
      req.flash("alertStatus", "success");

      res.redirect("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await Employee.findByPk(id);

      res.render("employee/show", { employee });
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Employee.destroy({ where: { employee_id: id } });
      req.flash("alertMessage", "Berhasil hapus pegawai");
      req.flash("alertStatus", "success");

      res.redirect("/employee");
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
