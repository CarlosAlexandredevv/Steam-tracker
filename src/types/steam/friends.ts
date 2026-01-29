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

export interface PlayedFriend {
  steamid: string;
  personaname: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  playtime_forever: number;
}

export interface GetPlayedFriendsResponse {
  count: number;
  friends: PlayedFriend[];
}
