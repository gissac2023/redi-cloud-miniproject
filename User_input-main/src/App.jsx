import { useState } from "react";
import { data } from "./data";
import { v4 as uuidv4 } from "uuid";

const UserChallenge = () => {
  const [formData, setFormData] = useState({
    name: " ",
    email: "",
    password: "",
  });
  const [fakeId, setFakeId] = useState("");

  const [users, setUsers] = useState(data);

  const generateFakeId = () => {
    const newFakeId = uuidv4();
    setFakeId(newFakeId);
    return newFakeId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) return;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password.match(passwordRegex)) {
      setFormData({ ...formData, password: "" });
      return;
    }

    const newUser = { id: generateFakeId(), name, email, password };
    const updatedUser = [...users, newUser];
    setUsers(updatedUser);
    setFormData({ name: "", email: "", password: "" });
    console.log(password);
     console.log(updatedUser);
    // add user to the list of existing ones and update state with new array
  };
  //this function below removes each users
  const removeItems = (itemId) => {
    const UserRemoved = users.filter((user) => user.id !== itemId);
    setUsers(UserRemoved);
    console.log(UserRemoved);
  };

  //this function below removes all the users
  const clearAllItems = () => {
    setUsers([]);
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
              <p style={{ fontSize: "10px", color: "red" }}>
                Password must be at least 6 characters long and include at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-block">
            submit
          </button>
        </form>

        {/* form ending */}

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
                    onClick={() => removeItems(id)}
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
              onClick={clearAllItems}
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
