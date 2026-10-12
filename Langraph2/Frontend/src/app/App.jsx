import { useState, useRef, useEffect, useCallback } from 'react'
import ChatMessage from '../components/ChatMessage'
import { sendMessage } from '../services/api'
import './App.css'

const SUGGESTIONS = [
  'Write the code for factorial in js',
  'Explain var, let, and const',
  'How to reverse a string in Python?',
  'Implement binary search in JavaScript',
]

const HISTORY_ITEMS = [
  { id: 1, label: 'Factorial in JavaScript' },
  { id: 2, label: 'Sorting algorithms explained' },
  { id: 3, label: 'React hooks deep dive' },
  { id: 4, label: 'CSS Grid vs Flexbox' },
]

export default function App() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Auto scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
    }
  }

  const handleSend = useCallback(async (messageText) => {
    const text = (messageText || inputValue).trim()
    if (!text || isLoading) return

    setInputValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    setIsLoading(true)

    const timestamp = new Date()

    try {
      const response = await sendMessage(text)
      setMessages(prev => [...prev, {
        id: Date.now(),
        message: response,
        timestamp,
      }])
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, isLoading])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setInputValue('')
    setActiveHistoryId(null)
  }

  return (
    <div className="app-layout">
      {/* ─── Sidebar ─── */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">AI Judge</span>
            <span className="sidebar-logo-subtitle">Dual Solution Evaluator</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="sidebar-section">
          <button className="sidebar-new-chat" onClick={handleNewChat} id="new-chat-btn">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Evaluation
          </button>

          <div className="sidebar-section-label">Recent Sessions</div>
          <div className="sidebar-history">
            {HISTORY_ITEMS.map(item => (
              <div
                key={item.id}
                className={`sidebar-history-item ${activeHistoryId === item.id ? 'active' : ''}`}
                onClick={() => setActiveHistoryId(item.id)}
                id={`history-item-${item.id}`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-model-badge">
            <div className="sidebar-model-badge-dot" />
            <span>Dual AI Models Active</span>
          </div>
        </div>
      </aside>

      {/* ─── Main Area ─── */}
      <main className="main-area">
        {/* Top Bar */}
        <div className="topbar">
          <div>
            <div className="topbar-title">Dual Solution Evaluator</div>
            <div className="topbar-subtitle">Get two AI perspectives on any coding problem, then let the judge decide</div>
          </div>
          <div className="topbar-actions">
            <div className="topbar-badge">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Live
            </div>
            <div className="topbar-badge">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              2 Models
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="chat-container" id="chat-container">
          {messages.length === 0 && !isLoading ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h1 className="empty-state-title">Ask any coding question</h1>
              <p className="empty-state-desc">
                Two AI models will generate independent solutions. A judge AI will evaluate both and provide a detailed score with reasoning.
              </p>
              <div className="empty-state-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="suggestion-chip"
                    id={`suggestion-${i}`}
                    onClick={() => handleSend(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map(msg => (
                <ChatMessage
                  key={msg.id}
                  message={msg.message}
                  timestamp={msg.timestamp}
                />
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="loading-state">
                  <div className="loading-dots">
                    <div className="loading-dot" />
                    <div className="loading-dot" />
                    <div className="loading-dot" />
                  </div>
                  <span className="loading-text">Generating solutions &amp; evaluating…</span>
                </div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            {/* Code icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>

            <textarea
              ref={textareaRef}
              id="message-input"
              className="input-field"
              placeholder="Ask a coding question to get two AI solutions evaluated by a judge…"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
            />

            <div className="input-actions">
              <button
                id="send-btn"
                className="send-btn"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
          <p className="input-hint">
            Press <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: '3px' }}>Enter</kbd> to send &nbsp;·&nbsp;
            <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: '3px' }}>Shift+Enter</kbd> for new line
          </p>
        </div>
      </main>
    </div>
  )
}
