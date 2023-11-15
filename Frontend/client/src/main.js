import './app.css'
// @ts-ignore
import App from './App.svelte'
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = new App({
  target: document.getElementById('app'),
})

export default app
