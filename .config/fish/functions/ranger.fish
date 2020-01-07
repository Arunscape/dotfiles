function ranger
    set tmpfile "/tmp/pwd-from-ranger"
    /bin/ranger --choosedir=$tmpfile $argv
    set rangerpwd (cat $tmpfile)
    if test "$PWD" != $rangerpwd
        cd $rangerpwd
    end
end
