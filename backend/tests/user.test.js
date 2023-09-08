const uuidv4 = require('uuid/v4'),
    User = require('../models/Users')

test('adds an invention piece to a user\'s inventory', async () => {
    let sample = {
        'user': 'ufl.app',
        'reward': {
            'id': uuidv4(),
            'invention': -1,
            'piece': -1
        }
    }

    let output = await User.addInventionPiece(sample.user, sample.reward)

    expect(output).toBe('');
});

test('saves a card to a user\'s inventory', async () => {
    let sample = {
        'user': 'ufl.app',
        'card': {
            'invention': -1,
            'piece': -1
        }
    }

    let output = await User.addSavedCard(sample.user, sample.card)

    expect(output).toBe('');
});