import { useEffect, useRef } from "react";

export function useDependencyDebugger(deps: Record<string, any>) {
  const prevDeps = useRef<Record<string, any>>({});

  useEffect(() => {
    Object.entries(deps).forEach(([key, value]) => {
      if (prevDeps.current[key] !== undefined && prevDeps.current[key] !== value) {
        console.log(`🔄 Dependency "${key}" changed`, {
          before: prevDeps.current[key],
          after: value,
        });
      }
      prevDeps.current[key] = value;
    });
  }, Object.values(deps));
}
