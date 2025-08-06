import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { h } from "preact"

const ExternalLinkButton = () =>
  h(
    "a",
    {
      href: "https://www.travellings.cn/go.html", // Travelling 链接
      target: "_blank",
      rel: "noopener noreferrer",
      title: "开往-友链接力",
      style: {
        padding: "0",
        display: "flex",
        alignItems: "center",
      },
    },
    h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 640",
        width: "24",
        height: "24",
        fill: "currentColor",
        style: {
          marginTop: "-4px", // 向上偏移 4px 调整对齐
        },
      },
      h("path", {
        d: "M128 160C128 107 171 64 224 64L416 64C469 64 512 107 512 160L512 416C512 456.1 487.4 490.5 452.5 504.8L506.4 568.5C515 578.6 513.7 593.8 503.6 602.3C493.5 610.8 478.3 609.6 469.8 599.5L395.8 512L244.5 512L170.5 599.5C161.9 609.6 146.8 610.9 136.7 602.3C126.6 593.7 125.3 578.6 133.9 568.5L187.8 504.8C152.6 490.5 128 456.1 128 416L128 160zM192 192L192 288C192 305.7 206.3 320 224 320L296 320L296 160L224 160C206.3 160 192 174.3 192 192zM344 320L416 320C433.7 320 448 305.7 448 288L448 192C448 174.3 433.7 160 416 160L344 160L344 320zM224 448C241.7 448 256 433.7 256 416C256 398.3 241.7 384 224 384C206.3 384 192 398.3 192 416C192 433.7 206.3 448 224 448zM448 416C448 398.3 433.7 384 416 384C398.3 384 384 398.3 384 416C384 433.7 398.3 448 416 448C433.7 448 448 433.7 448 416z",
      })
    )
  )

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/PrideWood",
      "douban": "https://www.douban.com/people/PW2018",
      "bilibili": "https://space.bilibili.com/28065777",
      "rednote": "https://www.xiaohongshu.com/user/profile/5db8680b0000000001000e14",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
        { Component: ExternalLinkButton }, // 添加“开往”链接
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    // Component.Graph(),
    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
