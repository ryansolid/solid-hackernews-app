import { customElement } from 'solid-element';

import style from './style.css';

const AppNav = () => (
  <>
    <style>{style}</style>
    <a is='route-link' name="index"><b>Hacker News</b></a>
    <a is='route-link' name="new">new</a>{" "}
    | <a is='route-link' name="show">show</a>{" "}
    | <a is='route-link' name="ask">ask</a>{" "}
    | <a is='route-link' name="job">jobs</a>
    <span>
      <a href="http://github.com/ryansolid/solid" target="_blank">Built with Solid</a> |{" "}
      <a href="http://github.com/ryansolid/solid-hackernews-app">Source</a>
    </span>
  </>
)

export default customElement('app-nav', AppNav);
