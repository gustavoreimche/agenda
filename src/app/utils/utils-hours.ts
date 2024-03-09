export const INTERVAL = 30;
export const INITIAL_HOUR = 9;
export const FINAL_HOUR = 21;
export const QTD_HOURS = (FINAL_HOUR - INITIAL_HOUR) * 60 / INTERVAL;

export function GetHours(): string[] {
  const numeroDeElementos = QTD_HOURS;
  const arrayDeIntervalos: string[] = [];

  for (let i = 0; i <= numeroDeElementos; i++) {
    const hora = Math.floor(i * INTERVAL / 60) + INITIAL_HOUR;
    const minuto = (i * INTERVAL) % 60;

    const horaFormatada = hora.toString().padStart(2, '0');
    const minutoFormatado = minuto.toString().padStart(2, '0');

    arrayDeIntervalos.push(`${horaFormatada}:${minutoFormatado}`);
  }

  return arrayDeIntervalos;
}
