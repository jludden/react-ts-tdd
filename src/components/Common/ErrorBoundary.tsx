import React from 'react';

interface IErrorBoundaryProps {
    message?: string;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): IErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: any): void {
        // You can also log the error to an error reporting service
        //   logErrorToMyService(error, errorInfo);
        console.log(`${error}, ${errorInfo}`);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>{this.props.message ? this.props.message : 'Something went wrong.'}</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
