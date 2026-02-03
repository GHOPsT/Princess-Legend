
type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'IA';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 200;

  constructor() {
    // Cargar logs previos de localStorage si existen
    try {
      const saved = localStorage.getItem('game_logs');
      if (saved) this.logs = JSON.parse(saved).slice(-this.MAX_LOGS);
    } catch (e) {
      this.logs = [];
    }
  }

  private addLog(level: LogLevel, message: string, details?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      details
    };
    
    this.logs.push(entry);
    if (this.logs.length > this.MAX_LOGS) this.logs.shift();

    // Guardar en localStorage
    try {
      localStorage.setItem('game_logs', JSON.stringify(this.logs));
    } catch (e) {}

    // También imprimir en la consola real para depuración inmediata
    const color = level === 'ERROR' ? 'red' : level === 'IA' ? 'cyan' : 'gray';
    console.log(`%c[${entry.timestamp}] [${level}] ${message}`, `color: ${color}`, details || '');
  }

  info(msg: string, details?: any) { this.addLog('INFO', msg, details); }
  warn(msg: string, details?: any) { this.addLog('WARN', msg, details); }
  error(msg: string, details?: any) { this.addLog('ERROR', msg, details); }
  ia(msg: string, details?: any) { this.addLog('IA', msg, details); }

  getLogs() { return [...this.logs].reverse(); }
  
  clear() {
    this.logs = [];
    localStorage.removeItem('game_logs');
  }
}

export const logger = new Logger();
