import Js from './test';
const child = document.createElement('div');
const node = document.createTextNode('test');
child.setAttribute('id', 'test');
child.appendChild(node);
document.body.appendChild(child);
child.innerHTML = Js()
