import { useState } from "react";
import {
  addUser,
  deleteUserByEmail,
  getUserByEmail,
  getUsers,
  deleteAllUsers,
} from "./db";

const invalidPasswordErrorMsg =
  "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";

const UserChallenge = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState(getUsers());
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const { name, email, password } = formData;

    if (!name) setErrorMsg("Name is required");
    if (!email) setErrorMsg("Email is required");
    const userExist = getUserByEmail(email);
    if (userExist) setErrorMsg("User with email exist");
    if (!password) setErrorMsg("Password is required");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password.match(passwordRegex)) setErrorMsg(invalidPasswordErrorMsg);
    if (errorMsg) return;
    const newUser = { name, email, password };
    addUser(newUser);
    setUsers(getUsers());
    setFormData({ name: "", email: "", password: "" });
    // add user to the list of existing ones and update state with new array
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h4>Add User</h4>
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
              required
            />
            {/* Password restrictions */}
            {formData.password && (
              <p style={{ fontSize: "10px", color: "red" }}>{errorMsg}</p>
            )}
          </div>

          <button type="submit" className="btn btn-block">
            submit
          </button>
        </form>

        {users.length === 0 ? (
          <h2>No user available</h2>
        ) : (
          <>
            {users.map((person) => {
              const { id, name, email } = person;
              return (
                <div key={id}>
                  <h4>name: {name}</h4>
                  <h5>email: {email}</h5>

                  <button
                    style={{ marginBottom: "2rem" }}
                    className="btn"
                    onClick={() => {
                      deleteUserByEmail(email);
                      setUsers(getUsers());
                    }}
                  >
                    Remove User
                  </button>
                </div>
              );
            })}
            <button
              style={{ maxWidth: "600px", marginBottom: "2rem" }}
              type="button"
              className="btn btn-block"
              onClick={() => {
                deleteAllUsers();
                setUsers(getUsers());
              }}
            >
              clear all
            </button>
          </>
        )}
        {/*  */}
      </div>
    </>
  );
};
export default UserChallenge;
