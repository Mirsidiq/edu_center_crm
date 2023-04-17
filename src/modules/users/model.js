import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { IncomesModel } from "../incomes/model.js";
const UsersModel=sequelize.define("users",{
  user_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 pos_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 first_name:{
  type:DataTypes.STRING(20),
  allowNull:false
 },
 last_name:{
  type:DataTypes.STRING(20),
  allowNull:false
 },
 gender:{
  type: ENUM("1","2"),
  allowNull:false,
  get() {
    let rawValue = this.getDataValue('gender');
    return rawValue==1 ? rawValue="male" : rawValue="female";
  },
  set(value) {
    this.setDataValue('gender',value);
  }
 },
 contact:{
  type:DataTypes.STRING(15),
  allowNull:false,
  unique:true,
  validate:{
    is:/^\+?[1-9][0-9]{7,11}$/
  }
 },
 email:{
  type:DataTypes.STRING(64),
  allowNull:false,
  validate:{
    isEmail:true
  }
 },
 come_date:{
  type:DataTypes.DATE,
  allowNull:false,
  defaultValue:DataTypes.NOW
 },
 left_date:{
  type:DataTypes.DATE,
 },
 group_ref_id:{
  type:DataTypes.BIGINT,
 },

 role:{
  type:DataTypes.ENUM("user","admin"),
 }
},
{
  timestamps:false,
  freezeTableName:true,
})
UsersModel.hasMany(IncomesModel,{
  foreignKey:"user_ref_id"
})
IncomesModel.belongsTo(UsersModel,{
  foreignKey:"user_ref_id"
})

export{
  UsersModel
}