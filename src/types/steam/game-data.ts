export interface Requirements {
  minimum: string;
  recommended: string;
}

export interface Sub {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

export interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Sub[];
}

export interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface Category {
  id: number;
  description: string;
}

export interface Genre {
  id: string;
  description: string;
}

export interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  dash_av1: string;
  dash_h264: string;
  hls_h264: string;
  highlight: boolean;
}

export interface Recommendations {
  total: number;
}

export interface HighlightedAchievement {
  name: string;
  path: string;
}

export interface Achievements {
  total: number;
  highlighted: HighlightedAchievement[];
}

export interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

export interface SupportInfo {
  url: string;
  email: string;
}

export interface ContentDescriptors {
  ids: number[];
  notes: string | null;
}

export interface SteamGameData {
  price_overview: {
    final: number;
    currency: string;
    initial: number;
  };
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  dlc?: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string | null;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  developers: string[];
  publishers: string[];
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: Recommendations;
  achievements: Achievements;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: ContentDescriptors;
  imgHero: string;
}

export interface SteamGameDataResponse {
  success: boolean;
  data: SteamGameData;
}
