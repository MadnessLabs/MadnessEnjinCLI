import { Component<% if (props && props.length) { %>, Prop<% } %>, h } from '@stencil/core';


@Component({
  tag: '<%= name %>',
  styleUrl: '<%= name %>.css'
})
export class <%= className %> {
  <% _.each(props, function(prop) { %>
  @Prop() <%= prop %>;<% }); %>

  render() {
    return (
      <div>
        <%= content %>
      </div>
    );
  }
}