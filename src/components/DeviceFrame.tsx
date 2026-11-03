import type { ReactNode } from "react";

/** PC の画面を入れるブラウザの窓。上に細いバー（丸3つ＋アドレス）。画像の枠の素材は使わず CSS だけで作る */
export function BrowserFrame({
  address,
  className = "",
  children,
}: {
  /** アドレスに小さく出す URL（例：agent-desk-ip1u.vercel.app） */
  address: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`browser ${className}`.trim()}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser__address">{address}</span>
      </div>
      <div className="browser__screen">{children}</div>
    </div>
  );
}

/** スマホの画面を入れる輪郭。角の丸い本体・細い縁・上の小さな切り欠き・影。実在の機種には似せない */
export function PhoneFrame({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`phone ${className}`.trim()}>
      <div className="phone__screen">{children}</div>
      <span className="phone__notch" aria-hidden="true" />
    </div>
  );
}
