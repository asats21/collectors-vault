let ranges = [];
let isLoading = false; // Flag to track if the data is already being loaded

export const loadSilkroadRanges = async () => {
    // Prevent loading if ranges are already loaded or it's already in progress
    if (ranges.length > 0 || isLoading) return;

    isLoading = true; // Set the flag to indicate loading is in progress
  
    try {
      const baseURL = process.env.PUBLIC_URL || ''; // Handle local vs. deployed
      const response = await fetch(`${baseURL}/silk_road_ranges.txt`);
      const text = await response.text();
  
      ranges = text
        .trim()
        .split(/\r?\n/) // Handle both Windows (\r\n) and Unix (\n) line endings
        .map(line => {
          const [min, max] = line.split(',').map(Number);
          return { min, max };
        });
  
      console.log(`Loaded ${ranges.length} silkroad ranges.`); // Debugging
    } catch (error) {
      console.error('Failed to load ranges:', error);
    } finally {
      isLoading = false; // Reset the loading flag when done
    }
  };
  

export const isSilkroad = (sat) => {
  const satNum = Number(sat);
  return ranges.some(({ min, max }) => satNum >= min && satNum <= max);
};