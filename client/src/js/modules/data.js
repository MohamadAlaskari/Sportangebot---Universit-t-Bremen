// Function to asynchronously load course data
async function loadKurseData() {
  try {
    const response = await fetch("https://data-two-lovat.vercel.app/kurseData.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming the data is stored under the key "kurse"
  } catch (e) {
    console.error("Error loading course data:", e);
    return []; // Return an empty array in case of error
  }
}

// Export the function to use it in other modules
export { loadKurseData };
