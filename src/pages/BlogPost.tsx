import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, formatDate, type BlogPost as BlogPostType } from '@/utils/blogUtils';
import Navigation from '@/components/Navigation';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        try {
          const postData = await getPostBySlug(slug);
          if (postData) {
            setPost(postData);
          } else {
            navigate('/blog');
          }
        } catch (error) {
          console.error('Error loading post:', error);
          navigate('/blog');
        }
      } else {
        navigate('/blog');
      }
      setLoading(false);
    };

    loadPost();
  }, [slug, navigate]);

  const handleShare = async () => {
    if (!post) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article not found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Zeeshan Ahmad Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content={post.author} />
        <meta name="keywords" content={post.tags?.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.published_date} />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
        {post.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
      </Helmet>
      
      <Navigation />
      
      <main className="pt-20">
        {/* Article Header */}
        <header className="py-12 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Button variant="outline" className="mb-8" asChild>
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>

              {/* Article Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                {post.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.published_date}>
                    {formatDate(post.published_date)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                {post.reading_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.reading_time}</span>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-6 mt-8 text-foreground">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 ml-6 list-disc text-muted-foreground">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 ml-6 list-decimal text-muted-foreground">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-1">{children}</li>
                    ),
                    code: ({ children, className }) => {
                      const isInlineCode = !className;
                      if (isInlineCode) {
                        return (
                          <code className="px-1.5 py-0.5 bg-muted text-foreground rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                          <code className="text-foreground font-mono text-sm">{children}</code>
                        </pre>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/50 rounded-r">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <Card className="max-w-4xl mx-auto p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Enjoyed this article?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I write about AI, software development, and technology trends. 
                Get in touch if you'd like to discuss these topics further.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link to="/#contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/blog">Read More Articles</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPost;