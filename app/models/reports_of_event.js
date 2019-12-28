module.exports = function(sequelize, DataTypes) {
	return sequelize.define('reports_of_event', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		create_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		update_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		event_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		value: {
			type: DataTypes.STRING,
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
		tableName: 'reports_of_event',
		timestamps: false
	});
};
