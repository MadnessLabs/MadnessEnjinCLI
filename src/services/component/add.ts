import { argv } from 'yargs';

import * as getStencilConfig from '../getStencilConfig';
import * as editStencilConfig from '../editStencilConfig';
import * as camelize from '../camelize';
import * as capFirstLetter from '../capFirstLetter';
import * as renderComponent from './render';

export default function (name) {
  getStencilConfig((stencilConfig, stencilPath) => {
    var namespace = argv.namespace ? argv.namespace : argv.n ? argv.n : stencilConfig.namespace;
    var props = argv.props ? argv.props : argv.p ? argv.p : null;


    if (namespace && namespace !== true) {
      name = namespace + '-' + name;
    }

    if (name.indexOf('-') <= 0) {
      console.log('Name must contain a "-" to be a valid custom element!');
      return false;
    }

    name = name.toLowerCase();

    if (props) {
      if (props.indexOf(',') > 0) {
        props = props.split(',');
      } else {
        props = [props];
      }
    }

    var data = {
      name,
      className: capFirstLetter(camelize(name.replace(new RegExp('-', 'g'), ' '))),
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
  });
};