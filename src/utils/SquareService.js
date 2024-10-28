const API_URL = "https://localhost:7250/api/squares";

export const createSquare = async (square) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(square),
    });

    if (!response.ok) {
      throw new Error("Failed to create square");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createSquare:", error);
    throw error;
  }
};

export const getAllSquares = async () => {
  try {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
      throw new Error("Failed to fetch squares");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getAllSquares", error);
    throw error;
  }
};

export const deleteAllSquares = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "DELETE",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to delete squares");
    }

    return await response.text();
  } catch (error) {
    console.error("Error in deleteAllSquares", error);
    throw error;
  }
};
