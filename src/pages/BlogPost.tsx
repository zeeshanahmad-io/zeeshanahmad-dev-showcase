import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, User, Clock, List, ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Markdoc, { Tag } from '@markdoc/markdoc';
import { getPostBySlug, formatDate, type BlogPost as BlogPostType } from '@/utils/blogUtils';

import { NewsletterDialog } from '@/components/NewsletterDialog';
import { Helmet } from 'react-helmet-async';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showToc, setShowToc] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        try {
          const postData = await getPostBySlug(slug);
          if (postData) {
            setPost(postData);
            // Generate table of contents from headings
            const headings = postData.content.match(/^#{2,3}\s+(.+)$/gm);
            if (headings) {
              const toc = headings.map((heading, index) => {
                const level = heading.match(/^#+/)?.[0].length || 2;
                const title = heading.replace(/^#+\s+/, '');
                const id = `heading-${index}`;
                return { id, title, level };
              });
              setTableOfContents(toc);
            }
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

  useEffect(() => {
    // Disable scroll spy on mobile to prevent flickering
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Handle scroll spy for active section with throttling
    let ticking = false;

    const handleScroll = () => {
      if (isScrolling || ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const headings = document.querySelectorAll('h2, h3');
        const scrollPosition = window.scrollY + 100;

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i] as HTMLElement;
          if (heading.offsetTop <= scrollPosition) {
            setActiveSection(heading.id);
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust timeout as needed
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

        {/* Open Graph Meta Tags for Blog Post */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://zeeshanahmad.dev/blog/${post.slug}`} />
        <meta property="og:image" content={post.featured_image || 'https://static.toastmynetwork.com/zeeshanahmad.jpg'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Article Meta Tags */}
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.published_date} />
        {post.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featured_image || 'https://static.toastmynetwork.com/zeeshanahmad.jpg'} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://zeeshanahmad.dev/blog/${post.slug}`} />

        {/* JSON-LD Structured Data for BlogPosting */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featured_image || 'https://static.toastmynetwork.com/zeeshanahmad.jpg',
            "author": {
              "@type": "Person",
              "name": post.author,
              "url": "https://zeeshanahmad.dev"
            },
            "publisher": {
              "@type": "Person",
              "name": "Zeeshan Ahmad",
              "logo": {
                "@type": "ImageObject",
                "url": "https://static.toastmynetwork.com/zeeshanahmad.jpg"
              }
            },
            "datePublished": post.published_date,
            "dateModified": post.published_date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://zeeshanahmad.dev/blog/${post.slug}`
            },
            "keywords": post.tags?.join(', ') || ''
          })}
        </script>

        {/* JSON-LD Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://zeeshanahmad.dev"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://zeeshanahmad.dev/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://zeeshanahmad.dev/blog/${post.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

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
        <article className="py-12" style={{ willChange: 'auto' }}>
          <div className="container mx-auto px-3 sm:px-6">
            <div className="flex gap-0 xl:gap-12 mx-auto relative">
              {/* Table of Contents - Desktop Sidebar */}
              {tableOfContents.length > 0 && (
                <aside className="hidden xl:block w-80 shrink-0">
                  <div className="sticky top-24">
                    <div className="bg-muted/30 rounded-lg p-6 border">
                      <div className="flex items-center gap-2 mb-4">
                        <List className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-foreground">Table of Contents</h3>
                      </div>
                      <nav className="space-y-2">
                        {tableOfContents.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left text-sm transition-colors hover:text-primary ${item.level === 3 ? 'pl-4' : ''
                              } ${activeSection === item.id
                                ? 'text-primary font-medium'
                                : 'text-muted-foreground'
                              }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </aside>
              )}

              {/* Main Content */}
              <div className="flex-1 max-w-4xl">
                {/* Mobile Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="xl:hidden mb-12">
                    <Button
                      variant="outline"
                      onClick={() => setShowToc(!showToc)}
                      className="w-full justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Table of Contents
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${showToc ? 'rotate-90' : ''}`} />
                    </Button>
                    {showToc && (
                      <div className="mt-4 bg-muted/30 rounded-lg p-4 border">
                        <nav className="space-y-2">
                          {tableOfContents.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                scrollToSection(item.id);
                                setShowToc(false);
                              }}
                              className={`block w-full text-left text-sm transition-colors hover:text-primary ${item.level === 3 ? 'pl-4' : ''
                                } ${activeSection === item.id
                                  ? 'text-primary font-medium'
                                  : 'text-muted-foreground'
                                }`}
                            >
                              {item.title}
                            </button>
                          ))}
                        </nav>
                      </div>
                    )}
                  </div>
                )}

                <div className="w-full" style={{ maxWidth: '100%', boxSizing: 'border-box', paddingLeft: '0', paddingRight: '0' }}>
                  <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', maxWidth: '100%', width: '100%', boxSizing: 'border-box', willChange: 'auto' }}>
                    {(() => {
                      const ast = Markdoc.parse(post.content);
                      const content = Markdoc.transform(ast, {
                        nodes: {
                          heading: { render: 'Heading', attributes: { level: { type: Number } } },
                          paragraph: { render: 'Paragraph' },
                          list: { render: 'List', attributes: { ordered: { type: Boolean } } },
                          item: { render: 'ListItem' },
                          fence: { render: 'CodeBlock', attributes: { language: { type: String }, content: { type: String } } },
                          code: { render: 'InlineCode', attributes: { content: { type: String } } },
                          blockquote: { render: 'Blockquote' },
                          link: { render: 'Link', attributes: { href: { type: String } } },
                          table: { render: 'Table' },
                          thead: { render: 'TableHead' },
                          tbody: { render: 'TableBody' },
                          tr: { render: 'TableRow' },
                          th: { render: 'TableHeader' },
                          td: { render: 'TableCell' },
                          image: { render: 'Image', attributes: { src: { type: String }, alt: { type: String }, title: { type: String } } },
                        },
                        tags: {
                          table: {
                            render: 'Table',
                            transform(node, config) {
                              const children = node.transformChildren(config);

                              // Filter out non-list children (like thematic breaks) and ensure they are Tags
                              const lists = children.filter((child): child is Tag =>
                                child instanceof Tag && (child.name === 'List' || child.name === 'list')
                              );

                              // If no lists found (e.g. standard table or other content), render as div to avoid invalid nesting
                              if (lists.length === 0) return new Tag('div', {}, children);

                              // First list is the header
                              const headerList = lists[0];
                              const headerItems = headerList.children.filter((child): child is Tag =>
                                child instanceof Tag && (child.name === 'ListItem' || child.name === 'item')
                              );

                              const thead = new Tag('TableHead', {}, [
                                new Tag('TableRow', {},
                                  headerItems.map((item) =>
                                    new Tag('TableHeader', {}, item.children)
                                  )
                                )
                              ]);

                              // Remaining lists are body rows
                              const bodyLists = lists.slice(1);
                              const tbody = new Tag('TableBody', {},
                                bodyLists.map((list) => {
                                  const listItems = list.children.filter((child): child is Tag =>
                                    child instanceof Tag && (child.name === 'ListItem' || child.name === 'item')
                                  );
                                  return new Tag('TableRow', {},
                                    listItems.map((item) =>
                                      new Tag('TableCell', {}, item.children)
                                    )
                                  )
                                })
                              );

                              return new Tag('Table', {}, [thead, tbody]);
                            }
                          },
                        }
                      });
                      return Markdoc.renderers.react(content, React, {
                        components: {
                          Heading: ({ level, children }: { level: number, children: React.ReactNode }) => {
                            const text = React.Children.toArray(children).join('');
                            const index = tableOfContents.findIndex(item => item.title === text);
                            const id = index >= 0 ? `heading-${index}` : undefined;

                            if (level === 2) {
                              const isFirstH2 = index === 0;
                              return (
                                <>
                                  {isFirstH2 && post.featured_image && (
                                    <div className="mb-12">
                                      <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full rounded-lg shadow-lg"
                                      />
                                    </div>
                                  )}
                                  <h2
                                    id={id}
                                    className="text-2xl font-semibold mb-4 mt-8 text-primary scroll-mt-24"
                                  >
                                    {children}
                                  </h2>
                                </>
                              );
                            }
                            if (level === 3) {
                              return (
                                <h3
                                  id={id}
                                  className="text-xl font-semibold mb-3 mt-6 text-foreground scroll-mt-24"
                                >
                                  {children}
                                </h3>
                              );
                            }
                            return null;
                          },
                          Paragraph: ({ children }: { children: React.ReactNode }) => (
                            <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                          ),
                          List: ({ ordered, children }: { ordered: boolean, children: React.ReactNode }) => {
                            return ordered ? (
                              <ol className="mb-4 ml-6 list-decimal text-muted-foreground">{children}</ol>
                            ) : (
                              <ul className="mb-4 ml-6 list-disc text-muted-foreground">{children}</ul>
                            );
                          },
                          ListItem: ({ children }: { children: React.ReactNode }) => (
                            <li className="mb-1">{children}</li>
                          ),
                          CodeBlock: ({ children, language, content }: { children?: React.ReactNode, language: string, content?: string }) => {
                            const codeContent = content || (typeof children === 'string' ? children : '');
                            return (
                              <div className="mb-4 rounded-lg overflow-hidden border border-border">
                                <SyntaxHighlighter
                                  language={language || 'text'}
                                  style={vscDarkPlus}
                                  customStyle={{ margin: 0, borderRadius: 0 }}
                                  showLineNumbers={true}
                                  wrapLines={true}
                                  wrapLongLines={true}
                                >
                                  {codeContent}
                                </SyntaxHighlighter>
                              </div>
                            );
                          },
                          InlineCode: ({ children, content }: { children?: React.ReactNode, content?: string }) => (
                            <code className="px-1.5 py-0.5 bg-muted text-foreground rounded text-sm font-mono">
                              {content || children}
                            </code>
                          ),
                          Blockquote: ({ children }: { children: React.ReactNode }) => (
                            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/50 rounded-r">
                              {children}
                            </blockquote>
                          ),
                          Link: ({ href, children }: { href: string, children: React.ReactNode }) => (
                            <a
                              href={href}
                              className="text-primary underline hover:opacity-80"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                          Table: ({ children }: { children: React.ReactNode }) => (
                            <div className="my-6 overflow-x-auto rounded-lg border border-border">
                              <table className="w-full text-left">{children}</table>
                            </div>
                          ),
                          TableHead: ({ children }: { children: React.ReactNode }) => <thead className="bg-muted/50">{children}</thead>,
                          TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
                          TableRow: ({ children }: { children: React.ReactNode }) => <tr className="border-b border-border last:border-b-0">{children}</tr>,
                          TableHeader: ({ children }: { children: React.ReactNode }) => <th className="p-4 font-semibold text-foreground">{children}</th>,
                          TableCell: ({ children }: { children: React.ReactNode }) => <td className="p-4 align-top text-muted-foreground">{children}</td>,
                          Image: ({ src, alt, title }: { src: string, alt: string, title?: string }) => (
                            <figure className="my-8">
                              <img
                                src={src}
                                alt={alt}
                                title={title}
                                className="w-full rounded-lg shadow-lg border border-border"
                              />
                              {title && (
                                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                                  {title}
                                </figcaption>
                              )}
                            </figure>
                          ),
                        }
                      });
                    })()}
                  </div>
                </div>
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
                <NewsletterDialog>
                  <Button>
                    <Bell className="w-5 h-5 mr-2" />
                    Get Notified
                  </Button>
                </NewsletterDialog>
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