"use client";

import { useNaigationLinks } from "@shared/constants/navigation-links";
import { useDashboardContext } from "@shared/context/dashboard.context";
import { useSlideInAnimation } from "@shared/lib/animations/slide-in-animation";
import { cn } from "@shared/lib/utils";
import { ChevronUp } from "lucide-react";

function ProfileSidebar() {
  const { dashboardLinks } = useNaigationLinks();
  const { activeMenu } = useDashboardContext();
  const animRef = useSlideInAnimation(activeMenu, "left");

  return (
    <aside
      ref={animRef}
      className={cn(
        "bg-mostly-white border-r w-full xs:w-64 fixed left-0 top-14 bottom-0 pb-10"
      )}
    >
      <nav className="flex flex-col gap-4 h-full">
        {dashboardLinks.map(section => (
          <div
            key={section.title}
            className="flex flex-col last:mt-auto"
          >
            <div
              className={cn(
                "px-6 text-[11px] font-semibold pb-2 pt-3 uppercase tracking-[0.12em] text-charcoal",
                "border-b border-dashed"
              )}
            >
              {section.title}
            </div>

            <ul className="flex flex-col">
              {section.items.map(item => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-3 px-6 py-2 text-left text-sm transition-colors text-charcoal-400",
                        "hover:text-charcoal",
                        { "text-charcoal": item.isActive }
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{item.label}</span>
                      {item.hasCaret && (
                        <ChevronUp className="h-4 w-4 text-charcoal-400" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default ProfileSidebar;
