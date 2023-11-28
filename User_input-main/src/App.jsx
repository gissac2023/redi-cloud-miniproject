import { useState } from "react";
import myImage from "../redi_banner.png";
import {
  addUser,
  deleteUserByEmail,
  getUserByEmail,
  getUsers,
  deleteAllUsers,
} from "../db";

const invalidPasswordErrorMsg =
  "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";

const UserChallenge = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    group: "",
  });

  const [users, setUsers] = useState(getUsers());
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const { name, email, password, group } = formData;

    if (!name) setErrorMsg("Name is required");
    if (!email) setErrorMsg("Email is required");
    const userExist = getUserByEmail(email);
    if (userExist) setErrorMsg("User with email exist");
    if (!password) setErrorMsg("Password is required");
    // Check if group is selected
    if (!group) setErrorMsg("Please select a group");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password.match(passwordRegex)) setErrorMsg(invalidPasswordErrorMsg);
    if (errorMsg) return;
    const newUser = { name, email, password, group };
    addUser(newUser);
    setUsers(getUsers());
    setFormData({ name: "", email: "", password: "", group: "" });
    // Add user to the list of existing ones and update state with the new array
  };
  // Add a function to edit user details
  const editUserByEmail = (email) => {
    const userToEdit = getUserByEmail(email);
    if (userToEdit) {

       deleteUserByEmail(email);
      // Set the form data to the user's details for editing
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        password: userToEdit.password,
        group:userToEdit.group
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <>
      <div>
        <img src={myImage} alt="Description of the image" />
        <form className="form" onSubmit={handleSubmit}>
          <h2>Cloud Computing Fall 2023 Database</h2>

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
          {/* radio button */}
          <div className="form-row">
            <label className="form-label">Select Group:</label>
            <div className="form-input">
              <input
                type="radio"
                id="group"
                name="group"
                value="1"
                onChange={handleChange}
                checked={formData.group === "1"}
                required
              />

              <label htmlFor="group1">Group 1</label>
              <input
                type="radio"
                id="group"
                name="group"
                value="2"
                onChange={handleChange}
                checked={formData.group === "2"}
                required
              />
              <label htmlFor="group2">Group 2</label>
            </div>
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
              const { id, name, email, group } = person;
              return (
                <div key={id}>
                  <h4>name: {name}</h4>
                  <h4>email: {email}</h4>
                  <h4>group: {group}</h4>
                  <div className=" btn_user">
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
                    <button
                      style={{ marginBottom: "2rem", marginRight: "1rem" }}
                      className="btn"
                      onClick={() => {
                        editUserByEmail(email); // Call the editUserByEmail function
                      }}
                    >
                      Edit User
                    </button>
                  </div>
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
