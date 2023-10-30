const homePage = require("./homePage")
const login = require("./login")
const consent = require("./consent")
const register = require("./register")
const dockerUtil = require("./docker")
const updateEnv = require("./updateEnv")
const utils = require("./utils")

class Base {
    constructor() {
        this.login = new login()
        this.homePage = new homePage()
        this.consent = new consent()
        this.utils = new utils()
        this.register = new register()
        this.docker = new dockerUtil()
        this.updateEnv = new updateEnv()
    }
}
module.exports = Base