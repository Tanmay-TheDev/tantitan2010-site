# Motion safety rules

The motion layer is intentionally non-invasive to functional app surfaces.

- Do not apply global `transform` transitions to draggable windows, boards, pieces, canvases, or desktop surfaces.
- Do not inject `scroll-snap`, `overscroll-behavior`, or `scroll-behavior` into arbitrary app containers.
- Touch feedback is opt-in at runtime through `.tt-motion-target` and is skipped inside functional surfaces.
- Reveal animations are restricted to non-functional cards/tiles.
- The OS simulators and game engines retain their own pointer/drag/transform logic.

The existing Java runtime changes in `index.html` and `tantitan2010-lite.html` remain separate from the motion layer.
