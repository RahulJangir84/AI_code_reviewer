import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-python'
// Add more languages as needed
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
// Import CodeMirror
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript' // Import language you need
import './App.css'
const port="http://localhost:3002";

function App() {
  const [code, setCode] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Highlight all code blocks after response changes
    if (response) {
      // Use a slightly longer timeout to ensure DOM is fully rendered
      setTimeout(() => {
        Prism.highlightAll()
      }, 300)
    }
  }, [response])

  const handleSubmit = async () => {
    if (!code.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch(port+'/ai/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: code })
      })
      
      const data = await res.text()
      setResponse(data)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Error: Failed to get response from AI')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <header className='app-header'>
      <h2>AI Code Reviewer</h2>
    </header>
    <main>
      <div className="left">
        <div className="code-container">
          <h2>Code Input</h2>
          {/* Replace textarea with CodeMirror */}
          <CodeMirror
            value={code}
            height="100%"
            theme="dark"
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
            className="code-editor"
          />
        </div>
        <div className="button-container">
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Review Code'}
          </button>
        </div>
      </div>
      <div className="right">
        <div className="response-container">
          <h2>AI Review</h2>
          <div className="response-content">
            {loading ? (
              <div className="loading">Analyzing your code...</div>
            ) : response ? (
              <div className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-([\w-]+)/.exec(className || '')
                      return !inline && match ? (
                        <pre className={`language-${match[1]}`}>
                          <code className={`language-${match[1]}`} {...props}>
                            {String(children).replace(/\n$/, '')}
                          </code>
                        </pre>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="placeholder">AI review will appear here</div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
