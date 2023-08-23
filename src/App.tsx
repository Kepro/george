import { ErrorBoundary } from "react-error-boundary";

import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { ErrorFallback } from "./components/common/ErrorFallback";
import { HashRouter } from "./components/common/HashRouter";
import { CurrenciesPage } from "./pages/CurrenciesPage";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HashRouter>
        <Header />
        <SearchBar />
        <div className="container mx-auto mt-8 mb-4 px-4">
          <CurrenciesPage />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
