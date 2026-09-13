import { toast } from "sonner";

/**
 * Automatically scrolls to and focuses the first invalid form element.
 * Supports:
 * - data-error-field="fieldName"
 * - name="fieldName"
 * - id="field-fieldName"
 * - generic aria-invalid="true" elements
 */
export function scrollToFirstError(
  errors: Record<string, string | undefined | null>,
  options?: {
    customMessage?: string;
    containerSelector?: string;
  }
) {
  const errorKeys = Object.keys(errors).filter((k) => !!errors[k]);
  if (errorKeys.length === 0) return false;

  const errorCount = errorKeys.length;
  const firstKey = errorKeys[0];
  const firstErrorMsg = errors[firstKey];

  // Try finding the element in the DOM
  let targetEl: HTMLElement | null = null;

  for (const key of errorKeys) {
    const selector = [
      `[data-error-field="${key}"]`,
      `[name="${key}"]`,
      `#field-${key}`,
      `#${key}`,
    ].join(", ");

    const el = document.querySelector<HTMLElement>(selector);
    if (el) {
      targetEl = el;
      break;
    }
  }

  // Fallback to any element with data-has-error="true" or aria-invalid="true"
  if (!targetEl) {
    targetEl = document.querySelector<HTMLElement>(
      '[data-has-error="true"], [aria-invalid="true"]'
    );
  }

  if (targetEl) {
    targetEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    // If targetEl is a container or wrapper, attempt to focus an interactive child
    const focusable =
      targetEl.tagName === "INPUT" ||
      targetEl.tagName === "SELECT" ||
      targetEl.tagName === "TEXTAREA"
        ? targetEl
        : targetEl.querySelector<HTMLElement>("input, select, textarea, [tabindex]");

    if (focusable) {
      setTimeout(() => {
        try {
          focusable.focus({ preventScroll: true });
        } catch {
          // Ignore focus failures
        }
      }, 300);
    }

    // Trigger visual pulse/shake effect
    targetEl.classList.add("animate-shake");
    setTimeout(() => {
      targetEl?.classList.remove("animate-shake");
    }, 1000);
  } else {
    // If no specific field element was found, scroll smoothly to the form container or top
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  // Show a helpful toast so the user immediately knows how many issues exist
  toast.error(
    options?.customMessage ||
      `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} your attention`,
    {
      description: firstErrorMsg
        ? `First: ${firstErrorMsg}`
        : "Please correct the highlighted fields.",
      duration: 4000,
    }
  );

  return true;
}
