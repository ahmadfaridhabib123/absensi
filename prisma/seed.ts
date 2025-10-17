import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sman-gurah.sch.id' },
    update: {},
    create: {
      email: 'admin@sman-gurah.sch.id',
      password: adminPassword,
      name: 'Dr. Ahmad Wijaya, M.Pd',
      role: 'ADMIN',
      nip: '198001012005011001'
    },
  })

  // Create teacher users
  const teacherPassword = await bcrypt.hash('guru123', 10)
  const teachers = [
    { name: 'Budi Santoso, S.Pd', email: 'budi@sman-gurah.sch.id', nip: '198502152010011001' },
    { name: 'Siti Nurhaliza, S.Si', email: 'siti@sman-gurah.sch.id', nip: '198803202012021001' },
    { name: 'Ahmad Fauzi, M.Kom', email: 'ahmad@sman-gurah.sch.id', nip: '199001052015031001' },
    { name: 'Dewi Lestari, S.Pd', email: 'dewi@sman-gurah.sch.id', nip: '199205122018022001' },
    { name: 'Rudi Hartono, S.T', email: 'rudi@sman-gurah.sch.id', nip: '199308252019031001' }
  ]

  for (const teacher of teachers) {
    await prisma.user.upsert({
      where: { email: teacher.email },
      update: {},
      create: {
        email: teacher.email,
        password: teacherPassword,
        name: teacher.name,
        role: 'GURU',
        nip: teacher.nip
      }
    })
  }

  // Create classes
  const classes = []
  
  // Generate classes X-1 to X-10
  for (let i = 1; i <= 10; i++) {
    classes.push({
      name: `X ${i}`,
      grade: 'X',
      program: i <= 5 ? 'IPA' : 'IPS',
      studentCount: 35 + Math.floor(Math.random() * 5)
    })
  }

  // Generate classes XI-1 to XI-10
  for (let i = 1; i <= 10; i++) {
    classes.push({
      name: `XI ${i}`,
      grade: 'XI',
      program: i <= 5 ? 'IPA' : 'IPS',
      studentCount: 35 + Math.floor(Math.random() * 5)
    })
  }

  // Generate classes XII-1 to XII-10
  for (let i = 1; i <= 10; i++) {
    classes.push({
      name: `XII ${i}`,
      grade: 'XII',
      program: i <= 5 ? 'IPA' : 'IPS',
      studentCount: 35 + Math.floor(Math.random() * 5)
    })
  }

  for (const classData of classes) {
    await prisma.class.upsert({
      where: { name: classData.name },
      update: {},
      create: classData
    })
  }

  // Create student users
  const studentPassword = await bcrypt.hash('siswa123', 10)
  const createdClasses = await prisma.class.findMany()
  
  let studentCounter = 1
  for (const classItem of createdClasses) {
    for (let i = 1; i <= classItem.studentCount; i++) {
      const studentNumber = studentCounter.toString().padStart(3, '0')
      const nis = `2024${classItem.grade}${classItem.program}${studentNumber}`
      
      await prisma.user.upsert({
        where: { nis },
        update: {},
        create: {
          email: `siswa${studentCounter}@sman-gurah.sch.id`,
          password: studentPassword,
          name: `Siswa ${studentNumber}`,
          role: 'SISWA',
          nis,
          className: classItem.name
        }
      })
      
      studentCounter++
    }
  }

  // Create sample attendance records for the last 7 days
  const students = await prisma.user.findMany({
    where: { role: 'SISWA' }
  })

  const today = new Date()
  for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
    const date = new Date(today)
    date.setDate(date.getDate() - dayOffset)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    for (const student of students) {
      const random = Math.random()
      let status = 'HADIR'
      
      if (random < 0.02) status = 'ALPHA'
      else if (random < 0.07) status = 'SAKIT'
      else if (random < 0.15) status = 'IZIN'
      
      const studentClass = await prisma.class.findFirst({
        where: { name: student.className }
      })
      
      if (studentClass) {
        await prisma.attendance.upsert({
          where: {
            studentId_date: {
              studentId: student.id,
              date: date
            }
          },
          update: {},
          create: {
            studentId: student.id,
            classId: studentClass.id,
            date: date,
            status: status as any,
            checkIn: status === 'HADIR' ? new Date(date.getTime() + 7 * 60 * 60 * 1000 + Math.random() * 30 * 60 * 1000) : null,
            checkOut: status === 'HADIR' ? new Date(date.getTime() + 15.5 * 60 * 60 * 1000) : null
          }
        })
      }
    }
  }

  // Create academic calendar events
  const calendarEvents = [
    {
      title: 'Hari Pertama Masuk Sekolah',
      description: 'Awal tahun ajaran 2024/2025',
      startDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-15'),
      type: 'KEGIATAN' as const
    },
    {
      title: 'Ujian Tengah Semester Ganjil',
      description: 'UTS Ganjil 2024/2025',
      startDate: new Date('2024-09-23'),
      endDate: new Date('2024-10-02'),
      type: 'UJIAN' as const
    },
    {
      title: 'Libur Semester Ganjil',
      description: 'Libur akhir semester ganjil',
      startDate: new Date('2024-12-23'),
      endDate: new Date('2025-01-06'),
      type: 'LIBUR_SEMESTER' as const
    }
  ]

  for (const event of calendarEvents) {
    await prisma.academicCalendar.upsert({
      where: { 
        title_startDate: {
          title: event.title,
          startDate: event.startDate
        }
      },
      update: {},
      create: event
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })