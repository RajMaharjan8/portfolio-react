interface SectionTitleProps {
  overline?: string;
  title: string;
  light?: boolean;
  center?: boolean;
}

const SectionTitle = ({
  overline,
  title,
  light = false,
  center = false,
}: SectionTitleProps) => (
  <div className={`mb-10 sm:mb-16 ${center ? "text-center" : ""}`}>
    {overline && (
      <p className="text-primary font-sfmono text-xs tracking-[0.25em] uppercase mb-3">
        {overline}
      </p>
    )}
    <h2
      className={`text-4xl md:text-5xl font-bold leading-tight ${
        light ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h2>
  </div>
);

export default SectionTitle;
