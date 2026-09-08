export interface AITag {
  confidence?: number;
  name?: string;
  source?: string;
}

export interface FileUploadResponse {
  fieldId?: string;
  name?: string;
  size?: number;
  versionInfo?: {
    id?: string;
    name?: string;
  };
  filePath?: string;
  url?: string;
  fileType?: string;
  height?: number;
  width?: number;
  thumbnailUrl?: string;
  AITags?: Array<AITag> | null;
  description?: string;
}
