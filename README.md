# Backend

Express, Sequelize, PostgreSQL 기반의 기본 백엔드 서버입니다.

## 실행 환경

- Node.js
- npm
- PostgreSQL

## 설치

```bash
npm install
```

## DB 설정

현재 개발 환경 DB 설정은 [config/config.json](config/config.json)에 있습니다.

기본 개발 설정은 다음 기준으로 되어 있습니다.

- host: `127.0.0.1`
- port: `5432`
- database: `postgres`
- dialect: `postgres`

로컬 PostgreSQL 접속 정보가 다르면 `config/config.json`의 `development` 값을 본인 환경에 맞게 수정합니다.

서버 실행 시 `sequelize.sync({ alter: true })`가 실행되어 `models/users.js` 모델 기준으로 테이블을 자동 생성 또는 변경합니다.

## 실행

```bash
npm start
```

또는:

```bash
node app.js
```

서버 기본 주소:

```text
http://localhost:8000
```

## 확인

브라우저 또는 API 클라이언트에서 아래 주소를 확인합니다.

```text
GET http://localhost:8000/
```

정상 실행 시 다음 응답을 반환합니다.

```text
Backend Server is Running and DB is Synced!
```

## API

### 사용자 목록 조회

```text
GET /users
```

등록된 사용자 목록을 JSON으로 반환합니다.

### 사용자 단건 조회

```text
GET /users/one/:user_id
```

예시:

```text
GET http://localhost:8000/users/one/testuser
```

`user_id`가 일치하는 사용자 정보를 JSON으로 반환합니다.

## 주요 폴더 구조

```text
backend/
├─ app.js
├─ package.json
├─ config/
│  └─ config.json
├─ models/
│  ├─ index.js
│  └─ users.js
├─ routes/
│  └─ users.js
└─ public/
```

## 프론트엔드 연동

현재 CORS 허용 origin은 다음 값으로 설정되어 있습니다.

```text
http://localhost:3000
```

프론트엔드 주소가 다르면 [app.js](app.js)의 CORS 설정에서 `origin` 값을 수정합니다.

## 참고

현재 세션 쿠키 설정은 `sameSite: "none"`, `secure: true`입니다. 일반 `http://localhost` 환경에서는 브라우저가 secure cookie를 저장하지 않을 수 있으므로, 세션이 필요한 기능을 테스트할 때는 HTTPS 환경을 쓰거나 로컬 개발용 쿠키 설정을 따로 조정해야 합니다.

`node_modules`는 저장소에 올리지 않고, 새 환경에서는 `npm install`로 다시 설치합니다.
