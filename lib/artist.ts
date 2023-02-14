import { request } from './request.js';

import type {
  ArtistGetInfoResponse,
  ArtistGetSimilarResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistSimilarType,
  ArtistTrackType,
  ArtistType,
  ArtistTagType,
} from './types';

class Artist {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information on an artist.
   * @param artistName - The name of the artist.
   * */
  async fetch(artistName: string): Promise<ArtistType> {
    const { artist } = await request<ArtistGetInfoResponse>({
      method: 'artist.getinfo',
      artist: artistName,
      api_key: this.token,
      limit: 1,
    });

    return {
      name: artist.name,
      url: artist.url,
      bio: artist.bio.summary,
      scrobbles: Number(artist.stats.playcount),
      listeners: Number(artist.stats.listeners),
    };
  }

  /**
   * Fetches and returns similar artists to this artist.
   * @param artistName - The name of the artist.
   * */
  async fetchSimilar(artistName: string): Promise<ArtistSimilarType[]> {
    const {
      similarartists: { artist },
    } = await request<ArtistGetSimilarResponse>({
      method: 'artist.getSimilar',
      artist: artistName,
      api_key: this.token,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        match: Number(artist.match),
        url: artist.url,
        image: artist.image.find((i) => i.size === 'large')?.['#text'],
      };
    });
  }

  /**
   * Fetches and returns popular tags for an artist.
   * @param artistName - The name of the artist.
   * */
  async fetchTags(artistName: string): Promise<ArtistTagType[]> {
    const {
      toptags: { tag },
    } = await request<ArtistGetTopTagsResponse>({
      method: 'artist.getTopTags',
      artist: artistName,
      api_key: this.token,
    });

    return tag.map((tag) => {
      return {
        name: tag.name,
        url: tag.url,
        timesRanked: tag.count,
      };
    });
  }

  /**
   * Fetches and returns popular tracks for an artist.
   * @param artistName - The name of the artist.
   * */
  async fetchTracks(artistName: string): Promise<ArtistTrackType[]> {
    const {
      toptracks: { track },
    } = await request<ArtistGetTopTracksResponse>({
      method: 'artist.getTopTracks',
      artist: artistName,
      api_key: this.token,
    });

    return track.map((track) => {
      return {
        rank: track['@attr'].rank,
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        scrobbles: Number(track.playcount),
        listeners: Number(track.listeners),
      };
    });
  }
}

export default Artist;
