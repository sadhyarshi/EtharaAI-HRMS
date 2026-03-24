import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'https://hrms-dbqd.onrender.com',
    headers: { 'Content-Type': 'application/json' }
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const data = error.response?.data;
        const validationErrors = data?.detail?.map(e => e.msg).join(', ');
        const message = validationErrors || data?.message || error.message || 'Something went wrong.';
        console.error('API Error:', message);
        const enhancedError = new Error(message);
        enhancedError.status = error.response?.status;
        enhancedError.details = data;
        return Promise.reject(enhancedError);
    }
);

// ── Employees ─────────────────────────────────────────────────────
// GET /employees → returns Employee[]
// { id, employee_id, full_name, email, department }
export const getEmployees = () => API.get('/employees');

// POST /employees → body: { employee_id, full_name, email, department }
export const addEmployee = (payload) => API.post('/employees', payload);
export const createEmployee = addEmployee;

// DELETE /employees/{id} → id is the numeric database id
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const removeEmployee = deleteEmployee;

// GET /employees/present-days → returns present days summary per employee
export const getPresentDays = () => API.get('/employees/present-days');

// ── Attendance ────────────────────────────────────────────────────
// POST /attendance → body: { employee_id (string), date (YYYY-MM-DD), status (string) }
export const markAttendance = (payload) => API.post('/attendance', {
    employee_id: String(payload.employee_id),
    date: payload.date,
    status: payload.status,
});
export const createAttendance = markAttendance;

// GET /attendance/{employee_id} → employee_id is string like "001"
export const getAttendance = (employeeId) => API.get(`/attendance/${String(employeeId)}`);
export const getEmployeeAttendance = getAttendance;

// ── Dashboard ─────────────────────────────────────────────────────
// GET /dashboard → returns summary stats
export const getDashboard = () => API.get('/dashboard');
export const getDashboardSummary = getDashboard;

// ── Health ────────────────────────────────────────────────────────
export const getHealth = () => API.get('/health');

export default API;