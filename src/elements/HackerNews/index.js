import { customElement } from 'solid-element';
import Router from 'webcomponent-router';

import Store from '../../Store';
import setupRoutes from '../../setupRoutes';
import style from './style.css';

const HackerNews = (_, { element }) => {
  const router = new Router(element, { root: process.env.NODE_ENV === 'production' ? 'solid-hackernews-app/' : '' });
  setupRoutes(router);
  router.start();

  return <>
    <style>{style}</style>
    <app-nav />
    <$ provide={Store}>
      <slot />
    </$>
  </>
}

export default customElement('hacker-news', HackerNews);