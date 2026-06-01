import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask } from '../services/api';
// Add this import at the top if not already present

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks]         = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [loadingInit, setLoadingInit]   = useState(true);
  const [creating, setCreating]   = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [formError, setFormError]   = useState('');

  // Derive user display name from localStorage if available
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  })();
  const displayName = storedUser?.name || storedUser?.email || 'user';

  // ── Fetch tasks ──────────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setFetchError('');
    try {
      const res = await getTasks();
      // Handle { data: [...] } or { tasks: [...] } or plain array
      const list =
        res.data?.data ||
        res.data?.tasks ||
        (Array.isArray(res.data) ? res.data : []);
      setTasks(list);
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? 'Session expired. Please log in again.'
          : err.response?.data?.message || 'Failed to load tasks.';
      setFetchError(msg);
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoadingInit(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── Create task ──────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError('');

    const title = taskInput.trim();
    if (!title) { setFormError('Task title cannot be empty.'); return; }

    setCreating(true);
    try {
      const res = await createTask({ title });
      const newTask = res.data?.data || res.data?.task || res.data;
      setTasks((prev) => [newTask, ...prev]);
      setTaskInput('');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to create task.';
      setFormError(msg);
    } finally {
      setCreating(false);
    }
  };

  // ── Delete task ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id && t.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getTaskId   = (t) => t._id || t.id;
  const getTaskTitle = (t) => t.title || t.name || t.description || '(untitled)';
  const getTaskDate  = (t) => {
    const raw = t.createdAt || t.created_at;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
    });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  if (loadingInit) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        loading tasks…
      </div>
    );
  }

  return (
    <div className="dash-shell">
      {/* Header */}
      <header className="dash-header">
  <div className="dash-header-left">
    <span className="dash-wordmark">TaskApp</span>
    <span className="dash-user">{displayName}</span>
  </div>

  <div style={{ display: "flex", gap: "10px" }}>
    {localStorage.getItem("role") === "ADMIN" && (
      <button
        className="btn btn-primary"
        onClick={() => navigate("/admin")}
      >
        Admin Panel
      </button>
    )}

    <button className="btn btn-ghost" onClick={handleLogout}>
      Logout
    </button>
  </div>
</header>

      {/* Main */}
      <main className="dash-main">
        {/* Create form */}
        <form className="task-form" onSubmit={handleCreate}>
          <div className="field" style={{ marginBottom: 0, flex: 1 }}>
            <label htmlFor="taskInput">New task</label>
            <input
              id="taskInput"
              className="task-form-input"
              type="text"
              placeholder="What needs to be done?"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              disabled={creating}
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={creating}
            style={{ width: 'auto', marginTop: 22, flexShrink: 0 }}
          >
            {creating ? <span className="spinner" /> : '+ Add'}
          </button>
        </form>

        {formError && (
          <div className="alert alert-error" style={{ marginTop: -8 }}>
            {formError}
          </div>
        )}

        {fetchError && (
          <div className="alert alert-error">{fetchError}</div>
        )}

        {/* Task list */}
        <div className="section-label">
          Tasks
          <span className="count-badge">{tasks.length}</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet — add one above.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => {
              const id   = getTaskId(task);
              const date = getTaskDate(task);
              return (
                <div className="task-item" key={id}>
                  <span className="task-text">{getTaskTitle(task)}</span>
                  {date && <span className="task-meta">{date}</span>}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(id)}
                    disabled={deletingId === id}
                    aria-label="Delete task"
                  >
                    {deletingId === id ? <span className="spinner" style={{ width: 12, height: 12 }} /> : 'Delete'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
