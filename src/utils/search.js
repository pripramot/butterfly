// src/utils/search.js
import Fuse from 'fuse.js';
import { getBlogPosts } from './getBlogPosts';

export async function createSearchIndex() {
  const posts = await getBlogPosts();
  // ตัวอย่างจะกำหนดค่าในการแปลง
  const searchIndex = posts.map((post) => {
    return {
      title: post.title,
      content: post.content,
    };
  });
  return new Fuse(searchIndex, {
    keys: ['title', 'content'],
    threshold: 0.3,
  });
}
// src/components/Search.js
import { createSearchIndex } from '../utils/search';

export default function Search() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchButton = document.getElementById('search-button');

  useEffect(async () => {
    const fuse = await createSearchIndex();
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm.length > 0) {
        const results = fuse.search(searchTerm);
        displaySearchResults(results);
      }
    });

    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim().length > 0) {
        searchButton.disabled = false;
      } else {
        searchButton.disabled = true;
      }
    });
  }, []);

  function displaySearchResults(results) {
    searchResults.innerHTML = '';
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found.</p>';
    } else {
      results.forEach((result) => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'mb-2');
        resultElement.innerHTML = `
          <h3 class="text-lg font-bold">${result.item.title}</h3>
          <p class="text-gray-600">${result.item.content}</p>
        `;
        searchResults.appendChild(resultElement);
      });
    }
    searchResults.classList.remove('hidden');
  }

  return null;
}
