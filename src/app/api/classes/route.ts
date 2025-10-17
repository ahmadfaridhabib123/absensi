import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const grade = searchParams.get('grade')
    const program = searchParams.get('program')

    let whereClause: any = {}

    if (grade) {
      whereClause.grade = grade
    }

    if (program) {
      whereClause.program = program
    }

    const classes = await db.class.findMany({
      where: whereClause,
      include: {
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                nip: true
              }
            }
          }
        },
        _count: {
          select: {
            attendances: true
          }
        }
      },
      orderBy: [
        { grade: 'asc' },
        { program: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(classes)

  } catch (error) {
    console.error('Get classes error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, grade, program, studentCount } = await request.json()

    if (!name || !grade) {
      return NextResponse.json(
        { error: 'Name and grade are required' },
        { status: 400 }
      )
    }

    // Check if class already exists
    const existingClass = await db.class.findFirst({
      where: { name }
    })

    if (existingClass) {
      return NextResponse.json(
        { error: 'Class with this name already exists' },
        { status: 400 }
      )
    }

    const newClass = await db.class.create({
      data: {
        name,
        grade,
        program,
        studentCount: studentCount || 0
      },
      include: {
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                nip: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Class created successfully',
      class: newClass
    })

  } catch (error) {
    console.error('Create class error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}