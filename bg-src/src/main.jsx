import React from 'react';
import ReactDOM from 'react-dom/client';
import Dither from './dither';
import PixelTrail from './pixeltrail';

const backgroundRoot = document.getElementById('background-root');
if (backgroundRoot) {
    ReactDOM.createRoot(backgroundRoot).render(
        <React.StrictMode>
            <div style={{ position: 'fixed', inset: 0 }}>
                <Dither
                    waveColor={[1.0,1.0,1.0]}
                    disableAnimation={false}
                    enableMouseInteraction={false}
                    mouseRadius={0.3}
                    colorNum={2.5}
                    waveAmplitude={0.3}
                    waveFrequency={3}
                    waveSpeed={0.02}
                />
            </div>
        </React.StrictMode>
    );
}
//
// const trailRoot = document.getElementById('trail-root') ?? document.body;
// ReactDOM.createRoot(trailRoot).render(
//     <React.StrictMode>
//         <PixelTrail
//             gridSize={500}
//             trailSize={0.02}
//             maxAge={200}
//             interpolate={1.2}
//             color="#ffccd9"
//             gooeyFilter={{ id: "custom-goo-filter", strength: 0 }}
//             gooeyEnabled={false}
//             gooStrength={0}
//         />
//     </React.StrictMode>
// );
