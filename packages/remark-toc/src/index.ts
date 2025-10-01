import { toc } from "mdast-util-toc"
import type { Root } from "mdast"
import type { VFile } from "vfile"

export default function remarkToc() {
  return (tree: Root, file: VFile) => {
    const result = toc(tree)
    
    file.data.toc = result.map
  }
}
