import { App } from './App/App';
import './global.css';


const container = document.querySelector('body');
if (container) {
    const app = new App(container);
    app.start();
    app.renderLogin();
    
}
