import React from 'react';
import ReactDOM from 'react-dom/client';
import Dither from './dither';

ReactDOM.createRoot(document.getElementById('background-root')).render(
    <React.StrictMode>
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Dither
                waveColor={[0.7,0.5,0.8]}
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
