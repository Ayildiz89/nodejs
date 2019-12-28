module.exports = function(sequelize, DataTypes) {
	return sequelize.define('settings', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		company_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		set_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		set_value: {
			type: DataTypes.STRING(500),
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
		tableName: 'settings',
		timestamps: false
	});
};
