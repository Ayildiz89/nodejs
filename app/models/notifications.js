module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notifications', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		company_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		},
		read: {
			type: DataTypes.DATE,
			allowNull: true
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
		tableName: 'notifications',
		timestamps: false
	});
};
