import type { Album, Artist, Image, OpenSearchMeta, Tag, Track } from '~/index.js';

type ObjArray<T> = T | T[];

export declare interface AlbumGetInfoResponse {
  album: Album & {
    tags: {
      tag: Tag[];
    };
    artist: string;
    listeners: string;
    playcount: string;
    userplaycount?: number;
    tracks: {
      track: ObjArray<
        Track & {
          duration: string;
          '@attr': {
            rank: number;
          };
          artist: Artist;
        }
      >;
    };
    url: string;
    image: Image[];
  };
}

export declare interface AlbumGetTopTagsResponse {
  toptags: {
    tag: Tag[];
    '@attr': {
      artist: string;
      album: string;
    };
  };
}

export declare interface AlbumSearchResponse {
  results: OpenSearchMeta & {
    'opensearch:Query': {
      searchTerms: string;
    };
    albummatches: {
      album: Array<
        Album & {
          artist: string;
        }
      >;
    };
  };
}
