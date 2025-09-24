"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: number
  content: string
  role: "user" | "ai"
  timestamp?: Date
}

const DUMMY_MESSAGES: Message[] = [
  { 
    id: 1, 
    content: "Xin chào! Tôi là trợ lý AI chuyên về triết học Marxist. Tôi có thể giúp gì cho bạn?", 
    role: "ai",
    timestamp: new Date()
  },
]

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES)
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Thay thế bằng API key thực của bạn
  const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAWY438PG4XacWuZU8nQtQ0popo9YAVB18"

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  // Function gọi API Gemini với context về triết học Marxist
  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      const contextPrompt = `Bạn là một chuyên gia triết học Marxist. Hãy trả lời câu hỏi sau một cách chính xác và dễ hiểu, tập trung vào các khái niệm như cơ sở hạ tầng, kiến trúc thượng tầng, mối quan hệ biện chứng, duy vật lịch sử. Câu hỏi: ${userMessage}`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: contextPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      } else {
        throw new Error("Invalid response structure from Gemini API")
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      return "Xin lỗi, hiện tại tôi gặp sự cố kỹ thuật. Bạn có thể thử hỏi lại sau hoặc tham khảo các tài liệu trong website."
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    const newUserMessage: Message = { 
      id: Date.now(), 
      content: userMessage, 
      role: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newUserMessage])

    try {
      const aiResponse = await callGeminiAPI(userMessage)
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: aiResponse,
        role: "ai",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      
    } catch (error) {
      console.error("Error in sendMessage:", error)
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc tham khảo tài liệu học tập trên website.",
        role: "ai",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!open) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 max-w-[95vw] h-[600px] max-h-[80vh] shadow-2xl border-0 bg-gradient-to-b from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trợ Lý AI</h3>
                <p className="text-xs text-blue-100">Chuyên gia Triết học Marxist</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-purple-100 text-purple-600"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.timestamp && (
                      <div className={`text-xs mt-1 opacity-70 ${
                        message.role === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[80%] p-3 rounded-2xl rounded-bl-md bg-gray-100 text-gray-800">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI đang suy nghĩ...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Hỏi về triết học Marxist..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
              Hỏi về cơ sở hạ tầng, kiến trúc thượng tầng, hay bất kỳ khái niệm nào
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Chatbox
