export declare interface ArtistGetInfoType {
  name: string;
  description?: string;
  stats: {
    scrobbles?: number;
    listeners: number;
    userPlayCount?: number | null;
  };
  url: string;
}

export declare interface ArtistSimilarType {
  name: string;
  match: number;
  url: string;
  image?: string | null;
}

export declare interface ArtistTopAlbumsType {
  name: string;
  scrobbles: number;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface ArtistTopTracksType {
  rank: number;
  name: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
}

export declare interface ArtistTopTagsType {
  name: string;
  timesRanked: number;
  url: string;
}
