import { rollupVersion } from 'vite'
import restart from 'vite-plugin-restart'

export default {
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../public/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    // {
    //     outDir: '../dist', // Output in the dist/ folder
    //     rollupOptions: {
    //         input: {
    //             '0-10': '/src/0-10/index.html',
    //             '11-material': '/src/11-material/index.html',
    //             '12-3dtext': '/src/12-3dtext/index.html',
    //             '14-light': '/src/14-light/index.html',
    //             '15-shadows': '/src/15-shadows/index.html',
    //             '16-house': '/src/16-house/index.html',
    //             // Add more entries as needed
    //         }
    //     },
    //     emptyOutDir: true, // Empty the folder first
    //     sourcemap: true // Add sourcemap
    // },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }) // Restart server on static file change
    ],
}
