'use client'

import { CheckLogin } from "@/utils/login"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NotFound() {
  const router = useRouter()
  useEffect(() => CheckLogin(router,'/'),[router])
}