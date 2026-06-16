var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");

// [핵심] models/index.js를 불러옵니다. (DB 지휘본부)
const { sequelize } = require("./models"); 

// 라우터 설정
const usersRouter = require("./routes/users");

var app = express();

// --- 데이터베이스 자동 생성 및 연결 ---
// sync({ alter: true })는 모델(users.js 등)과 DB를 비교해서 없으면 만들고, 
// 컬럼이 바뀌었으면 알아서 업데이트해줍니다.
sequelize.sync({ alter: true })
  .then(() => {
    console.log("========================================");
    console.log("✅ PostgreSQL 연결 및 테이블 생성 완료!");
    console.log("========================================");
    console.log(`Server is running on http://localhost:${port}`);
  })
  .catch((err) => {
    console.error("❌ DB 동기화 중 에러 발생:", err);
  });
// --------------------------------------

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// public 폴더를 정적 파일 경로로 제공
// public 안에 html, css, js, 이미지 등을 넣으면 URL로 직접 접근 가능
// 백엔드 API만 사용할 경우 public 폴더와 이 설정은 제거 가능
// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  session({
    secret: "@backend",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "none",
      httpOnly: true,
      secure: true
    }
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  })
);

// 라우터 연결
app.use("/users", usersRouter);

// 메인 페이지 확인용
app.get("/", function (req, res) {
  res.send("Backend Server is Running and DB is Synced!");
});


app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// 서버 포트 설정 (8000번)
const port = 8000;
app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 돌아가는 중입니다. test`);
});

module.exports = app;