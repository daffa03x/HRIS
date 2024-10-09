const { Attendance, Employee } = require("./relation");
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const statuses = ["Present", "Sakit", "Izin", "Cuti"];

      const alert = { message: alertMessage, status: alertStatus };
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0); // Mengatur waktu menjadi 00:00:00 hari ini

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999); // Mengatur waktu menjadi 23:59:59 hari ini

      const attendances = await Attendance.findAll({
        where: {
          date: {
            [Op.between]: [todayStart, todayEnd], // Mengambil data dalam rentang hari ini
          },
        },
        include: [
          {
            model: Employee,
            attributes: ["first_name", "last_name"],
          },
        ],
      });
      console.log("data : " + attendances);
      res.render("attendance_day/index", { attendances, statuses, alert });
    } catch (error) {
      console.error("Error fetching attendence:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  create: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const employees = await Employee.findAll();

    const alert = { message: alertMessage, status: alertStatus };
    res.render("attendance_day/create", { employees, alert });
  },
  store: async (req, res) => {
    const { employee_id, check_in, check_out } = req.body;
    const date = new Date();
    const status = "Present";
    if (!employee_id) {
      req.flash("alertMessage", "Lengkapi semua kolom");
      req.flash("alertStatus", "danger");
      return res.redirect("/attendance-day/create");
    }

    try {
      await Attendance.create({
        employee_id,
        date,
        check_in,
        check_out,
        status,
      });
      req.flash("alertMessage", "Berhasil absen");
      req.flash("alertStatus", "success");

      res.redirect("/attendace-day");
    } catch (error) {
      console.error("Error creating attendace day:", error);
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
      res.render("attendance_day/edit", { attendances, employees, alert });
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { employee_id, check_in, check_out } = req.body;
    try {
      await Attendance.update(
        {
          employee_id,
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

      res.redirect("/attendance-day");
    } catch (error) {
      console.error("Error updating attendance day status:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      await Attendance.destroy({ where: { attendance_id: id } });
      req.flash("alertMessage", "Berhasil hapus absen");
      req.flash("alertStatus", "success");

      res.redirect("/attendance-day");
    } catch (error) {
      console.error("Error deleting absen:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
