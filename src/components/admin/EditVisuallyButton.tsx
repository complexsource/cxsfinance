'use client';

import { useDocumentInfo } from 'payload/components/utilities';
import { Sparkles } from 'lucide-react';

export function EditVisuallyButton() {
  const { id } = useDocumentInfo();

  if (!id) return null;

  return (
    <a
      href={`/editor/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn--style-primary btn--size-medium"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginLeft: '1rem',
      }}
    >
      <Sparkles size={16} />
      Edit Visually
    </a>
  );
}