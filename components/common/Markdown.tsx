// 这是对话列表中出现需要markdown段落时的组件，用于显示引号内加粗、代码块、高亮等

import { memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// 这个组件接收和内部组件相同的属性
function Markdown({ children, className = "", ...props }: Options) {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              style={a11yDark}
              language={match?.[1] ?? ""}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      className={`markdown prose dark:prose-invert ${className}`}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
}
// memo主要用于避免重复渲染，默认情况下父组件渲染，子组件也会渲染
// 如果使用memo函数包裹组件，只有当传递给组件的参数变化时，才会重新渲染组件
export default memo(Markdown);
