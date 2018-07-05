import { addComponent } from '../services/component/add';

module.exports = function(enjinDir) {
  const type = process.argv[3];
  const name = process.argv[4];

  console.log(`Creating ${name} ${type}...`);

  switch (type) {
    case 'component':
      addComponent(name);
      break;
    default:
      console.log(`Cannot create ${type}!`);
  }
};
