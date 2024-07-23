const db = require("../../db/mysql2");

module.exports = {
  index: async (req, res) => {
    try {
      const queryEmployee = "SELECT COUNT(*) AS count FROM employees";
      const queryEmployeeMonth = `
      SELECT COUNT(*) AS count 
      FROM employees 
      WHERE MONTH(date_of_joining) = MONTH(CURDATE()) 
      AND YEAR(date_of_joining) = YEAR(CURDATE())
    `;
      const queryPayrollYear = `
    SELECT 
      SUM(salary) AS total_amount, 
      SUM(bonus) AS total_bonus, 
      SUM(deductions) AS total_deduction 
    FROM payroll 
    WHERE YEAR(pay_date) = YEAR(CURDATE())
  `;
      const queryPositionOpen = `SELECT COUNT(*) AS count FROM recruitment WHERE status = 'open'`;

      const [employeeMonth] = await db.query(queryEmployeeMonth);
      const [employee] = await db.query(queryEmployee);
      const [payrollYear] = await db.query(queryPayrollYear);
      const [positionOpen] = await db.query(queryPositionOpen);

      const employeeMonthCount = employeeMonth[0].count;
      const employeeCount = employee[0].count;
      const totalAmount = payrollYear[0].total_amount || 0;
      const totalBonus = payrollYear[0].total_bonus || 0;
      const totalDeduction = payrollYear[0].total_deduction || 0;
      const totalPayroll = parseFloat(totalAmount) + parseFloat(totalBonus) - parseFloat(totalDeduction);
      const positionOpenCount = positionOpen[0].count;

      res.render("dashboard/index", { employeeCount, employeeMonthCount, totalPayroll, positionOpenCount });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
