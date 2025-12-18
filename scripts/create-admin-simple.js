const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  console.log('\n🔐 Creating Admin User...\n')

  try {
    // You can change these values
    const email = process.argv[2] || 'admin@minutecryptic.com'
    const password = process.argv[3] || 'ChangeMe123!'
    const name = process.argv[4] || 'Admin User'

    console.log(`Email: ${email}`)
    console.log(`Name: ${name}`)

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      console.log('⚠️  User with this email already exists')
      console.log(`Current role: ${existing.role}`)

      if (existing.role !== 'ADMIN') {
        console.log('Updating user role to ADMIN...')
        const updated = await prisma.user.update({
          where: { email },
          data: { role: 'ADMIN' }
        })
        console.log('✅ User role updated to ADMIN!')
      } else {
        console.log('✅ User is already an admin!')
      }

      process.exit(0)
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: 'ADMIN'
      }
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`\nEmail: ${user.email}`)
    console.log(`Name: ${user.name || 'N/A'}`)
    console.log(`Role: ${user.role}`)
    console.log(`\nYou can now log in at your Vercel URL!\n`)

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
