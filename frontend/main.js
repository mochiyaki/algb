const{useState,useEffect,useRef,useCallback}=React;const generateId=()=>Math.random().toString(36).substring(2,15);const formatTime=(date)=>new Date(date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});const formatDate=(date)=>new Date(date).toLocaleDateString([],{month:'short',day:'numeric'});const defaultSettings={apiMode:'api',apiEndpoint:'https://api.tzafon.ai/v1',apiKey:'',model:'tzafon.northstar.cua.sft',localEndpoint:'http://localhost:1234/v1/chat/completions',localModel:'local-model',systemPrompt:'You are a helpful AI assistant. When asked to generate HTML code, always use proper code blocks with ```html syntax.',streaming:true,temperature:0.7,maxTokens:4096,topP:1.0,darkMode:true};const PigMascot=({state='normal',size=40})=>{const pigStates={normal:'./assets/images/4f0f68db9ae2e95fcef3842061489bfd3a93c0133dfae2c552178607823f6555',thinking:'./assets/images/8fb7870dc8becc3faa77ea3d9f7bd6f47f0e64e270d8c2275c7e7e07be5c579b',confused:'./assets/images/f86d1781277a3de7c78dd2ca973b8b17af4f14ae5ec76856abebc6ac623fddc8',happy:'./assets/images/9cf061436a2128d4b1edf70143ff6b5750ebaf981d289dfb83770d2158ad5636'};return React.createElement('img',{src:pigStates[state]||pigStates.normal,alt:'Pig',style:{width:size,height:size,objectFit:'contain'},className:state==='thinking'?'animate-bounce':''});};
// Icon components
const Icons = {
  Plus: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 12, y1: 5, x2: 12, y2: 19 }),
    React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
  ),
  Settings: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('circle', { cx: 12, cy: 12, r: 3 }),
    React.createElement('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' })
  ),
  Download: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    React.createElement('polyline', { points: '7 10 12 15 17 10' }),
    React.createElement('line', { x1: 12, y1: 15, x2: 12, y2: 3 })
  ),
  Trash: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('polyline', { points: '3 6 5 6 21 6' }),
    React.createElement('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' })
  ),
  Send: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 22, y1: 2, x2: 11, y2: 13 }),
    React.createElement('polygon', { points: '22 2 15 22 11 13 2 9 22 2' })
  ),
  Menu: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 3, y1: 12, x2: 21, y2: 12 }),
    React.createElement('line', { x1: 3, y1: 6, x2: 21, y2: 6 }),
    React.createElement('line', { x1: 3, y1: 18, x2: 21, y2: 18 })
  ),
  X: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
    React.createElement('line', { x1: 6, y1: 6, x2: 18, y2: 18 })
  ),
  Copy: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('rect', { x: 9, y: 9, width: 13, height: 13, rx: 2, ry: 2 }),
    React.createElement('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
  ),
  Launch: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
    React.createElement('polyline', { points: '15 3 21 3 21 9' }),
    React.createElement('line', { x1: 10, y1: 14, x2: 21, y2: 3 })
  ),
  Moon: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })
  ),
  Sun: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('circle', { cx: 12, cy: 12, r: 5 }),
    React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }),
    React.createElement('line', { x1: 12, y1: 21, x2: 12, y2: 23 }),
    React.createElement('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
    React.createElement('line', { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }),
    React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }),
    React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }),
    React.createElement('line', { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }),
    React.createElement('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 })
  ),
  ChevronLeft: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('polyline', { points: '15 18 9 12 15 6' })
  ),
  Edit: () => React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
    React.createElement('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }),
    React.createElement('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })
  )
};
// Code block component with syntax highlighting
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const isHtml = language === 'html' || language === 'htm';
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleLaunch = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };
  return React.createElement('div', { className: 'code-block-wrapper relative group my-3' },
    React.createElement('div', { className: 'code-block-header flex items-center justify-between px-3 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700' },
      React.createElement('span', { className: 'text-xs text-gray-400 font-mono' }, language || 'code'),
      React.createElement('div', { className: 'flex gap-2' },
        isHtml && React.createElement('button', {
          onClick: handleLaunch,
          className: 'flex items-center gap-1 px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors',
          title: 'Launch in new tab'
        },
          React.createElement(Icons.Launch),
          ' Launch'
        ),
        React.createElement('button', {
          onClick: handleCopy,
          className: 'flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors'
        },
          React.createElement(Icons.Copy),
          copied ? ' Copied!' : ' Copy'
        )
      )
    ),
    React.createElement('pre', { className: 'rounded-b-lg overflow-x-auto m-0' },
      React.createElement('code', { ref: codeRef, className: `language-${language || 'plaintext'} text-sm` }, code)
    )
  );
};
// Message component with markdown rendering
const Message = ({ message, onEdit, onResend }) => {
  const [showTime, setShowTime] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const isUser = message.role === 'user';
  const renderContent = (content) => {
    // Parse markdown and extract code blocks
    const parts = [];
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        parts.push({ type: 'text', content: textBefore });
      }
      // Add code block
      parts.push({ type: 'code', language: match[1], content: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.slice(lastIndex) });
    }
    return parts.map((part, i) => {
      if (part.type === 'code') {
        return React.createElement(CodeBlock, { key: i, code: part.content, language: part.language });
      } else {
        // Render markdown for text parts
        const html = marked.parse(part.content);
        return React.createElement('div', {
          key: i,
          className: 'prose prose-invert max-w-none',
          dangerouslySetInnerHTML: { __html: html }
        });
      }
    });
  };
  const handleSaveEdit = () => {
    onEdit(message.id, editContent);
    setIsEditing(false);
  };
  return React.createElement('div', {
    className: `message-container flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`,
    onMouseEnter: () => setShowTime(true),
    onMouseLeave: () => setShowTime(false)
  },
    React.createElement('div', { className: `message ${isUser ? 'message-user' : 'message-ai'} max-w-[85%] md:max-w-[70%]` },
      !isUser && React.createElement('div', { className: 'flex items-center gap-2 mb-2' },
        React.createElement(PigMascot, { state: 'normal', size: 24 }),
        // React.createElement('span', { className: 'text-xs text-pink-400 font-medium' }, 'PigChat')
        React.createElement('span', { className: 'text-xs text-pink-400 font-medium' }, 'Pig')
      ),
      isEditing ? React.createElement('div', { className: 'space-y-2' },
        React.createElement('textarea', {
          value: editContent,
          onChange: (e) => setEditContent(e.target.value),
          className: 'w-full p-2 bg-gray-800 border border-gray-600 rounded text-white resize-none',
          rows: 3
        }),
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', {
            onClick: handleSaveEdit,
            className: 'px-3 py-1 bg-pink-600 hover:bg-pink-500 text-white rounded text-sm'
          }, 'Save & Resend'),
          React.createElement('button', {
            onClick: () => setIsEditing(false),
            className: 'px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm'
          }, 'Cancel')
        )
      ) : React.createElement('div', { className: 'message-content' }, renderContent(message.content)),
      React.createElement('div', { className: `message-actions flex items-center gap-2 mt-2 ${showTime ? 'opacity-100' : 'opacity-0'} transition-opacity` },
        React.createElement('span', { className: 'text-xs text-gray-500' }, formatTime(message.timestamp)),
        isUser && React.createElement('button', {
          onClick: () => setIsEditing(true),
          className: 'text-gray-500 hover:text-gray-300 transition-colors',
          title: 'Edit message'
        }, React.createElement(Icons.Edit)),
        React.createElement('button', {
          onClick: () => navigator.clipboard.writeText(message.content),
          className: 'text-gray-500 hover:text-gray-300 transition-colors',
          title: 'Copy message'
        }, React.createElement(Icons.Copy))
      )
    )
  );
};
// Typing indicator
const TypingIndicator = () => {
  return React.createElement('div', { className: 'flex items-center gap-3 mb-4' },
    React.createElement(PigMascot, { state: 'thinking', size: 32 }),
    React.createElement('div', { className: 'typing-indicator flex gap-1' },
      React.createElement('span', { className: 'typing-dot', style: { animationDelay: '0ms' } }),
      React.createElement('span', { className: 'typing-dot', style: { animationDelay: '150ms' } }),
      React.createElement('span', { className: 'typing-dot', style: { animationDelay: '300ms' } })
    )
  );
};
// Settings panel
const SettingsPanel = ({ settings, setSettings, onClose, darkMode }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const handleSave = () => {
    setSettings(localSettings);
    localStorage.setItem('berrychat_settings', JSON.stringify(localSettings));
    onClose();
  };
  const handleReset = () => {
    setLocalSettings(defaultSettings);
  };
  return React.createElement('div', { className: 'settings-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4' },
    React.createElement('div', { className: `settings-panel ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto` },
      React.createElement('div', { className: 'flex items-center justify-between p-4 border-b border-gray-700' },
        React.createElement('h2', { className: 'text-xl font-bold text-pink-400 flex items-center gap-2' },
          React.createElement(Icons.Settings),
          'Settings'
        ),
        React.createElement('button', { onClick: onClose, className: 'text-gray-400 hover:text-white transition-colors' },
          React.createElement(Icons.X)
        )
      ),
      React.createElement('div', { className: 'p-4 space-y-6' },
        // API Mode Toggle
        React.createElement('div', { className: 'space-y-2' },
          React.createElement('label', { className: 'text-sm font-medium text-gray-300' }, 'Connection Mode'),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('button', {
              onClick: () => setLocalSettings({ ...localSettings, apiMode: 'api' }),
              className: `flex-1 py-2 px-4 rounded-lg transition-colors ${localSettings.apiMode === 'api' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`
            }, 'API Mode'),
            React.createElement('button', {
              onClick: () => setLocalSettings({ ...localSettings, apiMode: 'local' }),
              className: `flex-1 py-2 px-4 rounded-lg transition-colors ${localSettings.apiMode === 'local' ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`
            }, 'Local Model')
          )
        ),
        // API Settings
        localSettings.apiMode === 'api' && React.createElement('div', { className: 'space-y-4 p-4 bg-gray-800/50 rounded-lg' },
          React.createElement('h3', { className: 'font-medium text-pink-300' }, 'API Settings'),
          React.createElement('div', null,
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'API Endpoint'),
            React.createElement('input', {
              type: 'text',
              value: localSettings.apiEndpoint,
              onChange: (e) => setLocalSettings({ ...localSettings, apiEndpoint: e.target.value }),
              className: 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none',
              placeholder: 'https://api.openai.com/v1/chat/completions'
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'API Key'),
            React.createElement('input', {
              type: 'password',
              value: localSettings.apiKey,
              onChange: (e) => setLocalSettings({ ...localSettings, apiKey: e.target.value }),
              className: 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none',
              placeholder: 'sk-...'
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'Model'),
            React.createElement('input', {
              type: 'text',
              value: localSettings.model,
              onChange: (e) => setLocalSettings({ ...localSettings, model: e.target.value }),
              className: 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none',
              placeholder: 'gpt-4, claude-3-opus, openai, etc.'
            })
          )
        ),
        // Local Settings
        localSettings.apiMode === 'local' && React.createElement('div', { className: 'space-y-4 p-4 bg-gray-800/50 rounded-lg' },
          React.createElement('h3', { className: 'font-medium text-pink-300' }, 'Local Model Settings'),
          React.createElement('div', null,
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'Local Endpoint'),
            React.createElement('input', {
              type: 'text',
              value: localSettings.localEndpoint,
              onChange: (e) => setLocalSettings({ ...localSettings, localEndpoint: e.target.value }),
              className: 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none',
              placeholder: 'http://localhost:1234/v1/chat/completions'
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'Model Name'),
            React.createElement('input', {
              type: 'text',
              value: localSettings.localModel,
              onChange: (e) => setLocalSettings({ ...localSettings, localModel: e.target.value }),
              className: 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none',
              placeholder: 'llama-3'
            })
          )
        ),
        // System Prompt
        React.createElement('div', null,
          React.createElement('label', { className: 'text-sm font-medium text-gray-300' }, 'System Prompt'),
          React.createElement('textarea', {
            value: localSettings.systemPrompt,
            onChange: (e) => setLocalSettings({ ...localSettings, systemPrompt: e.target.value }),
            className: 'w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none resize-none',
            rows: 4
          }),
          React.createElement('div', { className: 'text-xs text-gray-500 mt-1' }, `${localSettings.systemPrompt.length} characters`)
        ),
        // Advanced Settings
        React.createElement('div', { className: 'space-y-4' },
          React.createElement('h3', { className: 'font-medium text-pink-300' }, 'Advanced Settings'),
          React.createElement('div', { className: 'flex items-center justify-between' },
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'Enable Streaming'),
            React.createElement('button', {
              onClick: () => setLocalSettings({ ...localSettings, streaming: !localSettings.streaming }),
              className: `w-12 h-6 rounded-full transition-colors ${localSettings.streaming ? 'bg-pink-600' : 'bg-gray-700'}`,
            },
              React.createElement('div', {
                className: `w-5 h-5 bg-white rounded-full transition-transform ${localSettings.streaming ? 'translate-x-6' : 'translate-x-0.5'}`
              })
            )
          ),
          React.createElement('div', null,
            React.createElement('div', { className: 'flex justify-between' },
              React.createElement('label', { className: 'text-sm text-gray-400' }, 'Temperature'),
              React.createElement('span', { className: 'text-sm text-pink-400' }, localSettings.temperature.toFixed(1))
            ),
            React.createElement('input', {
              type: 'range',
              min: 0,
              max: 2,
              step: 0.1,
              value: localSettings.temperature,
              onChange: (e) => setLocalSettings({ ...localSettings, temperature: parseFloat(e.target.value) }),
              className: 'w-full mt-1 accent-pink-500'
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: 'text-sm text-gray-400' }, 'Max Tokens'),
            React.createElement('input', {
              type: 'number',
              value: localSettings.maxTokens,
              onChange: (e) => setLocalSettings({ ...localSettings, maxTokens: parseInt(e.target.value) || 4096 }),
              className: 'w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-pink-500 focus:outline-none'
            })
          ),
          React.createElement('div', null,
            React.createElement('div', { className: 'flex justify-between' },
              React.createElement('label', { className: 'text-sm text-gray-400' }, 'Top P'),
              React.createElement('span', { className: 'text-sm text-pink-400' }, localSettings.topP.toFixed(1))
            ),
            React.createElement('input', {
              type: 'range',
              min: 0,
              max: 1,
              step: 0.1,
              value: localSettings.topP,
              onChange: (e) => setLocalSettings({ ...localSettings, topP: parseFloat(e.target.value) }),
              className: 'w-full mt-1 accent-pink-500'
            })
          )
        ),
        // Action buttons
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', {
            onClick: handleSave,
            className: 'flex-1 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-medium transition-colors'
          }, 'Save Settings'),
          React.createElement('button', {
            onClick: handleReset,
            className: 'py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors'
          }, 'Reset')
        )
      )
    )
  );
};
// Confirmation dialog
const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return React.createElement('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4' },
    React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-2xl' },
      React.createElement(PigMascot, { state: 'confused', size: 48 }),
      React.createElement('p', { className: 'text-white mt-4 mb-6' }, message),
      React.createElement('div', { className: 'flex gap-3' },
        React.createElement('button', {
          onClick: onCancel,
          className: 'flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors'
        }, 'Cancel'),
        React.createElement('button', {
          onClick: onConfirm,
          className: 'flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors'
        }, 'Delete')
      )
    )
  );
};
// Sidebar component
const Sidebar = ({ chats, currentChatId, onSelectChat, onNewChat, onDeleteChat, isCollapsed, onToggle }) => {
  const [hoveredChat, setHoveredChat] = useState(null);

  return React.createElement('div', {
    className: `sidebar fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`
  },
    React.createElement('div', { className: 'h-full flex flex-col bg-gray-950 border-r border-gray-800' },
      React.createElement('div', { className: 'p-4 flex items-center justify-between' },
        React.createElement('button', {
          onClick: onNewChat,
          className: 'flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-medium transition-colors'
        },
          React.createElement(Icons.Plus),
          'New Chat'
        ),
        React.createElement('button', {
          onClick: onToggle,
          className: 'p-2 text-gray-400 hover:text-white'
        }, React.createElement(Icons.X))
      ),
      React.createElement('div', { className: 'flex-1 overflow-y-auto p-2 space-y-1' },
        chats.map(chat => 
          React.createElement('div', {
            key: chat.id,
            onClick: () => onSelectChat(chat.id),
            onMouseEnter: () => setHoveredChat(chat.id),
            onMouseLeave: () => setHoveredChat(null),
            className: `chat-item group p-3 rounded-lg cursor-pointer transition-colors ${currentChatId === chat.id ? 'bg-pink-600/20 border border-pink-600/50' : 'hover:bg-gray-800'}`
          },
            React.createElement('div', { className: 'flex items-center justify-between' },
              React.createElement('div', { className: 'flex-1 min-w-0' },
                React.createElement('p', { className: 'text-sm text-white truncate' },
                  chat.messages[0]?.content.slice(0, 30) || 'New Chat'
                ),
                React.createElement('p', { className: 'text-xs text-gray-500 mt-1' },
                  formatDate(chat.createdAt)
                )
              ),
              hoveredChat === chat.id && React.createElement('button', {
                onClick: (e) => { e.stopPropagation(); onDeleteChat(chat.id); },
                className: 'p-1 text-gray-500 hover:text-red-400 transition-colors'
              }, React.createElement(Icons.Trash))
            )
          )
        )
      )
    )
  );
};
// Main App component
const App = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('berrychat_settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('berrychat_chats');
    if (saved) return JSON.parse(saved);
    const initialChat = { id: generateId(), messages: [], createdAt: Date.now() };
    return [initialChat];
  });
  const [currentChatId, setCurrentChatId] = useState(() => {
    const saved = localStorage.getItem('berrychat_currentChat');
    return saved || chats[0]?.id;
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const currentChat = chats.find(c => c.id === currentChatId) || chats[0];
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('berrychat_chats', JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    localStorage.setItem('berrychat_currentChat', currentChatId);
  }, [currentChatId]);
  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleNewChat();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        handleExport();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChatId]);
  const handleNewChat = () => {
    const newChat = { id: generateId(), messages: [], createdAt: Date.now() };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setSidebarCollapsed(true);
  };
  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    setSidebarCollapsed(true);
  };
  const handleDeleteChat = (chatId) => {
    setConfirmDelete(chatId);
  };
  const confirmDeleteChat = () => {
    const newChats = chats.filter(c => c.id !== confirmDelete);
    if (newChats.length === 0) {
      const newChat = { id: generateId(), messages: [], createdAt: Date.now() };
      newChats.push(newChat);
    }
    setChats(newChats);
    if (currentChatId === confirmDelete) {
      setCurrentChatId(newChats[0].id);
    }
    setConfirmDelete(null);
  };
  const handleExport = () => {
    const exportData = {
      chat: currentChat,
      settings: { ...settings, apiKey: undefined },
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `berrychat-${formatDate(Date.now())}.json`;
    a.click();
  };
  const handleExportAll = () => {
    const exportData = {
      chats,
      settings: { ...settings, apiKey: undefined },
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `berrychat-all-${formatDate(Date.now())}.json`;
    a.click();
  };
  const handleClearChat = () => {
    setChats(chats.map(c => 
      c.id === currentChatId ? { ...c, messages: [] } : c
    ));
  };
  const handleEditMessage = (messageId, newContent) => {
    // Find the message and resend from that point
    const messageIndex = currentChat.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;
    const updatedMessages = currentChat.messages.slice(0, messageIndex);
    updatedMessages.push({
      ...currentChat.messages[messageIndex],
      content: newContent
    });
    setChats(chats.map(c =>
      c.id === currentChatId ? { ...c, messages: updatedMessages } : c
    ));
    // Send the edited message
    sendMessage(newContent, updatedMessages.slice(0, -1));
  };
  const sendMessage = async (content, existingMessages = currentChat.messages) => {
    const userMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now()
    };
    const updatedMessages = [...existingMessages, userMessage];
    setChats(chats.map(c =>
      c.id === currentChatId ? { ...c, messages: updatedMessages } : c
    ));
    setInput('');
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = settings.apiMode === 'api' ? settings.apiEndpoint : settings.localEndpoint;
      const model = settings.apiMode === 'api' ? settings.model : settings.localModel;
      const messages = [
        { role: 'system', content: settings.systemPrompt },
        ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
      ];
      const headers = {
        'Content-Type': 'application/json'
      };
      if (settings.apiKey && settings.apiMode === 'api') {
        headers['Authorization'] = `Bearer ${settings.apiKey}`;
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model,
          messages,
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
          top_p: settings.topP,
          stream: settings.streaming
        })
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      if (settings.streaming) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = '';
        const assistantMessage = {
          id: generateId(),
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        };
        setChats(prev => prev.map(c =>
          c.id === currentChatId ? { ...c, messages: [...updatedMessages, assistantMessage] } : c
        ));
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.startsWith('data: '));
          for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              assistantContent += content;
              setChats(prev => prev.map(c =>
                c.id === currentChatId ? {
                  ...c,
                  messages: c.messages.map(m =>
                    m.id === assistantMessage.id ? { ...m, content: assistantContent } : m
                  )
                } : c
              ));
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      } else {
        const data = await response.json();
        const assistantContent = data.choices?.[0]?.message?.content || 'No response received.';
        const assistantMessage = {
          id: generateId(),
          role: 'assistant',
          content: assistantContent,
          timestamp: Date.now()
        };
        setChats(prev => prev.map(c =>
          c.id === currentChatId ? { ...c, messages: [...updatedMessages, assistantMessage] } : c
        ));
      }
    } catch (err) {
      setError(err.message);
      // Add error message
      const errorMessage = {
        id: generateId(),
        role: 'assistant',
        content: `⚠️ Error: ${err.message}\n\nPlease check your settings and try again.`,
        timestamp: Date.now()
      };
      setChats(prev => prev.map(c =>
        c.id === currentChatId ? { ...c, messages: [...updatedMessages, errorMessage] } : c
      ));
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const toggleDarkMode = () => {
    const newSettings = { ...settings, darkMode: !settings.darkMode };
    setSettings(newSettings);
    localStorage.setItem('berrychat_settings', JSON.stringify(newSettings));
  };
  return React.createElement('div', { className: `app-container ${settings.darkMode ? 'dark' : 'light'}` },
    // Sidebar
    React.createElement(Sidebar, {
      chats,
      currentChatId,
      onSelectChat: handleSelectChat,
      onNewChat: handleNewChat,
      onDeleteChat: handleDeleteChat,
      isCollapsed: sidebarCollapsed,
      onToggle: () => setSidebarCollapsed(!sidebarCollapsed)
    }),
    // Main content
    React.createElement('div', { className: 'main-content flex-1 flex flex-col h-screen' },
      // Header
      React.createElement('header', { className: 'header flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950/90 backdrop-blur' },
        React.createElement('div', { className: 'flex items-center gap-3' },
          React.createElement('button', {
            onClick: () => setSidebarCollapsed(!sidebarCollapsed),
            className: 'p-2 text-gray-400 hover:text-white transition-colors',
            title: 'Toggle Chat History'
          }, React.createElement(Icons.Menu)),
          React.createElement(PigMascot, { state: 'happy', size: 36 }),
          React.createElement('h1', { className: 'text-xl font-bold text-pink-400' }, 'Artificial Lazy Game Builder')
        ),
        React.createElement('div', { className: 'flex items-center gap-2' },
          React.createElement('button', {
            onClick: handleNewChat,
            className: 'hidden md:flex items-center gap-2 px-3 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-medium transition-colors',
            title: 'New Chat (Ctrl+N)'
          }, React.createElement(Icons.Plus), 'New'),
          React.createElement('button', {
            onClick: handleExport,
            className: 'p-2 text-gray-400 hover:text-white transition-colors',
            title: 'Export Chat (Ctrl+E)'
          }, React.createElement(Icons.Download)),
          React.createElement('button', {
            onClick: () => setConfirmDelete('clear')},
            React.createElement('span', {
              className: 'p-2 text-gray-400 hover:text-red-400 transition-colors',
              title: 'Clear Chat'
            }, React.createElement(Icons.Trash))
          ),
          React.createElement('button', {
            onClick: toggleDarkMode,
            className: 'p-2 text-gray-400 hover:text-white transition-colors'
          }, settings.darkMode ? React.createElement(Icons.Sun) : React.createElement(Icons.Moon)),
          React.createElement('button', {
            onClick: () => setShowSettings(true),
            className: 'p-2 text-gray-400 hover:text-pink-400 transition-colors'
          }, React.createElement(Icons.Settings))
        )
      ),
      // Messages area
      React.createElement('div', { className: 'messages-area flex-1 overflow-y-auto p-4' },
        currentChat?.messages.length === 0 && React.createElement('div', { className: 'empty-state flex flex-col items-center justify-center h-full text-center' },
          React.createElement(PigMascot, { state: 'normal', size: 80 }),
          React.createElement('h2', { className: 'text-2xl font-bold text-pink-400 mt-4' }, 'Welcome to ALGB!'),
          React.createElement('p', { className: 'text-gray-400 mt-2 max-w-md' },
            'Your customizable AI chat interface. Configure your API settings and start chatting!'
          ),
          React.createElement('div', { className: 'mt-6 flex gap-2' },
            React.createElement('button', {
              onClick: () => setShowSettings(true),
              className: 'px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors'
            }, 'Configure Settings'),
            React.createElement('span', { className: 'text-gray-500 text-sm self-center' },
              `Mode: ${settings.apiMode === 'api' ? 'API' : 'Local'}`
            )
          )
        ),
        currentChat?.messages.map(msg =>
          React.createElement(Message, {
            key: msg.id,
            message: msg,
            onEdit: handleEditMessage
          })
        ),
        isLoading && React.createElement(TypingIndicator),
        React.createElement('div', { ref: messagesEndRef })
      ),
      // Input area
      React.createElement('div', { className: 'input-area p-4 border-t border-gray-800 bg-gray-950' },
        React.createElement('form', { onSubmit: handleSubmit, className: 'relative' },
          React.createElement('textarea', {
            ref: inputRef,
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: 'Type your message... (Shift+Enter for new line)',
            className: 'w-full p-4 pr-14 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 resize-none focus:outline-none focus:border-pink-500 transition-colors',
            rows: 3,
            disabled: isLoading
          }),
          React.createElement('button', {
            type: 'submit',
            disabled: !input.trim() || isLoading,
            className: 'absolute right-3 bottom-3 p-2 bg-pink-600 hover:bg-pink-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors'
          }, React.createElement(Icons.Send))
        ),
        React.createElement('div', { className: 'flex items-center justify-between mt-2 text-xs text-gray-500' },
          React.createElement('span', null, 'Press Enter to send, Shift+Enter for new line'),
          React.createElement('span', null, `${input.length} characters`)
        )
      ),

    ),
    // Settings panel
    showSettings && React.createElement(SettingsPanel, {
      settings,
      setSettings,
      onClose: () => setShowSettings(false),
      darkMode: settings.darkMode
    }),
    // Confirm dialog
    confirmDelete && React.createElement(ConfirmDialog, {
      message: confirmDelete === 'clear' 
        ? 'Are you sure you want to clear this chat? This cannot be undone.'
        : 'Are you sure you want to delete this chat? This cannot be undone.',
      onConfirm: () => {
        if (confirmDelete === 'clear') {
          handleClearChat();
          setConfirmDelete(null);
        } else {
          confirmDeleteChat();
        }
      },
      onCancel: () => setConfirmDelete(null)
    }),
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));