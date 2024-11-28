'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LockIcon } from 'lucide-react'
import { useRef } from "react"

export default function LoginPage() {
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const keyRef = useRef(null)
  const firstInputRef = useRef(null)

  const showToastAndFocus = (toastData) => {
    toast(toastData)
    // toast가 표시된 후에도 입력 필드에 포커스 유지
    requestAnimationFrame(() => {
      firstInputRef.current?.focus()
    })
  }

  const handleVerification = async (submitCode) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: submitCode }),
      })

      const data = await response.json()

      if (response.ok) {
        showToastAndFocus({
          title: "로그인 성공",
          description: "관리자로 로그인되었습니다.",
          variant: "success",
        })
        window.dispatchEvent(new Event("admin-login"))
        router.push("/")
      } else {
        setCode("")
        showToastAndFocus({
          title: "로그인 실패",
          description: data.message || "코드가 잘못되었습니다.",
          variant: "destructive",
        })
      }
    } catch (err) {
      setCode("")
      showToastAndFocus({
        title: "에러 발생",
        description: "오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 코드가 완성되면 자동으로 제출
  useEffect(() => {
    if (code.length === 6) {
      handleVerification(code)
    }
  }, [code])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (code.length === 6) {
      await handleVerification(code)
    }
  }

  // 컴포넌트가 마운트될 때 첫 번째 입력 필드에 포커스
  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-tr from-emerald-400/15 via-teal-400/20 to-cyan-300/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full min-w-[500px] min-h-[400px] flex items-center justify-center flex-col">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <LockIcon className="w-10 h-10 text-main" />
                </div>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={code}
                  onChange={(value) => setCode(value)}
                  className="flex justify-center gap-2"
                  disabled={isSubmitting}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} ref={firstInputRef} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                type="submit"
                className="w-full bg-main text-primary-foreground hover:bg-main/90"
                ref={keyRef}
                disabled={isSubmitting || code.length !== 6}
              >
                {isSubmitting ? "처리중..." : "로그인"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}