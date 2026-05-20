"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[CertiFlow ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[50vh] items-center justify-center p-8">
          <div className="rounded-card border border-danger-muted bg-danger-muted p-8 text-center max-w-md shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger/20">
              <AlertTriangle className="h-7 w-7 text-danger" />
            </div>
            <h2 className="text-lg font-black text-danger-fg">Une erreur est survenue</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {this.state.error.message || "Erreur inattendue dans ce composant."}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <RefreshCcw className="h-4 w-4" />
              Reessayer
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              Si l&apos;erreur persiste, rafraichis la page ou change de vue dans le menu lateral.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
