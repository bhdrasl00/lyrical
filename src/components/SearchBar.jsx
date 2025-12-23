import React from 'react';

const SearchBar = ({ onSearch }) => {
  const [artist, setArtist] = React.useState('');
  const [song, setSong] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (artist.trim() && song.trim()) {
      onSearch(artist, song);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ margin: 0, marginBottom: '1rem', background: 'linear-gradient(to right, #FF6B6B, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Şarkı Sözü Bulucu
        </h2>
        <input
          type="text"
          placeholder="Sanatçı Adı (Örn: Coldplay)"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Şarkı Adı (Örn: Yellow)"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: '0.5rem' }}>
          Sözleri Bul
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
