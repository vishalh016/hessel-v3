# Development Environment Rules

## Local Development Port

The primary local development environment runs on:

```text
http://localhost:3086
```

The agent must:
- assume port 3086 as default
- preserve port consistency
- avoid randomly changing development ports
- avoid introducing conflicting port configurations

---

# Local Testing Rules

Before considering implementation complete, the agent should:

1. ensure the application can run locally
2. verify compatibility with localhost:3086
3. preserve existing development configuration
4. avoid unnecessary environment changes

---

# Environment Stability

Do NOT:
- change ports without explicit instruction
- introduce random dev server configurations
- overwrite existing environment setup
- create conflicting localhost ports

---

# Preferred Development Workflow

Development flow:

Code Change
↓
Run Local Environment
↓
Test on localhost:3086
↓
Validate responsiveness
↓
Validate interactions
↓
Finalize implementation

---

# Validation Requirements

The agent should verify:

- no runtime errors
- no broken imports
- no hydration issues
- animations render correctly
- responsive behavior preserved
- navigation functions properly
- cinematic interactions remain smooth

---

# Port Consistency Rule

Always prioritize:

```text
localhost:3086
```

unless explicitly overridden by the user.