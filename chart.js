function renderPokemonStats(pokemon) {
  const statsLabels = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
  const statsData = pokemon['stats'].map(stat => stat['base_stat']);
  const ctx = document.getElementById('pokemonStatsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar', // Horizontaler Balken
    data: {
      labels: statsLabels,
      datasets: [
        {
          label: 'Stat Value',
          data: statsData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'], // Hintergrundfarbe der Balken
          borderColor: 'rgba(54, 162, 235, 1)', // Randfarbe der Balken
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y', // Festlegen der Achse auf horizontal (von links nach rechts)
      scales: {
        x: {
          beginAtZero: true, // X-Achse beginnt bei Null
        },
      },
    },
  });
}
