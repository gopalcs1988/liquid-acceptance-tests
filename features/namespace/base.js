const homePage = require("./homePage")
const login = require("./login")
const consent = require("./consent")
const register = require("./register")
const dockerUtil = require("./docker")

class Base {
    constructor() {
        this.login = new login()
        this.homePage = new homePage()
        this.consent = new consent()
        this.register = new register()
        this.docker = new dockerUtil()
    }
}
module.exports = Base