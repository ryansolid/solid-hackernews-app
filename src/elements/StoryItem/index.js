import { customElement } from 'solid-element';

import { urlHost, relativeTime } from '../../lib/format';
import style from './style.css';

const StoryItem = ({ story }) =>
  <>
    <style>{style}</style>
    <Show
      when={ story.url }
      fallback={
        <a is='route-link' name='story' params={{storyId: story.id}}>{story.title}</a>
      }
    >
      <a href={story.url}>{story.title}</a>
      <small class='light'>(<a href={story.url}>{urlHost(story.url)}</a>)</small>
    </Show>
    <div class='subtext light'>
      <Show
        when={ story.type !== 'job' }
        fallback={
          <a is='route-link' name='story' params={{storyId: story.id}}>{
            relativeTime(story.time * 1000)}
          </a>
        }
      >
        {story.score && `${story.score} points by `}
        <a is='route-link' name='user' params={{userId: story.by}}>{story.by}</a>{" "}
        <a is='route-link' name='story' params={{storyId: story.id}}>{
          relativeTime(story.time * 1000)
        }</a> |{" "}
        <a is='route-link' name='story' params={{storyId: story.id}}>{
          story.descendants ? `${story.descendants} comments` : 'discuss'
        }</a>
      </Show>
    </div>
  </>

export default customElement('story-item', {story: {}}, StoryItem);
