const express = require('express');
const fetch = require('node-fetch'); // To call Roblox API
const app = express();
const PORT = 3000;

// Replace with your actual credentials for the Roblox API
const ROBLOX_GROUP_ID = 15725709;

app.use(express.json());
app.use(express.static('public'));

// OAuth login simulation route (redirect to Roblox auth)
app.get('/auth/roblox', (req, res) => {
  // Placeholder for actual Roblox OAuth login
  res.redirect('/auth/callback?userid=12345'); // Simulate login with user id
});

// OAuth callback (simulated)
app.get('/auth/callback', async (req, res) => {
  const userId = req.query.userid;
  // Verify if the user belongs to the Ireland group (ID: 15725709)
  const userInGroup = await checkGroupMembership(userId, ROBLOX_GROUP_ID);
  
  if (userInGroup) {
    // Store user session (simplified)
    req.session.user = { id: userId, isAuthenticated: true };
    res.redirect('/vote');
  } else {
    res.status(403).send('You are not a member of the Ireland group.');
  }
});

// Serve the voting page
app.get('/vote', (req, res) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    res.sendFile(__dirname + '/public/vote.html');
  } else {
    res.redirect('/');
  }
});

// Handle vote submission
app.post('/submit-vote', (req, res) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    // Save the vote (simplified, actual implementation should use a database)
    const vote = req.body.candidate;
    console.log(`User ${req.session.user.id} voted for ${vote}`);
    
    res.json({ success: true });
  } else {
    res.status(403).json({ success: false });
  }
});

// Utility function to check Roblox group membership
async function checkGroupMembership(userId, groupId) {
  const response = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
  const data = await response.json();
  
  return data.data.some(group => group.group.id === groupId);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
