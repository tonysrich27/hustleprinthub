export const ARTWORK_STATUS_OPTIONS = [
  { id: 'print-ready', label: 'I have print-ready artwork' },
  { id: 'cleanup', label: 'I need cleanup or vector conversion' },
  { id: 'design-created', label: 'I need a design created' },
  { id: 'need-help', label: 'I need help figuring it out' },
] as const;

export const VECTOR_CHECKBOX_OPTIONS = [
  { id: 'vectorize', label: 'Vectorize logo' },
  { id: 'recreate-blurry', label: 'Recreate blurry art' },
  { id: 'convert-screenshot', label: 'Convert screenshot to print-ready file' },
  { id: 'resize-large', label: 'Resize for large format' },
  { id: 'rebuild-reference', label: 'Rebuild from reference' },
] as const;

export const DESIGN_STATUS_OPTIONS = [
  'Awaiting design brief',
  'AI concept sent',
  'Revision 1',
  'Revision 2',
  'Revision 3',
  'Escalate to designer',
  'Designer assigned',
  'Proof approved',
  'Ready for production',
] as const;

export type ArtworkStatus = (typeof ARTWORK_STATUS_OPTIONS)[number]['id'];
export type DesignStatus = (typeof DESIGN_STATUS_OPTIONS)[number];
