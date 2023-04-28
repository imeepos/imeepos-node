import { load } from "cheerio";
import { build, BuildOptions } from "esbuild";
import { extname, join } from "path";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import { ensureDirSync, readFileSync, writeFileSync } from "fs-extra";
const { sassPlugin } = require("esbuild-sass-plugin");

export async function render(template: string, locals: any) {
    const content = readFileSync(join(locals.root, template))
    const $ = load(content);
    const head = $("head");
    locals.meta.title && $("title").text(locals.meta.title);
    locals.meta.keywords && head.append(
        `<meta name="keywords" content="${locals.meta.keywords || ""}"></meta>\n`
    );
    locals.meta.description && head.append(
        `<meta name="description" content="${locals.meta.description || ""
        }"></meta>\n`
    );
    locals.meta.author && head.append(
        `<meta name="author" content="${locals.meta.author || ""}"></meta>\n`
    );
    locals.meta.version && head.append(
        `<meta name="version" content="${locals.meta.version || ""}"></meta>\n`
    );
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
    const options: BuildOptions = {
        entryPoints: [
            ...links.map((link) => join(locals.root, link)),
            ...scripts.map((link) => join(locals.root, link)),
        ],
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
    await build(options);
    const html = $.html();
    ensureDirSync(staticRoot)
    writeFileSync(join(staticRoot, template), html)
    return join(staticRoot, template);
}
