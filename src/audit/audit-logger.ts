import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { AuditLogEntry, LogLevel } from './types.js';

export class AuditLogger {
    private logDir: string;
    private logFile: string;

    constructor(baseDir: string = process.cwd()) {
        this.logDir = path.join(baseDir, 'logs');
        const dateStr = new Date().toISOString().split('T')[0];
        this.logFile = path.join(this.logDir, `audit-${dateStr}.jsonl`);
    }

    public async initialize(): Promise<void> {
        await fs.mkdir(this.logDir, { recursive: true });
    }

    public async append(level: LogLevel, component: string, message: string, metadata?: Record<string, any>): Promise<void> {
        const entry: AuditLogEntry = {
            timestamp: new Date().toISOString(),
            level,
            component,
            message,
            metadata,
        };

        const jsonl = JSON.stringify(entry) + '\n';
        await fs.appendFile(this.logFile, jsonl, 'utf-8');
    }
}
