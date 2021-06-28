import { createSignal } from "solid-js";
import { customElement } from "solid-element";
import style from "./style.css";

const CommentItem = ({ comment }) => {
  const [hidden, setHidden] = createSignal(false);

  return (
    <>
      <style>{style}</style>
      <Show when={comment && !comment.deleted && !comment.dead && comment.content}>
        <div class="header light">
          <a is="route-link" name="user" prop:params={{ userId: comment.user }}>
            {comment.user}
          </a>{" "}
          {comment.time_ago}
          <a onClick={() => setHidden(h => !h)}>{hidden() ? "[+]" : "[-]"}</a>
        </div>
        <div hidden={hidden()}>
          <div class="body" innerHTML={comment.content || ""} />
          <ul>
            <For each={comment.comments}>
              {(child) => (
                <li>
                  <comment-item comment={child} />
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </>
  );
};

export default customElement("comment-item", { comment: null }, CommentItem);
