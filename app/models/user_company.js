module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_company', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		company_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		},
		role_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		}
	}, {
		tableName: 'user_company',
		timestamps: false
	});
};
