const { Payroll, Employee } = require("./relation");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payrolls = await Payroll.findAll({
        include: [
          {
            model: Employee,
            attributes: ["first_name", "last_name"], // Atribut yang ingin Anda ambil dari Employee
          },
        ],
      });
      res.render("payroll/index", { payrolls, alert });
    } catch (error) {
      console.error("Error fetching payroll:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const employees = await Employee.findAll();

    const alert = { message: alertMessage, status: alertStatus };
    res.render("payroll/create", { employees, alert });
  },
  store: async (req, res) => {
    const { employee_id, salary, bonus, deductions } = req.body;
    const pay_date = new Date();
    if (!employee_id || !salary) {
      req.flash("alertMessage", "Lengkapi semua kolom");
      req.flash("alertStatus", "danger");
      return res.redirect("/payroll/create");
    }

    try {
      await Payroll.create({
        employee_id,
        salary,
        bonus,
        deductions,
        pay_date,
      });
      req.flash("alertMessage", "Berhasil tambah payroll");
      req.flash("alertStatus", "success");

      res.redirect("/payroll");
    } catch (error) {
      console.error("Error creating payrool:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const payroll = await Payroll.findByPk(id);
      const employees = await Employee.findAll();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("payroll/edit", { payroll, employees, alert });
    } catch (error) {
      console.error("Error fetching payroll:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { employee_id, salary, bonus, deductions } = req.body;
    try {
      await Payroll.update(
        {
          employee_id,
          salary,
          bonus,
          deductions,
        },
        { where: { payroll_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah payroll");
      req.flash("alertStatus", "success");

      res.redirect("/payroll");
    } catch (error) {
      console.error("Error updating payroll:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Payroll.destroy({ where: { payroll_id: id } });
      req.flash("alertMessage", "Berhasil hapus payroll");
      req.flash("alertStatus", "success");

      res.redirect("/payroll");
    } catch (error) {
      console.error("Error deleting payroll:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
