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
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  User,
  LogOut,
  History,
  TrendingUp,
  FileText,
  Download,
  Search,
  Filter,
  Bell,
  Settings,
  BookOpen,
  Award
} from 'lucide-react'

export default function GuruDashboard() {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [attendanceData, setAttendanceData] = useState({})

  // Generate classes X-1 to X-10, XI-1 to XI-10, XII-1 to XII-10
  const generateClasses = () => {
    const classes = []
    const grades = ['X', 'XI', 'XII']
    
    grades.forEach(grade => {
      for (let i = 1; i <= 10; i++) {
        classes.push({
          id: `${grade}-${i}`,
          name: `${grade} ${i}`,
          grade: grade,
          students: 32 + Math.floor(Math.random() * 8), // Random 32-40 students
          attendance: 75 + Math.floor(Math.random() * 20), // Random 75-95% attendance
          teacher: `Guru ${grade} ${i}`
        })
      }
    })
    
    return classes
  }

  const classes = generateClasses()
  
  // Generate students for selected class
  const generateStudents = () => {
    if (!selectedClass) return []
    
    const students = []
    const classInfo = classes.find(c => c.id === selectedClass)
    const studentCount = classInfo?.students || 35
    
    for (let i = 1; i <= studentCount; i++) {
      const statuses = ['hadir', 'izin', 'sakit', 'alpha']
      const weights = [0.85, 0.08, 0.05, 0.02] // Probability weights
      const random = Math.random()
      let status = 'hadir'
      
      if (random < weights[3]) status = 'alpha'
      else if (random < weights[3] + weights[2]) status = 'sakit'
      else if (random < weights[3] + weights[2] + weights[1]) status = 'izin'
      
      students.push({
        id: i,
        name: `Siswa ${i.toString().padStart(3, '0')}`,
        nis: `2024${selectedClass.replace('-', '')}${i.toString().padStart(3, '0')}`,
        status: status,
        checkIn: status === 'hadir' ? `${7 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : '-'
      })
    }
    
    return students.sort((a, b) => a.name.localeCompare(b.name))
  }

  const students = generateStudents()

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const saveAttendance = () => {
    console.log('Saving attendance:', attendanceData)
    // Simulasi penyimpanan
    alert('Data absensi berhasil disimpan!')
  }

  const exportToPDF = () => {
    console.log('Exporting to PDF...')
    alert('Mengekspor ke PDF...')
  }

  const exportToExcel = () => {
    console.log('Exporting to Excel...')
    alert('Mengekspor ke Excel...')
  }

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
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedClassInfo = classes.find(c => c.id === selectedClass)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Guru</h1>
                <p className="text-xs text-gray-500">Budi Santoso, S.Pd - Guru Matematika</p>
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
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Selamat Pagi, Bapak Budi! 👋</h2>
          <p className="text-green-100">Senin, 15 Januari 2024 - Siap untuk mengajar dan mencatat absensi hari ini</p>
        </div>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classes">Daftar Kelas</TabsTrigger>
            <TabsTrigger value="attendance">Input Absensi</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari kelas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Filter berdasarkan tingkat</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classInfo) => (
                <Card key={classInfo.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-gray-900">
                        Kelas {classInfo.name}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {classInfo.students} Siswa
                      </Badge>
                    </div>
                    <CardDescription>
                      Wali Kelas: {classInfo.teacher}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Kehadiran Hari Ini</span>
                        <span className="text-sm font-bold text-green-600">{classInfo.attendance}%</span>
                      </div>
                      <Progress value={classInfo.attendance} className="h-2" />
                      
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-green-50 rounded">
                          <p className="text-xs text-gray-600">Hadir</p>
                          <p className="text-sm font-bold text-green-600">
                            {Math.floor(classInfo.students * classInfo.attendance / 100)}
                          </p>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <p className="text-xs text-gray-600">Tidak Hadir</p>
                          <p className="text-sm font-bold text-red-600">
                            {classInfo.students - Math.floor(classInfo.students * classInfo.attendance / 100)}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setSelectedClass(classInfo.id)
                          // Switch to attendance tab
                          document.querySelector('[value="attendance"]')?.click()
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Input Absensi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Input Absensi Kelas
                    </CardTitle>
                    <CardDescription>
                      {selectedClassInfo ? `Kelas ${selectedClassInfo.name} - ${selectedClassInfo.students} Siswa` : 'Pilih kelas terlebih dahulu'}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="class-select">Kelas:</Label>
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="date-select">Tanggal:</Label>
                      <Input
                        id="date-select"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-40"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedClass ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm">Hadir</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm">Izin</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-sm">Sakit</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm">Alpha</span>
                        </div>
                      </div>
                      <Button onClick={saveAttendance} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Simpan Absensi
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg max-h-96 overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.nis}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{student.checkIn}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <Select
                                  value={attendanceData[student.id] || student.status}
                                  onValueChange={(value) => handleAttendanceChange(student.id, value)}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="hadir">Hadir</SelectItem>
                                    <SelectItem value="izin">Izin</SelectItem>
                                    <SelectItem value="sakit">Sakit</SelectItem>
                                    <SelectItem value="alpha">Alpha</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Pilih kelas untuk mulai input absensi</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Statistik Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Siswa</span>
                      <span className="text-lg font-bold text-gray-900">1,080</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Hadir</span>
                      <span className="text-lg font-bold text-green-600">945</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tidak Hadir</span>
                      <span className="text-lg font-bold text-red-600">135</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Persentase</span>
                      <span className="text-lg font-bold text-blue-600">87.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    Kelas Terbaik
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-yellow-800">1</span>
                        </div>
                        <span className="text-sm font-medium">XII IPA 1</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-gray-800">2</span>
                        </div>
                        <span className="text-sm font-medium">XI IPA 2</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">96%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-orange-800">3</span>
                        </div>
                        <span className="text-sm font-medium">X IPA 3</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button onClick={exportToPDF} className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button onClick={exportToExcel} className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export Excel
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Cetak Rekap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2 text-blue-600" />
                  Rekap Absensi Mingguan
                </CardTitle>
                <CardDescription>8 - 15 Januari 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sen</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Sel</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Rab</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Kam</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Jum</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Rata-rata</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {classes.slice(0, 10).map((cls) => (
                        <tr key={cls.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{cls.name}</td>
                          <td className="px-4 py-3 text-center text-sm text-green-600">95%</td>
                          <td className="px-4 py-3 text-center text-sm text-green-600">92%</td>
                          <td className="px-4 py-3 text-center text-sm text-green-600">88%</td>
                          <td className="px-4 py-3 text-center text-sm text-green-600">90%</td>
                          <td className="px-4 py-3 text-center text-sm text-green-600">93%</td>
                          <td className="px-4 py-3 text-center text-sm font-bold text-blue-600">91.6%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}