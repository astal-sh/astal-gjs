import "./Bar.css"
import { App, Astal, Gtk, bind } from "astal"
import { date } from "../lib"

function LeftBar() {
    return <box className={"left"} halign={Gtk.Align.START}>
        Welcome to Astal.js!
    </box>
}

function CenterBar() {
    return <box className={"center"}>
        <label label={bind(date)} />
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
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}>
        <centerbox>
            <LeftBar />
            <CenterBar />
            <RightBar />
        </centerbox>
    </window>
}
