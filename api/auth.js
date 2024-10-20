export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.url.includes('/auth/roblox')) {
      res.redirect('/api/auth/callback?userid=12345'); 
    } else if (req.url.includes('/auth/callback')) {
      const userId = req.query.userid;
      const userInGroup = await checkGroupMembership(userId, 15725709);
      
      if (userInGroup) {
        res.status(200).json({ message: 'User authenticated and in group' });
      } else {
        res.status(403).send('You are not a member of the Ireland group.');
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function checkGroupMembership(userId, groupId) {
  const response = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
  const data = await response.json();
  return data.data.some(group => group.group.id === groupId);
}
