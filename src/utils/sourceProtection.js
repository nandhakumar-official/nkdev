/** Discourage casual source inspection; browser-delivered code is never secret. */
export function enableSourceProtection() {
  const blockContextMenu = (event) => event.preventDefault();

  const blockInspectionShortcuts = (event) => {
    const key = event.key.toLowerCase();
    const devToolsShortcut =
      key === "f12" ||
      (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
      (event.metaKey && event.altKey && ["i", "j", "c"].includes(key));
    const viewSourceShortcut = (event.ctrlKey || event.metaKey) && key === "u";

    if (devToolsShortcut || viewSourceShortcut) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  document.addEventListener("contextmenu", blockContextMenu);
  document.addEventListener("keydown", blockInspectionShortcuts, true);

  return () => {
    document.removeEventListener("contextmenu", blockContextMenu);
    document.removeEventListener("keydown", blockInspectionShortcuts, true);
  };
}
