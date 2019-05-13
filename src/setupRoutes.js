export default (router) => {
  router.map(r => {
    r.notFound(() => ['index']);
    r.index({
      tag: 'stories-page',
      attributes: {type: 'top'},
      onEnter: () => import(/*webpackChunkName: "stories-page", webpackPrefetch: true*/ "./elements/StoriesPage")
    });
    r.route('new', {
      tag: 'stories-page',
      attributes: {type: 'new'},
      onEnter: () => import(/*webpackChunkName: "stories-page", webpackPrefetch: true*/ "./elements/StoriesPage")
    });
    r.route('show', {
      tag: 'stories-page',
      attributes: {type: 'show'},
      onEnter: () => import(/*webpackChunkName: "stories-page", webpackPrefetch: true*/ "./elements/StoriesPage")
    });
    r.route('ask', {
      tag: 'stories-page',
      attributes: {type: 'ask'},
      onEnter: () => import(/*webpackChunkName: "stories-page", webpackPrefetch: true*/ "./elements/StoriesPage")
    });
    r.route('job', {
      tag: 'stories-page',
      attributes: {type: 'job'},
      onEnter: () => import(/*webpackChunkName: "stories-page", webpackPrefetch: true*/ "./elements/StoriesPage")
    });
    r.route('user', {
      path: '/users/:userId',
      tag: 'user-page',
      onEnter: () => import(/*webpackChunkName: "user-page"*/ "./elements/UserPage")
    });
    r.route('story', {
      path: '/stories/:storyId',
      tag: 'story-page',
      onEnter: () => import(/*webpackChunkName: "story-page"*/ "./elements/StoryPage")
    });
  });
}