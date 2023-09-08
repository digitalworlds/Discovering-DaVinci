export PORT=1337
export FRONTEND_URL=https://research.dwi.ufl.edu/projects/discover/dist/
export USERNAME=ufl.app
export PRIVATE_KEY=5Kk73VhzXNU6UexyGeciFLVjWjdoeW9PTKgaCnXiNt8nyAPy1cL
export PRIVATE_MEMO_KEY=5HrepwcCCsgVQbfFXp2QdtzLAY3B3mU3cEtzJmpPdU2nVdrN86L
export EMAIL_KEY=digitalworlds624
export EMAIL_PATH=ufdiscoverteam@gmail.com
export DB_PASSWORD=dokimi
export DB_NAME=discovering_davinci
export STEEM_APP_KEY=ufl_app_prod_


pm2 stop server
pm2 delete server

pm2 start  ~/Discovering-DaVinci/backend/server.js

pm2 monit
