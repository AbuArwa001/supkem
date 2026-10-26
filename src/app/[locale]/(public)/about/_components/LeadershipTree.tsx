"use client";

import React from "react";
import { LeadershipProfile } from "@/services/leadership-service";
import { LeaderCard } from "./LeaderCard";

interface LeadershipTreeProps {
  displayHead: LeadershipProfile | null;
  displayDeputies: LeadershipProfile[];
  displayExecs: LeadershipProfile[];
}

export function LeadershipTree({ displayHead, displayDeputies, displayExecs }: LeadershipTreeProps) {
  return (
    <div className="w-full flex flex-col items-center relative">
      {displayHead && (
        <div className="flex flex-col items-center w-full relative z-20">
          <LeaderCard leader={displayHead} isHead />
          {(displayDeputies.length > 0 || displayExecs.length > 0) && (
            <div className="hidden lg:block w-px h-16 bg-slate-300" />
          )}
        </div>
      )}

      {displayDeputies.length > 0 && (
        <div className="flex flex-col items-center w-full relative z-10 mt-16 lg:mt-0">
          <div className="flex justify-center w-full flex-wrap lg:flex-nowrap gap-12 lg:gap-0">
            {displayDeputies.map((leader, i) => (
              <div key={leader.id} className="relative flex flex-col items-center px-4 lg:px-12 w-full md:w-1/2 lg:w-auto">
                {displayDeputies.length > 1 && (
                  <div className={`hidden lg:block absolute top-0 h-px bg-slate-300 ${
                    i === 0 ? "ltr:left-[50%] ltr:right-0 rtl:right-[50%] rtl:left-0" :
                    i === displayDeputies.length - 1 ? "ltr:left-0 ltr:right-[50%] rtl:right-0 rtl:left-[50%]" :
                    "left-0 right-0"
                  }`} />
                )}
                <div className="hidden lg:block w-px h-12 bg-slate-300" />
                <LeaderCard leader={leader} />
              </div>
            ))}
          </div>
          {displayExecs.length > 0 && <div className="hidden lg:block w-px h-16 bg-slate-300" />}
        </div>
      )}

      {displayExecs.length > 0 && (
        <div className="w-full mt-16 lg:mt-0 relative">
          <div className="hidden lg:block absolute top-0 left-1/4 right-1/4 h-px bg-slate-300" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 lg:pt-12 relative z-10">
            {displayExecs.map((leader) => (
              <div key={leader.id} className="relative flex flex-col items-center">
                <div className="hidden lg:block absolute -top-12 left-1/2 w-px h-12 bg-slate-300" />
                <LeaderCard leader={leader} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
