import { Pre, RawCode, highlight } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  console.log("codeblock", codeblock);
  const highlighted = await highlight(codeblock, "github-dark");
  return <Pre code={highlighted} />;
}
