// A labelled form field. "as" lets the same component render an input or a textarea.
// The id doubles as the field name so one change handler can update the right property.
export default function FormField({ id, label, hint, error, as: Tag = 'input', ...props }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Tag id={id} name={id} aria-invalid={error ? 'true' : 'false'} aria-describedby={describedBy} {...props} />
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  );
}
