import "./FavouriteButton.scss";

import React, { useEffect, useState } from "react";
import {
  isFavourite as checkIsFavourite,
  getFavourites,
  setFavourites,
  toggleFavourite,
} from "../../utils/localStorage";

import { syncFavourite } from "../../api/favourites";

interface FavouriteButtonProps {
  courseCode: string;
  subtopicCode: string;
}

type FavouriteState = "unselected" | "selected" | "error";

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  courseCode,
  subtopicCode,
}) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Load initial state from localStorage on mount
  useEffect(() => {
    const favourited = checkIsFavourite(courseCode, subtopicCode);
    setIsFavourite(favourited);
  }, [courseCode, subtopicCode]);

  // Derive visual state from isFavourite and hasError
  const state: FavouriteState = hasError
    ? "error"
    : isFavourite
    ? "selected"
    : "unselected";

  const handleToggle = async () => {
    // Clear any previous error
    setHasError(false);

    // Store previous state for potential rollback
    const previousFavourites = getFavourites(courseCode) ?? [];
    const wasSelected = isFavourite;

    // Optimistically update localStorage and UI
    const result = toggleFavourite(courseCode, subtopicCode);

    if (!result.success) {
      // Hit the 20-item limit
      alert("You can only have up to 20 favourites per course.");
      return;
    }

    // Update UI immediately (optimistic)
    setIsFavourite(result.isFavourite);

    try {
      // Sync with backend
      await syncFavourite();
      // Success - nothing to do, already updated
    } catch (error) {
      // Revert localStorage to previous state
      setFavourites(courseCode, previousFavourites);
      // Revert UI state
      setIsFavourite(wasSelected);
      // Show error state
      setHasError(true);
    }
  };

  return (
    <button
      className={`favourite-button favourite-button--${state}`}
      onClick={handleToggle}
      type="button"
      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={isFavourite}
    >
      <svg
        className="favourite-button__star"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={state === "unselected" ? "none" : "currentColor"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {hasError && (
        <span className="favourite-button__error">failed to save</span>
      )}
    </button>
  );
};

export default FavouriteButton;
