import { sign } from "../../utils/jwt.js";
import { UsersModel } from "../users/model.js";
import { gmail } from "../../utils/mailer.js";
import { checkAdmin } from "../../utils/checkAdmin.js";
import { customError } from "../../exception/customError.js";
const login = async (req, res, next) => {
  const { email, contact } = req.body;
  const findUser = await UsersModel.findOne({
    where: {
      email,
      contact,
    },
  });
  if (findUser) {
    if (checkAdmin(findUser)) {
      const generateNumber = Math.floor(Math.random() * 1000000000);
      gmail(findUser.email, generateNumber, sign(findUser.user_id));
      res.status(200).json({
        message: "we have sent a link to your email please confirm it",
      });
    } else {
      next(new customError(400, "you are not admin"));
    }
  } else {
    next(new customError(401, "unauthorized"));
  }
};
const userLogin = async (req, res, next) => {
  const { email, contact } = req.body;
  const findUser = await UsersModel.findOne({
    where: {
      email,
      contact,
    },
  });
  if (findUser) {
    res.status(201).json({
      message: "succed",
      token: sign(findUser.user_id),
    });
  } else {
    next(new customError(401, "unauthorized"));
  }
};

const adminToken = (req, res, next) => {
  const { token } = req.params;
  res.status(201).json({
    message: "success",
    token,
  });
};
export { adminToken, login, userLogin };
