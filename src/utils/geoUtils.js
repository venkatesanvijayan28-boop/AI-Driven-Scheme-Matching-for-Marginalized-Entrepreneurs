/**
 * Real Geolocation & Haversine Distance Utility for SchemeMatch AI (SIH26092)
 * Computes exact geographical distance between entrepreneur and accredited centers.
 */

/**
 * Calculate Great-Circle distance using Haversine formula
 * @param {number} lat1 - User Latitude
 * @param {number} lon1 - User Longitude
 * @param {number} lat2 - Target Center Latitude
 * @param {number} lon2 - Target Center Longitude
 * @returns {number} Distance in kilometers (1 decimal precision)
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Number(distance.toFixed(1));
}

/**
 * Request real GPS position from browser navigator.geolocation
 * @returns {Promise<{latitude: number, longitude: number, accuracy: number}>}
 */
export function getBrowserGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your current browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          isLiveGPS: true
        });
      },
      (error) => {
        let reason = 'Location acquisition failed.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reason = 'Location permission denied by user. Falling back to district address.';
            break;
          case error.POSITION_UNAVAILABLE:
            reason = 'Location information is currently unavailable from device sensors.';
            break;
          case error.TIMEOUT:
            reason = 'Location request timed out. Please check GPS signal.';
            break;
        }
        reject(new Error(reason));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}

/**
 * Sort list of service centers by proximity to user coordinates
 * @param {Array} centers - Centers with latitude and longitude
 * @param {object} userCoords - { latitude, longitude }
 * @returns {Array} Centers enriched with real distance and sorted ascending
 */
export function sortCentersByProximity(centers = [], userCoords = null) {
  if (!userCoords || !userCoords.latitude || !userCoords.longitude) {
    return centers;
  }

  return centers
    .map(center => {
      const lat = center.latitude || (center.coordinates && center.coordinates[0]);
      const lon = center.longitude || (center.coordinates && center.coordinates[1]);

      const distKm = (lat && lon) 
        ? calculateHaversineDistance(userCoords.latitude, userCoords.longitude, lat, lon)
        : null;

      return {
        ...center,
        calculatedDistanceKm: distKm,
        displayDistance: distKm !== null ? `${distKm} km away` : center.distance || 'In your district'
      };
    })
    .sort((a, b) => {
      if (a.calculatedDistanceKm === null) return 1;
      if (b.calculatedDistanceKm === null) return -1;
      return a.calculatedDistanceKm - b.calculatedDistanceKm;
    });
}
