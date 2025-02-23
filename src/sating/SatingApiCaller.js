export async function fetchSats(wallet) {
    try {
      const response = await fetch(
        'https://gw.sating.io/api/account/sats/' + wallet
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Process the response: extract only sat and types from each sat object in each UTXO
      const result = [];
      data.forEach((utxo) => {
        if (utxo.sats && Array.isArray(utxo.sats)) {
          utxo.sats.forEach((satItem) => {
            if (satItem.sat && satItem.types) {
              result.push({ sat: satItem.sat, types: satItem.types });
            }
          });
        }
      });
      return result;
    } catch (error) {
      console.error('Error fetching sats:', error);
      throw error;
    }
  }
  