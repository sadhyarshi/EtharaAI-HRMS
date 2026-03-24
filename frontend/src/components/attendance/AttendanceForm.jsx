import { useEffect, useMemo, useState } from 'react';

const INITIAL_FORM = {
  employee_id: '',
  date: '',
  status: 'Present',
};

export default function AttendanceForm({ employees, selectedEmployeeId, onSubmit, loading }) {
  // selectedEmployeeId is the numeric DB id — resolve it to the string employee_id on init
  const resolveEmployeeId = (numericId) => {
    if (!numericId) return '';
    const found = employees.find((e) => e.id === numericId);
    return found ? found.employee_id : '';
  };

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    employee_id: resolveEmployeeId(selectedEmployeeId),
  });

  useEffect(() => {
    if (!selectedEmployeeId) return;
    const stringId = resolveEmployeeId(selectedEmployeeId);
    if (stringId) setForm((prev) => ({ ...prev, employee_id: stringId }));
  }, [selectedEmployeeId, employees]);

  const isComplete = useMemo(() => form.employee_id && form.date && form.status, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await onSubmit({
        employee_id: form.employee_id, // string like "EMP-001" as API expects
        date: form.date,
        status: form.status,
      });
      setForm((prev) => ({ ...prev, date: '', status: 'Present' }));
    } catch {
      // Keep entered values when submission fails.
    }
  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      <label>
        Employee
        <select
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          required
          disabled={loading || employees.length === 0}
        >
          <option value="">Select employee</option>
          {employees.map((employee) => (
            // value is string employee_id — what the API expects
            <option key={employee.id} value={employee.employee_id}>
              {employee.employee_id} - {employee.full_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          max={new Date().toISOString().split('T')[0]}
        />
      </label>
      <label>
        Status
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </label>
      <button className="button button--primary" type="submit" disabled={!isComplete || loading}>
        {loading ? 'Saving...' : 'Confirm Attendance'}
      </button>
    </form>
  );
}