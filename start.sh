#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CMD1="cd \"$SCRIPT_DIR\" && sudo docker compose up --build"
CMD2="cd \"$SCRIPT_DIR/frontend\" && npm run dev"

# -------------------------------
# Spinner while checking services
# -------------------------------
spinner() {
  local pid=$1
  local delay=0.1
  local spin='|/-\'
  while kill -0 $pid 2>/dev/null; do
     for i in $(seq 0 3); do
        printf "\rStarting environments... %c" "${spin:$i:1}"
        sleep $delay
     done
  done
  printf "\rStarting environments... done!      \n"
}

# -------------------------------
# Launch terminal windows
# -------------------------------
launch_terminal() {
  local term=$1
  local cmd=$2

  case "$term" in
    xfce4-terminal)
      xfce4-terminal --hold -x bash -lc "$cmd" 2>/dev/null &
      ;;
    gnome-terminal)
      gnome-terminal -- bash -lc "$cmd; exec bash" &
      ;;
    mate-terminal)
      mate-terminal -- bash -lc "$cmd; exec bash" &
      ;;
    konsole)
      konsole -e bash -lc "$cmd; exec bash" &
      ;;
    xterm)
      xterm -hold -e bash -lc "$cmd" &
      ;;
  esac
}

# Detect usable terminal
TERMINAL=""
for t in xfce4-terminal gnome-terminal mate-terminal konsole xterm; do
  if command -v "$t" >/dev/null 2>&1; then
    TERMINAL="$t"
    break
  fi
done

if [ -z "$TERMINAL" ]; then
  echo "No supported terminal emulator found."
  exit 1
fi

# -------------------------------
# Start terminals
# -------------------------------
launch_terminal "$TERMINAL" "$CMD1"
sleep 0.4
launch_terminal "$TERMINAL" "$CMD2"

# -------------------------------
# Start spinner while waiting
# -------------------------------
(
  # Wait until docker & npm dev are actually running
  until docker ps >/dev/null 2>&1; do sleep 1; done
  until lsof -i :5173 >/dev/null 2>&1; do sleep 1; done # typical Vite port
) &
spinner $!

exit 0

