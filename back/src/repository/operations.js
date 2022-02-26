const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createOperation = async (data) => {
  return await prisma.operations.create({ data });
};

const operationByUser = async (userId) => {
  const operations10 = await prisma.operations.findMany({
    take: 10,
    where: { registerId: userId },
  });

  const result = await prisma.operations.findMany({
    where: { registerId: userId },
  });

  const total = result.reduce((acc, ope) => {
    if (ope.type === "ENTRY") {
      return acc + Number(ope.amount);
    }
    return acc - Number(ope.amount);
  }, 0);

  return { operations10, total };
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
