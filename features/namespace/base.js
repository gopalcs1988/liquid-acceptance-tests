const homePage = require("./homePage")
const login = require("./login")
const consent = require("./consent")
const register = require("./register")

class Base {
    constructor() {
        this.login = new login()
        this.homePage = new homePage()
        this.consent = new consent()
        this.register = new register()
    }
}
module.exports = Base