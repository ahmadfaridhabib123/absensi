'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Shield, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  User,
  LogOut,
  History,
  TrendingUp,
  TrendingDown,
  FileText,
  Download,
  Search,
  Filter,
  Bell,
  Settings,
  BookOpen,
  Award,
  BarChart3,
  PieChart,
  Activity,
  School,
  UserCheck,
  UserX,
  Clock,
  Database
} from 'lucide-react'

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Generate comprehensive statistics
  const generateStats = () => {
    return {
      totalStudents: 1080,
      totalTeachers: 45,
      totalClasses: 30,
      todayAttendance: {
        present: 945,
        absent: 135,
        percentage: 87.5
      },
      monthlyAttendance: {
        present: 18900,
        absent: 2700,
        percentage: 87.5
      },
      topPerformingClasses: [
        { name: 'XII IPA 1', percentage: 98, students: 36 },
        { name: 'XI IPA 2', percentage: 96, students: 35 },
        { name: 'X IPA 3', percentage: 95, students: 38 }
      ],
      lowPerformingClasses: [
        { name: 'X IPS 2', percentage: 78, students: 34 },
        { name: 'XI IPS 1', percentage: 82, students: 33 },
        { name: 'XII IPS 3', percentage: 85, students: 35 }
      ]
    }
  }

  const stats = generateStats()

  // Generate attendance trends
  const generateAttendanceTrends = () => {
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
    return days.map(day => ({
      day,
      percentage: 85 + Math.floor(Math.random() * 12),
      present: 900 + Math.floor(Math.random() * 100),
      absent: 100 + Math.floor(Math.random() * 50)
    }))
  }

  const attendanceTrends = generateAttendanceTrends()

  // Generate detailed class data
  const generateClassData = () => {
    const classes = []
    const grades = ['X', 'XI', 'XII']
    const programs = ['IPA', 'IPS']
    
    grades.forEach(grade => {
      programs.forEach(program => {
        for (let i = 1; i <= 5; i++) {
          classes.push({
            id: `${grade} ${program} ${i}`,
            grade,
            program,
            students: 32 + Math.floor(Math.random() * 8),
            attendance: 75 + Math.floor(Math.random() * 20),
            teacher: `Guru ${grade} ${program} ${i}`,
            rank: Math.floor(Math.random() * 30) + 1
          })
        }
      })
    })
    
    return classes.sort((a, b) => b.attendance - a.attendance)
  }

  const classData = generateClassData()

  const exportToPDF = () => {
    console.log('Exporting comprehensive report to PDF...')
    alert('Mengekspor laporan lengkap ke PDF...')
  }

  const exportToExcel = () => {
    console.log('Exporting data to Excel...')
    alert('Mengekspor data ke Excel...')
  }

  const exportAttendanceData = () => {
    console.log('Exporting attendance data...')
    alert('Mengekspor data absensi...')
  }

  const generateReport = () => {
    console.log('Generating comprehensive report...')
    alert('Membuat laporan komprehensif...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-xs text-gray-500">Dr. Ahmad Wijaya, M.Pd - Kepala Sekolah</p>
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
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Selamat Pagi, Bapak Kepala Sekolah! 👋</h2>
          <p className="text-purple-100">Senin, 15 Januari 2024 - Sistem absensi berjalan normal</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Total Siswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalStudents.toLocaleString()}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2.5% dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                Kehadiran Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.todayAttendance.percentage}%</div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>{stats.todayAttendance.present} hadir, {stats.todayAttendance.absent} tidak hadir</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <School className="w-5 h-5 mr-2 text-purple-600" />
                Total Kelas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalClasses}</div>
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>X: 10, XI: 10, XII: 10</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-600" />
                Total Guru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalTeachers}</div>
              <div className="flex items-center text-sm text-gray-600">
                <Award className="w-4 h-4 mr-1" />
                <span>42 guru aktif hari ini</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
            <TabsTrigger value="classes">Data Kelas</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Trends */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Tren Kehadiran Mingguan
                  </CardTitle>
                  <CardDescription>Persentase kehadiran per hari</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium w-8">{trend.day}</span>
                          <div className="flex-1 max-w-xs">
                            <Progress value={trend.percentage} className="h-2" />
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-900">{trend.percentage}%</span>
                          <p className="text-xs text-gray-500">{trend.present}/{trend.present + trend.absent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Classes */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-600" />
                    Kelas Terbaik Minggu Ini
                  </CardTitle>
                  <CardDescription>Berdasarkan persentase kehadiran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topPerformingClasses.map((cls, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{cls.name}</p>
                            <p className="text-sm text-gray-500">{cls.students} siswa</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">{cls.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Buat Laporan
                  </Button>
                  <Button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    <Database className="w-4 h-4 mr-2" />
                    Backup Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grade Distribution */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                    Distribusi Kehadiran per Tingkat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['X', 'XI', 'XII'].map((grade) => {
                      const gradeClasses = classData.filter(cls => cls.grade === grade)
                      const avgAttendance = Math.round(gradeClasses.reduce((sum, cls) => sum + cls.attendance, 0) / gradeClasses.length)
                      const totalStudents = gradeClasses.reduce((sum, cls) => sum + cls.students, 0)
                      
                      return (
                        <div key={grade} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-900">Kelas {grade}</h4>
                            <span className="text-sm font-bold text-blue-600">{avgAttendance}%</span>
                          </div>
                          <Progress value={avgAttendance} className="h-2 mb-2" />
                          <p className="text-xs text-gray-500">{totalStudents} siswa • {gradeClasses.length} kelas</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Analysis */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Analisis Kehadiran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">87.5%</p>
                        <p className="text-sm text-gray-600">Rata-rata Hadir</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg text-center">
                        <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-600">12.5%</p>
                        <p className="text-sm text-gray-600">Rata-rata Tidak Hadir</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Hadir</span>
                        <span className="text-sm font-bold text-green-600">{stats.monthlyAttendance.present.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Izin</span>
                        <span className="text-sm font-bold text-blue-600">1,620</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Sakit</span>
                        <span className="text-sm font-bold text-yellow-600">810</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Alpha</span>
                        <span className="text-sm font-bold text-red-600">270</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center">
                      <School className="w-5 h-5 mr-2 text-blue-600" />
                      Data Lengkap Kelas
                    </CardTitle>
                    <CardDescription>Ringkasan performa semua kelas</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="X">Kelas X</SelectItem>
                        <SelectItem value="XI">Kelas XI</SelectItem>
                        <SelectItem value="XII">Kelas XII</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Cari kelas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Peringkat</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wali Kelas</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Jumlah Siswa</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Kehadiran</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {classData
                        .filter(cls => selectedGrade === 'all' || cls.grade === selectedGrade)
                        .filter(cls => cls.id.toLowerCase().includes(searchTerm.toLowerCase()))
                        .slice(0, 15)
                        .map((cls) => (
                        <tr key={cls.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {cls.rank <= 3 && (
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                  cls.rank === 1 ? 'bg-yellow-500' : 
                                  cls.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'
                                }`}>
                                  <span className="text-white text-xs font-bold">{cls.rank}</span>
                                </div>
                              )}
                              <span className="text-sm text-gray-900">#{cls.rank}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{cls.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{cls.teacher}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900">{cls.students}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-900 mr-2">{cls.attendance}%</span>
                              <div className="w-16">
                                <Progress value={cls.attendance} className="h-2" />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <Badge className={
                              cls.attendance >= 95 ? 'bg-green-100 text-green-800' :
                              cls.attendance >= 85 ? 'bg-blue-100 text-blue-800' :
                              cls.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {cls.attendance >= 95 ? 'Sangat Baik' :
                               cls.attendance >= 85 ? 'Baik' :
                               cls.attendance >= 75 ? 'Cukup' : 'Perlu Perhatian'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Laporan Harian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={generateReport} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Laporan Hari Ini
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Laporan Mingguan
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Laporan Bulanan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-600" />
                    Laporan Prestasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Award className="w-4 h-4 mr-2" />
                    Kelas Terbaik
                  </Button>
                  <Button variant="outline" className="w-full">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Siswa Terdisiplin
                  </Button>
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analisis Tren
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-purple-600" />
                  Export Data
                </CardTitle>
                <CardDescription>Unduh data dalam berbagai format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Format PDF</h4>
                    <Button onClick={exportToPDF} className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Laporan Lengkap (PDF)
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Rekap Absensi (PDF)
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Statistik Bulanan (PDF)
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Format Excel</h4>
                    <Button onClick={exportToExcel} className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Data Absensi (Excel)
                    </Button>
                    <Button onClick={exportAttendanceData} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Data Siswa (Excel)
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Analisis Komprehensif (Excel)
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800">
                      Data terakhir diperbarui: {new Date().toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}