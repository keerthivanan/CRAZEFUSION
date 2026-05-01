"use client";

export function CricketAvatar() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
      <img
        src="/categories/cricket_legends.png"
        alt="Cricket Legends"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
      />
    </div>
  );
}

export function BasketballAvatar() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
      <img
        src="/categories/basketball_legends.png"
        alt="NBA Legends"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
      />
    </div>
  );
}

export function FootballAvatar() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
      <img
        src="/categories/football_legends.png"
        alt="Football Legends"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
      />
    </div>
  );
}
