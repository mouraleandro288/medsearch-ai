import React, { useState } from 'react'
import './App.css'

// Dados mock para demonstração
const mockData = [
  {
    id: 1,
    filename: "atendimento_12345.txt",
    patient: "João Silva",
    attendance: "12345",
    date: "2023-05-15",
    content: "Paciente relata dor abdominal intensa. Realizada biópsia de próstata, utilizando tomografia de abdômen superior, foi realizado sob anestesia regional e após o procedimento realizado curativo. Tomografia computadorizada (TC) de abdome que evidenciou apendicite aguda. Encaminhado para cirurgia."
  },
  {
    id: 2,
    filename: "atendimento_67890.txt", 
    patient: "Maria Santos",
    attendance: "67890",
    date: "2023-05-16",
    content: "Paciente apresenta quadro de cefaleia intensa. Realizada tomografia de crânio que não evidenciou alterações. Prescrito analgésico e repouso."
  }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    
    const results = mockData.filter(item => 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.filename.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleSelectText = (content) => {
    setSelectedText(content)
    setShowAnalysis(true)
  }

  const handleAnalyzeAI = () => {
    setShowProcessing(true)
    setProgress(0)
    
    // Simular progresso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowProcessing(false)
          setAnalysisResults({
            totalValue: 610.80,
            confidence: 88,
            procedures: [
              { name: "CURATIVO GRAU II", code: "0101010020", value: 25.80, confidence: 85, type: "Curativo" },
              { name: "BIOPSIA DE PROSTATA", code: "0205020030", value: 180.00, confidence: 90, type: "Procedimento Cirúrgico" },
              { name: "TOMOGRAFIA DE ABDOMEN", code: "0206010040", value: 320.00, confidence: 95, type: "Exame de Imagem" },
              { name: "ANESTESIA REGIONAL", code: "0301010050", value: 85.00, confidence: 80, type: "Anestesia" }
            ]
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const highlightText = (text, term) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="title">
          <span className="title-med">Med</span>
          <span className="title-search">Search</span>
          <span className="title-ai">AI</span>
        </h1>
        <p className="subtitle">Sistema Inteligente de Análise de Evoluções Médicas com IA para Faturamento</p>
      </header>

      {/* Network Connection */}
      <section className="network-section">
        <h2>🔗 Conexão com Rede Local</h2>
        <p>Conecte-se à rede local para carregar automaticamente os arquivos médicos e planilhas</p>
        <div className="network-input">
          <input 
            type="text" 
            placeholder="Caminho da rede (ex: \\10.2.30.13\...)"
            defaultValue="\\10.2.30.13\Gerencia_Hospitalidade_1A\Coordenador\Leandro\MedSearch AI"
            className="network-path"
          />
          <button 
            onClick={handleConnect}
            className={`connect-btn ${isConnected ? 'connected' : ''}`}
          >
            {isConnected ? '✅ Conectado' : '🔌 Conectar'}
          </button>
        </div>
        {isConnected && (
          <div className="connection-status">
            ● Conectado à rede - Arquivos carregados automaticamente
          </div>
        )}
      </section>

      {/* Search Section */}
      <section className="search-section">
        <h2>🔍 Busca Inteligente</h2>
        <p>Pesquise por pacientes, atendimentos ou conteúdo médico</p>
        <div className="search-input">
          <input
            type="text"
            placeholder="Digite sua busca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
          />
          <button onClick={handleSearch} className="search-btn">
            🔍 Buscar
          </button>
        </div>
      </section>

      {/* Results */}
      {searchResults.length > 0 && (
        <section className="results-section">
          <h3>📋 Resultados da Busca ({searchResults.length})</h3>
          {searchResults.map(result => (
            <div key={result.id} className="result-card">
              <div className="result-header">
                <h4>{result.filename}</h4>
                <span className="result-count">1 ocorrências</span>
                <button 
                  onClick={() => handleSelectText(result.content)}
                  className="view-btn"
                >
                  👁️
                </button>
              </div>
              <div className="result-info">
                <span>Paciente: {result.patient}</span>
                <span>Atendimento: {result.attendance}</span>
                <span>Data: {result.date}</span>
              </div>
              <div 
                className="result-content"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(result.content, searchTerm) 
                }}
              />
            </div>
          ))}
        </section>
      )}

      {/* AI Analysis */}
      {showAnalysis && (
        <section className="analysis-section">
          <h3>🧠 Análise de IA para Faturamento</h3>
          <p>Texto selecionado será analisado para sugestões de procedimentos</p>
          <div className="selected-text">
            {selectedText}
          </div>
          <button onClick={handleAnalyzeAI} className="analyze-btn">
            🧠 Analisar com IA
          </button>
        </section>
      )}

      {/* Processing Modal */}
      {showProcessing && (
        <div className="modal-overlay">
          <div className="processing-modal">
            <h3>🧠 Análise de IA em Andamento</h3>
            <p>Nossa inteligência artificial está processando o texto médico</p>
            <div className="progress-circle">
              <div className="progress-text">{progress}%</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${progress}%`}}></div>
            </div>
            <p>Calculando valores estimados...</p>
            <div className="progress-steps">
              <span className={progress > 30 ? 'active' : ''}>Análise</span>
              <span className={progress > 60 ? 'active' : ''}>Processamento</span>
              <span className={progress > 90 ? 'active' : ''}>Resultados</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {analysisResults && (
        <div className="modal-overlay">
          <div className="results-modal">
            <div className="modal-header">
              <h3>💰 Análise de Faturamento - Resultados</h3>
              <button onClick={() => setAnalysisResults(null)} className="close-btn">✕</button>
            </div>
            <p>Procedimentos sugeridos pela IA com base no texto analisado</p>
            
            <div className="summary">
              <div className="summary-item">
                <h4>Valor Total Estimado</h4>
                <div className="total-value">R$ {analysisResults.totalValue.toFixed(2)}</div>
              </div>
              <div className="summary-item">
                <h4>Confiança da Análise</h4>
                <div className="confidence">{analysisResults.confidence}%</div>
              </div>
            </div>

            <h4>Procedimentos Identificados:</h4>
            <div className="procedures-list">
              {analysisResults.procedures.map((proc, index) => (
                <div key={index} className="procedure-item">
                  <div className="procedure-info">
                    <h5>{proc.name}</h5>
                    <p>Código: {proc.code}</p>
                    <span className="procedure-type">{proc.type}</span>
                  </div>
                  <div className="procedure-value">
                    <div className="value">R$ {proc.value.toFixed(2)}</div>
                    <div className="confidence">{proc.confidence}% confiança</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-number">4</div>
          <div className="stat-label">Arquivos Carregados</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-number">5</div>
          <div className="stat-label">Procedimentos SIGTAP</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-number">2</div>
          <div className="stat-label">Contas Processadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-number">1</div>
          <div className="stat-label">Protocolos</div>
        </div>
      </section>
    </div>
  )
}

export default App

