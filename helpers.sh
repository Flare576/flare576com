
# Takes a MD file & field, returns un-quoted value
get_meta() {
  local md_file="$1"
  local field="$2"
  local awk_string=$(printf '/^---$/ { flag = !flag; next }
  flag && /^%s:/ {
    val = substr($0, index($0, $2));
    gsub(/^["'\'']|["'\'']$/, "", val);
    print val
  }
  ' "$field")
  awk "$awk_string" "$md_file"
}
