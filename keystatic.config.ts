import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: process.env.NODE_ENV === 'development'
        ? { kind: 'local' }
        : { kind: 'cloud' },
    cloud: {
        project: 'zeeshanahmad-io/zeeshan-dev-showcase',
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'slug',
            path: 'blogs/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title' }),
                slug: fields.text({ label: 'Slug', description: 'The filename of the post (without extension)' }),
                excerpt: fields.text({ label: 'Excerpt', multiline: true }),
                author: fields.text({ label: 'Author' }),
                published_date: fields.date({ label: 'Published Date' }),
                featured_image: fields.image({
                    label: 'Featured Image',
                    directory: 'public/images/blogs',
                    publicPath: '/images/blogs/',
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tags',
                    itemLabel: (props) => props.value,
                }),
                featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    tables: true,
                    images: {
                        directory: 'public/images/blogs',
                        publicPath: '/images/blogs/',
                    },
                }),
            },
        }),
    },
});
