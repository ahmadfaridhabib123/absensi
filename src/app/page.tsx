'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { User, Lock, GraduationCap, Users, Shield, School, Clock, Calendar, BookOpen, HelpCircle, Settings } from 'lucide-react'

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (role: string) => {
    setIsLoading(true)
    // Simulasi login
    setTimeout(() => {
      window.location.href = `/dashboard/${role}`
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Absensi SMAN Gurah</h1>
                <p className="text-xs text-gray-500">Sistem Absensi Digital Terpadu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <HelpCircle className="w-4 h-4 mr-2" />
                Bantuan
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Selamat Datang di <span className="text-blue-600">Absensi SMAN Gurah</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sistem absensi digital modern yang memudahkan proses pencatatan kehadiran siswa, 
            monitoring guru, dan laporan administrasi sekolah yang terintegrasi.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Siswa Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 cursor-pointer bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Siswa</CardTitle>
              <CardDescription className="text-gray-600">
                Absensi harian, lihat riwayat, dan status kehadiran
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Absen masuk & pulang
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Kalender akademik
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                  Riwayat kehadiran
                </div>
              </div>
              <Button 
                onClick={() => handleLogin('siswa')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Memuat...' : 'Masuk sebagai Siswa'}
              </Button>
            </CardContent>
          </Card>

          {/* Guru Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 cursor-pointer bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Guru</CardTitle>
              <CardDescription className="text-gray-600">
                Kelola absensi kelas, rekap, dan laporan
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-green-500" />
                  Daftar kelas X-XII
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  Input status kehadiran
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                  Cetak rekap absensi
                </div>
              </div>
              <Button 
                onClick={() => handleLogin('guru')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Memuat...' : 'Masuk sebagai Guru'}
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 cursor-pointer bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Admin</CardTitle>
              <CardDescription className="text-gray-600">
                Kelola sistem, statistik, dan ekspor data
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-purple-500" />
                  Kelola semua data
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                  Statistik kehadiran
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                  Export PDF/Excel
                </div>
              </div>
              <Button 
                onClick={() => handleLogin('admin')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Memuat...' : 'Masuk sebagai Admin'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Fitur Utama</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time</h4>
              <p className="text-sm text-gray-600">Pencatatan absensi secara real-time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Kalender</h4>
              <p className="text-sm text-gray-600">Integrasi kalender akademik</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Laporan</h4>
              <p className="text-sm text-gray-600">Laporan lengkap dan terperinci</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-User</h4>
              <p className="text-sm text-gray-600">Akses untuk siswa, guru, dan admin</p>
            </div>
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Butuh Bantuan?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Tonton video tutorial kami untuk mempelajari cara menggunakan sistem absensi dengan mudah dan efektif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <HelpCircle className="w-5 h-5 mr-2" />
              Panduan Pengguna
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Calendar className="w-5 h-5 mr-2" />
              Video Tutorial
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 SMAN Gurah - Sistem Absensi Digital</p>
            <p className="text-sm">Dikembangkan dengan ❤️ untuk pendidikan Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}