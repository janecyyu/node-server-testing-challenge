exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    { name: "sam" },
    { name: "frodo" },
    { name: "pippin" },
    { name: "merry" },
  ];

  return knex("users").insert(users);
};
