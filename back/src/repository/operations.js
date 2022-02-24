const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createOperation = async (data) => {
  return await prisma.operations.create({ data });
};

const operationByUser = async (userId) => {
  return await prisma.operations.findMany({
    take: 10,
    where: { registerId: userId },
  });
};

const getByIdOperation = async (id) => {
  return await prisma.operations.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const update = async (id, dataOperation) => {
  return await prisma.operations.update({
    where: {
      id: Number(id),
    },
    data: dataOperation,
  });
};

const remove = async (id) => {
  return await prisma.operations.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createOperation,
  operationByUser,
  getByIdOperation,
  update,
  remove,
};
