const collectionName = "users";

const setUsers = (users) =>
  localStorage.setItem(collectionName, JSON.stringify(users));

export const getUsers = () => {
  const usersString = localStorage.getItem(collectionName);
  if (!usersString) return [];
  return JSON.parse(usersString);
};

export const addUser = (user) => {
  let users = getUsers();
  users.push(user);
  setUsers(users);
  return user;
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) return null;
  return user;
};

export const deleteUserByEmail = (email) => {
  let users = getUsers();
  users = users.filter((user) => user.email !== email);
  setUsers(users);
  return users;
};
export const deleteAllUsers = () => setUsers([]);
