const roleModel = require('../../db/models/role.model')
const routeModel = require('../../db/models/route.model')
const tabModel = require('../../db/models/tab.model')
const { handlingMyFunction } = require('../helper')
const Helper = require('../helper')
class Role {
    static addRole = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            if (req.body.tabs && req.body.tabs.length > 0) {
                await Promise.all(
                    req.body.tabs.map(async (tab_id) => {
                        const tab = await Helper.isThisIdExistInThisModel(tab_id, tabModel, 'tab')
                        tab.routes.forEach(tabRoute => {
                            if (!req.body.routes.includes(tabRoute)) {
                                req.body.routes.push(tabRoute)
                            }
                        })
                    }))
            }
            const role = await roleModel(req.body)
            if (true) { return role.save() }
        }, 'you insert your role successfully')
    }
    static deleteRole = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return roleModel.findByIdAndDelete(req.params.id)
        }, 'role deleted')
    }
    static getRole = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return Helper.isThisIdExistInThisModel(req.params.id, roleModel, 'role')
        }, 'here is your role')
    }
    static getRoles = (req, res) => {
        handlingMyFunction(req, res, (req) => {
            return roleModel.find()
        }, 'here is all roles')
    }
    static editRole = (req, res) => {
        Helper.handlingMyFunction(req, res, async(req) => {
            const role= await Helper.isThisIdExistInThisModel(req.params.id)
            for (let field in req.body) {
                role[field] = req.body[field]
            }
            if(true){return role.save()}
        }, 'here is your role')
    }
    static addRouteToRole = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const role = await Helper.isThisIdExistInThisModel(req.params.id, roleModel, 'role')
            await Helper.isThisIdExistInThisModel(req.body.route, routeModel, 'route')
            const route = role.routes.find(R => { return R == req.body.route })
            if (route) {
                throw new Error('this role already have this route')
            } else {
                role.routes.push(req.body.route)
                return role.save()
            }
        }, 'you added the route saccessfuly')
    }
    static deleteRouteFromRole = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const role = await Helper.isThisIdExistInThisModel(req.params.id, roleModel, 'role')
            await Helper.isThisIdExistInThisModel(req.body.route, routeModel, 'route')
            const i = role.routes.findIndex(R => { return R == req.body.route })
            if (i == -1) {
                throw new Error('this role didn`t have this route')
            } else {
                role.routes.splice(i, 1)
                return role.save()
            }
        }, 'route deleted')
    }
    static addTabToRole = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const role = await Helper.isThisIdExistInThisModel(req.params.id, roleModel, 'role')
            const tab = await Helper.isThisIdExistInThisModel(req.body.tab, tabModel, 'tabs')
            const route = role.tabs.find(R => { return R == req.body.tab })
            if (route) {
                throw new Error('this role already have this route')
            } else {
                role.tabs.push(req.body.tab)
                tab.routes.forEach(route => {
                    if (!role.routes.includes(route)) {
                        role.routes.push(route)
                    }
                })
                return role.save()
            }
        }, 'you added the route saccessfuly')
    }
    static deleteTabFromRole = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const role = await Helper.isThisIdExistInThisModel(req.params.id, roleModel, 'role')
            const tab = await Helper.isThisIdExistInThisModel(req.body.tab, tabModel, 'tab')
            const i = role.tabs.findIndex(tab => { return tab == req.body.tab })
            if (i == -1) {
                throw new Error('this role can not see this tab')
            } else {
                role.tabs.splice(i, 1)
                tab.routes.forEach(tabRoute => {
                    const index = role.routes.findIndex(roleRoute => roleRoute.toString() == tabRoute.toString())
                    if (index != -1) {
                        role.routes.splice(index, 1)
                    }
                })
                return role.save()
            }
        }, 'route deleted')
    }

}
const getRoutes = (req, res) => {
    handlingMyFunction(req, res, (req) => {
        return routeModel.find({ routeAction: { $ne: '' } })
    }, 'here is all permissions')
}
const editRouteAction = (req, res) => {
    handlingMyFunction(req, res, async (req) => {
        const route = await Helper.isThisIdExistInThisModel(req.params.id, routeModel, 'route')
        if (route) {
            return routeModel.findByIdAndUpdate(req.params.id, { routeAction: req.params.newName }, { returnDocument: 'after' })
        }
    }, 'name changed successfully')
}
const getTabs = (req, res) => {
    Helper.handlingMyFunction(req, res, (req) => {
        return tabModel.find()
    }, "here all the tabs")
}
//developer methods .....to be removed after development mood.........
const deleteRoute = (req, res) => {
    Helper.handlingMyFunction(req, res, async (req) => {
        const roles = await roleModel.find()
        roles.forEach(async (role) => {
            role.routes = role.routes.filter(route => { return route != req.params.id })
            await role.save()
        })
        await Helper.isThisIdExistInThisModel(req.params.id, routeModel, 'route')
        await routeModel.findByIdAndDelete(req.params.id)
    }, 'you delete your route successfully')
}
const addRoute = (req, res) => {
    Helper.handlingMyFunction(req, res, (req) => {
        const route = routeModel(req.body)
        return route.save()
    }, 'you insert your route successfully')
}
const addTab = (req, res) => {
    Helper.handlingMyFunction(req, res, (req) => {
        return tabModel.create(req.body)
    }, 'this tab recoded in data base successfully')
}

module.exports = { deleteRoute, addTab, addRoute, Role, editRouteAction, getTabs, getRoutes }