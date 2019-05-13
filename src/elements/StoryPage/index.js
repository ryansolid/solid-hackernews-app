import { createState, createEffect } from 'solid-js';
import { customElement, useContext } from 'solid-element';

import(/*webpackChunkName: "story-item"*/ "../StoryItem");
import(/*webpackChunkName: "comment-item"*/ "../CommentItem");
import Store from '../../Store';
import style from './style.css';

const StoryPage = props => {
  const [state, setState] = createState(),
    watch = useContext(Store);

  createEffect(() =>
    watch(
      {name: 'story', id: props.storyId},
      story => setState({story})
    )
  );

  return <>
    <style>{style}</style>
    <$ when={state.story}>{story =>
      <>
        <story-item story={story}></story-item>
        <div class='body' innerHTML={story.text || ''} />
        <ul><$ each={story.kids}>{commentId =>
          <li><comment-item commentId={commentId} /></li>
        }</$></ul>
      </>
    }</$>
  </>
}

export default customElement('story-page', {storyId: 0}, StoryPage);
