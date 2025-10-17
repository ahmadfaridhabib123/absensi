import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const className = searchParams.get('className')

    let whereClause: any = {}

    if (role) {
      whereClause.role = role.toUpperCase()
    }

    if (className) {
      whereClause.className = className
    }

    const users = await db.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        nis: true,
        nip: true,
        className: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            attendances: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(users)

  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, nis, nip, className } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, password, name, and role are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email },
          ...(nis ? [{ nis }] : []),
          ...(nip ? [{ nip }] : [])
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email, NIS, or NIP already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role.toUpperCase(),
        nis,
        nip,
        className
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        nis: true,
        nip: true,
        className: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      message: 'User created successfully',
      user: newUser
    })

  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}