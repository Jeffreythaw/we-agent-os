export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export interface AuditLogEntry {
    timestamp: string;
    level: LogLevel;
    component: string;
    message: string;
    metadata?: Record<string, any>;
}
