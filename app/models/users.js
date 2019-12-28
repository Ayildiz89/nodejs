/* jshint indent: 1 */
/*
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(256),
			allowNull: false
		}
	}, {
		tableName: 'users',
		timestamps: false
	});
};*/
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		last_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		verified_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		is_verified: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		verification_code: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: true
		},
		gender: {
			type: DataTypes.INTEGER,
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
		remember_token: {
			type: DataTypes.STRING(100),
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
		salerate: {
			type: DataTypes.FLOAT(2,2),
			allowNull: true
		},
		lang: {
			type: DataTypes.STRING(5),
			allowNull: true
		}
	}, {
		tableName: 'users',
		timestamps: false
	});
};
