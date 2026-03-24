import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  createAttendance,
  createEmployee,
  getDashboardSummary,
  getEmployeeAttendance,
  getEmployees,
  removeEmployee,
} from './api/client';
import AttendanceForm from './components/attendance/AttendanceForm';
import AttendanceTable from './components/attendance/AttendanceTable';
import DashboardStats from './components/DashboardStats';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeTable from './components/employees/EmployeeTable';
import Card from './components/ui/Card';
import StateMessage from './components/ui/StateMessage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const attendanceSectionRef = useRef(null);
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState('');
  const [employeeSaving, setEmployeeSaving] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState('');
  const [attendanceSaving, setAttendanceSaving] = useState(false);

  const [summary, setSummary] = useState({});
  const [summaryError, setSummaryError] = useState('');

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [attendanceFilterDate, setAttendanceFilterDate] = useState('');

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === selectedEmployeeId),
    [employees, selectedEmployeeId]
  );

  const selectedEmployeePresentDays = useMemo(() => {
    if (!selectedEmployeeId) return 0;
    return attendanceRecords.filter((record) => record.status === 'Present').length;
  }, [attendanceRecords, selectedEmployeeId]);

  const loadEmployees = useCallback(async () => {
    setEmployeesLoading(true);
    setEmployeesError('');
    try {
      await delay(1000);
      const { data } = await getEmployees(); // unwrap axios response
      setEmployees(data);
      setSelectedEmployeeId((prevSelected) => {
        if (data.length === 0) return null;
        if (prevSelected && data.some((employee) => employee.id === prevSelected)) {
          return prevSelected;
        }
        return data[0].id;
      });
    } catch (error) {
      setEmployeesError(error.message);
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  const loadSummary = useCallback(async () => {
    setSummaryError('');
    try {
      const { data } = await getDashboardSummary(); // unwrap axios response
      setSummary(data || {});
    } catch (error) {
      setSummaryError(error.message);
    }
  }, []);

  const loadAttendance = useCallback(async () => {
    if (!selectedEmployeeId) {
      setAttendanceRecords([]);
      return;
    }

    // API expects the string employee_id (e.g. "EMP-001"), not the numeric DB id
    const employee = employees.find((e) => e.id === selectedEmployeeId);
    if (!employee) return;

    setAttendanceLoading(true);
    setAttendanceError('');
    try {
      await delay(1000);
      const { data } = await getEmployeeAttendance(employee.employee_id);
      const filtered = attendanceFilterDate
        ? data.filter((record) => record.date === attendanceFilterDate)
        : data;
      setAttendanceRecords(filtered);
    } catch (error) {
      setAttendanceError(error.message);
    } finally {
      setAttendanceLoading(false);
    }
  }, [attendanceFilterDate, selectedEmployeeId, employees]);

  useEffect(() => {
    loadEmployees();
    loadSummary();
  }, [loadEmployees, loadSummary]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  async function handleCreateEmployee(payload) {
    setEmployeeSaving(true);
    setEmployeesError('');
    try {
      await delay(1000);
      await createEmployee(payload);
      await loadEmployees();
      await loadSummary();
    } catch (error) {
      setEmployeesError(error.message);
      throw error;
    } finally {
      setEmployeeSaving(false);
    }
  }

  async function handleDeleteEmployee(employeeId) {
    const confirmed = window.confirm('Delete this employee and all linked attendance records?');
    if (!confirmed) return;

    setDeletingEmployeeId(employeeId);
    setEmployeesError('');
    try {
      await removeEmployee(employeeId);
      await loadEmployees();
      await loadSummary();
    } catch (error) {
      setEmployeesError(error.message);
    } finally {
      setDeletingEmployeeId(null);
    }
  }

  async function handleCreateAttendance(payload) {
    setAttendanceSaving(true);
    setAttendanceError('');
    try {
      await delay(1000);
      await createAttendance(payload);
      await loadSummary();
      // payload.employee_id is the string like "EMP-001"; find the numeric DB id to keep state consistent
      const employee = employees.find((e) => e.employee_id === payload.employee_id);
      const numericId = employee?.id;
      if (numericId === selectedEmployeeId) {
        await loadAttendance();
      } else {
        setSelectedEmployeeId(numericId ?? null);
      }
    } catch (error) {
      setAttendanceError(error.message);
      throw error;
    } finally {
      setAttendanceSaving(false);
    }
  }

  function handleSelectEmployee(employeeId) {
    setAttendanceFilterDate('');
    if (selectedEmployeeId === employeeId) {
      // Re-fetch for already selected employee — look up string employee_id first
      const employee = employees.find((e) => e.id === employeeId);
      if (!employee) return;
      setAttendanceLoading(true);
      setAttendanceError('');
      getEmployeeAttendance(employee.employee_id)
        .then(({ data }) => setAttendanceRecords(data))
        .catch((error) => setAttendanceError(error.message))
        .finally(() => setAttendanceLoading(false));
    } else {
      setSelectedEmployeeId(employeeId);
    }
    attendanceSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="hero__eyebrow">Human Resource Management</p>
        <h1>Ethara HRMS Lite</h1>
        <p className="hero__subtext">
          Streamlined workforce management and attendance tracking for admin.
        </p>
      </header>

      <main className="main-grid">
        <Card title="Overview" subtitle="Real-time summary across employees and attendance records.">
          {summaryError ? <StateMessage type="error" message={summaryError} /> : null}
          <DashboardStats summary={summary} totalEmployees={employees.length} />
        </Card>

        <div className="two-col-grid">
          <Card
            title="Onboard New Member"
            subtitle="Create a unique employee record with required details."
          >
            <EmployeeForm onSubmit={handleCreateEmployee} loading={employeeSaving} />
          </Card>

          <Card
            title="Register Attendance"
            subtitle="Record one attendance entry per employee per date."
          >
            <AttendanceForm
              employees={employees}
              selectedEmployeeId={selectedEmployeeId}
              onSubmit={handleCreateAttendance}
              loading={attendanceSaving}
            />
          </Card>
        </div>

        <Card
          title="Team Directory"
          subtitle="Select an employee to view attendance, or delete if no longer active."
        >
          {employeesError ? <StateMessage type="error" message={employeesError} /> : null}
          {employeesLoading ? <StateMessage type="loading" message="Loading employees..." /> : null}
          {!employeesLoading && employees.length === 0 ? (
            <StateMessage type="neutral" message="No employees found. Add your first employee to begin." />
          ) : null}
          {!employeesLoading && employees.length > 0 ? (
            <EmployeeTable
              employees={employees}
              selectedEmployeeId={selectedEmployeeId}
              onSelectEmployee={handleSelectEmployee}
              onDelete={handleDeleteEmployee}
              deleting={deletingEmployeeId}
            />
          ) : null}
        </Card>

        <div ref={attendanceSectionRef}>
          <Card
            title="Attendance Records"
            subtitle={
              selectedEmployee
                ? `Showing records for ${selectedEmployee.full_name} (${selectedEmployee.employee_id})`
                : 'Select an employee from the directory to inspect attendance.'
            }
            actions={
              selectedEmployee ? (
                <label className="filter-field">
                  Filter by date
                  <input
                    type="date"
                    value={attendanceFilterDate}
                    onChange={(event) => setAttendanceFilterDate(event.target.value)}
                  />
                </label>
              ) : null
            }
          >
            {selectedEmployee ? (
              <p className="meta-text">Total present days (current filter): {selectedEmployeePresentDays}</p>
            ) : null}
            {attendanceError ? <StateMessage type="error" message={attendanceError} /> : null}
            {selectedEmployeeId && attendanceLoading ? (
              <StateMessage type="loading" message="Loading attendance records..." />
            ) : null}
            {!selectedEmployeeId ? (
              <StateMessage
                type="neutral"
                message="No employee selected. Choose one from the Employee Directory."
              />
            ) : null}
            {selectedEmployeeId && !attendanceLoading && attendanceRecords.length === 0 ? (
              <StateMessage
                type="neutral"
                message="No attendance entries found for this employee and filter."
              />
            ) : null}
            {selectedEmployeeId && !attendanceLoading && attendanceRecords.length > 0 ? (
              <AttendanceTable records={attendanceRecords} />
            ) : null}
          </Card>
        </div>
      </main>
    </div>
  );
}