function compress_video
  # Check if an input file is provided
  if test -z "$argv[1]"
    echo "Usage: compress_video <video_file>"
    return 1
  end

  set input_file $argv[1]

  # Check if the input file exists
  if not test -f "$input_file"
    echo "Error: Input file '$input_file' does not exist."
    return 1
  end

  # Get the base filename and create output filename
  set base_filename (basename "$input_file" (file extension "$input_file"))
  set output_file "$base_filename"_compressed.mp4

  # Compress the video using ffmpeg with x265 codec, aac audio, and max file size of 10MB
  echo "Compressing '$input_file' to '$output_file' with x265, aac, and max size 10MB..."
  ffmpeg -i "$input_file" -vcodec libx265 -preset veryslow -crf 28 -acodec aac -fs 10M "$output_file"

  # Check if ffmpeg command was successful
  if test $status -eq 0
    echo "Successfully compressed video saved to '$output_file'"
  else
    echo "Error: Video compression failed. Please check ffmpeg is installed and available in your PATH."
    return 1
  end
end
