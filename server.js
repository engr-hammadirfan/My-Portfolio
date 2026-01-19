const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const filePath = path.join(__dirname, 'data', 'messages.json');
const ADMIN_PASSWORD = "mysecretpassword"; 

// 1. Contact Form Save logic
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const newMessage = { id: Date.now(), name, email, message, date: new Date().toLocaleString() };

    fs.readFile(filePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) { try { messages = JSON.parse(data); } catch (e) { messages = []; } }
        messages.push(newMessage);
        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).json({ success: false });
            res.status(200).json({ success: true });
        });
    });
});

// 2. Fetch Messages API
app.post('/api/admin/messages', (req, res) => {
    const { password } = req.body;
    if (password !== ADMIN_PASSWORD) return res.status(401).json({ success: false, message: "Wrong Password" });

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false });
        res.json(JSON.parse(data || "[]"));
    });
});

// 3. Delete Message API
app.post('/api/admin/delete', (req, res) => {
    const { password, id } = req.body;
    if (password !== ADMIN_PASSWORD) return res.status(401).json({ success: false });

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false });
        let messages = JSON.parse(data || "[]");
        messages = messages.filter(m => m.id !== id);
        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));