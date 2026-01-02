const cloudinary = require("./cloudinary");

const getPublicId = (url) => {
  const regex = /\/upload\/(?:v\d+\/)?(.+)\./;
  const match = url.match(regex);
  return match ? match[1] : null;
};

async function deleteImage(imageUrl) {
  const publicId = getPublicId(imageUrl);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { invalidate: true },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
}

module.exports = deleteImage;
