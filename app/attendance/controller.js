const { Attendance, Employee } = require("./relation");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const attendances = await Attendance.findAll({
        include: [
          {
            model: Employee,
            attributes: ["first_name", "last_name"], // Atribut yang ingin Anda ambil dari Employee
          },
        ],
      });
      res.render("attendance/index", { attendances, alert });
    } catch (error) {
      console.error("Error fetching attendence:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const recruitments = await Recruitment.findAll();

    const alert = { message: alertMessage, status: alertStatus };
    res.render("application/create", { recruitments, alert });
  },
  store: async (req, res) => {
    const { job_id, candidate_name } = req.body;
    const application_date = new Date();
    const status = "Received";
    if (!job_id || !candidate_name) {
      req.flash("alertMessage", "Lengkapi semua kolom");
      req.flash("alertStatus", "danger");
      return res.redirect("/application/create");
    }

    try {
      await Application.create({
        job_id,
        candidate_name,
        application_date,
        status,
      });
      req.flash("alertMessage", "Berhasil tambah application");
      req.flash("alertStatus", "success");

      res.redirect("/application");
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const application = await Application.findByPk(id);
      const recruitments = await Recruitment.findAll();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("application/edit", { application, recruitments, alert });
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { job_id, candidate_name } = req.body;
    try {
      await Application.update(
        {
          job_id,
          candidate_name,
        },
        { where: { application_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah application");
      req.flash("alertStatus", "success");

      res.redirect("/application");
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateStatus: async (req, res) => {
    const { id } = req.params;
    let { status } = req.body;

    try {
      // Log untuk memeriksa data yang diterima
      console.log("Received status:", status);

      // Cek tipe status
      if (Array.isArray(status)) {
        throw new Error("Status must be a string, not an array");
      }

      // Update status pada model Application
      await Application.update({ status }, { where: { application_id: id } });

      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/application");
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Application.destroy({ where: { application_id: id } });
      req.flash("alertMessage", "Berhasil hapus application");
      req.flash("alertStatus", "success");

      res.redirect("/application");
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
