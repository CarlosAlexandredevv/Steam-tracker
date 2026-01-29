export interface SteamPlayer {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
}

export interface SteamOwnedGame {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever: number;
  img_icon_url: string;
  has_community_visible_stats?: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  content_descriptorids?: number[];
  playtime_disconnected?: number;
  banner?: string;
  hero?: string;
  horizontal?: string;
  vertical?: string;
}

export interface SteamGetPlayerSummariesResponse {
  response: {
    players: SteamPlayer[];
  };
}

export interface SteamFriend {
  steamid: string;
  relationship: string;
  friend_since: number;
}

export interface SteamFriendsList {
  friends: SteamFriend[];
}

export interface SteamGetFriendsListResponse {
  friendslist: SteamFriendsList;
}

export interface SteamCurrentPlayersResponse {
  response: {
    player_count: number;
    result: number;
  };
}

export interface SteamGlobalAchievementPercentage {
  name: string;
  percent: number | string;
}

export interface SteamAchievementPercentages {
  achievements: SteamGlobalAchievementPercentage[];
}

export interface SteamGetGlobalAchievementPercentagesForAppResponse {
  achievementpercentages: SteamAchievementPercentages;
}

export interface SteamGameDataResponse {
  success: boolean;
  data: SteamGameData;
}

export interface SteamGameData {
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

export interface Requirements {
  minimum: string;
  recommended: string;
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

export interface Achievements {
  total: number;
  highlighted: HighlightedAchievement[];
}

export interface HighlightedAchievement {
  name: string;
  path: string;
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

// Schema de conquistas do jogo (GetSchemaForGame)
export interface SteamSchemaAchievement {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: number;
  icon: string;
  icongray: string;
}

export interface SteamAvailableGameStats {
  // A API real retorna um array de stats; aqui mantemos como unknown,
  // pois o console do React truncou o valor no log.
  stats?: unknown;
  achievements: SteamSchemaAchievement[];
}

export interface SteamGameSchema {
  gameName: string;
  gameVersion: string;
  availableGameStats: SteamAvailableGameStats;
}

export interface SteamGetSchemaForGameResponse {
  game: SteamGameSchema;
}

export interface SteamPlayerAchievement {
  apiname: string;
  achieved: number; // 0 ou 1
  unlocktime: number;
  name: string;
  description: string;
  icon?: string;
  icongray?: string;
}

export interface SteamPlayerStats {
  steamID: string;
  gameName: string;
  achievements: SteamPlayerAchievement[];
  success: boolean;
}

export interface SteamGetPlayerAchievementsResponse {
  playerstats: SteamPlayerStats;
}

export interface SteamGameData {
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
}

export interface Requirements {
  minimum: string;
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

export interface Achievements {
  total: number;
  highlighted: HighlightedAchievement[];
}

export interface HighlightedAchievement {
  name: string;
  path: string;
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
