module.exports = function(sequelize, DataTypes) {
	return sequelize.define('current_classes', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		company_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		start: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finish: {
			type: DataTypes.DATE,
			allowNull: false
		},
		lesson_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		teacher_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		color: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		inspection: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		is_archived: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		stupri: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		teapri: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		complated_events: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		classroom_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		total_students: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		statu: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		events_count: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		}
	}, {
		tableName: 'current_classes',
		timestamps: false
	});
};