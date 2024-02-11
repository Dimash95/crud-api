const users = [
  { id: 1, username: "John", age: 25, hobbies: ["reading", "swimming"] },
  { id: 2, username: "Jane", age: 22, hobbies: ["running", "cooking"] },
];

export const getUser = (req: any, res: any) => {
  res.send(users);
};

export const createUser = (req: any, res: any) => {
  console.log(req.body);

  const user = req.body;
  users.push(user);
  res.send(user);
};
