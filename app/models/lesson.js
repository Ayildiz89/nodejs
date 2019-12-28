module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lesson', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		count: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(60),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(100),
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
		tableName: 'lesson',
		timestamps: false
	});
};
