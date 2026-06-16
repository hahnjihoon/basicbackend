const Sequelize = require("sequelize");
const config = require("../config/config.json");

// config.json에서 사용할 섹션을 선택 (development)
const dbConfig = config.development;

// 변수들을 안전하게 추출
const username = dbConfig.username;
const password = dbConfig.password;
const database = dbConfig.database;
const host = dbConfig.host;
const port = dbConfig.port || 5432; // 여기서 직접 5432를 넣어서 에러 방지

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "postgres", // PostgreSQL 설정
  logging: false,
  timezone: "+09:00",
  dialectOptions: {
    useUTC: false
  }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 등록
db.Users = require("./users")(sequelize, Sequelize.DataTypes);

module.exports = db;