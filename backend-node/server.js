const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health-check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
