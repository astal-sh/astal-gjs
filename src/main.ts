import "./style/style.css"
import { App } from "astal"
import Bar from "./widget/Bar"
import { src } from "./lib"

App.start({
    css: `${src}/main.css`,
    requestHandler(request, res) {
        switch (request) {
            case "i":
            case "inspect": App.inspector(); return res("ok");
            case "q":
            case "quit": App.quit(); return res("ok");
            default: return App.eval(request)
                .then(out => res(String(out)))
                .catch(err => res(String(err)));
        }
    },
}, function() {
    Bar({ monitor: 0 })
})
