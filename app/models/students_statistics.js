module.exports = function(sequelize, DataTypes) {
	const aaa = sequelize.define('students_statistics', {
		student_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		company_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		complated: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		willstart: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		continuing: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		total_reports: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	}, {
		tableName: 'students_statistics',
		timestamps: false
	})

	aaa.removeAttribute('id');

	return aaa
};
