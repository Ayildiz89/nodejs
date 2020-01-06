module.exports = function(sequelize, DataTypes) {
	return sequelize.define('company_templates', {
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
			type: DataTypes.STRING(200),
			allowNull: false
		},
		tmp_type: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		tmp_data: {
			type: DataTypes.STRING(10000),
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
		tableName: 'company_templates',
		timestamps: false
	});
};