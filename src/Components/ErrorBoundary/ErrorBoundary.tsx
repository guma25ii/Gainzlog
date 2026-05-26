import React, { type ReactNode } from "react";


type Props = {
    children: ReactNode;
    fallback?: ReactNode;
};

type State = {
    hasError: boolean
};

class ErrorBoundary extends React.Component<Props, State> {

    constructor(props:Props){
        super(props)
        this.state = {hasError: false,};
    }

    static getDerivedStateFromError(){
        return { hasError: true};
    } 
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error);
        console.log(errorInfo);
    }


  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="centerContent">
            <p>Something Went Wrong</p>
            <button className="navigationBtn" onClick={() => window.location.reload()}>Reload</button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}


export default ErrorBoundary;