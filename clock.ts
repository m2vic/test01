function getClockAngle(hh_mm: string): number {
    let [hh, mm] = hh_mm.split(":").map(Number);
    let hour12: number = hh % 12 || 12;
    let min: number = 6 * mm;
    let hour: number = 30 * hour12 + 0.5 * mm;
    let angle: number = Math.abs(hour - min);
  
    if (angle > 360 - angle) {
      angle = 360 - angle;
    }
    return angle;
  }
  