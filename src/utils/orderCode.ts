const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderCode(): string {
  let code = "";
  for (let i = 0; i < 9; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
