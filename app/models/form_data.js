module.exports = function(sequelize, DataTypes) {
	return sequelize.define('form_data', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		company_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		},
		type_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		},
		required: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		element_type_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
		},
		element_label: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		child_data: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	}, {
		tableName: 'form_data',
		timestamps: false
	});
};
