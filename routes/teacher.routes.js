const Teacher = require('../app/controllers/teacher.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router = require('express').Router()
router.post('/', auth,/*authToThisRoute,*/Teacher.add)
router.put('/:id', auth,/*authToThisRoute,*/Teacher.update)
router.delete('/:id', auth,/*authToThisRoute,*/Teacher.delete)
router.get('/:academyId', auth,/*authToThisRoute,*/Teacher.getAll)
router.get('/', auth,/*authToThisRoute,*/Teacher.getAll)
module.exports = router