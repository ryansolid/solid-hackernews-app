import { createComputed } from "solid-js";
import { createStore } from "solid-js/store";
import { customElement } from "solid-element";

import(/*webpackChunkName: "story-item"*/ "../StoryItem");
import(/*webpackChunkName: "comment-item"*/ "../CommentItem");
import { useStore } from "../../Store";
import style from "./style.css";

const StoryPage = props => {
  const [state, setState] = createStore(),
    { getItem } = useStore();

  createComputed(async () => {
    const story = await getItem(props.storyId)
    setState({ story });
  });

  return (
    <>
      <style>{style}</style>
      <Show when={state.story}>
        <story-item story={state.story}></story-item>
        <div class="body" innerHTML={state.story.content || ""} />
        <ul>
          <For each={state.story.comments}>
            {comment => (
              <li>
                <comment-item comment={comment} />
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
};

export default customElement("story-page", { storyId: 0 }, StoryPage);
