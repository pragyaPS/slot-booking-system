# Appointment Booking System

A React-based appointment scheduling application that allows customers to book time slots and enables sales managers to view all bookings.

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest
- **UI Components:** shadcn/ui
- **Routing:** React Router
- **Styling:** Tailwind CSS

## Description

This application provides two main features:
- Customer booking interface for selecting available appointment slots
- Sales manager dashboard for viewing all booked appointments

### API Integration
The application connects to a backend API through Vite's proxy configuration to handle CORS and environment-specific setups.

```typescript
// vite.config.ts proxy example
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      rewrite: (path) => path.replace(/^\/api/, ''),
    }
  }
}

```

# Completed Features ✅
- [x] Core booking functionality
- [x] Unit tests for critical components
- [x] Success/Error message handling
- [x] Page level Code splitting and lazy loading
- [x] Page level Error boundaries for graceful error handling
- [x] Responsive design

# Future Improvements 🚀
- [ ] Implement React Query for better data fetching
- [ ] Achieve 100% unit test coverage
- [ ] Implement component level error boundaries
- [ ] Make use of env variables for setting up API base url instead of hardcoding
- [ ] Component level Code splitting and lazy loading

# Getting Started

```sh
# Install dependencies
yarn install

# Run development server
yarn dev

# Run tests
yarn test

# Build for production
yarn build
```

## API Configuration

The application expects a backend API server running on `http://localhost:3000`. To configure the API:

1. Ensure the API server is running on port 3000
2. The proxy configuration in `vite.config.ts` handles CORS automatically
3. To use a different API URL:
   ```typescript
   // Update in vite.config.ts
   server: {
     proxy: {
       '/api': {
         target: 'YOUR_API_URL', // e.g., http://localhost:8080
         rewrite: (path) => path.replace(/^\/api/, ''),
       }
     }
   }

# Project Structure

```
src/
├── api/        # API integration
├── components/ # Reusable components
├── hooks/      # Custom React hooks
├── pages/      # Route components
├── utils/      # Helper functions
└── App.tsx     # Root component
```

# Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request
