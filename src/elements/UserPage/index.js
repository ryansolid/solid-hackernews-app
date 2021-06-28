import { createStore } from "solid-js/store";
import { customElement } from "solid-element";

import { useStore } from "../../Store";
import style from "./style.css";

const UserPage = ({ userId }) => {
  const [state, setState] = createStore(),
    { getUser } = useStore();

  getUser(userId).then(user => setState({ user }));

  return (
    <>
      <style>{style}</style>
      <Show when={state.user}>
        <p>user: {state.user.id}</p>
        <p>created: {state.user.created}</p>
        <p>karma: {state.user.karma}</p>
        <p>
          about: <span innerHTML={state.user.about} />
        </p>
      </Show>
    </>
  );
};

export default customElement("user-page", { userId: "" }, UserPage);
