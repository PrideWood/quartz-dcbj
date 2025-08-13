import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            columnGap: "8px",     // 左右间距
            rowGap: "4px",        // ← 关键：两行之间不加额外空隙
            alignItems: "baseline",
            lineHeight: "1.4",    // 可按你的主题调
            margin: "0 0 19px 0",
          }}
        >
          {/* 第一行左侧 */}
          <span>
            {i18n(cfg.locale).components.footer.createdWith}{" "}
            <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
          </span>

          {/* 第一行右侧 */}
          <a
            href="#share-this-page"
            title="复制本文短链"
            style={{ textDecoration: "none", opacity: 0.9, justifySelf: "end" }}
          >
            🔗分享本页
          </a>

          {/* 第二行（占满整行） */}
          <span style={{ gridColumn: "1 / -1" }}>
            <a href="https://icp.gov.moe/?keyword=20251412" target="_blank">萌ICP备20251412号</a>
            <a
              href="https://www.travellings.cn/go.html"
              target="_blank"
              rel="noopener"
              title="开往-友链接力"
              style={{ marginLeft: 8 }}
            >
              🚇Travelling
            </a>
          </span>
        </p>

        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer >
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
