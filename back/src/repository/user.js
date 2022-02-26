const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const save = async ({ email, name, password }) => {
  const newUser = await prisma.user.create({ data: { email, name, password } });
  delete newUser.password;
  return newUser;
};

const getByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: { email },
  });
};

const getByid = async (id) => {
  return await prisma.user.findFirst({
    where: { id },
  });
};

module.exports = {
  save,
  getByEmail,
  getByid,
};
