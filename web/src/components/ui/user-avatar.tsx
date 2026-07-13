import Image from "next/image";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  size?: number;
}

export function UserAvatar({ name, image, size = 40 }: UserAvatarProps) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  if (image) {
    return (
      <Image
        src={image}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full border-2 border-border"
      />
    );
  }

  return (
    <div
      className="rounded-full bg-brand flex items-center justify-center text-brand-dark font-bold"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}