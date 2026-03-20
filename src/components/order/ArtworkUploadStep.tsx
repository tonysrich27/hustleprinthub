interface ArtworkUploadStepProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  needsDesignHelp: boolean;
  onDesignHelpChange: (value: boolean) => void;
}

export function ArtworkUploadStep({
  uploadedFile,
  onFileChange,
  needsDesignHelp,
  onDesignHelpChange,
}: ArtworkUploadStepProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white">Upload Artwork</h2>
      <p className="mt-2 text-gray-400">
        Upload your design or let us create it for you. PNG, JPG, PDF, AI accepted.
      </p>
      <div className="mt-6 space-y-4">
        <div
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors ${
            uploadedFile ? 'border-gold bg-gold/5' : 'border-charcoal-50/50 bg-charcoal-400/50 hover:border-gold/50'
          }`}
        >
          <input
            type="file"
            id="artwork-upload"
            accept=".png,.jpg,.jpeg,.pdf,.ai,.eps"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          <label htmlFor="artwork-upload" className="cursor-pointer text-center">
            <p className="text-gray-400">Drag & drop or click to upload</p>
            <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF, AI, EPS — max 10MB</p>
            <span className="mt-4 inline-block rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-charcoal transition hover:bg-gold-300">
              Choose Files
            </span>
          </label>
          {uploadedFile && (
            <p className="mt-4 text-sm text-gold">✓ {uploadedFile.name}</p>
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-charcoal-50/30 p-4 transition hover:border-gold/50">
          <input
            type="checkbox"
            checked={needsDesignHelp}
            onChange={(e) => onDesignHelpChange(e.target.checked)}
            className="h-5 w-5 rounded border-charcoal-50/50 bg-charcoal-100 text-gold focus:ring-gold"
          />
          <span className="font-medium text-white">I need design help</span>
        </label>
      </div>
    </div>
  );
}
