export function validContact(name: string, email: string, message: string) {
  return (
    name.trim().length > 0 &&
    name.length <= 100 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length <= 254 &&
    message.trim().length >= 10 &&
    message.length <= 5000
  );
}
export function mailtoUrl(
  recipient: string,
  name: string,
  email: string,
  message: string,
) {
  return `mailto:${recipient}?subject=${encodeURIComponent(`Portfolio — ${name.trim()}`)}&body=${encodeURIComponent(`${message.trim()}\n\n${name.trim()}\n${email.trim()}`)}`;
}
