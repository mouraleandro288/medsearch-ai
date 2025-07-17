"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  FileText,
  Upload,
  Eye,
  DollarSign,
  Brain,
  FileSpreadsheet,
  Activity,
  Calendar,
  User,
  Hash,
  Filter,
  BarChart3,
  Zap,
  X,
  RefreshCw,
  Folder,
  Network,
} from "lucide-react"
import * as XLSX from "xlsx"
import './App.css'

// Componente para título animado
const AnimatedTitle = () => {
  return (
    <div className="text-rotate mb-8">
      <span className="text-rotate-sr-only">MedSearch AI</span>
      <div className="text-rotate-lines">
        <div className="text-rotate-word">
          <span className="text-rotate-element text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
            Med
          </span>
          <span className="text-rotate-space"> </span>
          <span className="text-rotate-element text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-bounce">
            Search
          </span>
          <span className="text-rotate-space"> </span>
          <span className="text-rotate-element text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            AI
          </span>
        </div>
      </div>
    </div>
  )
}

// Componente para modal de processamento melhorado
const ProcessingModal = ({ isOpen, message, onClose }) => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95
          return prev + Math.random() * 15
        })
      }, 500)
      
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
            Análise de IA em Andamento
          </DialogTitle>
          <DialogDescription>
            Nossa inteligência artificial está processando o texto médico
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Indicador visual principal */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Mensagem de status */}
          <div className="text-center">
            <p className="text-sm text-gray-600 animate-pulse">{message}</p>
          </div>
          
          {/* Indicadores de etapas */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center space-y-1">
              <div className={`w-3 h-3 rounded-full ${progress > 20 ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}></div>
              <span className="text-gray-600">Análise</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className={`w-3 h-3 rounded-full ${progress > 60 ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}></div>
              <span className="text-gray-600">Processamento</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className={`w-3 h-3 rounded-full ${progress > 90 ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}></div>
              <span className="text-gray-600">Resultados</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Tipos de dados para a aplicação
/**
 * @typedef {Object} MedicalFile
 * @property {number} id
 * @property {string} fileName
 * @property {string} fileType
 * @property {string} attendanceNumber
 * @property {string} patientName
 * @property {string} recordNumber
 * @property {string} date
 * @property {string} content
 * @property {boolean} isExternal
 * @property {number} [matches]
 * @property {number} [relevance]
 */

/**
 * @typedef {Object} ProcedureData
 * @property {string} codigo
 * @property {string} descricao
 * @property {number} [valor]
 * @property {string} [categoria]
 */

/**
 * @typedef {Object} BillingAnalysis
 * @property {Array} procedures
 * @property {number} totalValue
 * @property {number} confidence
 */

export default function MedSearchAI() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")
  const [secondSearchTerm, setSecondSearchTerm] = useState("")
  const [loadedFiles, setLoadedFiles] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [selectedText, setSelectedText] = useState("")
  const [showSecondFilter, setShowSecondFilter] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [billingAnalysis, setBillingAnalysis] = useState(null)
  const [procedureDinamico, setProcedureDinamico] = useState([])
  const [procedureCompatibilidade, setProcedureCompatibilidade] = useState([])
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [showFileModal, setShowFileModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [contasData, setContasData] = useState([])
  const [protocoloData, setProtocoloData] = useState([])
  const [showBillingDetailsModal, setShowBillingDetailsModal] = useState(false)
  const [selectedAttendanceForBilling, setSelectedAttendanceForBilling] = useState("")
  const [analysisText, setAnalysisText] = useState("")
  const [isConnectedToNetwork, setIsConnectedToNetwork] = useState(false)
  const [networkPath, setNetworkPath] = useState("\\\\10.2.30.13\\Gerencia_Hospitalidade_1A\\Coordenador\\Leandro\\MedSearch AI")

  // Novos estados para o modal de processamento
  const [showProcessingModal, setShowProcessingModal] = useState(false)
  const [processingMessage, setProcessingMessage] = useState("Iniciando análise...")
  const processingIntervalRef = useRef(null)

  // Mock data for demonstration
  const mockFiles = [
    {
      id: 1,
      fileName: "atendimento_12345.txt",
      attendanceNumber: "12345",
      patientName: "João Silva",
      recordNumber: "P78901",
      date: "2023-05-15",
      fileType: "Texto",
      content:
        "Paciente relata dor abdominal intensa. Realizada biópsia de próstata, utilizando tomografia de abdômen superior, foi realizado sob anestesia regional e após o procedimento realizado curativo. Tomografia computadorizada (TC) de abdome que evidenciou apendicite aguda. Encaminhado para cirurgia.",
      isExternal: false,
    },
    {
      id: 2,
      fileName: "atendimento_67890.txt",
      attendanceNumber: "67890",
      patientName: "Maria Santos",
      recordNumber: "P12345",
      date: "2023-06-20",
      fileType: "Texto",
      content:
        "Paciente com histórico de diabetes. Solicitada tomografia de tórax para investigação de pneumonia. Resultado: consolidação em lobo inferior direito. Realizado curativo grau II.",
      isExternal: false,
    },
  ]

  // Mock procedure data
  const mockProcedureDinamico = [
    { codigo: "0101010010", descricao: "CURATIVO GRAU I", valor: 15.5, categoria: "Curativo" },
    { codigo: "0101010020", descricao: "CURATIVO GRAU II", valor: 25.8, categoria: "Curativo" },
    { codigo: "0205020030", descricao: "BIOPSIA DE PROSTATA", valor: 180.0, categoria: "Procedimento Cirúrgico" },
    { codigo: "0206010040", descricao: "TOMOGRAFIA DE ABDOMEN", valor: 320.0, categoria: "Exame de Imagem" },
    { codigo: "0301010050", descricao: "ANESTESIA REGIONAL", valor: 85.0, categoria: "Anestesia" },
  ]

  const mockProcedureCompatibilidade = [
    { codigo: "0101010010", descricao: "Procedimento de curativo simples", categoria: "Curativo" },
    { codigo: "0205020030", descricao: "Biópsia prostática por agulha", categoria: "Procedimento Cirúrgico" },
    { codigo: "0206010040", descricao: "TC de abdome com contraste", categoria: "Exame de Imagem" },
  ]

  // Mock billing data
  const mockContasData = [
    {
      Atendimento: "12345",
      "Cd procedimento": "0206010040",
      "Descricao Procedimento": "TOMOGRAFIA DE ABDOMEN",
      Quantidade: 1,
      "Vl procedimento": 320.0,
      Setor: "Ex. Tomografia - HSP",
    },
    {
      Atendimento: "12345",
      "Cd procedimento": "0205020030",
      "Descricao Procedimento": "BIOPSIA DE PROSTATA",
      Quantidade: 1,
      "Vl procedimento": 180.0,
      Setor: "Ex. Cirurgia - HSP",
    },
  ]

  const mockProtocoloData = [
    {
      Atendimento: "12345",
      "Número conta": "70024770",
      "Período Inicial": "24/02/2025 09:09:00",
      "Valor conta": 422.19,
    },
  ]

  useEffect(() => {
    setLoadedFiles(mockFiles)
    setProcedureDinamico(mockProcedureDinamico)
    setProcedureCompatibilidade(mockProcedureCompatibilidade)
    setContasData(mockContasData)
    setProtocoloData(mockProtocoloData)
    console.log("Mock data loaded")
  }, [])

  // Função para conectar à rede e carregar arquivos automaticamente
  const connectToNetwork = async () => {
    try {
      setIsConnectedToNetwork(true)
      console.log("Conectando à rede:", networkPath)
      
      // Simular carregamento de arquivos da rede
      // Em uma implementação real, isso seria feito através de uma API backend
      // que teria acesso aos arquivos da rede local
      
      // Por enquanto, vamos simular o carregamento
      setTimeout(() => {
        console.log("Arquivos carregados da rede com sucesso")
        alert("Conectado à rede! Arquivos carregados automaticamente.")
      }, 2000)
      
    } catch (error) {
      console.error("Erro ao conectar à rede:", error)
      setIsConnectedToNetwork(false)
      alert("Erro ao conectar à rede. Verifique o caminho e permissões.")
    }
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Por favor, digite um termo de busca.")
      return
    }

    console.log(`Iniciando busca por: "${searchTerm}"`)
    console.log(`Total de arquivos carregados: ${loadedFiles.length}`)

    const allFiles = [...mockFiles, ...loadedFiles]
    console.log(`Total de arquivos para busca: ${allFiles.length}`)

    const filteredFiles = allFiles.filter((file) => {
      if (dateStart && file.date < dateStart) return false
      if (dateEnd && file.date > dateEnd) return false

      let matches = false
      switch (searchType) {
        case "patient":
          matches = file.patientName && file.patientName.toLowerCase().includes(searchTerm.toLowerCase())
          break
        case "attendance":
          matches = file.attendanceNumber && file.attendanceNumber.includes(searchTerm)
          break
        case "record":
          matches = file.recordNumber && file.recordNumber.includes(searchTerm)
          break
        default:
          if (file.content) {
            const contentLower = file.content.toLowerCase()
            const termLower = searchTerm.toLowerCase()
            matches = contentLower.includes(termLower)
          }
          break
      }

      return matches
    })

    console.log(`Arquivos encontrados após filtro: ${filteredFiles.length}`)

    const resultsWithRelevance = filteredFiles.map((file) => {
      const content = (file.content ?? "").toLowerCase()
      const term = searchTerm.toLowerCase()
      const matches = (content.match(new RegExp(term, "g")) || []).length

      return {
        ...file,
        matches,
        relevance: matches * 10 + ((file.fileName ?? "").toLowerCase().includes(term) ? 5 : 0),
      }
    })

    resultsWithRelevance.sort((a, b) => b.relevance - a.relevance)
    setSearchResults(resultsWithRelevance)
    setShowSecondFilter(resultsWithRelevance.length > 0)
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString() && selection.toString().trim()) {
      const selectedTextValue = selection.toString().trim()
      if (selectedTextValue && selectedTextValue.length > 0) {
        setSelectedText(selectedTextValue)
      }
    }
  }

  const analyzeTextForBilling = async (text) => {
    setIsAnalyzing(true)
    setShowProcessingModal(true)
    setProcessingMessage("Iniciando análise...")

    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current)
    }

    let currentStep = 0
    const messages = [
      "Analisando o texto fornecido...",
      "Enviando para o modelo de linguagem...",
      "Recebendo sugestões de procedimentos...",
      "Calculando valores estimados...",
      "Gerando relatório de faturamento...",
      "Finalizando análise...",
    ]

    processingIntervalRef.current = setInterval(() => {
      setProcessingMessage(messages[currentStep % messages.length])
      currentStep++
    }, 700)

    console.log("=== INICIANDO ANÁLISE DE FATURAMENTO ===")
    console.log("Texto para análise:", text)

    try {
      // Simular análise de IA (em produção seria uma chamada real para API)
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      // Análise simulada baseada no texto
      const procedures = []
      
      if (text.toLowerCase().includes("curativo")) {
        procedures.push({
          code: "0101010020",
          description: "CURATIVO GRAU II",
          confidence: 85,
          category: "Curativo"
        })
      }
      
      if (text.toLowerCase().includes("biópsia") || text.toLowerCase().includes("biopsia")) {
        procedures.push({
          code: "0205020030",
          description: "BIOPSIA DE PROSTATA",
          confidence: 90,
          category: "Procedimento Cirúrgico"
        })
      }
      
      if (text.toLowerCase().includes("tomografia")) {
        procedures.push({
          code: "0206010040",
          description: "TOMOGRAFIA DE ABDOMEN",
          confidence: 95,
          category: "Exame de Imagem"
        })
      }
      
      if (text.toLowerCase().includes("anestesia")) {
        procedures.push({
          code: "0301010050",
          description: "ANESTESIA REGIONAL",
          confidence: 80,
          category: "Anestesia"
        })
      }

      const totalValue = procedures.reduce((sum, proc) => {
        const procedureData = procedureDinamico.find((p) => p.codigo === proc.code)
        const value = procedureData?.valor || 0
        return sum + value
      }, 0)

      const analysis = {
        procedures: procedures.map((p) => ({
          text: p.description,
          suggestedCode: p.code,
          description: p.description,
          confidence: p.confidence || 0,
          category: p.category || "N/A",
        })),
        totalValue,
        confidence:
          procedures.length > 0
            ? Math.round(procedures.reduce((sum, p) => sum + (p.confidence || 0), 0) / procedures.length)
            : 0,
      }

      console.log("📊 Análise final:", analysis)
      console.log("=== FIM DA ANÁLISE ===")

      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current)
        processingIntervalRef.current = null
      }
      setShowProcessingModal(false)
      setBillingAnalysis(analysis)
      setShowBillingModal(true)
      setIsAnalyzing(false)
    } catch (error) {
      console.error("Erro na análise de faturamento:", error)
      alert(`Erro na análise de faturamento: ${error.message}`)
      if (processingIntervalRef.current) {
        clearInterval(processingIntervalRef.current)
        processingIntervalRef.current = null
      }
      setShowProcessingModal(false)
      setIsAnalyzing(false)
    }
  }

  const highlightText = (text, term) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, "gi")
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com título animado */}
        <div className="text-center py-8">
          <AnimatedTitle />
          <p className="text-xl text-gray-600 mt-4">
            Sistema Inteligente de Análise de Evoluções Médicas com IA para Faturamento
          </p>
        </div>

        {/* Seção de Conexão de Rede */}
        <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Conexão com Rede Local
            </CardTitle>
            <CardDescription>
              Conecte-se à rede local para carregar automaticamente os arquivos médicos e planilhas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={networkPath}
                onChange={(e) => setNetworkPath(e.target.value)}
                placeholder="Caminho da rede (ex: \\10.2.30.13\...)"
                className="flex-1"
              />
              <Button 
                onClick={connectToNetwork}
                disabled={isConnectedToNetwork}
                className="flex items-center gap-2"
              >
                <Folder className="h-4 w-4" />
                {isConnectedToNetwork ? "Conectado" : "Conectar"}
              </Button>
            </div>
            {isConnectedToNetwork && (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Conectado à rede - Arquivos carregados automaticamente</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seção de Busca */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Busca Inteligente
            </CardTitle>
            <CardDescription>
              Pesquise por pacientes, atendimentos ou conteúdo médico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Digite sua busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-2"
              />
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de busca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Busca geral</SelectItem>
                  <SelectItem value="patient">Nome do paciente</SelectItem>
                  <SelectItem value="attendance">Número do atendimento</SelectItem>
                  <SelectItem value="record">Número do prontuário</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Data inicial"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
              <Input
                type="date"
                placeholder="Data final"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Resultados da Busca */}
        {searchResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resultados da Busca ({searchResults.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.map((file) => (
                  <Card key={file.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{file.fileName}</h3>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>Paciente: {file.patientName}</span>
                            <span>Atendimento: {file.attendanceNumber}</span>
                            <span>Data: {file.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{file.matches} ocorrências</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedFile(file)
                              setShowFileModal(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div 
                        className="text-sm text-gray-700 cursor-pointer"
                        onMouseUp={handleTextSelection}
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            file.content.substring(0, 200) + "...",
                            searchTerm
                          )
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seção de Análise de IA */}
        {selectedText && (
          <Card className="border-2 border-blue-300 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análise de IA para Faturamento
              </CardTitle>
              <CardDescription>
                Texto selecionado será analisado para sugestões de procedimentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white rounded border">
                <p className="text-sm">{selectedText}</p>
              </div>
              <Button
                onClick={() => analyzeTextForBilling(selectedText)}
                disabled={isAnalyzing}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                {isAnalyzing ? "Analisando..." : "Analisar com IA"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Arquivos Carregados</p>
                  <p className="text-2xl font-bold">{loadedFiles.length + mockFiles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Procedimentos SIGTAP</p>
                  <p className="text-2xl font-bold">{procedureDinamico.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Contas Processadas</p>
                  <p className="text-2xl font-bold">{contasData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Protocolos</p>
                  <p className="text-2xl font-bold">{protocoloData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Processamento Melhorado */}
      <ProcessingModal
        isOpen={showProcessingModal}
        message={processingMessage}
        onClose={() => setShowProcessingModal(false)}
      />

      {/* Modal de Resultados de Faturamento */}
      <Dialog open={showBillingModal} onOpenChange={setShowBillingModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Análise de Faturamento - Resultados
            </DialogTitle>
            <DialogDescription>
              Procedimentos sugeridos pela IA com base no texto analisado
            </DialogDescription>
          </DialogHeader>
          
          {billingAnalysis && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded">
                  <p className="text-sm text-gray-600">Valor Total Estimado</p>
                  <p className="text-2xl font-bold text-blue-600">
                    R$ {billingAnalysis.totalValue.toFixed(2)}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <p className="text-sm text-gray-600">Confiança da Análise</p>
                  <p className="text-2xl font-bold text-green-600">
                    {billingAnalysis.confidence}%
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Procedimentos Identificados:</h4>
                {billingAnalysis.procedures.map((proc, index) => (
                  <div key={index} className="p-3 border rounded flex justify-between items-center">
                    <div>
                      <p className="font-medium">{proc.description}</p>
                      <p className="text-sm text-gray-600">Código: {proc.suggestedCode}</p>
                      <Badge variant="outline" className="mt-1">{proc.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        R$ {procedureDinamico.find(p => p.codigo === proc.suggestedCode)?.valor?.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-sm text-gray-600">{proc.confidence}% confiança</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Visualização de Arquivo */}
      <Dialog open={showFileModal} onOpenChange={setShowFileModal}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedFile?.fileName}
            </DialogTitle>
            <DialogDescription>
              Paciente: {selectedFile?.patientName} | Atendimento: {selectedFile?.attendanceNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFile && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">
                  {selectedFile.content}
                </pre>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedText(selectedFile.content)
                    setShowFileModal(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <Brain className="h-4 w-4" />
                  Analisar com IA
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

