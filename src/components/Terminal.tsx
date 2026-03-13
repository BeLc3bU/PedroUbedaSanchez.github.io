import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, terminalCommands } from '../data/portfolio';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

const welcomeMessage = `Welcome to ${portfolioData.name}'s Portfolio Terminal v1.0

Type 'help' for available commands.`;

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'success', content: welcomeMessage }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [...history, { type: 'input', content: `${portfolioData.name.toLowerCase().replace(' ', '')}@portfolio:~$ ${cmd}` }];

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: 'Available commands:\n' + terminalCommands.map(c => `  ${c.command.padEnd(12)} - ${c.description}`).join('\n')
        });
        break;

      case 'about':
        newHistory.push({ type: 'success', content: `\n${portfolioData.bio.new}\n` });
        break;

      case 'hobbies':
        newHistory.push({ 
          type: 'success', 
          content: '\nMis Hobbies:\n\n' + 
            portfolioData.hobbies.map((hobby, i) => `  ${i + 1}. ${hobby}`).join('\n') + '\n'
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          content: '\nFeatured Projects:\n' + 
            portfolioData.projects.map((p, i) => 
              `  ${i + 1}. ${p.title}\n     ${p.description.slice(0, 60)}...\n     Tags: ${p.tags.join(', ')}\n`
            ).join('\n')
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          content: '\nTechnical Skills:\n' +
            'Tools:\n' + portfolioData.skills.tools.slice(0, 5).map(s => `  - ${s.description}`).join('\n') +
            '\n\nCompetencies:\n' + portfolioData.skills.competencies.slice(0, 5).map(s => `  - ${s.description}`).join('\n')
        });
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          content: '\nEducation & Certifications:\n' +
            portfolioData.education.certifications.map(e => `  - ${e.title} (${e.year})`).join('\n') +
            '\n\nHonors:\n' +
            portfolioData.education.honors.map(h => `  - ${h.title}`).join('\n')
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          content: '\nWork Experience:\n' +
            portfolioData.experience.map(e => 
              `  • ${e.title} @ ${e.company}\n    ${e.period}\n    ${e.highlights[0]?.slice(0, 50)}...\n`
            ).join('\n')
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'success',
          content: '\nContact Information:\n' +
            `  Email: ${portfolioData.social.email}\n` +
            `  LinkedIn: ${portfolioData.social.linkedin}\n` +
            `  GitHub: ${portfolioData.social.github}\n`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case '':
        break;

      default:
        newHistory.push({ type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      if (input.trim()) {
        setCommandHistory([...commandHistory, input]);
        setHistoryIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = terminalCommands.map(c => c.command).filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div 
      className="h-[280px] flex flex-col bg-background/80 backdrop-blur-sm border border-border rounded-4xl overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/20">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-4 text-xs text-muted-foreground">Terminal</span>
      </div>

      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-code text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`whitespace-pre-wrap mb-1 ${
                line.type === 'error' ? 'text-red-400' :
                line.type === 'success' ? 'text-primary' :
                line.type === 'input' ? 'text-foreground' :
                'text-muted-foreground'
              }`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <span className="text-primary">{portfolioData.name.toLowerCase().replace(' ', '')}@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-primary"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-primary animate-cursor-blink" />
        </div>
      </div>
    </div>
  );
}
