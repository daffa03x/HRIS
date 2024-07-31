const Recruitment = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const recruitments = await Recruitment.findAll();
      res.render("recruitment/index", { recruitments, alert });
    } catch (error) {
      console.error("Error fetching recruitment:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    res.render("recruitment/create", { alert });
  },
  store: async (req, res) => {
    const { job_title, department } = req.body;
    const posted_date = new Date();
    const status = "Open";
    if (!job_title || !department) {
      req.flash("alertMessage", "Lengkapi semua kolom");
      req.flash("alertStatus", "danger");
      return res.redirect("/recruitment/create");
    }

    try {
      await Recruitment.create({
        job_title,
        department,
        posted_date,
        status,
      });
      req.flash("alertMessage", "Berhasil tambah recruitment");
      req.flash("alertStatus", "success");

      res.redirect("/recruitment");
    } catch (error) {
      console.error("Error creating recruitment:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const recruitment = await Recruitment.findByPk(id);
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("recruitment/edit", { recruitment, alert });
    } catch (error) {
      console.error("Error fetching recruitment:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { job_title, department, posted_date, status } = req.body;
    try {
      await Recruitment.update(
        {
          job_title,
          department,
          posted_date,
          status,
        },
        { where: { job_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah recruitment");
      req.flash("alertStatus", "success");

      res.redirect("/recruitment");
    } catch (error) {
      console.error("Error updating recruitment:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateStatus: async (req, res) => {
    const { id } = req.params;
    let { status } = req.body;
    if (status == "Open") {
      status = "Close";
    } else {
      status = "Open";
    }
    try {
      await Recruitment.update(
        {
          status,
        },
        { where: { job_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/recruitment");
    } catch (error) {
      console.error("Error updating recruitment:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Recruitment.destroy({ where: { job_id: id } });
      req.flash("alertMessage", "Berhasil hapus recruitment");
      req.flash("alertStatus", "success");

      res.redirect("/recruitment");
    } catch (error) {
      console.error("Error deleting recruitment:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
