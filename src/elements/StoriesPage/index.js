import { createState, createEffect } from "solid-js";
import { customElement } from "solid-element";

import(/*webpackChunkName: "story-item"*/ "../StoryItem");

import { useStore } from "../../Store";
import style from "./style.css";

const StoriesPage = props => {
  const [state, setState] = createState(),
    { getStories } = useStore();

  createEffect(async () => {
    const stories = await getStories(props.type, props.page);
    setState({ stories });
  });

  return (
    <>
      <style>{style}</style>
      <For each={state.stories}>{story => <story-item story={story} />}</For>
      <a is="route-link" query={{ page: props.page + 1 }} class="paginator">
        More
      </a>
    </>
  );
};

export default customElement(
  "stories-page",
  { type: "top", page: 0 },
  StoriesPage
);
