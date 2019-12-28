module.exports = function(sequelize, DataTypes) {
	return sequelize.define('reports', {
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
		company_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		student_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		check_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		event_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		type_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		report_type: {
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
		tableName: 'reports',
		timestamps: false
	});
};
