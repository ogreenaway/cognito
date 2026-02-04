export const syncFavourite = async (): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check for error simulation query param
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("favouriteEndpointError") === "true") {
    throw new Error("Failed to sync favourite");
  }
};
