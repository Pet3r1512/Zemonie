let pinged = false;

export function warmupDb() {
    if (pinged) return;
    pinged = true;
    fetch("https://api.zemonie.site/api/ping").catch(() => { });
}