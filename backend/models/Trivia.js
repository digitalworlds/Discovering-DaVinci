const StateManager = require('./StateManager'),
    uuid4 = require('uuid/v4'),
    Objectives = require('./Objectives')

const TABLE_NAME = 'trivia'

const parser = {

    matchTitle(title) {

        const regexes = {
            'QUESTION_ROW': /^\d+/gm,
            'RESPONSE_ROW': /Row: \d+/gm
        }

        let type;

        for (key in regexes) {
            while ((regexes[key].exec(title)) !== null) {
                type = key
            }
        }
        return type
    },
    parseResponseRow(raw_row) {
        let row = {}
        try {
            row.response = raw_row["gsx$_cpzh4"]["$t"]
            row.isCorrect = (raw_row["gsx$_cre1l"]["$t"] === 'Correct')
        }
        catch (err) {
            console.log(err)
        }

        return row
    },
    parseQuestionRow(raw_row) {

        let row = this.parseResponseRow(raw_row)
        try {
            row.question = raw_row["gsx$_cokwr"]["$t"]
        }
        catch (err) {
            console.log(err)
        }

        return row
    },
    async parseSheets() {
        let state = await StateManager.parseTable('trivia3')
        let trivia_entries = [], trivia_entry = {}, prev_match
        for (let i = 0; i < state.length; i++) {
            let row = state[i]
            // Get title from each row and match against two different types
            let title = row.title['$t']
            let match = this.matchTitle(title)

            if (match === 'QUESTION_ROW') {
                if (prev_match === 'RESPONSE_ROW') {
                    console.log(JSON.stringify(trivia_entry, null, 2))
                    trivia_entries.push(trivia_entry)
                    await StateManager.writeEntry("trivia4", trivia_entry, uuid4())
                    trivia_entry = {}
                }
                row = this.parseQuestionRow(row)
                trivia_entry.Responses = []
                trivia_entry.Responses.push(row.response)
                if (row.isCorrect)
                    trivia_entry.CorrectAnswer = row.response
                trivia_entry.Question = row.question
                prev_match = match
            }
            else if (match === 'RESPONSE_ROW') {
                row = this.parseResponseRow(row)
                trivia_entry.Responses.push(row.response)
                if (row.isCorrect)
                    trivia_entry.CorrectAnswer = row.response
                prev_match = match
            }
        }

        return trivia_entries
    }
}
var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    let random_propety = keys[ keys.length * Math.random() << 0]
    return {
        id: random_propety,
        question: obj[random_propety]
    }
};

module.exports = {
    ...parser,
    async getRandomQuestion(user_id) {
        let questions = await StateManager.parseTable(TABLE_NAME)
        let payload = randomProperty(questions)

        delete payload.question.CorrectAnswer

        console.log(`${new Date()} User ${user_id} received new trivia question ${payload.id}.`)

        return payload
    },
    async checkAnswer(user_id, question_id, response) {
        let state = await StateManager.parseTable(TABLE_NAME)
        let question = state[question_id]
        let correct_answer = question.CorrectAnswer

        if (correct_answer === response) {
            console.log(`${new Date()} User ${user_id} answered a trivia card correctly.`)
            let err = await Objectives.updateObjective(user_id, ['daily', 'weekly', 'challenges'], ['triviaQuestions', 'triviaExtraordinaire'], 1)
            if (err) {
                console.log(err)
            }
            return true
        }
        console.log(`${new Date()} User ${user_id} answered a trivia card incorrectly.`)
        return false
    }
}