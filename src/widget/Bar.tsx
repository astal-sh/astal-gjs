import { App, Astal, Variable, Gtk, bind } from "astal"

const date = Variable("").poll(1000, 'date "+%H:%M:%S %b %e."')

function LeftBar() {
    return <box className={"left"} halign={Gtk.Align.START}>
        Welcome to Astal.js!
    </box>
}

function CenterBar() {
    return <box className={"center"}>
        <label>{bind(date)}</label>
    </box>
}

function RightBar() {
    function onClicked() {
        print("Hello!")
    }

    return <box className={"right"} halign={Gtk.Align.END}>
        <button onClicked={onClicked}>Click Me!</button>
    </box>
}

export default function Bar({ monitor }: { monitor: number }) {
    return <window
        className={"bar"}
        name={`bar${monitor}`}
        monitor={monitor}
        application={App}
        anchor={Astal.WindowAnchor.TOP |
            Astal.WindowAnchor.LEFT |
            Astal.WindowAnchor.RIGHT}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}>
        <centerbox>
            <LeftBar />
            <CenterBar />
            <RightBar />
        </centerbox>
    </window>
}
