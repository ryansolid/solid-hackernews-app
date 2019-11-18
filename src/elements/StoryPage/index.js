import { createState, createEffect, reconcile } from 'solid-js';
import { customElement } from 'solid-element';

import(/*webpackChunkName: "story-item"*/ "../StoryItem");
import(/*webpackChunkName: "comment-item"*/ "../CommentItem");
import { useStore } from '../../Store';
import style from './style.css';

const StoryPage = props => {
  const [state, setState] = createState(),
    watch = useStore();

  createEffect(() =>
    watch(
      {name: 'story', id: props.storyId},
      story => setState('story', reconcile(story))
    )
  );

  return <>
    <style>{style}</style>
    <Show when={state.story}>
      <story-item story={state.story}></story-item>
      <div class='body' innerHTML={state.story.text || ''} />
      <ul><For each={state.story.kids}>{commentId =>
        <li><comment-item commentId={commentId} /></li>
      }</For></ul>
    </Show>
  </>
}

export default customElement('story-page', {storyId: 0}, StoryPage);
