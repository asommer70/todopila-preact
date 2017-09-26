import { h, Component } from 'preact';
import md from 'markdown-it';
import taskLists from 'markdown-it-task-lists';

const parser = md().use(taskLists, {enabled: true, label: true, labelAfter: true});

export default class Viewer extends Component {
  render() {
    console.log('Viewer this.props.content:', this.props.content);
    let rawHtml
    if (this.props.content) {
      rawHtml = parser.render(this.props.content);
    } else {
      rawHtml = <div></div>;
    }
    
    return(
      <div dangerouslySetInnerHTML={{__html: rawHtml}} />
    )
  }
}
