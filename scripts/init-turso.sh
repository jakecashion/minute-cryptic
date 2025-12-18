#!/bin/bash

# Script to initialize Turso database with Prisma schema

echo "🔧 Initializing Turso database..."

# Get database URL and token
DB_URL=$(/Users/jakecashion/.turso/turso db show minute-cryptic --url)
DB_TOKEN=$(/Users/jakecashion/.turso/turso db tokens create minute-cryptic)

echo "📝 Database URL: $DB_URL"

# Create SQL from Prisma schema
echo "📦 Generating SQL..."
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > schema.sql

# Execute SQL on Turso
echo "🚀 Applying schema to Turso..."
/Users/jakecashion/.turso/turso db shell minute-cryptic < schema.sql

# Clean up
rm schema.sql

echo "✅ Database initialized!"
echo ""
echo "Your environment variables for Vercel:"
echo "DATABASE_URL=$DB_URL"
echo "TURSO_AUTH_TOKEN=$DB_TOKEN"
