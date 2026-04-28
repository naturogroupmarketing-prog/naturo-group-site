#!/usr/bin/env bash
#
# Create a timestamped tarball of the source tree on the Desktop.
# Excludes regenerable directories (node_modules, dist, .astro cache).
# Keeps only the most recent N snapshots so the Desktop doesn't fill up.
#
# Usage:
#   ./scripts/backup.sh
#   npm run backup
#
# Env overrides:
#   BACKUP_DIR  — where to write the tarball (default: ~/Desktop)
#   KEEP        — how many snapshots to retain (default: 10)

set -euo pipefail

# ---- Resolve project root, regardless of where the script is invoked from --
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
PROJECT_NAME="$(basename "${PROJECT_DIR}")"
PARENT_DIR="$(dirname "${PROJECT_DIR}")"

# ---- Where backups land + how many to keep --------------------------------
BACKUP_DIR="${BACKUP_DIR:-${HOME}/Desktop}"
KEEP="${KEEP:-10}"
mkdir -p "${BACKUP_DIR}"

STAMP="$(date +"%Y-%m-%d_%H%M")"
ARCHIVE_NAME="${PROJECT_NAME}_backup_${STAMP}.tar.gz"
ARCHIVE_PATH="${BACKUP_DIR}/${ARCHIVE_NAME}"

echo "Backing up:  ${PROJECT_DIR}"
echo "Writing to:  ${ARCHIVE_PATH}"

# ---- Build the tarball from the project's parent dir so paths are clean ---
tar -czf "${ARCHIVE_PATH}" \
  --exclude="${PROJECT_NAME}/node_modules" \
  --exclude="${PROJECT_NAME}/dist" \
  --exclude="${PROJECT_NAME}/.astro" \
  --exclude=".DS_Store" \
  -C "${PARENT_DIR}" "${PROJECT_NAME}"

SIZE="$(du -h "${ARCHIVE_PATH}" | cut -f1)"
COUNT="$(tar -tzf "${ARCHIVE_PATH}" | wc -l | tr -d ' ')"
echo "Done. ${SIZE}, ${COUNT} files."

# ---- Rotate: keep only the most recent KEEP snapshots ---------------------
# Match this project's snapshots specifically so we don't touch other backups.
EXISTING="$(ls -1t "${BACKUP_DIR}"/${PROJECT_NAME}_backup_*.tar.gz 2>/dev/null || true)"
if [ -n "${EXISTING}" ]; then
  TOTAL="$(echo "${EXISTING}" | wc -l | tr -d ' ')"
  if [ "${TOTAL}" -gt "${KEEP}" ]; then
    echo "Rotating: keeping newest ${KEEP}, removing $((TOTAL - KEEP)) older snapshot(s)."
    echo "${EXISTING}" | tail -n +"$((KEEP + 1))" | while read -r OLD; do
      echo "  rm ${OLD}"
      rm -f "${OLD}"
    done
  fi
fi

echo "Backup complete: ${ARCHIVE_PATH}"
