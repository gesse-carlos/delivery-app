'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'users',
    },
  );

  Users.associate = (model) => {
    Users.hasMany(model.Sales, { foreignKey: 'userId', as: 'user' });
    Users.hasMany(model.Sales, { foreignKey: 'sellerId', as: 'seller' });
  };

  return Users;
};