function formatMessage(username, room, text, image) {
  return {
    username,
    text,
    room,
    image,
    time: new Date(),
  };
}

module.exports = formatMessage;
