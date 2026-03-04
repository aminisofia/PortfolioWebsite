import PixelTrail from './main';

<div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    <PixelTrail
        gridSize={50}
        trailSize={0.05}
        maxAge={150}
        interpolate={2}
        color="#c7dcd0"
        gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        gooeyEnabled
        gooStrength={1}
    />
</div>
);
