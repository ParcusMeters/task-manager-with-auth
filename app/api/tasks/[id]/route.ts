import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'


async function getUserFromSession() {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return null
  }
  return prisma.user.findUnique({
    where: { email: session.user.email }
  })
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromSession()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const task = await prisma.task.findFirst({
    where: {
      id: params.id,
      userId: user.id
    }
  })
  return NextResponse.json(task)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromSession()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const task = await prisma.task.updateMany({
    where: {
      id: params.id,
      userId: user.id
    },
    data
  })
  return NextResponse.json(task)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromSession()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.task.deleteMany({
    where: {
      id: params.id,
      userId: user.id
    }
  })
  return NextResponse.json({ message: 'Task deleted' })
}

