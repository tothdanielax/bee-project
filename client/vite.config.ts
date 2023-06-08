import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@styles': path.resolve(__dirname, './src/assets/styles'),
            '@config': path.resolve(__dirname, './src/config'),
            '@context': path.resolve(__dirname, './src/context'),
            '@services': path.resolve(__dirname, './src/services'),
            '@layout': path.resolve(__dirname, './src/layout'),
            '@features': path.resolve(__dirname, './src/features'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    }
})
