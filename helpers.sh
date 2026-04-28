
# Takes a MD file & field, returns un-quoted value from YAML front matter only
get_meta() {
  local md_file="$1"
  local field="$2"
  local awk_string=$(printf '/^---$/ { delims++; if (delims == 2) exit; next }
  delims == 1 && /^%s:/ {
    val = substr($0, index($0, $2));
    gsub(/^["'\'']|["'\'']$/, "", val);
    print val
  }
  ' "$field")
  awk "$awk_string" "$md_file"
}
