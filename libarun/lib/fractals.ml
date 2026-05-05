open Base

let draw_sierpinski_triangle ?(width=64) ?(horizontal_scale=2) () =
  let rec loop y =
    if y < width then begin
      (* Indent moves left by half the scale each row to center the pyramid *)
      let indent = (width - y) * (horizontal_scale / 2) in
      let triangle_columns = (y + 1) * horizontal_scale in
      
      String.init (indent + triangle_columns) ~f:(fun i ->
        let is_in_indent = i < indent in
        let rel_i        = i - indent in
        
        let x            = rel_i / horizontal_scale in
        let is_even_beat = rel_i % horizontal_scale = 0 in
        let is_fractal   = (x land (y - x)) = 0 in

        if (not is_in_indent) && is_even_beat && is_fractal then '*' else ' '
      )
      |> Stdio.print_endline;
      
      loop (y + 1)
    end
  in
  loop 0
