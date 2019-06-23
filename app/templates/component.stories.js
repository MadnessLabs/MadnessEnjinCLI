import { storiesOf } from "@storybook/html";

import readme from "./readme.md";
const stories = storiesOf("<%= title %>", module);
stories.addParameters({ jest: ["<%= name %>"] });
stories
  .add(
    "Default",
    () => `<<%= name %>></<%= name %>>`,
    {
      notes: {
        markdown: readme
      }
    }
  );
