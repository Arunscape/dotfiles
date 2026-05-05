open! Core

let weather =
  Command.basic
    ~summary:"fetch current weather from wttr.in"
    (let%map_open.Command () = return () in
     fun () ->
       let prog = "curl" in
       let argv = ["curl"; "-s"; "https://wttr.in"] in
       let pid = Core_unix.fork_exec ~prog ~argv () in
       ignore (Core_unix.waitpid pid : Core_unix.Exit_or_signal.t)
    )

let command =
  Command.group
    ~summary:"A utility tool"
    [ "weather", weather ]

let () = Command_unix.run command
