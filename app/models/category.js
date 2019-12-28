module.exports = function(sequelize, DataTypes) {
	return sequelize.define('category', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		company_id: {
			type: DataTypes.INTEGER(10),
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
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
	}, {
		tableName: 'category',
		timestamps: false
	});
};