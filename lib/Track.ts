import { request } from './request.js';

import type {
  TrackGetInfoResponse,
  TrackGetSimilarResponse,
  TrackGetTopTagsResponse,
  TrackSearchResponse,
  TrackGetInfoType,
  TrackSearchType,
  TrackSimilarType,
  TrackTopTagsType,
} from './types';

class Track {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information for a track.
   * @param artistName - The name of the artist.
   * @param trackName - The name of the track.
   * @param userName - The username for the context of the request.
   * If supplied, the user's playcount for this track and whether they have loved the track is included in the response.
   */
  async fetch(artistName: string, trackName: string, userName?: string): Promise<TrackGetInfoType> {
    const {
      track,
      track: {
        album,
        toptags: { tag },
      },
    } = await request<TrackGetInfoResponse>({
      method: 'track.getInfo',
      artist: artistName,
      track: trackName,
      username: userName,
      api_key: this.token,
    });

    const tags = tag.map((tag) => {
      return {
        name: tag.name,
        url: tag.url,
      };
    });

    const response = {
      name: track.name,
      duration: Number(track.duration) || null,
      stats: {
        scrobbles: Number(track.playcount),
        listeners: Number(track.listeners),
      },
      artist: {
        name: track.artist.name,
        url: track.artist.url,
      },
      album: {
        position: Number(album['@attr'].position),
        name: album.title,
        url: album.url,
      },
      tags,
      url: track.url,
      image: track.album.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
    } as TrackGetInfoType;

    if (userName) {
      response.stats.userPlayCount = Number(track.userplaycount);
      response.stats.userLoved = Boolean(Number(track.userloved)).valueOf();
    }

    return response;
  }

  /**
   * Fetches and returns similar tracks for this track.
   * @param artistName - The name of the artist.
   * @param trackName - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   */
  async fetchSimilar(artistName: string, trackName: string, limit = 30): Promise<TrackSimilarType[]> {
    const {
      similartracks: { track },
    } = await request<TrackGetSimilarResponse>({
      method: 'track.getSimilar',
      artist: artistName,
      track: trackName,
      api_key: this.token,
      limit,
    });

    return track.map((track) => {
      return {
        name: track.name,
        match: Number(track.match),
        duration: Number(track.duration) || null,
        scrobbles: Number(track.playcount),
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns popular tags for a track.
   * @param artistName - The name of the artist.
   * @param trackName - The name of the track.
   */
  async fetchTopTags(artistName: string, trackName: string): Promise<TrackTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await request<TrackGetTopTagsResponse>({
      method: 'track.getTopTags',
      artist: artistName,
      track: trackName,
      api_key: this.token,
    });

    const tags = tag.map((tag) => {
      return {
        count: Number(tag.count),
        name: tag.name,
        url: tag.url,
      };
    });

    return {
      name: attr.track,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${encodeURIComponent(attr.artist)}`,
      },
      tags,
    } as TrackTopTagsType;
  }

  /**
   * Search for a track by name.
   * @param trackName - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(trackName: string, limit = 30, page = 1): Promise<TrackSearchType[]> {
    const {
      results: {
        trackmatches: { track },
      },
    } = await request<TrackSearchResponse>({
      method: 'track.search',
      track: trackName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        name: track.name,
        artist: {
          name: track.artist,
          url: `https://www.last.fm/music/${encodeURIComponent(track.artist)}`,
        },
        listeners: Number(track.listeners),
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Track;
