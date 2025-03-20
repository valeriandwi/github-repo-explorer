# GitHub Repo Explorer

GitHub Repo Explorer is a React application built with TypeScript and Vite. It allows users to search for GitHub users and view their repositories, leveraging React Query for API data fetching and Ant Design for UI components.

## Features

- **Search GitHub Users**: Search for GitHub users by username.
- **View Repositories**: Display repositories for a selected user.
- **Error Handling**: Displays error messages for failed API requests.
- **Loading States**: Skeleton loaders for a better user experience.
- **Responsive Design**: Built with responsive layouts using Tailwind CSS and Ant Design.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Vite**: Fast build tool for modern web projects.
- **React Query**: Data fetching and state management.
- **Ant Design**: UI component library.
- **Vitest**: Unit testing framework.
- **ESLint**: Linting for code quality.
- **Tailwind CSS**: Utility-first CSS framework.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/your-username/github-repo-explorer.git
   cd github-repo-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at

```bash
http://localhost:5173.
```

## Testing

This project uses Vitest for unit testing and @testing-library/react for testing React components.

```bash
npm run test
```

## Environment Variables

Create a .env file in the root directory and add the following variables:

```bash
VITE_GITHUB_API_URL=https://api.github.com
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

- VITE_GITHUB_API_URL: Base URL for thev GitHub API.
- VITE_GITHUB_TOKEN: Your GitHub personal access token for authenticated requests.

## Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and push the branch.
- Open a pull request.
