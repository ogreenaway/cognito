import { Topic } from "../types/topic";

type LocalStorageKey =
  | `course_version_${string}`
  | `course_categories_${string}`
  | `favourites_${string}`
  | `notes_${string}`;

const getLocalStorage = <T>(key: LocalStorageKey): T | null => {
  // TODO: set these to expire
  console.info("Getting localStorage key:", key);
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

const setLocalStorage = <T>(key: LocalStorageKey, value: T): void => {
  console.info("Setting localStorage key:", key, value);
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const getCachedVersion = (courseCode: string): number | null => {
  return getLocalStorage<number>(`course_version_${courseCode}`);
};

export const getCachedCategories = (courseCode: string): Topic[] | null => {
  return getLocalStorage<Topic[]>(`course_categories_${courseCode}`);
};

export const setCachedVersion = (courseCode: string, version: number): void => {
  setLocalStorage<number>(`course_version_${courseCode}`, version);
};

export const setCachedCategories = (
  courseCode: string,
  categories: Topic[]
): void => {
  setLocalStorage<Topic[]>(`course_categories_${courseCode}`, categories);
};

// Favourites utilities
const MAX_FAVOURITES = 20;

export const getFavourites = (courseCode: string): string[] | null => {
  return getLocalStorage<string[]>(`favourites_${courseCode}`);
};

export const setFavourites = (
  courseCode: string,
  subtopicCodes: string[]
): void => {
  setLocalStorage<string[]>(`favourites_${courseCode}`, subtopicCodes);
};

export const isFavourite = (
  courseCode: string,
  subtopicCode: string
): boolean => {
  const favourites = getFavourites(courseCode);
  return favourites ? favourites.includes(subtopicCode) : false;
};

export type ToggleFavouriteResult =
  | { success: true; isFavourite: boolean; favourites: string[] }
  | { success: false; reason: "limit_reached" };

export const toggleFavourite = (
  courseCode: string,
  subtopicCode: string
): ToggleFavouriteResult => {
  const favourites = getFavourites(courseCode) ?? [];
  const isCurrentlyFavourite = favourites.includes(subtopicCode);

  if (isCurrentlyFavourite) {
    // Remove from favourites
    const newFavourites = favourites.filter((code) => code !== subtopicCode);
    setFavourites(courseCode, newFavourites);
    return { success: true, isFavourite: false, favourites: newFavourites };
  } else {
    // Add to favourites (check limit first)
    if (favourites.length >= MAX_FAVOURITES) {
      return { success: false, reason: "limit_reached" };
    }
    const newFavourites = [...favourites, subtopicCode];
    setFavourites(courseCode, newFavourites);
    return { success: true, isFavourite: true, favourites: newFavourites };
  }
};

// Notes utilities
export const getNotes = (courseCode: string): string | null => {
  return getLocalStorage<string>(`notes_${courseCode}`);
};

export const setNotes = (courseCode: string, notes: string): void => {
  setLocalStorage<string>(`notes_${courseCode}`, notes);
};
