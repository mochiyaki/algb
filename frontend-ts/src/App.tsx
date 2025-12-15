import React, { useState, useEffect, useRef, useCallback } from 'react';

// Utility functions
const generateId = () => Math.random().toString(36).substring(2, 15);
const formatTime = (date: number) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatDate = (date: number) => new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' });

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface Chat {
  id: string;
  messages: Message[];
  createdAt: number;
}

interface Settings {
  apiMode: 'api' | 'local';
  apiEndpoint: string;
  apiKey: string;
  model: string;
  localEndpoint: string;
  localModel: string;
  systemPrompt: string;
  streaming: boolean;
  temperature: number;
  maxTokens: number;
  topP: number;
  darkMode: boolean;
}

// Default settings
const defaultSettings: Settings = {
  apiMode: 'api',
  apiEndpoint: 'https://api.tzafon.ai/v1',
  apiKey: '',
  model: 'tzafon.northstar.cua.sft',
  localEndpoint: 'http://localhost:1234/v1/chat/completions',
  localModel: 'local-model',
  systemPrompt: 'You are a helpful AI assistant. When asked to generate HTML code, always use proper code blocks with ```html syntax.',
  streaming: true,
  temperature: 0.7,
  maxTokens: 4096,
  topP: 1.0,
  darkMode: true
};

// Pig mascot component
const PigMascot: React.FC<{ state?: string; size?: number }> = ({ state = 'normal', size = 40 }) => {
  const pigStates: Record<string, string> = {
    normal: './assets/images/4f0f68db9ae2e95fcef3842061489bfd3a93c0133dfae2c552178607823f6555',
    thinking: './assets/images/8fb7870dc8becc3faa77ea3d9f7bd6f47f0e64e270d8c2275c7e7e07be5c579b',
    confused: './assets/images/f86d1781277a3de7c78dd2ca973b8b17af4f14ae5ec76856abebc6ac623fddc8',
    happy: './assets/images/9cf061436a2128d4b1edf70143ff6b5750ebaf981d289dfb83770d2158ad5636'
  };

  return (
    <img
      src={pigStates[state] || pigStates.normal}
      alt="Berry Pig"
      style={{ width: size, height: size, objectFit: 'contain' }}
      className={state === 'thinking' ? 'animate-bounce' : ''}
    />
  );
};

// Icon components
const Icons = {
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1={12} y1={5} x2={12} y2={19} />
      <line x1={5} y1={12} x2={19} y2={12} />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx={12} cy={12} r={3} />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1={12} y1={15} x2={12} y2={3} />
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1={22} y1={2} x2={11} y2={13} />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1={3} y1={12} x2={21} y2={12} />
      <line x1={3} y1={6} x2={21} y2={6} />
      <line x1={3} y1={18} x2={21} y2={18} />
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1={18} y1={6} x2={6} y2={18} />
      <line x1={6} y1={6} x2={18} y2={18} />
    </svg>
  ),
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Launch: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1={10} y1={14} x2={21} y2={3} />
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx={12} cy={12} r={5} />
      <line x1={12} y1={1} x2={12} y2={3} />
      <line x1={12} y1={21} x2={12} y2={23} />
      <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
      <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
      <line x1={1} y1={12} x2={3} y2={12} />
      <line x1={21} y1={12} x2={23} y2={12} />
      <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
      <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('berrychat_settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = localStorage.getItem('berrychat_chats');
    if (saved) return JSON.parse(saved);
    const initialChat: Chat = { id: generateId(), messages: [], createdAt: Date.now() };
    return [initialChat];
  });

  const [currentChatId, setCurrentChatId] = useState<string>(() => {
    const saved = localStorage.getItem('berrychat_currentChat');
    const chatsSaved = localStorage.getItem('berrychat_chats');
    let chatsData: Chat[] = chatsSaved ? JSON.parse(chatsSaved) : [{ id: generateId() }];
    if (chatsData.length === 0) {
      chatsData = [{ id: generateId() }];
    }
    return saved || chatsData[0].id;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find(c => c.id === currentChatId)!;

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
    const handleKeyDown = (e: KeyboardEvent) => {
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
    const newChat: Chat = { id: generateId(), messages: [], createdAt: Date.now() };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setSidebarCollapsed(true);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setSidebarCollapsed(true);
  };

  const handleDeleteChat = (chatId: string) => {
    setConfirmDelete(chatId);
  };

  const confirmDeleteChat = () => {
    const newChats = chats.filter(c => c.id !== confirmDelete);
    if (newChats.length === 0) {
      const newChat: Chat = { id: generateId(), messages: [], createdAt: Date.now() };
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

  const handleClearChat = () => {
    setChats(chats.map(c =>
      c.id === currentChatId ? { ...c, messages: [] } : c
    ));
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
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

  const sendMessage = async (content: string, existingMessages = currentChat.messages) => {
    const userMessage: Message = {
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

      const headers: Record<string, string> = {
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
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let assistantContent = '';
        const assistantMessage: Message = {
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
        const assistantMessage: Message = {
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
      setError((err as Error).message);
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `⚠️ Error: ${(err as Error).message}\n\nPlease check your settings and try again.`,
        timestamp: Date.now()
      };
      setChats(prev => prev.map(c =>
        c.id === currentChatId ? { ...c, messages: [...updatedMessages, errorMessage] } : c
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  return (
    <div className={`app-container ${settings.darkMode ? 'dark' : 'light'}`}>
      {/* TODO: Add the rest of the components */}
      <h1>ALGB - Custom LLM Interface</h1>
    </div>
  );
};

export default App;
