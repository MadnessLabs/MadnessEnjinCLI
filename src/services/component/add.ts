import { argv } from 'yargs';

import { getStencilConfig } from '../getStencilConfig';
import { editStencilConfig } from '../editStencilConfig';
import { camelize } from '../camelize';
import { capFirstLetter } from '../capFirstLetter';
import { renderComponent } from './render';

/**
 * Adds a new component to the current project
 * @param name The name of the new component
 */
export async function addComponent(name: string) {
  getStencilConfig((stencilConfig, stencilPath) => {
    const namespace = argv.namespace
      ? argv.namespace
      : argv.n
        ? argv.n
        : stencilConfig.namespace;
    let props = argv.props ? argv.props : argv.p ? argv.p : null;
    let componentName: string;

    if (namespace && namespace !== true) {
      componentName = namespace + '-' + name;
    }

    if (name.indexOf('-') <= 0) {
      console.log('Name must contain a "-" to be a valid custom element!');
      return false;
    }

    componentName = name.toLowerCase();

    if (props) {
      if (props.indexOf(',') > 0) {
        props = props.split(',');
      } else {
        props = [props];
      }
    }

    const data = {
      name,
      className: capFirstLetter(
        camelize(name.replace(new RegExp('-', 'g'), ' '))
      ),
      props,
      content: `Your new ${name} component`
    };

    renderComponent(data, stencilConfig, () => {
      if (stencilConfig.bundles) {
        stencilConfig.bundles[0].components.push(name);
      }
      editStencilConfig(stencilPath, stencilConfig, () => {
        console.log(`${name} component has been created successfully! ^_^`);
      });
    });

    return true;
  });
}
