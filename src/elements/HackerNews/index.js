import { customElement } from 'solid-element';
import Router from 'webcomponent-router';

import StoreContext from '../../Store';
import setupRoutes from '../../setupRoutes';
import style from './style.css';

const HackerNews = (_, { element }) => {
  const router = new Router(element, { location: 'hash', root: process.env.NODE_ENV === 'production' ? 'solid-hackernews-app/' : '' });
  setupRoutes(router);
  router.start();

  return <>
    <style>{style}</style>
    <app-nav />
    <StoreContext.Provide>
      <slot />
    </StoreContext.Provide>
  </>
}

export default customElement('hacker-news', HackerNews);
