import { useState } from "react";
import AppRouter from './routes/AppRouter';
import { Toaster } from "sonner";
import "./App.scss";
import Signup from "./containers/Authentication/Signup";
import Login from "./containers/Authentication/Login";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App_Route">
        <Toaster position="top-right"  />
        <AppRouter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
