import { APIKey } from "../schemas/Apikey";

async function isValidApiKey(req, res, next) {
  const { apikey } = req.params;
  if (typeof apikey !== "undefined" || apikey !== null) {
    const response = await APIKey.findOne({ _id: apikey });
    if (response !== null) next();
    else res.send("Invalid API key / Expired API Key");
  } else {
    res.send("No API key present");
  }
}
