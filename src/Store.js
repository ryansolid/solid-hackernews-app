import { createSignal, createEffect } from 'solid-js';
import { createContext } from 'solid-element';
import Firebase from 'firebase';

export default createContext(() => {
  const api = new Firebase('https://hacker-news.firebaseio.com/v0')
  const [data, setData] = createSignal({
    cache: new Map(),
    idsByType: new Map()
  });
  const ITEMS_PER_PAGE = 30;

  // fire an update event when the page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(() => setData(data()), 100)
    }
  });

  // keep the story ids real-time updated
  (['top', 'new', 'ask', 'show', 'job']).forEach(type =>
    api.child(`${type}stories`).on('value', snapshot => {
      data().idsByType.set(type, snapshot.val())
      // do not fire events if the page is hidden
      if (!document.hidden) {
        setData(data());
      }
    })
  );

  function fetch(child) {
    const { cache } = data();
    if (cache.has(child)) {
      return Promise.resolve(cache.get(child))
    } else {
      return new Promise((resolve, reject) => {
        api.child(child).once('value', snapshot => {
          const val = snapshot.val()
          cache.set(child, val)
          resolve(val)
        }, reject)
      })
    }
  }

  function fetchIdsByType(type, page) {
    const { idsByType } = data();
    if (idsByType.has(type)) {
      const ids = idsByType.get(type)
      return Promise.resolve(ids.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE))
    }
    return fetch(`${type}stories`)
      .then(ids => ids.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE))
  }

  return (options, callback) => {
    switch (options.name) {
      case 'story':
        createEffect(() => fetch(`item/${options.id}`).then(callback));
        break;
      case 'user':
        createEffect(() => fetch(`user/${options.id}`).then(callback));
        break;
      case 'stories':
        createEffect(async () => {
          const ids = await fetchIdsByType(options.type, options.page) || [];
          const res = await Promise.all(ids.map(id => fetch(`item/${id}`)))
          callback(res.filter(r => r));
        });
        break;
    }
  };
});
