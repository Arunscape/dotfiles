function couchlands
  streamlink --hls-live-restart --stream-segment-threads 3 --twitch-disable-ads --retry-streams 30 --retry-max 0 --twitch-supported-codecs='h264,h265,av1' -o "$(date -Iseconds).ts" https://twitch.tv/lostlands best
end
