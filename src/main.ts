import "./app.css";
import App from "./App.svelte";

const isElectron = navigator.userAgent.toLowerCase().includes('teno-desktop') || navigator.userAgent.toLowerCase().includes('electron')
const type = isElectron? "electron" : "web"

console.log(`Svelte: Loading Teno in environment ${type}`)

const app = new App({
  target: document.getElementById("app"),
  props: {
    type,
    version: window?.TENO?.E?.version || "?.?.?"
  }
});

export default app;
