// src/components/AdBanner.tsx
import { onMount, onCleanup, createEffect, createSignal } from "solid-js";

interface AdBannerProps {
  class?: string;
  width?: string;
  height?: string;
  /** Ad script source */
  scriptSrc: string;
  /** Unique container ID */
  containerId?: string;
  forceReload?: boolean;
  onRef?: (el: HTMLDivElement) => void;
}

export default function AdBanner(props: AdBannerProps) {
  let adContainerRef: HTMLDivElement | undefined;
  let scriptElement: HTMLScriptElement | undefined;
  const [loadAttempts, setLoadAttempts] = createSignal(0);

  const MAX_ATTEMPTS = 2;

  const loadAd = () => {
    if (!adContainerRef || loadAttempts() >= MAX_ATTEMPTS) return;

    setLoadAttempts(p => p + 1);
    adContainerRef.innerHTML = '';

    // Create container
    const container = document.createElement('div');
    container.id = props.containerId || `ad-slot-${Date.now()}`;
    adContainerRef.appendChild(container);

    // Create script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.type = 'text/javascript';
    script.src = props.scriptSrc;

    scriptElement = script;

    script.onload = () => console.log(`✅ Ad loaded: ${props.scriptSrc}`);
    script.onerror = () => {
      console.warn(`⚠️ Failed to load ad: ${props.scriptSrc}`);
      if (loadAttempts() < MAX_ATTEMPTS) {
        setTimeout(loadAd, 1000);
      }
    };

    document.head.appendChild(script);
  };

  onMount(() => {
    if (props.onRef && adContainerRef) props.onRef(adContainerRef);
    setTimeout(loadAd, 120);
  });

  createEffect(() => {
    if (props.forceReload) {
      setLoadAttempts(0);
      setTimeout(loadAd, 300);
    }
  });

  onCleanup(() => {
    if (scriptElement?.parentNode) {
      scriptElement.parentNode.removeChild(scriptElement);
    }
    if (adContainerRef) adContainerRef.innerHTML = '';
  });

  return (
    <div
      ref={adContainerRef}
      class={props.class || "w-full my-4"}
      style={{
        minHeight: props.height || '260px',
        width: props.width || '100%',
      }}
    />
  );
}