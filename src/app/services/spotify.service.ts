import { Injectable } from '@angular/core';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor() {}
}

export const getSpotifyAccessToken = async () => {
  const encodedToken = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });
  const data = await res.json();
  return data.access_token;
};

export const searchSongByTrackAndArtist = async (
  accessToken: string,
  songTitle: string,
  artistName: string
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=track:${songTitle}+artist=${artistName}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const data = await res.json();
  if (data.tracks.items?.length === 0) {
    alert('No song found!');
    return;
  }
  return data.tracks.items?.[0];
};

export const getRecommendedSongsFromTracks = async (
  accessToken: string,
  songId: string
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${songId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const data = await res.json();
  return data.tracks;
};
