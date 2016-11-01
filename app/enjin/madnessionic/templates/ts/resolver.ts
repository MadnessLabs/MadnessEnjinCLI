class <%= name %>Resolver {
    constructor() {
        return {
            <% _.each(resolves, function(resolve, key) { %><%= resolve %>: this.<%= resolve %><%= key === resolves.length - 1 ? '' : ',\n\t\t\t' %><% }); %>
        };
    }<% _.each(resolves, function(resolve) { %>
    
    <%= resolve %>() {
        return {};
    }<% }); %>
}