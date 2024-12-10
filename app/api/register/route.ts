import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs';


export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
} 