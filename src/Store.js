import { createContext, useContext } from "solid-js";

const StoreContext = createContext();
export function StoreProvider(props) {
  return <StoreContext.Provider value={createStore()}>{props.children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs"
};
function createStore() {
  const cache = {};

  const get = (path) =>
    cache[path] ||
    (cache[path] = fetch(`https://node-hnapi.herokuapp.com/${path}`).then((r) => r.json()));

  return {
    getItem: (id) => get(`item/${id}`),
    getUser: (id) => get(`user/${id}`),
    getStories: (type, page) => get(`${mapStories[type]}?page=${page}`)
  };
}
