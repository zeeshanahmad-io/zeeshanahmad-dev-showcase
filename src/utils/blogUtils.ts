import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_date: string;
  author: string;
  featured_image?: string;
  tags?: string[];
}

// Mock blog posts data
const mockPosts: BlogPost[] = [
  {
    slug: 'ai-powered-development-future',
    title: 'The Future of AI-Powered Development: Lessons from Oracle',
    excerpt: 'Exploring how artificial intelligence is revolutionizing software development, based on my experience building AI-powered dataflow assistants at Oracle.',
    content: `# The Future of AI-Powered Development: Lessons from Oracle

As a Principal Member of Technical Staff at Oracle, I've had the unique opportunity to lead the development of AI-powered solutions that are transforming how developers interact with complex systems. In this post, I'll share insights from building our AI-powered dataflow assistant and what it means for the future of development.

## The Challenge

When we started the dataflow assistant project, the challenge was clear: enable users to create and edit complex dataflows using natural language, without compromising on precision or functionality.

## Our Approach

We engineered a novel approach using Python as a communication language with LLMs, ensuring compact and intuitive representation of complex dataflows with branching and joins.

### Key Innovations

1. **Advanced Prompt Engineering**: We applied sophisticated prompt engineering techniques to reduce token size and eliminate syntax bleeding.

2. **Chain-of-Thought Reasoning**: Implemented guardrails using diagnostic LLM API calls for internal checks.

3. **Embedding Integration**: Deployed advanced topics like embedding to reduce LLM call burden and minimize token size.

## The Results

Our solution has transformed how users interact with dataflows, making complex operations accessible through natural language while maintaining enterprise-grade reliability.

## Looking Forward

The future of development lies in intelligent assistance that enhances human creativity rather than replacing it. AI-powered tools will become extensions of developer intuition, enabling us to focus on innovation rather than syntax.
`,
    published_date: '2024-01-15',
    author: 'Zeeshan Ahmad',
    featured_image: '/images/blogs/ai-development.jpg',
    tags: ['AI', 'Development', 'Oracle', 'Machine Learning']
  },
  {
    slug: 'building-scalable-healthcare-platforms',
    title: 'Building Scalable Healthcare Platforms: Technical Deep Dive',
    excerpt: 'A comprehensive look at the architecture and engineering decisions behind building modern healthcare platforms like DocScale and Dr. Faiyaz Ahmad Clinic.',
    content: `# Building Scalable Healthcare Platforms: Technical Deep Dive

Healthcare technology requires a unique blend of reliability, scalability, and user experience. Having built multiple healthcare platforms including DocScale and Dr. Faiyaz Ahmad's clinic website, I want to share key architectural decisions and lessons learned.

## The Healthcare Technology Landscape

Healthcare platforms face unique challenges:
- Regulatory compliance requirements
- Critical reliability needs
- Complex user workflows
- Integration with existing systems

## Technical Architecture

### Frontend Stack
- **React + TypeScript**: For type safety and maintainability
- **Tailwind CSS**: For consistent, responsive design
- **Responsive Design**: Mobile-first approach for accessibility

### Backend Considerations
- **API-First Design**: Enabling future integrations
- **Security by Design**: HIPAA compliance considerations
- **Performance Optimization**: Fast load times for better user experience

## Key Features Implemented

### 1. Online Appointment Booking
Built a seamless booking system that integrates with calendar systems and sends automated confirmations.

### 2. Professional Email Integration
Integrated with Zoho Mail for professional communication while maintaining brand consistency.

### 3. Content Management
Developed a markdown-based blog system for thought leadership and patient education.

## Deployment and CI/CD

Utilized Netlify for:
- Automated deployments
- SSL certificates
- Global CDN distribution
- Form handling

## Lessons Learned

1. **User Experience is Critical**: Healthcare users need intuitive interfaces
2. **Performance Matters**: Every second counts in healthcare scenarios
3. **Compliance from Day One**: Build security and compliance into the foundation

The future of healthcare technology lies in platforms that seamlessly blend clinical expertise with technological innovation.
`,
    published_date: '2024-02-20',
    author: 'Zeeshan Ahmad',
    featured_image: '/images/blogs/healthcare-tech.jpg',
    tags: ['Healthcare', 'Web Development', 'React', 'Architecture']
  },
  {
    slug: 'native-macos-development-python',
    title: 'Native macOS Development with Python: KeepMacAwake Case Study',
    excerpt: 'How I built and launched a native macOS application using Python, from development to App Store distribution.',
    content: `# Native macOS Development with Python: KeepMacAwake Case Study

Building native macOS applications with Python might seem unconventional, but it offers unique advantages for certain types of applications. Let me walk you through the journey of building KeepMacAwake.

## The Problem

Mac users often face the frustration of their systems going to sleep during important tasks like downloads, builds, or long-running processes. While there are built-in solutions, they're often buried in system preferences or require command-line knowledge.

## Why Python for macOS Development?

### Advantages
- **Rapid Development**: Python's simplicity accelerates development
- **Rich Ecosystem**: Access to powerful libraries
- **Cross-Platform Potential**: Easy to port to other platforms

### Challenges
- **Performance**: Not as fast as native Swift/Objective-C
- **Distribution**: Requires packaging solutions
- **System Integration**: Limited compared to native frameworks

## Technical Implementation

### Core Functionality
\`\`\`python
import Cocoa
from Cocoa import NSWorkspace

class MacAwakeController:
    def __init__(self):
        self.assertion_id = None
    
    def prevent_sleep(self):
        # Prevent system sleep using IOKit
        pass
    
    def allow_sleep(self):
        # Release sleep prevention
        pass
\`\`\`

### System Integration
The app integrates with macOS at the system level to:
- Prevent system sleep
- Monitor system state
- Provide menu bar interface
- Handle user preferences

## Packaging and Distribution

### Creating the .dmg
Used \`py2app\` for creating the macOS application bundle:
- Bundle Python interpreter
- Include all dependencies
- Create installer package
- Code signing for security

### Distribution Strategy
- Direct download from website
- Clear installation instructions
- Automatic updates mechanism

## Lessons Learned

1. **User Experience**: Simple interfaces often mask complex implementations
2. **System APIs**: Understanding macOS APIs is crucial for system-level apps
3. **Distribution**: Packaging Python apps for macOS requires careful consideration

## Results

KeepMacAwake has been successfully adopted by Mac users who need a simple, reliable solution for preventing system sleep during important tasks.

The project demonstrates that Python can be a viable option for certain types of native macOS development, especially for utility applications.
`,
    published_date: '2024-03-10',
    author: 'Zeeshan Ahmad',
    featured_image: '/images/blogs/macos-python.jpg',
    tags: ['Python', 'macOS', 'Native Development', 'Desktop Apps']
  }
];

export const getAllPosts = (): BlogPost[] => {
  return mockPosts.sort((a, b) => 
    new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  );
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return mockPosts.find(post => post.slug === slug);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};