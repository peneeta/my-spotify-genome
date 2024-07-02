// for type safety with TypeScript
interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface TopTracksObject {
    href: string,
    items: Track[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
        
}

interface TopArtistsObject {
    href: string,
    items: Artist[],
    limit: number,
    offset: number
}

interface Arist {
    external_urls: { spotify: string },
    followers: { href: string; total: number; };
    genres: string[],
    href: string,
    id: string,
    images: Image[],
    name: string,
    popularity: number,
    type: string,
    uri: string
}

interface Track {
    album: Album,
    artists: any,
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: { isrc: string },
    external_urls: { spotify: string },
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    type: string,
    uri: string
}

interface Album {
    album_type: string,
    images: Image[],
    name: string,
}

