import * as addComponent from '../services/component/add';


export default function (enjinDir) {
    var name = process.argv[3];
    console.log(`Creating ${name} component...`);
    addComponent(name);
};