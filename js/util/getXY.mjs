export default function getXY(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) ;
  const y = (e.clientY - rect.top) ;
  const pos = [x*3, y*3];
  return pos;
}
