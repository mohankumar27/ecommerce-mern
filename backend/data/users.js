const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "mohan",
    email: "mohan@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "kumar",
    email: "kumar@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
