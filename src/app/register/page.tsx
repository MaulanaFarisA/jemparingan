// src/app/register/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client' // Pakai yang baru dibuat
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/lib/ui/container'

export default function Register() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    // 1. Daftar ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // PENTING: Data ini akan ditangkap oleh Trigger Database
        // untuk dimasukkan ke tabel public.profile
        data: {
          name: name, 
        },
      },
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      // Berhasil! Biasanya user perlu verifikasi email dulu,
      // tapi datanya sudah masuk ke database.
      alert('Registrasi berhasil! Silakan cek email untuk verifikasi (jika diaktifkan) atau login.')
      router.push('/') // Arahkan ke home atau login
    }
  }

  return (
    <Container className="justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Akun</h1>
      
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-md">
        
        {/* Input Nama */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            required
            className="p-2 border border-gray-300 rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Budi Santoso"
          />
        </div>

        {/* Input Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="p-2 border border-gray-300 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
          />
        </div>

        {/* Input Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            className="p-2 border border-gray-300 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Memproses...' : 'Daftar Sekarang'}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Sudah punya akun?{' '}
        <Link href="/" className="text-blue-600 hover:underline">
          Login di sini
        </Link>
      </p>
    </Container>
  )
}