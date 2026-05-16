# Backend System

## Stack

- Supabase
- PostgreSQL
- JWT admin auth

## Rules

- never expose admin APIs publicly
- validate all inputs
- centralize database access
- use typed responses

## Database

Tables should remain modular:
- menu_items
- packages
- gallery
- testimonials
- quotations

Never assume schema fields.
Inspect before modifying.