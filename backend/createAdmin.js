const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  const user = await prisma.user.create({
    data: {
      nom: 'Administrateur',
      email: 'admin@pharmacare.com',
      password: hash,
      role: 'admin'
    }
  })
  console.log('Compte créé:', user)
  await prisma.$disconnect()
}

main()