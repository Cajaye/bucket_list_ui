import Header from "./Header";
import Home from "./Home";
import Auth from "./Auth"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { motion } from "framer-motion"
import CreateBucket from "./CreateBucket";
import BucketDetails from "./BucketDetaisl";

function App() {
  return (
    <Router>
      <motion.div className="App" initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/authorize">
            <Auth />
          </Route>
          <Route path="/create">
            <CreateBucket />
          </Route>
          <Route path="/bucket/:id">
            <BucketDetails />
          </Route>
        </Switch>
      </motion.div>
    </Router>
  );
}

export default App;
