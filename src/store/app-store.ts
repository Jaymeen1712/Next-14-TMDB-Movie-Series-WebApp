import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Theme types
export type Theme = "light" | "dark" | "system";
export type ColorScheme = "blue" | "green" | "purple" | "orange" | "red";

// User preferences interface
interface UserPreferences {
  theme: Theme;
  colorScheme: ColorScheme;
  language: string;
  region: string;
  autoplay: boolean;
  showAdultContent: boolean;
  defaultVideoQuality: "auto" | "720p" | "1080p" | "4k";
  subtitlesEnabled: boolean;
  subtitlesLanguage: string;
  notifications: {
    newReleases: boolean;
    recommendations: boolean;
    watchlistUpdates: boolean;
    systemUpdates: boolean;
  };
}

// UI state interface
interface UIState {
  sidebarOpen: boolean;
  searchOpen: boolean;
  playerFullscreen: boolean;
  currentPage: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  modals: {
    trailer: { isOpen: boolean; videoId?: string };
    login: { isOpen: boolean };
    settings: { isOpen: boolean };
    share: { isOpen: boolean; content?: any };
  };
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
  }>;
}

// Search state interface
interface SearchState {
  query: string;
  filters: {
    type: "all" | "movie" | "tv" | "person";
    genre: string[];
    year: number | null;
    rating: [number, number];
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  recentSearches: string[];
  suggestions: string[];
}

// Watchlist and favorites
interface UserLists {
  watchlist: number[];
  favorites: number[];
  watched: number[];
  ratings: Record<number, number>;
  customLists: Array<{
    id: string;
    name: string;
    description: string;
    items: number[];
    isPublic: boolean;
    createdAt: number;
    updatedAt: number;
  }>;
}

// Player state
interface PlayerState {
  currentMedia: {
    id: number;
    type: "movie" | "tv";
    title: string;
    season?: number;
    episode?: number;
  } | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  quality: string;
  subtitles: {
    enabled: boolean;
    language: string;
    size: "small" | "medium" | "large";
  };
  fullscreen: boolean;
  pictureInPicture: boolean;
}

// Main app store interface
interface AppStore {
  // State
  preferences: UserPreferences;
  ui: UIState;
  search: SearchState;
  userLists: UserLists;
  player: PlayerState;
  
  // Actions
  // Preferences actions
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setLanguage: (language: string) => void;
  setRegion: (region: string) => void;
  toggleAutoplay: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  
  // UI actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href: string }>) => void;
  openModal: (modal: keyof UIState["modals"], data?: any) => void;
  closeModal: (modal: keyof UIState["modals"]) => void;
  addNotification: (notification: Omit<UIState["notifications"][0], "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Search actions
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: Partial<SearchState["filters"]>) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setSuggestions: (suggestions: string[]) => void;
  
  // User lists actions
  addToWatchlist: (id: number) => void;
  removeFromWatchlist: (id: number) => void;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  markAsWatched: (id: number) => void;
  unmarkAsWatched: (id: number) => void;
  setRating: (id: number, rating: number) => void;
  removeRating: (id: number) => void;
  createCustomList: (name: string, description: string) => string;
  updateCustomList: (id: string, updates: Partial<UserLists["customLists"][0]>) => void;
  deleteCustomList: (id: string) => void;
  addToCustomList: (listId: string, itemId: number) => void;
  removeFromCustomList: (listId: string, itemId: number) => void;
  
  // Player actions
  setCurrentMedia: (media: PlayerState["currentMedia"]) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  setQuality: (quality: string) => void;
  toggleSubtitles: () => void;
  setSubtitlesLanguage: (language: string) => void;
  setSubtitlesSize: (size: PlayerState["subtitles"]["size"]) => void;
  toggleFullscreen: () => void;
  togglePictureInPicture: () => void;
  resetPlayer: () => void;
}

// Default values
const defaultPreferences: UserPreferences = {
  theme: "system",
  colorScheme: "blue",
  language: "en",
  region: "US",
  autoplay: true,
  showAdultContent: false,
  defaultVideoQuality: "auto",
  subtitlesEnabled: false,
  subtitlesLanguage: "en",
  notifications: {
    newReleases: true,
    recommendations: true,
    watchlistUpdates: true,
    systemUpdates: true,
  },
};

const defaultUIState: UIState = {
  sidebarOpen: false,
  searchOpen: false,
  playerFullscreen: false,
  currentPage: "/",
  breadcrumbs: [],
  modals: {
    trailer: { isOpen: false },
    login: { isOpen: false },
    settings: { isOpen: false },
    share: { isOpen: false },
  },
  notifications: [],
};

const defaultSearchState: SearchState = {
  query: "",
  filters: {
    type: "all",
    genre: [],
    year: null,
    rating: [0, 10],
    sortBy: "popularity",
    sortOrder: "desc",
  },
  recentSearches: [],
  suggestions: [],
};

const defaultUserLists: UserLists = {
  watchlist: [],
  favorites: [],
  watched: [],
  ratings: {},
  customLists: [],
};

const defaultPlayerState: PlayerState = {
  currentMedia: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  playbackRate: 1,
  quality: "auto",
  subtitles: {
    enabled: false,
    language: "en",
    size: "medium",
  },
  fullscreen: false,
  pictureInPicture: false,
};

// Create the store
export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          // Initial state
          preferences: defaultPreferences,
          ui: defaultUIState,
          search: defaultSearchState,
          userLists: defaultUserLists,
          player: defaultPlayerState,

          // Preferences actions
          setTheme: (theme) =>
            set((state) => {
              state.preferences.theme = theme;
            }),

          setColorScheme: (scheme) =>
            set((state) => {
              state.preferences.colorScheme = scheme;
            }),

          setLanguage: (language) =>
            set((state) => {
              state.preferences.language = language;
            }),

          setRegion: (region) =>
            set((state) => {
              state.preferences.region = region;
            }),

          toggleAutoplay: () =>
            set((state) => {
              state.preferences.autoplay = !state.preferences.autoplay;
            }),

          updatePreferences: (preferences) =>
            set((state) => {
              Object.assign(state.preferences, preferences);
            }),

          // UI actions
          toggleSidebar: () =>
            set((state) => {
              state.ui.sidebarOpen = !state.ui.sidebarOpen;
            }),

          setSidebarOpen: (open) =>
            set((state) => {
              state.ui.sidebarOpen = open;
            }),

          toggleSearch: () =>
            set((state) => {
              state.ui.searchOpen = !state.ui.searchOpen;
            }),

          setSearchOpen: (open) =>
            set((state) => {
              state.ui.searchOpen = open;
            }),

          setCurrentPage: (page) =>
            set((state) => {
              state.ui.currentPage = page;
            }),

          setBreadcrumbs: (breadcrumbs) =>
            set((state) => {
              state.ui.breadcrumbs = breadcrumbs;
            }),

          openModal: (modal, data) =>
            set((state) => {
              state.ui.modals[modal].isOpen = true;
              if (data && modal === "trailer") {
                state.ui.modals.trailer.videoId = data.videoId;
              }
              if (data && modal === "share") {
                state.ui.modals.share.content = data;
              }
            }),

          closeModal: (modal) =>
            set((state) => {
              state.ui.modals[modal].isOpen = false;
              if (modal === "trailer") {
                state.ui.modals.trailer.videoId = undefined;
              }
              if (modal === "share") {
                state.ui.modals.share.content = undefined;
              }
            }),

          addNotification: (notification) =>
            set((state) => {
              const id = Date.now().toString();
              state.ui.notifications.unshift({
                ...notification,
                id,
                timestamp: Date.now(),
                read: false,
              });
              // Keep only last 50 notifications
              if (state.ui.notifications.length > 50) {
                state.ui.notifications = state.ui.notifications.slice(0, 50);
              }
            }),

          markNotificationRead: (id) =>
            set((state) => {
              const notification = state.ui.notifications.find((n) => n.id === id);
              if (notification) {
                notification.read = true;
              }
            }),

          clearNotifications: () =>
            set((state) => {
              state.ui.notifications = [];
            }),

          // Search actions
          setSearchQuery: (query) =>
            set((state) => {
              state.search.query = query;
            }),

          setSearchFilters: (filters) =>
            set((state) => {
              Object.assign(state.search.filters, filters);
            }),

          addRecentSearch: (query) =>
            set((state) => {
              if (query.trim() && !state.search.recentSearches.includes(query)) {
                state.search.recentSearches.unshift(query);
                // Keep only last 10 searches
                if (state.search.recentSearches.length > 10) {
                  state.search.recentSearches = state.search.recentSearches.slice(0, 10);
                }
              }
            }),

          clearRecentSearches: () =>
            set((state) => {
              state.search.recentSearches = [];
            }),

          setSuggestions: (suggestions) =>
            set((state) => {
              state.search.suggestions = suggestions;
            }),

          // User lists actions
          addToWatchlist: (id) =>
            set((state) => {
              if (!state.userLists.watchlist.includes(id)) {
                state.userLists.watchlist.push(id);
              }
            }),

          removeFromWatchlist: (id) =>
            set((state) => {
              state.userLists.watchlist = state.userLists.watchlist.filter((item) => item !== id);
            }),

          addToFavorites: (id) =>
            set((state) => {
              if (!state.userLists.favorites.includes(id)) {
                state.userLists.favorites.push(id);
              }
            }),

          removeFromFavorites: (id) =>
            set((state) => {
              state.userLists.favorites = state.userLists.favorites.filter((item) => item !== id);
            }),

          markAsWatched: (id) =>
            set((state) => {
              if (!state.userLists.watched.includes(id)) {
                state.userLists.watched.push(id);
              }
            }),

          unmarkAsWatched: (id) =>
            set((state) => {
              state.userLists.watched = state.userLists.watched.filter((item) => item !== id);
            }),

          setRating: (id, rating) =>
            set((state) => {
              state.userLists.ratings[id] = rating;
            }),

          removeRating: (id) =>
            set((state) => {
              delete state.userLists.ratings[id];
            }),

          createCustomList: (name, description) => {
            const id = Date.now().toString();
            set((state) => {
              state.userLists.customLists.push({
                id,
                name,
                description,
                items: [],
                isPublic: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              });
            });
            return id;
          },

          updateCustomList: (id, updates) =>
            set((state) => {
              const list = state.userLists.customLists.find((l) => l.id === id);
              if (list) {
                Object.assign(list, updates);
                list.updatedAt = Date.now();
              }
            }),

          deleteCustomList: (id) =>
            set((state) => {
              state.userLists.customLists = state.userLists.customLists.filter((l) => l.id !== id);
            }),

          addToCustomList: (listId, itemId) =>
            set((state) => {
              const list = state.userLists.customLists.find((l) => l.id === listId);
              if (list && !list.items.includes(itemId)) {
                list.items.push(itemId);
                list.updatedAt = Date.now();
              }
            }),

          removeFromCustomList: (listId, itemId) =>
            set((state) => {
              const list = state.userLists.customLists.find((l) => l.id === listId);
              if (list) {
                list.items = list.items.filter((item) => item !== itemId);
                list.updatedAt = Date.now();
              }
            }),

          // Player actions
          setCurrentMedia: (media) =>
            set((state) => {
              state.player.currentMedia = media;
            }),

          setPlaying: (playing) =>
            set((state) => {
              state.player.isPlaying = playing;
            }),

          setCurrentTime: (time) =>
            set((state) => {
              state.player.currentTime = time;
            }),

          setDuration: (duration) =>
            set((state) => {
              state.player.duration = duration;
            }),

          setVolume: (volume) =>
            set((state) => {
              state.player.volume = Math.max(0, Math.min(1, volume));
            }),

          toggleMute: () =>
            set((state) => {
              state.player.muted = !state.player.muted;
            }),

          setPlaybackRate: (rate) =>
            set((state) => {
              state.player.playbackRate = rate;
            }),

          setQuality: (quality) =>
            set((state) => {
              state.player.quality = quality;
            }),

          toggleSubtitles: () =>
            set((state) => {
              state.player.subtitles.enabled = !state.player.subtitles.enabled;
            }),

          setSubtitlesLanguage: (language) =>
            set((state) => {
              state.player.subtitles.language = language;
            }),

          setSubtitlesSize: (size) =>
            set((state) => {
              state.player.subtitles.size = size;
            }),

          toggleFullscreen: () =>
            set((state) => {
              state.player.fullscreen = !state.player.fullscreen;
            }),

          togglePictureInPicture: () =>
            set((state) => {
              state.player.pictureInPicture = !state.player.pictureInPicture;
            }),

          resetPlayer: () =>
            set((state) => {
              state.player = { ...defaultPlayerState };
            }),
        }))
      ),
      {
        name: "tmdb-app-store",
        partialize: (state) => ({
          preferences: state.preferences,
          search: {
            recentSearches: state.search.recentSearches,
            filters: state.search.filters,
          },
          userLists: state.userLists,
        }),
      }
    ),
    {
      name: "TMDB App Store",
    }
  )
);
