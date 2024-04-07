import { ResizablePanel } from "@/components/ui/common/resizable";

export default function Sidebar(props: { children: React.ReactNode }) {
  return <ResizablePanel defaultSize={35}>{props?.children}</ResizablePanel>;
}
