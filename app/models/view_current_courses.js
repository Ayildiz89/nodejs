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
		statu: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		}
		/*color: {
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
		},*/
	}, {
		tableName: 'current_classes',
		timestamps: false
	});
};
