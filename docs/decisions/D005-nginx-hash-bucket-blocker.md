# D005 · Deploy blocked by the host's nginx `server_names_hash_bucket_size`
Date: 2026-09-11 · Goal: G-001 · Status: active (blocking)
Context: `deploy-service.ps1` built and started the container (port 30190) but `julai-new-vhost` failed at `nginx -t`: "could not build server_names_hash, increase server_names_hash_bucket_size: 64". Root-owned `/etc/nginx/nginx.conf`. Nginx never reloaded, so no other site was affected (curl-confirmed).
Decision: Logged `PENDING APPROVAL` in `svc-lab/GOALS.md` with the exact fix for the Owner. Portfolio-wide blocker for every future vhost.
Rejected: any root-level workaround.
Consequence: After the fix: remove the partial vhost, re-run deploy-service, verify HTTPS, update hub + sitemap, SEO review, close out the svc-lab backlog row.
Evidence: `svc-lab/GOALS.md` progress log 2026-09-11.
