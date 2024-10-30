/* global process */
const API_URL = process.env.REACT_APP_API_URL;

const ERROR_MESSAGES = {
  CREATE:
    "Failed to create square. Please check your connection and try again.",
  FETCH: "Failed to load squares. Please refresh the page.",
  DELETE: "Failed to clear squares. Please try again.",
  NETWORK: "Network error. Please check your connection.",
};

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
      throw new Error(ERROR_MESSAGES.CREATE);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createSquare:", error);
    throw new Error(
      error.message === "Failed to fetch"
        ? ERROR_MESSAGES.NETWORK
        : ERROR_MESSAGES.CREATE,
    );
  }
};

export const getAllSquares = async () => {
  try {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getAllSquares", error);
    throw new Error(
      error.message === "Failed to fetch"
        ? ERROR_MESSAGES.NETWORK
        : ERROR_MESSAGES.FETCH,
    );
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
      throw new Error(ERROR_MESSAGES.DELETE);
    }

    return await response.text();
  } catch (error) {
    console.error("Error in deleteAllSquares", error);
    throw new Error(
      error.message === "Failed to fetch"
        ? ERROR_MESSAGES.NETWORK
        : ERROR_MESSAGES.DELETE,
    );
  }
};
