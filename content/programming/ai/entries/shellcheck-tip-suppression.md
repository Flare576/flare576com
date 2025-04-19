---
title: "Shellcheck Tip: Suppression"
date: Fri Apr 18 11:35:10 CDT 2025
published: true
tags: ["programming","ai","shell","bash","lint"]
---

# Cleanliness is Next to 🐐

When programming, maintaining the same style across your code base is almost as important as getting the syntax right... But it's easy to forget that in shell scripting.

```bash
echo 'Just "Friggen ' $SHELL " WORK"'"' # Plz
```

But, that doesn't mean you can't tidy up once you're done - I recommend [Shellcheck](https://www.shellcheck.net/) - but sometimes it's nice to have more help. For example, I wrote a little chaos nugget a few weeks ago, and, well... it wasn't _quite right_. OH CHATGPT, PLEASE COME CLEAN UP MY MESS

# AI to the Rescue

````flare
This bash script explodes whenever aws secret manager returns an error instead of a payload. Can you split it up so that does the aws step, checks for failure, then continues?

```bash
  export $(aws secretsmanager get-secret-value --secret-id my-secret-name | jq -r '.SecretString' | jq -r 'to_entries|map("\(.key)=\(.value)")|.[]')
```
````

````assistant
✅ Improved Bash Script

## Step 1: Attempt to retrieve the secret
```bash
secret_output=$(aws secretsmanager get-secret-value --secret-id my-secret-name 2>/dev/null)
```

## Step 2: Check for failure
```bash
if [ $? -ne 0 ] || [ -z "$secret_output" ]; then
  echo "Failed to retrieve secret from AWS Secrets Manager"
  exit 1
fi
```

## Step 3: Parse and export the secrets
```bash
export $(echo "$secret_output" | jq -r '.SecretString' | jq -r 'to_entries|map("\(.key)=\(.value)")|.[]') 
```
````

Sweet, that `2>/dev/null` in there is the sauce that makes it *silently* error instead of *LOUDLY* error, and the check means I'm not flooding my environment with nonsense... But what does `shellcheck` think?

```bash
☕ ▶ projects/myScripts ▶ ⎇ feature-branch± ▶ shellcheck runner.sh

In runner.sh line 79:
  if [ $? -ne 0 ] || [ -z "$secret_output" ]; then
       ^-- SC2181 (style): Check exit code directly with e.g. 'if ! mycmd;', not indirectly with $?.
```

# BUT IT'S WRONG

Usually not, but sometimes a developer knows why they are _more right_ than the linter. But... what if I'm not _more right_?

````flare
I never know how to feel about this shell-check warning, but what do you think?

```bash
^-- SC2181 (style): Check exit code directly with e.g. 'if ! mycmd;', not indirectly with $?.
```
````

````assistant
Great question! That `shellcheck` warning—**SC2181**—is actually a stylistic suggestion aimed at improving clarity and robustness. Here’s the TL;DR and a bit of nuance:

---

### 🔍 What SC2181 Says
Instead of doing this:

```bash
mycmd
if [ $? -ne 0 ]; then
  echo "fail"
fi
```

Prefer this:

```bash
if ! mycmd; then
  echo "fail"
fi
```

---

### ✅ Why the Warning Exists

1. **Clarity**: It's easier to read a command and its failure handling in one place.
2. **Atomicity**: `$?` refers to the *last* command’s exit code. If anything slips in between (e.g., debug echo or pipe), you could end up checking the wrong command's result.
3. **Less prone to bugs**: Especially in longer scripts where intermediate commands/logging might sneak in.

---

### 🤔 When It's Okay to Ignore
There *are* cases where you might want to check `$?` explicitly:

- You're capturing the output and need to separate it from the check:
  ```bash
  result=$(mycmd)
  if [ $? -ne 0 ]; then
    echo "mycmd failed"
  fi
  ```

- You're checking multiple command statuses:
  ```bash
  cmd1
  status1=$?
  cmd2
  status2=$?
  ```

In those situations, `shellcheck` is being cautious, not prescriptive.

---

### 🧠 Your Script Context

In the original fix I gave you:

```bash
secret_output=$(aws secretsmanager get-secret-value ...)
if [ $? -ne 0 ] || [ -z "$secret_output" ]; then
  ...
```

You could rewrite it this way, avoiding `$?`:

```bash
if ! secret_output=$(aws secretsmanager get-secret-value --secret-id wifi-portal-test-user-bad 2>/dev/null) || [ -z "$secret_output" ]; then
  echo "Failed to retrieve secret from AWS Secrets Manager"
  exit 1
fi
```

This keeps everything atomic and satisfies `shellcheck`.

---

### ✨ Conclusion
If you’re writing fresh code and can avoid `$?`, go with the direct `if ! cmd;` form. But if you're in a context that needs it, don't feel bad about suppressing the warning (e.g., `# shellcheck disable=SC2181`).
````

Wait, wait, wait, what was that last part?

> suppressing the warning (e.g., `# shellcheck disable=SC2181`).

YOU CAN DO THAT?!

```bash
  # Step 2: Check for failure
  # shellcheck disable=SC2181 # Putting the command in the 'if' is awful in this case
  if [ $? -ne 0 ] || [ -z "$secret_output" ]; then
    echo "Failed to retrieve secret from AWS Secrets Manager"
    exit 1
  fi

  # Step 3: Parse and export the secrets
  # shellcheck disable=SC2046 # We want word splitting here
  export $(echo "$secret_output" | jq -r '.SecretString' | jq -r 'to_entries|map("\(.key)=\(.value)")|.[]') 
```

Yup. Learned a thing.

