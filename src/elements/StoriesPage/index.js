import { createState, createEffect, reconcile } from 'solid-js';
import { customElement, useContext } from 'solid-element';
import Router from 'webcomponent-router';

import(/*webpackChunkName: "story-item"*/ "../StoryItem");

import Store from '../../Store';
import style from './style.css';

const StoriesPage = (props, { element }) => {
  const [state, setState] = createState(),
    watch = useContext(Store),
    router = Router.for(element);

  createEffect(() =>
    watch({
      name: 'stories',
      type: props.type,
      page: props.page
    }, stories =>
      setState(reconcile('stories', stories))
    )
  )

  return <>
    <style>{style}</style>
    <$ each={state.stories}>{story =>
      <story-item story={story} />
    }</$>
    <a onClick={() => router.transitionTo({ page: props.page + 1 })} class="paginator">More</a>
  </>
}

export default customElement('stories-page', {type: 'top', page: 0}, StoriesPage);
