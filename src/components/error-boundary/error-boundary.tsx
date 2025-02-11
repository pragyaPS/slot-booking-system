import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className="flex flex-col items-center justify-center h-[50vh] gap-4">
					<h2 className="text-2xl font-bold">Something went wrong</h2>
					<p className="text-gray-600">{this.state.error?.message}</p>
					<Button onClick={() => window.location.reload()}>Try again</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

export const withErrorBoundary = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	return function WithErrorBoundary(props: P) {
		return (
			<ErrorBoundary>
				<WrappedComponent {...props} />
			</ErrorBoundary>
		);
	};
};
