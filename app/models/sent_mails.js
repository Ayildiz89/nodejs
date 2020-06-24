module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sent_mails',{
        id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		plattform_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
        },
        email_id: {
			type: DataTypes.STRING(255),
			allowNull: true,
        },
        to_email: {
			type: DataTypes.STRING(255),
			allowNull: true,
        },
        sending_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
        },
        status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
        },
        template: {
			type: DataTypes.STRING(255),
			allowNull: true,
        },
        context_email: {
			type: DataTypes.STRING(255),
			allowNull: true,
        },
        sending_company_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
        },
        template_version: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
        },
    }, {
		tableName: 'sent_mails',
		timestamps: false
	});
}