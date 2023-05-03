// // component.ts
// import { Component } from '@angular/core';
// import {
//   searchSongByTrackAndArtist,
//   getSpotifyAccessToken,
//   getRecommendedSongsFromTracks,
// } from 'src/app/services/spotify.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   artist: string = '';
//   song: string = '';

//   fetchRecommendedTracksBySongAndArtist() {
//     const artistInput = document.getElementById(
//       'artist-input'
//     ) as HTMLInputElement;
//     const songInput = document.getElementById('song-input') as HTMLInputElement;
//     getSpotifyAccessToken().then((accessToken) => {
//       searchSongByTrackAndArtist(accessToken, this.song, this.artist).then(
//         (song) => {
//           if (artistInput!.value === '' || songInput!.value === '') {
//             alert(
//               `Please enter a song and artist ; Search song: Toxic ; Artist: Britney Spears`
//             );
//             return;
//           } else {
//             getRecommendedSongsFromTracks(accessToken, song.id).then(
//               (recommendedSongs) => {
//                 console.log(recommendedSongs);
//                 const recommendedSongsByTrackAndArtistDiv =
//                   document.getElementById(
//                     'recommended-songs-by-track-and-artist'
//                   );
//                 recommendedSongsByTrackAndArtistDiv!.innerHTML = '';

//                 for (let i = 0; i < 3; i++) {
//                   const songLink = document.createElement('a');
//                   const songElement = document.createElement('p');
//                   songLink.href = recommendedSongs[i].external_urls.spotify;
//                   songLink.target = '_blank';
//                   songElement.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${recommendedSongs[i].id}?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
//                   recommendedSongsByTrackAndArtistDiv!.appendChild(songLink);
//                   songLink!.appendChild(songElement);
//                 }
//               }
//             );
//           }
//         }
//       );
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  searchSongByTrackAndArtist,
  getSpotifyAccessToken,
  getRecommendedSongsFromTracks,
} from 'src/app/services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  artist: string = '';
  song: string = '';
  recommendedSongs: any[] = [];

  fetchRecommendedTracksBySongAndArtist() {
    const artistInput = document.getElementById(
      'artist-input'
    ) as HTMLInputElement;
    const songInput = document.getElementById('song-input') as HTMLInputElement;
    getSpotifyAccessToken().then((accessToken) => {
      searchSongByTrackAndArtist(accessToken, this.song, this.artist).then(
        (song) => {
          if (artistInput!.value === '' || songInput!.value === '') {
            alert(
              `Please enter a song and artist ; Search song: Toxic ; Artist: Britney Spears`
            );
            songInput.value = '';
            artistInput.value = '';
            return;
          } else {
            getRecommendedSongsFromTracks(accessToken, song.id).then(
              (recommendedSongs) => {
                this.recommendedSongs = recommendedSongs.slice(0, 5);
              }
            );
            songInput.value = '';
            artistInput.value = '';
          }
        }
      );
    });
  }

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
