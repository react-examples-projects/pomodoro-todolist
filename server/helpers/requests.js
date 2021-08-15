const axios = require("axios").default;
const FormData = require("form-data");

const { API_UPLOAD_IMAGES, API_UPLOAD_IMAGES_KEY } =
  require("../config/variables").SERVER.API;

async function uploadImages(image) {
  const data = new FormData();
  const dataImage = Buffer.from(image).toString("base64");
  data.append("key", API_UPLOAD_IMAGES_KEY);
  data.append("image", dataImage);
  try {
    const res = await axios.post(API_UPLOAD_IMAGES, data, {
      headers: data.getHeaders(),
    });
    return res.data.data;
  } catch (error) {
    console.log(error.response);
  }

  return null;
}

module.exports = { uploadImages };
