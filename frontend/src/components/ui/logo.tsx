import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width: number;
  height: number;
  alt: string;
  href: string;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  className?: string;
  color?: string;
}

export default function Logo({ 
    width, 
    height, 
    alt, 
    href = "/", 
    fetchPriority = "high", 
    className = "max-sm:hidden", 
    color = "transparent", 
  }: LogoProps
) {
  return (
    <Link href={href}>
      <Image 
        alt={alt} 
        fetchPriority={fetchPriority}
        width={width} 
        height={height} 
        className={className}
        style={{ color: color }}
        src={href}
        decoding='async'
      />
    </Link>
  )
}



