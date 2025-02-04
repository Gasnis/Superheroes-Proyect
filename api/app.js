const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

let superheroes = [
  { name: 'Spider-Man', superpower: 'Agility and web-shooting', humilityScore: 9 },
  { name: 'Superman', superpower: 'Flight and super strength', humilityScore: 7 },
  { name: 'Batman', superpower: 'Intelligence and gadgets', humilityScore: 8 },
  { name: 'Wonder Woman', superpower: 'Strength and Lasso of Truth', humilityScore: 10 },
  { name: 'Iron Man', superpower: 'Advanced technology', humilityScore: 6 },
  { name: 'Captain America', superpower: 'Leadership and indestructible shield', humilityScore: 9 },
  { name: 'Black Panther', superpower: 'Superhuman abilities and strategy', humilityScore: 9 }
];

// Validate superhero input
const isValidSuperhero = (superhero) => {
  const { name, superpower, humilityScore } = superhero;
  return (
    typeof name === 'string' &&
    typeof superpower === 'string' &&
    Number.isInteger(humilityScore) &&
    humilityScore >= 1 &&
    humilityScore <= 10
  );
};

// Add a new superhero
app.post('/superheroes', (req, res) => {
  const newSuperhero = req.body;

  if (!isValidSuperhero(newSuperhero)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  superheroes.push(newSuperhero);
  res.json({ message: 'Superhero added successfully!' });
});

// Get list of superheroes sorted by humility score
app.get('/superheroes', (req, res) => {
  const sortedSuperheroes = superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  res.json(sortedSuperheroes);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});