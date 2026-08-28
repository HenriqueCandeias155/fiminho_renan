/** Arquivo de Sessão — rotas da aplicação e moldura partilhada do catálogo local. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageFrame } from "./components/PageFrame";
import { ThemeProvider } from "./contexts/ThemeContext";
import Add from "./pages/Add";
import Home from "./pages/Home";
import List from "./pages/List";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <PageFrame>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/lista" component={List} />
        <Route path="/list.html" component={List} />
        <Route path="/adicionar" component={Add} />
        <Route path="/add.html" component={Add} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </PageFrame>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
