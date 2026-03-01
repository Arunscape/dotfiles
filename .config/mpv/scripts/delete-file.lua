local mp = require 'mp'

function delete_current_file()
    local path = mp.get_property("path")
    if not path then
        mp.osd_message("No file to delete")
        return
    end

    mp.msg.info("Attempting to delete: " .. path)
    
    -- Move to the next file in the playlist first to release the file handle
    mp.commandv("playlist-next")

    -- Small delay to ensure mpv has closed the file
    mp.add_timeout(0.1, function()
        local success, err = os.remove(path)
        if success then
            mp.osd_message("Deleted: " .. path)
        else
            mp.osd_message("Failed to delete: " .. (err or "unknown error"))
        end
    end)
end

mp.register_script_message("delete-current-file", delete_current_file)
