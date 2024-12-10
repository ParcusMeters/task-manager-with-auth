import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const tasks = await prisma.task.findMany()
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const data = await request.json()
  console.log(data.dueDate)
  const task = await prisma.task.create({ data })
  return NextResponse.json(task)
}

