interface Image {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge';
}

interface APITrack {
  name: string;
  listeners: string;
  url: string;
  streamable: string;
  image: Image[];
}

// Expand these as necessary in the future
export interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: Array<{
        name: string;
        artist: string;
        url: string;
        image: Image[];
      }>;
    };
  };
}

export interface ArtistGetInfoResponse {
  artist: {
    name: string;
    url: string;
    stats: {
      listeners: string;
      playcount: string;
    };
    bio: { summary: string };
  };
}

export interface ArtistGetTopTagsResponse {
  toptags: {
    tag: Array<{
      name: string;
      url: string;
      count: number;
    }>;
  };
}

export interface ArtistGetTopTracksResponse {
  toptracks: {
    track: Array<
      APITrack & {
        playcount: string;
        artist: {
          name: string;
          mbid: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
  };
}

export interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: Array<{
        name: string;
        artist: string;
        url: string;
        streamable: string;
        listeners: string;
        image: Image[];
      }>;
    };
  };
}

export interface UserGetInfoResponse {
  user: {
    name: string;
    realname: string;
    country: string;
    url: string;
    registered: {
      unixtime: string;
      '#text': number;
    };
    image: Image[];
  };
}

export interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<{
      artist: { '#text': string };
      streamable: string;
      image: Image[];
      album: { '#text': string };
      name: string;
      url: string;
      '@attr'?: { nowplaying: string };
    }>;
  };
}

export interface AlbumType {
  name: string;
  artist: string;
  url: string;
  image?: string;
}

export interface ArtistType {
  name: string;
  url: string;
  bio: string;
  scrobbles: string;
  listeners: string;
}

export interface TagType {
  name: string;
  url: string;
  timesRanked: number;
}

export interface ArtistTrackType {
  rank: string;
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  scrobbles: string;
  listeners: string;
}

export interface TrackType {
  name: string;
  artist: string;
  url: string;
  listeners: string;
  image?: string;
}

export interface UserType {
  name: string;
  realName: string | null;
  country: string;
  url: string;
  registered: Date;
  image?: string;
}

export interface UserTrackType {
  currentlyPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  url: string;
  image?: string;
}