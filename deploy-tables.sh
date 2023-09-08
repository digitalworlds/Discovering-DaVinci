export DB_PASSWORD=dokimi
export DB_NAME=discovering_davinci

node backend/lib/createTableUser.js
node backend/lib/createTableInventionPieces.js
node backend/lib/createTableTransactions.js
