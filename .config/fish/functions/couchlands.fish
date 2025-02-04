function couchlands
  streamlink --hls-live-restart --stream-segment-threads 3 --twitch-disable-ads -o "$(date -Iseconds).ts" https://twitch.tv/lostlands best
end
