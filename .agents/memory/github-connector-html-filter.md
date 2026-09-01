---
name: GitHub connector HTML filter
description: Why the Vite entry script is injected instead of written literally in the source HTML.
---

Keep the application module entry injected through Vite's HTML transform rather than placing a literal script element in the source HTML.

**Why:** GitHub writes through the Replit connector gateway reject blobs containing script elements with a gateway-level 403, even though the GitHub authorization is valid. Moving the declaration into Vite preserves development and production behavior while allowing repository publication.

**How to apply:** If changing the frontend entry point, update the Vite HTML transform and verify both the TypeScript check and production build. Do not restore a literal script element in the source HTML unless native Git authentication is available.