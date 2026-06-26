# Cultura Conecta

**An intelligent cultural matchmaking platform that connects artists, collectives, and creative producers with the most relevant funding opportunities.**

Cultura Conecta is a full-stack web application designed to simplify how cultural professionals discover grants, public calls, and funding opportunities. The platform allows users to register artists and opportunities, then automatically calculates a compatibility score between them based on cultural tags, areas of activity, and opportunity requirements.

## Overview

Finding the right cultural grant is often a slow and fragmented process. Artists and collectives frequently miss opportunities because public calls are scattered across different platforms, written in complex language, or difficult to filter according to their profile.

Cultura Conecta addresses this problem by organizing artists and funding opportunities in a structured system and generating intelligent recommendations through a matchmaking algorithm.

The project was designed with a visual identity inspired by Brazilian street culture, MPB, indie music, handmade posters, and independent cultural movements.

## Key Features

* Artist and collective profile registration
* Cultural opportunity and grant registration
* Real-time data persistence with PostgreSQL
* Automatic matchmaking between artists and opportunities
* Compatibility score based on shared cultural tags
* Dashboard with live database statistics
* Tag normalization for better matching accuracy
* Responsive interface with a cultural and editorial visual style
* Full production deployment on Vercel

## Tech Stack

| Area         | Technology                                    |
| ------------ | --------------------------------------------- |
| Framework    | Next.js                                       |
| UI           | React                                         |
| Language     | TypeScript                                    |
| Styling      | Tailwind CSS                                  |
| Database     | Supabase PostgreSQL                           |
| ORM          | Prisma                                        |
| Deployment   | Vercel                                        |
| Architecture | App Router, Server Components, Server Actions |

## Product Flow

1. **Register an artist**

   Users can create artist or collective profiles with name, location, cultural area, description, and tags.

2. **Register an opportunity**

   Users can register grants or cultural calls with title, institution, value, deadline, description, and required tags.

3. **Generate matches**

   The system compares artist tags with opportunity requirements and calculates a compatibility score.

4. **Review recommendations**

   Matches are displayed with score percentage, compatible tags, missing requirements, and opportunity details.

## Matchmaking Logic

The matchmaking system compares the tags from an artist profile with the required tags from each opportunity.

The score is calculated using the following formula:

```text
score = compatible tags / required opportunity tags × 100
```

Example:

```text
Artist tags:
music, youth, Minas Gerais

Opportunity tags:
music, youth, periphery

Result:
2 compatible tags out of 3 requirements = 67% compatibility
```

The algorithm also normalizes tags by removing accents, trimming spaces, and converting values to lowercase. This improves matching consistency when users type similar terms in different formats.

## Main Pages

### Home

Introduces the platform, explains the problem, presents the solution, and guides users to register artists, opportunities, or view matches.

### Dashboard

Displays real-time platform metrics, including:

* total registered artists;
* total registered opportunities;
* total generated matches;
* average compatibility score;
* top recommended matches.

### Artists

Allows users to register and view artist or collective profiles.

### Opportunities

Allows users to register and view cultural grants, funding calls, and public opportunities.

### Matches

Displays all calculated artist-opportunity matches, ordered by compatibility score.

Each match includes:

* artist name;
* cultural area;
* recommended opportunity;
* institution;
* compatibility score;
* matching tags;
* missing requirements.

## Project Structure

```text
app/
  page.tsx
  dashboard/
    page.tsx
  artistas/
    page.tsx
    actions.ts
  editais/
    page.tsx
    actions.ts
  matches/
    page.tsx
  api/
    health/
      route.ts

components/
  AppNav.tsx

lib/
  prisma.ts
  match-score.ts

prisma/
  schema.prisma
```

## Database Models

The application uses two main database models: `Artist` and `Opportunity`.

```prisma
model Artist {
  id          String   @id @default(cuid())
  name        String
  city        String
  area        String
  description String
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Opportunity {
  id          String   @id @default(cuid())
  title       String
  institution String
  value       String
  deadline    DateTime
  description String
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/leomoraisf/cultura-conecta.git
```

Enter the project folder:

```bash
cd cultura-conecta
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL="your_supabase_database_url"
```

Generate the Prisma Client:

```bash
pnpm prisma generate
```

Run the development server:

```bash
pnpm dev
```

Open the application:

```text
http://localhost:3000
```

## Production Deployment

The project is deployed on Vercel and uses Supabase PostgreSQL as the production database.

Required environment variable:

```text
DATABASE_URL
```

Build command:

```bash
prisma generate && next build
```

## Why This Project Matters

Cultura Conecta is not only a CRUD application. It demonstrates a practical product idea for the cultural sector, combining database modeling, server-side rendering, business logic, interface design, and deployment.

The project shows how technology can reduce friction in the cultural funding process by helping artists and institutions find better matches faster.

## Technical Highlights

* Full-stack application built with Next.js App Router
* Server-side database access using Prisma
* PostgreSQL integration through Supabase
* Type-safe development with TypeScript
* Server Actions for form handling
* Dynamic pages using real production data
* Custom matchmaking algorithm
* Responsive UI with a strong visual concept
* Production-ready deployment workflow

## Future Improvements

* User authentication
* Separate dashboards for artists and institutions
* PDF upload and automatic grant analysis
* AI-powered opportunity recommendations
* Advanced filters by city, cultural area, value, and deadline
* Saved opportunities
* Admin panel for cultural managers
* Email alerts for new compatible grants
* Portfolio upload for artists
* Application status tracking

## Author

Developed by **Leonardo Morais** as a full-stack portfolio project focused on technology, culture, and social impact.
