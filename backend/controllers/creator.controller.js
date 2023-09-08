exports.sign = function (req, res) {
    let response = {
        status: 200,
        creatorKey: '00000000000000000000000000000000000',
        creatorAccount: 'ufl.app'
    }
    res.send(response)
}