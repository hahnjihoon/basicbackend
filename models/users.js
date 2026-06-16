const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      user_id: DataTypes.STRING,
      user_pwd: DataTypes.STRING,
      user_name: DataTypes.STRING,
      user_phone: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_auth: DataTypes.STRING,
      user_del_yn: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      }
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  Users.beforeUpdate((instance, options) => {
    instance.updated_at = new Date();
  });

  return Users;
};
