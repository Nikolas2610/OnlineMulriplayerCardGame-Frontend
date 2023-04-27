/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'w-1/12',
    'w-2/12',
    'w-3/12',
    'w-4/12',
    'absolute',
    'bg-primary',
    'bg-secondary',
    'flex-col',
    'flex-wrap',
    'gap-1',
    'gap-2',
    'gap-x-2',
    'gap-x-4',
    'gap-y-2',
    'gap-y-4',
    'gap-4',
    'gap-6',
    'gap-8',
    'gap-10',
    'justify-center',
    'justify-start',
    'justify-end',
    'justify-between',
    'justify-around',
    'items-center',
    'items-start',
    'items-end',
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'row-span-1',
    'row-span-2',
    'row-span-3',
    'row-span-4',
    'row-span-5',
    'row-span-6',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
    'grid-cols-11',
    'grid-cols-12',
    'grid-rows-1',
    'grid-rows-2',
    'grid-rows-3',
    'grid-rows-4',
    'grid-rows-5',
    'grid-rows-6',
    'grid-rows-7',
    'grid-rows-8',
    'grid-rows-9',
    'grid-rows-10',
    'grid-rows-11',
    'grid-rows-12',
    'sm:grid-cols-2',
    'sm:grid-cols-3',
    'sm:grid-cols-4',
    'sm:grid-cols-5',
    'sm:grid-cols-6',
    'md:grid-cols-2',
    'md:grid-cols-3',
    'md:grid-cols-4',
    'md:grid-cols-5',
    'md:grid-cols-6',
    'lg:grid-cols-2',
    'lg:grid-cols-3',
    'lg:grid-cols-4',
    'lg:grid-cols-5',
    'lg:grid-cols-6',
    'w-[800px]',
    'w-[1200px]',
    'w-[1000px]',
    'h-[800px]',
    'h-[600px]',
    'h-[300px]',
    'h-[200px]', 
    'h-[150px]',
    'h-[120px]',
    'h-[100px]',
    'h-[85.7px]',
    'h-[75px]',
    'h-[66.7px]', 
    'h-[60px]',
    'h-[54.5px]',
    'h-[50px]',
    'h-[800px]',
    'h-[400px]',
    'h-[266.7px]',
    'h-[200px]',
    'h-[160px]',
    'h-[133.3px]',
    'h-[114.3px]',
    'h-[100px]',
    'h-[88.9px]',
    'h-[80px]',
    'h-[72.7px]',
    'h-[66.7px]',
    'h-[1000px]',
    'h-[500px]',
    'h-[333.3px]',
    'h-[250px]',
    'h-[166.7px]',
    'h-[142.9px]',
    'h-[125px]',
    'h-[111.1px]',
    'h-[90.9px]',
    'h-[83.3px]',
    'h-[1200px]',
    'h-[600px]',
    'h-[300px]',
    'h-[240px]',
    'h-[171.4px]',
    'h-[150px]',
    'h-[120px]',
    'h-[109.1px]',
    'flex-col-reverse',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4E9F3D',
        'secondary': '#1E5128',
        'dark': '#191A19',
        'dark-smooth': '#1e1e1e',
        'light': '#D8E9A8',
        'info': '#87ceeb',
        'light-blue': '#318F8A'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '2rem',
          '2xl': '2rem',
        },
        center: true,
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
}
