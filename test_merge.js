const defaults = { channels: [{ id: "x", enabled: true }] };
const parsed = { channels: [{ id: "x", enabled: false }] };
const result = { ...defaults, ...parsed };
console.log(result.channels[0].enabled);
