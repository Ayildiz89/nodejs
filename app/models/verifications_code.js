module.exports = function(sequelize, DataTypes) {
    return sequelize.define('verifications_code',{
        id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		created_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
        },
        code: {
			type: DataTypes.STRING(1000),
			allowNull: false,
        },
        version: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
    });
}