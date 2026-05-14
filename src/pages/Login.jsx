import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages/Login.css";

function Login() {
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({
    email: "student@university.com",
    password: "student123",
  });
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    const result = login(form);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card panel">
        <div className="login-brand">
          <div>
            <h1>Student Task Management System</h1>
            <p>
              Login to manage your academic tasks and track your progress.
            </p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="login-email">Email</label>
            <div className="login-input">
              <input
                id="login-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="login-password">Password</label>
            <div className="login-input">
              <input
                id="login-password"
                type="password"
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
