"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";

// Error boundary state interface
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

// Error boundary props interface
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  isolate?: boolean;
  level?: "page" | "section" | "component";
}

// Error display component
interface ErrorDisplayProps {
  error: Error;
  errorInfo: ErrorInfo;
  errorId: string;
  onRetry: () => void;
  level: "page" | "section" | "component";
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  errorInfo,
  errorId,
  onRetry,
  level,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const levelStyles = {
    page: "min-h-screen bg-neutral-900 text-white",
    section: "min-h-[400px] bg-neutral-800 text-white rounded-lg",
    component: "min-h-[200px] bg-neutral-700 text-white rounded-md",
  };

  const iconSizes = {
    page: "w-16 h-16",
    section: "w-12 h-12",
    component: "w-8 h-8",
  };

  const titleSizes = {
    page: "text-3xl",
    section: "text-2xl",
    component: "text-xl",
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-8 ${levelStyles[level]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error Icon */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg
          className={`${iconSizes[level]} text-red-500`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </motion.div>

      {/* Error Title */}
      <motion.h2
        className={`${titleSizes[level]} font-bold mb-4 text-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! Something went wrong
      </motion.h2>

      {/* Error Message */}
      <motion.p
        className="text-neutral-300 text-center mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        We encountered an unexpected error. Please try again or contact support if the problem persists.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>

        <motion.button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reload Page
        </motion.button>
      </motion.div>

      {/* Error ID for support */}
      <motion.p
        className="text-xs text-neutral-500 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Error ID: {errorId}
      </motion.p>

      {/* Development Error Details */}
      {isDevelopment && (
        <motion.details
          className="mt-8 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <summary className="cursor-pointer text-sm text-neutral-400 hover:text-neutral-300 mb-4">
            Show Error Details (Development Only)
          </summary>
          
          <div className="bg-neutral-800 rounded-lg p-4 text-sm">
            <div className="mb-4">
              <h4 className="text-red-400 font-semibold mb-2">Error Message:</h4>
              <pre className="text-red-300 whitespace-pre-wrap break-words">
                {error.message}
              </pre>
            </div>
            
            <div className="mb-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Stack Trace:</h4>
              <pre className="text-yellow-300 whitespace-pre-wrap break-words text-xs overflow-auto max-h-40">
                {error.stack}
              </pre>
            </div>
            
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Component Stack:</h4>
              <pre className="text-blue-300 whitespace-pre-wrap break-words text-xs overflow-auto max-h-40">
                {errorInfo.componentStack}
              </pre>
            </div>
          </div>
        </motion.details>
      )}
    </motion.div>
  );
};

// Main Error Boundary Component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate a unique error ID
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to external service in production
    if (process.env.NODE_ENV === "production") {
      this.logErrorToService(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error boundary when resetKeys change
    if (hasError && resetOnPropsChange && resetKeys) {
      const prevResetKeys = prevProps.resetKeys || [];
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevResetKeys[index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your error tracking service
    // like Sentry, LogRocket, Bugsnag, etc.
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: null, // Add user ID if available
      };

      // Example: Send to your error tracking service
      // errorTrackingService.captureException(errorData);
      
      console.error("Error logged to service:", errorData);
    } catch (loggingError) {
      console.error("Failed to log error to service:", loggingError);
    }
  };

  private resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    });
  };

  render() {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback, level = "component" } = this.props;

    if (hasError && error && errorInfo) {
      // Render custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Render default error display
      return (
        <ErrorDisplay
          error={error}
          errorInfo={errorInfo}
          errorId={errorId}
          onRetry={this.resetErrorBoundary}
          level={level}
        />
      );
    }

    return children;
  }
}

// Higher-order component for easy error boundary wrapping
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Hook for error boundary integration
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    // In a real application, you might want to throw the error
    // to trigger the nearest error boundary
    throw error;
  };
}

export default ErrorBoundary;
export { ErrorDisplay };
export type { ErrorBoundaryProps, ErrorBoundaryState };
