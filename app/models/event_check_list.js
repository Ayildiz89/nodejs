module.exports = function(sequelize, DataTypes) {
	return sequelize.define('event_check_list', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		check_list_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		events_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
	}, {
		tableName: 'event_check_list',
		timestamps: false
	});
};
