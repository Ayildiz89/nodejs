module.exports = function(sequelize, DataTypes) {
	const aaa = sequelize.define('students_status', {
		student_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		class_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		company_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		complated: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		willstart: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		continuing: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		ev_count: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		total_events: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		inspections: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		noinspections: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		total_class_reports: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
	}, {
		tableName: 'students_status',
		timestamps: false
	});

	aaa.removeAttribute('id');

	return aaa
};
