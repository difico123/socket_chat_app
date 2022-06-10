function formatMessage(username, text, image) {
    return {
        username,
        text,
        image,
        time: new Date()
    };
}

module.exports = formatMessage;