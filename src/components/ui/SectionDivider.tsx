interface SectionDividerProps {
  thick?: boolean;
}

export function SectionDivider({ thick = false }: SectionDividerProps) {
  return (
    <div
      className={thick ? 'section-divider-thick' : 'section-divider'}
      aria-hidden="true"
    />
  );
}
