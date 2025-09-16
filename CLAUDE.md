# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要: ユーザーからの指示
このプロジェクトは日本語が母語の日本人によって開発されています。可能な限り日本語で回答してください。 ただし、技術的な用語は無理に翻訳を行わずとも問題ありません。

## Project Overview

This is "edinfo", a Nuxt.js application that displays emergency vehicle dispatch information from Japanese fire departments in a web-friendly format. The application fetches data from external APIs and displays emergency dispatch information by local government code (JISX0402).

## Commands

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build

### Package Management
- Uses `pnpm` as package manager (specified in package.json)
- `pnpm install` - Install dependencies

## Architecture

### Data Sources
- **Emergency dispatch data**: Fetched from `emergency-dispatch` API (configured via `EDBOT_BASE_URL`)
- **Local government names**: Fetched from `jmcjson` API (configured via `JMCJSON_BASE_URL`)

### Key Configuration
- **Runtime Config**: `nuxt.config.ts` contains two important base URLs:
  - `EDBOT_BASE_URL`: Points to emergency-dispatch API
  - `JMCJSON_BASE_URL`: Points to jmcjson API for local government names
- **Styling**: Uses Bulma CSS framework with PurgeCSS for optimization
- **Language**: Japanese (ja) configured in HTML attributes

### Server API Structure
Located in `server/api/`:
- `[jisx0402].ts` - Fetches emergency dispatch data for specific local government code (1-minute cache)
- `name/[jisx0402].ts` - Fetches local government name from JMCJSON (persistent cache)
- `list.ts` - Fetches list of available areas (5-minute cache)

### Frontend Structure
- **Pages**:
  - `index.vue` - Homepage with site overview
  - `area/[jisx0402].vue` - Individual area dispatch information
  - `area/index.vue` - Area listing page
- **Components**:
  - `Top/` - Homepage-specific components (Header, About, Nav)
  - `Common/` - Shared components (Footer)
- **Layout**: Simple default layout in `layouts/default.vue`

### Caching Strategy
- Emergency data: 1-minute cache per JISX0402 code
- Government names: Persistent server-side cache
- Area list: 5-minute cache
- All APIs implement fallback to cached data on fetch failure

### Data Flow
1. User visits area page with JISX0402 parameter
2. Page fetches emergency data and government name in parallel
3. Emergency data comes from external emergency-dispatch API via server proxy
4. Government name comes from JMCJSON API via server proxy
5. Data is cached and displayed with proper error handling

## Environment Setup
When self-hosting, configure the base URLs in `nuxt.config.ts`:
- Set `EDBOT_BASE_URL` to your emergency-dispatch instance
- Set `JMCJSON_BASE_URL` to your jmcjson instance