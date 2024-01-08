import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/lib/main.js'),
            name: 'VueWorkflowChart',
            fileName: 'vue-workflow-chart',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'vue-workflow-chart.css';
                    }
                    return assetInfo.name;
                },
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
