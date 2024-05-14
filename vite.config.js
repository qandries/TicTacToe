import react from "@vitejs/plugin-react";
import dns from "dns";
import path from "path";
import { defineConfig, loadEnv } from "vite";
// import eslint from "vite-plugin-eslint";

dns.setDefaultResultOrder("verbatim");

export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            __APP_VERSION__: JSON.stringify(env.npm_package_version),
        },
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "./src"),
            },
        },
        build: {
            outDir: "build",
            manifest: true,
            sourcemap: false,
        },
        plugins: [
            react(),
            // eslint(),
        ],
        server: {
            open: true,
            port: 4000
        },
    };
});
