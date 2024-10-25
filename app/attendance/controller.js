const { Attendance, Employee } = require("../relation/RelationABCEPPT");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const statuses = ["Present", "Sakit", "Izin", "Cuti"];

      const alert = { message: alertMessage, status: alertStatus };
      const attendances = await Attendance.findAll({
        include: [
          {
            model: Employee,
            attributes: ["first_name", "last_name"], // Atribut yang ingin Anda ambil dari Employee
          },
        ],
      });
      res.render("attendance/index", { attendances, statuses, alert });
    } catch (error) {
      console.error("Error fetching attendence:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const attendances = await Attendance.findByPk(id);
      const employees = await Employee.findAll();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("attendance/edit", { attendances, employees, alert });
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { employee_id, date, check_in, check_out } = req.body;
    try {
      await Attendance.update(
        {
          employee_id,
          date,
          check_in,
          check_out,
        },
        { where: { attendance_id: id } }
      );
      req.flash("alertMessage", "Berhasil ubah Attendance");
      req.flash("alertStatus", "success");

      res.redirect("/attendance");
    } catch (error) {
      console.error("Error updating Attendance:", error);
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
      await Attendance.update({ status }, { where: { attendance_id: id } });

      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/attendance");
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Attendance.destroy({ where: { attendance_id: id } });
      req.flash("alertMessage", "Berhasil hapus absen");
      req.flash("alertStatus", "success");

      res.redirect("/attendance");
    } catch (error) {
      console.error("Error deleting absen:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
