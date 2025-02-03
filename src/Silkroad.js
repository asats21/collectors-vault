 let flatRanges = [];
let isLoading = false; // Flag to track if the data is already being loaded

// Function to load and process the flat ranges JSON
export const loadSilkroadRanges = async () => {
  // Prevent loading if ranges are already loaded or it's already in progress
  if (flatRanges.length > 0 || isLoading) return;

  isLoading = true; // Set the flag to indicate loading is in progress

  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/silk_road_ranges_flat.json`);
    flatRanges = await response.json();
    console.log(`Loaded ${flatRanges.length / 2} silkroad ranges.`); // Each range has two values (min, max)
  } catch (error) {
    console.error('Failed to load ranges:', error);
  } finally {
    isLoading = false; // Reset the loading flag when done
  }
};
  
// Function to check if a given SAT is in any of the loaded ranges
export const isSilkroad = (sat) => {
  for (let i = 0; i < flatRanges.length; i += 2) {
    const min = flatRanges[i];
    const max = flatRanges[i + 1];

    if (sat >= min && sat <= max) {
      return true;
    }
  }
  return false;
};