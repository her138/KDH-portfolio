import { supabase } from './supabase';

export const MEDIA_BUCKET = 'portfolio-media';
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const fileExtensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

export function mediaPublicUrl(path) {
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function uploadPortfolioImage(file) {
  if (!(file instanceof File)) {
    throw new Error('Choose an image to upload.');
  }
  if (!fileExtensions[file.type]) {
    throw new Error('Choose a PNG, JPEG, WebP or AVIF image.');
  }
  if (!file.size || file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image must be no larger than 5 MB.');
  }

  // Browser-generated unpredictable path; never overwrite another image.
  const path = `projects/${crypto.randomUUID()}.${fileExtensions[file.type]}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type,
    cacheControl: '3600',
  });
  if (error) throw error;
  return { path, url: mediaPublicUrl(path) };
}
