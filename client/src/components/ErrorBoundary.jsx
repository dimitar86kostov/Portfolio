import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            message: ''
        }
    }

    static getDerivedStateFromError(err) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, message: err.message };
    }

    render() {
        if (this.state.hasError) {
            
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}