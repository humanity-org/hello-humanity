import { useEffect, useRef } from 'react';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'error' | 'success' | 'warning';
  message: string;
}

interface ConsoleLogProps {
  logs: LogEntry[];
}

export default function ConsoleLog({ logs }: ConsoleLogProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return 'text-blue-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full h-48 bg-gray-900 rounded-lg p-4 overflow-y-auto font-mono text-sm">
      <div className="text-gray-500 mb-2">Console Output:</div>
      {logs.map((log, index) => (
        <div key={index} className="mb-1">
          <span className="text-gray-500">[{log.timestamp}]</span>
          <span className={`ml-2 ${getLogColor(log.type)}`}>
            {log.type.toUpperCase()}:
          </span>
          <span className="ml-2 text-gray-300">{log.message}</span>
        </div>
      ))}
      <div ref={logsEndRef} />
    </div>
  );
}