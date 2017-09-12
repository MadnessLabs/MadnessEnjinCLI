import { Component, Prop } from '@stencil/core';


@Component({
  tag: '<%= name %>',
  styleUrl: '<%= name %>.scss'
})
export class <%= className %> {
  <% _.each(props, function(prop) { %>
  @Prop() <%= prop %>;<% }); %>

  render() {
    return (
      <div>
        Your new <%= name %> component
      </div>
    );
  }
}