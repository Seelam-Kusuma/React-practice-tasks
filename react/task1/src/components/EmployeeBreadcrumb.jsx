import React from 'react';

function EmployeeBreadcrumb({ employee }) {
  return (
    <nav style={{ marginBottom: '10px' }}>
      <span>Employees</span>
      {" > "}
      <span>{employee.empname}</span>
      {" > "}
      <span>{employee.empid}</span>
      <div style={{ marginLeft: '20px' }}>
        <p><strong>Salary:</strong> ${employee.empsalary}</p>
        <p><strong>Description:</strong> {employee.description}</p>
      </div>
      <hr />
    </nav>
  );
}

export default EmployeeBreadcrumb;
