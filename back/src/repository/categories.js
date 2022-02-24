const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createCategory = async (data) => {
  return await prisma.category.create({ data });
};

const categoryByUser = async (userId) => {
  return await prisma.category.findMany({
    where: { registerId: userId },
  });
};

const getByIdCategory = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const update = async (id, dataOperation) => {
  return await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: dataOperation,
  });
};

const remove = async (id) => {
  return await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createCategory,
  categoryByUser,
  getByIdCategory,
  update,
  remove,
};
