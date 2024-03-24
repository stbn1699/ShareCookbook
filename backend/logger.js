const winston = require('winston');
const getCurrentDateTime = require("./dateUtils");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logfile.log' }),
        new winston.transports.Console()
    ]
});

const logError = (method, message) => {
    logger.error({method: method, date : getCurrentDateTime(), message : message})
}

const logInfo = (method, message) => {
    logger.info({method: method, date: getCurrentDateTime(), message: message})
}

module.exports = {
    logError,
    logInfo
}