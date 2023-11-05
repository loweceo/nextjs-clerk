"use client";
import RecoilRootWrapper from "./dashboard/root";

export default function LayoutRecoilRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RecoilRootWrapper>{children}</RecoilRootWrapper>
    </>
  );
}
