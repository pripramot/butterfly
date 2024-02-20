// src/utils/getBlogPosts.js
import fs from 'fs/promises';
import path from 'path';

export async function getBlogPosts() {
  const blogPostDirectory = path.join(process.cwd(), 'content/blog');
  const fileNames = await fs.readdir(blogPostDirectory);
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(blogPostDirectory, fileName);
      const fileContent = await fs.readFile(filePath, 'utf8');
      return {
        slug: fileName.replace('.md', ''),
        title: '', // ตัวอย่างจะกำหนดค่าในการแปลง
        content: fileContent,
      };
    })
  );
  return posts;
}
