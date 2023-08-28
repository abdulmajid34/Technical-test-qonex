class UserController {
    static register(req, res, next) {
        res.send('HELLO WORLD BY ABDUL')
    }

    static login(req, res, next) {
        res.send("SUCCESS LOGIN")
    }
}

module.exports = UserController