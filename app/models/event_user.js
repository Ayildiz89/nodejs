module.exports = function(sequelize, DataTypes) {
	return sequelize.define('event_user', {
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
		events_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
	}, {
		tableName: 'event_user',
		timestamps: false
	});
};
