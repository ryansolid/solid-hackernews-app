import { createContext, useContext } from "solid-js";

const StoreContext = createContext();
export function StoreProvider(props) {
  return (
    <StoreContext.Provider value={createStore()}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

function createStore() {
  const ITEMS_PER_PAGE = 30;
  const cache = {};

  const get = path =>
    cache[path] ||
    (cache[path] = fetch(
      `https://hacker-news.firebaseio.com/v0/${path}`
    ).then(r => r.json()));

  const getItem = id => get(`item/${id}.json`);

  const getUser = id => get(`user/${id}.json`);

  const getItems = (ids, page, limit) =>
    Promise.all(
      ids.slice(page * limit, (page + 1) * limit).map(getItem)
    ).then(data => data.filter(Boolean)); // filter deleted items

  const getStories = (type, page) =>
    get(`${type}stories.json`).then(ids => getItems(ids, page, ITEMS_PER_PAGE));

  return {
    getItem,
    getUser,
    getStories
  };
}
