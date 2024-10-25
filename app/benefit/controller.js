const { Benefit, Employee } = require("../relation/RelationABCEPPT");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const benefits = await Benefit.findAll({
        include: [
          {
            model: Employee,
            attributes: ["first_name", "last_name"], // Atribut yang ingin Anda ambil dari Employee
          },
        ],
      });
      res.render("benefit/index", { benefits, alert });
    } catch (error) {
      console.error("Error fetching Benefit:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const employees = await Employee.findAll();

    const alert = { message: alertMessage, status: alertStatus };
    res.render("benefit/create", { employees, alert });
  },
  store: async (req, res) => {
    const { employee_id, benefit_type, start_date, end_date } = req.body;
    const status = "Active";
    if (!employee_id || !benefit_type || !start_date || !end_date) {
      req.flash("alertMessage", "Lengkapi semua kolom");
      req.flash("alertStatus", "danger");
      return res.redirect("/Benefit/create");
    }

    try {
      await Benefit.create({
        employee_id,
        benefit_type,
        start_date,
        end_date,
        status,
      });
      req.flash("alertMessage", "Berhasil tambah Benefit");
      req.flash("alertStatus", "success");

      res.redirect("/benefit");
    } catch (error) {
      console.error("Error creating payrool:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const benefit = await Benefit.findByPk(id);
      const employees = await Employee.findAll();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("benefit/edit", { benefit, employees, alert });
    } catch (error) {
      console.error("Error fetching Benefit:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { employee_id, benefit_type, start_date, end_date } = req.body;
    try {
      await Benefit.update(
        {
          employee_id,
          benefit_type,
          start_date,
          end_date,
        },
        { where: { benefit_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah Benefit");
      req.flash("alertStatus", "success");

      res.redirect("/benefit");
    } catch (error) {
      console.error("Error updating Benefit:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateStatus: async (req, res) => {
    const { id } = req.params;
    let { status } = req.body;
    if (status == "Active") {
      status = "Non Active";
    } else {
      status = "Active";
    }
    try {
      await Benefit.update(
        {
          status,
        },
        { where: { benefit_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/benefit");
    } catch (error) {
      console.error("Error updating Benefit:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Benefit.destroy({ where: { benefit_id: id } });
      req.flash("alertMessage", "Berhasil hapus Benefit");
      req.flash("alertStatus", "success");

      res.redirect("/benefit");
    } catch (error) {
      console.error("Error deleting Benefit:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
