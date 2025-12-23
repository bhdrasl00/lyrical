import React from 'react';

const LyricsDisplay = ({ lyrics, title, artist, loading, error, albumArt }) => {
    if (loading) {
        return (
            <div className="glass-card animate-fade-up" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <p>Aranıyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card animate-fade-up" style={{ marginTop: '2rem', textAlign: 'center', borderColor: '#ff6b6b' }}>
                <p style={{ color: '#ff6b6b' }}>{error}</p>
            </div>
        );
    }

    if (!lyrics) return null;

    return (
        <div className="glass-card animate-fade-up" style={{ marginTop: '2rem', textAlign: 'left', whiteSpace: 'pre-wrap', lineHeight: '1.8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {albumArt && (
                <img
                    src={albumArt}
                    alt={`${artist} album art`}
                    className="album-art"
                />
            )}
            <h3 style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                {artist} - {title}
            </h3>
            <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px', width: '100%' }}>
                {lyrics}
            </div>
        </div>
    );
};

export default LyricsDisplay;
