# SUPER APP

# build
	- index.js in root is main server run on prisma with demo db setup
	- client is create-react-app

# run 
	- make sure prisma and node are downloaded
	- once in root folder run: npm install && cd client/ && npm install
	- then, run npm start in root folder && npm start in client folder
	- root folder runs server on http://localhost:4000 and client runs on http://localhost:3000

# time restraint tradeoffs
 - variable names and params not as clean as I like
 - demo db setup with prisma
 - query and mutation in index.js were null with context.prisma so quick fix was to not debug this and run straight db functions in api query and mutations
 - fast and unclean css