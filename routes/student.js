const express=require('express')
const router=express.Router()

const{loginstudent}=require('../controllers/authenication')
const {authenticateUser,
    authorizePermissions}=require('../middleware/checkpermission')
const{removesubject,getallsubjects,getsinglesubject}=require('../controllers/admin')
const{addsubject,getstusubject}=require('../controllers/student')
router.post('/login',loginstudent);
router.route('/addsubject').post(authenticateUser,addsubject);
router.get('/getallsubject',authenticateUser,getallsubjects);
router.get('/getstusubject',authenticateUser,getstusubject)


router.get('/getsinglesubject/:id',authenticateUser,getsinglesubject)

router.delete('/deletesubject/:id',removesubject)
module.exports=router