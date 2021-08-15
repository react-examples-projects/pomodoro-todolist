@ECHO OFF

start cmd -new_console:s /k "cd ./client & npm start"

cd ./server 
npm run dev