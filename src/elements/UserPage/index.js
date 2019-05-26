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
    <$ when={state.user}>{user =>
      <>
        <p>user: {user.id}</p>
        <p>created: {user.created}</p>
        <p>karma: {user.karma}</p>
        <p>about: <span innerHTML={user.about} /></p>
      </>
    }</$>
  </>
};

export default customElement('user-page', {userId: ''}, UserPage);
