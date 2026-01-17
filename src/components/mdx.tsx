import { Link } from "waku";
import { Code as MyCode } from "@/components/code";
import { getAnchor } from "@/utils/get-anchor";
import { RawCode } from "codehike/code";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

export const components = {
  Code: ({ codeblock }: { codeblock: RawCode }) => {
    // We pass the codeblock to your existing Code component
    // Note: In Code Hike 1.0, the content is in codeblock.value
    return <MyCode codeblock={codeblock} />;
  },
  h2: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <Heading
        id={id}
        level={2}
        className="mt-16 mb-2 scroll-mt-16 text-3xl leading-none font-bold text-balance first:mt-0 sm:text-[2.75rem] xl:mt-20 xl:scroll-mt-20"
        {...rest}
      >
        <a href={`#${id}`}>{children}</a>
      </Heading>
    );
  },
  h3: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <Heading
        level={3}
        id={id}
        className="mt-8 mb-2 scroll-mt-8 text-xl leading-none font-bold text-balance sm:text-3xl"
        {...rest}
      >
        <a href={`#${id}`}>{children}</a>
      </Heading>
    );
  },
  h4: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <Heading
        level={4}
        id={id}
        className="mt-8 mb-2 scroll-mt-8 text-lg leading-none font-bold tracking-wide text-balance uppercase sm:text-xl"
        {...rest}
      >
        <a href={`#${id}`}>{children}</a>
      </Heading>
    );
  },
  p: ({ children, ...rest }: any) => {
    return (
      <Text
        className="mb-4 text-sm leading-normal font-normal text-pretty sm:text-lg lg:text-xl"
        {...rest}
      >
        {children}
      </Text>
    );
  },
  strong: ({ children, ...rest }: any) => {
    return (
      <b className="font-bold" {...rest}>
        {children}
      </b>
    );
  },
  em: ({ children, ...rest }: any) => {
    return (
      <i className="italic" {...rest}>
        {children}
      </i>
    );
  },
  a: ({ href, children, ...rest }: any) => {
    const classNames =
      "text-info-subtle-fg underline decoration-info-subtle-fg decoration-1 transition-colors duration-300 ease-in-out hover:text-primary hover:decoration-primary";

    if (href.startsWith("/")) {
      <Link to={href} className={classNames} {...rest}>
        {children}
      </Link>;
    }

    return (
      <a href={href} className={classNames} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  ul: ({ children, ...rest }: any) => {
    return (
      <ul
        className="text-muted-fg mb-4 ml-4 list-disc text-base/6 leading-normal font-normal sm:text-sm/6 lg:text-xl"
        {...rest}
      >
        {children}
      </ul>
    );
  },
  ol: ({ children, ...rest }: any) => {
    return (
      <ol
        className="text-muted-fg mb-4 ml-4 list-decimal text-base/6 leading-normal font-normal sm:text-sm/6 lg:text-xl"
        {...rest}
      >
        {children}
      </ol>
    );
  },
  code: ({ children, ...rest }: any) => {
    return (
      <span
        className="-my-0.5 inline-block rounded-sm bg-gray-900 px-1.5 py-px font-mono text-[13px] text-white/80 sm:text-base sm:group-[.blockquote]:text-sm"
        {...rest}
      >
        {children}
      </span>
    );
  },
  pre: ({ children, ...rest }: any) => {
    return (
      <span
        className="-my-0.5 inline-block rounded-sm bg-gray-900 px-1.5 py-px font-mono text-[13px] text-white/80 sm:text-base sm:group-[.blockquote]:text-sm"
        {...rest}
      >
        {children}
      </span>
    );
  },
  blockquote: ({ children, ...rest }: any) => {
    return (
      <div className="mb-6 overflow-clip rounded-xl bg-gray-950 sm:-mx-3!">
        <blockquote className="blockquote group p-4 sm:p-6" {...rest}>
          <div className="mb-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              width="64px"
              height="64px"
              className="size-3.5 fill-current text-white"
            >
              <path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 30 A 9 9 0 0 0 64 48 A 9 9 0 0 0 64 30 z M 64 59 C 59 59 55 63 55 68 L 55 92 C 55 97 59 101 64 101 C 69 101 73 97 73 92 L 73 68 C 73 63 69 59 64 59 z" />
            </svg>
            <div className="font-badge text-sm leading-none text-white uppercase sm:text-base">
              Note
            </div>
          </div>
          <div className="*:text-sm! *:text-white/60! last:*:mb-0! sm:*:text-base!">{children}</div>
        </blockquote>
      </div>
    );
  },
  hr: () => {
    return <hr className="my-16 h-px border-0 bg-gray-800" />;
  },
};
