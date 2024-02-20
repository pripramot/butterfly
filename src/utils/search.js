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
