import type { Artist, Track, Tag } from '..';

export declare interface ChartGetTopArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        playcount: string;
        listeners: string;
      }
    >;
  };
}

export declare interface ChartGetTopTagsResponse {
  tags: {
    tag: Array<
      Tag & {
        taggings: string;
      }
    >;
  };
}

export declare interface ChartGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        playcount: string;
        listeners: string;
        artist: {
          name: string;
          url: string;
        };
      }
    >;
  };
}
