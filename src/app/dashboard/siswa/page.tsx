'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  User,
  LogOut,
  History,
  TrendingUp,
  Award,
  Bell,
  Settings
} from 'lucide-react'

export default function SiswaDashboard() {
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [todayAttendance, setTodayAttendance] = useState({
    checkIn: null,
    checkOut: null
  })

  const handleCheckIn = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTodayAttendance(prev => ({
        ...prev,
        checkIn: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }))
      setIsLoading(false)
    }, 1000)
  }

  const handleCheckOut = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTodayAttendance(prev => ({
        ...prev,
        checkOut: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }))
      setIsLoading(false)
    }, 1000)
  }

  const attendanceStats = {
    hadir: 85,
    izin: 8,
    sakit: 5,
    alpha: 2
  }

  const recentAttendance = [
    { date: '2024-01-15', checkIn: '07:15', checkOut: '15:30', status: 'hadir' },
    { date: '2024-01-14', checkIn: '07:20', checkOut: '15:30', status: 'hadir' },
    { date: '2024-01-13', checkIn: '-', checkOut: '-', status: 'izin' },
    { date: '2024-01-12', checkIn: '07:10', checkOut: '15:30', status: 'hadir' },
    { date: '2024-01-11', checkIn: '07:25', checkOut: '15:30', status: 'hadir' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hadir': return 'bg-green-100 text-green-800'
      case 'izin': return 'bg-blue-100 text-blue-800'
      case 'sakit': return 'bg-yellow-100 text-yellow-800'
      case 'alpha': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hadir': return <CheckCircle className="w-4 h-4" />
      case 'izin': return <AlertCircle className="w-4 h-4" />
      case 'sakit': return <AlertCircle className="w-4 h-4" />
      case 'alpha': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Siswa</h1>
                <p className="text-xs text-gray-500">Ahmad Rizki - XII IPA 1</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Bell className="w-4 h-4 mr-2" />
                Notifikasi
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Selamat Pagi, Ahmad! 👋</h2>
          <p className="text-blue-100">Senin, 15 Januari 2024 - Jangan lupa absen ya!</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Check In/Out Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Absensi Hari Ini
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Check In</p>
                  <p className="text-2xl font-bold text-green-600">
                    {todayAttendance.checkIn || '--:--'}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Check Out</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {todayAttendance.checkOut || '--:--'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={handleCheckIn}
                  disabled={!!todayAttendance.checkIn || isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3"
                >
                  {isLoading ? 'Memproses...' : 'Absen Masuk'}
                </Button>
                <Button 
                  onClick={handleCheckOut}
                  disabled={!todayAttendance.checkIn || !!todayAttendance.checkOut || isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                >
                  {isLoading ? 'Memproses...' : 'Absen Pulang'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Stats */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Statistik Kehadiran
              </CardTitle>
              <CardDescription>Bulan Januari 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium">Hadir</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{attendanceStats.hadir}%</span>
                </div>
                <Progress value={attendanceStats.hadir} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600">Izin</p>
                  <p className="text-lg font-bold text-blue-600">{attendanceStats.izin}%</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-gray-600">Sakit</p>
                  <p className="text-lg font-bold text-yellow-600">{attendanceStats.sakit}%</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs text-gray-600">Alpha</p>
                  <p className="text-lg font-bold text-red-600">{attendanceStats.alpha}%</p>
                </div>
              </div>

              <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg">
                <Award className="w-5 h-5 mr-2 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Tingkat Kehadiran: Baik</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and History */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                Kalender Kehadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-md",
                  day_range_end: "day-range-end",
                  day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white",
                  day_today: "bg-blue-100 text-blue-600 font-bold",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Hadir</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Izin</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Sakit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Alpha</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2 text-purple-600" />
                Riwayat Absensi
              </CardTitle>
              <CardDescription>5 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {record.checkIn !== '-' ? `Masuk: ${record.checkIn}` : 'Tidak hadir'} • 
                          {record.checkOut !== '-' ? ` Pulang: ${record.checkOut}` : ''}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}