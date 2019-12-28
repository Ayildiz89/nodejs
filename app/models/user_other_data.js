module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_other_data', {
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
		form_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		},
		other_data: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		child_data: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
	}, {
		tableName: 'user_other_data',
		timestamps: false
	});
};
