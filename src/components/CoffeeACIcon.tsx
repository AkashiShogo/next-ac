interface Props {
  size?: number;
  className?: string;
}

export function CoffeeACIcon({ size = 100, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* カップ本体 */}
      <path
        d="M30 40H70V65C70 76.0457 61.0457 85 50 85C38.9543 85 30 76.0457 30 65V40Z"
        fill="#334155"
      />
      {/* 取っ手 */}
      <path
        d="M70 45H75C79.4183 45 83 48.5817 83 53C83 57.4183 79.4183 61 75 61H70"
        stroke="#334155"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* 湯気「A」 */}
      <path
        d="M40 25L45 15L50 25M42 21H48"
        stroke="#2ecc71"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 湯気「C」 */}
      <path
        d="M65 25C60 25 58 20 58 17.5C58 15 60 10 65 10"
        stroke="#2ecc71"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
