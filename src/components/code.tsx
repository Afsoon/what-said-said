import { Pre, RawCode, highlight } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css");

  return (
    <div
      className="border-editorGroup-border relative my-2 overflow-hidden rounded border"
      style={{
        borderColor: "var(--border-color)",
      }}
    >
      <Pre
        className="bg-editor-background group selection:bg-editor-selectionBackground m-0 flex-1 rounded-none p-2"
        code={highlighted}
        style={{
          backgroundColor: "var(--ch-16)",
        }}
      />
    </div>
  );
}
