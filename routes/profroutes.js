const express=require('express')
const router=express.Router()

const{loginprof}=require('../controllers/authenication')
const {authenticateUser,
    authorizePermissions}=require('../middleware/checkpermission')
const{removesubject,getallsubjects,getsinglesubject}=require('../controllers/admin')
const{addsubject,getprofstudent,getprofsubject}=require('../controllers/professor')
router.post('/login',loginprof);
router.route('/addsubject').post(authenticateUser,addsubject);
router.get('/getallsubject',authenticateUser,getallsubjects);
router.get('/getprofsubject',authenticateUser,getprofsubject)
router.get('/getprofstudent',authenticateUser,authorizePermissions('prof'),getprofstudent)

router.get('/getsinglesubject/:id',authenticateUser,getsinglesubject)

router.delete('/deletesubject/:id',removesubject)
module.exports=router


