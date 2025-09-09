'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Heart, 
  Users, 
  Calendar, 
  MessageCircle, 
  Video, 
  BookOpen, 
  Award, 
  Star, 
  Search, 
  Filter, 
  User, 
  UserPlus, 
  Shield, 
  Clock, 
  TrendingUp, 
  Brain, 
  Zap,
  CreditCard,
  Crown,
  Building,
  Target,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Globe,
  Leaf,
  Handshake,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  PieChart,
  Activity,
  Smartphone,
  Monitor,
  Headphones,
  Camera,
  Lock,
  Database,
  Cloud,
  Wifi,
  Cpu,
  Server,
  Code,
  GitBranch,
  Layers,
  Gauge,
  LineChart,
  BarChart,
  TrendingDown,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Share2,
  Copy,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RefreshCw,
  Home,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Mic,
  MicOff,
  Send,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Eye,
  EyeOff,
  LogOut,
  UserCheck,
  Stethoscope,
  GraduationCap,
  Wallet,
  QrCode,
  Receipt,
  MessageSquare,
  VideoIcon,
  PhoneCall,
  Trophy,
  Medal,
  Gift,
  Sparkles,
  Moon,
  Sun,
  Volume1,
  Pause,
  Play,
  Repeat,
  Shuffle,
  Music,
  Mic2,
  Radio,
  Podcast
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  type: 'patient' | 'professional'
  subscription?: 'free' | 'premium' | 'enterprise'
  points?: number
  level?: number
  avatar?: string
  phone?: string
  birthDate?: string
  gender?: string
  emergencyContact?: string
  medicalHistory?: string[]
  currentMedications?: string[]
  allergies?: string[]
  mentalHealthGoals?: string[]
  preferredLanguage?: string
  timezone?: string
  notifications?: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

interface Professional {
  id: string
  name: string
  specialty: string
  rating: number
  price: number
  experience: string
  photo: string
  available: boolean
  crm?: string
  crp?: string
  coren?: string
  bio?: string
  education?: string[]
  certifications?: string[]
  languages?: string[]
  availability?: {
    [key: string]: string[]
  }
  sessionTypes?: ('video' | 'chat' | 'presencial')[]
  location?: string
  verified: boolean
  totalSessions?: number
  responseTime?: string
  specializations?: string[]
}

interface MoodEntry {
  id: string
  date: string
  mood: number
  notes: string
  activities: string[]
  triggers?: string[]
  symptoms?: string[]
  energy?: number
  sleep?: number
  anxiety?: number
  stress?: number
}

interface Appointment {
  id: string
  professionalId: string
  professionalName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress'
  type: 'video' | 'chat' | 'presencial'
  price: number
  duration: number
  notes?: string
  rating?: number
  feedback?: string
  prescription?: string
  nextAppointment?: string
}

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderType: 'user' | 'professional' | 'ai'
  message: string
  timestamp: string
  type: 'text' | 'image' | 'file' | 'audio'
  read: boolean
  reactions?: string[]
}

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  modules: number
  price: number
  rating: number
  enrolled: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail: string
  progress?: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  unlocked: boolean
  unlockedAt?: string
  category: 'mood' | 'sessions' | 'learning' | 'community' | 'streak'
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'appointment' | 'mood' | 'achievement' | 'system' | 'emergency'
  timestamp: string
  read: boolean
  actionUrl?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

interface CrisisResource {
  name: string
  phone: string
  description: string
  available24h: boolean
  type: 'hotline' | 'emergency' | 'support'
}

export default function NovahApp() {
  const [currentView, setCurrentView] = useState('home')
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const [currentMood, setCurrentMood] = useState(5)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [moodNotes, setMoodNotes] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedSessionType, setSelectedSessionType] = useState('')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [currentAudioPlaying, setCurrentAudioPlaying] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState('medium')
  const [highContrast, setHighContrast] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Registration form states - moved to component level
  const [userType, setUserType] = useState<'patient' | 'professional'>('patient')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: '',
    specialty: '',
    crm: '',
    crp: '',
    coren: '',
    experience: '',
    bio: '',
    acceptTerms: false,
    acceptLGPD: false,
    acceptEmergencyProtocol: false
  })

  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: '1',
      name: 'Dra. Ana Silva',
      specialty: 'Psicóloga Clínica',
      rating: 4.9,
      price: 120,
      experience: '8 anos de experiência em TCC',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      available: true,
      crp: 'CRP 06/123456',
      bio: 'Especialista em Terapia Cognitivo-Comportamental com foco em ansiedade e depressão. Atendimento humanizado e baseado em evidências.',
      education: ['Psicologia - USP', 'Especialização em TCC - PUC'],
      certifications: ['Certificação em TCC', 'Formação em Mindfulness'],
      languages: ['Português', 'Inglês'],
      availability: {
        'monday': ['09:00', '10:00', '14:00', '15:00'],
        'tuesday': ['09:00', '10:00', '11:00', '14:00'],
        'wednesday': ['14:00', '15:00', '16:00'],
        'thursday': ['09:00', '10:00', '14:00', '15:00'],
        'friday': ['09:00', '10:00', '11:00']
      },
      sessionTypes: ['video', 'chat'],
      location: 'São Paulo, SP',
      verified: true,
      totalSessions: 1250,
      responseTime: '< 2h',
      specializations: ['Ansiedade', 'Depressão', 'TCC', 'Mindfulness']
    },
    {
      id: '2',
      name: 'Dr. Carlos Santos',
      specialty: 'Psiquiatra',
      rating: 4.8,
      price: 200,
      experience: '12 anos em transtornos de ansiedade',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      available: true,
      crm: 'CRM 12345/SP',
      bio: 'Psiquiatra com vasta experiência em transtornos de humor e ansiedade. Abordagem integrativa combinando medicação e psicoterapia.',
      education: ['Medicina - UNIFESP', 'Residência em Psiquiatria - HC-FMUSP'],
      certifications: ['Título de Especialista em Psiquiatria', 'Formação em Psicanálise'],
      languages: ['Português', 'Inglês', 'Espanhol'],
      availability: {
        'monday': ['08:00', '09:00', '10:00', '16:00'],
        'tuesday': ['08:00', '09:00', '16:00', '17:00'],
        'wednesday': ['08:00', '09:00', '10:00'],
        'thursday': ['16:00', '17:00', '18:00'],
        'friday': ['08:00', '09:00', '10:00']
      },
      sessionTypes: ['video', 'presencial'],
      location: 'São Paulo, SP',
      verified: true,
      totalSessions: 2100,
      responseTime: '< 1h',
      specializations: ['Transtornos de Humor', 'Ansiedade', 'Bipolaridade', 'Medicação']
    },
    {
      id: '3',
      name: 'Dra. Maria Oliveira',
      specialty: 'Terapeuta Familiar',
      rating: 4.7,
      price: 150,
      experience: '10 anos em terapia sistêmica',
      photo: 'https://images.unsplash.com/photo-1594824388853-d0c2d8b8b6b0?w=400&h=400&fit=crop',
      available: false,
      crp: 'CRP 08/789012',
      bio: 'Especialista em terapia familiar e de casal. Abordagem sistêmica para resolução de conflitos e fortalecimento de vínculos.',
      education: ['Psicologia - PUC-SP', 'Mestrado em Terapia Familiar'],
      certifications: ['Formação em Terapia Sistêmica', 'Mediação Familiar'],
      languages: ['Português'],
      availability: {
        'tuesday': ['14:00', '15:00', '16:00'],
        'wednesday': ['14:00', '15:00', '16:00'],
        'thursday': ['14:00', '15:00', '16:00'],
        'friday': ['09:00', '10:00', '11:00']
      },
      sessionTypes: ['video', 'presencial'],
      location: 'Rio de Janeiro, RJ',
      verified: true,
      totalSessions: 890,
      responseTime: '< 4h',
      specializations: ['Terapia Familiar', 'Terapia de Casal', 'Conflitos', 'Relacionamentos']
    }
  ])

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: '2024-03-15',
      mood: 7,
      notes: 'Dia produtivo no trabalho, me senti bem',
      activities: ['Trabalho', 'Exercício'],
      triggers: [],
      symptoms: [],
      energy: 8,
      sleep: 7,
      anxiety: 3,
      stress: 4
    },
    {
      id: '2',
      date: '2024-03-14',
      mood: 5,
      notes: 'Dia normal, sem grandes eventos',
      activities: ['Trabalho', 'Família'],
      triggers: ['Trânsito'],
      symptoms: ['Cansaço'],
      energy: 6,
      sleep: 6,
      anxiety: 5,
      stress: 6
    }
  ])

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      professionalId: '1',
      professionalName: 'Dra. Ana Silva',
      date: '2024-03-16',
      time: '14:00',
      status: 'scheduled',
      type: 'video',
      price: 120,
      duration: 50,
      notes: 'Primeira consulta - avaliação inicial'
    },
    {
      id: '2',
      professionalId: '2',
      professionalName: 'Dr. Carlos Santos',
      date: '2024-03-10',
      time: '16:00',
      status: 'completed',
      type: 'video',
      price: 200,
      duration: 50,
      notes: 'Consulta de acompanhamento',
      rating: 5,
      feedback: 'Excelente profissional, muito atencioso'
    }
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'ai',
      senderName: 'Assistente Novah',
      senderType: 'ai',
      message: 'Olá! Como você está se sentindo hoje? Estou aqui para ajudar com qualquer dúvida sobre seu bem-estar mental.',
      timestamp: '2024-03-15T10:00:00Z',
      type: 'text',
      read: true
    },
    {
      id: '2',
      senderId: 'user',
      senderName: 'Você',
      senderType: 'user',
      message: 'Oi! Estou me sentindo um pouco ansioso hoje.',
      timestamp: '2024-03-15T10:05:00Z',
      type: 'text',
      read: true
    },
    {
      id: '3',
      senderId: 'ai',
      senderName: 'Assistente Novah',
      senderType: 'ai',
      message: 'Entendo. A ansiedade é uma resposta natural do corpo, mas podemos trabalhar juntos para gerenciá-la. Que tal começarmos com uma técnica de respiração? Respire fundo por 4 segundos, segure por 4, e expire por 6. Repita 3 vezes.',
      timestamp: '2024-03-15T10:06:00Z',
      type: 'text',
      read: true
    }
  ])

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Gerenciamento de Estresse',
      description: 'Aprenda técnicas eficazes para lidar com o estresse do dia a dia',
      instructor: 'Dra. Ana Silva',
      duration: '4 semanas',
      modules: 8,
      price: 97,
      rating: 4.8,
      enrolled: 1250,
      category: 'Bem-estar',
      level: 'beginner',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      progress: 0
    },
    {
      id: '2',
      title: 'Inteligência Emocional',
      description: 'Desenvolva suas habilidades emocionais e melhore seus relacionamentos',
      instructor: 'Dr. Carlos Santos',
      duration: '6 semanas',
      modules: 12,
      price: 147,
      rating: 4.9,
      enrolled: 890,
      category: 'Desenvolvimento Pessoal',
      level: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      progress: 0
    },
    {
      id: '3',
      title: 'Relacionamentos Saudáveis',
      description: 'Construa e mantenha relacionamentos mais saudáveis e duradouros',
      instructor: 'Dra. Maria Oliveira',
      duration: '5 semanas',
      modules: 10,
      price: 127,
      rating: 4.7,
      enrolled: 650,
      category: 'Relacionamentos',
      level: 'intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
      progress: 0
    }
  ])

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Primeiro Registro',
      description: 'Registrou seu humor pela primeira vez',
      icon: 'heart',
      points: 10,
      unlocked: true,
      unlockedAt: '2024-03-10T10:00:00Z',
      category: 'mood'
    },
    {
      id: '2',
      title: 'Sequência de 7 dias',
      description: 'Registrou o humor por 7 dias consecutivos',
      icon: 'zap',
      points: 50,
      unlocked: true,
      unlockedAt: '2024-03-15T10:00:00Z',
      category: 'streak'
    },
    {
      id: '3',
      title: 'Primeira Consulta',
      description: 'Completou sua primeira consulta',
      icon: 'user-check',
      points: 25,
      unlocked: true,
      unlockedAt: '2024-03-10T16:00:00Z',
      category: 'sessions'
    },
    {
      id: '4',
      title: 'Estudante Dedicado',
      description: 'Complete seu primeiro curso',
      icon: 'graduation-cap',
      points: 100,
      unlocked: false,
      category: 'learning'
    },
    {
      id: '5',
      title: 'Mentor da Comunidade',
      description: 'Ajude 10 pessoas na comunidade',
      icon: 'users',
      points: 200,
      unlocked: false,
      category: 'community'
    }
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Consulta Agendada',
      message: 'Sua consulta com Dra. Ana Silva está marcada para hoje às 14:00',
      type: 'appointment',
      timestamp: '2024-03-16T08:00:00Z',
      read: false,
      actionUrl: '/appointments',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Lembrete de Humor',
      message: 'Não se esqueça de registrar como você está se sentindo hoje',
      type: 'mood',
      timestamp: '2024-03-16T09:00:00Z',
      read: false,
      actionUrl: '/mood',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Nova Conquista!',
      message: 'Parabéns! Você desbloqueou a conquista "Sequência de 7 dias"',
      type: 'achievement',
      timestamp: '2024-03-15T10:00:00Z',
      read: true,
      actionUrl: '/achievements',
      priority: 'low'
    }
  ])

  const crisisResources: CrisisResource[] = [
    {
      name: 'CVV - Centro de Valorização da Vida',
      phone: '188',
      description: 'Apoio emocional e prevenção do suicídio',
      available24h: true,
      type: 'hotline'
    },
    {
      name: 'SAMU',
      phone: '192',
      description: 'Serviço de Atendimento Móvel de Urgência',
      available24h: true,
      type: 'emergency'
    },
    {
      name: 'Corpo de Bombeiros',
      phone: '193',
      description: 'Emergências e resgates',
      available24h: true,
      type: 'emergency'
    },
    {
      name: 'Polícia Militar',
      phone: '190',
      description: 'Emergências policiais',
      available24h: true,
      type: 'emergency'
    },
    {
      name: 'Disque Saúde Mental',
      phone: '136',
      description: 'Orientações sobre saúde mental',
      available24h: false,
      type: 'support'
    }
  ]

  const subscriptionPlans = [
    {
      name: 'Gratuito',
      price: 0,
      features: [
        '1 consulta por mês',
        'Diário emocional básico',
        'Conteúdos limitados',
        'Chat com IA básico',
        'Suporte por email'
      ],
      color: 'bg-gray-50',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      name: 'Premium',
      price: 29.90,
      features: [
        'Consultas ilimitadas',
        'Diário emocional avançado',
        'Todos os conteúdos',
        'IA personalizada',
        'Grupos de apoio',
        'Relatórios detalhados',
        'Suporte prioritário'
      ],
      color: 'bg-sky-50',
      buttonColor: 'bg-sky-600 hover:bg-sky-700',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 49.90,
      features: [
        'Tudo do Premium',
        'Dashboard analytics',
        'Integração com wearables',
        'Relatórios personalizados',
        'API de integração',
        'Suporte 24/7',
        'Consultoria especializada'
      ],
      color: 'bg-purple-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      popular: false
    }
  ]

  const activities = [
    'Exercício', 'Meditação', 'Trabalho', 'Família', 'Amigos', 'Hobbies',
    'Leitura', 'Música', 'Arte', 'Natureza', 'Culinária', 'Estudos',
    'Voluntariado', 'Terapia', 'Sono', 'Alimentação'
  ]

  const triggers = [
    'Estresse no trabalho', 'Problemas familiares', 'Questões financeiras',
    'Problemas de saúde', 'Relacionamentos', 'Solidão', 'Trânsito',
    'Notícias negativas', 'Redes sociais', 'Mudanças', 'Conflitos',
    'Pressão social', 'Insônia', 'Dor física'
  ]

  const symptoms = [
    'Ansiedade', 'Tristeza', 'Irritabilidade', 'Cansaço', 'Insônia',
    'Dor de cabeça', 'Tensão muscular', 'Falta de concentração',
    'Perda de apetite', 'Excesso de apetite', 'Isolamento social',
    'Procrastinação', 'Pensamentos negativos', 'Palpitações'
  ]

  // Utility functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'text-red-600 bg-red-100'
    if (mood <= 5) return 'text-yellow-600 bg-yellow-100'
    if (mood <= 7) return 'text-blue-600 bg-blue-100'
    return 'text-green-600 bg-green-100'
  }

  const getMoodEmoji = (mood: number) => {
    if (mood <= 2) return '😢'
    if (mood <= 4) return '😔'
    if (mood <= 6) return '😐'
    if (mood <= 8) return '🙂'
    return '😊'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendada'
      case 'completed': return 'Concluída'
      case 'cancelled': return 'Cancelada'
      case 'in-progress': return 'Em andamento'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Event handlers
  const handleLogin = (email: string, password: string, userType: 'patient' | 'professional') => {
    const newUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      type: userType,
      subscription: 'free',
      points: 150,
      level: 3,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      phone: '+55 11 99999-9999',
      birthDate: '1990-01-01',
      gender: 'Não informado',
      emergencyContact: 'João Silva - +55 11 88888-8888',
      medicalHistory: ['Ansiedade generalizada'],
      currentMedications: [],
      allergies: [],
      mentalHealthGoals: ['Reduzir ansiedade', 'Melhorar sono', 'Aumentar autoestima'],
      preferredLanguage: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
    setUser(newUser)
    setIsLoggedIn(true)
    setCurrentView('dashboard')
  }

  const handleRegister = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      type: userData.type,
      subscription: 'free',
      points: 0,
      level: 1,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      phone: userData.phone,
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
    setUser(newUser)
    setIsLoggedIn(true)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    setCurrentView('home')
    setIsMobileMenuOpen(false)
  }

  const addMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      notes: moodNotes,
      activities: selectedActivities,
      triggers: [],
      symptoms: [],
      energy: 5,
      sleep: 5,
      anxiety: 5,
      stress: 5
    }
    setMoodEntries([newEntry, ...moodEntries])
    
    // Reset form
    setCurrentMood(5)
    setMoodNotes('')
    setSelectedActivities([])
    
    // Add points
    if (user) {
      setUser({...user, points: (user.points || 0) + 10})
    }
    
    // Show success message
    alert('Humor registrado com sucesso! +10 pontos')
  }

  const scheduleAppointment = (professionalId: string, date: string, time: string, type: 'video' | 'chat' | 'presencial') => {
    const professional = professionals.find(p => p.id === professionalId)
    if (professional) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        professionalId,
        professionalName: professional.name,
        date,
        time,
        status: 'scheduled',
        type,
        price: professional.price,
        duration: 50,
        notes: 'Consulta agendada via plataforma'
      }
      setAppointments([newAppointment, ...appointments])
      alert('Consulta agendada com sucesso!')
    }
  }

  const sendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user?.id || 'user',
      senderName: user?.name || 'Você',
      senderType: 'user',
      message,
      timestamp: new Date().toISOString(),
      type: 'text',
      read: true
    }
    setChatMessages([...chatMessages, newMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'ai',
        senderName: 'Assistente Novah',
        senderType: 'ai',
        message: 'Obrigado por compartilhar isso comigo. Como posso ajudar você hoje?',
        timestamp: new Date().toISOString(),
        type: 'text',
        read: true
      }
      setChatMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (prof.specializations || []).some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    const matchesSpecialty = selectedSpecialty === '' || prof.specialty === selectedSpecialty
    const matchesSessionType = selectedSessionType === '' || 
                              (prof.sessionTypes || []).includes(selectedSessionType as any)
    const matchesPrice = prof.price >= priceRange[0] && prof.price <= priceRange[1]
    
    return matchesSearch && matchesSpecialty && matchesSessionType && matchesPrice
  })

  const unreadNotifications = notifications.filter(n => !n.read).length

  const totalPoints = user?.points || 0
  const currentLevel = user?.level || 1
  const pointsToNextLevel = currentLevel * 100
  const progressToNextLevel = (totalPoints % 100) / 100 * 100

  // Main render functions
  const renderHome = () => (
    <div className={`min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : ''} ${highContrast ? 'contrast-150' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-sky-900">Novah</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button className="text-sky-700 hover:text-sky-900 font-medium transition-colors">Início</button>
              <button className="text-sky-700 hover:text-sky-900 font-medium transition-colors">Profissionais</button>
              <button className="text-sky-700 hover:text-sky-900 font-medium transition-colors">Sobre</button>
              <button className="text-sky-700 hover:text-sky-900 font-medium transition-colors">Contato</button>
            </nav>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex space-x-3">
              <Button variant="outline" onClick={() => setCurrentView('login')} className="border-sky-300 text-sky-700 hover:bg-sky-50">
                Entrar
              </Button>
              <Button onClick={() => setCurrentView('register')} className="bg-sky-600 hover:bg-sky-700">
                Cadastrar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-sky-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-sky-100">
              <nav className="flex flex-col space-y-3">
                <button className="text-left text-sky-700 hover:text-sky-900 font-medium">Início</button>
                <button className="text-left text-sky-700 hover:text-sky-900 font-medium">Profissionais</button>
                <button className="text-left text-sky-700 hover:text-sky-900 font-medium">Sobre</button>
                <button className="text-left text-sky-700 hover:text-sky-900 font-medium">Contato</button>
                <div className="flex flex-col space-y-2 pt-3 border-t border-sky-100">
                  <Button variant="outline" onClick={() => setCurrentView('login')} className="border-sky-300 text-sky-700 hover:bg-sky-50">
                    Entrar
                  </Button>
                  <Button onClick={() => setCurrentView('register')} className="bg-sky-600 hover:bg-sky-700">
                    Cadastrar
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-900 mb-6">
            Cuidado mental acessível e humanizado
          </h2>
          <p className="text-lg sm:text-xl text-sky-700 mb-8 max-w-2xl mx-auto">
            Conectamos você com profissionais qualificados e oferecemos ferramentas inteligentes 
            para seu bem-estar emocional, com total segurança e privacidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setCurrentView('register')} className="bg-sky-600 hover:bg-sky-700 text-lg px-8 py-3">
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" className="border-sky-300 text-sky-700 hover:bg-sky-50 text-lg px-8 py-3">
              Sou Profissional
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-sky-900 mb-12">
            Por que escolher o Novah?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-sky-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-sky-900">Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Conformidade com LGPD, criptografia ponta a ponta e protocolos de segurança médica internacionais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sky-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-sky-900">IA Personalizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Chatbot baseado em TCC, análise preditiva de humor e recomendações personalizadas para seu bem-estar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sky-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-sky-900">Profissionais Qualificados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Psicólogos, psiquiatras e terapeutas verificados com CRM/CRP válidos e especializações comprovadas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sky-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-sky-900">Agendamento Flexível</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Agende consultas online ou presenciais com facilidade. Cancelamento gratuito até 24h antes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sky-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-sky-900">Gamificação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Sistema de pontos, conquistas e níveis que tornam sua jornada de bem-estar mais engajante e motivadora.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sky-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-sky-900">Conteúdo Educativo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Biblioteca completa com artigos, vídeos, meditações guiadas e cursos especializados em saúde mental.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-sky-900 mb-12">
            Planos que se adaptam às suas necessidades
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`${plan.color} border-sky-200 relative ${plan.popular ? 'ring-2 ring-sky-500 scale-105' : ''} transition-transform hover:scale-105`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sky-600">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-sky-900">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-sky-900">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-sm font-normal text-sky-700">/mês</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sky-700">
                        <Check className="w-4 h-4 text-sky-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.buttonColor}`}>
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-4">
              Precisa de ajuda imediata?
            </h3>
            <p className="text-lg text-sky-700">
              Recursos de emergência disponíveis 24 horas por dia
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crisisResources.slice(0, 3).map((resource, index) => (
              <Card key={index} className="border-red-200 bg-red-50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 text-sm">{resource.name}</CardTitle>
                      <p className="text-2xl font-bold text-red-900">{resource.phone}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 text-sm">{resource.description}</p>
                  {resource.available24h && (
                    <Badge className="mt-2 bg-red-100 text-red-800">24h</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => setShowEmergencyModal(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              Ver Todos os Recursos de Emergência
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-sky-900 mb-12">
            O que nossos usuários dizem
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-sky-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sky-700 mb-4">
                  "O Novah mudou minha vida. Encontrei uma psicóloga incrível e o sistema de gamificação me motiva a cuidar da minha saúde mental todos os dias."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" 
                    alt="Maria" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-sky-900">Maria S.</p>
                    <p className="text-sm text-sky-600">Usuária Premium</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sky-700 mb-4">
                  "Como profissional, o Novah me permite alcançar mais pessoas e oferecer um atendimento de qualidade. A plataforma é intuitiva e segura."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face" 
                    alt="Dr. Carlos" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-sky-900">Dr. Carlos M.</p>
                    <p className="text-sm text-sky-600">Psiquiatra</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sky-700 mb-4">
                  "A IA do Novah me ajuda muito entre as consultas. É como ter um apoio constante para gerenciar minha ansiedade."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                    alt="João" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-sky-900">João P.</p>
                    <p className="text-sm text-sky-600">Usuário Gratuito</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-8 h-8" />
                <h4 className="text-xl font-bold">Novah</h4>
              </div>
              <p className="text-sky-200 mb-4">
                Transformando o cuidado mental através da tecnologia e humanização.
              </p>
              <div className="flex space-x-4">
                <button className="text-sky-200 hover:text-white">
                  <Globe className="w-5 h-5" />
                </button>
                <button className="text-sky-200 hover:text-white">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="text-sky-200 hover:text-white">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Produto</h5>
              <ul className="space-y-2 text-sky-200">
                <li><button className="hover:text-white">Funcionalidades</button></li>
                <li><button className="hover:text-white">Preços</button></li>
                <li><button className="hover:text-white">Segurança</button></li>
                <li><button className="hover:text-white">API</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-sky-200">
                <li><button className="hover:text-white">Sobre nós</button></li>
                <li><button className="hover:text-white">Carreiras</button></li>
                <li><button className="hover:text-white">Blog</button></li>
                <li><button className="hover:text-white">Imprensa</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Suporte</h5>
              <ul className="space-y-2 text-sky-200">
                <li><button className="hover:text-white">Central de Ajuda</button></li>
                <li><button className="hover:text-white">Contato</button></li>
                <li><button className="hover:text-white">Status</button></li>
                <li><button className="hover:text-white">Privacidade</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-200">
            <p>&copy; 2024 Novah. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Emergency Modal */}
      <Dialog open={showEmergencyModal} onOpenChange={setShowEmergencyModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-red-900 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Recursos de Emergência
            </DialogTitle>
            <DialogDescription>
              Se você está em crise ou pensando em se machucar, procure ajuda imediatamente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-red-900">{resource.name}</h4>
                      <p className="text-sm text-red-700">{resource.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-900">{resource.phone}</p>
                      {resource.available24h && (
                        <Badge className="bg-red-100 text-red-800">24h</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderLogin = () => (
    <div className={`min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : ''} ${highContrast ? 'contrast-150' : ''}`}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-sky-900">Entrar no Novah</CardTitle>
          <CardDescription>Acesse sua conta para continuar seu cuidado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input placeholder="Email" type="email" className="border-sky-200" />
          </div>
          <div>
            <Input placeholder="Senha" type="password" className="border-sky-200" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm text-sky-700">Lembrar de mim</label>
          </div>
          <Button 
            className="w-full bg-sky-600 hover:bg-sky-700" 
            onClick={() => handleLogin('usuario@email.com', 'senha123', 'patient')}
          >
            Entrar
          </Button>
          <div className="text-center space-y-2">
            <button className="text-sky-600 hover:underline text-sm">Esqueci minha senha</button>
            <div className="text-sm text-sky-700">
              Não tem conta? 
              <button 
                onClick={() => setCurrentView('register')} 
                className="text-sky-600 hover:underline ml-1"
              >
                Cadastre-se
              </button>
            </div>
          </div>
          <div className="text-center">
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-sky-600 hover:underline text-sm"
            >
              Voltar ao início
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRegister = () => (
    <div className={`min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : ''} ${highContrast ? 'contrast-150' : ''}`}>
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-sky-900">Criar Conta no Novah</CardTitle>
          <CardDescription>Junte-se à nossa comunidade de cuidado mental</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={userType === 'patient' ? 'default' : 'outline'}
              onClick={() => setUserType('patient')}
              className={userType === 'patient' ? 'bg-sky-600 hover:bg-sky-700' : 'border-sky-300 text-sky-700'}
            >
              <User className="w-4 h-4 mr-2" />
              Paciente
            </Button>
            <Button
              variant={userType === 'professional' ? 'default' : 'outline'}
              onClick={() => setUserType('professional')}
              className={userType === 'professional' ? 'bg-sky-600 hover:bg-sky-700' : 'border-sky-300 text-sky-700'}
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Profissional
            </Button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              placeholder="Nome completo" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="border-sky-200"
            />
            <Input 
              placeholder="Email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="border-sky-200"
            />
            <Input 
              placeholder="Senha" 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="border-sky-200"
            />
            <Input 
              placeholder="Confirmar senha" 
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="border-sky-200"
            />
            <Input 
              placeholder="Telefone" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="border-sky-200"
            />
            <Input 
              placeholder="Data de nascimento" 
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className="border-sky-200"
            />
          </div>

          {/* Patient-specific fields */}
          {userType === 'patient' && (
            <div className="space-y-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
              <h4 className="font-semibold text-sky-900">Informações Pessoais</h4>
              <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger className="border-sky-200">
                  <SelectValue placeholder="Gênero (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="nao-binario">Não-binário</SelectItem>
                  <SelectItem value="prefiro-nao-informar">Prefiro não informar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Professional-specific fields */}
          {userType === 'professional' && (
            <div className="space-y-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
              <h4 className="font-semibold text-sky-900">Informações Profissionais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select onValueChange={(value) => setFormData({...formData, specialty: value})}>
                  <SelectTrigger className="border-sky-200">
                    <SelectValue placeholder="Especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="psicologo-clinico">Psicólogo Clínico</SelectItem>
                    <SelectItem value="psiquiatra">Psiquiatra</SelectItem>
                    <SelectItem value="terapeuta-familiar">Terapeuta Familiar</SelectItem>
                    <SelectItem value="neuropsicologia">Neuropsicologia</SelectItem>
                    <SelectItem value="psicologo-organizacional">Psicólogo Organizacional</SelectItem>
                    <SelectItem value="terapeuta-ocupacional">Terapeuta Ocupacional</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="CRM/CRP/COREN" 
                  value={formData.crm}
                  onChange={(e) => setFormData({...formData, crm: e.target.value})}
                  className="border-sky-200"
                />
              </div>
              <Textarea 
                placeholder="Experiência e formação"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="border-sky-200"
              />
              <Textarea 
                placeholder="Biografia profissional (opcional)"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="border-sky-200"
              />
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
              />
              <label htmlFor="terms" className="text-sm text-sky-700">
                Aceito os <button className="text-sky-600 hover:underline">Termos de Uso</button> e 
                <button className="text-sky-600 hover:underline ml-1">Política de Privacidade</button>
              </label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="lgpd" 
                checked={formData.acceptLGPD}
                onCheckedChange={(checked) => setFormData({...formData, acceptLGPD: checked as boolean})}
              />
              <label htmlFor="lgpd" className="text-sm text-sky-700">
                Autorizo o tratamento dos meus dados pessoais conforme a LGPD
              </label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="emergency" 
                checked={formData.acceptEmergencyProtocol}
                onCheckedChange={(checked) => setFormData({...formData, acceptEmergencyProtocol: checked as boolean})}
              />
              <label htmlFor="emergency" className="text-sm text-sky-700">
                Estou ciente dos <button className="text-sky-600 hover:underline">protocolos de emergência</button> e autorizo contato em situações de risco
              </label>
            </div>
          </div>

          <Button 
            className="w-full bg-sky-600 hover:bg-sky-700"
            onClick={() => handleRegister({...formData, type: userType})}
            disabled={!formData.acceptTerms || !formData.acceptLGPD || !formData.acceptEmergencyProtocol}
          >
            Criar Conta
          </Button>

          <div className="text-center text-sm text-sky-700">
            Já tem conta? 
            <button 
              onClick={() => setCurrentView('login')} 
              className="text-sky-600 hover:underline ml-1"
            >
              Faça login
            </button>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-sky-600 hover:underline text-sm"
            >
              Voltar ao início
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDashboard = () => (
    <div className={`min-h-screen bg-sky-50 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : ''} ${highContrast ? 'contrast-150' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-sky-900">Novah</h1>
            </div>
            
            {/* Desktop Header Items */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="text-sky-700">
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <Badge className="bg-sky-100 text-sky-800">
                  <Crown className="w-4 h-4 mr-1" />
                  {user?.subscription?.toUpperCase()}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sky-900 font-medium">{totalPoints} pontos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sky-900 font-medium">{user?.name}</span>
                </div>
                <Button variant="outline" onClick={handleLogout} size="sm" className="border-sky-300 text-sky-700">
                  <LogOut className="w-4 h-4 mr-1" />
                  Sair
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-sky-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Header Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-sky-100">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3 pb-3 border-b border-sky-100">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'} 
                    alt={user?.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sky-900">{user?.name}</p>
                    <p className="text-sm text-sky-600">{totalPoints} pontos • Nível {currentLevel}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-sky-700" />
                    <span className="text-sky-700">Notificações</span>
                  </div>
                  {unreadNotifications > 0 && (
                    <Badge className="bg-red-500 text-white">{unreadNotifications}</Badge>
                  )}
                </div>
                <Button variant="outline" onClick={handleLogout} className="border-sky-300 text-sky-700 justify-start">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 bg-white border border-sky-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <Home className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Início</span>
            </TabsTrigger>
            <TabsTrigger value="professionals" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <Users className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Profissionais</span>
              <span className="sm:hidden">Pros</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <Heart className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Humor</span>
              <span className="sm:hidden">Humor</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <Calendar className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Consultas</span>
              <span className="sm:hidden">Agenda</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Chat IA</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <BookOpen className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Conteúdos</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <Award className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Conquistas</span>
              <span className="sm:hidden">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-sky-100 data-[state=active]:text-sky-900">
              <Settings className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Configurações</span>
              <span className="sm:hidden">Config</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Message */}
            <Card className="border-sky-200 bg-gradient-to-r from-sky-50 to-sky-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-sky-900 mb-2">
                      Olá, {user?.name}! 👋
                    </h2>
                    <p className="text-sky-700">
                      Como você está se sentindo hoje? Vamos cuidar do seu bem-estar juntos.
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-right">
                      <p className="text-sm text-sky-600">Nível {currentLevel}</p>
                      <Progress value={progressToNextLevel} className="w-32 mt-1" />
                      <p className="text-xs text-sky-500 mt-1">{totalPoints}/{pointsToNextLevel} pontos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="border-sky-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sky-700">Próxima Consulta</CardTitle>
                  <Calendar className="h-4 w-4 text-sky-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-sky-900">Hoje, 14h</div>
                  <p className="text-xs text-sky-600">Dra. Ana Silva</p>
                </CardContent>
              </Card>

              <Card className="border-sky-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sky-700">Humor Médio</CardTitle>
                  <TrendingUp className="h-4 w-4 text-sky-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-sky-900">7.2/10</div>
                  <p className="text-xs text-green-600">+0.5 esta semana</p>
                </CardContent>
              </Card>

              <Card className="border-sky-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sky-700">Sequência</CardTitle>
                  <Zap className="h-4 w-4 text-sky-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-sky-900">12 dias</div>
                  <p className="text-xs text-sky-600">Registros consecutivos</p>
                </CardContent>
              </Card>

              <Card className="border-sky-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-sky-700">Pontos</CardTitle>
                  <Award className="h-4 w-4 text-sky-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-sky-900">{totalPoints}</div>
                  <p className="text-xs text-sky-600">Nível {currentLevel}</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-sky-200">
              <CardHeader>
                <CardTitle className="text-sky-900">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col bg-sky-600 hover:bg-sky-700">
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="text-sm">Agendar Consulta</span>
                  </Button>
                  <Button className="h-20 flex-col bg-sky-600 hover:bg-sky-700">
                    <MessageCircle className="w-6 h-6 mb-2" />
                    <span className="text-sm">Chat com IA</span>
                  </Button>
                  <Button className="h-20 flex-col bg-sky-600 hover:bg-sky-700">
                    <Heart className="w-6 h-6 mb-2" />
                    <span className="text-sm">Registrar Humor</span>
                  </Button>
                  <Button className="h-20 flex-col bg-sky-600 hover:bg-sky-700">
                    <BookOpen className="w-6 h-6 mb-2" />
                    <span className="text-sm">Conteúdos</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity & Notifications */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-sky-200">
                <CardHeader>
                  <CardTitle className="text-sky-900">Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sky-700 text-sm">Consulta concluída com Dra. Ana Silva</span>
                      <span className="text-xs text-sky-500 ml-auto">2h atrás</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sky-700 text-sm">Humor registrado: 8/10</span>
                      <span className="text-xs text-sky-500 ml-auto">1 dia atrás</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sky-700 text-sm">Nova conquista desbloqueada</span>
                      <span className="text-xs text-sky-500 ml-auto">2 dias atrás</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sky-700 text-sm">Curso "Gerenciamento de Estresse" iniciado</span>
                      <span className="text-xs text-sky-500 ml-auto">3 dias atrás</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sky-200">
                <CardHeader>
                  <CardTitle className="text-sky-900 flex items-center">
                    Notificações
                    {unreadNotifications > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white">{unreadNotifications}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.slice(0, 4).map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg border ${getPriorityColor(notification.priority)} ${!notification.read ? 'font-medium' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <p className="text-xs mt-1">{notification.message}</p>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(notification.timestamp).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Button */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Precisa de ajuda imediata?</h3>
                    <p className="text-red-700">Se você está em crise, não hesite em buscar ajuda profissional</p>
                  </div>
                  <Button 
                    onClick={() => setShowEmergencyModal(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergência
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would continue here... */}
          <TabsContent value="professionals">
            <Card>
              <CardHeader>
                <CardTitle>Profissionais</CardTitle>
                <CardDescription>Encontre e conecte-se com especialistas qualificados</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Funcionalidade de busca de profissionais em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Humor</CardTitle>
                <CardDescription>Acompanhe seu bem-estar emocional diariamente</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sistema de registro de humor em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Consultas</CardTitle>
                <CardDescription>Gerencie seus agendamentos e histórico</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sistema de agendamento em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat com IA</CardTitle>
                <CardDescription>Converse com nosso assistente especializado</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Chat com IA em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdos Educativos</CardTitle>
                <CardDescription>Aprenda sobre saúde mental e bem-estar</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Biblioteca de conteúdos em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Conquistas</CardTitle>
                <CardDescription>Acompanhe seu progresso e desbloqueie recompensas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sistema de conquistas em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Personalize sua experiência no Novah</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Configurações em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Emergency Modal */}
      <Dialog open={showEmergencyModal} onOpenChange={setShowEmergencyModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-red-900 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Recursos de Emergência
            </DialogTitle>
            <DialogDescription>
              Se você está em crise ou pensando em se machucar, procure ajuda imediatamente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-red-900">{resource.name}</h4>
                      <p className="text-sm text-red-700">{resource.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-900">{resource.phone}</p>
                      {resource.available24h && (
                        <Badge className="bg-red-100 text-red-800">24h</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>Lembre-se:</strong> Você não está sozinho. Sempre há ajuda disponível e pessoas que se importam com você.
              </AlertDescription>
            </Alert>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  // Main render logic
  if (!isLoggedIn) {
    switch (currentView) {
      case 'login':
        return renderLogin()
      case 'register':
        return renderRegister()
      default:
        return renderHome()
    }
  }

  return renderDashboard()
}