const homePage = require("./homePage")
const login = require("./login")
const consent = require("./consent")

class Base {
    constructor() {
        this.login = new login()
        this.homePage = new homePage()
        this.consent = new consent()
    }
}
module.exports = Base