import { createState, useContext } from 'solid-js';
import { customElement } from 'solid-element';

import Store from '../../Store';
import style from './style.css';

const UserPage = ({ userId }) => {
  const [state, setState] = createState(),
    watch = useContext(Store);

  watch(
    {name: 'user', id: userId},
    user => setState({user})
  );

  return <>
    <style>{style}</style>
    <Show when={state.user}>
      <p>user: {state.user.id}</p>
      <p>created: {state.user.created}</p>
      <p>karma: {state.user.karma}</p>
      <p>about: <span innerHTML={state.user.about} /></p>
    </Show>
  </>
};

export default customElement('user-page', {userId: ''}, UserPage);
