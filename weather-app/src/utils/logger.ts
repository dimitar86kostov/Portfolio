import pino from 'pino';
import dayjs from 'dayjs';

const log = pino({
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
    transport: {
        target: 'pino-pretty'
    }
});

export default log;