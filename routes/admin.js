const express=require('express')
const router=express.Router()
const {getadmin,
addsubject,
getallsubjects,
getsinglesubject,
removesubject,
addprofessor,
getallprofessors,
getsingleprofessor,
removeprofessor,
addstudent,
getallstudents,
getsinglestudent,
removestudent}=require('../controllers/admin')
const{register,loginadmin,loginprof,loginstudent}=require('../controllers/authenication')
const{authenticateUser,
    authorizePermissions}=require('../middleware/checkpermission')
router.post('/register',register)
router.post('/login',loginadmin)
router.get('/',authenticateUser,getadmin)
router.post('/addsubject',authenticateUser,addsubject)
router.get('/getallsubjects',authenticateUser,getallsubjects)
router.post('/addprofessor',authenticateUser,addprofessor)
router.get('/getallprf',authenticateUser,getallprofessors)
router.post('/addstudent',authenticateUser,addstudent)
router.get('/getallstudents',authenticateUser,getallstudents)

router.route('/getsubject/:id').get(authenticateUser,getsinglesubject)
router.route('/getsingleprof/:id').get(authenticateUser,getsingleprofessor)
router.route('getsinglestudent/:id').get(authenticateUser,getsinglestudent)


module.exports=router