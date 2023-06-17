const User = require('../app/controllers/user.controller')
const { auth } = require('../app/middlewares')
const router = require('express').Router()
//auth api
router.post('/', User.academyRegistration)
router.post('/employee', User.employeeRegistration)
router.post('/login', User.logIn)
router.delete('/logout', auth, User.logOut)
router.delete('/logoutall', auth, User.logOutFromAllDevices)
//===================================================================
router.put('/', auth, User.updateMyProfile)

module.exports = router
