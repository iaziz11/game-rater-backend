import axios from "axios";
const id = process.env.TWITCH_API_CLIENT_ID;
const secret = process.env.TWITCH_API_CLIENT_SECRET;

export async function getCredits() {
  try {
    const response = await axios.post("https://id.twitch.tv/oauth2/token", {
      client_id: id,
      client_secret: secret,
      grant_type: "client_credentials",
    });
    return response.data;
  } catch (error) {
    return { error: error.cause };
  }
}

export async function getGamesFromQuery(query, access_token) {
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `search "${query}"; fields name, first_release_date, cover.url;`,
      {
        headers: {
          Accept: "application/json",
          "Client-ID": id,
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "text/plain",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getGameFromId(id, access_token) {
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `search "${query}"; fields name, first_release_date, cover.url;`,
      {
        headers: {
          Accept: "application/json",
          "Client-ID": id,
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "text/plain",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
