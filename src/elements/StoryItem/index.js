import { customElement } from 'solid-element';
import style from './style.css';

const StoryItem = ({ story }) =>
  <>
    <style>{style}</style>
    <Show
      when={ story.url }
      fallback={
        <a is='route-link' name='story' prop:params={{storyId: story.id}}>{story.title}</a>
      }
    >
      <a href={story.url}>{story.title}</a>
      <small class='light'>(<a href={story.url}>{story.domain}</a>)</small>
    </Show>
    <div class='subtext light'>
      <Show
        when={ story.type !== 'job' }
        fallback={
          <a is='route-link' name='story' prop:params={{storyId: story.id}}>{story.time_ago}
          </a>
        }
      >
        {story.points && `${story.points} points by `}
        <a is='route-link' name='user' prop:params={{userId: story.user}}>{story.user}</a>{" "}
        <a is='route-link' name='story' prop:params={{storyId: story.id}}>{
          story.time_ago
        }</a> |{" "}
        <a is='route-link' name='story' prop:params={{storyId: story.id}}>{
          story.comments_count ? `${story.comments_count} comments` : 'discuss'
        }</a>
      </Show>
    </div>
  </>

export default customElement('story-item', {story: {}}, StoryItem);
