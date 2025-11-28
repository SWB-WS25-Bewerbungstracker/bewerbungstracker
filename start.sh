#!/bin/bash

# Start two terminal windows:
#  - first:  sudo docker compose up --build  (in repo root)
#  - second: npm run dev                      (in frontend/)
#
# The script prefers xfce4-terminal, falls back to gnome-terminal, mate-terminal, konsole or xterm.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CMD1="cd \"$SCRIPT_DIR\" && sudo docker compose up --build"
CMD2="cd \"$SCRIPT_DIR/frontend\" && npm run dev"

# detect terminal
if command -v xfce4-terminal >/dev/null 2>&1; then
  xfce4-terminal --hold -x bash -lc "$CMD1" &
  sleep 0.4
  xfce4-terminal --hold -x bash -lc "$CMD2" &
  exit 0
fi

if command -v gnome-terminal >/dev/null 2>&1; then
  gnome-terminal -- bash -lc "$CMD1; exec bash" &
  sleep 0.4
  gnome-terminal -- bash -lc "$CMD2; exec bash" &
  exit 0
fi

if command -v mate-terminal >/dev/null 2>&1; then
  mate-terminal -- bash -lc "$CMD1; exec bash" &
  sleep 0.4
  mate-terminal -- bash -lc "$CMD2; exec bash" &
  exit 0
fi

if command -v konsole >/dev/null 2>&1; then
  konsole -e bash -lc "$CMD1; exec bash" &
  sleep 0.4
  konsole -e bash -lc "$CMD2; exec bash" &
  exit 0
fi

if command -v xterm >/dev/null 2>&1; then
  xterm -hold -e bash -lc "$CMD1" &
  sleep 0.4
  xterm -hold -e bash -lc "$CMD2" &
  exit 0
fi

echo "No supported terminal emulator found. Install xfce4-terminal or gnome-terminal (or another supported terminal)."
exit 1

Make the script executable: chmod +x /home/nutzer/bewerbungstracker/start.sh// filepath: /home/nutzer/bewerbungstracker/start.sh