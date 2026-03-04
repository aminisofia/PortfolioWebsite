import React from 'react';
import ReactDOM from 'react-dom/client';
import Dither from './dither';

ReactDOM.createRoot(document.getElementById('background-root')).render(
    <React.StrictMode>
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Dither
                waveColor={[0.8, 0.4, 0.7]}
                disableAnimation={false}
                enableMouseInteraction
                mouseRadius={0.1}
                colorNum={2.5}
                waveAmplitude={0.2}
                waveFrequency={3}
                waveSpeed={0.02}
            />
        </div>
    </React.StrictMode>
);
