const fs = require('fs')

module.exports = (request, response, next) => {
    let dateMonthYear = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
    const logDir = `${__dirname}/../storage/logs/${dateMonthYear}`;
    let fileName = '';
    if (!request.user)
        fileName = 'general.log';
    else
        fileName = `${request.user.userId}.log`;

    let content = '============================Request===============================================\r\n';
    content += `${request.originalUrl}\r\n`;
    content += `${new Date()}\r\n`;
    content += 'Headers\r\n';
    content += `${JSON.stringify(request.headers)}\r\n`;
    content += 'Body\r\n';
    content += `${JSON.stringify(request.body)}\r\n`;
    content += '==================================================================================\r\n';
    writeLog(logDir, fileName, content);
    next();
}


let writeLog = (logDir, fileName, content) => {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFile(`${logDir}/${fileName}`, content, err => { if (err) { console.error(err); return; } });
}