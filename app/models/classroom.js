module.exports = function(sequelize, DataTypes) {
	return sequelize.define('classroom', {
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
		address: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		capacity: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'classroom',
		timestamps: false
	});
};