import { useState } from 'react'
import axios from 'axios'
import './App.css'
import SearchBar from './components/SearchBar'
import LyricsDisplay from './components/LyricsDisplay'

function App() {
  const [lyrics, setLyrics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentSong, setCurrentSong] = useState({ artist: '', title: '' })
  const [albumArt, setAlbumArt] = useState(null)

  const fetchLyrics = async (artist, title) => {
    setLoading(true)
    setError(null)
    setLyrics(null)
    setAlbumArt(null)
    setCurrentSong({ artist, title })

    try {
      const lyricsResponse = await axios.get(`https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}`)

      if (lyricsResponse.data.plainLyrics) {
        setLyrics(lyricsResponse.data.plainLyrics)
      } else {
        setError('Şarkı sözleri bulunamadı.')
      }

      // Metadata (Album Art) Fetching
      const iTunesResponse = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + title)}&media=music&limit=1`)
      if (iTunesResponse.data.results && iTunesResponse.data.results.length > 0) {
        // High res image (replace 100x100 with 600x600)
        const artUrl = iTunesResponse.data.results[0].artworkUrl100.replace('100x100bb', '500x500bb')
        setAlbumArt(artUrl)
      }

    } catch (err) {
      console.error(err)
      setError('Şarkı sözleri bulunamadı veya bir hata oluştu. Lütfen sanatçı ve şarkı adını kontrol edin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <SearchBar onSearch={fetchLyrics} />
      <LyricsDisplay
        lyrics={lyrics}
        loading={loading}
        error={error}
        artist={currentSong.artist}
        title={currentSong.title}
        albumArt={albumArt}
      />
    </div>
  )
}

export default App
