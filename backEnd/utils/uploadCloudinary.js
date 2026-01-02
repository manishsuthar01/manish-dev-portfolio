const cloudinary = require("./cloudinary");

async function uploadImage(buffer, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(buffer);
  });
}
// Cloudinary returns:
// secure_url → public HTTPS image URL
// public_id → used for deletion later

module.exports = uploadImage;
