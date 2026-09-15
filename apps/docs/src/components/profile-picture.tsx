import Image from "next/image";

export function ProfilePicture({ name = "Ama Owusu", size = 32, variant = 0 }: { name?: string; size?: number; variant?: number }) {
  const photos = ["photo-1534528741775-53994a69daeb", "photo-1500648767791-00dcc994a43e", "photo-1506794778202-cad84cf45f1d", "photo-1531123897727-8f129e1688ce"];
  return (
    <Image
      src={`https://images.unsplash.com/${photos[variant % photos.length]}?auto=format&fit=crop&w=80&h=80&q=80`}
      alt={name}
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-full bg-neutral-600 object-cover"
      style={{ width: size, height: size }}
    />
  );
}
