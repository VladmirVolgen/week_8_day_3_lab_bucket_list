use bucket_list;
db.dropDatabase();

db.list.insertMany([
  {
    name: "Create a full-stack web app",
    completed: false
  },
  {
    name: "Climb the Mount Everest",
    completed: true
  },
  {
    name: "Go to Brazil",
    completed: true
  },

]);
