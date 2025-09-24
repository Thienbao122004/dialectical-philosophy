"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Brain,
  Trophy,
  RefreshCw,
  Share2,
  Home,
  Clock,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  X,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function QuizPage() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const questions = [
    {
      question: "Theo Marx, cơ sở hạ tầng bao gồm những yếu tố nào?",
      options: [
        "Chỉ có lực lượng sản xuất",
        "Lực lượng sản xuất và quan hệ sản xuất", 
        "Chỉ có quan hệ sản xuất",
        "Các thể chế chính trị"
      ],
      correct: 1,
      explanation: "Cơ sở hạ tầng bao gồm cả lực lượng sản xuất (công nghệ, lao động) và quan hệ sản xuất (quan hệ sở hữu, phân phối).",
      difficulty: "Dễ"
    },
    {
      question: "Kiến trúc thượng tầng là gì?",
      options: [
        "Các công trình kiến trúc",
        "Các thể chế chính trị, pháp lý, văn hóa",
        "Phương tiện sản xuất",
        "Quan hệ lao động"
      ],
      correct: 1,
      explanation: "Kiến trúc thượng tầng bao gồm các thể chế chính trị, pháp lý, văn hóa, tôn giáo được xây dựng trên nền tảng cơ sở hạ tầng.",
      difficulty: "Dễ"
    },
    {
      question: "Mối quan hệ giữa cơ sở hạ tầng và kiến trúc thượng tầng là:",
      options: [
        "Một chiều: thượng tầng quyết định cơ sở",
        "Một chiều: cơ sở quyết định thượng tầng",
        "Tương tác biện chứng qua lại",
        "Hoàn toàn độc lập"
      ],
      correct: 2,
      explanation: "Đây là mối quan hệ tương tác biện chứng: cơ sở hạ tầng quyết định thượng tầng, nhưng thượng tầng cũng có thể phản tác động lại.",
      difficulty: "Trung bình"
    },
    {
      question: "Cách mạng công nghiệp là ví dụ cho:",
      options: [
        "Thượng tầng quyết định cơ sở",
        "Cơ sở hạ tầng thay đổi dẫn đến thay đổi thượng tầng",
        "Sự độc lập của hai tầng",
        "Vai trò của văn hóa"
      ],
      correct: 1,
      explanation: "Cách mạng công nghiệp thay đổi phương tiện sản xuất (cơ sở) dẫn đến hình thành giai cấp công nhân và thay đổi cấu trúc xã hội (thượng tầng).",
      difficulty: "Trung bình"
    },
    {
      question: "Quan điểm duy vật lịch sử của Marx nhấn mạnh:",
      options: [
        "Vai trò quyết định của ý thức",
        "Vai trò quyết định của điều kiện vật chất",
        "Vai trò của cá nhân vĩ đại",
        "Tính ngẫu nhiên của lịch sử"
      ],
      correct: 1,
      explanation: "Quan điểm duy vật lịch sử khẳng định điều kiện vật chất (cơ sở hạ tầng) quyết định ý thức và sự phát triển xã hội.",
      difficulty: "Trung bình"
    },
    {
      question: "Tác phẩm nào đầu tiên trình bày chi tiết về mối quan hệ cơ sở - thượng tầng?",
      options: [
        "Tư Bản",
        "Ý Thức Hệ Đức",
        "Phê Bình Kinh Tế Chính Trị",
        "Tuyên Ngôn Đảng Cộng Sản"
      ],
      correct: 1,
      explanation: "'Ý Thức Hệ Đức' (1845-1846) của Marx và Engels là tác phẩm đầu tiên trình bày hoàn chỉnh về khái niệm này.",
      difficulty: "Khó"
    },
    {
      question: "Trong xã hội hiện đại, Internet và AI thuộc về:",
      options: [
        "Kiến trúc thượng tầng",
        "Cơ sở hạ tầng",
        "Cả hai tầng",
        "Không thuộc mô hình Marx"
      ],
      correct: 2,
      explanation: "Internet và AI vừa là phương tiện sản xuất (cơ sở) vừa tạo ra văn hóa số và thay đổi thể chế xã hội (thượng tầng).",
      difficulty: "Khó"
    },
    {
      question: "Lực lượng sản xuất bao gồm:",
      options: [
        "Chỉ có công nhân",
        "Phương tiện sản xuất + sức lao động",
        "Chỉ có máy móc",
        "Quan hệ sở hữu"
      ],
      correct: 1,
      explanation: "Lực lượng sản xuất = phương tiện sản xuất (công cụ, máy móc) + sức lao động (con người với kỹ năng).",
      difficulty: "Dễ"
    },
    {
      question: "Theo Marx, thay đổi xã hội xuất phát từ:",
      options: [
        "Ý tưởng của các nhà tư tưởng",
        "Mâu thuẫn trong cơ sở hạ tầng",
        "Quyết định của nhà cầm quyền",
        "Sự thay đổi văn hóa"
      ],
      correct: 1,
      explanation: "Marx cho rằng thay đổi xã hội xuất phát từ mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất trong cơ sở hạ tầng.",
      difficulty: "Khó"
    },
    {
      question: "Ý nghĩa của lý thuyết Marx trong thời đại hiện tại:",
      options: [
        "Đã lỗi thời hoàn toàn",
        "Chỉ áp dụng cho xã hội cũ",
        "Vẫn có giá trị để phân tích xã hội hiện đại",
        "Chỉ có ý nghĩa lịch sử"
      ],
      correct: 2,
      explanation: "Lý thuyết Marx vẫn cung cấp công cụ phân tích hữu ích để hiểu các hiện tượng xã hội, công nghệ và kinh tế đương đại.",
      difficulty: "Trung bình"
    }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startQuiz = () => {
    setQuizStarted(true)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowQuizResult(true)
          const score = questions.reduce((acc, q, index) => {
            return acc + (selectedAnswers[index] === q.correct ? 1 : 0)
          }, 0)
          setQuizScore(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setSelectedAnswers({})
    setShowQuizResult(false)
    setQuizScore(0)
    setTimeLeft(600)
    setQuizStarted(false)
    setShowReview(false)
    setExpandedQuestion(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "text-green-600 bg-green-100"
      case "Trung bình": return "text-yellow-600 bg-yellow-100"
      case "Khó": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getScoreLevel = (score: number) => {
    if (score >= 9) return { text: "🏆 Bậc Thầy!", color: "text-yellow-600", bg: "bg-yellow-50" }
    if (score >= 7) return { text: "🌟 Xuất Sắc!", color: "text-green-600", bg: "bg-green-50" }
    if (score >= 5) return { text: "👍 Tốt!", color: "text-blue-600", bg: "bg-blue-50" }
    if (score >= 3) return { text: "📚 Cần Cố Gắng!", color: "text-orange-600", bg: "bg-orange-50" }
    return { text: "💪 Hãy Học Thêm!", color: "text-red-600", bg: "bg-red-50" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">Φ</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Ôn tập</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {quizStarted && !showQuizResult && (
                <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-mono">
                  <Clock className="h-4 w-4" />
                  {formatTime(timeLeft)}
                </div>
              )}
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Về Trang Chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!quizStarted ? (
          // Quiz Introduction
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Quiz Triết Học Marxist
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Thử thách kiến thức của bạn về mối quan hệ biện chứng giữa cơ sở hạ tầng và kiến trúc thượng tầng
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">10 Câu Hỏi</h3>
                <p className="text-gray-600 text-sm">Từ cơ bản đến nâng cao</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">10 Phút</h3>
                <p className="text-gray-600 text-sm">Thời gian làm bài</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Chứng Chỉ</h3>
                <p className="text-gray-600 text-sm">Nhận kết quả chi tiết</p>
              </Card>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">📚 Nội Dung Kiểm Tra</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">🎯 Chủ đề chính:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Cơ sở hạ tầng kinh tế</li>
                    <li>• Kiến trúc thượng tầng xã hội</li>
                    <li>• Mối quan hệ biện chứng</li>
                    <li>• Ví dụ thực tiễn</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600 mb-3">🎓 Mức độ khó:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-600">Dễ</Badge>
                      <span className="text-gray-600">4 câu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-600">Trung bình</Badge>
                      <span className="text-gray-600">4 câu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-600">Khó</Badge>
                      <span className="text-gray-600">2 câu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={startQuiz}
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Brain className="mr-3 h-6 w-6" />
              Bắt Đầu Quiz
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        ) : !showQuizResult ? (
          // Quiz Questions
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {/* Progress Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-2 font-bold">
                    Câu {currentQuiz + 1}/10
                  </Badge>
                  <Badge className={getDifficultyColor(questions[currentQuiz].difficulty)}>
                    {questions[currentQuiz].difficulty}
                  </Badge>
                </div>
                
                <Progress value={((currentQuiz + 1) / 10) * 100} className="h-3 mb-4" />
                
                <div className="flex gap-1 justify-center">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        i < currentQuiz ? 'bg-green-500 shadow-lg' : 
                        i === currentQuiz ? 'bg-blue-500 shadow-lg scale-125' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold leading-relaxed text-gray-800">
                  {questions[currentQuiz].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuiz].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAnswers(prev => ({
                          ...prev,
                          [currentQuiz]: index
                        }))
                      }}
                      className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                        selectedAnswers[currentQuiz] === index
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          selectedAnswers[currentQuiz] === index
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-300 text-gray-500'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1 text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-8 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuiz(Math.max(0, currentQuiz - 1))}
                    disabled={currentQuiz === 0}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Câu trước
                  </Button>
                  
                  {currentQuiz === 9 ? (
                    <Button
                      onClick={() => {
                        const score = questions.reduce((acc, q, index) => {
                          return acc + (selectedAnswers[index] === q.correct ? 1 : 0)
                        }, 0)
                        setQuizScore(score)
                        setShowQuizResult(true)
                      }}
                      disabled={selectedAnswers[currentQuiz] === undefined}
                      className="bg-green-600 hover:bg-green-700 px-6 py-3 text-lg font-semibold"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Hoàn Thành Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuiz(currentQuiz + 1)}
                      disabled={selectedAnswers[currentQuiz] === undefined}
                      className="flex items-center gap-2 px-6 py-3"
                    >
                      Câu tiếp
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : showReview ? (
          // Quiz Review
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Chi Tiết Bài Làm</h2>
                  <p className="text-gray-600">Xem lại các câu trả lời và giải thích</p>
                </div>
              </div>
              <Button
                onClick={() => setShowReview(false)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Đóng
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((question, qIndex) => {
                const userAnswer = selectedAnswers[qIndex]
                const isCorrect = userAnswer === question.correct
                const isExpanded = expandedQuestion === qIndex
                
                return (
                  <Card key={qIndex} className={`overflow-hidden transition-all duration-300 ${
                    isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'
                  }`}>
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedQuestion(isExpanded ? null : qIndex)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="outline" className="text-sm">
                              Câu {qIndex + 1}
                            </Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <div className={`flex items-center gap-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                              <span className="font-semibold text-sm">
                                {isCorrect ? 'Đúng' : 'Sai'}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            {question.question}
                          </h3>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Bạn chọn: <strong>{userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'Không trả lời'}</strong></span>
                            <span>Đáp án: <strong>{String.fromCharCode(65 + question.correct)}</strong></span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-3 text-gray-700">Các lựa chọn:</h4>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div
                                  key={oIndex}
                                  className={`p-3 rounded-lg border text-sm ${
                                    oIndex === question.correct
                                      ? 'border-green-300 bg-green-100 text-green-800'
                                      : oIndex === userAnswer && userAnswer !== question.correct
                                      ? 'border-red-300 bg-red-100 text-red-800'
                                      : 'border-gray-200 bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                      {String.fromCharCode(65 + oIndex)}.
                                    </span>
                                    <span>{option}</span>
                                    {oIndex === question.correct && (
                                      <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                                    )}
                                    {oIndex === userAnswer && userAnswer !== question.correct && (
                                      <X className="h-4 w-4 text-red-600 ml-auto" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-blue-800 flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              Giải thích:
                            </h4>
                            <p className="text-blue-700 leading-relaxed">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="text-center pt-6">
              <Button
                onClick={() => setShowReview(false)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                Quay Lại Kết Quả
              </Button>
            </div>
          </div>
        ) : (
          // Quiz Results
          <div className="text-center space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Chúc Mừng!</h2>
                <p className="text-xl text-gray-600 mb-6">Bạn đã hoàn thành Quiz Triết Học Marxist</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{quizScore}/10</div>
                  <div className="text-lg text-blue-700 font-semibold mb-4">
                    {Math.round((quizScore / 10) * 100)}% Chính Xác
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-lg ${getScoreLevel(quizScore).bg} ${getScoreLevel(quizScore).color} font-bold`}>
                    {getScoreLevel(quizScore).text}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-100 p-4 rounded-lg">
                      <div className="text-green-700 font-semibold">Câu Đúng</div>
                      <div className="text-3xl font-bold text-green-600">{quizScore}</div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg">
                      <div className="text-red-700 font-semibold">Câu Sai</div>
                      <div className="text-3xl font-bold text-red-600">{10 - quizScore}</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="text-yellow-700 font-semibold">Thời Gian Còn Lại</div>
                    <div className="text-2xl font-bold text-yellow-600">{formatTime(timeLeft)}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => setShowReview(true)}
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 px-8 py-3"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Xem Chi Tiết
                </Button>
                <Button
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Làm Lại Quiz
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const result = {
                      score: quizScore,
                      total: 10,
                      percentage: Math.round((quizScore / 10) * 100),
                      level: getScoreLevel(quizScore).text,
                      timeLeft: formatTime(timeLeft)
                    }
                    navigator.clipboard.writeText(`🧠 Quiz Triết Học Marxist\n📊 Kết quả: ${result.score}/10 (${result.percentage}%)\n🏆 Cấp độ: ${result.level}\n⏰ Thời gian: ${result.timeLeft}\n📅 ${new Date().toLocaleDateString('vi-VN')}\n🌐 Dialectical Philosophy Platform`)
                    
                    const notification = document.createElement('div')
                    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
                    notification.innerHTML = '✅ Đã sao chép kết quả chi tiết!'
                    document.body.appendChild(notification)
                    setTimeout(() => notification.remove(), 3000)
                  }}
                  className="px-8 py-3"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Chia Sẻ Kết Quả
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">🎯 Muốn cải thiện điểm số?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-1">Đọc Thêm Tài Liệu</h4>
                  <p className="text-gray-600">Khám phá thêm về triết học Marx</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-1">Luyện Tập Thêm</h4>
                  <p className="text-gray-600">Làm lại quiz để củng cố kiến thức</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-1">Tham Gia Thảo Luận</h4>
                  <p className="text-gray-600">Kết nối với cộng đồng học tập</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
