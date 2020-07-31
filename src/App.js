import React from "react";
import Movies from "./components/movies";
import NavBar from "./components/common/navBar";
import { Route, Switch, Redirect } from "react-router-dom";

import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

import "./App.css";

function App() {
  return (
    <main className="container">
      <NavBar />
      {/* <Movies /> */}
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        {/* this matches any route that starts with / that's why we wrap routes with Switch */}
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
