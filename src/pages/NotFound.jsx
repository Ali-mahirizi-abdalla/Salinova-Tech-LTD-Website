import React from 'react';

export function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors">
        Go Home
      </a>
    </section>
  );
}
