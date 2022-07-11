import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/tiagorahal/repos');
      const data = await response.json();

      setRepositories(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `${filtered.length} Favs`;
  }, [repositories]);

  const handleFavorite = (id) => {
    const newRepos = repositories.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r));

    setRepositories(newRepos);
  };

  return (
    <>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button type="button" onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
