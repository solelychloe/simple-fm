import { request } from '../request.js';

import type {
  TrackGetInfoResponse,
  TrackGetSimilarResponse,
  TrackGetTopTagsResponse,
  TrackSearchResponse,
  TrackGetInfoType,
  TrackSearchType,
  TrackSimilarType,
  TrackTopTagsType,
} from '../types';

export default class Track {
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
    } = await request<TrackGetInfoResponse>('track.getInfo', {
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

    const image = track.album?.image.map((i) => {
      return {
        size: i.size,
        url: i['#text'],
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
        position: Number(album?.['@attr']?.position) || null,
        name: album?.title || null,
        url: album?.url || null,
      },
      tags,
      url: track.url,
      image,
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
    } = await request<TrackGetSimilarResponse>('track.getSimilar', {
      artist: artistName,
      track: trackName,
      api_key: this.token,
      limit,
    });

    return track.map((track) => {
      const image = track.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        match: Number(track.match),
        name: track.name,
        duration: Number(track.duration) || null,
        scrobbles: Number(track.playcount),
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image,
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
    } = await request<TrackGetTopTagsResponse>('track.getTopTags', {
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
    } = await request<TrackSearchResponse>('track.search', {
      track: trackName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      const image = track.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });
      return {
        name: track.name,
        listeners: Number(track.listeners),
        artist: {
          name: track.artist,
          url: `https://www.last.fm/music/${encodeURIComponent(track.artist)}`,
        },

        url: track.url,
        image,
      };
    });
  }
}