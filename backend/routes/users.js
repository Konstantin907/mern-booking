//importuje se express i postavi se express.Router() i eksportuje
import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import { verifyToken, verifyUser,verifyAdmin } from '../utils/token.js';

const router = express.Router();

//checking auth token get form, svrha je testiranje toke.js-a:
// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("Hello user, you are logged in!")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })




//UPDATE:(owner ili admin moze updatovati)
router.put("/:id",verifyUser, updateUser)
//DELETE:
router.delete("/:id",verifyUser, deleteUser)
//GET ALL:
router.get("/", verifyAdmin,getUser)
//GET SINGLE ONE:
router.get("/:id",verifyUser, getUsers)



export default router;