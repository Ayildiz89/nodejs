module.exports = function(sequelize, DataTypes) {
	return sequelize.define('check_list', {
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
		name: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		type_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		allclass: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		isrequired: {
			type: DataTypes.BOOLEAN,
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
		tableName: 'check_list',
		timestamps: false
	});
};
