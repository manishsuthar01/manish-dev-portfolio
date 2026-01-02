function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // speciall character removal
    .replace(/\s+/g, "-");
}

module.exports = slugify;
