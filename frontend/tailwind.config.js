
module.exports = {
              purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
              content: [
                            "./index.html",
                            "./src/**/*.{vue,js,ts,jsx,tsx}",],
              theme: {
                            extend: {
                                          colors: {
                                                        sidebarGreen: '#04aa6d'
                                          }
                            },
              },
              plugins: [],
}