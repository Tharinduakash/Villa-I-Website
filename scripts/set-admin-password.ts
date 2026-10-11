// Usage (PowerShell):
//   $env:ADMIN_EMAIL="admin@villaihotel.com"; $env:NEW_PASSWORD="your-long-password"; pnpm admin:password
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@villaihotel.com'
  const password = process.env.NEW_PASSWORD

  if (!password || password.length < 12) {
    throw new Error('Set NEW_PASSWORD (at least 12 characters)')
  }

  await prisma.adminUser.update({
    where: { email },
    data: { password: await hash(password, 12) },
  })
  console.log(`✅ Password updated for ${email}`)
}

main()
  .catch((e) => { console.error(e.message); process.exitCode = 1 })
  .finally(() => prisma.$disconnect())
