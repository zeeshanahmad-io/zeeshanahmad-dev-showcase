import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { getAllPosts, formatDate } from '@/utils/blogUtils';
import Navigation from '@/components/Navigation';

const Blog = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-accent">
                Tech Insights & Innovations
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Exploring the intersection of AI, full-stack development, and enterprise solutions. 
                Insights from the trenches of building scalable software systems.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.slug} className="portfolio-card overflow-hidden group">
                  {/* Featured Image */}
                  <div className="relative overflow-hidden h-48">
                    <div className="w-full h-full bg-gradient-elegant flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-lg font-semibold">{post.title.split(':')[0]}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 space-y-4">
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;