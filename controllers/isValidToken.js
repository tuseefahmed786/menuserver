exports.isValidToken = async (req, res) => {
    try {
        res.send("it's valid token"); // Send the icons as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'error in token error' });
    }
}