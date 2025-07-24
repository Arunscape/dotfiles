podman run --name forgejo \
-p 3000:3000 \
-p 2222:2222 \
-v /run/media/arunscape/znas/server/forgejo/data:/var/lib/gitea \
-v /run/media/arunscape/znas/server/forgejo/conf:/etc/gitea \
--userns=keep-id \
--restart=always \
--cgroup-manager=cgroupfs --replace \
codeberg.org/forgejo/forgejo:10-rootless
