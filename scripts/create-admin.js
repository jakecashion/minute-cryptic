const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const readline = require('readline')

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createAdmin() {
  console.log('\n🔐 Create Admin User\n')

  try {
    const email = await question('Email: ')
    const password = await question('Password: ')
    const name = await question('Name (optional): ')

    if (!email || !password) {
      console.error('❌ Email and password are required')
      process.exit(1)
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      console.error('❌ User with this email already exists')
      process.exit(1)
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        role: 'ADMIN'
      }
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`\nEmail: ${user.email}`)
    console.log(`Name: ${user.name || 'N/A'}`)
    console.log(`Role: ${user.role}`)
    console.log(`\nYou can now log in at http://localhost:3000/login\n`)

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

createAdmin()
