import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const task = await prisma.task.findUnique({ where: { id: params.id } })
  return NextResponse.json(task)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const task = await prisma.task.update({ where: { id: params.id }, data })
  return NextResponse.json(task)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.task.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Task deleted' })
}

