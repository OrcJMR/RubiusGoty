import App from "../main";

const documentReadyInterval = setInterval(() => {
    if (document.readyState === "complete") {
        App.EntryPoint();
        clearInterval(documentReadyInterval);
        window.onresize = () => {
            if (App.Canvas) {
                // App.Canvas.width = window.innerWidth;
                // App.Canvas.height = window.innerHeight;
            }
        };
    }
}, 50);
