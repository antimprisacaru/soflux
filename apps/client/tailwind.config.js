module.exports = {
    theme: {
        extend: {}
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            cursor: ['disabled'],
            backgroundColor: ['disabled']
        }
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography')
    ]
};
