import { request } from './request.js';

import type { GeoGetTopArtistsResponse, GeoGetTopTracksResponse, GeoArtistType, GeoTrackType } from './types';

class Geo {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns the most popular artists by country.
   *
   * Ordered by relevance.
   * @param country - The name of the country.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopArtists(country: string, limit = 50, page = 1): Promise<GeoArtistType[]> {
    const {
      topartists: { artist },
    } = await request<GeoGetTopArtistsResponse>({
      method: 'geo.getTopArtists',
      country,
      api_key: this.token,
      limit,
      page,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        listeners: Number(artist.listeners),
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns the most popular tracks by country.
   *
   * Ordered by relevance.
   * @param country - The name of the country.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(country: string, limit = 50, page = 1): Promise<GeoTrackType[]> {
    const {
      tracks: { track },
    } = await request<GeoGetTopTracksResponse>({
      method: 'geo.getTopTracks',
      country,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        duration: Number(track.duration) || null,
        listeners: Number(track.listeners),
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Geo;
