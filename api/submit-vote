export default function handler(req, res) {
  if (req.method === 'POST') {
    const { candidate } = req.body;
    if (candidate) {
      // Log the vote (simplified for this example)
      console.log(`Vote submitted for: ${candidate}`);
      res.status(200).json({ success: true, message: 'Vote submitted' });
    } else {
      res.status(400).json({ success: false, message: 'No candidate selected' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
