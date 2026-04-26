import Link from "next/link";
import { funnelSteps } from "@/data/funnels";

export function FunnelMap() {
  return (
    <div className="grid gap-4">
      {funnelSteps.map((step, index) => (
        <div key={step.id} className="grid gap-3 md:grid-cols-[120px_1fr_160px] md:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="font-bold text-stone-950">{step.label}</span>
          </div>
          <div className="border-l-2 border-teal-200 bg-white px-5 py-4 shadow-sm">
            <p className="leading-7 text-stone-600">{step.description}</p>
            {step.nextStepIds.length > 0 ? (
              <p className="mt-2 text-xs font-bold tracking-[0.12em] text-teal-700 uppercase">
                Next: {step.nextStepIds.join(" / ")}
              </p>
            ) : null}
          </div>
          <Link
            href={step.href}
            className="text-sm font-bold text-teal-700 hover:text-teal-900 md:justify-self-end"
          >
            この導線を見る
          </Link>
        </div>
      ))}
    </div>
  );
}
