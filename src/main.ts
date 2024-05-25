import { App, Astal, Widget, Variable, Gtk, bind } from "astal"

const date = Variable("").poll(1000, 'date "+%H:%M:%S %b %e."')

function Bar(monitor: number) {
    return Widget.Window(
        {
            monitor,
            application: App,
            anchor: Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT,
            exclusivity: Astal.Exclusivity.EXCLUSIVE,
        },
        Widget.CenterBox({
            startWidget: Widget.Label({
                halign: Gtk.Align.START,
                label: "Welcome to Astal.js!",
            }),
            endWidget: Widget.Label({
                halign: Gtk.Align.END,
                label: bind(date),
            }),
        }),
    )
}

App.start({
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
    Bar(0)
})
