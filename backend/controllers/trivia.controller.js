const Trivia = require('../models/Trivia'),
    rewardUser = require('../lib/customTransactions').rewardUser,
    User = require('../models/Users')

const getCard = async (req, res) => {
    let userId = req.body.user
    let question = await Trivia.getRandomQuestion(userId)
    if (question) {
        await User.updatePlayerStats(userId, 'triviaCards', 'drawn', 1)
            .then(() => {
                let response = {
                    message: "Random question for you, Sir!",
                    trivia: question,
                    status: 200
                }
                res.send(response)
            }).catch(() => {
                let response = {
                    message: "Failed to retrieve question for you, Sir",
                    status: 500
                }
                res.send(response)
            })
    }
    else {
        let response = {
            message: "Failed to retrieve question for you, Sir",
            status: 500
        }
        res.send(response)
    }
}

const checkAnswer = async (req, res) => {
    let user_id = req.body.user

    let question_id = req.params.id
    let answer = req.body.response
    let invention_piece = req.body.invention_piece

    let isCorrect = await Trivia.checkAnswer(user_id, question_id, answer)
    
    if (isCorrect) {
        rewardUser(user_id, req.body.client, invention_piece)
        await User.updatePlayerStats(user_id, 'triviaCards', 'correct', 1)
            .then(() => {
                let response = {
                    "message": "Correct response, Sir!",
                    "isCorrect": isCorrect,
                    "status": 200
                }
                res.send(response)
            })
            .catch(() => {
                let response = {
                    message: "Failed to check answer for you, Sir",
                    status: 500
                }
                res.send(response)
            })
    }
    else {
        await User.updatePlayerStats(user_id, 'triviaCards', 'incorrect', 1)
            .then(() => {
                let response = {
                    "message": "Wrong response, Sir!",
                    "isCorrect": isCorrect,
                    "status": 201
                }
                res.send(response)
            })
            .catch(() => {
                let response = {
                    message: "Failed to check answer for you, Sir",
                    status: 500
                }
                res.send(response)
            })
    }

}

module.exports = {
    getCard,
    checkAnswer
}