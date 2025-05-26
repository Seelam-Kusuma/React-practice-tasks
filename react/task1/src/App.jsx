import React, { useState } from 'react';
import { employeeData } from './data';

function App() {
  const [stage, setStage] = useState('initial');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleStageChange = (newStage) => {
    setStage(newStage);
    if (newStage !== 'employee_selected') {
      setSelectedEmployee(null);
    }
  };

  const handleEmployeeClick = (emp) => {
    setSelectedEmployee(emp);
    setStage('employee_selected');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Directory</h1>

      
      <nav style={{ marginBottom: '20px' }}>
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => handleStageChange('initial')}
        >
          Root
        </span>

        {(stage !== 'initial') && (
          <>
            {' > '}
            <span
              style={{
                color: stage === 'employee_selected' ? 'blue' : 'gray',
                cursor: 'pointer'
              }}
              onClick={() => handleStageChange('employees_clicked')}
            >
              Employees
            </span>
          </>
        )}

        {stage === 'employee_selected' && selectedEmployee && (
          <>
            {' > '}
            <span style={{ color: 'gray' }}>{selectedEmployee.empname}</span>
          </>
        )}
      </nav>

      
      {stage === 'initial' && (
        <p>
          Click on{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => handleStageChange('root_clicked')}
          >
            Root
          </span>{' '}
          to begin.
        </p>
      )}

      {stage === 'root_clicked' && (
        <p>
          Click on{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => handleStageChange('employees_clicked')}
          >
            Employees
          </span>{' '}
          to view all employee names.
        </p>
      )}

      {stage === 'employees_clicked' && (
        <ul>
          {employeeData.map((emp) => (
            <li key={emp.empid}>
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => handleEmployeeClick(emp)}
              >
                {emp.empname}
              </span>
            </li>
          ))}
        </ul>
      )}

      {stage === 'employee_selected' && selectedEmployee && (
        <div>
          <h3>{selectedEmployee.empname}</h3>
          <p><strong>ID:</strong> {selectedEmployee.empid}</p>
          <p><strong>Salary:</strong> ${selectedEmployee.empsalary}</p>
          <p><strong>Description:</strong> {selectedEmployee.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
