import { load } from "cheerio";
import { build, BuildOptions, context } from "esbuild";
import { extname, join } from "path";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import { ensureDirSync, readFileSync, writeFileSync } from "fs-extra";
import { watch as watchFileChange } from 'chokidar';
const { sassPlugin } = require("esbuild-sass-plugin");

export async function render(template: string, locals: any) {
    const content = readFileSync(join(locals.root, template))
    const $ = load(content);
    const links: string[] = [];
    $("link").each((i, el) => {
        const href = $(el).attr('href')
        if (href) {
            links.push(href);
            const ext = extname(href)
            const output = href.replace(ext, '.css')
            $(el).attr('href', output)
        }
    });
    const scripts: string[] = [];
    $("script").each((i, el) => {
        const src = $(el).attr('src')
        if (src) {
            scripts.push(src);
            const ext = extname(src)
            const output = src.replace(ext, '.js')
            $(el).attr('src', output)
        }
    });
    const root = process.cwd();
    const staticRoot = join(root, "attachments", locals.name || '', locals.version || 'v1');
    const entryPoints = [
        ...links.map((link) => join(locals.root, link)),
        ...scripts.map((link) => join(locals.root, link)),
        join(locals.root, template)
    ]
    if (entryPoints.length > 0) {
        const options: BuildOptions = {
            entryPoints,
            target: [
                'es2015',
                'chrome58',
                'edge16',
                'firefox57',
                'node12',
                'safari11',
            ],
            platform: "browser",
            outdir: staticRoot,
            bundle: true,
            minify: true,
            sourcemap: true,
            loader: {
                ".svg": "copy",
                ".html": "copy",
                ".json": "copy",
                ".png": "copy",
                ".jpg": "copy",
            },
            define: {},
            plugins: [
                sassPlugin({
                    async transform(source: string) {
                        const { css } = await postcss([autoprefixer()]).process(source, {
                            from: undefined,
                        });
                        return css;
                    },
                }),
            ],
        };
        await build(options);
    }
    const html = $.html();
    ensureDirSync(staticRoot)
    writeFileSync(join(staticRoot, template), html)
    return join(staticRoot, template);
}
export interface RenderOptions {
    html: string;
}
export async function renders(root: string, name: string, version: string, htmls: string[], watch: boolean = false) {
    const appRoot = process.cwd()
    const staticRoot = join(appRoot, "attachments", name || '', version || 'v1');
    const entryPoints = htmls.map(html => {
        const sources = getSources(root, html)
        return [
            ...sources,
            join(root, html)
        ]
    }).flat()
    if (entryPoints.length > 0) {
        const options: BuildOptions = {
            entryPoints: entryPoints,
            target: "chrome58",
            platform: "browser",
            outdir: staticRoot,
            bundle: true,
            minify: true,
            sourcemap: false,
            loader: {
                ".svg": "copy",
                ".html": "copy",
                ".json": "copy",
                ".png": "copy",
                ".jpg": "copy",
            },
            plugins: [
                sassPlugin({
                    async transform(source: string) {
                        const { css } = await postcss([autoprefixer()]).process(source, {
                            from: undefined,
                        });
                        return css;
                    },
                }),
            ],
        };
        const ctx = await context(options)
        if (watch) {
            watchFileChange(entryPoints).on('all', () => {
                ctx.rebuild().then(() => {
                    htmls.map(html => {
                        return buildHtml(root, html, staticRoot)
                    })
                })
            })
        }
    }
    htmls.map(html => {
        return buildHtml(root, html, staticRoot)
    })
}

function buildHtml(root: string, html: string, output: string) {
    const content = readFileSync(join(root, html))
    const $ = load(content);
    $("link").each((i, el) => {
        const href = $(el).attr('href')
        if (href) {
            const ext = extname(href)
            const output = href.replace(ext, '.css')
            $(el).attr('href', output)
        }
    });
    $("script").each((i, el) => {
        const src = $(el).attr('src')
        if (src) {
            const ext = extname(src)
            const output = src.replace(ext, '.js')
            $(el).attr('src', output)
        }
    });
    ensureDirSync(output)
    writeFileSync(join(output, html), $.html())
    return join(output, html)
}

export function getSources(root: string, html: string) {
    const content = readFileSync(join(root, html))
    const $ = load(content);
    const links: string[] = [];
    $("link").each((i, el) => {
        const href = $(el).attr('href')
        if (href) {
            links.push(href);
        }
    });
    const scripts: string[] = [];
    $("script").each((i, el) => {
        const src = $(el).attr('src')
        if (src) {
            scripts.push(src);
        }
    });
    return [...links, ...scripts].map(src => join(root, src))
}