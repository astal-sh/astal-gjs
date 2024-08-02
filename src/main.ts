#!/usr/bin/gjs -m
import { App } from "astal"
import Bar from "./widget/Bar"

App.start({
    requestHandler(request, res) {
        switch (request) {
            case "i":
            case "inspect": App.inspector(); return res("ok");
            case "q":
            case "quit": App.quit(); return res("ok");
            default: return App.eval(request)
                .then(res)
                .catch(res);
        }
    },
    client(message, arg = "") {
        print(message(arg))
    },
    main() {
        Bar({ monitor: 0 })
    },
})
