const { auth, authToThisRoute } = require('../app/middlewares')
const { editRouteAction, getRoutes, getTabs, Role, addTab, addRoute, deleteRoute } = require('../app/controllers/role.controller')
const router = require('express').Router()
// routes to be removed>
//route
router.post('/route', addRoute)
router.delete('/route/:id', deleteRoute)
//tabs
router.post('/tab',/* auth, authToThisRoute,*/addTab)
//=====================================================================================^
//accessable route routes
router.get("/tabs",/* auth, authToThisRoute,*/getTabs)
router.get('/routes',/* auth, authToThisRoute,*/ getRoutes)
router.put('/route/:id/:newName',/* auth, authToThisRoute,*/ editRouteAction)
//................................................................................
//role routes
router.post('/',/* auth, authToThisRoute,*/ Role.addRole)
router.delete('/:id',/* auth, authToThisRoute,*/ Role.deleteRole)
router.get('/all',/* auth, authToThisRoute,*/ Role.getRoles)
router.get('/:id',/* auth, authToThisRoute,*/ Role.getRole)
router.put('/:id',/* auth, authToThisRoute,*/ Role.editRole)
router.put('/routetorole/:id',/* auth, authToThisRoute,*/ Role.addRouteToRole)
router.delete('/routetorole/:id',/* auth, authToThisRoute,*/ Role.deleteRouteFromRole)
router.put('/tabtorole/:id',/* auth, authToThisRoute,*/ Role.addTabToRole)
router.delete('/tabtorole/:id',/* auth, authToThisRoute,*/ Role.deleteTabFromRole)
module.exports = router