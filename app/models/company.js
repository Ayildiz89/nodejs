module.exports = function(sequelize, DataTypes) {
	return sequelize.define('company', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		logo: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		tel: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		country: {
			type: DataTypes.STRING(2),
			allowNull: true
		},
		city: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		postcode: {
			type: DataTypes.STRING(7),
			allowNull: true
		},
		street: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		houseno: {
			type: DataTypes.STRING(7),
			allowNull: true
		},
		accountname: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		iban: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		bic: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		bank: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		plan: {
			type: DataTypes.BOOLEAN,
			allowNull: true
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
		tableName: 'company',
		timestamps: false
	});
};
