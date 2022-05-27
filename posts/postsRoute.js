const router = require("express").Router();
const { listAll, addOne } = require("./postsController");
const isAuth = require("../middlewares/isAuth");
const validatorCreatePost = require("../validators/posts");

router.get("/", listAll);
router.post("/", isAuth, validatorCreatePost, addOne)
router.post("/", addOne);
module.exports = router

// const router = require("express").Router();
// const { addOne } = require("./postsController");
// const isAuth = require("../middlewares/isAuth")
// // const { router } = require("../users/usersRoute");
// router.post("/", isAuth, addOne)




// module.exports = router