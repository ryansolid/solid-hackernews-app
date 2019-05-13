import 'webcomponent-router/components';

import(/*webpackChunkName: "hacker-news", webpackPreload: true*/ "./elements/HackerNews");
import(/*webpackChunkName: "app-nav", webpackPreload: true*/ "./elements/AppNav");
import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
