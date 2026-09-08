import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  // Basic presence check
  if (!email || !username || !password) {
    return NextResponse.json(
      { error: "Email, username, and password are required." },
      { status: 400 }
    );
  }

  // Password complexity: 1 lowercase, 1 uppercase, 1 special character, min 8 chars
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a special character.",
      },
      { status: 400 }
    );
  }

  // Check for existing email or username
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email or username is already taken." },
      { status: 409 }
    );
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  // Never send the password back, even hashed
  return NextResponse.json(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    { status: 201 }
  );
}