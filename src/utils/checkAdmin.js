import { PositionsModel } from "../modules/positions/model.js";

const checkAdmin = (user) => (user.role == "admin" ? true : false);
const checkAccounter = async (user) => {
  const accounter = await PositionsModel.findByPk(user.pos_ref_id);
  if (accounter.pos_name == "hisobchi") {
    return { status: true, pos_id: accounter.pos_id };
  }
  return false;
};
const checkTeacher = async (user) => {
  const teacher = await PositionsModel.findByPk(user.pos_ref_id);
  if (teacher.pos_name == "o'qituvchi") {
    return { status: true, pos_id: teacher.pos_id };
  }
  return false;
};
const checkStudent = async (user) => {
  const student = await PositionsModel.findByPk(user.pos_ref_id);
  if (student.pos_name == "o'quvchi") {
    return { status: true, pos_id: student.pos_id };
  }
  return false;
};
export { checkAdmin, checkTeacher, checkAccounter, checkStudent };
