import Image from "next/image";
import { PIPELINE_STEPS } from "@/lib/pipeline";
import { WORKS, pipelineOutputs, type Work } from "@/lib/works";
import { workNumber } from "@/lib/format";
import { RunLog } from "./RunLog";

/** 作品の図。画面を持つ作品は PC とスマホの画像、工場は進み方の図と作った物 */
export function WorkFigure({ work }: { work: Work }) {
  if (work.figure.type === "shots") {
    const { shots } = work.figure;
    return (
      <div className="shot">
        <div className="shot__desktop">
          <Image
            src={shots.desktop}
            alt={shots.alt}
            width={1440}
            height={900}
            sizes="(min-width: 900px) 72vw, 100vw"
          />
        </div>
        <div className="shot__mobile">
          <Image
            src={shots.mobile}
            alt=""
            width={390}
            height={844}
            sizes="(min-width: 900px) 16vw, 30vw"
          />
        </div>
      </div>
    );
  }

  const outputs = pipelineOutputs(work);
  return (
    <div className="pipe">
      <div className="pipe__log">
        <RunLog steps={PIPELINE_STEPS} title="RUN — ai-dev-template" size="figure" />
      </div>
      <div className="pipe__outputs">
        <p className="label">この工場が作った物</p>
        <ul>
          {outputs.map((o) => {
            const index = WORKS.findIndex((w) => w.id === o.id);
            if (o.figure.type !== "shots") return null;
            return (
              <li key={o.id}>
                <a href={`#${o.id}`} className="pipe__out">
                  <Image src={o.figure.shots.desktop} alt="" width={1440} height={900} sizes="(min-width: 900px) 24vw, 46vw" />
                  <span className="pipe__outname">
                    <span className="mono">{workNumber(index)}</span> {o.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
