import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Clock, Filter, Star, Bell } from 'lucide-react';
import { getAllPosts, formatDate, BlogPost } from '@/utils/blogUtils';
import Navigation from '@/components/Navigation';
import { NewsletterDialog } from '@/components/NewsletterDialog';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        // Filter out any potential nulls or invalid posts that might have slipped through
        const validPosts = allPosts.filter(post => post && post.title && post.slug);
        setPosts(validPosts);
        setFilteredPosts(validPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (selectedTag === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.tags?.includes(selectedTag)));
    }
  }, [selectedTag, posts]);

  const allTags = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags || [])))];
  const featuredPost = posts.find(post => post.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Zeeshan Ahmad - Tech Insights & Innovations</title>
        <meta name="description" content="Exploring the intersection of AI, full-stack development, and enterprise solutions. Insights from the trenches of building scalable software systems." />
        <meta name="keywords" content="blog, tech insights, AI, software development, full-stack, enterprise solutions" />

        {/* Open Graph Meta Tags for Blog Listing */}
        <meta property="og:title" content="Blog | Zeeshan Ahmad" />
        <meta property="og:description" content="Exploring the intersection of AI, full-stack development, and enterprise solutions. Insights from the trenches of building scalable software systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zeeshanahmad.dev/blog" />
        <meta property="og:image" content="https://static.toastmynetwork.com/zeeshanahmad.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Tags for Blog Listing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Zeeshan Ahmad - Tech Insights & Innovations" />
        <meta name="twitter:description" content="Exploring the intersection of AI, full-stack development, and enterprise solutions. Insights from the trenches of building scalable software systems." />
        <meta name="twitter:image" content="https://static.toastmynetwork.com/zeeshanahmad.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://zeeshanahmad.dev/blog" />
      </Helmet>



      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-accent">
                Tech Insights & Innovations
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Exploring the intersection of AI, full-stack development, and enterprise solutions.
                Insights from the trenches of building scalable software systems.
              </p>
              <NewsletterDialog>
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                  <Bell className="w-5 h-5 mr-2" />
                  Get Notified
                </Button>
              </NewsletterDialog>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="container mx-auto px-6">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Featured Article</h2>
              </div>
              <Card className="portfolio-card overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden h-64 lg:h-full">
                    {featuredPost.featured_image ? (
                      <img
                        src={featuredPost.featured_image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-elegant flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-lg font-semibold">{featuredPost.title.split(':')[0]}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-8 space-y-6 relative z-10">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground line-clamp-2">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.published_date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.reading_time}
                      </div>
                    </div>

                    {featuredPost.tags && (
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="pt-4">
                      <Button
                        className="btn-hero"
                        asChild
                      >
                        <Link to={`/blog/${featuredPost.slug}`}>
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Filter Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={selectedTag === tag ? "btn-hero" : ""}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-foreground mb-12">All Articles</h2>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No articles found for the selected category.</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.slug} className="portfolio-card overflow-hidden group">
                    {/* Featured Image */}
                    <div className="relative overflow-hidden h-48">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-elegant flex items-center justify-center">
                          <div className="text-center text-white">
                            <h3 className="text-lg font-semibold">{post.title.split(':')[0]}</h3>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="p-6 space-y-4 relative z-10">
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.published_date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.reading_time}
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Read More Button */}
                      <div className="pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="btn-outline-glow group"
                          asChild
                        >
                          <Link to={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* More Content Coming Soon */}
            <div className="text-center mt-16 py-12 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">More Articles Coming Soon</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm constantly working on new content covering AI development, software architecture,
                and emerging technologies. Stay tuned for more insights and tutorials.
              </p>
              <NewsletterDialog>
                <Button variant="outline" className="btn-outline-glow">
                  Get Notified
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </NewsletterDialog>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;