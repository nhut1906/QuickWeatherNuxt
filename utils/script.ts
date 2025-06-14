export const loadScript = (src: any) => {
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) existingScript.remove(); // Xóa script cũ

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script); // Thêm script mới
};
