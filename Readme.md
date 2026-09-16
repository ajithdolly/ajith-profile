
### Quick reference

| What you want | Command |
|---|---|
| Edit/test locally | `npm run dev` |
| Build/check only | `npm run build` |
| Deploy | `git add . && git commit -m "Update" && git push` |

So **`npm run build` alone never deploys**. Deployment happens when you push to `main`.
Auto deployment with yaml