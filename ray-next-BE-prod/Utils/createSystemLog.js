const { logBookSchema } = require("../Models/logBookModel");

const createSystemLog = async (user_id, action, module_type, description) => {
  await logBookSchema.create({
    user_id,
    action,
    module_type,
    description,
  });
};

module.exports = createSystemLog;
