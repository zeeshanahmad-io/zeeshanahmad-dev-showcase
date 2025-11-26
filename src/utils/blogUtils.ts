import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published_date: string;
  featured_image?: string;
  tags?: string[];
  featured?: boolean;
  reading_time?: string;
}

// Function to calculate reading time
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Function to load markdown files
const loadMarkdownFile = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/blogs/${slug}.mdoc`);

    // Check if the response is valid
    if (!response.ok) {
      console.error(`Failed to fetch /blogs/${slug}.mdoc: ${response.status}`);
      return null;
    }

    // Check content type to avoid parsing HTML (SPA fallback) as markdown
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      console.warn(`Skipping ${slug}: Received HTML instead of markdown (likely SPA fallback)`);
      return null;
    }

    const markdown = await response.text();

    // Double check if content looks like HTML
    if (markdown.trim().startsWith('<!DOCTYPE html>') || markdown.trim().startsWith('<html')) {
      console.warn(`Skipping ${slug}: Content looks like HTML`);
      return null;
    }

    try {
      const { data, content } = matter(markdown);

      // Validate required fields
      if (!data.title) {
        console.warn(`Skipping ${slug}: Missing title in frontmatter`);
        return null;
      }

      return {
        slug,
        title: data.title || '',
        content,
        excerpt: data.excerpt || '',
        author: data.author || '',
        published_date: data.published_date || '',
        featured_image: data.featured_image || '',
        tags: data.tags || [],
        featured: data.featured || false,
        reading_time: calculateReadingTime(content)
      };
    } catch (parseError) {
      console.error(`Error parsing frontmatter for ${slug}:`, parseError);
      return null;
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
};

// Available blog posts (these should match the actual markdown files)
const availablePosts = [
  'claude-code-openrouter-guide',
  'password-management-guide'
];

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];

  for (const slug of availablePosts) {
    const post = await loadMarkdownFile(slug);
    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  return await loadMarkdownFile(slug);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};