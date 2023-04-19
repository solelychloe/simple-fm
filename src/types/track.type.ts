import type { ImageType } from './index.js';

export declare interface TrackGetInfoType {
  name: string;
  duration: number | null;
  stats: {
    scrobbles: number;
    listeners: number;
    userPlayCount: number | null;
    userLoved: boolean;
  };
  artist: {
    name: string;
    url: string;
  };
  album: {
    position: number | null;
    name: string | null;
    image?: ImageType[] | null;
    url: string | null;
  };
  tags?: object[];
  url: string;
}

export declare interface TrackSearchType {
  search: {
    query: string;
    page: number;
    itemsPerPage: number;
    totalResults: number;
  };
  tracks: Array<{
    name: string;
    listeners: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: ImageType[] | null;
  }>;
}

export declare interface TrackSimilarType {
  name: string;
  artist: { name: string; url: string };
  url: string;
  tracks: Array<{
    match: number;
    name: string;
    duration: number | null;
    scrobbles: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: ImageType[] | null;
  }>;
}

export declare interface TrackTopTagsType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  tags: Array<{
    count: number;
    name: string;
    url: string;
  }>;
}