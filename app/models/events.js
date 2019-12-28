module.exports = function(sequelize, DataTypes) {
	return sequelize.define('events', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		class_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		teacher_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		classroom_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
		},
		start: {
			type: DataTypes.DATE,
			allowNull: true
		},
		end: {
			type: DataTypes.DATE,
			allowNull: true
		},
		allday: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		color: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'events',
		timestamps: false
	});
};
