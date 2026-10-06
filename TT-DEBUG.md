# TanTitan2010 Command Center — final pass

- `tt-motion.js` uses delegated pointer feedback; no MutationObserver, scroll handler, parallax loop, or global transform ownership.
- Functional surfaces (desktop windows, games, canvases, boards, iframes, drag targets) are excluded.
- Titan Core boot uses compositor-friendly transforms and opacity only for continuous motion.
- Windows boot keeps OS/game logic unchanged; only the boot presentation and timing were rebuilt.
