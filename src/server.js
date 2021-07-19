require('dotenv').config();
const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

sequelize
	.authenticate()
	.then((result) => {
		server.listen(PORT, () => {
			console.log(`Server started at port: ${PORT}`);
		});
		console.clear();
	}).catch((err) => console.log(err));