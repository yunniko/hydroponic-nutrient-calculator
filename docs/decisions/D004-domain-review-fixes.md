# D004 · Domain review fixed two critical and five high-severity issues
Date: 2026-09-11 · Goal: G-001 · Status: active
Context: Mandatory domain gate.
Decision: Critical: baseline correction could overshoot when applied to a chart already expressed as total EC (explicit caveats added); meter-brand-to-scale claims (Hanna=640, Bluelab=700) were factually wrong per datasheets (rewritten to datasheet-confirmed facts plus a warning that labels are inconsistent). High: lettuce pH 5.6–6.5 with disclosed disagreement; tomato EC widened 2.0–3.5; unsourced "feeder type" column removed; a FAQ pointing at a non-existent doc fixed.
Rejected: shipping the original claims.
Consequence: 22 unit + 9 e2e green after fixes; lower-severity items remain in `docs/domain-reference.md`.
Evidence: `docs/domain-reference.md`.
