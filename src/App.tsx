import './App.scss';
import { Button } from '@/components/ui/button';
import { Routes, Route, Link } from 'react-router-dom';
import React, { lazy } from 'react';
import { ErrorBoundary } from '@/components/error-boundary/error-boundary';

// Lazy load components
const CustomerBooking = lazy(() => import('./pages/customer-booking'));
const ManagerView = lazy(() => import('./pages/manager-view'));
const BookedSlot = lazy(() => import('./pages/booked-slot'));

function App() {
	return (
		<main className="container mx-auto p-4 max-w-4xl">
			<nav className="mb-6 flex gap-4">
				<Button variant="outline" asChild>
					<Link to="/">Customer Booking</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link to="/manager">Sales Manager</Link>
				</Button>
			</nav>
			<ErrorBoundary>
				<Routes>
					<Route
						path="/"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<CustomerBooking />
							</React.Suspense>
						}
					/>
					<Route
						path="/manager"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<ManagerView />
							</React.Suspense>
						}
					/>
					<Route
						path="/booking/:id"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<BookedSlot />
							</React.Suspense>
						}
					/>
				</Routes>
			</ErrorBoundary>
		</main>
	);
}

export default App;
