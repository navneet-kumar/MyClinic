import { Root } from "native-base";
import React from "react";
import Navigation from "./src/Navigation";

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}
