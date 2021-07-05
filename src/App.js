import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
