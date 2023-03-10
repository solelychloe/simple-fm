import type { Album, Artist, Image, Tag, Track, User } from '..';

export declare interface UserGetArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        playcount: string;
      }
    >;
  };
}
export declare interface UserGetInfoResponse {
  user: User;
}

export declare interface UserGetFriendsResponse {
  friends: {
    user: User[];
  };
}

export declare interface UserGetLovedTracksResponse {
  lovedtracks: {
    track: Array<
      Track & {
        artist: {
          name: string;
          url: string;
        };
        date: {
          uts: string;
          '#text': string;
        };
      }
    >;
  };
}

export declare interface UserGetPersonalTagsResponse {
  taggings: {
    albums?: {
      album: Array<{
        name: string;
        artist: {
          name: string;
          url: string;
        };
        url: string;
        image: Image[];
      }>;
    };
    artists?: {
      artist: Array<{
        name: string;
        url: string;
        image: Image[];
      }>;
    };
    tracks?: {
      track: Array<{
        name: string;
        artist: {
          name: string;
          url: string;
        };
        url: string;
        image: Image[];
      }>;
    };
  };
}

export declare interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<
      Track & {
        artist: { '#text': string };
        album: { '#text': string };
        '@attr'?: { nowplaying: string };
      }
    >;
    '@attr': {
      user: string;
    };
  };
}
export declare interface UserGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      Album & {
        artist: {
          name: string;
          url: string;
        };
        playcount: string;
        '@attr': {
          rank: string;
        };
      }
    >;
  };
}

export declare interface UserGetTopTagsResponse {
  toptags: {
    tag: Tag[];
  };
}

export declare interface UserGetTopTracksResponse {
  toptracks: {
    track: Array<
      Track & {
        duration: string;
        artist: {
          name: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
        playcount: string;
      }
    >;
  };
}
