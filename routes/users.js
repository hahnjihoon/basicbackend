var express = require("express");
var router = express.Router();

const db = require("../models/index");
const { Users } = db;

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

router.get("/one/:user_id", async (req, res) => {
  const { user_id } = req.params;
  console.log("유저조회1 :: ", user_id);
  try {
    const users = await Users.findOne({
      where: {
        user_id: user_id
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

module.exports = router;
