module.exports = function(sequelize, DataTypes) {
	return sequelize.define('event_users', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		event_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
	}, {
		tableName: 'event_users',
		timestamps: false
	});
};
