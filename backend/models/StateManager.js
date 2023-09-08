const promisify = require('util').promisify,
        fs = require('fs'),
        readFile = promisify(fs.readFile),
        writeFile = promisify(fs.writeFile)

let StateManager = {
    async parseTable(table) {
        var raw_state;
        await readFile(__dirname + `/../state/${table}.json`)
            .then(file => {
                raw_state = file
            })
            .catch(err => {
                console.log(err)
            })

        let data = JSON.parse(raw_state)
        return data
    },

    // In need of refactoring
    async writeEntry(table, entry, id) {
        var path = __dirname + `/../state/${table}.json`
        var err = "An error occurred while writing to table"
        await readFile(path, 'utf8')
            .then(async (data) => {
                let raw_state = JSON.parse(data);
                if (id) raw_state[id] = entry
                else raw_state.push(entry)
                let write_data = JSON.stringify(raw_state, null, 2);
                await writeFile(path, write_data, 'utf8')
                    .then(res => {
                        // console.log(res)
                        err = ''
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
        return err
    }
}

module.exports = StateManager