module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  safelist: [
    'prose',
    'prose-invert',
    'lg:prose-xl',
    'markdown-content',
    'markdown-content h1',
    'markdown-content h2',
    'markdown-content h3',
    'markdown-content h4',
    'markdown-content h5',
    'markdown-content h6',
    'markdown-content p',
    'markdown-content a',
    'markdown-content ul',
    'markdown-content ol',
    'markdown-content li',
    'markdown-content code',
    'markdown-content pre',
    'markdown-content blockquote',
    'markdown-content img',
    'markdown-content table',
    'markdown-content th',
    'markdown-content td',
    'markdown-content hr'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
            h1: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h2: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h3: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
            },
            h4: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.bold'),
            },
            h5: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.bold'),
            },
            h6: {
              color: theme('colors.white'),
              fontSize: theme('fontSize.sm'),
              fontWeight: theme('fontWeight.bold'),
            },
            strong: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
              padding: theme('spacing.1'),
              borderRadius: theme('borderRadius.default'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.200'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.blue.500'),
            },
            ul: {
              listStyleType: 'disc',
            },
            ol: {
              listStyleType: 'decimal',
            },
            li: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
            },
            table: {
              borderColor: theme('colors.gray.700'),
            },
            th: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.800'),
            },
            td: {
              borderColor: theme('colors.gray.700'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            figcaption: {
              color: theme('colors.gray.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}