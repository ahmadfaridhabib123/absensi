import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const classId = searchParams.get('classId')
    const date = searchParams.get('date')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let whereClause: any = {}

    if (studentId) {
      whereClause.studentId = studentId
    }

    if (classId) {
      whereClause.classId = classId
    }

    if (date) {
      whereClause.date = new Date(date)
    }

    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    const attendances = await db.attendance.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            nis: true,
            className: true
          }
        },
        class: {
          select: {
            id: true,
            name: true,
            grade: true,
            program: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(attendances)

  } catch (error) {
    console.error('Get attendances error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { studentId, classId, status, notes, checkIn, checkOut } = await request.json()

    if (!studentId || !classId || !status) {
      return NextResponse.json(
        { error: 'Student ID, class ID, and status are required' },
        { status: 400 }
      )
    }

    // Check if attendance already exists for this student and date
    const today = new Date().toISOString().split('T')[0]
    const existingAttendance = await db.attendance.findFirst({
      where: {
        studentId,
        date: new Date(today)
      }
    })

    if (existingAttendance) {
      // Update existing attendance
      const updatedAttendance = await db.attendance.update({
        where: { id: existingAttendance.id },
        data: {
          status,
          notes,
          checkIn: checkIn ? new Date(checkIn) : existingAttendance.checkIn,
          checkOut: checkOut ? new Date(checkOut) : existingAttendance.checkOut
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              nis: true,
              className: true
            }
          },
          class: {
            select: {
              id: true,
              name: true,
              grade: true,
              program: true
            }
          }
        }
      })

      return NextResponse.json({
        message: 'Attendance updated successfully',
        attendance: updatedAttendance
      })
    } else {
      // Create new attendance
      const newAttendance = await db.attendance.create({
        data: {
          studentId,
          classId,
          date: new Date(today),
          status,
          notes,
          checkIn: checkIn ? new Date(checkIn) : null,
          checkOut: checkOut ? new Date(checkOut) : null
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              nis: true,
              className: true
            }
          },
          class: {
            select: {
              id: true,
              name: true,
              grade: true,
              program: true
            }
          }
        }
      })

      return NextResponse.json({
        message: 'Attendance recorded successfully',
        attendance: newAttendance
      })
    }

  } catch (error) {
    console.error('Create attendance error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}